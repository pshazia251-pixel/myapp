import { useState } from 'react';
import { Search, Download, ArrowUpDown, BarChart2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { searchKeywords } from '../services/api';
import type { Keyword } from '../types';

type SearchMode = 'keyword' | 'asin';

export default function KeywordScout() {
  const [mode, setMode] = useState<SearchMode>('keyword');
  const [query, setQuery] = useState('');
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState<Keyword | null>(null);
  const [sortField, setSortField] = useState<keyof Keyword>('searchVolume');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const results = await searchKeywords(query);
    setKeywords(results);
    if (results.length > 0) setSelectedKeyword(results[0]);
    setLoading(false);
  };

  const handleSort = (field: keyof Keyword) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sortedKeywords = [...keywords].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const trendMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="space-y-4">
      <p className="text-js-text-muted text-sm">
        Discover high-converting keywords and analyze competitor keyword strategies
      </p>

      <div className="bg-js-card border border-js-border rounded-xl p-5">
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setMode('keyword')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === 'keyword' ? 'bg-js-orange text-white' : 'bg-js-darker text-js-text-muted'
            }`}
          >
            Search by Keyword
          </button>
          <button
            onClick={() => setMode('asin')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === 'asin' ? 'bg-js-orange text-white' : 'bg-js-darker text-js-text-muted'
            }`}
          >
            Search by ASIN
          </button>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-js-text-muted" />
            <input
              type="text"
              placeholder={
                mode === 'keyword'
                  ? 'Enter a keyword (e.g., wireless earbuds)'
                  : 'Enter an ASIN (e.g., B08N5WRWNW)'
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full bg-js-darker border border-js-border rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:border-js-orange outline-none"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-js-orange hover:bg-js-orange-dark text-white rounded-lg font-medium text-sm transition-colors"
          >
            Get Keywords
          </button>
        </div>
      </div>

      {keywords.length > 0 && (
        <>
          {selectedKeyword && (
            <div className="bg-js-card border border-js-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold">
                    &ldquo;{selectedKeyword.keyword}&rdquo; — Search Volume Trend
                  </h3>
                  <p className="text-js-text-muted text-sm mt-1">
                    Monthly search volume: {selectedKeyword.searchVolume.toLocaleString()} &middot;
                    Competitive Index: {selectedKeyword.competitiveIndex}/100
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="bg-js-darker rounded-lg px-3 py-2">
                    <span className="text-js-text-muted">Exact PPC Bid:</span>{' '}
                    <span className="text-js-orange font-bold">${selectedKeyword.exactPpcBid.toFixed(2)}</span>
                  </div>
                  <div className="bg-js-darker rounded-lg px-3 py-2">
                    <span className="text-js-text-muted">Broad PPC Bid:</span>{' '}
                    <span className="text-js-blue font-bold">${selectedKeyword.broadPpcBid.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={selectedKeyword.searchVolumeTrend.map((vol, i) => ({
                    month: trendMonths[i],
                    volume: vol,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
                  <XAxis dataKey="month" stroke="#8888aa" fontSize={11} />
                  <YAxis stroke="#8888aa" fontSize={11} tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ background: '#1e1e3a', border: '1px solid #2a2a4a', borderRadius: '8px' }}
                    formatter={(value) => [Number(value).toLocaleString(), 'Search Volume']}
                  />
                  <Bar dataKey="volume" fill="#f5a623" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-js-text-muted text-sm">{keywords.length} keywords found</span>
            <button className="flex items-center gap-2 px-4 py-2 bg-js-card border border-js-border rounded-lg text-sm hover:border-js-orange/50 transition-colors">
              <Download className="w-4 h-4" />
              Export Keywords
            </button>
          </div>

          <div className="bg-js-card border border-js-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-js-border bg-js-darker/50">
                    <th className="text-left py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">
                      Keyword
                    </th>
                    <th
                      className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-js-orange"
                      onClick={() => handleSort('searchVolume')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Search Vol <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">
                      Trend
                    </th>
                    <th
                      className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-js-orange"
                      onClick={() => handleSort('exactPpcBid')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Exact PPC <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th
                      className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-js-orange"
                      onClick={() => handleSort('broadPpcBid')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Broad PPC <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th
                      className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-js-orange"
                      onClick={() => handleSort('organicProductCount')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Products <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th
                      className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-js-orange"
                      onClick={() => handleSort('competitiveIndex')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Competition <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th
                      className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-js-orange"
                      onClick={() => handleSort('relevancyScore')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        Relevancy <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="text-center py-12 text-js-text-muted">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-js-orange border-t-transparent rounded-full animate-spin" />
                          Searching keywords...
                        </div>
                      </td>
                    </tr>
                  ) : (
                    sortedKeywords.map((kw) => (
                      <tr
                        key={kw.keyword}
                        onClick={() => setSelectedKeyword(kw)}
                        className={`border-b border-js-border/30 cursor-pointer transition-colors ${
                          selectedKeyword?.keyword === kw.keyword ? 'bg-js-orange/10' : 'hover:bg-js-card-hover'
                        }`}
                      >
                        <td className="py-3 px-4">
                          <span className="text-white text-sm font-medium">{kw.keyword}</span>
                        </td>
                        <td className="text-right py-3 px-4 text-white text-sm font-semibold">
                          {kw.searchVolume.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-0.5 h-6">
                            {kw.searchVolumeTrend.map((v, i) => (
                              <div
                                key={i}
                                className="w-1.5 bg-js-orange/60 rounded-full"
                                style={{
                                  height: `${Math.max(4, (v / Math.max(...kw.searchVolumeTrend)) * 24)}px`,
                                }}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="text-right py-3 px-4 text-js-orange text-sm font-medium">
                          ${kw.exactPpcBid.toFixed(2)}
                        </td>
                        <td className="text-right py-3 px-4 text-js-blue text-sm font-medium">
                          ${kw.broadPpcBid.toFixed(2)}
                        </td>
                        <td className="text-right py-3 px-4 text-white text-sm">
                          {kw.organicProductCount.toLocaleString()}
                        </td>
                        <td className="text-right py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 h-1.5 bg-js-darker rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  kw.competitiveIndex > 70
                                    ? 'bg-js-red'
                                    : kw.competitiveIndex > 40
                                      ? 'bg-js-yellow'
                                      : 'bg-js-green'
                                }`}
                                style={{ width: `${kw.competitiveIndex}%` }}
                              />
                            </div>
                            <span className="text-js-text-muted text-xs w-6 text-right">
                              {kw.competitiveIndex}
                            </span>
                          </div>
                        </td>
                        <td className="text-right py-3 px-4">
                          <div className="flex items-center justify-end">
                            <BarChart2
                              className={`w-4 h-4 ${
                                kw.relevancyScore > 70
                                  ? 'text-js-green'
                                  : kw.relevancyScore > 40
                                    ? 'text-js-yellow'
                                    : 'text-js-red'
                              }`}
                            />
                            <span className="text-js-text-muted text-xs ml-1">{kw.relevancyScore}</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {!loading && keywords.length === 0 && (
        <div className="bg-js-card border border-js-border rounded-xl p-12 text-center">
          <Search className="w-12 h-12 text-js-text-muted mx-auto mb-3 opacity-50" />
          <h3 className="text-white font-semibold mb-2">Search for Keywords</h3>
          <p className="text-js-text-muted text-sm max-w-md mx-auto">
            Enter a keyword or ASIN above to discover high-converting keywords,
            search volumes, PPC bids, and competition data.
          </p>
        </div>
      )}
    </div>
  );
}
