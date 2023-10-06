import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { DevicesModule } from 'src/devices/devices.module';
import { LogModule } from 'src/log/log.module';
import { AdminMetricsController } from './admin.metrics.controller';

@Module({
  imports: [DevicesModule, LogModule],
  controllers: [MetricsController, AdminMetricsController],
  providers: [MetricsService, PrismaService],
  exports: [MetricsService],
})
export class MetricsModule {}
