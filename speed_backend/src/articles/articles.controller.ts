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
  async submitArticle(
    @Body('title') articleTitle: string,
    @Body('authors') articleAuthors: string,
    @Body('source') articleSource: string,
    @Body('year') articleYear: string,
    @Body('doi') articleDoi: string,
    @Body('summary') articleSummary: string,
  ) {
    const submittedArticle = await this.articlesService.submitArticle(
      articleTitle,
      articleAuthors,
      articleSource,
      articleYear,
      articleDoi,
      articleSummary,
    );
    return submittedArticle;
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
