import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowStocksComponent } from './follow-stocks.component';

describe('FollowStocksComponent', () => {
  let component: FollowStocksComponent;
  let fixture: ComponentFixture<FollowStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowStocksComponent ]
    })
    .compileComponents();
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
