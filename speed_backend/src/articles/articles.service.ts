import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './article.model';
import { InvalidInputException } from 'src/utils/InvalidInputError';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}

  private async filterByApproved(articles: Article[]) {
    return articles.filter(
      (article) => article.articleAnalystAgrees === 'approved',
    );
  }

  async getAllArticles() {
    const articles = await this.articleModel.find().exec();
    return this.filterByApproved(articles);
  }

  async getArticlesByTitle(title: string) {
    const articles = await this.findArticles('articleTitle', title);
    return this.filterByApproved(articles);
  }

  async getArticlesByAuthors(authors: string) {
    const articles = await this.findArticles('articleAuthors', authors);
    return this.filterByApproved(articles);
  }

  async getArticlesBySource(source: string) {
    const articles = await this.findArticles('articleSource', source);
    return this.filterByApproved(articles);
  }

  async getArticlesByYear(year: string) {
    const articles = await this.findArticles('articleYear', year);
    return this.filterByApproved(articles);
  }

  async getArticlesByDoi(doi: string) {
    const articles = await this.findArticles('articleDoi', doi);
    return this.filterByApproved(articles);
  }

  async getArticlesByPractice(practice: string) {
    const articles = await this.findArticles('articlePractice', practice);
    return this.filterByApproved(articles);
  }

  async getArticlesByVolume(volume: string) {
    const articles = await this.findArticles('articleVolume', volume);
    return this.filterByApproved(articles);
  }

  async getArticlesByPages(pages: string) {
    const articles = await this.findArticles('articlePages', pages);
    return this.filterByApproved(articles);
  }

  async getArticlesByAnalystAgrees(analystAgrees: string) {
    const articles = await this.findArticles(
      'articleAnalystAgrees',
      analystAgrees,
    );
    return this.filterByApproved(articles);
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
        if (key === 'articleAnalystAgrees') {
          // Special handling for 'articleAnalystAgrees'
          query[key] = searchFilters[key];
        } else {
          query[key] = { $regex: searchFilters[key], $options: 'i' };
        }
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
      articleAnalystAgrees: 'pending',
    });
    const submittedArticle = await newArticle.save();
    return submittedArticle;
  }

  async updateArticleStatus(articleDoi: string, newStatus: string) {
    try {
      const article = (await this.articleModel
        .findOne({ articleDoi: articleDoi })
        .exec()) as Article;

      if (!article) {
        throw new NotFoundException('Could not find article: ' + articleDoi);
      }

      if (article.articleAnalystAgrees !== newStatus) {
        if (newStatus === 'approved' || newStatus === 'rejected') {
          article.articleAnalystAgrees = newStatus;
        } else {
          throw new InvalidInputException(
            "Status can only be 'approved' or 'rejected'.",
          );
        }

        await article.save();
        return article;
      } else {
        // Status is already the same, no update needed
        return article;
      }
    } catch (error) {
      throw new NotFoundException('Could not find article: ' + articleDoi);
    }
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
