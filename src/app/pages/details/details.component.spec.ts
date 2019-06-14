import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DetailsComponent } from './details.component';
import { StockDetailsComponent } from 'src/app/components/stock-details/stock-details.component';
import { TransactionGridComponent } from 'src/app/components/transaction-grid/transaction-grid.component';
import { StockGraphComponent } from 'src/app/components/stock-graph/stock-graph.component';
import { FormsModule } from '@angular/forms';
import { BuySellPopupComponent } from 'src/app/components/buy-sell-popup/buy-sell-popup.component';
import { AgGridModule } from 'ag-grid-angular';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsComponent, StockDetailsComponent, StockGraphComponent, TransactionGridComponent, BuySellPopupComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: '*', component: DetailsComponent }]),
        FormsModule,
        AgGridModule.withComponents([])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
