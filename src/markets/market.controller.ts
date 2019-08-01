import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get(':address')
  getStatus(@Param('address') marketAddress: string) {
    return this.marketService.getResponseFromExpress();
  }

  @Get()
  getAllEvents() {
    return this.marketService.getAllEvents();
  }

  @Post()
  setTextInExpress(@Body('text') text: string) {
    return this.marketService.insertValueExpress(text);
  }
}
