import { Controller, Get, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleErrorExample } from 'src/errors/examples/article-error-example';
import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOkResponse({
    description: 'OK',
    type: ArticleEntity,
    isArray: true,
  })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'OK',
    type: ArticleEntity,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    content: {
      'application/json': {
        examples: {
          notFound: { value: ArticleErrorExample.notFound },
        },
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }
}
