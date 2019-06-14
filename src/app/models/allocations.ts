export class AllocationInfo {
  amount?: number = undefined;
  symbol: string = '';
}

export class allocationUpdate {
  isInit: boolean = false;
  symbol?: string;
  data: Array<AllocationInfo> = [];
}
