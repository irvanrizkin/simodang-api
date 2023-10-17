import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumberString, IsOptional } from 'class-validator';

export class MetricAvgQueryDto {
  @IsDateString()
  @ApiProperty({
    description:
      'the beginning date of the data to be averaged. In YYYY-MM-DD format.',
  })
  startDate: string;

  @IsDateString()
  @ApiProperty({
    description:
      'the end date of the data to be averaged. In YYYY-MM-DD format.',
  })
  endDate: string;

  @IsNumberString({
    no_symbols: true,
  })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Amount of data taken from the database for each page.',
  })
  take?: number;

  @IsNumberString({
    no_symbols: true,
  })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Page number of the data taken from the database.',
  })
  page?: number;
}
