import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Subject, forkJoin } from 'rxjs';
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
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  @Input() symbol: string = '';
  private trash = new Subject();

  assets: Array<AllocationInfoWithPrice>;
  priceFormatter = AgGridCellValueFormatters.priceFormatter;

  constructor(private userService: UserService, private stocksService: StocksService) {}

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
    this.fetchAllocations();
  }

  fetchAllocations() {
    forkJoin(this.userService.fetchAllocations(), this.stocksService.getStockList()).subscribe(([allocations, stocksInfo]) => {
      this.assets = allocations
        ? allocations.map((update: AllocationInfo) => {
            let allocation = new AllocationInfoWithPrice(update);
            let stockInfo = stocksInfo.find((x) => x.symbol === allocation.symbol);
            allocation.lastTick = stockInfo ? stockInfo.lastTick : null;
            return allocation;
          })
        : [];
    });
  }
}
