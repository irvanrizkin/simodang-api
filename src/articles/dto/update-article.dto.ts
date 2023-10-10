import { CreateArticleDto } from './create-article.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiPropertyOptional()
  published?: number;
}
