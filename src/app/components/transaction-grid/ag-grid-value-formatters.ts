export class AgGridCellValueFormatters {
  static buySellRenderer(params) {
    return `<span class='stock-transactions__grid-cell-${params.value.toLowerCase()}'>${params.value}</span>`;
  }

  static priceFormatter(params) {
    return params.value.toFixed(params.colDef.decimalPlaces);
  }

  static dateFormatter(params) {
    return params.value ? `${params.value.toLocaleDateString()} ${params.value.toLocaleTimeString()}` : '';
  }
}
