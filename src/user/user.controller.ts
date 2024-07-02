import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly UserService: UserService) {}
  
  @Get('get-all-users')
  getUsers () {
    return this.UserService.getUsers();
  };
};
