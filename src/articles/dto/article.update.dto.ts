import { IsString, IsNotEmpty, IsArray, IsUrl } from 'class-validator';

export class ArticleUpdateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  keywords: string[];
}
