import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminDevicesController } from './admin.devices.controller';

@Module({
  controllers: [DevicesController, AdminDevicesController],
  providers: [DevicesService, PrismaService],
  exports: [DevicesService],
})
export class DevicesModule {}
