import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { DevicesModule } from 'src/devices/devices.module';

@Module({
  imports: [DevicesModule],
  controllers: [MetricsController],
  providers: [MetricsService, PrismaService],
  exports: [MetricsService],
})
export class MetricsModule {}
