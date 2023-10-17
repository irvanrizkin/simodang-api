import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumberString, IsOptional } from 'class-validator';

export class MetricQueryDto {
  @IsDateString()
  @ApiProperty({
    description: 'The ISO date string of the date to be queried.',
  })
  timeString: string;

  @IsNumberString({
    no_symbols: true,
  })
  @ApiProperty({
    description: 'The subtracted hours from the timeString.',
  })
  hours: number;

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
