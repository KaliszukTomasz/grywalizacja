import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { GameService } from './game.service';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get(':address')
  getGame(@Param('address') gameAddress: string) {
    return this.gameService.getGame(gameAddress);
  }

  @Get()
  getAllGames() {
    return this.gameService.getAllGames();
  }

  @Post()
  createGame(
    @Body('userAddress') userAddress: string,
    @Body('gameTitle') gameTitle: string,
    @Body('gameDescription') gameDescription: string,
  ) {
    return this.gameService.createGame(userAddress, gameTitle, gameDescription);
  }
}
