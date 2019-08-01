import { Injectable, NotFoundException } from '@nestjs/common';
import { Marketplace } from './market.model';
import { Observable, Subject } from 'rxjs';
import { ExpressService } from '../util/express.service';

@Injectable()
export class MarketService {
  private markets: Marketplace[] = [];

  marketplaceMinListSubject = new Subject<Marketplace[]>();
  MarketPlaceContract: any;
  MarketPlaceFactoryContract: any;

  constructor(private expressService: ExpressService) {}

  insertMarket(address: string, name: string) {}

  getSingleMarket(marketAddress: string): { name: string } {
    const market = this.findMarket(marketAddress)[0];
    return { ...market };
  }

  getMarkets() {
    return [...this.markets];
  }

  getResponseFromExpress() {
    return this.expressService.getRequest();
  }

  getAllEvents() {
    return this.expressService.getAllRequests();
  }

  insertValueExpress(text: string) {
    return this.expressService.makeRequestSet(text);
  }

  private findMarket(marketAddress: string): [Marketplace, number] {
    const marketIndex: number = this.markets.findIndex(
      (tempMarket: Marketplace) => tempMarket.address === marketAddress,
    );
    const market = this.markets[marketIndex];
    if (!market) {
      throw new NotFoundException('Could not find market.');
    }
    return [{ ...market }, marketIndex];
  }

  // private createMarketplace(marketplaceName): Observable<Marketplace> {
  //   let marketplaceSubject = new Subject<Marketplace>();

  //   this.MarketPlaceFactoryContract.deployed()
  //     .then(instance => {
  //       return instance.createMarketPlace(this.fromAscii(marketplaceName), {
  //         from: this.getDefaultAccount(),
  //       });
  //     })
  //     .then(result => {
  //       let resultLog = result.logs[0];

  //       if (resultLog.event === 'MarketplaceCreated') {
  //         marketplaceSubject.next(result);
  //       }
  //     });

  //   return marketplaceSubject.asObservable();
  // }
}
