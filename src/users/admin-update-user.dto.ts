import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UpdateUserDto } from './update-user.dto';
import { IsOptional } from 'class-validator';

export class AdminUpdateUserDto extends PartialType(UpdateUserDto) {
  @IsOptional()
  @ApiProperty({
    description: 'Role between admin/user',
  })
  role?: string;
}
