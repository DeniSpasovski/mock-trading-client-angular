import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsGridComponent } from './assets-grid.component';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AgGridModule } from 'ag-grid-angular';

describe('AssetsGridComponent', () => {
  let component: AssetsGridComponent;
  let fixture: ComponentFixture<AssetsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsGridComponent],
      providers: [TransactionService, UserService],
      imports: [HttpClientTestingModule, AgGridModule.withComponents([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
