import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { GridApi, GridReadyEvent } from '@ag-grid-community/core';

import { TransactionService } from 'src/app/services/transaction.service';
import { AgGridCellValueFormatters } from './ag-grid-value-formatters';
import { TransactionInfo } from 'src/app/models/transactionInfo';

@Component({
  selector: 'app-transaction-grid',
  templateUrl: './transaction-grid.component.html',
  styleUrls: ['./transaction-grid.component.css']
})
export class TransactionGridComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() symbol: string = '';
  private trash = new Subject();
  gridModules = [ClientSideRowModelModule];

  columnDefs = [
    { headerName: 'Date', field: 'date', valueFormatter: AgGridCellValueFormatters.dateFormatter },
    { headerName: 'Stock', field: 'symbol' },
    { headerName: 'Amount', field: 'amount' },
    { headerName: 'Direction', field: 'side', cellRenderer: AgGridCellValueFormatters.buySellRenderer },
    { headerName: 'Price', field: 'tickPrice', valueFormatter: AgGridCellValueFormatters.priceFormatter, decimalPlaces: 4 },
    { headerName: 'Total', field: 'cost', valueFormatter: AgGridCellValueFormatters.priceFormatter, decimalPlaces: 2 }
  ];
  transactions: Array<TransactionInfo> = [];
  gridApi?: GridApi;
  constructor(private transactionService: TransactionService) {}

  ngAfterViewInit() {
    
    }

  ngOnInit() {
    this.fetchData();
  }

  ngOnDestroy() {
    this.trash.next();
    this.trash.complete();
  }

  onGridReady(params:GridReadyEvent) {
    this.gridApi = params.api;

    this.gridApi.addEventListener('rowDataChanged', () => {
      this.gridApi?.sizeColumnsToFit();
    });
    this.gridApi.sizeColumnsToFit();
  }

  fetchData() {
    let response = this.symbol
      ? this.transactionService.getTransactionsForSymbol(this.symbol)
      : this.transactionService.getTransactions(true);
    this.transactions = response.data ? response.data.slice(0) : [];
    response.subscription.pipe(takeUntil(this.trash)).subscribe((response) => {
      this.transactions = response.data ? response.data.slice(0) : [];
      this.gridApi?.sizeColumnsToFit();
    });
  }
}
