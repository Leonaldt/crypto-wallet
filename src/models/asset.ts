export class Asset {
  constructor(public name: string, public symbol: string) {}
}

export class AssetWallet {
  constructor(
    public price: number,
    public amount: number,
    public assetId: number,
    public walletId: number
  ) {}
}
