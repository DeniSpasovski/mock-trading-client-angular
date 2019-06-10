import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FollowStocksComponent } from 'src/app/components/follow-stocks/follow-stocks.component';
import { StockGraphComponent } from 'src/app/components/stock-graph/stock-graph.component';
import { TransactionGridComponent } from 'src/app/components/transaction-grid/transaction-grid.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, FollowStocksComponent, StockGraphComponent, TransactionGridComponent]
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
