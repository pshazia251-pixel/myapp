/**
 * JungleScout API Service Layer
 *
 * This service mirrors the JungleScout API structure.
 * API Base: https://developer.junglescout.com
 *
 * Endpoints:
 * - POST /keywords/keywords_by_asin_query       (Keywords by ASIN)
 * - POST /keywords/keywords_by_keyword_query     (Keywords by Keyword)
 * - POST /keywords/historical_search_volume      (Historical Search Volume)
 * - POST /product_database_query                 (Product Database)
 * - POST /sales_estimates_query                  (Sales Estimates)
 * - POST /share_of_voice                         (Share of Voice)
 *
 * Auth: Authorization: KEY_NAME:API_KEY
 *       X-API-Type: junglescout
 *       Accept: application/vnd.junglescout.v1+json
 *       Content-Type: application/vnd.api+json
 *
 * Currently using mock data. Replace with real API calls when API key is available.
 */

import {
  mockProducts,
  mockTrackedProducts,
  mockKeywords,
  mockSalesMetrics,
  mockSalesHistory,
  mockProfitHistory,
  mockUnitsHistory,
  mockSuppliers,
} from '../data/mockData';
import type { Product, Keyword, FilterState, Marketplace } from '../types';

const API_BASE = 'https://developer.junglescout.com';

interface APIConfig {
  keyName: string;
  apiKey: string;
  apiType: 'junglescout' | 'cobalt';
}

let apiConfig: APIConfig | null = null;

export const setApiConfig = (config: APIConfig) => {
  apiConfig = config;
};

const getHeaders = (): Record<string, string> => {
  if (!apiConfig) {
    return {};
  }
  return {
    Authorization: `${apiConfig.keyName}:${apiConfig.apiKey}`,
    'X-API-Type': apiConfig.apiType,
    Accept: 'application/vnd.junglescout.v1+json',
    'Content-Type': 'application/vnd.api+json',
  };
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Product Database API
export const searchProducts = async (
  filters: Partial<FilterState>,
  _marketplace: Marketplace = 'US'
): Promise<Product[]> => {
  // When API key is set, use real API:
  if (apiConfig) {
    try {
      const response = await fetch(`${API_BASE}/product_database_query`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          data: {
            type: 'product_database_query',
            attributes: {
              include_keywords: [],
              exclude_keywords: [],
              categories: filters.categories || [],
              min_price: filters.minPrice || 1,
              max_price: filters.maxPrice || 1000,
              min_net: filters.minRevenue,
              max_net: filters.maxRevenue,
              min_reviews: filters.minReviews,
              max_reviews: filters.maxReviews,
              min_rating: filters.minRating,
              max_rating: filters.maxRating,
              seller_type: filters.sellerType?.[0]?.toLowerCase() || 'fba',
            },
          },
        }),
      });
      const data = await response.json();
      return data.data || [];
    } catch {
      console.warn('API call failed, falling back to mock data');
    }
  }

  await delay(300);
  let results = [...mockProducts];

  if (filters.categories && filters.categories.length > 0) {
    results = results.filter((p) => filters.categories!.includes(p.category));
  }
  if (filters.minPrice !== undefined) {
    results = results.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    results = results.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters.minRevenue !== undefined) {
    results = results.filter((p) => p.monthlyRevenue >= filters.minRevenue!);
  }
  if (filters.maxRevenue !== undefined) {
    results = results.filter((p) => p.monthlyRevenue <= filters.maxRevenue!);
  }
  if (filters.minSales !== undefined) {
    results = results.filter((p) => p.monthlySales >= filters.minSales!);
  }
  if (filters.maxSales !== undefined) {
    results = results.filter((p) => p.monthlySales <= filters.maxSales!);
  }
  if (filters.minReviews !== undefined) {
    results = results.filter((p) => p.reviews >= filters.minReviews!);
  }
  if (filters.maxReviews !== undefined) {
    results = results.filter((p) => p.reviews <= filters.maxReviews!);
  }
  if (filters.minRating !== undefined) {
    results = results.filter((p) => p.rating >= filters.minRating!);
  }
  if (filters.maxRating !== undefined) {
    results = results.filter((p) => p.rating <= filters.maxRating!);
  }

  return results;
};

