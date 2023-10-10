import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMasterDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  simNumber: string;

  @ApiPropertyOptional()
  userId?: string;
}
