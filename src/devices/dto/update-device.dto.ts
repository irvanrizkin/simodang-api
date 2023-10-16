import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CreateDeviceDto } from './create-device.dto';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateDeviceDto extends PartialType(
  OmitType(CreateDeviceDto, ['id'] as const),
) {
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'to show the device is enabled to send notification or not',
  })
  notificationEnabled?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'to show the device auto water system is enabled or not',
  })
  autoWaterEnabled?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'to show the device auto shrimp feed system is enabled or not',
  })
  autoFeedEnabled?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'if false, the metric will be saved on temp table',
  })
  @ApiPropertyOptional()
  isSaved?: boolean;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'low threshold for temperature',
  })
  tempLow?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'high threshold for temperature',
  })
  tempHigh?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'low threshold for ph',
  })
  phLow?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'high threshold for ph',
  })
  phHigh?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'low threshold for total dissolved oxygen',
  })
  tdoLow?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'high threshold for total dissolved oxygen',
  })
  tdoHigh?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'low threshold for total dissolved solids',
  })
  tdsLow?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'high threshold for total dissolved solids',
  })
  tdsHigh?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'low threshold for turbidities',
  })
  turbiditiesLow?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'high threshold for turbidities',
  })
  turbiditiesHigh?: number;
}
