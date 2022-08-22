export interface Asset {
  [key: string]: string;
}

export interface PriceAsset {
  priceUsd: string;
  time: number;
  circulatingSupply: string;
  date: string;
}
