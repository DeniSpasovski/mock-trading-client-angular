import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConnectivityService } from './connectivity.service';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  get stockListUrl() {
    return environment.serverUrl + 'stocks';
  }

  constructor(private http: HttpClient, private connection: ConnectivityService) {}

  getStockList(): Observable<Array<any>> {
    return this.http.get(this.stockListUrl) as Observable<Array<any>>;
  }

  getStockPriceSubscription(symbol) {
    let priceSubscription = new Subject<any>();
    this.connection.connect().then((client) => {
      client.subscribe('/livestream/' + symbol, (update) => {
        priceSubscription.next(update);
      });
    });

    return priceSubscription;
  }

  unsubscribeStockPrice(symbol) {
    this.connection.connect().then((client) => {
      client.unsubscribe('/livestream/' + symbol);
    });
  }
}
