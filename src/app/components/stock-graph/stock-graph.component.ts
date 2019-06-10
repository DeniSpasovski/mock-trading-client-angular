import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.css']
})
export class StockGraphComponent implements OnInit {
  @Input() symbol: string = '';
  constructor() {}

  ngOnInit() {}
}
