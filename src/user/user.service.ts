import { Injectable } from '@nestjs/common';
import { users } from '../moks/index';

@Injectable()
export class UserService {
  
  getUsers() {
    return users;
  };

  getUserById(_id: string) {
    return users.map((el) => {
      if (el._id === _id) {
        return el
      };
    });
  };
  
};
