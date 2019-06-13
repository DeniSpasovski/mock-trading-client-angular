import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map as rxMap, filter as rxFilter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private allocations;
  private allocationsSubscription = new Subject<any>();
  get watchListUrl() {
    return environment.serverUrl + 'userdata/watchlist';
  }

  get allocationsUrl() {
    return environment.serverUrl + 'userdata/allocations';
  }

  constructor(private http: HttpClient) {}

  /**
   * The pattern which we follow here is to get the data from server only once and share subscription for future updates
   *
   * @returns
   * @memberof UserService
   */
  getAllocations(): { data: Array<any>; subscription: Subject<any> } {
    if (!this.allocations) {
      this.allocations = [];
      this.http.get(this.allocationsUrl).subscribe((data) => {
        this.updateAllocations(data);
      });
    }

    return {
      subscription: this.allocationsSubscription,
      data: this.allocations
    };
  }

  updateAllocations(data) {
    this.allocations = data;
    this.allocationsSubscription.next({
      isInit: true,
      data: this.allocations
    });
  }

  /**
   * This method shares the same subscription as getting all assets and adds pipe to only return data for a single asset
   *
   * @param {*} symbol
   * @returns
   * @memberof UserService
   */
  getAllocationsForAsset(symbol): { data: any; subscription: Observable<any> } {
    let subscription = this.getAllocations().subscription.pipe(
      rxFilter((response: any) => {
        return response.isInit || response.symbol === symbol;
      }),
      rxMap((result) => this.mapSingleAssetFromList(result.data, symbol))
    );

    return {
      subscription: subscription,
      data: this.mapSingleAssetFromList(this.allocations, symbol)
    };
  }

  mapSingleAssetFromList(list, symbol) {
    return list.find((x) => x.symbol === symbol);
  }

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
