import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateMasterDto {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty()
  simNumber: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  userId?: string;
}
