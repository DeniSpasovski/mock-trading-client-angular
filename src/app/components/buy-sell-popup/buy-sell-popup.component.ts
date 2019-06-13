import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { StocksService } from 'src/app/services/stocks.service';
import { TransactionInfo } from '../../models/transactionInfo';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-buy-sell-popup',
  templateUrl: './buy-sell-popup.component.html',
  styleUrls: ['./buy-sell-popup.component.css']
})
export class BuySellPopupComponent implements OnInit {
  @Output() transactionClick = new EventEmitter<string>();
  @Input() set transactionInfo(transactionInfo: TransactionInfo) {
    this._transactionInfo = transactionInfo;
  }

  _transactionInfo!: TransactionInfo;
  stockList: any[] = [];

  constructor(private stockService: StocksService, private transactionService: TransactionService) {}

  ngOnInit() {
    this.stockService.getStockList().subscribe((data) => {
      this.stockList = data;
    });
  }

  onChange(symbol: any) {
    this._transactionInfo.symbol = symbol;
  }

  amountChange(value:number) {
    this._transactionInfo.amount = value;
  }

  onBuySellClick() {
    this.transactionService.makeTransaction(this._transactionInfo);
    this.onClose();
  }

  onClose() {
    this.transactionClick.emit();
  }
}
