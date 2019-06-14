import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { StockInfo } from 'src/app/models/stock';

@Component({
  selector: 'app-follow-stocks',
  templateUrl: './follow-stocks.component.html',
  styleUrls: ['./follow-stocks.component.css']
})
export class FollowStocksComponent implements OnInit {
  @Output() stockSelected: EventEmitter<any> = new EventEmitter();

  followList: Array<StockInfo> = [];
  followPopupOpen: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchData();
  }

  trackByFn(index, item) {
    return item.symbol;
  }

  onStockFollow(symbol) {
    this.followPopupOpen = false;
    this.fetchData();
  }

  onRemoveClick(symbol) {
    this.userService.removeFromWatchList(symbol).subscribe((success) => {
      this.fetchData();
    });
  }

  fetchData() {
    this.userService.getWatchList().subscribe((data) => {
      this.followList = data;
    });
  }

  onStockSelected(symbol) {
    console.log('event - stock selected', symbol);
    this.stockSelected.next(symbol);
  }
}
