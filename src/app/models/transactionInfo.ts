export class TransactionInfo {
  side: string;
  amount: number;
  symbol: string;
  constructor(side: string, symbol: string, amount: number) {
    this.side = side.toUpperCase();
    this.symbol = symbol;
    this.amount = amount;
  }
}
