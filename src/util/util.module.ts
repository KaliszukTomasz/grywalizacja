import { Module } from '@nestjs/common';
import { Web3Service } from './web3.service';

@Module({
  imports: [],
  providers: [Web3Service],
})
export class UtilModule {}
