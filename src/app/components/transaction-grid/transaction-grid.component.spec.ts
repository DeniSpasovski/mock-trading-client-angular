import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AgGridModule } from '@ag-grid-community/angular';

import { TransactionGridComponent } from './transaction-grid.component';
import { TransactionService } from 'src/app/services/transaction.service';

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
