import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Title of the article.',
    default: 'Lorem ipsum dolor sit amet',
  })
  title: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Link to the article for Webview.',
    default: 'https://example.com/article',
  })
  url: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Link to the image for `<img>` tag.',
    default: 'https://example.com/image.jpg',
  })
  image: string;
}
