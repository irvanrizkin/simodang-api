import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { Device } from '@prisma/client';
import { MetricParamDto } from './dto/metric-param.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { OnEvent } from '@nestjs/event-emitter';
import { ThresholdCheckEvent } from './events/threshold-check.event';
import * as admin from 'firebase-admin';

@Injectable()
export class DevicesService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(createDeviceDto: CreateDeviceDto) {
    const { id, name, userId, masterId } = createDeviceDto;

    return await this.prisma.device.create({
      data: {
        id,
        name,
        userId,
        masterId,
      },
    });
  }

  async findAll() {
    return await this.prisma.device.findMany();
  }

  async findAllByUser(userId: string) {
    return await this.prisma.device.findMany({
      where: { userId },
    });
  }

  async findOne(id: string) {
    return await this.prisma.device.findUnique({
      where: { id },
      include: { pond: true },
    });
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto) {
    const {
      name,
      userId,
      masterId,
      notificationEnabled,
      autoWaterEnabled,
      autoFeedEnabled,
      isSaved,
      tempLow,
      tempHigh,
      phLow,
      phHigh,
      tdoLow,
      tdoHigh,
      tdsLow,
      tdsHigh,
      turbiditiesLow,
      turbiditiesHigh,
    } = updateDeviceDto;

    return await this.prisma.device.update({
      where: { id },
      data: {
        name,
        userId,
        masterId,
        notificationEnabled,
        autoWaterEnabled,
        autoFeedEnabled,
        isSaved,
        tempLow,
        tempHigh,
        phLow,
        phHigh,
        tdoLow,
        tdoHigh,
        tdsLow,
        tdsHigh,
        turbiditiesLow,
        turbiditiesHigh,
      },
    });
  }

  private isInRange(value: number, high: Decimal, low: Decimal) {
    return value >= low.toNumber() && value <= high.toNumber();
  }

  private isInThreshold(
    device: Device,
    metricParamDto: MetricParamDto,
  ): {
    status: boolean;
    outOfRange: string[];
  } {
    const {
      tempLow,
      tempHigh,
      phLow,
      phHigh,
      tdoLow,
      tdoHigh,
      tdsLow,
      tdsHigh,
      turbiditiesLow,
      turbiditiesHigh,
    } = device;
    const outOfRange = [];

    const { temperature, ph, tdo, tds, turbidities } = metricParamDto;

    const isTempInRange = this.isInRange(temperature, tempHigh, tempLow);
    const isPhInRange = this.isInRange(ph, phHigh, phLow);
    const isTdoInRange = this.isInRange(tdo, tdoHigh, tdoLow);
    const isTdsInRange = this.isInRange(tds, tdsHigh, tdsLow);
    const isTurbiditiesInRange = this.isInRange(
      turbidities,
      turbiditiesHigh,
      turbiditiesLow,
    );
    !isTempInRange && outOfRange.push('temperature');
    !isPhInRange && outOfRange.push('ph');
    !isTdoInRange && outOfRange.push('tdo');
    !isTdsInRange && outOfRange.push('tds');
    !isTurbiditiesInRange && outOfRange.push('turbidities');

    return {
      status:
        isTempInRange &&
        isPhInRange &&
        isTdoInRange &&
        isTdsInRange &&
        isTurbiditiesInRange,
      outOfRange,
    };
  }

  @OnEvent('device.threshold', { async: true })
  async changePondStatusByEvent(thresholdCheckEvent: ThresholdCheckEvent) {
    const { deviceId } = thresholdCheckEvent;

    const device = await this.prisma.device.findUnique({
      where: { id: deviceId },
      include: { pond: true },
    });

    const { pond, notificationCount } = device;
    const { id, name, userId } = pond;

    const { status, outOfRange } = this.isInThreshold(
      device,
      thresholdCheckEvent,
    );
    if (status) {
      await this.prisma.device.update({
        where: { id: deviceId },
        data: { notificationCount: 0 },
      });
      return await this.prisma.pond.update({
        where: { id },
        data: { status: 1 },
      });
    }
    // ensure the notification only sent once before the count resets to 0
    if (notificationCount === 0) {
      await this.notificationsService.create(userId, {
        title: `Kolam ${name} berada dalam kondisi tidak baik`,
        message: `Parameter yang terdampak ${outOfRange.toString()}`,
      });
      await admin.messaging().sendToTopic(id, {
        notification: {
          title: `Kolam ${name} berada dalam kondisi tidak baik`,
          body: `Parameter yang terdampak ${outOfRange.toString()}`,
        },
      });
    }
    await this.prisma.device.update({
      where: { id: deviceId },
      data: { notificationCount: { increment: 1 } },
    });
    return await this.prisma.pond.update({
      where: { id },
      data: { status: 0 },
    });
  }
}
