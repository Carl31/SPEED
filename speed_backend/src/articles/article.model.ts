import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  articleTitle: { type: String, required: true },
  articleAuthors: { type: [String], required: true },
  articleSource: { type: String, required: true },
  articleYear: { type: String, required: true },
  articleDoi: { type: String, required: true },
  articleSummary: { type: String, required: true },
  articlePractice: { type: String, required: true },
  articleClaim: { type: String, required: true },
  articleVolume: { type: String, required: true },
  articlePages: { type: String, required: true },
  articleAnalystAgrees: { type: String, required: true },
});

export interface Article extends mongoose.Document {
  articleTitle: string;
  articleAuthors: string[];
  articleSource: string;
  articleYear: string;
  articleDoi: string;
  articleSummary: string;
  articlePractice: string;
  articleClaim: string;
  articleVolume: string;
  articlePages: string;
  articleAnalystAgrees: string;
}
