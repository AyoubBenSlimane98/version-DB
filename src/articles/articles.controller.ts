import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleCreateDto, ArticleUpdateDto } from './dto';
import { ArticlesService } from './articles.service';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('إدارة المقالات')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('admin/:id')
  @ApiOperation({
    summary: 'جلب مقالات مشرف',
    description:
      'تقوم هذه العملية بجلب جميع المقالات المرتبطة بمشرف معين عبر معرفه.',
  })
  @ApiParam({ name: 'id', description: 'معرف المشرف' })
  async getArticlesByAdmin(@Param('id') adminId: number) {
    return await this.articlesService.getArticlesByAdmin(adminId);
  }

  @Post()
  @ApiOperation({
    summary: 'إنشاء مقال جديد',
    description: 'تقوم هذه العملية بإنشاء مقال جديد عبر إرسال بيانات المقال.',
  })
  async createArticle(@Body() articleCreateDto: ArticleCreateDto) {
    return await this.articlesService.createArticle(articleCreateDto);
  }

  @Put('update/:id')
  @ApiOperation({
    summary: 'تحديث مقال',
    description: 'تقوم هذه العملية بتحديث بيانات مقال موجود عن طريق معرفه.',
  })
  @ApiParam({ name: 'id', description: 'معرف المقال المراد تحديثه' })
  async updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() articleUpdateDto: ArticleUpdateDto,
  ) {
    return await this.articlesService.updateArticle(id, articleUpdateDto);
  }

  @Delete('delete/:id')
  @ApiOperation({
    summary: 'حذف مقال',
    description: 'تقوم هذه العملية بحذف مقال معين عن طريق معرفه.',
  })
  @ApiParam({ name: 'id', description: 'معرف المقال المراد حذفه' })
  async deleteArticleById(@Param('id', ParseIntPipe) id: number) {
    return await this.articlesService.deleteArticleById(id);
  }
}
