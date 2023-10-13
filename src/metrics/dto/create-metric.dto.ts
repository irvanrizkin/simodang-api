import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateMetricDto {
  @IsOptional()
  @ApiPropertyOptional()
  master_id: string;

  @IsOptional()
  @ApiPropertyOptional()
  device_id: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  temper_val: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  ph_val: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  oxygen_val: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  tds_val: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  turbidities_val: number;

  @IsOptional()
  @ApiPropertyOptional({
    default: '2023-09-21 07:00:00',
    description: 'WIB timezone, follows Python format',
  })
  created_at: string;
}
