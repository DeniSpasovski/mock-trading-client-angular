import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from '@ag-grid-community/angular';

import { HomeComponent } from './home.component';
import { FollowStocksComponent } from 'src/app/components/follow-stocks/follow-stocks.component';
import { StockGraphComponent } from 'src/app/components/stock-graph/stock-graph.component';
import { TransactionGridComponent } from 'src/app/components/transaction-grid/transaction-grid.component';
import { StockDetailsComponent } from 'src/app/components/stock-details/stock-details.component';
import { StocksService } from 'src/app/services/stocks.service';
import { UserService } from 'src/app/services/user.service';
import { FollowStocksPopupComponent } from 'src/app/components/follow-stocks-popup/follow-stocks-popup.component';
import { BuySellPopupComponent } from 'src/app/components/buy-sell-popup/buy-sell-popup.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        FollowStocksComponent,
        FollowStocksPopupComponent,
        BuySellPopupComponent,
        StockDetailsComponent,
        StockGraphComponent,
        TransactionGridComponent
      ],
      imports: [HttpClientTestingModule, FormsModule, AgGridModule.withComponents([])],
      providers: [StocksService, UserService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
