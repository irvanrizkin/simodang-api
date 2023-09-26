import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { Device } from '@prisma/client';
import { MetricParamDto } from './dto/metric-param.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { CreateMetricDto } from 'src/metrics/dto/create-metric.dto';

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

  isInThreshold(device: Device, metricParamDto: MetricParamDto) {
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

    return (
      isTempInRange &&
      isPhInRange &&
      isTdoInRange &&
      isTdsInRange &&
      isTurbiditiesInRange
    );
  }

  async changePondStatusByThreshold(createMetricDto: CreateMetricDto) {
    const {
      device_id: deviceId,
      temper_val: temperature,
      ph_val: ph,
      oxygen_val: tdo,
      tds_val: tds,
      turbidities_val: turbidities,
    } = createMetricDto;
    const device = await this.findOne(deviceId);

    if (!device) {
      throw new NotFoundException('device not found');
    }

    const { pond, notificationCount } = device;
    if (!pond) {
      throw new NotFoundException('no pond related to this device');
    }

    const isInThreshold = this.isInThreshold(device, {
      temperature,
      ph,
      tdo,
      tds,
      turbidities,
    });

    const { id, name, userId } = pond;

    if (isInThreshold) {
      await this.prisma.device.update({
        where: { id: deviceId },
        data: { notificationCount: 0 },
      });
      return await this.prisma.pond.update({
        where: { id },
        data: { status: 1 },
      });
    }
    if (notificationCount === 0) {
      await this.notificationsService.create(userId, {
        title: `Kolam ${name} berada dalam kondisi tidak baik`,
        message: 'Periksa kondisi tambak milik anda',
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
