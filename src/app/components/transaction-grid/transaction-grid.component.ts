import { Component, OnInit, Input, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { AgGridCellValueFormatters } from './ag-grid-value-formatters';
import { TransactionInfo } from 'src/app/models/transactionInfo';

@Component({
  selector: 'app-transaction-grid',
  templateUrl: './transaction-grid.component.html',
  styleUrls: ['./transaction-grid.component.css']
})
export class TransactionGridComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  @Input() symbol: string = '';
  private trash = new Subject();

  columnDefs = [
    { headerName: 'Date', field: 'date', valueFormatter: AgGridCellValueFormatters.dateFormatter },
    { headerName: 'Stock', field: 'symbol' },
    { headerName: 'Amount', field: 'amount' },
    { headerName: 'Direction', field: 'side', cellRenderer: AgGridCellValueFormatters.buySellRenderer },
    { headerName: 'Price', field: 'tickPrice', valueFormatter: AgGridCellValueFormatters.priceFormatter, decimalPlaces: 4 },
    { headerName: 'Total', field: 'cost', valueFormatter: AgGridCellValueFormatters.priceFormatter, decimalPlaces: 2 }
  ];
  transactions: Array<TransactionInfo>;
  constructor(private transactionService: TransactionService) {}

  ngAfterViewInit() {
    if (this.agGrid) {
      this.agGrid.api.addEventListener('rowDataChanged', () => {
        this.agGrid.api.sizeColumnsToFit();
      });
      this.agGrid.api.sizeColumnsToFit();
    }
  }

  ngOnInit() {
    this.fetchData();
  }

  ngOnDestroy() {
    this.trash.next();
    this.trash.complete();
  }

  fetchData() {
    let response = this.symbol
      ? this.transactionService.getTransactionsForSymbol(this.symbol)
      : this.transactionService.getTransactions(true);
    this.transactions = response.data ? response.data.slice(0) : [];
    response.subscription.pipe(takeUntil(this.trash)).subscribe((response) => {
      this.transactions = response.data ? response.data.slice(0) : [];
      if (this.agGrid) {
        this.agGrid.api.sizeColumnsToFit();
      }
    });
  }
}
