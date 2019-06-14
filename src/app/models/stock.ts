export class StockTick {
  stock: string;
  price: number;
  date: Date;
  constructor(data:any) {
    this.stock = data.stock;
    this.price = data.price;
    this.date = new Date(data.date);
  }
}

export class StockInfo {
  name: string;
  symbol: string;
  lastTick?: StockTick;
  constructor(data:any) {
    this.name = data.name;
    this.symbol = data.symbol;
    this.lastTick = data.lastTick ? new StockTick(data.lastTick) : undefined;
  }
}


