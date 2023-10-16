import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePondDto } from './create-pond.dto';
import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class UpdatePondDto extends PartialType(CreatePondDto) {
  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    description: 'Seed date of the pond. Must on ISO 8601 format',
    example: '2023-10-16T06:15:51.941Z',
  })
  seedDate?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Seed count of the pond. Must be a number',
  })
  seedCount?: number;
}
