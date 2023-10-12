import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumberString, IsOptional } from 'class-validator';

export class MetricQueryDto {
  @IsDateString()
  @ApiProperty()
  timeString: string;

  @ApiProperty()
  @IsNumberString({
    no_symbols: true,
  })
  hours: number;

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
