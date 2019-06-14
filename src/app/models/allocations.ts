export class AllocationInfo {
  amount: number;
  symbol: string;
}

export class allocationUpdate {
  isInit: boolean;
  symbol?: string;
  data: Array<AllocationInfo>;
}
