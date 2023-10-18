import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { AnalystArticlesService } from './analystArticles.service';

@Controller('analyst')
export class AnalystArticlesController {
  constructor(
    private readonly analystArticlesService: AnalystArticlesService,
  ) {}

  @Get()
  async getAllArticles() {
    const articles = await this.analystArticlesService.getAllArticles();
    return articles;
  }

  @Get('status/:status')
  async getArticlesByStatus(@Param('status') status: string) {
    const articles = await this.analystArticlesService.getArticlesByStatus(
      status,
    );
    return articles;
  }

  @Get('user/:user')
  async getArticlesBySubmitter(@Param('user') user: string) {
    const articles = await this.analystArticlesService.getArticlesBySubmitter(
      user,
    );
    return articles;
  }

  // add an article to analysts queue
  @Post('new')
  async addUser(
    @Body('articleDoi') articleDoi: string,
    @Body('articleSubmitter') articleSubmitter: string,
  ) {
    const queuedArticle = await this.analystArticlesService.queueArticle(
      articleDoi,
      articleSubmitter,
    );

    return { AddedArticle: queuedArticle };
  }

  // Change status of article
  @Patch(':articleDoi')
  async updateArticleStatus(
    @Param('articleDoi') articleDoi: string,
    @Body('status') articleStatus: string,
  ) {
    await this.analystArticlesService.updateArticle(articleDoi, articleStatus);
    return `{"success":"${articleDoi} has status of ${articleStatus}."}`;
  }
}
