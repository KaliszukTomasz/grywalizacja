import { Injectable } from '@nestjs/common';
import * as ethers from 'ethers';
import { ABI2, ABI } from './contractsAbi';

declare let require: any;
const Web3 = require('web3');
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://kovan.infura.io/v3/698335740e6d475a988d2e573741d213',
  ),
  {
    clientConfig: {
      maxReceivedFrameSize: 100000000,
      maxReceivedMessageSize: 100000000,
    },
  },
);
const MNEMONIC =
  'inject trial denial fluid crash fog record enough sauce top obtain genre';
const CONTRACT_ADDRESS = '0x573356137548022a08b35867c2ce495ef925f89a';
web3.eth.defaultAccount = '0xFf5e7F8341342105fb268CFE803e4d827F736bE0';
web3.eth.accounts.wallet.clear();
web3.eth.accounts.privateKeyToAccount(web3.utils.asciiToHex(MNEMONIC));

const myContract = new web3.eth.Contract(ABI2, CONTRACT_ADDRESS, {
  from: '0x2436f57d6a654Bd645A1EEf9C579E3Bc57E41C3E',
  gasPrice: '60000000000',
  gas: 10000000,
});

@Injectable()
export class ExpressService {
  private express: any;
  constructor() {}

  public async getRequest() {
    try {
      return await myContract.methods
        .value()
        .call()
        .then(function(result) {
          // this.value = result;
          console.log(result);
          return result;
        });
    } catch (e) {
      console.log('ERROR!');
      console.log(e);
      return e;
    }
  }

  public async getAllRequests() {
    return await myContract
      .getPastEvents('ValueChanged', { fromBlock: 0, toBlock: 'latest' })
      .then(events => {
        events.forEach(element => {
          console.log(element.returnValues.newValue);
        });
        return events;
      });
  }

  public async makeRequestSet(value: string) {
    const provider = new ethers.providers.EtherscanProvider('kovan');

    const wallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
    try {
      await console.log(contract.setValue(value));
      return 'OK';
    } catch (e) {
      return e;
    }
  }
}
