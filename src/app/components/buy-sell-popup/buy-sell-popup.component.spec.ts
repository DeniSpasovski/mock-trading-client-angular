import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { BuySellPopupComponent } from './buy-sell-popup.component';
import { TransactionService } from 'src/app/services/transaction.service';
import { StocksService } from 'src/app/services/stocks.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransactionInfo } from 'src/app/models/transactionInfo';

describe('BuySellPopupComponent', () => {
  let component: BuySellPopupComponent;
  let fixture: ComponentFixture<BuySellPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuySellPopupComponent],
      providers: [StocksService, TransactionService],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySellPopupComponent);
    component = fixture.componentInstance;
    component.transactionInfo = new TransactionInfo({ side: 'BUY', symbol: 'ACME', amount: 1 });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
