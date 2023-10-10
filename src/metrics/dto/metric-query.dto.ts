import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MetricQueryDto {
  @ApiProperty()
  timeString: string;

  @ApiProperty()
  hours: number;

  @ApiPropertyOptional()
  take?: number;

  @ApiPropertyOptional()
  page?: number;
}
