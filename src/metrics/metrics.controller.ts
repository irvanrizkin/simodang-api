import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricQueryDto } from './dto/metric-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { MetricAvgQueryDto } from './dto/metric-avg-query.dto';

@Controller('metrics')
@ApiTags('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Post()
  async create(@Body() createMetricDto: CreateMetricDto) {
    return this.metricsService.create(createMetricDto);
  }

  @Get('/:id')
  findAllMetricsByHour(
    @Param('id') id: string,
    @Query() metricsQueryDto: MetricQueryDto,
  ) {
    return this.metricsService.findAllMetricsByHour(id, metricsQueryDto);
  }

  @Get('/avg/:id')
  findAveragedMetricsByRangeDate(
    @Param('id') id: string,
    @Query() metricAvgQueryDto: MetricAvgQueryDto,
  ) {
    return this.metricsService.findAveragedMetricsByRangeDate(
      id,
      metricAvgQueryDto,
    );
  }

  @Get('/last/:id')
  findLastMetric(@Param('id') id: string) {
    return this.metricsService.findLastMetric(id);
  }
}
