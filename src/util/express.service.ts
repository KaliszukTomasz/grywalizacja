import { Injectable } from '@nestjs/common';
import * as ethers from 'ethers';
import { USER_ABI } from './contractAbis/userAbi';
import { USER_FACTORY_ABI } from './contractAbis/userFactoryAbi';
import { GAME_ABI } from './contractAbis/gameAbi';
import { User } from '../user/user.model';
import { Game } from '../game/game.model';

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
web3.eth.defaultAccount = '0xFf5e7F8341342105fb268CFE803e4d827F736bE0';
web3.eth.accounts.wallet.clear();
web3.eth.accounts.privateKeyToAccount(web3.utils.asciiToHex(MNEMONIC));

const USER_FACTORY_CONTRACT_ADDRESS =
  '0x9f576d449dd9aec375f8a18cd40e92123be303f2';
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
  private games: Game[] = [];
  constructor() {}

  public async getAllUsers(): Promise<User[]> {
    return this.updateAllUsers().then(async result => {
      return this.updateUsersExperience(result);
    });
  }

  private async updateAllUsers() {
    this.users = [];
    await userFactoryContract
      .getPastEvents('UserCreated', {
        fromBlock: 0,
        toBlock: 'latest',
      })
      .then(events => {
        events.forEach(event => {
          const result = event.returnValues;
          const user = new User();
          user.address = result.user;
          user.name = result.userName;
          user.experience = 0;
          this.users.push(user);
        });
      });
    return this.users;
  }
  private async updateUsersExperience(users: User[]) {
    for (const i of users) {
      await this.getActualExperience(i.address).then((res: number) => {
        i.experience = res;
      });
    }
    return users;
  }

  public async getUser(address: string) {
    await this.getAllUsers();
    return this.users.find((user: User) => user.address === address);
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
      await contract.createUser(name);
      return 'OK';
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  public async addExperience(experience: number, userAddress: string) {
    const provider = new ethers.providers.EtherscanProvider('kovan');
    const wallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(provider);
    const contract = new ethers.Contract(userAddress, USER_ABI, wallet);

    try {
      await contract.setExperience(experience);
      return 'OK';
    } catch (e) {
      return e;
    }
  }

  public async createGame(
    userAddress: string,
    gameTitle: string,
    gameDescription: string,
  ) {
    const provider = new ethers.providers.EtherscanProvider('kovan');
    const wallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(provider);
    const contract = new ethers.Contract(userAddress, USER_ABI, wallet);

    try {
      await contract.createGame(gameTitle, gameDescription);
      return 'OK';
    } catch (e) {
      return e;
    }
  }

  public async getActualExperience(userAddress: string): Promise<number> {
    const tempContract = new web3.eth.Contract(USER_ABI, userAddress, {
      from: '0x2436f57d6a654Bd645A1EEf9C579E3Bc57E41C3E',
      gasPrice: '60000000000',
      gas: 10000000,
    });
    return await tempContract
      .getPastEvents('UserExperience', { fromBlock: 0, toBlock: 'latest' })
      .then((events: any[]) => {
        let total: number = 0;
        for (const iterator of events) {
          const expToAdd: number = +iterator.returnValues.newExperience;
          total = total + expToAdd;
        }
        return total;
      });
  }

  private createUserContract(address: string) {
    return new web3.eth.Contract(USER_ABI, address, {
      from: '0x33CCa1a3068c90b6D222BD7a2B58FC41356945e5',
      gasPrice: '60000000000',
      gas: 10000000,
    });
  }

  public async getGame(address: string) {
    await this.getAllGames();
    return this.games.find((game: Game) => game.address === address);
  }

  public async getAllGames(): Promise<Game[]> {
    this.games = [];
    await this.updateAllUsers();
    var bar = new Promise(async (resolve, reject) => {
      let i = 0;
      for (const user of this.users) {
        await this.createUserContract(user.address)
          .getPastEvents('GameCreated', {
            fromBlock: 0,
            toBlock: 'latest',
          })
          .then(events => {
            events.forEach(event => {
              const result = event.returnValues;
              const game = new Game();
              game.address = result.created;
              game.title = result.gameTitle;
              game.description = 'description';
              game.author = result.creator;
              this.games.push(game);
            });
          })
          .then(result => {
            if (i === this.users.length - 1) {
              resolve();
            }
          });
        i++;
      }
    });

    await bar.then(() => {
      console.log('All done!');
    });
    console.log('GAMES!! ' + this.games);
    return this.games;
  }
}
