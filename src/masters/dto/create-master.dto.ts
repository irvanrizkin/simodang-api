import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateMasterDto {
  @IsString()
  @ApiProperty({
    description: 'master id for identifier, must unique and string',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'name of the master, must string',
  })
  name: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({
    description:
      'A valid phone number format for IoT GSM, only numeric characters are allowed',
  })
  simNumber: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'to show the ownership of the device, if empty will be null',
  })
  userId?: string;
}
