import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { randomBytes } from 'crypto';
import { MetricQueryDto } from './dto/metric-query.dto';
import { DevicesService } from 'src/devices/devices.service';
import { Prisma } from '@prisma/client';
import { SocketGateway } from 'src/socket/socket.gateway';
import { sub } from 'date-fns';

@Injectable()
export class MetricsService {
  constructor(
    private prisma: PrismaService,
    private devicesService: DevicesService,
    private socketGateway: SocketGateway,
  ) {}

  async create(createMetricDto: CreateMetricDto) {
    const {
      device_id: deviceId,
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
    if (device && device.pond) {
      pondId = device.pond.id;

      this.socketGateway.sendMessage(pondId, {
        deviceId,
        pondId,
        temperature,
        ph,
        tdo,
        tds,
        turbidity,
        createdAt,
      });
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
