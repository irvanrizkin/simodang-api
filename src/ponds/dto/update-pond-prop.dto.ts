import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePondPropDto {
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
