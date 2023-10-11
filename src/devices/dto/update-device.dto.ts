import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateDeviceDto } from './create-device.dto';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
  @ApiPropertyOptional()
  notificationEnabled?: number;

  @ApiPropertyOptional()
  autoWaterEnabled?: number;

  @ApiPropertyOptional()
  autoFeedEnabled?: number;

  @ApiPropertyOptional()
  isSaved?: number;

  @ApiPropertyOptional()
  tempLow?: number;

  @ApiPropertyOptional()
  tempHigh?: number;

  @ApiPropertyOptional()
  phLow?: number;

  @ApiPropertyOptional()
  phHigh?: number;

  @ApiPropertyOptional()
  tdoLow?: number;

  @ApiPropertyOptional()
  tdoHigh?: number;

  @ApiPropertyOptional()
  tdsLow?: number;

  @ApiPropertyOptional()
  tdsHigh?: number;

  @ApiPropertyOptional()
  turbiditiesLow?: number;

  @ApiPropertyOptional()
  turbiditiesHigh?: number;
}