// Keywords by Keyword API
export const searchKeywords = async (keyword: string): Promise<Keyword[]> => {
  if (apiConfig) {
    try {
      const response = await fetch(`${API_BASE}/keywords/keywords_by_keyword_query`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          data: {
            type: 'keywords_by_keyword_query',
            attributes: {
              search_terms: keyword,
              categories: [],
              min_monthly_search_volume_exact: 0,
              max_monthly_search_volume_exact: 999999,
            },
          },
        }),
      });
      const data = await response.json();
      return data.data || [];
    } catch {
      console.warn('API call failed, falling back to mock data');
    }
  }

  await delay(300);
  const lowered = keyword.toLowerCase();
  return mockKeywords.filter(
    (k) =>
      k.keyword.toLowerCase().includes(lowered) ||
      lowered.split(' ').some((word) => k.keyword.includes(word))
  );
};

// Keywords by ASIN API
export const getKeywordsByAsin = async (asins: string[]): Promise<Keyword[]> => {
  if (apiConfig) {
    try {
      const response = await fetch(`${API_BASE}/keywords/keywords_by_asin_query`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          data: {
            type: 'keywords_by_asin_query',
            attributes: {
              asins: asins,
              include_variants: true,
            },
          },
        }),
      });
      const data = await response.json();
      return data.data || [];
    } catch {
      console.warn('API call failed, falling back to mock data');
    }
  }

  await delay(300);
  return mockKeywords.slice(0, 20);
};

// Sales Estimates API
export const getSalesEstimates = async (_asin: string) => {
  if (apiConfig) {
    try {
      const response = await fetch(`${API_BASE}/sales_estimates_query`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          data: {
            type: 'sales_estimates_query',
            attributes: {
              asin: _asin,
              start_date: new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0],
              end_date: new Date().toISOString().split('T')[0],
            },
          },
        }),
      });
      const data = await response.json();
      return data.data || {};
    } catch {
      console.warn('API call failed, falling back to mock data');
    }
  }

  await delay(200);
  return {
    metrics: mockSalesMetrics,
    salesHistory: mockSalesHistory,
    profitHistory: mockProfitHistory,
    unitsHistory: mockUnitsHistory,
  };
};

// Share of Voice API
export const getShareOfVoice = async (_keyword: string) => {
  if (apiConfig) {
    try {
      const response = await fetch(`${API_BASE}/share_of_voice`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          data: {
            type: 'share_of_voice_query',
            attributes: {
              keyword: _keyword,
            },
          },
        }),
      });
      const data = await response.json();
      return data.data || {};
    } catch {
      console.warn('API call failed, falling back to mock data');
    }
  }

  await delay(200);
  return {
    topBrands: [
      { brand: 'Anker', sharePercent: 18.5, products: 12 },
      { brand: 'TOZO', sharePercent: 12.3, products: 8 },
      { brand: 'JBL', sharePercent: 10.1, products: 6 },
      { brand: 'Sony', sharePercent: 8.7, products: 5 },
      { brand: 'Samsung', sharePercent: 7.2, products: 4 },
    ],
  };
};

// Tracked Products
export const getTrackedProducts = async () => {
  await delay(200);
  return mockTrackedProducts;
};

// Suppliers
export const getSuppliers = async (query?: string) => {
  await delay(300);
  if (query) {
    const lowered = query.toLowerCase();
    return mockSuppliers.filter(
      (s) =>
        s.companyName.toLowerCase().includes(lowered) ||
        s.productCategories.some((c) => c.toLowerCase().includes(lowered))
    );
  }
  return mockSuppliers;
};
