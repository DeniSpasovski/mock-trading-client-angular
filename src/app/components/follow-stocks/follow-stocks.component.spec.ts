import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FollowStocksComponent } from './follow-stocks.component';
import { StockDetailsComponent } from '../stock-details/stock-details.component';
import { FollowStocksPopupComponent } from '../follow-stocks-popup/follow-stocks-popup.component';
import { UserService } from 'src/app/services/user.service';
import { BuySellPopupComponent } from '../buy-sell-popup/buy-sell-popup.component';
import { FormsModule } from '@angular/forms';

describe('FollowStocksComponent', () => {
  let component: FollowStocksComponent;
  let fixture: ComponentFixture<FollowStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FollowStocksComponent, StockDetailsComponent, BuySellPopupComponent, FollowStocksPopupComponent],
      providers: [UserService],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
