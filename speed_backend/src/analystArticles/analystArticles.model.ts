import * as mongoose from 'mongoose';

export const AnalystArticleSchema = new mongoose.Schema({
  articleDoi: { type: String, required: true },
  articleStatus: { type: String, required: true },
  articleSubmitter: { type: String, required: true },
});

export interface AnalystArticle extends mongoose.Document {
  articleDoi: string;
  articleStatus: string;
  articleSubmitter: string;
}
