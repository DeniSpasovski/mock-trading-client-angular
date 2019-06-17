import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as More from 'highcharts/highcharts-more';

import { StocksService } from 'src/app/services/stocks.service';
import { StockDataPeriod } from 'src/app/models/stock';

@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.css']
})
export class StockGraphComponent implements AfterViewInit, OnChanges {
  @Input() symbol: string;
  @Input() showDetailsLink: boolean;
  dataPeriod: StockDataPeriod = StockDataPeriod.today;
  dataPeriods: Array<string> = [StockDataPeriod[StockDataPeriod.today], StockDataPeriod[StockDataPeriod.yearly]];

  chartOptions = {
    renderTo: 'stockGraphContainer',
    chart: {
      type: 'line'
    },
    title: {
      text: ''
    },
    xAxis: { type: 'datetime' },
    yAxis: [{ title: { text: 'Price' } }],
    tooltip: {
      valueDecimals: 4
    },
    series: []
  };

  constructor(private stockService: StocksService) {}

  fetchData() {
    if (!this.symbol) {
      return;
    }

    this.stockService.getHistoricStockData(this.symbol, this.dataPeriod).subscribe((data) => {
      this.chartOptions.series = [
        {
          name: 'detailed',
          data: data.detailed.map(function(obj) {
            return {
              x: new Date(obj.date),
              y: obj.price
            };
          })
        },
        {
          name: 'aggregated',
          data: data.aggregated.map(function(obj) {
            return {
              x: new Date(obj.date),
              y: obj.price
            };
          })
        }
      ];
      Highcharts.chart('stockGraphContainer', this.chartOptions as any);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.symbol && changes.symbol.previousValue) {
      this.fetchData();
    }
  }

  ngAfterViewInit() {
    this.fetchData();
  }

  onPeriodSelected(value) {
    this.dataPeriod = <any>StockDataPeriod[value];
    this.fetchData();
  }
}
