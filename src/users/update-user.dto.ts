import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsEmail, IsNumberString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description:
      'A valid email address format, The @ and . character are required',
  })
  email: string;

  @IsAlpha()
  @IsOptional()
  @ApiProperty({
    description: 'A valid name format, only alphabet characters are allowed',
  })
  name: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({
    description:
      'A valid phone number format, only numeric characters are allowed',
  })
  phoneNum: string;

  @IsOptional()
  @ApiProperty({
    description: 'User address in string',
  })
  address: string;
}
