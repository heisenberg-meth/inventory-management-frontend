import React from 'react';
import { 
  Building2, CheckCircle2, IndianRupee, Ticket, 
  ArrowUpRight, TrendingUp,
  Activity, Database, HardDrive, Cpu, CheckCircle
} from 'lucide-react';
import { 
  Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';

const signupData = [
  { month: 'Oct', signups: 40 },
  { month: 'Nov', signups: 52 },
  { month: 'Dec', signups: 45 },
  { month: 'Jan', signups: 68 },
  { month: 'Feb', signups: 82 },
  { month: 'Mar', signups: 96 },
];

const revenueData = [
  { month: 'Oct', revenue: 120000 },
  { month: 'Nov', revenue: 180000 },
  { month: 'Dec', revenue: 150000 },
  { month: 'Jan', revenue: 290000 },
  { month: 'Feb', revenue: 350000 },
  { month: 'Mar', revenue: 428500 },
];

const planData = [
  { name: 'Free', value: 71, color: '#9aa5b4' },
  { name: 'Pro', value: 43, color: '#0d6e5a' },
  { name: 'Enterprise', value: 28, color: '#f59e0b' },
];

const healthMetrics = [
  { label: 'API Response Time', value: '98ms', progress: 85, status: 'Excellent', statusColor: 'mint', icon: Activity },
  { label: 'Database Load', value: '42%', progress: 65, status: 'Normal', statusColor: 'mint', icon: Database },
  { label: 'Storage Used', value: '54%', progress: 54, status: 'Moderate', statusColor: 'amber', icon: HardDrive },
  { label: 'Active Sessions', value: '284', progress: 75, status: 'Normal', statusColor: 'mint', icon: Cpu },
];

const recentTenants = [
  { name: 'ABC Pharmacy', type: 'Pharmacy', plan: 'Enterprise', status: 'Active', joined: 'Today' },
  { name: 'FreshMart', type: 'Supermarket', plan: 'Pro', status: 'Active', joined: 'Yesterday' },
  { name: 'Central WH', type: 'Warehouse', plan: 'Pro', status: 'Active', joined: '2 days ago' },
  { name: 'QuickRetail', type: 'Retail', plan: 'Free', status: 'Trial', joined: '3 days ago' },
];

export const GlobalDashboard: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8" /> {/* Spacer for Topbar Title */}

      {/* ROW 1: TOP METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[16px] mb-8">
        {/* Card 1: Total Tenants */}
        <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[20px_24px] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-[44px] h-[44px] bg-[#0d6e5a] rounded-[10px] flex items-center justify-center text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-[12px] font-semibold text-[#1db97a] flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              ↑ 8 this month
            </div>
          </div>
          <div>
            <div className="text-[28px] font-[700] text-[#0d1b2a]">142</div>
            <div className="text-[12px] font-medium text-[#6b7a8d] uppercase tracking-wider">Total Tenants</div>
          </div>
        </div>

        {/* Card 2: Active Tenants */}
        <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[20px_24px] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-[44px] h-[44px] bg-[#0d6e5a] rounded-[10px] flex items-center justify-center text-white">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-[12px] font-semibold text-[#1db97a]">
              97.2% active rate
            </div>
          </div>
          <div>
            <div className="text-[28px] font-[700] text-[#0d1b2a]">138</div>
            <div className="text-[12px] font-medium text-[#6b7a8d] uppercase tracking-wider">Active Tenants</div>
          </div>
        </div>

        {/* Card 3: Monthly Revenue */}
        <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[20px_24px] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-[44px] h-[44px] bg-[#0d6e5a] rounded-[10px] flex items-center justify-center text-white">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div className="text-[12px] font-semibold text-[#1db97a] flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              ↑ 18% vs last month
            </div>
          </div>
          <div>
            <div className="text-[28px] font-[700] text-[#0d1b2a]">₹4,28,500</div>
            <div className="text-[12px] font-medium text-[#6b7a8d] uppercase tracking-wider">Monthly Revenue (MRR)</div>
          </div>
        </div>

        {/* Card 4: Support Tickets */}
        <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-[20px_24px] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-[44px] h-[44px] bg-[#f59e0b15] rounded-[10px] flex items-center justify-center text-[#f59e0b]">
              <Ticket className="w-5 h-5" />
            </div>
            <div className="text-[12px] font-semibold text-[#f59e0b]">
              4 unresolved
            </div>
          </div>
          <div>
            <div className="text-[28px] font-[700] text-[#f59e0b]">12</div>
            <div className="text-[12px] font-medium text-[#6b7a8d] uppercase tracking-wider">Open Support Tickets</div>
          </div>
        </div>
      </div>

      {/* ROW 2: CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-[16px] mb-8">
        {/* LEFT — Tenant Growth Chart */}
        <div className="lg:col-span-6 bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-6 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[16px] font-[600] text-[#0d1b2a]">Tenant Signups</h3>
            <span className="text-[12px] font-medium text-[#6b7a8d]">Last 6 months</span>
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
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f4f8" />
                <XAxis 
                   dataKey="month" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#9aa5b4', fontSize: 11, fontWeight: 500 }} 
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
            <h3 className="text-[16px] font-[600] text-[#0d1b2a]">Revenue Trend</h3>
            <span className="text-[12px] font-medium text-[#6b7a8d]">₹0 → ₹5L</span>
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
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f4f8" />
                <XAxis 
                   dataKey="month" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#9aa5b4', fontSize: 11, fontWeight: 500 }} 
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
          <div className="p-6 border-b border-[#f0f4f8] flex items-center justify-between">
            <h3 className="text-[16px] font-[600] text-[#0d1b2a]">Recently Onboarded</h3>
            <button className="text-[12px] font-[700] text-[#0d6e5a] hover:underline uppercase tracking-wider">View all →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#fcfdfe]">
                  <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">Tenant</th>
                  <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">Type</th>
                  <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">Plan</th>
                  <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">Status</th>
                  <th className="px-6 py-[14px] text-[11px] font-[700] uppercase text-[#9aa5b4] tracking-[0.08em] border-b border-[#f0f4f8]">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f9fb]">
                {recentTenants.map((tenant, idx) => (
                  <tr key={idx} className="hover:bg-[#f8fbff] transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="text-[14px] font-[700] text-[#1a2535] group-hover:text-[#0d6e5a] transition-colors">{tenant.name}</div>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-[#6b7a8d]">{tenant.type}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[13px] font-[600] ${tenant.plan === 'Enterprise' ? 'text-[#0d6e5a]' : tenant.plan === 'Pro' ? 'text-[#1db97a]' : 'text-[#6b7a8d]'}`}>
                        {tenant.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-[4px] text-[11px] font-[700] uppercase tracking-wider ${tenant.status === 'Active' ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-[#fef9c3] text-[#92400e]'}`}>
                        {tenant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[#6b7a8d] font-medium">{tenant.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT — Plan Distribution donut card */}
        <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-[16px] font-[600] text-[#0d1b2a] mb-6">Plan Distribution</h3>
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
                   <div className="text-[20px] font-[700] text-[#0d1b2a]">142</div>
                   <div className="text-[9px] font-[700] text-[#9aa5b4] uppercase">Total</div>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                {planData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[13px] font-[600] text-[#6b7a8d]">{item.name}</span>
                    </div>
                    <div className="text-right">
                       <span className="text-[13px] font-[700] text-[#0d1b2a]">{Math.round((item.value/142)*100)}%</span>
                       <div className="text-[10px] text-[#9aa5b4] font-medium uppercase">{item.value} units</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-[#f0f4f8] mt-auto">
             <div className="flex items-center justify-between text-[11px] font-[700] text-[#9aa5b4] tracking-[0.05em]">
                <span>CAPACITY: 71% OPTIMIZED</span>
                <span className="text-[#1db97a]">HEALTHY CLUSTER</span>
             </div>
          </div>
        </div>
      </div>

      {/* ROW 4: PLATFORM HEALTH */}
      <div className="bg-[var(--pa-card-bg)] border border-[var(--pa-border)] rounded-[16px] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[16px] font-[600] text-[#0d1b2a]">Platform Health</h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#dcfce7] text-[#15803d] rounded-full text-[11px] font-[700] uppercase tracking-wider">
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
                       <StatusIcon className="w-4 h-4 text-[#6b7a8d]" />
                       <span className="text-[13px] font-[600] text-[#1a2535]">{m.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-[13px] font-bold text-[#0d1b2a]">{m.value}</span>
                       <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${m.statusColor === 'mint' ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-[#fef9c3] text-[#92400e]'}`}>
                         {m.status}
                       </span>
                    </div>
                  </div>
                  <div className="h-[6px] w-full bg-[#f0f4f8] rounded-full overflow-hidden relative">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${m.statusColor === 'mint' ? 'bg-[#0d6e5a]' : 'bg-[#f59e0b]'}`}
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
