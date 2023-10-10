import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async getAllArticles() {
    const articles = await this.articlesService.getAllArticles();
    return articles;
  }

  @Get(':id')
  async getArticleById(@Param('id') id: string) {
    const article = await this.articlesService.getArticleById(id);
    return article;
  }

  @Post()
  async createArticle(
    @Body() articleData: any, // Define a DTO (Data Transfer Object) for article creation
  ) {
    const createdArticle = await this.articlesService.createArticle(
      articleData,
    );
    return createdArticle;
  }

  @Patch(':id')
  async updateArticle(@Param('id') id: string, @Body() updateData: any) {
    const updatedArticle = await this.articlesService.updateArticle(
      id,
      updateData,
    );
    return updatedArticle;
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    await this.articlesService.deleteArticle(id);
    return { message: 'Article deleted successfully' };
  }
}
