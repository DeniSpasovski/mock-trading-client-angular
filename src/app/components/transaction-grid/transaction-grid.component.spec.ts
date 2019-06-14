import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionGridComponent } from './transaction-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { TransactionService } from 'src/app/services/transaction.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TransactionGridComponent', () => {
  let component: TransactionGridComponent;
  let fixture: ComponentFixture<TransactionGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionGridComponent],
      providers: [TransactionService],
      imports: [HttpClientTestingModule, AgGridModule.withComponents([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
