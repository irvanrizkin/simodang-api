import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumberString, IsOptional } from 'class-validator';

export class MetricAvgQueryDto {
  @IsDateString()
  @ApiProperty()
  startDate: string;

  @IsDateString()
  @ApiProperty()
  endDate: string;

  @IsNumberString({
    no_symbols: true,
  })
  @IsOptional()
  @ApiPropertyOptional()
  take?: number;

  @IsNumberString({
    no_symbols: true,
  })
  @IsOptional()
  @ApiPropertyOptional()
  page?: number;
}
