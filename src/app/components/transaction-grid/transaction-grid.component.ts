import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-grid',
  templateUrl: './transaction-grid.component.html',
  styleUrls: ['./transaction-grid.component.css']
})
export class TransactionGridComponent implements OnInit {
  @Input() symbol: string = '';

  constructor() {}

  ngOnInit() {}
}
