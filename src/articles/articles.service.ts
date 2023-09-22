import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomBytes } from 'crypto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    const { title, url, image } = createArticleDto;
    const id = `ART${randomBytes(5).toString('hex')}`;

    return await this.prisma.article.create({
      data: {
        id,
        title,
        url,
        image,
      },
    });
  }

  async findAll() {
    return await this.prisma.article.findMany();
  }

  async findOne(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException('article not found');
    }

    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const { title, url, image, published } = updateArticleDto;
    const isExist = this.isArticleExist(id);

    if (!isExist) {
      throw new NotFoundException('article not found');
    }

    return await this.prisma.article.update({
      where: { id },
      data: {
        title,
        url,
        image,
        published,
      },
    });
  }

  private async isArticleExist(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    return !!article;
  }
}
