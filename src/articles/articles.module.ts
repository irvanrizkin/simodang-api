import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminArticlesController } from './admin.articles.controller';

@Module({
  controllers: [ArticlesController, AdminArticlesController],
  providers: [ArticlesService, PrismaService],
})
export class ArticlesModule {}
