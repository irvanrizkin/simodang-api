import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePondDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  address: string;

  @ApiPropertyOptional()
  city: string;

  @ApiPropertyOptional()
  deviceId: string;

  @ApiPropertyOptional()
  imageUrl: string;

  @ApiPropertyOptional()
  isFilled: boolean;
}
