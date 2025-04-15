import { IsString, IsNotEmpty, IsArray, IsInt, IsUrl } from 'class-validator';

export class ArticleCreateDto {
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

  @IsInt()
  @IsNotEmpty()
  adminID: number;
}
