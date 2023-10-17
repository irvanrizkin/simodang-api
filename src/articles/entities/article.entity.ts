import { ApiProperty } from '@nestjs/swagger';
import { Article } from '@prisma/client';

export class ArticleEntity implements Article {
  @ApiProperty({
    description: 'Article id for identifier, automatically generated.',
  })
  id: string;

  @ApiProperty({
    description: 'Title of the article.',
  })
  title: string;

  @ApiProperty({
    description: 'Link to the article for Webview.',
  })
  url: string;

  @ApiProperty({
    description: 'Link to the image for `<img>` tag.',
  })
  image: string;

  @ApiProperty({
    description:
      'Determine if article is published or not. If true, the article is public',
  })
  published: boolean;

  @ApiProperty({
    description: 'Date when the article is created. In ISO format.',
  })
  createdAt: Date;
}
