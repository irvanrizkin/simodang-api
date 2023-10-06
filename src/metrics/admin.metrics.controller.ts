import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricQueryDto } from './dto/metric-query.dto';
import { TokenGuard } from 'src/guard/token.guard';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('admin/metrics')
@UseGuards(TokenGuard, AdminGuard)
export class AdminMetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('/device/:id')
  findDeviceMetricByHour(
    @Param('id') id: string,
    @Query() metricsQueryDto: MetricQueryDto,
  ) {
    return this.metricsService.findDeviceMetricByHour(id, metricsQueryDto);
  }
}
