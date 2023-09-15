import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceDto } from './create-device.dto';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
  notificationEnabled?: number;
  tempLow?: number;
  tempHigh?: number;
  phLow?: number;
  phHigh?: number;
  tdoLow?: number;
  tdoHigh?: number;
  tdsLow?: number;
  tdsHigh?: number;
  turbiditiesLow?: number;
  turbiditiesHigh?: number;
}
