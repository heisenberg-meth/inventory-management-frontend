import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Package, ShoppingCart, BarChart3, Settings, Download,
  Factory, Target, Sparkles, CreditCard, Wrench,
  Star, Trophy, Quote,
  ChevronDown,
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────
interface DropdownLink {
  label: string;
  desc?: string;
  emoji?: string;
  price?: string;
}

interface DropdownSection {
  icon: React.ElementType;
  heading: string;
  links: DropdownLink[];
}

type DropdownId = 'features' | 'solutions' | 'pricing' | 'testimonials';

// ─── Dropdown Data ──────────────────────────────────────────────────────────
const featuresData: DropdownSection[] = [
  {
    icon: Package, heading: 'INVENTORY',
    links: [
      { label: 'Products & Categories' },
      { label: 'Stock Management' },
      { label: 'Batch & Expiry Tracking' },
      { label: 'Warehouse Management' },
      { label: 'Stock Adjustments' },
      { label: 'Low Stock Alerts' },
    ],
  },
  {
    icon: ShoppingCart, heading: 'SALES & ORDERS',
    links: [
      { label: 'Sales Orders' },
      { label: 'Purchase Orders' },
      { label: 'Invoices & Billing' },
      { label: 'Shipments & Delivery' },
      { label: 'Returns & Refunds' },
      { label: 'Payment Tracking' },
    ],
  },
  {
    icon: BarChart3, heading: 'ANALYTICS & AI',
    links: [
      { label: 'AI Dashboard' },
      { label: 'Sales Analytics' },
      { label: 'Inventory Reports' },
      { label: 'Demand Forecasting' },
      { label: 'Profit & Loss Report' },
      { label: 'Activity Logs' },
    ],
  },
  {
    icon: Settings, heading: 'PLATFORM',
    links: [
      { label: 'Role-Based Access' },
      { label: 'Multi-Tenant Support' },
      { label: 'Custom Domain' },
      { label: 'API Access' },
      { label: 'Integrations' },
      { label: 'Audit Logs' },
    ],
  },
];

const solutionsIndustry: DropdownLink[] = [
  { emoji: '💊', label: 'Pharmacy', desc: 'Expiry tracking, batch management' },
  { emoji: '🛒', label: 'Supermarket', desc: 'Barcode billing, fast checkout' },
  { emoji: '🏭', label: 'Warehouse', desc: 'Bulk storage, location tracking' },
  { emoji: '🏪', label: 'Retail', desc: 'POS integration, sales sync' },
];

const solutionsUseCase: DropdownLink[] = [
  { emoji: '📦', label: 'Inventory Control', desc: 'Manage and track items end-to-end' },
  { emoji: '🏭', label: 'Warehouse Management', desc: 'Control stock across locations' },
  { emoji: '📡', label: 'Multi-channel Selling', desc: 'Sync stock, streamline sales' },
  { emoji: '📋', label: 'Order Management', desc: 'Manage sales and purchases' },
  { emoji: '🚚', label: 'Order Fulfillment', desc: 'Pick, pack, and ship centrally' },
  { emoji: '🔄', label: 'Stock Transfers', desc: 'Move inventory between locations' },
];

const pricingPlans: DropdownLink[] = [
  { label: 'Starter', price: 'Free forever' },
  { label: 'Business', price: '₹2,499/month' },
  { label: 'Premium', price: '₹4,999/month' },
  { label: 'Enterprise', price: 'Custom pricing' },
];

const pricingAddons: DropdownLink[] = [
  { label: 'Extra Warehouses' },
  { label: 'Advanced API Access' },
  { label: 'Custom Domain Setup' },
  { label: 'Dedicated Support' },
  { label: 'SSO / SAML Auth' },
  { label: 'White-label Option' },
];

const reviewsStories: DropdownLink[] = [
  { label: 'Case Studies' },
  { label: 'Video Testimonials' },
  { label: 'Success Stories' },
  { label: 'ROI Calculator' },
  { label: 'Customer Gallery' },
  { label: 'Partner Program' },
];

const ratings = [
  { platform: 'Capterra', score: '4.5/5', stars: 4.5 },
  { platform: 'G2 Crowd', score: '4.5/5', stars: 4.5 },
  { platform: 'Software Advice', score: '4.7/5', stars: 4.7 },
];

// ─── Subcomponents ──────────────────────────────────────────────────────────

