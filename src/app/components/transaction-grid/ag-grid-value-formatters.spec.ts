import { async } from '@angular/core/testing';

import { AgGridCellValueFormatters } from './ag-grid-value-formatters';

describe('AgGridCellValueFormatters', () => {
  beforeEach(async(() => {}));

  it('should round price to two decimals', () => {
    let result = AgGridCellValueFormatters.priceFormatter({
      value: 5.5
    });
    expect(result).toEqual('5.50');
  });
});
