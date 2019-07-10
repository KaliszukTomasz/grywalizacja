import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from './player.model';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  insertPlayer(name: string) {
    const playerId: string = Math.random().toString();
    const newPlayer = new Player(playerId, name, 0);
    this.players.push(newPlayer);
    return playerId;
  }

  getSinglePlayer(playerId: string): { name: string } {
    const player = this.findPlayer(playerId)[0];
    return { ...player };
  }

  getPlayers() {
    return [...this.players];
  }

  updatePlayer(playerId: string, newName: string) {
    const [player, index] = this.findPlayer(playerId);
    const updatedPlayer = { ...player };
    if (newName) {
      updatedPlayer.name = newName;
    }
    this.players[index] = updatedPlayer;
  }

  deletePlayer(playerId: string): Player {
    const [player, playerIndex] = this.findPlayer(playerId);
    this.players.splice(playerIndex, 1);
    return player;
  }

  private findPlayer(playerId: string): [Player, number] {
    const playerIndex: number = this.players.findIndex(
      (tempPlayer: Player) => tempPlayer.id === playerId,
    );
    const player = this.players[playerIndex];
    if (!player) {
      throw new NotFoundException('Could not find player.');
    }
    return [{ ...player }, playerIndex];
  }
}
