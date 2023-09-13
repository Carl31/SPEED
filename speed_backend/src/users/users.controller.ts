import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    return this.userService.getUser(username);
  }

  @Post('new')
  async addUser(
    @Body('firstName') userFirstName: string, // body retreives variables from request object and assigns it to UserVariables
    @Body('lastName') userLastName: string,
    @Body('email') userEmail: string,
    @Body('username') userUsername: string,
    @Body('password') userPassword: string,
  ) {
    const insertedUser = await this.userService.insertUser(
      userFirstName,
      userLastName,
      userEmail,
      userUsername,
      userPassword,
    );

    //return 'New User Inserted: ' + JSON.stringify(insertedUser);
    return { NewUser: insertedUser };
  }

  @Patch(':username')
  async updateUserRole(
    @Param('username') username: string,
    @Body('role') userRole: string,
  ) {
    await this.userService.updateRole(username, userRole);
    return `${username} has role of ${userRole}.`;
  }

  @Delete(':username')
  async deleteUser(
    @Param('username') username: string,
    @Body('password') password: string,
  ) {
    await this.userService.deleteUser(username, password);
    return `${username} has been deleted.`;
  }
}
