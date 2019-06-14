import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TransactionInfo, TransactionUpdate } from '../models/transactionInfo';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
import { map as rxMap, filter as rxFilter } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactions: Array<any>;
  private transactionSubscription = new Subject<TransactionUpdate>();

  get transactionUrl() {
    return environment.serverUrl + 'transactions';
  }

  constructor(private http: HttpClient, private userService: UserService) {}

  getTransactions(isInit: boolean = false): { data: Array<TransactionInfo>; subscription: Subject<TransactionUpdate> } {
    if (!this.transactions || isInit) {
      this.transactions = this.transactions || [];
      this.http
        .get(this.transactionUrl)
        .pipe(
          rxMap((x: Array<TransactionInfo>) => {
            return x.map((s) => new TransactionInfo(s));
          })
        )
        .subscribe((data: Array<TransactionInfo>) => {
          this.transactions = data.sort((a, b) => b.date.getTime() - a.date.getTime());
          this.updateTransactions(true);
        });
    }

    return {
      subscription: this.transactionSubscription,
      data: this.transactions
    };
  }

  getTransactionsForSymbol(symbol: string, isInit: boolean = false) {
    let subscription = this.getTransactions(isInit).subscription.pipe(
      rxFilter((response: any) => {
        return response.isInit || response.symbol === symbol;
      }),
      rxMap((result) => {
        return {
          data: this.filterTransactionsForSymbol(result.data, symbol)
        };
      })
    );

    return {
      subscription: subscription,
      data: this.filterTransactionsForSymbol(this.transactions, symbol)
    };
  }

  filterTransactionsForSymbol(data: Array<TransactionInfo>, symbol: string): any {
    return data ? data.filter((x) => x.symbol === symbol) : [];
  }

  makeTransaction(transactionInfo: TransactionInfo) {
    this.http
      .post(this.transactionUrl, transactionInfo)
      .toPromise()
      .then((response: { transaction: any; allocations: Array<any>; liquidity: number }) => {
        this.addTransaction(new TransactionInfo(response.transaction));
        this.userService.updateAllocations(response.allocations, false, response.transaction.symbol);
      });
  }

  addTransaction(transaction: TransactionInfo) {
    if (this.transactions) {
      this.transactions.splice(0, 0, transaction);
      this.updateTransactions(false, transaction.symbol);
    }
  }

  updateTransactions(isInit: boolean, symbol?: string) {
    this.transactionSubscription.next({
      isInit: isInit,
      symbol: symbol,
      data: this.transactions
    });
  }
}
