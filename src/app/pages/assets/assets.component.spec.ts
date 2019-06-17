import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsComponent } from './assets.component';
import { AssetsGridComponent } from 'src/app/components/assets-grid/assets-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AssetsComponent', () => {
  let component: AssetsComponent;
  let fixture: ComponentFixture<AssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsComponent, AssetsGridComponent],
      imports: [HttpClientTestingModule, AgGridModule.withComponents([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
