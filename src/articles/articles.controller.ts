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

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
  @Get('admin/:id')
  async getArticlesByAdmin(@Param('id') adminId: number) {
    return await this.articlesService.getArticlesByAdmin(adminId);
  }

  @Post()
  async createArticle(@Body() articleCreateDto: ArticleCreateDto) {
    return await this.articlesService.createArticle(articleCreateDto);
  }
  @Put('update/:id')
  async updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() articleUpdateDto: ArticleUpdateDto,
  ) {
    return await this.articlesService.updateArticle(id, articleUpdateDto);
  }
  @Delete('delete/:id')
  async deleteArticleById(@Param('id', ParseIntPipe) id: number) {
    return await this.articlesService.deleteArticleById(id);
  }
}
