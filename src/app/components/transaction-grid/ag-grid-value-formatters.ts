import { Directive } from '@angular/core';

export class AgGridCellValueFormatters {
  static buySellRenderer(params) {
    return params.value ? `<span class='stock-transactions__grid-cell-${params.value.toLowerCase()}'>${params.value}</span>` : null;
  }

  static priceFormatter(params) {
    return params.value ? params.value.toFixed(params.colDef && params.colDef.decimalPlaces ? params.colDef.decimalPlaces : 2) : '-';
  }

  static dateFormatter(params) {
    return params.value ? `${params.value.toLocaleDateString()} ${params.value.toLocaleTimeString()}` : '';
  }
}
