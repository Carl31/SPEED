import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.model';
import { InvalidInputException } from '../utils/InvalidInputError';

@Injectable()
export class UsersService {
  private users: User[] = []; // init empty user array - is private so only this file can interact with object

  getUsers() {
    const usersCopy = Object.assign({}, this.users); // to ensure that the returned object array is NOT editable
    return usersCopy;
  }

  getUser(username: string) {
    const user = this.findUser(username);
    const userCopy = Object.assign({}, user);
    return userCopy;
  }

  insertUser(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
  ) {
    const newUser = new User(
      firstName,
      lastName,
      email,
      username,
      password,
      'user',
    );
    this.users.push(newUser);
    const userCopy = Object.assign({}, newUser);
    return userCopy;
  }

  updateRole(username: string, newRole: string) {
    const user = this.findUser(username);
    if (user.role.localeCompare(newRole) != 0) {
      if (
        newRole === 'administrator' ||
        newRole === 'analyst' ||
        newRole === 'user'
      ) {
        user.role = newRole;
      } else {
        throw new InvalidInputException(
          "Role can only be 'user'/'administrator'/'analyst'.",
        );
      }
    }
    return newRole;
  }

  private findUser(username: string) {
    const user = this.users.find((user) => user.username === username);
    if (!user) {
      throw new NotFoundException("That username doesn't exist.");
    }
    return user;
  }

  deleteUser(username: string, password: string) {
    const user = this.users.find((user) => user.username === username);
    if (user.password === password) {
      const updatedUsers = this.users.filter((user) => {
        return user.username != username;
      });
      this.users = updatedUsers;
    } else {
      throw new UnauthorizedException('Delete aborted: invalid password.');
    }
    return null;
  }
}
