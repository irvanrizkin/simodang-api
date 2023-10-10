import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePondPropDto {
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
