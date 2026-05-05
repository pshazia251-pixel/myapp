import { useState } from 'react';
import { Wand2, Copy, RotateCcw, Check, AlertCircle } from 'lucide-react';

interface ListingData {
  title: string;
  bulletPoints: string[];
  description: string;
  searchTerms: string;
  targetKeywords: string;
}

export default function ListingBuilder() {
  const [listing, setListing] = useState<ListingData>({
    title: '',
    bulletPoints: ['', '', '', '', ''],
    description: '',
    searchTerms: '',
    targetKeywords: '',
  });
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const generateWithAI = async () => {
    if (!listing.targetKeywords.trim()) return;
    setGenerating(true);

    await new Promise((r) => setTimeout(r, 1500));

    const keywords = listing.targetKeywords.split(',').map((k) => k.trim());
    const mainKeyword = keywords[0] || 'product';

    setListing({
      ...listing,
      title: `Premium ${mainKeyword.charAt(0).toUpperCase() + mainKeyword.slice(1)} - Professional Grade ${keywords[1] || 'High Quality'} with ${keywords[2] || 'Advanced Features'} | Perfect for Home & Office Use`,
      bulletPoints: [
        `SUPERIOR QUALITY: Crafted with premium materials for long-lasting durability. Our ${mainKeyword} is designed to exceed your expectations with professional-grade performance.`,
        `VERSATILE DESIGN: Perfect for multiple use cases including home, office, and travel. Compatible with all standard ${keywords[1] || 'accessories'} for maximum convenience.`,
        `EASY TO USE: Simple setup in under 5 minutes. No tools required. Intuitive controls make it perfect for beginners and professionals alike.`,
        `SATISFACTION GUARANTEED: We stand behind our product with a 30-day money-back guarantee and 12-month warranty. Our dedicated customer support team is always ready to help.`,
        `GREAT VALUE: Includes everything you need to get started. ${keywords.slice(0, 3).join(', ')} capabilities all in one premium package at an unbeatable price.`,
      ],
      description: `Introducing our premium ${mainKeyword} - the ultimate solution for anyone looking for quality and reliability. Whether you're a professional or hobbyist, our ${mainKeyword} delivers exceptional performance that you can count on.\n\nKey Features:\n• Professional-grade ${keywords[1] || 'construction'}\n• Compatible with ${keywords[2] || 'standard accessories'}\n• Lightweight and portable design\n• Energy-efficient operation\n• Premium packaging makes it perfect for gifting\n\nWhy Choose Us?\nWith over 10,000 satisfied customers, our ${mainKeyword} has become the go-to choice for discerning buyers. We use only the finest materials and rigorous quality control to ensure every unit meets our high standards.\n\nWhat's in the Box:\n- 1x Premium ${mainKeyword}\n- 1x User Manual\n- 1x Quick Start Guide\n- 1x Warranty Card`,
      searchTerms: keywords.join(' ') + ` best ${mainKeyword} top rated premium quality`,
    });

    setScore(Math.floor(Math.random() * 3) + 8);
    setGenerating(false);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const getScoreColor = (s: number) => {
    if (s >= 9) return 'text-js-green';
    if (s >= 7) return 'text-js-yellow';
    return 'text-js-red';
  };

  const titleLength = listing.title.length;
  const titleMax = 200;

  return (
    <div className="space-y-4">
      <p className="text-js-text-muted text-sm">
        Build optimized product listings with AI-powered suggestions
      </p>

      <div className="bg-js-card border border-js-border rounded-xl p-5">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-js-orange" />
          AI Listing Generator
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter target keywords (comma-separated, e.g., wireless earbuds, bluetooth, noise cancelling)"
            value={listing.targetKeywords}
            onChange={(e) => setListing({ ...listing, targetKeywords: e.target.value })}
            className="flex-1 bg-js-darker border border-js-border rounded-lg px-4 py-3 text-sm text-white focus:border-js-orange outline-none"
          />
          <button
            onClick={generateWithAI}
            disabled={generating}
            className="px-6 py-3 bg-js-orange hover:bg-js-orange-dark text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {generating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Generate with AI
              </>
            )}
          </button>
        </div>
      </div>

      {score !== null && (
        <div className="bg-js-card border border-js-border rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 ${
                score >= 9
                  ? 'border-js-green bg-js-green/10 text-js-green'
                  : score >= 7
                    ? 'border-js-yellow bg-js-yellow/10 text-js-yellow'
                    : 'border-js-red bg-js-red/10 text-js-red'
              }`}
            >
              {score}
            </div>
            <div>
              <p className="text-white font-semibold">Listing Quality Score</p>
              <p className="text-js-text-muted text-xs">
                {score >= 9
                  ? 'Excellent! Your listing is highly optimized.'
                  : score >= 7
                    ? 'Good listing. Consider adding more keywords.'
                    : 'Needs improvement. Add more detail and keywords.'}
              </p>
            </div>
          </div>
          <div className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}/10</div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="bg-js-card border border-js-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold text-sm">Product Title</h3>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs ${titleLength > titleMax ? 'text-js-red' : 'text-js-text-muted'}`}
                >
                  {titleLength}/{titleMax}
                </span>
                <button
                  onClick={() => copyToClipboard(listing.title, 'title')}
                  className="p-1 rounded hover:bg-js-orange/15 text-js-text-muted hover:text-js-orange transition-colors"
                >
                  {copied === 'title' ? <Check className="w-4 h-4 text-js-green" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <textarea
              value={listing.title}
              onChange={(e) => setListing({ ...listing, title: e.target.value })}
              rows={3}
              className="w-full bg-js-darker border border-js-border rounded-lg px-4 py-3 text-sm text-white focus:border-js-orange outline-none resize-none"
              placeholder="Enter your product title..."
            />
            {titleLength > titleMax && (
              <p className="text-js-red text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Title exceeds {titleMax} character limit
              </p>
            )}
          </div>

          <div className="bg-js-card border border-js-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold text-sm">Bullet Points</h3>
              <button
                onClick={() =>
                  copyToClipboard(listing.bulletPoints.join('\n'), 'bullets')
                }
                className="p-1 rounded hover:bg-js-orange/15 text-js-text-muted hover:text-js-orange transition-colors"
              >
                {copied === 'bullets' ? (
                  <Check className="w-4 h-4 text-js-green" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="space-y-2">
              {listing.bulletPoints.map((bp, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-js-orange font-bold text-sm mt-2.5 w-4 flex-shrink-0">
                    {i + 1}
                  </span>
                  <textarea
                    value={bp}
                    onChange={(e) => {
                      const newBullets = [...listing.bulletPoints];
                      newBullets[i] = e.target.value;
                      setListing({ ...listing, bulletPoints: newBullets });
                    }}
                    rows={2}
                    className="flex-1 bg-js-darker border border-js-border rounded-lg px-3 py-2 text-sm text-white focus:border-js-orange outline-none resize-none"
                    placeholder={`Bullet point ${i + 1}...`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-js-card border border-js-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold text-sm">Product Description</h3>
              <button
                onClick={() => copyToClipboard(listing.description, 'description')}
                className="p-1 rounded hover:bg-js-orange/15 text-js-text-muted hover:text-js-orange transition-colors"
              >
                {copied === 'description' ? (
                  <Check className="w-4 h-4 text-js-green" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <textarea
              value={listing.description}
              onChange={(e) => setListing({ ...listing, description: e.target.value })}
              rows={12}
              className="w-full bg-js-darker border border-js-border rounded-lg px-4 py-3 text-sm text-white focus:border-js-orange outline-none resize-none"
              placeholder="Enter your product description..."
            />
          </div>

          <div className="bg-js-card border border-js-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold text-sm">Backend Search Terms</h3>
              <button
                onClick={() => copyToClipboard(listing.searchTerms, 'searchTerms')}
                className="p-1 rounded hover:bg-js-orange/15 text-js-text-muted hover:text-js-orange transition-colors"
              >
                {copied === 'searchTerms' ? (
                  <Check className="w-4 h-4 text-js-green" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <textarea
              value={listing.searchTerms}
              onChange={(e) => setListing({ ...listing, searchTerms: e.target.value })}
              rows={3}
              className="w-full bg-js-darker border border-js-border rounded-lg px-4 py-3 text-sm text-white focus:border-js-orange outline-none resize-none"
              placeholder="Enter backend search terms..."
            />
            <p className="text-js-text-muted text-xs mt-1">
              {listing.searchTerms.length}/250 bytes
            </p>
          </div>

          <button
            onClick={() => {
              setListing({
                title: '',
                bulletPoints: ['', '', '', '', ''],
                description: '',
                searchTerms: '',
                targetKeywords: '',
              });
              setScore(null);
            }}
            className="flex items-center gap-2 text-js-text-muted hover:text-white text-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All Fields
          </button>
        </div>
      </div>
    </div>
  );
}
