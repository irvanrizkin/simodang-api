import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMetricDto {
  @ApiPropertyOptional()
  master_id: string;

  @ApiPropertyOptional()
  device_id: string;

  @ApiProperty()
  temper_val: number;

  @ApiProperty()
  ph_val: number;

  @ApiProperty()
  oxygen_val: number;

  @ApiProperty()
  tds_val: number;

  @ApiProperty()
  turbidities_val: number;

  @ApiPropertyOptional({
    default: '2023-09-21 07:00:00',
    description: 'WIB timezone, follows Python format',
  })
  created_at: string;
}
