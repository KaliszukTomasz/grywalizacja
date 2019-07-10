import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './player.model';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  addPlayer(@Body('name') playerName: string) {
    const generatedId = this.playersService.insertPlayer(playerName);
    return { id: generatedId };
  }

  @Get(':id')
  getPlayer(@Param('id') playerId: string) {
    return this.playersService.getSinglePlayer(playerId);
  }

  @Get()
  getAllPlayers() {
    return { players: this.playersService.getPlayers() };
  }

  @Patch(':id')
  updatePlayer(@Param('id') playerId: string, @Body('name') newName: string) {
    this.playersService.updatePlayer(playerId, newName);
    return null;
  }

  @Delete(':id')
  removePlayer(@Param('id') playerId: string): Player {
    return this.playersService.deletePlayer(playerId);
  }
}
