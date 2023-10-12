import { IsBoolean, IsOptional } from 'class-validator';
import { CreateArticleDto } from './create-article.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description:
      'Determine if article is published or not. If true, the article is public',
    default: false,
  })
  published?: boolean;
}
