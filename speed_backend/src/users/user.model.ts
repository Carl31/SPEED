import * as mongoose from 'mongoose';

// export const UserSchema = new mongoose.Schema({
//   // uses JS instead of TS

//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true },
//   username: { type: String, required: true },
//   password: { type: String, required: true },
// });

export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public username: string,
    public password: string,
    public role: string,
  ) {}
}
