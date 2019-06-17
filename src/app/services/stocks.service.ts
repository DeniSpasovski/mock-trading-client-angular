import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConnectivityService } from './connectivity.service';
import { StockInfo, StockTick, StockDataPeriod, StockDataResponse } from '../models/stock';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  get stockListUrl(): string {
    return environment.serverUrl + 'stocks';
  }

  getHistoricDataUrl(symbol: string, period: StockDataPeriod): string {
    return environment.serverUrl + `stocks/${symbol}/price/${StockDataPeriod[period]}`;
  }

  constructor(private http: HttpClient, private connection: ConnectivityService) {}

  getStockList(): Observable<Array<StockInfo>> {
    return this.http.get(this.stockListUrl).pipe(
      map((x: Array<StockInfo>) => {
        return x.map((s) => new StockInfo(s));
      })
    );
  }

  getHistoricStockData(symbol: string, period: StockDataPeriod) {
    return this.http.get(this.getHistoricDataUrl(symbol, period)).pipe(map((x: StockDataResponse) => new StockDataResponse(x)));
  }

  getStockPriceSubscription(symbol) {
    let priceSubscription = new Subject<StockTick>();
    this.connection.connect().then((client) => {
      client.subscribe('/livestream/' + symbol, (update) => {
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
