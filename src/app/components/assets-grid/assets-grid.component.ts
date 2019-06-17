import { Component, OnInit, Input } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { GridApi, GridReadyEvent } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

import { AgGridCellValueFormatters } from '../transaction-grid/ag-grid-value-formatters';
import { AllocationInfoWithPrice, AllocationInfo } from 'src/app/models/allocations';
import { UserService } from 'src/app/services/user.service';
import { StocksService } from 'src/app/services/stocks.service';

@Component({
  selector: 'app-assets-grid',
  templateUrl: './assets-grid.component.html',
  styleUrls: ['./assets-grid.component.css']
})
export class AssetsGridComponent implements OnInit {
  @Input() symbol: string = '';
  private trash = new Subject();
  gridModules = [ClientSideRowModelModule];

  assets: Array<AllocationInfoWithPrice> = [];
  priceFormatter = AgGridCellValueFormatters.priceFormatter;
  gridApi?: GridApi;

  constructor(private userService: UserService, private stocksService: StocksService) {}

  ngOnInit() {
    this.fetchData();
  }

  ngOnDestroy() {
    this.trash.next();
    this.trash.complete();
  }

  fetchData() {
    this.fetchAllocations();
  }
  
  onGridReady(params:GridReadyEvent) {
    this.gridApi = params.api;

    this.gridApi.addEventListener('rowDataChanged', () => {
      this.gridApi?.sizeColumnsToFit();
    });
    this.gridApi.sizeColumnsToFit();
  }

  fetchAllocations() {
    forkJoin(this.userService.fetchAllocations(), this.stocksService.getStockList()).subscribe(([allocations, stocksInfo]) => {
      this.assets = allocations
        ? allocations.map((update: AllocationInfo) => {
            let allocation = new AllocationInfoWithPrice(update);
            let stockInfo = stocksInfo.find((x) => x.symbol === allocation.symbol);
            allocation.lastTick = stockInfo ? stockInfo.lastTick : undefined;
            return allocation;
          })
        : [];
    });
  }
}
