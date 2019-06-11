import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DetailsComponent } from './details.component';
import { StockDetailsComponent } from 'src/app/components/stock-details/stock-details.component';
import { TransactionGridComponent } from 'src/app/components/transaction-grid/transaction-grid.component';
import { StockGraphComponent } from 'src/app/components/stock-graph/stock-graph.component';
import { RouterModule } from '@angular/router';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsComponent, StockDetailsComponent, StockGraphComponent, TransactionGridComponent],
      imports: [HttpClientTestingModule, RouterModule.forRoot([])]
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
