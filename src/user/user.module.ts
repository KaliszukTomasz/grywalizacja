import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ExpressService } from '../util/express.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ExpressService],
})
export class UserModule {}
