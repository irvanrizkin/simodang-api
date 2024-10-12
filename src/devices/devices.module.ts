import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { AdminDevicesController } from './admin.devices.controller';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { IotDevicesController } from './iot.devices.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [
    DevicesController,
    AdminDevicesController,
    IotDevicesController,
  ],
  providers: [DevicesService],
  exports: [DevicesService],
})
export class DevicesModule {}
