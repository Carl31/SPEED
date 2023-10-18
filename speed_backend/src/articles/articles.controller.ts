import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async getAllArticles() {
    const articles = await this.articlesService.getAllArticles();
    return articles;
  }

  // inddividual param gets...
  @Get('/title/:title')
  async getArticleById(@Param('title') title: string) {
    const articles = await this.articlesService.getArticlesByTitle(title);
    return articles;
  }

  @Get('authors/:authors')
  async getArticleByAuthors(@Param('authors') authors: string) {
    const articles = await this.articlesService.getArticlesByAuthors(authors);
    return articles;
  }

  @Get('source/:source')
  async getArticleBySource(@Param('source') source: string) {
    const articles = await this.articlesService.getArticlesBySource(source);
    return articles;
  }

  @Get('year/:year')
  async getArticleByYear(@Param('year') year: string) {
    const articles = await this.articlesService.getArticlesByYear(year);
    return articles;
  }

  @Get('doi/:doi')
  async getArticleByDoi(@Param('doi') doi: string) {
    const articles = await this.articlesService.getArticlesByDoi(doi);
    return articles;
  }

  @Get('practice/:practice')
  async getArticleByPractice(@Param('practice') practice: string) {
    const articles = await this.articlesService.getArticlesByPractice(practice);
    return articles;
  }

  @Get('volume/:volume')
  async getArticleByVolume(@Param('volume') volume: string) {
    const articles = await this.articlesService.getArticlesByVolume(volume);
    return articles;
  }

  @Get('pages/:pages')
  async getArticleByPages(@Param('pages') pages: string) {
    const articles = await this.articlesService.getArticlesByPages(pages);
    return articles;
  }

  @Get('analystAgrees/:analystAgrees')
  async getArticleByAnalystAgrees(
    @Param('analystAgrees') analystAgrees: string,
  ) {
    const articles = await this.articlesService.getArticlesByAnalystAgrees(
      analystAgrees,
    );
    return articles;
  }

  @Patch(':articleDoi')
  async updateArticleStatus(
    @Param('articleDoi') articleDoi: string,
    @Body('status') articleStatus: string,
  ) {
    await this.articlesService.updateArticleStatus(articleDoi, articleStatus);
    return `{"success":"${articleDoi} has role of ${articleStatus}."}`;
  }

  // all param gets...
  @Post('search')
  async searchForArticle(
    @Body('articleTitle') articleTitle: string,
    @Body('articleAuthor') articleAuthor: string,
    @Body('articleSource') articleSource: string,
    @Body('articleDoi') articleDoi: string,
    @Body('articlePractice') articlePractice: string,
  ) {
    const results = await this.articlesService.searchForArticle(
      articleTitle,
      articleAuthor,
      articleSource,
      articleDoi,
      articlePractice,
    );
    return results;
  }

  @Post('new')
  async submitArticle(
    @Body('articleTitle') articleTitle: string,
    @Body('articleAuthors') articleAuthors: string[],
    @Body('articleSource') articleSource: string,
    @Body('articleYear') articleYear: string,
    @Body('articleDoi') articleDoi: string,
    @Body('articleSummary') articleSummary: string,
    @Body('articlePractice') articlePractice: string,
    @Body('articleClaim') articleClaim: string,
    @Body('articleVolume') articleVolume: string,
    @Body('articlePages') articlePages: string,
  ) {
    const submittedArticle = await this.articlesService.submitArticle(
      articleTitle,
      articleAuthors,
      articleSource,
      articleYear,
      articleDoi,
      articleSummary,
      articlePractice,
      articleClaim,
      articleVolume,
      articlePages,
    );
    return submittedArticle;
  }
}
