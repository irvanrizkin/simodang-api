import { ApiProperty } from '@nestjs/swagger';
import { Device } from '@prisma/client';
import { PondEntity } from 'src/ponds/entities/pond.entity';
import { DeviceEntity } from './device.entity';

export class DevicePondEntity extends DeviceEntity implements Device {
  @ApiProperty()
  pond: PondEntity;
}
