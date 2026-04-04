import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles, Activity, Brain, AlertTriangle, DollarSign,
  Zap, TrendingUp, BarChart3, ChevronRight,
  Info, RefreshCw,
} from 'lucide-react';

// ─── Ticker data ────────────────────────────────────────────────────────────────
const TICKER_EVENTS = [
  { id: 1,  text: 'Stock Update: Paracetamol 500mg', detail: 'SALE: 450 → 448' },
  { id: 2,  text: 'Alert: Ibuprofen 400mg', detail: 'OUT OF STOCK' },
  { id: 3,  text: 'New Order: ORD-2024-087', detail: 'City Hospital · ₹48,200' },
  { id: 4,  text: 'AI Prediction: Amoxicillin', detail: 'Demand +40% next week' },
  { id: 5,  text: 'Stock Update: Cetirizine 10mg', detail: 'RESTOCK: 620 → 680' },
  { id: 6,  text: 'Price Optimisation Applied', detail: 'Metformin 500mg · ₹85 → ₹88' },
  { id: 7,  text: 'Expiry Alert: Atorvastatin 20mg', detail: 'Batch BTH-2024-006 expires May 2024' },
  { id: 8,  text: 'Transfer Completed', detail: 'Main Warehouse → Branch A Pune' },
];

// ─── AI Recommendations ─────────────────────────────────────────────────────────
const RECOMMENDATIONS = [
  {
    id: 1, tag: 'Restock',
    title: 'Restock Metformin 500mg',
    desc: 'Stock critically low (12% remaining)',
    time: 'Now',
    urgency: 'critical',
  },
  {
    id: 2, tag: 'Pricing',
    title: 'Price Optimisation',
    desc: 'Cetirizine 10mg underpriced vs market avg',
    time: '2h ago',
    urgency: 'medium',
  },
  {
    id: 3, tag: 'Expiry',
    title: 'Expiry Alert',
    desc: 'Batch B2241 expires in 18 days',
    time: '3h ago',
    urgency: 'warning',
  },
  {
    id: 4, tag: 'Demand',
    title: 'Demand Spike Predicted',
    desc: 'Amoxicillin demand up 40% next week',
    time: '1d ago',
    urgency: 'info',
  },
];

// ─── Features ───────────────────────────────────────────────────────────────────
const FEATURES: { text: string; color: string }[][] = [
  [
    { text: 'Real-time stock updates',  color: 'var(--color-mint)' },
    { text: 'Automated alerts',         color: 'var(--color-mint)' },
    { text: 'Visual analytics',         color: 'var(--color-mint)' },
    { text: 'Auto categorization',      color: 'var(--color-mint)' },
  ],
  [
    { text: 'Predictive analytics',       color: 'var(--color-info)' },
    { text: 'Product recommendations',    color: 'var(--color-info)' },
    { text: 'Voice & chat integration',   color: 'var(--color-mint)' },
  ],
  [
    { text: 'Smart search & filters', color: 'var(--color-warning)' },
    { text: 'Error detection',         color: 'var(--color-warning)' },
    { text: 'Dynamic pricing',         color: 'var(--color-mint)' },
  ],
];

// ─── Health metrics ─────────────────────────────────────────────────────────────
const HEALTH_METRICS = [
  { label: 'Stock Coverage',       pct: 82, color: 'var(--color-mint)'    },
  { label: 'Order Fulfillment',    pct: 91, color: 'var(--color-mint)'    },
  { label: 'Supplier Reliability', pct: 74, color: 'var(--color-warning)' },
];

// ─── SVG Circular Progress ──────────────────────────────────────────────────────
const CircularProgress: React.FC<{ pct: number }> = ({ pct }) => {
  const r = 72;
  const cx = 90;
  const cy = 90;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      {/* Glow filter */}
      <defs>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="arc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1db97a" />
          <stop offset="100%" stopColor="#17a068" />
        </linearGradient>
      </defs>
      {/* Track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-surface-secondary)" strokeWidth="12" />
      {/* Arc */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="url(#arc-grad)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={circ / 4}
        filter="url(#glow)"
        style={{ transition: 'stroke-dasharray 1s ease' }}
      />
      {/* Center text */}
      <text x={cx} y={cy - 10} textAnchor="middle" fill="var(--color-text-primary)" fontSize="32" fontWeight="700">{pct}</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="var(--color-text-muted)" fontSize="13">/100</text>
      <text x={cx} y={cy + 30} textAnchor="middle" fill="var(--color-text-secondary)" fontSize="11">Health Score</text>
    </svg>
  );
};

