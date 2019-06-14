export class TransactionInfo {
  amount: number;
  cost?: number;
  date?: Date;
  side: string;
  symbol: string;
  tickPrice: number;

  constructor(data: any) {
    this.side = data.side.toUpperCase();
    this.symbol = data.symbol;
    this.amount = data.amount;
    this.cost = data.cost;
    this.date = data.date ? new Date(data.date) : null;
    this.tickPrice = data.tickPrice;
  }
}

export class TransactionUpdate {
  isInit: boolean;
  symbol?: string;
  data: Array<TransactionInfo>;
}
