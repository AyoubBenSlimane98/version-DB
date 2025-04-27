import { IsString, IsNotEmpty, IsArray, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleUpdateDto {
  @ApiProperty({
    description: 'عنوان المقال الجديد',
    example: 'أجمل الشواطئ في الجزائر',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'الوصف المحدث للمقال',
    example: 'دليل شامل لأجمل الشواطئ الجزائرية المناسبة للسياحة.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'رابط جديد لصورة المقال (رابط URL صحيح)',
    example: 'https://example.com/new-image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @ApiProperty({
    description: 'مجموعة الكلمات المفتاحية الجديدة للمقال',
    example: ['شواطئ', 'سياحة', 'الجزائر'],
  })
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  keywords: string[];
}
