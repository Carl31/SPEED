import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './article.model';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}

  async getAllArticles() {
    const articles = await this.articleModel.find().exec();
    return articles;
  }

  async getArticlesByTitle(title: string) {
    const article = await this.findArticles('articleTitle', title);
    return article;
  }

  async getArticlesByAuthors(authors: string) {
    const articles = await this.findArticles('articleAuthors', authors);
    return articles;
  }

  async getArticlesBySource(source: string) {
    const articles = await this.findArticles('articleSource', source);
    return articles;
  }

  async getArticlesByYear(year: string) {
    const articles = await this.findArticles('articleYear', year);
    return articles;
  }

  async getArticlesByDoi(doi: string) {
    const articles = await this.findArticles('articleDoi', doi);
    return articles;
  }

  async getArticlesByPractice(practice: string) {
    const articles = await this.findArticles('articlePractice', practice);
    return articles;
  }

  async getArticlesByVolume(volume: string) {
    const articles = await this.findArticles('articleVolume', volume);
    return articles;
  }

  async getArticlesByPages(pages: string) {
    const articles = await this.findArticles('articlePages', pages);
    return articles;
  }

  async getArticlesByAnalystAgrees(analystAgrees: string) {
    const articles = await this.findArticles(
      'articleAnalystAgrees',
      analystAgrees,
    );
    return articles;
  }

  async searchForArticle(
    articleTitle: string,
    articleAuthor: string,
    articleSource: string,
    articleDoi: string,
    articlePractice: string,
  ) {
    const searchFilters = {
      articleTitle,
      articleAuthor,
      articleSource,
      articleDoi,
      articlePractice,
    };

    // Check if there are any valid search criteria
    const hasValidCriteria = Object.values(searchFilters).some(
      (value) => value && value !== '',
    );

    if (!hasValidCriteria) {
      return [];
    }

    const query = {};

    // Build the query by iterating over the search filters
    for (const key in searchFilters) {
      if (searchFilters[key] && searchFilters[key] !== '') {
        query[key] = { $regex: searchFilters[key], $options: 'i' };
      }
    }

    // Perform the search for all non-empty parameters
    const articles = await this.articleModel.find(query).exec();

    // Remove duplicate DOIs
    const uniqueArticles = articles.filter(
      (article, index, self) =>
        index === self.findIndex((a) => a.articleDoi === article.articleDoi),
    );

    return uniqueArticles;
  }

  async submitArticle(
    articleTitle: string,
    articleAuthors: string[],
    articleSource: string,
    articleYear: string,
    articleDoi: string,
    articleSummary: string,
    articlePractice: string,
    articleClaim: string,
    articleVolume: string,
    articlePages: string,
  ) {
    const newArticle = new this.articleModel({
      articleTitle: articleTitle,
      articleAuthors: articleAuthors,
      articleSource: articleSource,
      articleYear: articleYear,
      articleDoi: articleDoi,
      articleSummary: articleSummary,
      articlePractice: articlePractice,
      articleClaim: articleClaim,
      articleVolume: articleVolume,
      articlePages: articlePages,
      articleAnalystAgrees: 'undecided',
    });
    const submittedArticle = await newArticle.save();
    return submittedArticle;
  }

  // finds article dependant on search parameter type
  private async findArticles(searchParameter: string, parameter: string) {
    let articles;
    try {
      switch (searchParameter) {
        case 'articleTitle':
          articles = await this.articleModel
            .find({ articleTitle: { $regex: parameter, $options: 'i' } })
            .exec();
          break;
        case 'articleAuthors':
          articles = await this.articleModel
            .find({ articleAuthors: { $regex: parameter, $options: 'i' } })
            .exec();
          break;
        case 'articleSource':
          articles = await this.articleModel
            .find({ articleSource: { $regex: parameter, $options: 'i' } })
            .exec();
          break;
        case 'articleYear':
          articles = await this.articleModel
            .find({ articleYear: { $regex: parameter, $options: 'i' } })
            .exec();
          break;
        case 'articleDoi':
          articles = await this.articleModel
            .find({ articleDoi: { $regex: parameter, $options: 'i' } })
            .exec();
          break;
        case 'articlePractice':
          articles = await this.articleModel
            .find({ articlePractice: { $regex: parameter, $options: 'i' } })
            .exec();
          break;
        case 'articleVolume':
          articles = await this.articleModel
            .find({ articleVolume: { $regex: parameter, $options: 'i' } })
            .exec();
          break;
        case 'articlePages':
          articles = await this.articleModel
            .find({ articlePages: { $regex: parameter, $options: 'i' } })
            .exec();
          break;
        case 'articleAnalystAgrees':
          articles = await this.articleModel
            .find({
              articleAnalystAgrees: { $regex: parameter, $options: 'i' },
            })
            .exec();
          break;
        default:
          throw new NotFoundException('Article not found');
      }
    } catch (error) {
      throw new NotFoundException('Article not found');
    }

    if (!articles || articles.length === 0) {
      throw new NotFoundException('Article not found');
    }

    return articles;
  }
}
