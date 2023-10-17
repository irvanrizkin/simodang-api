import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateMetricDto {
  @IsOptional()
  @ApiPropertyOptional({
    description:
      'to validate the device is belongs to which master. Can be null if device_id null',
  })
  master_id: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'to set the metric is belongs to which device. Can be null',
  })
  device_id: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'temperature value sent from IoT',
  })
  temper_val: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'ph value sent from IoT',
  })
  ph_val: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'total dissolved oxygen value sent from IoT',
  })
  oxygen_val: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'total dissolved solids value sent from IoT',
  })
  tds_val: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'turbidities value sent from IoT',
  })
  turbidities_val: number;

  @IsOptional()
  @ApiPropertyOptional({
    default: '2023-09-21 07:00:00',
    description: 'WIB timezone, follows Python format',
  })
  created_at: string;
}
