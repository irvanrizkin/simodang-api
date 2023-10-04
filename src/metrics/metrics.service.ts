import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { randomBytes } from 'crypto';
import { MetricQueryDto } from './dto/metric-query.dto';
import { DevicesService } from 'src/devices/devices.service';
import { Prisma } from '@prisma/client';
import { sub } from 'date-fns';
import { ThresholdCheckEvent } from 'src/devices/events/threshold-check.event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as admin from 'firebase-admin';
import { LogService } from 'src/log/log.service';

@Injectable()
export class MetricsService {
  constructor(
    private prisma: PrismaService,
    private devicesService: DevicesService,
    private eventEmitter: EventEmitter2,
    private logService: LogService,
  ) {}

  async create(createMetricDto: CreateMetricDto) {
    const {
      device_id: deviceId,
      master_id: masterId,
      temper_val: temperature,
      ph_val: ph,
      oxygen_val: tdo,
      tds_val: tds,
      turbidities_val: turbidity,
      created_at: createdAt,
    } = createMetricDto;

    const id = `MET${randomBytes(5).toString('hex')}`;
    const tempId = `TMP${randomBytes(5).toString('hex')}`;

    let pondId: string | null = null;

    const device = await this.devicesService.findOne(deviceId ?? '');
    if (!device) {
      await this.logService.create('metric/create', 'device not found');
      throw new NotFoundException('device not found when create metric');
    }
    if (device && device.masterId != masterId) {
      await this.logService.create('metric/create', 'masterId not match');
      throw new BadRequestException('master id not match');
    }

    if (device && device.pond) {
      pondId = device.pond.id;

      const thresholdCheckEvent = new ThresholdCheckEvent(
        deviceId,
        temperature,
        ph,
        tdo,
        tds,
        turbidity,
      );
      this.eventEmitter.emit('device.threshold', thresholdCheckEvent);

      await admin.messaging().sendToTopic(
        `${pondId}-realtime`,
        {
          data: {
            temperature: temperature.toString(),
            ph: ph.toString(),
            tdo: tdo.toString(),
            tds: tds.toString(),
            turbidity: turbidity.toString(),
          },
        },
        {
          contentAvailable: true,
          priority: 'high',
        },
      );
    }

    if (device && device.isSaved === 1) {
      return await this.prisma.metric.create({
        data: {
          id,
          deviceId,
          pondId,
          temperature,
          ph,
          tdo,
          tds,
          turbidity,
          createdAt,
        },
      });
    }

    if (device && device.isSaved === 0) {
      return await this.prisma.metricTemp.create({
        data: {
          id: tempId,
          deviceId,
          pondId,
          temperature,
          ph,
          tdo,
          tds,
          turbidity,
          createdAt,
        },
      });
    }

    return await this.prisma.metricTemp.create({
      data: {
        id: tempId,
        deviceId,
        pondId,
        temperature,
        ph,
        tdo,
        tds,
        turbidity,
        createdAt,
      },
    });
  }

  async findAggregatedMetricsByRangeDate(
    pondId: string,
    metricQueryDto: MetricQueryDto,
  ) {
    const { startDate, endDate, take, page } = metricQueryDto;
    const skip = take * (page - 1);

    const limit = Prisma.sql`LIMIT ${take} OFFSET ${skip}`;

    return await this.prisma.$queryRaw`
    SELECT
      DATE(createdAt) AS createdAt,
      AVG(temperature) AS temperature,
      AVG(ph) AS ph,
      AVG(tdo) AS tdo,
      AVG(tds) AS tds,
      AVG(turbidity) AS turbidity
    FROM
      metric
    WHERE
      pondId = ${pondId} AND
      createdAt BETWEEN ${startDate} AND ${endDate + ' 23:59:59'}
    GROUP BY
      DATE(createdAt)
    ORDER BY DATE(createdAt)
    ${take ? limit : Prisma.empty};
    `;
  }

  async findAllMetricsByHour(pondId: string, metricQueryDto: MetricQueryDto) {
    const { timeString, hours, take, page } = metricQueryDto;
    const date = new Date(timeString);

    if (take) {
      const skip = take * (page - 1);
      return await this.prisma.metric.findMany({
        where: {
          pondId,
          createdAt: {
            gte: sub(date, { hours }),
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
        take: Number(take),
        skip: Number(skip),
      });
    }

    return await this.prisma.metric.findMany({
      where: {
        pondId,
        createdAt: {
          gte: sub(date, { hours }),
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findDeviceMetricByHour(
    deviceId: string,
    metricQueryDto: MetricQueryDto,
  ) {
    const { timeString, hours } = metricQueryDto;
    const date = new Date(timeString);

    return await this.prisma.metric.findMany({
      where: {
        deviceId,
        createdAt: {
          gte: sub(date, { hours }),
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findLastMetric(pondId: string) {
    const latestMetric = await this.prisma.metric.findFirst({
      where: { pondId },
      orderBy: { createdAt: 'desc' },
    });

    return latestMetric;
  }
}
