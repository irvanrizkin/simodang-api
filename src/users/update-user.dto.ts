import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty({
    description: 'Full name of the user',
  })
  name?: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({
    description:
      'A valid phone number format, only numeric characters are allowed',
  })
  phoneNum?: string;

  @IsOptional()
  @ApiProperty({
    description: 'User address in string',
  })
  address?: string;
}
