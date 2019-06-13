import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedSymbol: string = 'STRK';

  constructor() {}

  ngOnInit() {}

  onStockSelected(symbol) {
    this.selectedSymbol = symbol;
  }
}
