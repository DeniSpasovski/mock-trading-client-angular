import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StocksService } from 'src/app/services/stocks.service';
import { UserService } from 'src/app/services/user.service';
import { StockInfo } from 'src/app/models/stock';

@Component({
  selector: 'app-follow-stocks-popup',
  templateUrl: './follow-stocks-popup.component.html',
  styleUrls: ['./follow-stocks-popup.component.css']
})
export class FollowStocksPopupComponent implements OnInit {
  @Output() followClick = new EventEmitter<string>();
  stockList: Array<StockInfo>;
  watchList: Array<StockInfo>;
  selectedSymbol: string;

  constructor(private stockService: StocksService, private userService: UserService) {}

  ngOnInit() {
    this.stockService.getStockList().subscribe((data: StockInfo[]) => {
      this.stockList = data;
      this.selectedSymbol = this.stockList[0].symbol;
    });

    this.userService.getWatchList().subscribe((data: StockInfo[]) => {
      this.watchList = data;
    });
  }

  isSymbolInWatchList(symbol) {
    return this.watchList ? this.watchList.find((x) => x.symbol === symbol) : false;
  }

  onChange(symbol: string) {
    this.selectedSymbol = symbol;
  }

  onFollowClick() {
    this.userService.addToWatchList(this.selectedSymbol).subscribe((response: string) => {
      this.followClick.emit(this.selectedSymbol);
    });
  }

  onClose() {
    this.followClick.emit();
  }
}
