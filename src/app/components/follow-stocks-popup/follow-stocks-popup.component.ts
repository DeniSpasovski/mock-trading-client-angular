import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StocksService } from 'src/app/services/stocks.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-follow-stocks-popup',
  templateUrl: './follow-stocks-popup.component.html',
  styleUrls: ['./follow-stocks-popup.component.css']
})
export class FollowStocksPopupComponent implements OnInit {
  @Output() followClick = new EventEmitter<string>();
  stockList: any[] = [];
  selectedSymbol: string = '';

  constructor(private stockService: StocksService, private userService: UserService) {}

  ngOnInit() {
    this.stockService.getStockList().subscribe((data) => {
      this.stockList = data;
      this.selectedSymbol = this.stockList[0].symbol;
    });
  }

  onChange(e:Event) {
    this.selectedSymbol = (<HTMLSelectElement>e.target).value;
  }

  onFollowClick() {
    this.userService.addToWatchList(this.selectedSymbol).subscribe((data) => {
      this.followClick.emit(this.selectedSymbol);
    });
  }

  onClose() {
    this.followClick.emit();
  }
}
