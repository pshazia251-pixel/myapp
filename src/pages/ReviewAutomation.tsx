import { useState } from 'react';
import { Star, Send, BarChart2, Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';

interface ReviewRequest {
  id: string;
  orderId: string;
  productTitle: string;
  customerName: string;
  orderDate: string;
  status: 'pending' | 'sent' | 'reviewed' | 'failed';
  rating?: number;
}

const mockRequests: ReviewRequest[] = [
  { id: '1', orderId: '114-3941689-8772232', productTitle: 'Wireless Bluetooth Earbuds', customerName: 'John D.', orderDate: '2025-04-28', status: 'reviewed', rating: 5 },
  { id: '2', orderId: '114-5567823-1234567', productTitle: 'Portable Power Bank 20000mAh', customerName: 'Sarah M.', orderDate: '2025-04-29', status: 'sent' },
  { id: '3', orderId: '114-9988776-5544332', productTitle: 'Smart LED Light Bulbs', customerName: 'Mike R.', orderDate: '2025-04-30', status: 'pending' },
  { id: '4', orderId: '114-1122334-5566778', productTitle: 'Stainless Steel Water Bottle', customerName: 'Emily K.', orderDate: '2025-05-01', status: 'reviewed', rating: 4 },
  { id: '5', orderId: '114-6677889-0011223', productTitle: 'Resistance Bands Set', customerName: 'Chris L.', orderDate: '2025-05-01', status: 'failed' },
  { id: '6', orderId: '114-3344556-7788990', productTitle: 'Air Fryer 5.8 Qt', customerName: 'Amanda P.', orderDate: '2025-05-02', status: 'sent' },
  { id: '7', orderId: '114-2233445-6677889', productTitle: 'Yoga Mat Non-Slip', customerName: 'David W.', orderDate: '2025-05-02', status: 'pending' },
  { id: '8', orderId: '114-8899001-2233445', productTitle: 'Wireless Charging Pad', customerName: 'Lisa T.', orderDate: '2025-05-03', status: 'reviewed', rating: 5 },
];

export default function ReviewAutomation() {
  const [requests, setRequests] = useState(mockRequests);
  const [autoSend, setAutoSend] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const stats = {
    total: requests.length,
    sent: requests.filter((r) => r.status === 'sent').length,
    reviewed: requests.filter((r) => r.status === 'reviewed').length,
    pending: requests.filter((r) => r.status === 'pending').length,
    failed: requests.filter((r) => r.status === 'failed').length,
    avgRating:
      requests.filter((r) => r.rating).reduce((sum, r) => sum + (r.rating || 0), 0) /
        (requests.filter((r) => r.rating).length || 1),
  };

  const filteredRequests = selectedFilter === 'all' ? requests : requests.filter((r) => r.status === selectedFilter);

  const sendRequest = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'sent' as const } : r))
    );
  };

  const sendAll = () => {
    setRequests((prev) =>
      prev.map((r) => (r.status === 'pending' ? { ...r, status: 'sent' as const } : r))
    );
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'reviewed':
        return <CheckCircle className="w-4 h-4 text-js-green" />;
      case 'sent':
        return <Send className="w-4 h-4 text-js-blue" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-js-yellow" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-js-red" />;
      default:
        return null;
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'reviewed': return 'bg-js-green/15 text-js-green';
      case 'sent': return 'bg-js-blue/15 text-js-blue';
      case 'pending': return 'bg-js-yellow/15 text-js-yellow';
      case 'failed': return 'bg-js-red/15 text-js-red';
      default: return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-js-text-muted text-sm">
          Automate review requests to boost your product ratings
        </p>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoSend}
              onChange={(e) => setAutoSend(e.target.checked)}
              className="w-4 h-4 rounded border-js-border bg-js-darker accent-js-orange"
            />
            <span className="text-sm text-js-text">Auto-send after 5 days</span>
          </label>
          <button
            onClick={sendAll}
            className="flex items-center gap-2 px-4 py-2 bg-js-orange hover:bg-js-orange-dark text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Send className="w-4 h-4" />
            Send All Pending
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-js-card border border-js-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-4 h-4 text-js-orange" />
            <span className="text-js-text-muted text-xs">Total Requests</span>
          </div>
          <p className="text-white font-bold text-2xl">{stats.total}</p>
        </div>
        <div className="bg-js-card border border-js-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Send className="w-4 h-4 text-js-blue" />
            <span className="text-js-text-muted text-xs">Sent</span>
          </div>
          <p className="text-js-blue font-bold text-2xl">{stats.sent}</p>
        </div>
        <div className="bg-js-card border border-js-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-4 h-4 text-js-green" />
            <span className="text-js-text-muted text-xs">Reviewed</span>
          </div>
          <p className="text-js-green font-bold text-2xl">{stats.reviewed}</p>
        </div>
        <div className="bg-js-card border border-js-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-js-yellow" />
            <span className="text-js-text-muted text-xs">Pending</span>
          </div>
          <p className="text-js-yellow font-bold text-2xl">{stats.pending}</p>
        </div>
        <div className="bg-js-card border border-js-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-js-yellow" />
            <span className="text-js-text-muted text-xs">Avg Rating</span>
          </div>
          <p className="text-js-yellow font-bold text-2xl">{stats.avgRating.toFixed(1)}</p>
        </div>
      </div>

      <div className="flex gap-2">
        {['all', 'pending', 'sent', 'reviewed', 'failed'].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              selectedFilter === filter
                ? 'bg-js-orange text-white'
                : 'bg-js-card text-js-text-muted hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="bg-js-card border border-js-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-js-border bg-js-darker/50">
              <th className="text-left py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">
                Order ID
              </th>
              <th className="text-left py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">
                Product
              </th>
              <th className="text-left py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">
                Customer
              </th>
              <th className="text-left py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">
                Order Date
              </th>
              <th className="text-center py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="text-center py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">
                Rating
              </th>
              <th className="text-right py-3 px-4 text-js-text-muted text-xs font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr
                key={req.id}
                className="border-b border-js-border/30 hover:bg-js-card-hover transition-colors"
              >
                <td className="py-3 px-4 text-white text-sm font-mono">{req.orderId}</td>
                <td className="py-3 px-4 text-white text-sm">{req.productTitle}</td>
                <td className="py-3 px-4 text-js-text-muted text-sm">{req.customerName}</td>
                <td className="py-3 px-4 text-js-text-muted text-sm">{req.orderDate}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColor(req.status)}`}
                    >
                      {statusIcon(req.status)}
                      {req.status}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  {req.rating ? (
                    <span className="text-js-yellow">{'★'.repeat(req.rating)}</span>
                  ) : (
                    <span className="text-js-text-muted text-xs">—</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  {req.status === 'pending' && (
                    <button
                      onClick={() => sendRequest(req.id)}
                      className="px-3 py-1.5 bg-js-orange/15 text-js-orange rounded-lg text-xs font-medium hover:bg-js-orange/25 transition-colors"
                    >
                      Send Request
                    </button>
                  )}
                  {req.status === 'failed' && (
                    <button
                      onClick={() => sendRequest(req.id)}
                      className="px-3 py-1.5 bg-js-red/15 text-js-red rounded-lg text-xs font-medium hover:bg-js-red/25 transition-colors"
                    >
                      Retry
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
