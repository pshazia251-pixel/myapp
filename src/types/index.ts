export interface Product {
  asin: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  monthlySales: number;
  monthlyRevenue: number;
  bsr: number;
  reviews: number;
  rating: number;
  sellerType: 'FBA' | 'FBM' | 'AMZ';
  imageUrl: string;
  dateFirstAvailable: string;
  weight: number;
  dimensions: string;
  fees: number;
  netProfit: number;
  margin: number;
  lqs: number;
}

export interface TrackedProduct extends Product {
  trackingSince: string;
  salesHistory: DailyData[];
  priceHistory: DailyData[];
  rankHistory: DailyData[];
  group?: string;
}

export interface DailyData {
  date: string;
  value: number;
}

export interface Keyword {
  keyword: string;
  searchVolume: number;
  searchVolumeTrend: number[];
  exactPpcBid: number;
  broadPpcBid: number;
  organicProductCount: number;
  sponsoredProductCount: number;
  competitiveIndex: number;
  relevancyScore: number;
  category: string;
  recommendedRank: number;
}

export interface SalesMetrics {
  totalSales: number;
  totalProfit: number;
  unitsSold: number;
  roi: number;
  netMargin: number;
  avgSalesPrice: number;
  refunds: number;
  ppcSpend: number;
  ppcSales: number;
  organicSales: number;
}

export interface Supplier {
  id: string;
  companyName: string;
  country: string;
  verifiedDate: string;
  productCategories: string[];
  minOrderQty: number;
  avgLeadTime: string;
  rating: number;
  responseRate: number;
  verified: boolean;
  topProducts: string[];
}

export interface FBACalcResult {
  sellingPrice: number;
  costOfGoods: number;
  amazonReferralFee: number;
  fbaFee: number;
  storageFee: number;
  shippingToAmazon: number;
  totalFees: number;
  profit: number;
  margin: number;
  roi: number;
}

export type Marketplace = 'US' | 'UK' | 'DE' | 'FR' | 'IT' | 'ES' | 'CA' | 'MX' | 'JP' | 'IN' | 'AU';

export interface FilterState {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  minRevenue: number;
  maxRevenue: number;
  minSales: number;
  maxSales: number;
  minReviews: number;
  maxReviews: number;
  minRating: number;
  maxRating: number;
  sellerType: string[];
  marketplace: Marketplace;
}
