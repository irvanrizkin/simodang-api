import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreatePondDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the pond. Cannot empty',
  })
  name: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Address of the pond. If empty default to ""',
  })
  address: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'City of the pond. If empty default to ""',
  })
  city: string;

  @IsOptional()
  @ApiPropertyOptional({
    description:
      'Device ID of the pond. Device must listed on /devices. If empty default to null',
  })
  deviceId: string;

  @IsOptional()
  @IsUrl()
  @ApiPropertyOptional({
    description:
      'Image URL of the pond. Must on URL format. If empty default to ""',
  })
  imageUrl: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    description:
      'Status whether the pond filled by shrimp of not. Only true/false accepted. If empty default to false',
  })
  isFilled: boolean;
}
