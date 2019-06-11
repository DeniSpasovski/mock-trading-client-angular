import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  get watchListUrl() {
    return environment.serverUrl + 'userdata/watchlist';
  }

  constructor(private http: HttpClient) {}

  getWatchList(): Observable<Array<any>> {
    return this.http.get(this.watchListUrl) as Observable<Array<any>>;
  }

  addToWatchList(symbol: any) {
    return this.http.post(
      this.watchListUrl,
      {
        symbol: symbol,
        action: 'ADD'
      },
      {
        responseType: 'text'
      }
    );
  }

  removeFromWatchList(symbol: any) {
    return this.http.post(
      this.watchListUrl,
      {
        symbol: symbol,
        action: 'REMOVE'
      },
      {
        responseType: 'text'
      }
    );
  }

  getUserId() {
    return localStorage['userId'];
  }
}
