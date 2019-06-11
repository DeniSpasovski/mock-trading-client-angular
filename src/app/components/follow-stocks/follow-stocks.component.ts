import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-follow-stocks',
  templateUrl: './follow-stocks.component.html',
  styleUrls: ['./follow-stocks.component.css']
})
export class FollowStocksComponent implements OnInit {
  followList: Array<any> = [];
  stockList: Array<any> = [];
  followPopupOpen: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchData();
  }

  trackByFn(index: any, item: any) {
    return item.symbol;
  }

  onStockFollow(symbol: any) {
    this.followPopupOpen = false;
    this.fetchData();
  }

  onRemoveClick(symbol: any) {
    this.userService.removeFromWatchList(symbol).subscribe((success) => {
      this.fetchData();
    });
  }

  fetchData() {
    this.userService.getWatchList().subscribe((data) => {
      this.followList = data;
    });
  }
}
