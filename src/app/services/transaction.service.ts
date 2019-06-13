import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TransactionInfo } from '../models/transactionInfo';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactions: Array<any>;
  private transactionSubscription = new Subject<any>();

  get transactionUrl() {
    return environment.serverUrl + 'transactions';
  }

  constructor(private http: HttpClient, private userService: UserService) {}

  makeTransaction(transactionInfo: TransactionInfo) {
    this.http
      .post(this.transactionUrl, transactionInfo)
      .toPromise()
      .then((response: { transaction: any; allocations: Array<any>; liquidity: number }) => {
        this.addTransaction(response.transaction);
        this.userService.updateAllocations(response.allocations);
      });
  }

  addTransaction(transaction) {
    if (this.transactions) {
      this.transactions.push(transaction);
      this.transactionSubscription.next({
        isInit: true,
        data: this.transactions
      });
    }
  }
}
