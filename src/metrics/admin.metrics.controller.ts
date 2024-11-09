import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricQueryDto } from './dto/metric-query.dto';
import { TokenGuard } from 'src/guard/token.guard';
import { AdminGuard } from 'src/guard/admin.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GuardErrorExample } from 'src/errors/examples/guard-error-example';
import { MetricEntity } from './entities/metric.entity';
import { MetricErrorExample } from 'src/errors/examples/metric-error-example';
import { UserGuard } from 'src/guard/user.guard';

@Controller('admin/metrics')
@UseGuards(TokenGuard, UserGuard, AdminGuard)
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

  @Get('/device/:deviceId')
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
  findDeviceMetricByHour(
    @Param('deviceId') id: string,
    @Query() metricsQueryDto: MetricQueryDto,
  ) {
    return this.metricsService.findDeviceMetricByHour(id, metricsQueryDto);
  }
}
