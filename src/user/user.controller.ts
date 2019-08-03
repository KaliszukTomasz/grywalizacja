import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':address')
  getUser(@Param('address') userAddress: string) {
    return this.userService.getUser(userAddress);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  createUser(@Body('name') userName: string) {
    return this.userService.createUser(userName);
  }

  @Post(':address')
  addExperience(
    @Param('address') userAddress: string,
    @Body('exp') exp: number,
  ) {
    return this.userService.addExperience(exp, userAddress);
  }
}
