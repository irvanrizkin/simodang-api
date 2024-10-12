import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { DevicesModule } from 'src/devices/devices.module';
import { AdminMetricsController } from './admin.metrics.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, DevicesModule],
  controllers: [MetricsController, AdminMetricsController],
  providers: [MetricsService],
  exports: [MetricsService],
})
export class MetricsModule {}
