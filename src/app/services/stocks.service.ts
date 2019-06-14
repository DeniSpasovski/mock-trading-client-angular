import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConnectivityService } from './connectivity.service';
import { StockInfo, StockTick } from '../models/stock';
import { map as rxMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  get stockListUrl(): string {
    return environment.serverUrl + 'stocks';
  }

  constructor(private http: HttpClient, private connection: ConnectivityService) {}

  getStockList(): Observable<Array<StockInfo>> {
    return this.http.get<Array<StockInfo>>(this.stockListUrl).pipe(
      rxMap((x: Array<StockInfo>) => {
        return x.map((s) => new StockInfo(s));
      })
    );
  }

  getStockPriceSubscription(symbol: string) {
    let priceSubscription = new Subject<StockTick>();
    this.connection.connect().then((client) => {
      client.subscribe('/livestream/' + symbol, (update:any) => {
        priceSubscription.next(new StockTick(update));
      });
    });

    return priceSubscription;
  }

  unsubscribeStockPrice(symbol: string) {
    this.connection.connect().then((client) => {
      client.unsubscribe('/livestream/' + symbol);
    });
  }
}
