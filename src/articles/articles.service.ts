import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArticleCreateDto, ArticleUpdateDto } from './dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}
  async getArticlesByAdmin(adminId: number) {
    try {
      return await this.prisma.articles.findMany({
        where: {
          adminId: adminId,
        },
      });
    } catch (error) {
      console.error('Failed to fetch articles by admin:', error);
      throw new Error('Could not fetch articles for this admin.');
    }
  }

  async createArticle(articleCreateDto: ArticleCreateDto) {
    const newArticle = await this.prisma.articles.create({
      data: {
        title: articleCreateDto.title,
        description: articleCreateDto.description,
        image: articleCreateDto.image,
        keywords: articleCreateDto.keywords,
        admin: {
          connect: { userId: articleCreateDto.adminID },
        },
      },
    });

    return { message: 'Successfully created new article', newArticle };
  }
  async updateArticle(id: number, articleUpdateDto: ArticleUpdateDto) {
    const existingArticle = await this.prisma.articles.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      throw new NotFoundException('Article not found!');
    }

    const updated = await this.prisma.articles.update({
      where: { id },
      data: { ...articleUpdateDto },
    });

    return {
      message: 'Article updated successfully',
      data: updated,
    };
  }
  async deleteArticleById(id: number) {
    const atricle = await this.prisma.articles.findUnique({ where: { id } });
    if (!atricle) throw new NotFoundException('Article not found');
    await this.prisma.articles.delete({ where: { id: atricle.id } });
    return { message: 'Succes the article is deleted ' };
  }
}
