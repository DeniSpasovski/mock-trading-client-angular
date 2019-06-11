import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  get stockListUrl() {
    return environment.serverUrl + 'stocks';
  }

  constructor(private http: HttpClient) {}

  getStockList(): Observable<Array<any>> {
    return this.http.get(this.stockListUrl) as Observable<Array<any>>;
  }
}
