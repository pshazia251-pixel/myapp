import type { Product, TrackedProduct, Keyword, Supplier, SalesMetrics, DailyData } from '../types';

const generateDailyData = (days: number, baseValue: number, variance: number): DailyData[] => {
  const data: DailyData[] = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(baseValue + (Math.random() - 0.5) * variance),
    });
  }
  return data;
};

const categories = [
  'Electronics', 'Home & Kitchen', 'Sports & Outdoors', 'Health & Household',
  'Beauty & Personal Care', 'Toys & Games', 'Pet Supplies', 'Office Products',
  'Baby', 'Clothing', 'Tools & Home Improvement', 'Automotive',
  'Grocery & Gourmet', 'Patio & Garden', 'Arts & Crafts',
];

const brands = [
  'Anker', 'INIU', 'TOZO', 'Sceptre', 'Blink', 'Ring', 'Kasa Smart',
  'JBL', 'Sony', 'Samsung', 'Beats', 'Logitech', 'Apple', 'Razer',
  'Instant Pot', 'Ninja', 'KitchenAid', 'OXO', 'Cuisinart', 'Lodge',
  'Coleman', 'Igloo', 'Yeti', 'Stanley', 'Hydro Flask', 'CamelBak',
];

const productNames = [
  'Wireless Bluetooth Earbuds with Noise Cancellation',
  'Portable Power Bank 20000mAh Fast Charging',
  'Smart LED Light Bulbs Color Changing WiFi',
  'Stainless Steel Water Bottle Insulated 32oz',
  'Resistance Bands Set for Exercise Fitness',
  'Air Fryer 5.8 Qt Digital Touchscreen',
  'Yoga Mat Non-Slip Exercise Pad',
  'Wireless Charging Pad Fast Charge Compatible',
  'Kitchen Scale Digital Food Weight Grams',
  'Portable Bluetooth Speaker Waterproof IPX7',
  'Electric Toothbrush Rechargeable Sonic',
  'Massage Gun Deep Tissue Percussion',
  'Robot Vacuum Cleaner WiFi Smart Mapping',
  'Ring Light 10" with Tripod Stand',
  'Mechanical Keyboard RGB Backlit Gaming',
  'Webcam 4K Ultra HD Auto Focus',
  'Ergonomic Office Chair Lumbar Support',
  'Memory Foam Pillow Cooling Gel Infused',
  'Cast Iron Skillet Pre-Seasoned 12 Inch',
  'French Press Coffee Maker Stainless Steel',
  'Protein Shaker Bottle 28oz BPA Free',
  'Wireless Mouse Ergonomic Rechargeable',
  'Portable Projector 1080P Full HD WiFi',
  'Electric Kettle Temperature Control Gooseneck',
  'Noise Cancelling Headphones Over Ear ANC',
  'Smart Watch Fitness Tracker Heart Rate',
  'Laptop Stand Adjustable Aluminum Foldable',
  'USB C Hub Multiport Adapter 8-in-1',
  'Dash Cam Front and Rear 4K HDR',
  'Instant Read Meat Thermometer Digital',
  'Pet Camera Treat Dispenser WiFi 1080p',
  'Magnetic Phone Mount Car Dashboard',
  'Sous Vide Precision Cooker WiFi Bluetooth',
  'Cordless Stick Vacuum Lightweight 250W',
  'Electric Wine Opener Rechargeable Automatic',
  'Solar Power Bank 30000mAh Waterproof',
  'Baby Monitor Camera WiFi Night Vision',
  'Smart Doorbell Camera Wireless HD',
  'Portable Ice Maker Countertop 26 Lbs',
  'Heated Blanket Electric Throw 50x60',
];

