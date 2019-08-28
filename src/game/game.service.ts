import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { ExpressService } from '../util/express.service';
import { Game } from './game.model';

@Injectable()
export class GameService {
  private games: Game[] = [];

  constructor(private expressService: ExpressService) {}

  getAllGames(): Promise<Game[]> {
    return this.expressService.getAllGames();
  }

  getGame(gameAddress: string) {
    return this.expressService.getGame(gameAddress);
  }

  createGame(userAddress: string, gameTitle: string, gameDescription: string) {
    return this.expressService.createGame(
      userAddress,
      gameTitle,
      gameDescription,
    );
  }
}
