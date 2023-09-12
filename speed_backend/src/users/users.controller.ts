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
  getAllUsers() {
    return JSON.stringify(this.userService.getUsers());
  }

  @Get(':username')
  getUser(@Param('username') username: string) {
    return JSON.stringify(this.userService.getUser(username));
  }

  @Post('new')
  addUser(
    @Body('firstName') userFirstName: string, // body retreives variables from request object and assigns it to UserVariables
    @Body('lastName') userLastName: string,
    @Body('email') userEmail: string,
    @Body('username') userUsername: string,
    @Body('password') userPassword: string,
  ) {
    const insertedUser = this.userService.insertUser(
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
  updateUserRole(
    @Param('username') username: string,
    @Body('role') userRole: string,
  ) {
    this.userService.updateRole(username, userRole);
    return `${username} has role of ${userRole}.`;
  }

  @Delete(':username')
  deleteUser(
    @Param('username') username: string,
    @Body('password') password: string,
  ) {
    this.userService.deleteUser(username, password);
    return `${username} has been deleted.`;
  }
}
