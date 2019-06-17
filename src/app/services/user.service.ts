import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map as rxMap, filter as rxFilter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StockInfo } from '../models/stock';
import { allocationUpdate, AllocationInfo } from '../models/allocations';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private allocations: Array<AllocationInfo>;
  private allocationsSubscription = new Subject<allocationUpdate>();
  get watchListUrl(): string {
    return environment.serverUrl + 'userdata/watchlist';
  }

  get allocationsUrl(): string {
    return environment.serverUrl + 'userdata/allocations';
  }

  constructor(private http: HttpClient) {}

  /**
   * The pattern which we follow here is to get the data from server only once and share subscription for future updates
   *
   * @returns
   * @memberof UserService
   */
  getAllocations(isInit: boolean = false): { data: Array<AllocationInfo>; subscription: Subject<allocationUpdate> } {
    if (!this.allocations || isInit) {
      this.allocations = this.allocations || [];
      this.fetchAllocations().subscribe((data: Array<AllocationInfo>) => {
        this.updateAllocations(data, true);
      });
    }

    return {
      subscription: this.allocationsSubscription,
      data: this.allocations
    };
  }

  fetchAllocations(): Observable<Array<AllocationInfo>> {
    return this.http.get<Array<AllocationInfo>>(this.allocationsUrl);
  }

  updateAllocations(data: Array<AllocationInfo>, isInit: boolean, symbol?: string) {
    this.allocations = data;
    this.allocationsSubscription.next({
      isInit: isInit,
      symbol: symbol,
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
  getAllocationsForAsset(symbol): { data: AllocationInfo; subscription: Observable<AllocationInfo> } {
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

  mapSingleAssetFromList(list: Array<AllocationInfo>, symbol: string): AllocationInfo {
    return list.find((x) => x.symbol === symbol);
  }

  getWatchList(): Observable<Array<StockInfo>> {
    return this.http.get<Array<StockInfo>>(this.watchListUrl);
  }

  addToWatchList(symbol: string): Observable<string> {
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

  removeFromWatchList(symbol: string): Observable<string> {
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
}
