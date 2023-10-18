import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AnalystArticle } from './analystArticles.model';
import { InvalidInputException } from 'src/utils/InvalidInputError';

@Injectable()
export class AnalystArticlesService {
  constructor(
    @InjectModel('AnalystArticle')
    private readonly analystArticleModel: Model<AnalystArticle>,
  ) {}

  async getAllArticles() {
    const articles = await this.analystArticleModel.find().exec();
    return articles;
  }

  async getArticlesByStatus(status: string) {
    const articles = await this.findArticles('articleStatus', status);
    return articles;
  }

  async getArticlesBySubmitter(user: string) {
    const articles = await this.findArticles('articleSubmitter', user);
    return articles;
  }

  private async findArticles(paramType: string, param: string) {
    let articles;
    try {
      if (paramType == 'articleStatus') {
        articles = await this.analystArticleModel
          .findOne({ articleStatus: param })
          .exec();
      } else if (paramType == 'articleSubmitter') {
        articles = await this.analystArticleModel
          .findOne({ articleSubmitter: param })
          .exec();
      } else if (paramType == 'articleDoi') {
        articles = await this.analystArticleModel
          .findOne({ articleDoi: param })
          .exec();
      }

      //console.log(user);
    } catch (error) {
      throw new NotFoundException('Could not find articles.');
    }

    if (!articles) {
      throw new NotFoundException('Could not find articles.');
    }

    return articles;
  }

  async queueArticle(articleDoi: string, articleSubmitter: string) {
    const newArticle = new this.analystArticleModel({
      articleDoi: articleDoi,
      articleStatus: 'pending',
      articleSubmitter: articleSubmitter,
    });
    const result = await newArticle.save(); // adds to Mongodb
    return result; // returns generated id that Mongo makes.
  }

  async updateArticle(doi: string, newStatus: string) {
    let updatedArticle;
    try {
      updatedArticle = await this.findArticles('articleDoi', doi);

      if (updatedArticle.articleStatus !== newStatus) {
        if (newStatus === 'approved' || newStatus === 'rejected') {
          updatedArticle.articleStatus = newStatus;
        } else {
          throw new InvalidInputException(
            "Status can only be 'approved' or 'rejected'.",
          );
        }
      }
      await updatedArticle.save();
      return updatedArticle;
    } catch (error) {
      throw new NotFoundException('Could not find article: ' + doi);
    }
  }
}
