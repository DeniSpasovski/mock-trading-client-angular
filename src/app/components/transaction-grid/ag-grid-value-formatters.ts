export class AgGridCellValueFormatters {
  static buySellRenderer(params:any) {
    return `<span class='stock-transactions__grid-cell-${params.value.toLowerCase()}'>${params.value}</span>`;
  }

  static priceFormatter(params:any) {
    return params.value.toFixed(params.colDef.decimalPlaces);
  }

  static dateFormatter(params:any) {
    return params.value ? `${params.value.toLocaleDateString()} ${params.value.toLocaleTimeString()}` : '';
  }
}
