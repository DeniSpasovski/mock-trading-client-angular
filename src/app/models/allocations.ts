import { StockTick } from './stock';

export class AllocationInfo {
  constructor(data: { amount: number; symbol: string }) {
    this.amount = data.amount;
    this.symbol = data.symbol;
  }
  amount: number;
  symbol: string;
}

export class AllocationInfoWithPrice extends AllocationInfo {
  constructor(data: AllocationInfo) {
    super(data);
  }
  lastTick?: StockTick;
  amount!: number;
  symbol!: string;

  get total(): number | undefined {
    return this.lastTick ? this.amount * this.lastTick.price : undefined;
  }
}

export class allocationUpdate {
  isInit: boolean = false;
  symbol?: string;
  data: Array<AllocationInfo> = [];
}
