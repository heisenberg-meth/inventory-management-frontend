import React from 'react';
import {
  Building2,
  CheckCircle2,
  IndianRupee,
  Ticket,
  Activity,
  Database,
  HardDrive,
  Cpu,
  CheckCircle,
} from "lucide-react";
import { 
  Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { getPlatformStats, type PlatformStats } from '../../data/apiService';


// PLACEHOLDERS for charts as they might not have real backend implementation yet
const signupData: { month: string; signups: number }[] = [];
const revenueData: { month: string; revenue: number }[] = [];
const planData = [
  { name: 'Free', value: 0, color: 'var(--pa-text-light-gray)' },
  { name: 'Pro', value: 0, color: 'var(--pa-teal)' },
  { name: 'Enterprise', value: 0, color: '#f59e0b' },
];
const healthMetrics = [
  { label: 'API Response Time', value: '--', progress: 0, status: 'Normal', statusColor: 'mint', icon: Activity },
  { label: 'Database Load', value: '--', progress: 0, status: 'Normal', statusColor: 'mint', icon: Database },
  { label: 'Storage Used', value: '--', progress: 0, status: 'Normal', statusColor: 'amber', icon: HardDrive },
  { label: 'Active Sessions', value: '--', progress: 0, status: 'Normal', statusColor: 'mint', icon: Cpu },
];
const recentTenants: { name: string; type: string; plan: string; status: string; joined: string }[] = [];

export const GlobalDashboard: React.FC = () => {
  const [stats, setStats] = React.useState<PlatformStats | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await getPlatformStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch platform stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8" /> {/* Spacer for Topbar Title */}

      {/* ROW 1: TOP METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[16px] mb-8">
        {/* Card 1: Total Tenants */}
        <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[20px_24px] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-[44px] h-[44px] bg-[var(--pa-teal)] rounded-[10px] flex items-center justify-center text-white">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-[28px] font-[700] text-[var(--pa-text-near-black)]">
              {loading ? '...' : stats?.totalTenants}
            </div>
            <div className="text-[12px] font-medium text-[var(--pa-text-muted)] uppercase tracking-wider">Total Tenants</div>
          </div>
        </div>

        {/* Card 2: Active Tenants */}
        <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[20px_24px] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-[44px] h-[44px] bg-[var(--pa-teal)] rounded-[10px] flex items-center justify-center text-white">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-[28px] font-[700] text-[var(--pa-text-near-black)]">
              {loading ? '...' : stats?.activeTenants}
            </div>
            <div className="text-[12px] font-medium text-[var(--pa-text-muted)] uppercase tracking-wider">Active Tenants</div>
          </div>
        </div>

        {/* Card 3: Monthly Revenue */}
        <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[20px_24px] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-[44px] h-[44px] bg-[var(--pa-teal)] rounded-[10px] flex items-center justify-center text-white">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-[28px] font-[700] text-[var(--pa-text-near-black)]">₹0</div>
            <div className="text-[12px] font-medium text-[var(--pa-text-muted)] uppercase tracking-wider">Monthly Revenue (MRR)</div>
          </div>
        </div>

        {/* Card 4: Support Tickets */}
        <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[20px_24px] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-[44px] h-[44px] bg-[var(--pa-amber)]/15 rounded-[10px] flex items-center justify-center text-[var(--pa-amber)]">
              <Ticket className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-[28px] font-[700] text-[var(--pa-amber)]">0</div>
            <div className="text-[12px] font-medium text-[var(--pa-text-muted)] uppercase tracking-wider">Open Support Tickets</div>
          </div>
        </div>
      </div>

      {/* ROW 2: CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-[16px] mb-8">
        {/* LEFT — Tenant Growth Chart */}
        <div className="lg:col-span-6 bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-6 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[16px] font-[600] text-[var(--pa-text-near-black)]">Tenant Signups</h3>
            <span className="text-[12px] font-medium text-[var(--pa-text-muted)]">Last 6 months</span>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={signupData}>
                <defs>
                  <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d6e5a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0d6e5a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--pa-border)" />
                <XAxis 
                   dataKey="month" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: 'var(--pa-text-light-gray)', fontSize: 11, fontWeight: 500 }} 
                   dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ stroke: '#0d6e5a20', strokeWidth: 2 }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="signups" 
                  stroke="#0d6e5a" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorSignups)" 
                />
                <Bar 
                   dataKey="signups" 
                   fill="#0d6e5a" 
                   radius={[4, 4, 0, 0]} 
                   barSize={24}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT — Revenue Trend Chart */}
        <div className="lg:col-span-4 bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[16px] font-[600] text-[var(--pa-text-near-black)]">Revenue Trend</h3>
            <span className="text-[12px] font-medium text-[var(--pa-text-muted)]">₹0 → ₹5L</span>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1db97a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1db97a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--pa-border)" />
                <XAxis 
                   dataKey="month" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: 'var(--pa-text-light-gray)', fontSize: 11, fontWeight: 500 }} 
                   dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area 
                   type="monotone" 
                   dataKey="revenue" 
                   stroke="#1db97a" 
                   strokeWidth={3} 
                   fillOpacity={1} 
                   fill="url(#colorRev)" 
                   dot={{ r: 4, fill: '#1db97a', strokeWidth: 2, stroke: '#fff' }}
                   activeDot={{ r: 6, fill: '#1db97a' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ROW 3: RECENT & DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-100 gap-[16px] mb-8" style={{ gridTemplateColumns: '55% 45%' }}>
        {/* LEFT — Recent Tenants table card */}
        <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] shadow-sm flex flex-col">
          <div className="p-6 border-b border-[var(--pa-border)] flex items-center justify-between">
            <h3 className="text-[16px] font-[600] text-[var(--pa-text-near-black)]">Recently Onboarded</h3>
            <button className="text-[12px] font-[700] text-[var(--pa-teal)] hover:underline uppercase tracking-wider">View all →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[var(--pa-blue-gray-bg)]">
                  <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">Tenant</th>
                  <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">Type</th>
                  <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">Plan</th>
                  <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">Status</th>
                  <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[var(--pa-text-light-gray)] tracking-[0.08em] border-b border-[var(--pa-border)]">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--pa-border)]">
                {recentTenants.map((tenant, idx) => (
                  <tr key={idx} className="hover:bg-[var(--pa-row-hover)] transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="text-[14px] font-[700] text-[var(--pa-text-near-black)] group-hover:text-[var(--pa-teal)] transition-colors">{tenant.name}</div>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[var(--pa-text-muted)]">{tenant.type}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[13px] font-[600] ${tenant.plan === 'Enterprise' ? 'text-[var(--pa-teal)]' : tenant.plan === 'Pro' ? 'text-[var(--pa-mint)]' : 'text-[var(--pa-text-muted)]'}`}>
                        {tenant.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[11px] font-[700] uppercase tracking-wider ${tenant.status === 'Active' ? 'bg-[var(--pa-badge-active-bg)] text-[var(--pa-badge-active-text)]' : 'bg-[var(--pa-badge-trial-bg)] text-[var(--pa-badge-trial-text)]'}`}>
                        {tenant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[var(--pa-text-muted)] font-medium">{tenant.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT — Plan Distribution donut card */}
        <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-[16px] font-[600] text-[var(--pa-text-near-black)] mb-6">Plan Distribution</h3>
            <div className="flex items-center gap-8 px-4">
              <div className="relative w-[140px] h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={planData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {planData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <div className="text-[20px] font-[700] text-[var(--pa-text-near-black)]">142</div>
                   <div className="text-[9px] font-[700] text-[var(--pa-text-light-gray)] uppercase">Total</div>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                {planData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[13px] font-[600] text-[var(--pa-text-muted)]">{item.name}</span>
                    </div>
                    <div className="text-right">
                       <span className="text-[13px] font-[700] text-[var(--pa-text-near-black)]">{Math.round((item.value/142)*100)}%</span>
                       <div className="text-[10px] text-[var(--pa-text-light-gray)] font-medium uppercase">{item.value} units</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-[var(--pa-border)] mt-auto">
             <div className="flex items-center justify-between text-[11px] font-[700] text-[var(--pa-text-light-gray)] tracking-[0.05em]">
                <span>CAPACITY: 71% OPTIMIZED</span>
                <span className="text-[var(--pa-mint)]">HEALTHY CLUSTER</span>
             </div>
          </div>
        </div>
      </div>

      {/* ROW 4: PLATFORM HEALTH */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[16px] font-[600] text-[var(--pa-text-near-black)]">Platform Health</h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-[var(--pa-badge-active-bg)] text-[var(--pa-badge-active-text)] rounded-full text-[11px] font-[700] uppercase tracking-wider">
            <CheckCircle className="w-3.5 h-3.5" /> All systems operational
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 px-4">
          {healthMetrics.map((m, idx) => {
            const StatusIcon = m.icon;
            return (
              <div key={idx} className="flex items-center gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                       <StatusIcon className="w-4 h-4 text-[var(--pa-text-muted)]" />
                       <span className="text-[13px] font-[600] text-[var(--pa-text-near-black)]">{m.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-[13px] font-bold text-[var(--pa-text-near-black)]">{m.value}</span>
                       <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${m.statusColor === 'mint' ? 'bg-[var(--pa-badge-active-bg)] text-[var(--pa-badge-active-text)]' : 'bg-[var(--pa-badge-trial-bg)] text-[var(--pa-badge-trial-text)]'}`}>
                         {m.status}
                       </span>
                    </div>
                  </div>
                  <div className="h-[6px] w-full bg-[var(--pa-blue-gray-bg)] rounded-full overflow-hidden relative">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${m.statusColor === 'mint' ? 'bg-[var(--pa-teal)]' : 'bg-[var(--pa-amber)]'}`}
                      style={{ width: `${m.progress}%` }} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
