import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { ExpressService } from '../util/express.service';
import { User } from './user.model';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(private expressService: ExpressService) {}

  getAllUsers() {
    return this.expressService.getAllUsers();
  }

  getUser(userAddress: string) {
    return this.expressService.getUser(userAddress);
  }

  createUser(userName: string) {
    return this.expressService.createUser(userName);
  }
}