const generateProduct = (index: number): Product => {
  const price = Math.round((Math.random() * 150 + 10) * 100) / 100;
  const monthlySales = Math.round(Math.random() * 5000 + 100);
  const monthlyRevenue = Math.round(price * monthlySales);
  const fees = Math.round(price * (0.15 + Math.random() * 0.15) * 100) / 100;
  const netProfit = Math.round((price - fees - price * 0.3) * monthlySales);
  const margin = Math.round(((price - fees - price * 0.3) / price) * 100);

  return {
    asin: `B0${String(index).padStart(8, '0')}${Math.random().toString(36).substring(2, 4).toUpperCase()}`,
    title: productNames[index % productNames.length],
    brand: brands[Math.floor(Math.random() * brands.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    price,
    monthlySales,
    monthlyRevenue,
    bsr: Math.round(Math.random() * 50000 + 100),
    reviews: Math.round(Math.random() * 10000 + 10),
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    sellerType: (['FBA', 'FBM', 'AMZ'] as const)[Math.floor(Math.random() * 3)],
    imageUrl: `https://picsum.photos/seed/${index}/100/100`,
    dateFirstAvailable: new Date(Date.now() - Math.random() * 365 * 3 * 86400000).toISOString().split('T')[0],
    weight: Math.round(Math.random() * 5 * 100) / 100,
    dimensions: `${Math.round(Math.random() * 15 + 3)}" x ${Math.round(Math.random() * 10 + 2)}" x ${Math.round(Math.random() * 8 + 1)}"`,
    fees,
    netProfit,
    margin,
    lqs: Math.round(Math.random() * 5 + 5),
  };
};

export const mockProducts: Product[] = Array.from({ length: 100 }, (_, i) => generateProduct(i));

export const mockTrackedProducts: TrackedProduct[] = mockProducts.slice(0, 15).map((p) => ({
  ...p,
  trackingSince: new Date(Date.now() - Math.random() * 30 * 86400000).toISOString().split('T')[0],
  salesHistory: generateDailyData(30, p.monthlySales / 30, p.monthlySales / 60),
  priceHistory: generateDailyData(30, p.price, p.price * 0.1),
  rankHistory: generateDailyData(30, p.bsr, p.bsr * 0.2),
  group: ['Group A', 'Group B', undefined][Math.floor(Math.random() * 3)],
}));

export const mockKeywords: Keyword[] = [
  'wireless earbuds', 'bluetooth headphones', 'noise cancelling', 'power bank',
  'portable charger', 'smart light bulbs', 'water bottle insulated', 'resistance bands',
  'air fryer', 'yoga mat', 'wireless charger', 'bluetooth speaker', 'electric toothbrush',
  'massage gun', 'robot vacuum', 'ring light', 'mechanical keyboard', 'webcam 4k',
  'office chair ergonomic', 'memory foam pillow', 'cast iron skillet', 'french press',
  'protein shaker', 'wireless mouse', 'portable projector', 'electric kettle',
  'noise cancelling headphones', 'fitness tracker', 'laptop stand', 'usb c hub',
  'dash cam', 'meat thermometer', 'pet camera', 'phone mount car',
  'sous vide', 'stick vacuum', 'wine opener', 'solar power bank',
  'baby monitor', 'smart doorbell',
].map((keyword) => ({
  keyword,
  searchVolume: Math.round(Math.random() * 200000 + 5000),
  searchVolumeTrend: Array.from({ length: 12 }, () => Math.round(Math.random() * 200000 + 5000)),
  exactPpcBid: Math.round(Math.random() * 5 * 100) / 100,
  broadPpcBid: Math.round(Math.random() * 3 * 100) / 100,
  organicProductCount: Math.round(Math.random() * 5000 + 100),
  sponsoredProductCount: Math.round(Math.random() * 50 + 5),
  competitiveIndex: Math.round(Math.random() * 100),
  relevancyScore: Math.round(Math.random() * 100),
  category: categories[Math.floor(Math.random() * categories.length)],
  recommendedRank: Math.round(Math.random() * 50 + 1),
}));

export const mockSalesMetrics: SalesMetrics = {
  totalSales: 128750,
  totalProfit: 38625,
  unitsSold: 3420,
  roi: 42.5,
  netMargin: 30,
  avgSalesPrice: 37.65,
  refunds: 2340,
  ppcSpend: 4520,
  ppcSales: 18760,
  organicSales: 109990,
};

export const mockSalesHistory = generateDailyData(90, 4500, 2000);
export const mockProfitHistory = generateDailyData(90, 1350, 600);
export const mockUnitsHistory = generateDailyData(90, 120, 50);

export const mockSuppliers: Supplier[] = [
  'Shenzhen Bright Electronics Co., Ltd.',
  'Yiwu Golden Star Trading Co.',
  'Dongguan Premium Plastics Ltd.',
  'Guangzhou EcoHome Manufacturing',
  'Ningbo SkyTech Innovation Co.',
  'Shanghai Dragon Industrial Co.',
  'Hangzhou SmartGoods Trading Co.',
  'Foshan Quality Living Products',
  'Xiamen GreenLeaf Imports',
  'Quanzhou FitLife Manufacturing',
  'Zhongshan LightPro Electronics',
  'Wenzhou PackWell Industries',
].map((companyName, i) => ({
  id: `SUP-${String(i + 1).padStart(4, '0')}`,
  companyName,
  country: 'China',
  verifiedDate: new Date(Date.now() - Math.random() * 365 * 86400000).toISOString().split('T')[0],
  productCategories: categories.slice(Math.floor(Math.random() * 5), Math.floor(Math.random() * 5) + 3),
  minOrderQty: [100, 200, 500, 1000][Math.floor(Math.random() * 4)],
  avgLeadTime: `${Math.floor(Math.random() * 20 + 10)}-${Math.floor(Math.random() * 15 + 25)} days`,
  rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
  responseRate: Math.round(Math.random() * 30 + 70),
  verified: Math.random() > 0.3,
  topProducts: productNames.slice(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10) + 3),
}));

export const amazonCategories = categories;
