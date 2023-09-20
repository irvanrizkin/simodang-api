import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { randomBytes } from 'crypto';
import { MetricQueryDto } from './dto/metric-query.dto';
import { DevicesService } from 'src/devices/devices.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MetricsService {
  constructor(
    private prisma: PrismaService,
    private devicesService: DevicesService,
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

    let pondId: string | null = null;

    if (deviceId) {
      const device = await this.devicesService.findOne(deviceId);
      if (device.pond) {
        pondId = device.pond.id;
      }
    }

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

  async findMetricsByRangeDate(pondId: string, metricQueryDto: MetricQueryDto) {
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
      Metric
    WHERE
      pondId = ${pondId} AND
      createdAt BETWEEN ${startDate} AND ${endDate + ' 23:59:59'}
    GROUP BY
      DATE(createdAt)
    ORDER BY DATE(createdAt)
    ${take ? limit : Prisma.empty};
    `;
  }

  async findLastMetric(pondId: string) {
    const latestMetric = await this.prisma.metric.findFirst({
      where: { pondId },
      orderBy: { createdAt: 'desc' },
    });

    return latestMetric;
  }
}
