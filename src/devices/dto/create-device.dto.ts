import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @ApiProperty({
    description: 'device id for identifier, must unique and string',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'name of the device, must string',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'to show the ownership of the device, if empty will be null',
  })
  userId?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description:
      'to show the device belongs to which master, if empty will be null',
  })
  masterId?: string;
}
