import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { ExpressService } from '../util/express.service';

@Module({
  controllers: [GameController],
  providers: [GameService, ExpressService],
})
export class GameModule {}
