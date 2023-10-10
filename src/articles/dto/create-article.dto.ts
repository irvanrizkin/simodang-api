import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  url: string;

  @ApiPropertyOptional()
  image: string;
}
