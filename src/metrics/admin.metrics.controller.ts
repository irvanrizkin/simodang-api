import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricQueryDto } from './dto/metric-query.dto';
import { TokenGuard } from 'src/guard/token.guard';
import { AdminGuard } from 'src/guard/admin.guard';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GuardErrorExample } from 'src/errors/examples/guard-error-example';

@Controller('admin/metrics')
@UseGuards(TokenGuard, AdminGuard)
@ApiTags('admin/metrics')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
  content: {
    'application/json': {
      examples: {
        noToken: { value: GuardErrorExample.noToken },
      },
    },
  },
})
@ApiForbiddenResponse({
  description: 'Forbidden',
  content: {
    'application/json': {
      examples: {
        tokenMismatch: { value: GuardErrorExample.tokenMismatch },
        notAdmin: { value: GuardErrorExample.notAdmin },
      },
    },
  },
})
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
