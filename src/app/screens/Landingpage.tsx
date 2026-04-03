import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Package,
  Activity,
  ShoppingCart,
  BarChart3,
  Building2,
  Shield,
  UserPlus,
  TrendingUp,
  FileText,
  Sun,
  Moon,
  Menu,
  X,
  Check,
  Star,
  ArrowRight,
  Zap,
  Globe,
  ChevronRight,
  MapPin,
  Clock,
  Boxes,
  ScanBarcode,
  AlertTriangle,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { FaTwitter, FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Theme {
  bg: string;
  bgSecondary: string;
  bgTertiary: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  accent: string;
  primary: string;
  deep: string;
  navBg: string;
  inputBg: string;
  sectionAlt: string;
}

// ─── Theme Definitions ────────────────────────────────────────────────────────
const lightTheme: Theme = {
  bg: "#F8FAFC",
  bgSecondary: "#F1F5F9",
  bgTertiary: "#E2E8F0",
  cardBg: "#FFFFFF",
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#94A3B8",
  border: "#E2E8F0",
  accent: "#34D399",
  primary: "#0F766E",
  deep: "#022C22",
  navBg: "rgba(248,250,252,0.92)",
  inputBg: "#F1F5F9",
  sectionAlt: "#F0FDF9",
};

const darkTheme: Theme = {
  bg: "#0a1f18",
  bgSecondary: "#0d2b1f",
  bgTertiary: "#0f3326",
  cardBg: "#0f3326",
  textPrimary: "#e8f7f0",
  textSecondary: "#7ecfaa",
  textMuted: "#3d7a62",
  border: "rgba(52,211,153,0.15)",
  accent: "#34D399",
  primary: "#34D399",
  deep: "#022C22",
  navBg: "rgba(10,31,24,0.92)",
  inputBg: "#123b2d",
  sectionAlt: "#0d2b1f",
};

// ─── Dashboard Mockup Component ───────────────────────────────────────────────
function DashboardMockup({ t }: { t: Theme }) {
  const bars = [65, 80, 55, 90, 72, 88, 60, 95, 78, 85, 70, 92];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl border"
      style={{
        background: t.cardBg,
        borderColor: t.border,
        boxShadow: `0 25px 60px rgba(0,0,0,0.18), 0 0 0 1px ${t.border}`,
      }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ background: t.bgSecondary, borderColor: t.border }}
      >
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <div className="flex-1 mx-4">
          <div
            className="rounded-md px-3 py-1 text-xs text-center"
            style={{ background: t.bgTertiary, color: t.textMuted }}
          >
            app.inventoryms.com/dashboard
          </div>
        </div>
      </div>

      {/* Dashboard layout */}
      <div className="flex" style={{ minHeight: 360 }}>
        {/* Sidebar */}
        <div
          className="w-14 flex flex-col items-center gap-3 py-4 border-r"
          style={{ background: t.deep, borderColor: "rgba(52,211,153,0.1)" }}
        >
          {[LayoutDashboard, Package, Boxes, ShoppingCart, BarChart3, Users].map(
            (Icon, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: i === 0 ? "rgba(52,211,153,0.2)" : "transparent",
                }}
              >
                <Icon
                  size={16}
                  color={i === 0 ? "#34D399" : "rgba(52,211,153,0.4)"}
                />
              </div>
            )
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 overflow-hidden">
          {/* Stats row */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: "Products", value: "2,847", color: "#34D399" },
              { label: "Orders", value: "384", color: "#60a5fa" },
              { label: "Revenue", value: "$48.2K", color: "#a78bfa" },
              { label: "Stock Alert", value: "12", color: "#fb923c" },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-xl p-2 border"
                style={{ background: t.bgSecondary, borderColor: t.border }}
              >
                <div className="text-xs mb-1" style={{ color: t.textMuted }}>
                  {stat.label}
                </div>
                <div
                  className="text-sm font-bold"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Chart area */}
          <div
            className="rounded-xl p-3 border mb-3"
            style={{ background: t.bgSecondary, borderColor: t.border }}
          >
            <div
              className="text-xs font-medium mb-2"
              style={{ color: t.textSecondary }}
            >
              Sales Overview
            </div>
            <div className="flex items-end gap-1 h-20">
              {bars.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-sm"
                    style={{
                      height: `${(h / 100) * 70}px`,
                      background:
                        i % 3 === 0
                          ? "#34D399"
                          : i % 3 === 1
                            ? "#0F766E"
                            : "rgba(52,211,153,0.3)",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1">
              {months.map((m, i) => (
                <span key={i} className="text-xs" style={{ color: t.textMuted }}>
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-2 gap-2">
            <div
              className="rounded-xl p-2 border"
              style={{ background: t.bgSecondary, borderColor: t.border }}
            >
              <div className="text-xs font-medium mb-2" style={{ color: t.textSecondary }}>
                Recent Orders
              </div>
              {["INV-001", "INV-002", "INV-003"].map((inv, i) => (
                <div key={i} className="flex justify-between items-center py-1 border-b last:border-0" style={{ borderColor: t.border }}>
                  <span className="text-xs" style={{ color: t.textMuted }}>{inv}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: "rgba(52,211,153,0.15)", color: "#34D399" }}>
                    {["Paid", "Pending", "Shipped"][i]}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="rounded-xl p-2 border"
              style={{ background: t.bgSecondary, borderColor: t.border }}
            >
              <div className="text-xs font-medium mb-2" style={{ color: t.textSecondary }}>
                Low Stock
              </div>
              {["Laptop Pro", "iPhone Case", "USB Hub"].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-1 border-b last:border-0" style={{ borderColor: t.border }}>
                  <span className="text-xs" style={{ color: t.textMuted }}>{item}</span>
                  <span className="text-xs font-medium" style={{ color: "#fb923c" }}>
                    {[3, 7, 2][i]} left
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mini Screen Mockup ───────────────────────────────────────────────────────
function ScreenMockup({ title, t, variant }: { title: string; t: Theme; variant: number }) {
  return (
    <div
      className="rounded-xl overflow-hidden border shadow-lg"
      style={{ background: t.cardBg, borderColor: t.border }}
    >
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ background: t.bgSecondary, borderColor: t.border }}
      >
        <span className="text-xs font-medium" style={{ color: t.textSecondary }}>{title}</span>
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full" style={{ background: [t.border, t.accent, t.primary][i] }} />
          ))}
        </div>
      </div>
      <div className="p-3">
        {variant === 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              {["#34D399", "#60a5fa", "#a78bfa"].map((c, i) => (
                <div key={i} className="rounded-lg p-2" style={{ background: t.bgSecondary }}>
                  <div className="h-2 rounded mb-1" style={{ background: c, width: "60%" }} />
                  <div className="h-1.5 rounded" style={{ background: t.border }} />
                </div>
              ))}
            </div>
            <div className="h-16 rounded-lg" style={{ background: t.bgSecondary }}>
              <div className="flex items-end h-full gap-1 p-2">
                {[40, 70, 55, 85, 65, 90].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i % 2 === 0 ? "#34D399" : "#0F766E" }} />
                ))}
              </div>
            </div>
          </div>
        )}
        {variant === 1 && (
          <div className="space-y-1.5">
            <div className="flex gap-2 pb-1 border-b" style={{ borderColor: t.border }}>
              {["Name", "SKU", "Category", "Stock"].map((h, i) => (
                <div key={i} className="flex-1 text-xs font-medium" style={{ color: t.textMuted }}>{h}</div>
              ))}
            </div>
            {["Laptop Pro", "Wireless Mouse", "USB Hub"].map((item, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="flex-1 text-xs" style={{ color: t.textPrimary }}>{item}</div>
                <div className="flex-1 text-xs" style={{ color: t.textMuted }}>SKU-{100 + i}</div>
                <div className="flex-1 text-xs" style={{ color: t.textMuted }}>Electronics</div>
                <div className="flex-1 text-xs font-medium" style={{ color: i === 2 ? "#fb923c" : "#34D399" }}>{[142, 87, 3][i]}</div>
              </div>
            ))}
          </div>
        )}
        {variant === 2 && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {[{ l: "Total Items", v: "2,847", c: "#34D399" }, { l: "Warehouses", v: "5", c: "#60a5fa" }].map((s, i) => (
                <div key={i} className="rounded-lg p-2" style={{ background: t.bgSecondary }}>
                  <div className="text-xs mb-1" style={{ color: t.textMuted }}>{s.l}</div>
                  <div className="text-sm font-bold" style={{ color: s.c }}>{s.v}</div>
                </div>
              ))}
            </div>
            <div className="space-y-1">
              {["Warehouse A", "Warehouse B", "Warehouse C"].map((w, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span style={{ color: t.textMuted }}>{w}</span>
                    <span style={{ color: t.textSecondary }}>{[78, 65, 90][i]}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: t.bgSecondary }}>
                    <div className="h-full rounded-full" style={{ width: `${[78, 65, 90][i]}%`, background: i === 0 ? "#34D399" : i === 1 ? "#60a5fa" : "#a78bfa" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {variant === 3 && (
          <div className="space-y-2">
            <div className="flex items-end gap-1 h-14">
              {[55, 70, 45, 80, 60, 90, 75].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: `rgba(52,211,153,${0.3 + i * 0.1})` }} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[{ l: "Revenue", v: "$48.2K" }, { l: "Growth", v: "+24%" }, { l: "Top SKU", v: "LP-001" }, { l: "Returns", v: "1.2%" }].map((s, i) => (
                <div key={i} className="rounded-lg p-1.5" style={{ background: t.bgSecondary }}>
                  <div className="text-xs" style={{ color: t.textMuted }}>{s.l}</div>
                  <div className="text-xs font-bold" style={{ color: [s.v.includes("+") ? "#34D399" : t.textPrimary][0] }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Landing Page ────────────────────────────────────────────────────────
export function LandingPage() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeShowcase, setActiveShowcase] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const t = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    { icon: Package, title: "Product Management", desc: "Organize products with SKUs, barcodes, categories, and rich variants in one unified catalog." },
    { icon: Activity, title: "Real-time Inventory", desc: "Track stock movements in real time across all warehouses with live alerts and dashboards." },
    { icon: ShoppingCart, title: "Purchase & Sales Orders", desc: "Streamline procurement and fulfillment with end-to-end order lifecycle management." },
    { icon: BarChart3, title: "Smart Reports & Analytics", desc: "Generate in-depth reports on sales trends, stock velocity, and profitability insights." },
    { icon: Building2, title: "Multi-Warehouse Support", desc: "Manage inventory across multiple locations with inter-warehouse transfers and mapping." },
    { icon: Shield, title: "Role-Based Access Control", desc: "Control who sees what with granular permission sets, audit logs, and team management." },
  ];

  const steps = [
    { icon: UserPlus, step: "01", title: "Create Your Account", desc: "Sign up in seconds, set up your organization profile, and invite your team members." },
    { icon: Package, step: "02", title: "Add Products & Inventory", desc: "Import your product catalog via CSV or add products manually with full metadata." },
    { icon: TrendingUp, step: "03", title: "Track Sales & Stock", desc: "Process orders, update stock automatically, and get real-time visibility across all channels." },
    { icon: FileText, step: "04", title: "Generate Reports & Insights", desc: "Export detailed reports, schedule automated summaries, and make data-driven decisions." },
  ];

  const industries = [
    { title: "Retail", img: "https://images.unsplash.com/photo-1769259179770-c0de5dccf60a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", features: ["Barcode Scanning", "POS Integration", "Season Analytics"], icon: ScanBarcode, color: "#34D399" },
    { title: "Pharmacy", img: "https://images.unsplash.com/photo-1642055514517-7b52288890ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", features: ["Expiry Date Tracking", "Batch Management", "Regulatory Reports"], icon: AlertTriangle, color: "#60a5fa" },
    { title: "Supermarket", img: "https://images.unsplash.com/photo-1606824722920-4c652a70f348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", features: ["Real-time Stock Sync", "Multi-category Support", "Demand Forecasting"], icon: Boxes, color: "#a78bfa" },
    { title: "Warehouse", img: "https://images.unsplash.com/photo-1726776230751-183496c51f00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", features: ["Location Tracking", "Bin Management", "Shipment Coordination"], icon: MapPin, color: "#fb923c" },
  ];

  const showcaseTabs = ["Dashboard", "Product Management", "Inventory Overview", "Reports & Analytics"];

  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      desc: "Perfect for small businesses just getting started.",
      features: ["Up to 500 products", "1 Warehouse", "Basic reports", "Email support", "3 team members", "CSV import/export"],
      cta: "Get Started",
      highlight: false,
    },
    {
      name: "Business",
      price: "$79",
      period: "/month",
      desc: "Everything you need to scale your inventory operations.",
      features: ["Unlimited products", "5 Warehouses", "Advanced analytics", "Priority support", "20 team members", "API access", "Role-based access", "Barcode scanning"],
      cta: "Start Free Trial",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "Tailored solutions for large organizations at scale.",
      features: ["Unlimited everything", "Custom integrations", "Dedicated account manager", "SLA guarantee", "Custom onboarding", "Advanced security", "White-label option", "SSO / SAML"],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Operations Director, RetailMax",
      img: "https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
      quote: "IMS transformed how we manage our 12 retail locations. Stock discrepancies dropped by 94% within the first month. Absolutely game-changing.",
      rating: 5,
    },
    {
      name: "James Okonkwo",
      role: "CEO, PharmaCare Solutions",
      img: "https://images.unsplash.com/photo-1769071166862-8cc3a6f2ac5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
      quote: "The expiry tracking feature alone saved us thousands in compliance fines. The dashboard is clean, intuitive, and our team adopted it in days.",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Supply Chain Manager, FreshMart",
      img: "https://images.unsplash.com/photo-1768796373360-95d80c5830fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
      quote: "Managing 8 warehouses used to be a nightmare. Now I have real-time visibility into every bin location. Our fulfillment accuracy is now 99.8%.",
      rating: 5,
    },
  ];

  const footerLinks = {
    Product: ["Features", "Pricing", "Changelog", "Roadmap", "Integrations"],
    Company: ["About Us", "Careers", "Blog", "Press Kit", "Contact"],
    Resources: ["Documentation", "API Reference", "Community", "Status", "Support"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "Security"],
  };

  return (
    <div style={{ background: t.bg, color: t.textPrimary, minHeight: "100vh", fontFamily: "Inter, sans-serif", transition: "background 0.3s, color 0.3s" }}>

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? t.navBg : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid ${t.border}` : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("hero")}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0F766E, #34D399)" }}>
                <Boxes size={18} color="white" />
              </div>
              <span className="font-bold text-lg" style={{ color: t.textPrimary }}>
                IMS<span style={{ color: t.accent }}>.</span>
              </span>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {["features", "solutions", "pricing", "testimonials"].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="capitalize text-sm transition-colors hover:opacity-80"
                  style={{ color: t.textSecondary }}
                >
                  {id === "testimonials" ? "Reviews" : id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setIsDark(!isDark)}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: t.bgSecondary, color: t.textSecondary }}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                onClick={() => navigate("/login?role=tenant-admin")}
                className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
                style={{ borderColor: t.border, color: t.textPrimary, background: "transparent" }}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/portal")}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ background: "linear-gradient(135deg, #0F766E, #34D399)", color: "white", boxShadow: "0 4px 14px rgba(52,211,153,0.35)" }}
              >
                Get Started
              </button>
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center gap-2">
              <button onClick={() => setIsDark(!isDark)} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: t.bgSecondary, color: t.textSecondary }}>
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: t.bgSecondary, color: t.textSecondary }}>
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t px-4 py-4 space-y-2" style={{ background: t.navBg, borderColor: t.border }}>
            {["features", "solutions", "pricing", "testimonials"].map((id) => (
              <button key={id} onClick={() => scrollTo(id)} className="block w-full text-left px-3 py-2 rounded-lg text-sm capitalize" style={{ color: t.textSecondary }}>
                {id === "testimonials" ? "Reviews" : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button onClick={() => navigate("/login")} className="w-full py-2 rounded-lg text-sm border" style={{ borderColor: t.border, color: t.textPrimary }}>Sign In</button>
              <button onClick={() => navigate("/login")} className="w-full py-2 rounded-lg text-sm font-medium" style={{ background: "linear-gradient(135deg, #0F766E, #34D399)", color: "white" }}>Get Started</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero Section ───────────────────────────────────────────────────── */}
      <section id="hero" className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
        {/* Background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #34D399, #0F766E)" }} />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle, #0F766E, #022C22)" }} />
          {!isDark && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-5 blur-3xl rounded-full" style={{ background: "#34D399" }} />
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Eyebrow badge */}
          <div className="flex justify-center mb-6">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border"
              style={{ background: isDark ? "rgba(52,211,153,0.1)" : "#F0FDF9", borderColor: "rgba(52,211,153,0.3)", color: t.primary }}
            >
              <Zap size={14} />
              <span>Inventory Management Reimagined</span>
              <ChevronRight size={14} />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left copy */}
            <div className="text-center lg:text-left">
              <h1
                className="mb-6"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: t.textPrimary,
                }}
              >
                Smart Inventory Management{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #0F766E, #34D399)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  for Modern Businesses
                </span>
              </h1>
              <p className="mb-8 text-lg leading-relaxed" style={{ color: t.textSecondary }}>
                Manage products, stock, orders, and reports in one powerful platform.
                From small shops to enterprise warehouses — IMS scales with you.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: "linear-gradient(135deg, #0F766E, #34D399)", color: "white", boxShadow: "0 8px 24px rgba(52,211,153,0.35)" }}
                >
                  Get Started Free <ArrowRight size={16} />
                </button>
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-all"
                  style={{ borderColor: t.border, color: t.textPrimary, background: t.cardBg }}
                >
                  <Clock size={16} style={{ color: t.accent }} /> Book a Demo
                </button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {["https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?w=40", "https://images.unsplash.com/photo-1769071166862-8cc3a6f2ac5c?w=40", "https://images.unsplash.com/photo-1768796373360-95d80c5830fb?w=40"].map((src, i) => (
                    <img key={i} src={src} alt="user" className="w-8 h-8 rounded-full border-2 object-cover" style={{ borderColor: t.bg }} />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#34D399" color="#34D399" />)}
                  </div>
                  <p className="text-xs" style={{ color: t.textMuted }}>Trusted by 2,500+ businesses</p>
                </div>
              </div>
            </div>

            {/* Right mockup */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl" style={{ background: "linear-gradient(135deg, #34D399, #0F766E)" }} />
              <div className="relative">
                <DashboardMockup t={t} />
              </div>
              {/* Floating badges */}
              <div
                className="absolute -bottom-4 -left-4 flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg border"
                style={{ background: t.cardBg, borderColor: t.border }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(52,211,153,0.15)" }}>
                  <TrendingUp size={16} color="#34D399" />
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ color: "#34D399" }}>+24% Growth</div>
                  <div className="text-xs" style={{ color: t.textMuted }}>vs last month</div>
                </div>
              </div>
              <div
                className="absolute -top-4 -right-2 flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg border"
                style={{ background: t.cardBg, borderColor: t.border }}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(52,211,153,0.2)" }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: "#34D399" }} />
                </div>
                <span className="text-xs font-medium" style={{ color: t.textSecondary }}>Live Tracking Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trusted By Strip ───────────────────────────────────────────────── */}
      <section className="py-10 border-y" style={{ borderColor: t.border, background: t.bgSecondary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm mb-6" style={{ color: t.textMuted }}>TRUSTED BY LEADING BRANDS ACROSS INDUSTRIES</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {["RetailMax", "PharmaCare", "FreshMart", "LogiHub", "StockPro", "WarehouseX"].map((brand) => (
              <div key={brand} className="font-bold text-lg tracking-tight" style={{ color: t.textMuted, opacity: 0.6 }}>
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ───────────────────────────────────────────────── */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4 border" style={{ background: isDark ? "rgba(52,211,153,0.08)" : "#F0FDF9", borderColor: "rgba(52,211,153,0.25)", color: "#0F766E" }}>
              <Zap size={14} /> Everything You Need
            </div>
            <h2 className="mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: t.textPrimary }}>
              Powerful Features Built for Growth
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: t.textSecondary }}>
              From product cataloging to multi-warehouse management — every feature is designed to eliminate chaos and bring clarity to your operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: t.cardBg,
                  borderColor: t.border,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(52,211,153,0.12)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(52,211,153,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = t.border;
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, rgba(15,118,110,0.15), rgba(52,211,153,0.15))" }}
                >
                  <f.icon size={22} style={{ color: "#34D399" }} />
                </div>
                <h3 className="mb-2" style={{ fontSize: "1rem", fontWeight: 600, color: t.textPrimary }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <section
        id="solutions"
        className="py-20 lg:py-28"
        style={{ background: isDark ? t.bgSecondary : t.sectionAlt }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4 border" style={{ background: isDark ? "rgba(52,211,153,0.08)" : "#F0FDF9", borderColor: "rgba(52,211,153,0.25)", color: "#0F766E" }}>
              <Globe size={14} /> Simple Process
            </div>
            <h2 className="mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: t.textPrimary }}>
              Up and Running in Minutes
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: t.textSecondary }}>
              Our streamlined onboarding gets your inventory system running faster than you can brew a coffee.
            </p>
          </div>

          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="absolute top-10 left-0 right-0 h-0.5 hidden lg:block" style={{ background: `linear-gradient(to right, transparent, rgba(52,211,153,0.4), transparent)` }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {steps.map((step, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div
                    className="relative w-20 h-20 rounded-2xl flex items-center justify-center mb-5 z-10"
                    style={{ background: "linear-gradient(135deg, #022C22, #0F766E)", boxShadow: "0 8px 24px rgba(52,211,153,0.25)" }}
                  >
                    <step.icon size={28} color="#34D399" />
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: "#34D399", color: "#022C22" }}
                    >
                      {i + 1}
                    </div>
                  </div>
                  <div className="text-xs font-bold mb-2 tracking-wider" style={{ color: t.accent }}>STEP {step.step}</div>
                  <h3 className="mb-2" style={{ fontSize: "1rem", fontWeight: 600, color: t.textPrimary }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Industry Solutions ─────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4 border" style={{ background: isDark ? "rgba(52,211,153,0.08)" : "#F0FDF9", borderColor: "rgba(52,211,153,0.25)", color: "#0F766E" }}>
              <Building2 size={14} /> Built for Every Industry
            </div>
            <h2 className="mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: t.textPrimary }}>
              Tailored for Your Domain
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: t.textSecondary }}>
              Industry-specific features that solve the real challenges of your sector — out of the box.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                style={{ background: t.cardBg, borderColor: t.border }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={ind.img}
                    alt={ind.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(2,44,34,0.85))" }} />
                  <div
                    className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
                  >
                    <ind.icon size={12} color={ind.color} />
                    {ind.title}
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {ind.features.map((feat, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ind.color }} />
                        <span className="text-sm" style={{ color: t.textSecondary }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Showcase ───────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28" style={{ background: isDark ? t.bgSecondary : t.sectionAlt }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4 border" style={{ background: isDark ? "rgba(52,211,153,0.08)" : "#F0FDF9", borderColor: "rgba(52,211,153,0.25)", color: "#0F766E" }}>
              <LayoutDashboard size={14} /> Product Preview
            </div>
            <h2 className="mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: t.textPrimary }}>
              See It in Action
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: t.textSecondary }}>
              Explore the key screens of your inventory management platform — beautiful, intuitive, and powerful.
            </p>
          </div>

          {/* Tab bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {showcaseTabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveShowcase(i)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: activeShowcase === i ? "linear-gradient(135deg, #0F766E, #34D399)" : t.cardBg,
                  color: activeShowcase === i ? "white" : t.textSecondary,
                  border: `1px solid ${activeShowcase === i ? "transparent" : t.border}`,
                  boxShadow: activeShowcase === i ? "0 4px 14px rgba(52,211,153,0.3)" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Showcase grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {showcaseTabs.map((tab, i) => (
              <div
                key={i}
                className="cursor-pointer transition-all duration-300"
                style={{ transform: activeShowcase === i ? "scale(1.02)" : "scale(1)", opacity: activeShowcase === i ? 1 : 0.7 }}
                onClick={() => setActiveShowcase(i)}
              >
                <ScreenMockup title={tab} t={t} variant={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Section ────────────────────────────────────────────────── */}
      <section id="pricing" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4 border" style={{ background: isDark ? "rgba(52,211,153,0.08)" : "#F0FDF9", borderColor: "rgba(52,211,153,0.25)", color: "#0F766E" }}>
              <Star size={14} /> Simple Pricing
            </div>
            <h2 className="mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: t.textPrimary }}>
              Plans That Grow With You
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: t.textSecondary }}>
              No hidden fees. Cancel anytime. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div
                key={i}
                className="relative rounded-2xl border flex flex-col transition-all duration-300"
                style={{
                  background: plan.highlight ? "linear-gradient(160deg, #022C22, #0F766E)" : t.cardBg,
                  borderColor: plan.highlight ? "#34D399" : t.border,
                  boxShadow: plan.highlight ? "0 20px 60px rgba(52,211,153,0.25)" : "0 1px 3px rgba(0,0,0,0.04)",
                  transform: plan.highlight ? "scale(1.03)" : "scale(1)",
                }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold" style={{ background: "#34D399", color: "#022C22" }}>
                    Most Popular
                  </div>
                )}
                <div className="p-6 flex-1">
                  <div className="mb-4">
                    <h3 className="mb-1" style={{ fontSize: "1.1rem", fontWeight: 700, color: plan.highlight ? "white" : t.textPrimary }}>{plan.name}</h3>
                    <p className="text-sm" style={{ color: plan.highlight ? "rgba(255,255,255,0.7)" : t.textSecondary }}>{plan.desc}</p>
                  </div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span style={{ fontSize: "2.5rem", fontWeight: 800, color: plan.highlight ? "#34D399" : t.textPrimary }}>{plan.price}</span>
                    {plan.period && <span style={{ color: plan.highlight ? "rgba(255,255,255,0.6)" : t.textMuted }}>{plan.period}</span>}
                  </div>
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feat, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: plan.highlight ? "rgba(52,211,153,0.2)" : isDark ? "rgba(52,211,153,0.1)" : "#F0FDF9" }}
                        >
                          <Check size={11} color="#34D399" />
                        </div>
                        <span className="text-sm" style={{ color: plan.highlight ? "rgba(255,255,255,0.85)" : t.textSecondary }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
                    style={
                      plan.highlight
                        ? { background: "#34D399", color: "#022C22", boxShadow: "0 4px 14px rgba(52,211,153,0.4)" }
                        : { background: "transparent", color: t.textPrimary, border: `1px solid ${t.border}` }
                    }
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-20 lg:py-28" style={{ background: isDark ? t.bgSecondary : t.sectionAlt }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-4 border" style={{ background: isDark ? "rgba(52,211,153,0.08)" : "#F0FDF9", borderColor: "rgba(52,211,153,0.25)", color: "#0F766E" }}>
              <Star size={14} /> Customer Stories
            </div>
            <h2 className="mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: t.textPrimary }}>
              Loved by Operations Teams
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: t.textSecondary }}>
              See how businesses like yours transformed their inventory operations with IMS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t_, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border flex flex-col"
                style={{
                  background: t.cardBg,
                  borderColor: t.border,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t_.rating)].map((_, j) => <Star key={j} size={14} fill="#34D399" color="#34D399" />)}
                </div>
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: t.textSecondary }}>
                  "{t_.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t_.img} alt={t_.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: t.textPrimary }}>{t_.name}</div>
                    <div className="text-xs" style={{ color: t.textMuted }}>{t_.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { value: "2,500+", label: "Businesses Onboarded" },
              { value: "99.8%", label: "Fulfillment Accuracy" },
              { value: "94%", label: "Stock Error Reduction" },
              { value: "4.9/5", label: "Average Rating" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="mb-1" style={{ fontSize: "2rem", fontWeight: 800, color: "#34D399" }}>{stat.value}</div>
                <div className="text-sm" style={{ color: t.textSecondary }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #022C22 0%, #0F766E 100%)" }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "#34D399" }} />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: "#34D399" }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2
            className="mb-4"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.2,
            }}
          >
            Start managing inventory{" "}
            <span style={{ color: "#34D399" }}>smarter</span> today.
          </h2>
          <p className="mb-10 text-lg" style={{ color: "rgba(255,255,255,0.75)" }}>
            Join 2,500+ businesses already running on IMS. Free 14-day trial — no credit card required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all"
              style={{ background: "#34D399", color: "#022C22", boxShadow: "0 8px 28px rgba(52,211,153,0.4)", fontSize: "1rem" }}
            >
              Start Free Trial <ArrowRight size={18} />
            </button>
            <button
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border transition-all"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "white", background: "rgba(255,255,255,0.08)", fontSize: "1rem" }}
            >
              <Clock size={18} /> Book a Demo
            </button>
          </div>
          <p className="mt-6 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Setup takes under 5 minutes · No credit card needed · Cancel anytime
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t py-16" style={{ background: isDark ? "#030f0a" : "#0F172A", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            {/* Brand column */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0F766E, #34D399)" }}>
                  <Boxes size={18} color="white" />
                </div>
                <span className="font-bold text-lg text-white">
                  IMS<span style={{ color: "#34D399" }}>.</span>
                </span>
              </div>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                The modern inventory management platform for businesses that demand clarity, speed, and scale.
              </p>
              <div className="flex items-center gap-3">
                {[FaTwitter, FaLinkedin, FaGithub, FaFacebook].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                    style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(52,211,153,0.15)"; (e.currentTarget as HTMLAnchorElement).style.color = "#34D399"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"; }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-sm font-semibold mb-4" style={{ color: "white" }}>{section}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm transition-colors"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#34D399"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)"; }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              © 2026 IMS — Inventory Management System. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}