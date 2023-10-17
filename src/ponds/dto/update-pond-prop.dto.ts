import { OmitType, PartialType } from '@nestjs/swagger';
import { UpdateDeviceDto } from 'src/devices/dto/update-device.dto';

export class UpdatePondPropDto extends PartialType(
  OmitType(UpdateDeviceDto, ['name', 'userId', 'masterId'] as const),
) {}
