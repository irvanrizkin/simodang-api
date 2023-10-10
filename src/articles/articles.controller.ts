import { Controller, Get, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { ArticleErrorExample } from 'src/errors/examples/article-error-example';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
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