function SectionHeading({ icon: Icon, heading }: { icon: React.ElementType; heading: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #e8f5f0' }}>
      <Icon size={18} color="#0d6e5a" />
      <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: '#0d1b2a', letterSpacing: '0.06em' }}>
        {heading}
      </span>
    </div>
  );
}

function LinkItem({ label, onClick }: { label: string; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center',
        padding: '8px 10px',
        paddingLeft: hovered ? 14 : 10,
        borderRadius: 6,
        fontSize: 14, fontWeight: 400,
        color: hovered ? '#1db97a' : '#4a6670',
        background: hovered ? 'rgba(29,185,122,0.06)' : 'transparent',
        cursor: 'pointer',
        transition: 'all 150ms ease',
      }}
    >
      {label}
    </div>
  );
}

function DescLinkItem({ emoji, label, desc }: { emoji?: string; label: string; desc?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '10px 10px',
        borderRadius: 6,
        borderLeft: hovered ? '3px solid #1db97a' : '3px solid transparent',
        background: hovered ? 'rgba(29,185,122,0.05)' : 'transparent',
        cursor: 'pointer',
        transition: 'all 150ms ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {emoji && <span style={{ fontSize: 14 }}>{emoji}</span>}
        <span style={{ fontSize: 14, fontWeight: 600, color: '#0d1b2a' }}>{label}</span>
      </div>
      {desc && <div style={{ fontSize: 12, color: '#6b7a8d', marginTop: 2, marginLeft: emoji ? 20 : 0 }}>{desc}</div>}
    </div>
  );
}

function PlanRow({ label, price }: { label: string; price?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 10px',
        borderRadius: 6,
        borderBottom: '1px solid #f0f4f8',
        background: hovered ? 'rgba(29,185,122,0.05)' : 'transparent',
        cursor: 'pointer',
        transition: 'all 150ms ease',
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 600, color: '#0d1b2a' }}>{label}</span>
      {price && <span style={{ fontSize: 13, color: '#1db97a', fontWeight: 500 }}>{price}</span>}
    </div>
  );
}

function StarRating({ count }: { count: number }) {
  const full = Math.floor(count);
  const half = count % 1 >= 0.5;
  return (
    <span style={{ display: 'inline-flex', gap: 1 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ fontSize: 14, color: i < full || (i === full && half) ? '#f59e0b' : '#e2e8f0' }}>★</span>
      ))}
    </span>
  );
}

// ─── Dropdown Panels ────────────────────────────────────────────────────────

