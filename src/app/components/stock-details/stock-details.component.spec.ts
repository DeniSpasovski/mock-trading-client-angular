import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StockDetailsComponent } from './stock-details.component';
import { UserService } from 'src/app/services/user.service';
import { BuySellPopupComponent } from '../buy-sell-popup/buy-sell-popup.component';
import { FormsModule } from '@angular/forms';

describe('StockDetailsComponent', () => {
  let component: StockDetailsComponent;
  let fixture: ComponentFixture<StockDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockDetailsComponent, BuySellPopupComponent],
      providers: [UserService],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
