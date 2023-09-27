import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  // uses JS instead of TS

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export interface User extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: string;
}
