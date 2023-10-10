import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePondDto } from './create-pond.dto';

export class UpdatePondDto extends PartialType(CreatePondDto) {
  @ApiPropertyOptional()
  seedDate?: string;
}
