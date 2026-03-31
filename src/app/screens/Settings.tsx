import React, { useState } from 'react';
import { Settings as SettingsIcon, Building, Bell, CreditCard, Save, Check, Globe, Mail, Smartphone } from 'lucide-react';

const IC = "w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]";

const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none ${checked ? 'bg-[var(--color-mint)]' : 'bg-[var(--color-surface-secondary)] border border-[var(--color-border)]'}`}
  >
    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

const PLANS = [
  { name: 'Starter', price: '₹999/mo', features: ['Up to 500 products', '2 users', '1 warehouse', 'Basic reports'], current: false },
  { name: 'Professional', price: '₹2,999/mo', features: ['Unlimited products', '10 users', '5 warehouses', 'Advanced reports', 'AI insights'], current: true },
  { name: 'Enterprise', price: 'Custom', features: ['Unlimited everything', 'Unlimited users', 'Multi-tenant', 'Priority support', 'Custom integrations'], current: false },
];

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [toast, setToast] = useState('');
  const [general, setGeneral] = useState({
    companyName: 'Pharmacy Inc', email: 'admin@pharmacy.in', phone: '+91 22 1234 5678',
    timezone: 'IST (UTC+5:30)', currency: 'INR (₹)', language: 'English',
    address: '123, Main Street, Mumbai, MH 400001'
  });
  const [notifs, setNotifs] = useState({
    lowStock: true, expiryAlert: true, newOrder: true, orderDelivered: false,
    weeklyReport: true, monthlyReport: false, emailDigest: true, smsAlerts: false
  });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const tabs = [
    { id: 'General', icon: SettingsIcon },
    { id: 'Company', icon: Building },
    { id: 'Notifications', icon: Bell },
    { id: 'Subscription', icon: CreditCard },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-[var(--color-mint)] text-white px-4 py-3 rounded-lg shadow-xl">
          <Check className="w-4 h-4" />{toast}
        </div>
      )}

      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">Settings</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">Manage application and account settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-48 flex-shrink-0">
          <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl overflow-hidden">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left ${activeTab === tab.id ? 'bg-[var(--color-mint)] text-white' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]'}`}>
                  <Icon className="w-4 h-4" />{tab.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {/* GENERAL */}
          {activeTab === 'General' && (
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-[var(--color-text-primary)] flex items-center gap-2"><SettingsIcon className="w-4 h-4 text-[var(--color-mint)]" />General Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Timezone</label>
                  <select value={general.timezone} onChange={e => setGeneral(g => ({ ...g, timezone: e.target.value }))} className={IC}>
                    <option>IST (UTC+5:30)</option><option>UTC</option><option>EST (UTC-5)</option><option>PST (UTC-8)</option>
                  </select></div>
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Currency</label>
                  <select value={general.currency} onChange={e => setGeneral(g => ({ ...g, currency: e.target.value }))} className={IC}>
                    <option>INR (₹)</option><option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option>
                  </select></div>
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Language</label>
                  <select value={general.language} onChange={e => setGeneral(g => ({ ...g, language: e.target.value }))} className={IC}>
                    <option>English</option><option>Hindi</option><option>Tamil</option><option>Marathi</option>
                  </select></div>
              </div>
              <div className="space-y-3 pt-2 border-t border-[var(--color-border)]">
                {[
                  { label: 'Maintenance Mode', desc: 'Temporarily disable the app for maintenance', key: 'maintenance', value: false },
                  { label: 'Debug Mode', desc: 'Enable verbose logging for debugging', key: 'debug', value: false },
                  { label: 'Two-Factor Authentication', desc: 'Require 2FA for all admin logins', key: '2fa', value: true },
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between py-2">
                    <div>
                      <div className="text-sm font-medium text-[var(--color-text-primary)]">{item.label}</div>
                      <div className="text-xs text-[var(--color-text-muted)]">{item.desc}</div>
                    </div>
                    <Toggle checked={item.value} onChange={() => {}} />
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-2">
                <button onClick={() => showToast('Settings saved!')} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg font-medium text-sm hover:bg-[var(--color-mint-hover)] transition-colors">
                  <Save className="w-4 h-4" />Save Settings
                </button>
              </div>
            </div>
          )}

          {/* COMPANY */}
          {activeTab === 'Company' && (
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-[var(--color-text-primary)] flex items-center gap-2"><Building className="w-4 h-4 text-[var(--color-mint)]" />Company Profile</h3>
              <div className="flex items-center gap-4 p-4 bg-[var(--color-surface-secondary)] rounded-xl">
                <div className="w-16 h-16 rounded-xl bg-[var(--color-mint)] flex items-center justify-center text-white font-bold text-xl">PI</div>
                <div>
                  <div className="font-semibold text-[var(--color-text-primary)]">{general.companyName}</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">{general.email}</div>
                  <button className="text-xs text-[var(--color-mint)] hover:underline mt-1">Change Logo</button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Company Name</label>
                  <input type="text" value={general.companyName} onChange={e => setGeneral(g => ({ ...g, companyName: e.target.value }))} className={IC} /></div>
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Email</label>
                  <input type="email" value={general.email} onChange={e => setGeneral(g => ({ ...g, email: e.target.value }))} className={IC} /></div>
                <div><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Phone</label>
                  <input type="text" value={general.phone} onChange={e => setGeneral(g => ({ ...g, phone: e.target.value }))} className={IC} /></div>
                <div className="sm:col-span-2"><label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Address</label>
                  <textarea value={general.address} onChange={e => setGeneral(g => ({ ...g, address: e.target.value }))} rows={2} className={IC + ' resize-none'} /></div>
              </div>
              <div className="flex justify-end">
                <button onClick={() => showToast('Company profile saved!')} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg font-medium text-sm hover:bg-[var(--color-mint-hover)] transition-colors">
                  <Save className="w-4 h-4" />Save Profile
                </button>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'Notifications' && (
            <div className="space-y-4">
              {[
                {
                  title: 'Inventory Alerts', icon: Bell, items: [
                    { key: 'lowStock', label: 'Low Stock Alerts', desc: 'Notify when products reach reorder level' },
                    { key: 'expiryAlert', label: 'Expiry Alerts', desc: 'Notify 30 days before product expiry' },
                  ]
                },
                {
                  title: 'Order Notifications', icon: Mail, items: [
                    { key: 'newOrder', label: 'New Orders', desc: 'Notify when new orders are placed' },
                    { key: 'orderDelivered', label: 'Order Delivered', desc: 'Notify on order delivery confirmation' },
                  ]
                },
                {
                  title: 'Reports & Digest', icon: Globe, items: [
                    { key: 'weeklyReport', label: 'Weekly Reports', desc: 'Receive weekly performance report every Monday' },
                    { key: 'monthlyReport', label: 'Monthly Reports', desc: 'Receive monthly business summary' },
                  ]
                },
                {
                  title: 'Delivery Channels', icon: Smartphone, items: [
                    { key: 'emailDigest', label: 'Email Notifications', desc: 'Send notifications via email' },
                    { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Send critical alerts via SMS' },
                  ]
                },
              ].map(section => {
                const Icon = section.icon;
                return (
                  <div key={section.title} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-5">
                    <h4 className="font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[var(--color-mint)]" />{section.title}
                    </h4>
                    <div className="space-y-4">
                      {section.items.map(item => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-[var(--color-text-primary)]">{item.label}</div>
                            <div className="text-xs text-[var(--color-text-muted)]">{item.desc}</div>
                          </div>
                          <Toggle
                            checked={notifs[item.key as keyof typeof notifs]}
                            onChange={() => setNotifs(n => ({ ...n, [item.key]: !n[item.key as keyof typeof notifs] }))}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-end">
                <button onClick={() => showToast('Notification settings saved!')} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg font-medium text-sm hover:bg-[var(--color-mint-hover)] transition-colors">
                  <Save className="w-4 h-4" />Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* SUBSCRIPTION */}
          {activeTab === 'Subscription' && (
            <div className="space-y-4">
              <div className="bg-[var(--color-mint)]/10 border border-[var(--color-mint)]/30 rounded-xl p-4 flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-[var(--color-mint)]" />
                <div>
                  <div className="text-sm font-semibold text-[var(--color-mint)]">Current Plan: Professional</div>
                  <div className="text-xs text-[var(--color-text-secondary)]">Renews on April 21, 2024 · ₹2,999/month</div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PLANS.map(plan => (
                  <div key={plan.name} className={`bg-[var(--color-card-bg)] border rounded-xl p-5 transition-all ${plan.current ? 'border-[var(--color-mint)] ring-2 ring-[var(--color-mint)]/30' : 'border-[var(--color-border)]'}`}>
                    {plan.current && (
                      <div className="text-xs font-semibold text-[var(--color-mint)] bg-[var(--color-mint)]/20 px-2 py-0.5 rounded-full inline-block mb-3">Current Plan</div>
                    )}
                    <div className="font-bold text-lg text-[var(--color-text-primary)]">{plan.name}</div>
                    <div className="text-2xl font-bold mt-1 mb-4" style={{ color: plan.current ? 'var(--color-mint)' : 'var(--color-text-primary)' }}>{plan.price}</div>
                    <ul className="space-y-2 text-sm text-[var(--color-text-secondary)] mb-5">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[var(--color-mint)]" />{f}</li>
                      ))}
                    </ul>
                    <button className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${plan.current ? 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] cursor-default' : 'bg-[var(--color-mint)] text-white hover:bg-[var(--color-mint-hover)]'}`}>
                      {plan.current ? 'Current Plan' : plan.name === 'Enterprise' ? 'Contact Sales' : 'Upgrade'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
