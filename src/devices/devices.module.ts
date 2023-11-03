import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminDevicesController } from './admin.devices.controller';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { IotDevicesController } from './iot.devices.controller';

@Module({
  imports: [NotificationsModule],
  controllers: [DevicesController, AdminDevicesController, IotDevicesController],
  providers: [DevicesService, PrismaService],
  exports: [DevicesService],
})
export class DevicesModule {}
