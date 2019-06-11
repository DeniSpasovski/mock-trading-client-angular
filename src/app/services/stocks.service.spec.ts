import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StocksService } from './stocks.service';

describe('StocksService', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [HttpClientTestingModule] }));

  it('should be created', () => {
    const service: StocksService = TestBed.get(StocksService);
    expect(service).toBeTruthy();
  });
});
