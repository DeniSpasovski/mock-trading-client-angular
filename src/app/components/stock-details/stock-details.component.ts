import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  @Output() removeClick = new EventEmitter<string>();
  @Input() showRemove: boolean = false;
  @Input() symbol: string = '';

  currentPrice?: number = undefined;
  amount?: number = undefined;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    let result = this.userService.getAllocationsForAsset(this.symbol);
    if (result.data) {
      this.amount = result.data.amount;
    }
    result.subscription.subscribe((data) => {
      if (data) {
        this.amount = data.amount;
      } else {
        this.amount = undefined;
      }
    });
  }

  onRemove() {
    this.removeClick.emit(this.symbol);
  }
}
