import { User } from './user.model';

export class Marketplace {
  address: string;
  name: string;
  registeredUsers: User[];
  constructor(address: string, marketplaceName: string) {
    this.address = address;
    this.name = marketplaceName;
    this.registeredUsers = [];
  }
}
