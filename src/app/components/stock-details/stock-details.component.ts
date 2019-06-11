import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  @Output() removeClick = new EventEmitter<string>();
  @Input() showRemove: boolean = false;
  @Input() symbol: string = '';

  currentPrice: number;
  amount: number;

  constructor() {}

  ngOnInit() {}

  onRemove() {
    this.removeClick.emit(this.symbol);
  }
}
