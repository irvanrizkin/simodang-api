import { ApiProperty } from '@nestjs/swagger';
import { Article } from '@prisma/client';

export class ArticleEntity implements Article {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  createdAt: Date;
}
