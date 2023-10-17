import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricQueryDto } from './dto/metric-query.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MetricAvgQueryDto } from './dto/metric-avg-query.dto';
import { MetricEntity } from './entities/metric.entity';
import { MetricErrorExample } from 'src/errors/examples/metric-error-example';
import { MetricAvgEntity } from './entities/metric-avg.entity';

@Controller('metrics')
@ApiTags('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Post()
  @ApiOkResponse({
    description: 'OK',
    type: MetricEntity,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    content: {
      'application/json': {
        examples: {
          badRequestMetric: { value: MetricErrorExample.badRequestMetric },
          masterMismatch: { value: MetricErrorExample.masterMismatch },
          invalidDate: { value: MetricErrorExample.invalidDate },
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    content: {
      'application/json': {
        examples: {
          deviceNotFound: { value: MetricErrorExample.deviceNotFound },
        },
      },
    },
  })
  async create(@Body() createMetricDto: CreateMetricDto) {
    return this.metricsService.create(createMetricDto);
  }

  @Get('/:pondId')
  @ApiOkResponse({
    description: 'OK',
    type: MetricEntity,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    content: {
      'application/json': {
        examples: {
          badRequest: { value: MetricErrorExample.badRequest },
        },
      },
    },
  })
  findAllMetricsByHour(
    @Param('pondId') id: string,
    @Query() metricsQueryDto: MetricQueryDto,
  ) {
    return this.metricsService.findAllMetricsByHour(id, metricsQueryDto);
  }

  @ApiOkResponse({
    description: 'OK',
    type: MetricAvgEntity,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    content: {
      'application/json': {
        examples: {
          badRequest: { value: MetricErrorExample.badRequestAvg },
        },
      },
    },
  })
  @Get('/avg/:pondId')
  findAveragedMetricsByRangeDate(
    @Param('pondId') id: string,
    @Query() metricAvgQueryDto: MetricAvgQueryDto,
  ) {
    return this.metricsService.findAveragedMetricsByRangeDate(
      id,
      metricAvgQueryDto,
    );
  }

  @Get('/last/:pondId')
  @ApiOkResponse({
    description: 'OK',
    type: MetricEntity,
  })
  findLastMetric(@Param('pondId') id: string) {
    return this.metricsService.findLastMetric(id);
  }
}
