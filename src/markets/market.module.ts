import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { MarketService } from './market.service';
import { ExpressService } from 'src/util/express.service';

@Module({
  controllers: [MarketController],
  providers: [MarketService, ExpressService],
})
export class MarketModule {}
