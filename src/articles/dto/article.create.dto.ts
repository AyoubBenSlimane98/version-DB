import { IsString, IsNotEmpty, IsArray, IsInt, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ArticleCreateDto {
  @ApiProperty({
    description: 'عنوان المقال',
    example: 'أفضل الأماكن السياحية في الجزائر',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'وصف مختصر عن المقال',
    example: 'مقال يشرح أجمل الوجهات السياحية التي يجب زيارتها في الجزائر.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'رابط لصورة المقال (URL صحيح)',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @ApiProperty({
    description: 'مجموعة كلمات مفتاحية متعلقة بالمقال',
    example: ['السياحة', 'الجزائر', 'أماكن سياحية'],
  })
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  keywords: string[];

  @ApiProperty({
    description: 'معرف المشرف الذي أنشأ المقال',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  adminID: number;
}