// ─── Urgency badge color ────────────────────────────────────────────────────────
const urgencyDot = (u: string) => {
  switch (u) {
    case 'critical': return 'var(--color-danger)';
    case 'warning':  return 'var(--color-warning)';
    case 'info':     return 'var(--color-info)';
    default:         return 'var(--color-mint)';
  }
};

// ─── Main Component ─────────────────────────────────────────────────────────────
export const AIDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'errors'>('overview');
  const [tickerIdx, setTickerIdx] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [smartQuery, setSmartQuery] = useState('');
  const tickerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-rotate ticker
  useEffect(() => {
    tickerRef.current = setInterval(() => {
      setTickerIdx(i => (i + 1) % TICKER_EVENTS.length);
    }, 3200);
    return () => { if (tickerRef.current) clearInterval(tickerRef.current); };
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1400);
  };

  const ticker = TICKER_EVENTS[tickerIdx];

  const METRIC_CARDS = [
    {
      id: 'realtime', icon: Activity, iconColor: 'var(--color-mint)',
      number: '19', title: 'Real-Time Updates', subtitle: 'Live inventory tracking',
    },
    {
      id: 'predictive', icon: Brain, iconColor: 'var(--color-info)',
      number: '6', title: 'Predictive Analytics', subtitle: 'Demand forecasting',
    },
    {
      id: 'errors', icon: AlertTriangle, iconColor: 'var(--color-warning)',
      number: '3', title: 'Error Detection', subtitle: 'Anomaly identification',
    },
    {
      id: 'pricing', icon: DollarSign, iconColor: 'var(--color-mint)',
      number: '12', title: 'Dynamic Pricing', subtitle: 'AI pricing optimisation',
    },
  ];

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 p-4 sm:p-6 space-y-5 pb-0">
        {/* ── Page Header ──────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: "linear-gradient(135deg, #1db97a22, #1db97a44)",
                border: "1px solid #1db97a44",
              }}
            >
              <Sparkles
                className="w-5 h-5"
                style={{ color: "var(--color-mint)" }}
              />
            </div>
            <div>
              <h1 className="text-[22px] font-bold leading-tight text-[var(--color-text-primary)]">
                AI-Powered Inventory
              </h1>
              <p className="text-[13px] text-[var(--color-text-muted)] mt-0.5">
                Leverage artificial intelligence for smarter inventory
                management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 px-3 py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded-lg hover:text-[var(--color-mint)] transition-colors text-sm"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={() => setShowSmartSearch(true)}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #1db97a, #17a068)",
                borderRadius: "8px",
              }}
            >
              <Sparkles className="w-4 h-4" />
              Smart Search
            </button>
          </div>
        </div>

        {/* ── Metric Cards ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {METRIC_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5 relative
                           hover:border-[var(--color-mint)]/40 hover:shadow-lg transition-all cursor-default group"
              >
                {/* Large number — top right */}
                <div
                  className="absolute top-4 right-4 text-[32px] font-bold leading-none"
                  style={{ color: card.iconColor }}
                >
                  {card.number}
                </div>
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{
                    backgroundColor: `${card.iconColor}18`,
                    border: `1.5px solid ${card.iconColor}30`,
                  }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: card.iconColor }}
                    strokeWidth={1.8}
                  />
                </div>
                <div className="text-[15px] font-semibold text-[var(--color-text-primary)] leading-tight">
                  {card.title}
                </div>
                <div className="text-[12px] text-[var(--color-text-muted)] mt-0.5">
                  {card.subtitle}
                </div>

                {/* Subtle bottom glow on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${card.iconColor}, transparent)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ── AI Features Available ─────────────────────────────────────────── */}
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #1db97a18, #1db97a30)",
              }}
            >
              <Zap className="w-5 h-5" style={{ color: "var(--color-mint)" }} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-bold text-[var(--color-text-primary)]">
                AI Features Available
              </span>
              <span
                className="text-[11px] font-semibold px-3 py-0.5 rounded-full border"
                style={{
                  color: "var(--color-mint)",
                  borderColor: "var(--color-mint)",
                  backgroundColor: "var(--color-mint-glow)",
                }}
              >
                ✦ 10 Features
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2.5 gap-x-6">
            {FEATURES.map((col, ci) => (
              <div key={ci} className="space-y-2.5">
                {col.map((feat, fi) => (
                  <div key={fi} className="flex items-center gap-2.5">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: feat.color,
                        boxShadow: `0 0 6px ${feat.color}80`,
                      }}
                    />
                    <span className="text-[13px] text-[var(--color-text-secondary)]">
                      {feat.text}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabbed Analytics ─────────────────────────────────────────────── */}
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-[var(--color-border)] px-4 sm:px-6">
            {[
              { key: "overview", label: "📊 Overview" },
              { key: "analytics", label: "📈 Analytics" },
              { key: "errors", label: "⚠ Errors" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`relative py-3.5 px-4 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "text-[var(--color-mint)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full bg-[var(--color-mint)]" />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-4 sm:p-6">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                {/* Left — Health Score (60%) */}
                <div
                  className="lg:col-span-3 rounded-xl p-4 sm:p-5"
                  style={{
                    background: "var(--color-surface-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp
                      className="w-4 h-4"
                      style={{ color: "var(--color-mint)" }}
                    />
                    <span className="text-[14px] font-semibold text-[var(--color-text-primary)]">
                      Inventory Health Score
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* SVG Ring */}
                    <div className="flex-shrink-0">
                      <CircularProgress pct={78} />
                    </div>

                    {/* Bar metrics */}
                    <div className="flex-1 w-full space-y-4">
                      {HEALTH_METRICS.map((m, i) => (
                        <div key={i}>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[13px] text-[var(--color-text-secondary)]">
                              {m.label}
                            </span>
                            <span
                              className="text-[13px] font-semibold tabular-nums"
                              style={{ color: m.color }}
                            >
                              {m.pct}%
                            </span>
                          </div>
                          <div
                            className="w-full h-2 rounded-full overflow-hidden"
                            style={{ background: "var(--color-card-bg)" }}
                          >
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${m.pct}%`,
                                background: m.color,
                                boxShadow: `0 0 8px ${m.color}60`,
                              }}
                            />
                          </div>
                        </div>
                      ))}

                      {/* Mini legend */}
                      <div className="pt-2 flex gap-4">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-[var(--color-mint)]" />
                          <span className="text-[11px] text-[var(--color-text-muted)]">
                            Excellent (≥80%)
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-[var(--color-warning)]" />
                          <span className="text-[11px] text-[var(--color-text-muted)]">
                            Moderate (&lt;80%)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right — AI Recommendations (40%) */}
                <div
                  className="lg:col-span-2 rounded-xl p-4 sm:p-5"
                  style={{
                    background: "var(--color-surface-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles
                        className="w-4 h-4"
                        style={{ color: "var(--color-mint)" }}
                      />
                      <span className="text-[14px] font-semibold text-[var(--color-text-primary)]">
                        AI Recommendations
                      </span>
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
                      style={{
                        background: "var(--color-mint)22",
                        color: "var(--color-mint)",
                      }}
                    >
                      Live
                    </span>
                  </div>

                  <div className="space-y-3">
                    {RECOMMENDATIONS.map((rec) => (
                      <div
                        key={rec.id}
                        className="flex items-start gap-2.5 p-3 rounded-lg cursor-pointer group transition-colors"
                        style={{
                          background: "var(--color-card-bg)",
                          border: "1px solid var(--color-border)",
                        }}
                      >
                        {/* Sparkle / dot */}
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: `${urgencyDot(rec.urgency)}18` }}
                        >
                          <span
                            style={{
                              color: urgencyDot(rec.urgency),
                              fontSize: 13,
                            }}
                          >
                            ✦
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-semibold text-[var(--color-text-primary)] leading-tight">
                            {rec.title}
                          </div>
                          <div className="text-[12px] text-[var(--color-text-muted)] mt-0.5 truncate">
                            {rec.desc}
                          </div>
                        </div>
                        <div className="text-[11px] text-[var(--color-text-muted)] flex-shrink-0 pt-0.5 tabular-nums">
                          {rec.time}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="mt-3 w-full text-[12px] flex items-center justify-center gap-1 py-2 rounded-lg transition-colors"
                    style={{
                      color: "var(--color-mint)",
                      background: "var(--color-mint-glow)",
                      border: "1px solid var(--color-mint)22",
                    }}
                  >
                    View all recommendations{" "}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-6">
                {/* Demand Forecast */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      label: "Predicted Restock Events",
                      value: "7",
                      sub: "Next 7 days",
                      color: "var(--color-mint)",
                    },
                    {
                      label: "Demand Surge Items",
                      value: "3",
                      sub: "Predicted spike",
                      color: "var(--color-warning)",
                    },
                    {
                      label: "AI Accuracy Score",
                      value: "94.2%",
                      sub: "Model confidence",
                      color: "var(--color-info)",
                    },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-5"
                      style={{
                        background: "var(--color-surface-secondary)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <div className="text-[12px] text-[var(--color-text-muted)] mb-1">
                        {s.label}
                      </div>
                      <div
                        className="text-[28px] font-bold"
                        style={{ color: s.color }}
                      >
                        {s.value}
                      </div>
                      <div className="text-[11px] text-[var(--color-text-muted)]">
                        {s.sub}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Demand table */}
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ border: "1px solid var(--color-border)" }}
                >
                  <div
                    className="px-5 py-3 text-[13px] font-semibold text-[var(--color-text-primary)]"
                    style={{
                      background: "var(--color-surface-secondary)",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                  >
                    Demand Forecast — Next 7 Days
                  </div>
                  <div
                    className="divide-y"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    {[
                      {
                        product: "Amoxicillin 250mg",
                        change: "+40%",
                        status: "Surge",
                        color: "var(--color-warning)",
                      },
                      {
                        product: "Paracetamol 500mg",
                        change: "+12%",
                        status: "Growing",
                        color: "var(--color-mint)",
                      },
                      {
                        product: "Cetirizine 10mg",
                        change: "+28%",
                        status: "Surge",
                        color: "var(--color-warning)",
                      },
                      {
                        product: "Vitamin D3 60K",
                        change: "+8%",
                        status: "Stable",
                        color: "var(--color-mint)",
                      },
                      {
                        product: "Atorvastatin 20mg",
                        change: "-5%",
                        status: "Decline",
                        color: "var(--color-danger)",
                      },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-5 py-3 hover:bg-[var(--color-surface-secondary)] transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-md flex items-center justify-center"
                            style={{
                              background: "var(--color-surface-secondary)",
                            }}
                          >
                            <BarChart3
                              className="w-3.5 h-3.5"
                              style={{ color: "var(--color-mint)" }}
                            />
                          </div>
                          <span className="text-[13px] text-[var(--color-text-primary)]">
                            {row.product}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className="text-[13px] font-semibold tabular-nums"
                            style={{ color: row.color }}
                          >
                            {row.change}
                          </span>
                          <span
                            className="text-[11px] px-2 py-0.5 rounded-full"
                            style={{
                              background: `${row.color}18`,
                              color: row.color,
                            }}
                          >
                            {row.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "errors" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      label: "Anomalies Detected",
                      value: "3",
                      color: "var(--color-danger)",
                    },
                    {
                      label: "Auto-Resolved",
                      value: "1",
                      color: "var(--color-mint)",
                    },
                    {
                      label: "Pending Review",
                      value: "2",
                      color: "var(--color-warning)",
                    },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-5"
                      style={{
                        background: "var(--color-surface-secondary)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <div className="text-[12px] text-[var(--color-text-muted)] mb-1">
                        {s.label}
                      </div>
                      <div
                        className="text-[28px] font-bold"
                        style={{ color: s.color }}
                      >
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-xl overflow-hidden"
                  style={{ border: "1px solid var(--color-border)" }}
                >
                  <div
                    className="px-5 py-3 text-[13px] font-semibold text-[var(--color-text-primary)]"
                    style={{
                      background: "var(--color-surface-secondary)",
                      borderBottom: "1px solid var(--color-border)",
                    }}
                  >
                    Detected Anomalies
                  </div>
                  <div
                    className="divide-y"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    {[
                      {
                        title: "Duplicate Stock Entry",
                        desc: "Paracetamol 500mg — duplicate batch BTH-2024-001 detected",
                        time: "10 mins ago",
                        status: "Pending",
                        color: "var(--color-warning)",
                      },
                      {
                        title: "Negative Stock Count",
                        desc: "Ibuprofen 400mg — reported stock value is negative (-3)",
                        time: "1h ago",
                        status: "Pending",
                        color: "var(--color-danger)",
                      },
                      {
                        title: "Price Mismatch",
                        desc: "Cetirizine 10mg — purchase price higher than selling price",
                        time: "4h ago",
                        status: "Resolved",
                        color: "var(--color-mint)",
                      },
                    ].map((err, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 px-5 py-4 hover:bg-[var(--color-surface-secondary)] transition-colors"
                      >
                        <AlertTriangle
                          className="w-4 h-4 flex-shrink-0 mt-0.5"
                          style={{ color: err.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-semibold text-[var(--color-text-primary)]">
                            {err.title}
                          </div>
                          <div className="text-[12px] text-[var(--color-text-muted)] mt-0.5">
                            {err.desc}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div
                            className="text-[11px] px-2 py-0.5 rounded-full"
                            style={{
                              background: `${err.color}18`,
                              color: err.color,
                            }}
                          >
                            {err.status}
                          </div>
                          <div className="text-[11px] text-[var(--color-text-muted)] mt-1">
                            {err.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* end flex-1 */}

      {/* ── Live Activity Ticker ──────────────────────────────────────────────── */}
      <div
        className="sticky bottom-0 flex items-center gap-3 px-4 sm:px-6 py-2.5 mt-4"
        style={{
          background: "var(--color-surface-secondary)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <Info
          className="w-3.5 h-3.5 flex-shrink-0"
          style={{ color: "var(--color-mint)" }}
        />
        <div className="flex items-center gap-2 overflow-hidden">
          <span
            className="text-[12px] font-medium flex-shrink-0"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {ticker.text}
          </span>
          <span
            className="text-[12px] font-bold flex-shrink-0 tabular-nums"
            style={{ color: "var(--color-mint)" }}
          >
            {ticker.detail}
          </span>
        </div>
        {/* Indicator dots */}
        <div className="ml-auto flex gap-1 flex-shrink-0">
          {TICKER_EVENTS.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
              style={{
                background:
                  i === tickerIdx ? "var(--color-mint)" : "var(--color-border)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Smart Search Modal ────────────────────────────────────────────────── */}
      {showSmartSearch && (
        <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-50 p-4 pt-20">
          <div
            className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "var(--color-card-bg)",
              border: "1px solid var(--color-mint)44",
            }}
          >
            {/* Input */}
            <div
              className="flex items-center gap-3 p-4 border-b"
              style={{ borderColor: "var(--color-border)" }}
            >
              <Sparkles
                className="w-5 h-5 flex-shrink-0"
                style={{ color: "var(--color-mint)" }}
              />
              <input
                autoFocus
                type="text"
                placeholder="Ask AI anything about your inventory…"
                value={smartQuery}
                onChange={(e) => setSmartQuery(e.target.value)}
                className="flex-1 bg-transparent text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none text-sm"
              />
              <button
                onClick={() => {
                  setShowSmartSearch(false);
                  setSmartQuery("");
                }}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors text-sm px-2 py-1"
              >
                esc
              </button>
            </div>
            {/* Suggestions */}
            <div className="p-4 space-y-1.5">
              <div className="text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2 font-semibold">
                Suggested
              </div>
              {[
                "Which products are running low on stock?",
                "Predict demand for next week",
                "Show expiring items in the next 30 days",
                "Which items have the best margin?",
              ].map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSmartQuery(s)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "var(--color-surface-secondary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <Sparkles
                    className="w-3.5 h-3.5 flex-shrink-0"
                    style={{ color: "var(--color-mint)" }}
                  />
                  {s}
                </button>
              ))}
            </div>
            {smartQuery && (
              <div className="px-4 pb-4">
                <button
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #1db97a, #17a068)",
                  }}
                  onClick={() => {
                    setShowSmartSearch(false);
                    setSmartQuery("");
                  }}
                >
                  Search with AI ✦
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
