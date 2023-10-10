import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  journal: { type: String, required: true },
  year: { type: Number, required: true },
  volume: { type: String, required: true },
  number: { type: String, required: true },
  pages: { type: String, required: true },
  doi: { type: String, required: true },
  sePractice: { type: String, required: true },
  claim: { type: String, required: true },
  result: { type: String, required: true },
  researchType: { type: String, required: true },
  participantType: { type: String, required: true },
});

export interface Article extends mongoose.Document {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume: string;
  number: string;
  pages: string;
  doi: string;
  sePractice: string;
  claim: string;
  result: string;
  researchType: string;
  participantType: string;
}
