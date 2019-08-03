import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PlayersModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
