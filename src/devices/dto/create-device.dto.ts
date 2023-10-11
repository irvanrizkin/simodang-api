import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  userId?: string;

  @ApiPropertyOptional()
  masterId?: string;
}
