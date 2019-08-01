import { Injectable } from '@nestjs/common';
import * as ethers from 'ethers';
import { ABI2, ABI, USER_ABI, USER_FACTORY_ABI } from './contractsAbi';
import { User } from '../user/user.model';

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

const USER_FACTORY_CONTRACT_ADDRESS =
  '0xc6022ff51898b4c0011c219e92603035f8d9797e';
const USER_CONTRACT_ADDRESS = '0x1D308c58e0F0F2224Bb0A1B6C375408871e9F0E0';
const userContract = new web3.eth.Contract(USER_ABI, USER_CONTRACT_ADDRESS, {
  from: '0x33CCa1a3068c90b6D222BD7a2B58FC41356945e5',
  gasPrice: '60000000000',
  gas: 10000000,
});

const userFactoryContract = new web3.eth.Contract(
  USER_FACTORY_ABI,
  USER_FACTORY_CONTRACT_ADDRESS,
  {
    from: '0x33CCa1a3068c90b6D222BD7a2B58FC41356945e5',
    gasPrice: '60000000000',
    gas: 10000000,
  },
);

@Injectable()
export class ExpressService {
  private express: any;
  private users: User[] = [];
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

  public async getAllUsers() {
    this.users = [];
    await userFactoryContract
      .getPastEvents('UserCreated', {
        fromBlock: 0,
        toBlock: 'latest',
      })
      .then(events => {
        events.forEach(event => {
          const result = event.returnValues;
          console.log(result);
          let user = new User();
          user.address = result.user;
          user.name = result.userName;
          user.experience = 0;
          this.users.push(user);
        });
      });

    return this.users;
  }

  public async getUser(address: string) {
    await this.getAllUsers();
    return this.users.find((user: User) => user.address === address);
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

  public async createUser(name: string) {
    const provider = new ethers.providers.EtherscanProvider('kovan');

    const wallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(provider);
    const contract = new ethers.Contract(
      USER_FACTORY_CONTRACT_ADDRESS,
      USER_FACTORY_ABI,
      wallet,
    );
    try {
      await console.log(contract.createUser(name));
      return 'OK';
    } catch (e) {
      return e;
    }
  }
}
