import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.model';
import { InvalidInputException } from '../utils/InvalidInputError';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {} // injected mongoose User Model

  async getUsers() {
    const users = await this.userModel.find().exec(); // exec returns a promise
    return users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: user.password,
    }));
  }

  async getUserByUsername(username: string) {
    const user = await this.findUser(username, 'username');
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: user.password,
    };
  }

  async getUserByEmail(username: string) {
    const user = await this.findUser(username, 'email');
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: user.password,
    };
  }

  async insertUser(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
  ) {
    const newUser = new this.userModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
      role: 'user',
    });
    const result = await newUser.save(); // adds to Mongodb
    return result.id as string; // returns generated id that Mongo makes.
  }

  async updateRole(username: string, newRole: string) {
    let updatedUser;
    try {
      updatedUser = await this.findUser(username, 'username');

      if (updatedUser.role !== newRole) {
        if (
          newRole === 'administrator' ||
          newRole === 'analyst' ||
          newRole === 'user'
        ) {
          updatedUser.role = newRole;
        } else {
          throw new InvalidInputException(
            "Role can only be 'user'/'administrator'/'analyst'.",
          );
        }
      }
      await updatedUser.save();
      return newRole;
    } catch (error) {
      throw new NotFoundException('Could not find user: ' + username);
    }
  }

  private async findUser(creds: string, type: string) {
    let user;
    try {
      if (type === 'username') {
        user = await this.userModel.findOne({ username: creds }).exec();
      } else if (type === 'email') {
        user = await this.userModel.findOne({ email: creds }).exec();
      }

      //console.log(user);
    } catch (error) {
      throw new NotFoundException('Could not find user: ' + creds);
    }

    if (!user) {
      throw new NotFoundException('Could not find user: ' + creds);
    }

    return user;
  }

  async deleteUser(username: string, password: string) {
    const user = await this.findUser(username, 'username');
    if (user.password === password) {
      await this.userModel.deleteOne({ username: username }).exec();
    } else {
      throw new UnauthorizedException('Delete aborted: invalid password.');
    }
    return null;
  }
}
