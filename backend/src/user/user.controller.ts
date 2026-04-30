import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUser } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() Body: CreateUser) {
    await this.userService.createUser(Body);
    return {
      message: 'User created successfully',
    };
  }
}
