import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  Package, AlertTriangle, DollarSign, ShoppingCart, FileText, 
  UserPlus, TrendingUp, TrendingDown, Circle, X 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getDashboardStats, type DashboardKPIs } from '../data/apiService';
import { useAuth } from '../context/AuthContext';

export const HomeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardKPIs | null>(null);
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const recentSales = stats?.recentSales || [];
  const recentActivity = stats?.recentActivity || [];

  const quickActions = [
    { icon: Package, label: 'New Product', path: '/app/products', action: 'add' },
    { icon: ShoppingCart, label: 'New Order', path: '/app/orders', action: 'add' },
    { icon: FileText, label: 'New Invoice', path: '/app/invoices', action: null },
    { icon: UserPlus, label: 'New Customer', path: '/app/customers', action: null },
  ];

  const metrics = [
    { 
      icon: Package, 
      label: 'Products', 
      value: stats ? stats.totalProducts?.toLocaleString() : '...', 
      change: stats ? null : null, 
      trend: 'up',
      iconBg: 'bg-[var(--color-mint)]',
      iconColor: 'text-white',
      path: '/app/products'
    },
    { 
      icon: AlertTriangle, 
      label: 'Low Stock', 
      value: stats ? stats.lowStockCount?.toLocaleString() : '...', 
      change: stats ? null : null, 
      trend: 'down',
      iconBg: 'bg-[var(--color-warning)]',
      iconColor: 'text-white',
      path: '/app/alerts'
    },
    { 
      icon: DollarSign, 
      label: "Today's Revenue", 
      value: stats ? `₹${(stats.totalRevenue || 0).toLocaleString()}` : '...', 
      change: stats ? null : null, 
      trend: 'up',
      iconBg: 'bg-[var(--color-mint)]',
      iconColor: 'text-white',
      path: '/app/reports'
    },
    { 
      icon: ShoppingCart, 
      label: 'Today\'s Orders', 
      value: stats ? stats.totalOrders?.toLocaleString() : '...', 
      change: stats ? null : null, 
      trend: 'up',
      iconBg: 'bg-[var(--color-danger)]',
      iconColor: 'text-white',
      path: '/app/orders'
    },
  ];

  const derivedStockLevels = (stats?.stockLevels || []).map((cat, idx) => ({
    id: idx.toString(),
    category: cat.category,
    level: cat.level,
    color: ['var(--color-mint)', 'var(--color-info)', 'var(--color-warning)', 'var(--color-danger)'][idx % 4]
  }));

  const weeklySalesData = stats?.weeklySales || [];

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Hero Banner */}
      <div 
        className="rounded-xl p-6 sm:p-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f6644 0%, #1db97a 100%)' }}
      >
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">Here's what's happening with your inventory today</p>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="flex items-center justify-center sm:justify-start gap-2 bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white px-3 sm:px-4 py-2 rounded-lg transition-all font-medium text-sm active:scale-95"
                >
                  <Icon className="w-4 h-4" />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute -right-4 -bottom-8 w-24 h-24 rounded-full bg-white/5" />
      </div>

      {/* Alert Bar */}
      {!alertDismissed && stats?.lowStockCount !== undefined && stats.lowStockCount > 0 && (
        <div className="bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/30 rounded-lg px-4 py-3 flex items-start sm:items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-[var(--color-warning)] flex-shrink-0 mt-0.5 sm:mt-0" />
          <span className="text-[var(--color-warning)] font-medium text-sm flex-1">
            {stats.lowStockCount} products are running low on stock
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/app/products')}
              className="text-sm text-[var(--color-warning)] hover:underline whitespace-nowrap font-medium"
            >
              View Details
            </button>
            <button 
              onClick={() => setAlertDismissed(true)}
              className="p-1 rounded hover:bg-[var(--color-warning)]/20 transition-colors"
            >
              <X className="w-4 h-4 text-[var(--color-warning)]" />
            </button>
          </div>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <button
              key={idx}
              onClick={() => navigate(metric.path)}
              className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-4 sm:p-5 text-left hover:border-[var(--color-mint)] transition-all hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${metric.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${metric.iconColor}`} />
                </div>
                {metric.change && (
                  <div className={`flex items-center gap-1 text-xs font-medium ${metric.trend === 'up' ? 'text-[var(--color-mint)]' : 'text-[var(--color-danger)]'}`}>
                    <TrendIcon className="w-3 h-3" />
                    {metric.change}
                  </div>
                )}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-1">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                {metric.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Weekly Sales Chart */}
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)]">Weekly Sales</h3>
            <button 
              onClick={() => navigate('/app/reports')}
              className="text-xs text-[var(--color-mint)] hover:underline"
            >
              View Report →
            </button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-text-muted)" fontSize={12} />
              <YAxis stroke="var(--color-text-muted)" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-surface-secondary)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-text-primary)'
                }}
              />
              <Bar dataKey="sales" fill="var(--color-mint)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stock Levels */}
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)]">Stock Distribution</h3>
            <button 
              onClick={() => navigate('/app/stock')}
              className="text-xs text-[var(--color-mint)] hover:underline"
            >
              Manage →
            </button>
          </div>
          <div className="space-y-4">
            {derivedStockLevels.length === 0 ? (
              <div className="text-center py-8 text-[var(--color-text-muted)] text-sm">No category data available</div>
            ) : derivedStockLevels.map((stock) => (
              <div key={stock.id}>
                <div className="flex justify-between mb-2">
                  <span className="text-xs sm:text-sm text-[var(--color-text-primary)]">{stock.category}</span>
                  <span className="text-xs sm:text-sm font-medium text-[var(--color-text-secondary)]">{stock.level}%</span>
                </div>
                <div className="w-full h-2 bg-[var(--color-surface-secondary)] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${stock.level}%`, backgroundColor: stock.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Orders */}
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)]">Recent Orders</h3>
            <button 
              onClick={() => navigate('/app/orders')}
              className="text-xs text-[var(--color-mint)] hover:underline"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {loading ? (
              <div className="flex justify-center py-8"><div className="w-6 h-6 border-2 border-[var(--color-mint)] border-t-transparent rounded-full animate-spin"></div></div>
            ) : (recentSales.length === 0) ? (
              <div className="text-center py-8 text-[var(--color-text-muted)]">No recent orders</div>
            ) : recentSales.map((order) => (
              <button
                key={order.id}
                onClick={() => navigate('/app/orders')}
                className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 p-3 rounded-lg hover:bg-[var(--color-surface-secondary)] transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-[var(--color-text-primary)]">{order.id}</div>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${order.paymentStatus === 'Paid' ? 'var(--color-mint)' : 'var(--color-info)'}20`,
                      color: order.paymentStatus === 'Paid' ? 'var(--color-mint)' : 'var(--color-info)'
                    }}
                  >
                    Sales
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm font-semibold text-[var(--color-text-primary)]">₹{order.total.toLocaleString()}</div>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: order.status === 'Delivered' ? 'var(--color-mint)20' : 'var(--color-warning)20', 
                      color: order.status === 'Delivered' ? 'var(--color-mint)' : 'var(--color-warning)' 
                    }}
                  >
                    {order.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)]">Recent Activity</h3>
            <button 
              onClick={() => navigate('/app/activity')}
              className="text-xs text-[var(--color-mint)] hover:underline"
            >
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <div className="text-center py-8 text-[var(--color-text-muted)]">No recent activity</div>
            ) : recentActivity.map((activity, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  <Circle className="w-2 h-2" fill={activity.color} stroke={activity.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[var(--color-text-primary)]">{activity.action}</div>
                  <div className="text-xs text-[var(--color-text-secondary)] mt-0.5 truncate">{activity.detail}</div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
