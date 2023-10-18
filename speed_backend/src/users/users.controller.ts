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

@Controller('users') // for localhost/users/...
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // retrives all users
  @Get()
  async getAllUsers() {
    return this.userService.getUsers();
  }

  // retrieves a specific user based on username
  @Get('username/:username')
  async getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUsername(username);
  }

  // retrieves a specific user based on email
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  // create a new user
  @Post('new')
  async addUser(
    // body retreives variables from the request object and assigns it to UserVariables
    @Body('firstName') userFirstName: string,
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

  // updated the role of a user based on username
  @Patch(':username')
  async updateUserRole(
    @Param('username') username: string,
    @Body('role') userRole: string,
  ) {
    await this.userService.updateRole(username, userRole);
    return `{"success":"${username} has role of ${userRole}."}`;
  }

  // delete a user based on username
  @Delete(':username')
  async deleteUser(
    @Param('username') username: string,
    @Body('password') password: string,
  ) {
    await this.userService.deleteUser(username, password);
    return `{"success":"${username} has been deleted."}`;
  }
}
