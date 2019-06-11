import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FollowStocksComponent } from './follow-stocks.component';
import { StockDetailsComponent } from '../stock-details/stock-details.component';
import { FollowStocksPopupComponent } from '../follow-stocks-popup/follow-stocks-popup.component';
import { UserService } from 'src/app/services/user.service';

describe('FollowStocksComponent', () => {
  let component: FollowStocksComponent;
  let fixture: ComponentFixture<FollowStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FollowStocksComponent, StockDetailsComponent, FollowStocksPopupComponent],
      providers: [UserService],
      imports: [HttpClientTestingModule]
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
