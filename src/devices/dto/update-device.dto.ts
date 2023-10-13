import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateDeviceDto } from './create-device.dto';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
  @ApiPropertyOptional()
  notificationEnabled?: boolean;

  @ApiPropertyOptional()
  autoWaterEnabled?: boolean;

  @ApiPropertyOptional()
  autoFeedEnabled?: boolean;

  @ApiPropertyOptional()
  isSaved?: boolean;

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