function FeaturesDropdown() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
      {featuresData.map((section, i) => (
        <div key={i}>
          <SectionHeading icon={section.icon} heading={section.heading} />
          <div>{section.links.map((link, j) => <LinkItem key={j} label={link.label} />)}</div>
          {i === 3 && (
            <div style={{
              marginTop: 16, background: '#f0fdf9', borderRadius: 10,
              border: '1px solid #d1fae5', padding: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Download size={16} color="#0d6e5a" />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0d6e5a' }}>Download Feature List</span>
              </div>
              <div style={{ fontSize: 12, color: '#6b7a8d', marginTop: 4 }}>Get the complete PDF guide</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SolutionsDropdown() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 280px', gap: 48 }}>
      <div>
        <SectionHeading icon={Factory} heading="BY INDUSTRY" />
        <div>{solutionsIndustry.map((link, i) => <DescLinkItem key={i} {...link} />)}</div>
      </div>
      <div>
        <SectionHeading icon={Target} heading="BY USE CASE" />
        <div>{solutionsUseCase.map((link, i) => <DescLinkItem key={i} {...link} />)}</div>
      </div>
      <div style={{
        background: 'linear-gradient(135deg, #0d6e5a, #1db97a)',
        borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Sparkles size={18} color="white" />
            <span style={{
              fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
              background: 'white', color: '#0d6e5a', padding: '2px 8px', borderRadius: 4, letterSpacing: '0.06em',
            }}>FEATURED</span>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 8 }}>See IMS in action</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, marginBottom: 16 }}>
            Book a live demo with our product team.
          </div>
        </div>
        <div>
          <button style={{
            width: '100%', height: 36, background: 'white', color: '#0d6e5a',
            borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>Book a Demo →</button>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: 8 }}>
            15-min session · Free · No commitment
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingDropdown() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
      <div>
        <SectionHeading icon={CreditCard} heading="PLANS" />
        <div>{pricingPlans.map((plan, i) => <PlanRow key={i} label={plan.label} price={plan.price} />)}</div>
      </div>
      <div>
        <SectionHeading icon={Wrench} heading="ADD-ONS" />
        <div>{pricingAddons.map((link, i) => <LinkItem key={i} label={link.label} />)}</div>
      </div>
      <div style={{
        background: '#f0fdf9', border: '1px solid #d1fae5',
        borderRadius: 12, padding: 20,
      }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#0d1b2a', marginBottom: 8 }}>Not sure which plan?</div>
        <div style={{ fontSize: 13, color: '#6b7a8d', lineHeight: 1.5, marginBottom: 16 }}>
          Answer 3 quick questions and we'll recommend the best plan for your business.
        </div>
        <button style={{
          width: '100%', height: 36, background: '#0d6e5a', color: 'white',
          borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>Find My Plan →</button>
        <div style={{ fontSize: 12, color: '#1db97a', textAlign: 'center', marginTop: 10, cursor: 'pointer' }}>
          Or compare all plans ›
        </div>
      </div>
    </div>
  );
}

function ReviewsDropdown() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
      <div>
        <SectionHeading icon={Star} heading="CUSTOMER STORIES" />
        <div>{reviewsStories.map((link, i) => <LinkItem key={i} label={link.label} />)}</div>
      </div>
      <div>
        <SectionHeading icon={Trophy} heading="RATINGS & AWARDS" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ratings.map((r, i) => (
            <div key={i} style={{
              background: 'white', border: '1px solid #e8f5f0', borderRadius: 8,
              padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#4a6670' }}>{r.platform}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <StarRating count={r.stars} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0d1b2a' }}>{r.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{
        background: 'white', border: '1px solid #e8f5f0',
        borderRadius: 14, padding: 20,
      }}>
        <div style={{ marginBottom: 12 }}><StarRating count={5} /></div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
          <Quote size={16} color="#1db97a" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: 15, fontWeight: 400, color: '#0d1b2a', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
            IMS transformed how we manage our 3 pharmacy branches.
            The expiry tracking saved us ₹2.4L in spoilage last year.
          </p>
        </div>
        <div style={{ borderTop: '1px solid #f0f4f8', margin: '12px 0' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', background: '#0d6e5a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 12, fontWeight: 700,
          }}>RK</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0d1b2a' }}>Ravi Kumar</div>
            <div style={{ fontSize: 12, color: '#6b7a8d' }}>ABC Pharmacy Chain</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const dropdownContent: Record<DropdownId, () => React.ReactElement> = {
  features: FeaturesDropdown,
  solutions: SolutionsDropdown,
  pricing: PricingDropdown,
  testimonials: ReviewsDropdown,
};

const NAV_ITEMS: { id: DropdownId; label: string }[] = [
  { id: 'features', label: 'Features' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'testimonials', label: 'Reviews' },
];

// ─── Exported Hook + Components ─────────────────────────────────────────────

export function useMegaDropdown() {
  const [activeDropdown, setActiveDropdown] = useState<DropdownId | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = useCallback((id: DropdownId) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setActiveDropdown(id);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 100);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  }, []);

  const close = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveDropdown(null); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return { activeDropdown, open, scheduleClose, cancelClose, close };
}

export function MegaNavLinks({
  activeDropdown, open, scheduleClose, textColor,
}: {
  activeDropdown: DropdownId | null;
  open: (id: DropdownId) => void;
  scheduleClose: () => void;
  textColor: string;
}) {
  return (
    <>
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = activeDropdown === id;
        return (
          <button
            key={id}
            onClick={() => { isActive ? scheduleClose() : open(id); }}
            onMouseEnter={() => open(id)}
            onMouseLeave={scheduleClose}
            className="relative text-sm transition-all duration-150 flex items-center gap-1"
            style={{
              color: isActive ? '#1db97a' : textColor,
              paddingBottom: 4,
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottomWidth: 2,
              borderBottomStyle: 'solid',
              borderBottomColor: isActive ? '#1db97a' : 'transparent',
            }}
          >
            {label}
            <ChevronDown
              size={10}
              style={{
                marginLeft: 2,
                transition: 'transform 200ms ease',
                transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>
        );
      })}
    </>
  );
}

export function MegaDropdownPanel({
  activeDropdown, cancelClose, scheduleClose, navHeight,
}: {
  activeDropdown: DropdownId | null;
  cancelClose: () => void;
  scheduleClose: () => void;
  navHeight: number;
}) {
  const Content = activeDropdown ? dropdownContent[activeDropdown] : null;

  return (
    <>
      {/* Subtle page overlay */}
      <div
        style={{
          position: 'fixed', top: navHeight, left: 0, right: 0, bottom: 0,
          background: activeDropdown ? 'rgba(0,0,0,0.04)' : 'transparent',
          pointerEvents: activeDropdown ? 'auto' : 'none',
          transition: 'background 150ms',
          zIndex: 998,
        }}
        onMouseEnter={scheduleClose}
      />

      {/* Hover bridge — invisible 10px zone between nav and dropdown */}
      <div
        style={{
          position: 'fixed', top: navHeight, left: 0, right: 0,
          height: 10,
          zIndex: 1001,
          pointerEvents: activeDropdown ? 'auto' : 'none',
        }}
        onMouseEnter={cancelClose}
      />

      {/* Dropdown container */}
      <div
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        style={{
          position: 'fixed',
          top: navHeight + 10,
          left: 0, right: 0,
          zIndex: 1000,
          opacity: activeDropdown ? 1 : 0,
          transform: activeDropdown ? 'translateY(0)' : 'translateY(-8px)',
          visibility: activeDropdown ? 'visible' : 'hidden',
          transition: activeDropdown
            ? 'opacity 180ms ease-out, transform 180ms ease-out, visibility 0ms'
            : 'opacity 140ms ease-in, transform 140ms ease-in, visibility 0ms 140ms',
          background: '#ffffff',
          borderTop: '2px solid #1db97a',
          borderBottom: '1px solid #e8f5f0',
          borderRadius: '0 0 16px 16px',
          boxShadow: '0 12px 40px rgba(13,110,90,0.12)',
          padding: '32px 0',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
          {Content && <Content />}
        </div>
      </div>
    </>
  );
}

// ─── Mobile Mega Menu (accordion) ───────────────────────────────────────────

export function MobileMegaMenu({
  scrollTo, textColor, borderColor,
}: {
  scrollTo: (id: string) => void;
  textColor: string;
  borderColor: string;
}) {
  const [expanded, setExpanded] = useState<DropdownId | null>(null);

  const toggle = (id: DropdownId) => setExpanded(expanded === id ? null : id);

  const mobileData: Record<DropdownId, string[]> = {
    features: [
      'Products & Categories', 'Stock Management', 'Batch & Expiry Tracking',
      'Warehouse Management', 'Sales Orders', 'Purchase Orders',
      'AI Dashboard', 'Sales Analytics', 'Role-Based Access', 'Integrations',
    ],
    solutions: [
      'Pharmacy', 'Supermarket', 'Warehouse', 'Retail',
      'Inventory Control', 'Order Management', 'Stock Transfers',
    ],
    pricing: [
      'Starter — Free', 'Business — ₹2,499/mo', 'Premium — ₹4,999/mo', 'Enterprise — Custom',
      'Extra Warehouses', 'Advanced API Access', 'Dedicated Support',
    ],
    testimonials: [
      'Case Studies', 'Video Testimonials', 'Success Stories', 'ROI Calculator',
    ],
  };

  return (
    <div>
      {NAV_ITEMS.map(({ id, label }) => (
        <div key={id}>
          <button
            onClick={() => toggle(id)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: '100%', padding: '10px 12px', border: 'none',
              background: 'transparent', cursor: 'pointer', color: textColor, fontSize: 14,
            }}
          >
            {label}
            <ChevronDown
              size={14}
              style={{
                transition: 'transform 200ms ease',
                transform: expanded === id ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </button>
          {expanded === id && (
            <div style={{ paddingLeft: 16, paddingBottom: 8 }}>
              {mobileData[id].map((link, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(id)}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '7px 12px', border: 'none', background: 'transparent',
                    fontSize: 13, color: '#4a6670', cursor: 'pointer', borderRadius: 6,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#1db97a'; e.currentTarget.style.background = 'rgba(29,185,122,0.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#4a6670'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {link}
                </button>
              ))}
            </div>
          )}
          <div style={{ height: 1, background: borderColor, opacity: 0.5, margin: '0 12px' }} />
        </div>
      ))}
    </div>
  );
}
