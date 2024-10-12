import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateSidebarDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Label of the sidebar. Cannot empty',
  })
  label: string;

  @IsOptional()
  @ApiProperty({
    description: 'URL of the sidebar. If empty default to ""',
  })
  parentId: string;

  @IsOptional()
  @ApiProperty({
    description: 'Icon of the sidebar. If empty default to ""',
  })
  icon: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'Order of the sidebar. If empty default to 0',
  })
  order: number;
}
