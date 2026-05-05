import { useState } from 'react';
import { Calculator, DollarSign, Percent, Package, Truck } from 'lucide-react';
import type { FBACalcResult } from '../types';

export default function ProfitCalculator() {
  const [sellingPrice, setSellingPrice] = useState(29.99);
  const [costOfGoods, setCostOfGoods] = useState(8.5);
  const [shippingToAmazon, setShippingToAmazon] = useState(1.5);
  const [productWeight, setProductWeight] = useState(1.2);
  const [productCategory, setProductCategory] = useState('Electronics');
  const [isSmallLight, setIsSmallLight] = useState(false);

  const referralRate: Record<string, number> = {
    Electronics: 0.08,
    'Home & Kitchen': 0.15,
    'Sports & Outdoors': 0.15,
    'Health & Household': 0.08,
    'Beauty & Personal Care': 0.08,
    'Toys & Games': 0.15,
    'Pet Supplies': 0.15,
    'Office Products': 0.15,
    Baby: 0.08,
    Clothing: 0.17,
    'Tools & Home Improvement': 0.15,
    Automotive: 0.12,
    'Grocery & Gourmet': 0.08,
  };

  const calculate = (): FBACalcResult => {
    const amazonReferralFee = sellingPrice * (referralRate[productCategory] || 0.15);

    let fbaFee: number;
    if (isSmallLight) {
      fbaFee = productWeight <= 0.5 ? 3.22 : productWeight <= 1 ? 3.4 : 3.58 + (productWeight - 1) * 0.32;
    } else {
      fbaFee =
        productWeight <= 0.5
          ? 3.22
          : productWeight <= 1
            ? 3.86
            : productWeight <= 2
              ? 5.32
              : 5.32 + (productWeight - 2) * 0.38;
    }

    const storageFee = productWeight * 0.83;
    const totalFees = amazonReferralFee + fbaFee + storageFee + shippingToAmazon;
    const profit = sellingPrice - costOfGoods - totalFees;
    const margin = (profit / sellingPrice) * 100;
    const roi = (profit / (costOfGoods + shippingToAmazon)) * 100;

    return {
      sellingPrice,
      costOfGoods,
      amazonReferralFee: Math.round(amazonReferralFee * 100) / 100,
      fbaFee: Math.round(fbaFee * 100) / 100,
      storageFee: Math.round(storageFee * 100) / 100,
      shippingToAmazon,
      totalFees: Math.round(totalFees * 100) / 100,
      profit: Math.round(profit * 100) / 100,
      margin: Math.round(margin * 10) / 10,
      roi: Math.round(roi * 10) / 10,
    };
  };

  const result = calculate();

  return (
    <div className="space-y-6">
      <p className="text-js-text-muted text-sm">
        Calculate your FBA fees, profit margins, and ROI before investing in a product
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-js-card border border-js-border rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-js-orange" />
              Product Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-js-text-muted uppercase tracking-wider block mb-2">
                  Selling Price ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-js-text-muted" />
                  <input
                    type="number"
                    step="0.01"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(+e.target.value)}
                    className="w-full bg-js-darker border border-js-border rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:border-js-orange outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-js-text-muted uppercase tracking-wider block mb-2">
                  Cost of Goods ($)
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-js-text-muted" />
                  <input
                    type="number"
                    step="0.01"
                    value={costOfGoods}
                    onChange={(e) => setCostOfGoods(+e.target.value)}
                    className="w-full bg-js-darker border border-js-border rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:border-js-orange outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-js-text-muted uppercase tracking-wider block mb-2">
                  Shipping to Amazon ($)
                </label>
                <div className="relative">
                  <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-js-text-muted" />
                  <input
                    type="number"
                    step="0.01"
                    value={shippingToAmazon}
                    onChange={(e) => setShippingToAmazon(+e.target.value)}
                    className="w-full bg-js-darker border border-js-border rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:border-js-orange outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-js-text-muted uppercase tracking-wider block mb-2">
                  Product Weight (lbs)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={productWeight}
                  onChange={(e) => setProductWeight(+e.target.value)}
                  className="w-full bg-js-darker border border-js-border rounded-lg px-4 py-3 text-sm text-white focus:border-js-orange outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-js-text-muted uppercase tracking-wider block mb-2">
                  Category
                </label>
                <select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="w-full bg-js-darker border border-js-border rounded-lg px-4 py-3 text-sm text-white focus:border-js-orange outline-none"
                >
                  {Object.keys(referralRate).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat} ({(referralRate[cat] * 100).toFixed(0)}% referral)
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSmallLight}
                  onChange={(e) => setIsSmallLight(e.target.checked)}
                  className="w-4 h-4 rounded border-js-border bg-js-darker accent-js-orange"
                />
                <span className="text-sm text-js-text">FBA Small and Light eligible</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-js-card border border-js-border rounded-xl p-5">
            <h3 className="text-white font-semibold mb-4">Fee Breakdown</h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-js-border/30">
                <span className="text-js-text-muted text-sm">Selling Price</span>
                <span className="text-white font-medium">${result.sellingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-js-border/30">
                <span className="text-js-text-muted text-sm">Cost of Goods</span>
                <span className="text-js-red font-medium">-${result.costOfGoods.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-js-border/30">
                <span className="text-js-text-muted text-sm">
                  Amazon Referral Fee ({((referralRate[productCategory] || 0.15) * 100).toFixed(0)}%)
                </span>
                <span className="text-js-red font-medium">-${result.amazonReferralFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-js-border/30">
                <span className="text-js-text-muted text-sm">FBA Fulfillment Fee</span>
                <span className="text-js-red font-medium">-${result.fbaFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-js-border/30">
                <span className="text-js-text-muted text-sm">Monthly Storage Fee</span>
                <span className="text-js-red font-medium">-${result.storageFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-js-border/30">
                <span className="text-js-text-muted text-sm">Shipping to Amazon</span>
                <span className="text-js-red font-medium">-${result.shippingToAmazon.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-js-border">
                <span className="text-white font-semibold">Total Fees</span>
                <span className="text-js-red font-bold">-${result.totalFees.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div
              className={`rounded-xl p-4 text-center border ${
                result.profit >= 0
                  ? 'bg-js-green/10 border-js-green/30'
                  : 'bg-js-red/10 border-js-red/30'
              }`}
            >
              <p className="text-js-text-muted text-xs mb-1">Net Profit</p>
              <p
                className={`text-2xl font-bold ${result.profit >= 0 ? 'text-js-green' : 'text-js-red'}`}
              >
                ${result.profit.toFixed(2)}
              </p>
            </div>
            <div
              className={`rounded-xl p-4 text-center border ${
                result.margin >= 20
                  ? 'bg-js-green/10 border-js-green/30'
                  : result.margin >= 10
                    ? 'bg-js-yellow/10 border-js-yellow/30'
                    : 'bg-js-red/10 border-js-red/30'
              }`}
            >
              <p className="text-js-text-muted text-xs mb-1">Margin</p>
              <p
                className={`text-2xl font-bold ${
                  result.margin >= 20
                    ? 'text-js-green'
                    : result.margin >= 10
                      ? 'text-js-yellow'
                      : 'text-js-red'
                }`}
              >
                {result.margin.toFixed(1)}%
              </p>
            </div>
            <div
              className={`rounded-xl p-4 text-center border ${
                result.roi >= 50
                  ? 'bg-js-green/10 border-js-green/30'
                  : result.roi >= 25
                    ? 'bg-js-yellow/10 border-js-yellow/30'
                    : 'bg-js-red/10 border-js-red/30'
              }`}
            >
              <p className="text-js-text-muted text-xs mb-1">ROI</p>
              <p
                className={`text-2xl font-bold ${
                  result.roi >= 50
                    ? 'text-js-green'
                    : result.roi >= 25
                      ? 'text-js-yellow'
                      : 'text-js-red'
                }`}
              >
                {result.roi.toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="bg-js-card border border-js-border rounded-xl p-5">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Percent className="w-4 h-4 text-js-orange" />
              Profitability Summary
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-js-text-muted">Profit per unit</span>
                  <span className="text-white">${result.profit.toFixed(2)}</span>
                </div>
                <div className="w-full h-2 bg-js-darker rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${result.profit >= 0 ? 'bg-js-green' : 'bg-js-red'}`}
                    style={{ width: `${Math.min(100, Math.max(0, result.margin))}%` }}
                  />
                </div>
              </div>
              <div className="text-xs text-js-text-muted space-y-1">
                <p>
                  If you sell <span className="text-white font-medium">100 units/month</span>, your
                  monthly profit would be{' '}
                  <span className={result.profit >= 0 ? 'text-js-green font-bold' : 'text-js-red font-bold'}>
                    ${(result.profit * 100).toFixed(2)}
                  </span>
                </p>
                <p>
                  If you sell <span className="text-white font-medium">500 units/month</span>, your
                  monthly profit would be{' '}
                  <span className={result.profit >= 0 ? 'text-js-green font-bold' : 'text-js-red font-bold'}>
                    ${(result.profit * 500).toFixed(2)}
                  </span>
                </p>
                <p>
                  If you sell <span className="text-white font-medium">1,000 units/month</span>, your
                  monthly profit would be{' '}
                  <span className={result.profit >= 0 ? 'text-js-green font-bold' : 'text-js-red font-bold'}>
                    ${(result.profit * 1000).toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
