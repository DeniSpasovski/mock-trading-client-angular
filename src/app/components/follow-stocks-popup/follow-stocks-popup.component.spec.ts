import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserService } from 'src/app/services/user.service';
import { StocksService } from 'src/app/services/stocks.service';
import { FollowStocksPopupComponent } from './follow-stocks-popup.component';

describe('FollowStocksPopupComponent', () => {
  let component: FollowStocksPopupComponent;
  let fixture: ComponentFixture<FollowStocksPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FollowStocksPopupComponent],
      imports: [HttpClientTestingModule],
      providers: [StocksService, UserService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowStocksPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
