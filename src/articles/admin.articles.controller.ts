import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { TokenGuard } from 'src/guard/token.guard';
import { AdminGuard } from 'src/guard/admin.guard';
import { ArticlesService } from './articles.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GuardErrorExample } from 'src/errors/examples/guard-error-example';
import { ArticleErrorExample } from 'src/errors/examples/article-error-example';
import { ArticleEntity } from './entities/article.entity';

@Controller('admin/articles')
@UseGuards(TokenGuard, AdminGuard)
@ApiTags('admin/articles')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
  content: {
    'application/json': {
      examples: {
        noToken: { value: GuardErrorExample.noToken },
      },
    },
  },
})
@ApiForbiddenResponse({
  description: 'Forbidden',
  content: {
    'application/json': {
      examples: {
        tokenMismatch: { value: GuardErrorExample.tokenMismatch },
        notAdmin: { value: GuardErrorExample.notAdmin },
      },
    },
  },
})
export class AdminArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created',
    type: ArticleEntity,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    content: {
      'application/json': {
        examples: {
          badRequest: { value: ArticleErrorExample.badRequest },
        },
      },
    },
  })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Patch(':articleId')
  @ApiOkResponse({
    description: 'OK',
    type: ArticleEntity,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    content: {
      'application/json': {
        examples: {
          badRequest: { value: ArticleErrorExample.badRequest },
        },
      },
    },
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
  update(
    @Param('articleId') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'OK',
    type: ArticleEntity,
    isArray: true,
  })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':articleId')
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
  findOne(@Param('articleId') id: string) {
    return this.articlesService.findOne(id);
  }
}
