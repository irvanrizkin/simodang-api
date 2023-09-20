import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricQueryDto } from './dto/metric-query.dto';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Post()
  create(@Body() createMetricDto: CreateMetricDto) {
    return this.metricsService.create(createMetricDto);
  }

  @Get('/aggregated/:id')
  findMetricsByRangeDate(
    @Param('id') id: string,
    @Query() metricsQueryDto: MetricQueryDto,
  ) {
    return this.metricsService.findMetricsByRangeDate(id, metricsQueryDto);
  }

  @Get('/last/:id')
  findLastMetric(@Param('id') id: string) {
    return this.metricsService.findLastMetric(id);
  }
}
