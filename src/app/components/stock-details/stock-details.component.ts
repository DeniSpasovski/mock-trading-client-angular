import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
import { StocksService } from 'src/app/services/stocks.service';
import { TransactionInfo } from '../../models/transactionInfo';
import { StockTick } from 'src/app/models/stock';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit, OnDestroy {
  @Output() removeClick = new EventEmitter<string>();
  @Input() showRemove: boolean = false;
  @Input() symbol: string = '';
  @Output() stockSelected: EventEmitter<any> = new EventEmitter();

  private trash = new Subject();
  currentPrice: number;
  amount: number;
  allocationSubscription: Observable<any>;
  priceSubscription: Observable<any>;
  buySellVisible: boolean;
  transactionInfo: any;

  constructor(private userService: UserService, private stockService: StocksService) {}

  ngOnInit() {
    this.fetchData();
  }

  ngOnDestroy() {
    this.trash.next();
    this.trash.complete();
    this.stockService.unsubscribeStockPrice(this.symbol);
  }

  fetchData() {
    let result = this.userService.getAllocationsForAsset(this.symbol);
    if (result.data) {
      this.amount = result.data.amount;
    }

    result.subscription.pipe(takeUntil(this.trash)).subscribe((data) => {
      if (data) {
        this.amount = data.amount;
      } else {
        this.amount = null;
      }
    });

    this.stockService
      .getStockPriceSubscription(this.symbol)
      .pipe(takeUntil(this.trash))
      .subscribe((tick: StockTick) => {
        if (tick) {
          this.currentPrice = tick.price;
        } else {
          this.currentPrice = null;
        }
      });
  }

  onRemove() {
    this.removeClick.emit(this.symbol);
  }

  onStockClick(symbol) {
    console.log('event - stock selected', symbol);
    this.stockSelected.next(symbol);
  }

  onTransaction() {
    this.buySellVisible = false;
  }

  openBuySellPopup(side: string) {
    this.transactionInfo = new TransactionInfo({ side: side, symbol: this.symbol, amount: 10 });
    this.buySellVisible = true;
  }
}
