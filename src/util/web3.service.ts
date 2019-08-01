import { Injectable } from '@nestjs/common';
import { Subject, Observable, of } from 'rxjs';
// import * as Web3 from 'web3';
import * as contract from 'truffle-contract';

declare let require: any;
const Web3 = require('web3');

declare let window: any;

@Injectable()
export class Web3Service {
  private web3: any;
  private accounts: string[];
  private ready = false;
  // private Contract: any;
  private accountsObservable = new Subject<string[]>();
  private balanceOfAddressSubject = new Subject<string>();
  private currentBalance: string = '0';
  // private isAdminObservable = new Subject<boolean>();

  constructor() {
    window.addEventListener('load', event => {
      this.bootstrapWeb3();
    });
  }

  private bootstrapWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
      console.log('web3 log: ');
      console.log(this.web3);
      this.web3.eth.defaultAccount = this.web3.eth.accounts[0];
    } else {
      console.log('No web3? You should consider trying MetaMask!');

      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync =
        Web3.providers.HttpProvider.prototype.send;
      // fallback - use your lfallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545'),
      );
    }

    setInterval(() => this.refreshAccounts(), 1000);
  }

  public getWeb3Config() {
    return this.web3;
  }

  public toAscii(someData: string) {
    return this.web3.toAscii(someData);
  }

  public async artifactsToContract(artifacts) {
    if (!this.web3) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.artifactsToContract(artifacts);
    }

    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    return contractAbstraction;
  }

  private refreshAccounts() {
    this.web3.eth.getAccounts((err, accs) => {
      console.log('Refreshing accounts');
      if (err != null) {
        console.warn('There was an error fetching your accounts.');
        return;
      }

      // Get the initial account balance so it can be displayed.
      if (accs.length === 0) {
        console.warn(
          "Couldn't get any accounts! Make sure your Ethereum client is configured correctly.",
        );
        return;
      }
      if (
        !this.accounts ||
        this.accounts.length !== accs.length ||
        this.accounts[0] !== accs[0]
      ) {
        console.log('Observed new accounts');
        this.web3 = new Web3(window.web3.currentProvider);
        this.web3.eth.defaultAccount = this.web3.eth.accounts[0];
        this.accountsObservable.next(accs);
        this.accounts = accs;
        this.web3.eth.getBalance(accs[0], (err, wei) => {
          this.currentBalance = this.web3.fromWei(wei, 'ether');
          this.balanceOfAddressSubject.next(this.currentBalance);
        });
        console.log('current account: ' + accs);
        console.log('current balance: ' + this.currentBalance);

        // this.router.navigate(['']);
      }

      this.ready = true;
    });
  }

  public getCurrentLoggedAddress(): Observable<string[]> {
    return this.accountsObservable.asObservable();
  }

  public getCurrentBalanceObs(): Observable<string> {
    return this.balanceOfAddressSubject.asObservable();
  }

  public getBalanceOfAddressSubject(): Observable<string> {
    return this.balanceOfAddressSubject.asObservable();
  }
}
