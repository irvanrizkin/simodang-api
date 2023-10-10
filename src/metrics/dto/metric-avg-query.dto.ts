import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MetricAvgQueryDto {
  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiPropertyOptional()
  take?: number;

  @ApiPropertyOptional()
  page?: number;
}
