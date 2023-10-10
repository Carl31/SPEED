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

  async getArticleById(id: string) {
    const article = await this.findArticle(id);
    return article;
  }

  async createArticle(articleData: any) {
    const newArticle = new this.articleModel(articleData);
    const createdArticle = await newArticle.save();
    return createdArticle;
  }

  async updateArticle(id: string, updateData: any) {
    const updatedArticle = await this.findArticle(id);
    Object.assign(updatedArticle, updateData);
    await updatedArticle.save();
    return updatedArticle;
  }

  async deleteArticle(id: string) {
    const article = await this.findArticle(id);
    await article.remove();
  }

  private async findArticle(id: string) {
    let article;
    try {
      article = await this.articleModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Article not found');
    }
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return article;
  }
}
