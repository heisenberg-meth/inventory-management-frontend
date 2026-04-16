import React, { useState } from 'react';
import { Settings as SettingsIcon, Building, Bell, CreditCard, Save, Check, Globe, Mail, Smartphone, User, Phone, MapPin, Lock, Edit3, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const IC = "w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mint)]";

const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({
  checked,
  onChange,
}) => (
  <button
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none ${checked ? "bg-[var(--color-mint)]" : "bg-[var(--color-surface-secondary)] border border-[var(--color-border)]"}`}
  >
    <div
      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
    />
  </button>
);

const PLANS = [
  { name: 'Starter', price: '₹999/mo', features: ['Up to 500 products', '2 users', '1 warehouse', 'Basic reports'], current: false },
  { name: 'Professional', price: '₹2,999/mo', features: ['Unlimited products', '10 users', '5 warehouses', 'Advanced reports', 'AI insights'], current: true },
  { name: 'Enterprise', price: 'Custom', features: ['Unlimited everything', 'Unlimited users', 'Multi-tenant', 'Priority support', 'Custom integrations'], current: false },
];

// Design tokens
const D = {
  mint: '#1db97a',
  mintGlow: 'rgba(29,185,122,0.12)',
  red: '#ef4444',
  purple: '#a78bfa',
};

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--color-text-muted)', marginBottom: 5 }}>
    {children}
  </div>
);

const FieldValue = ({ icon: Icon, value, extra }: { icon?: React.ElementType; value: string; extra?: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--color-text-primary)', fontWeight: 500 }}>
    {Icon && <Icon size={14} color="var(--color-text-secondary)" />}
    <span className="truncate">{value}</span>
    {extra}
  </div>
);

export const Settings: React.FC = () => {
  const { user, tenant } = useAuth();
  const [activeTab, setActiveTab] = useState('General');
  const [toast, setToast] = useState('');

  // Profile state
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({ 
    name: user?.name || '', 
    phone: user?.phone || '', 
    location: tenant?.address || '' 
  });
  const [draft, setDraft] = useState({ ...profile });

  // Update profile when user/tenant context changes
  const [prevUser, setPrevUser] = useState(user);
  const [prevTenant, setPrevTenant] = useState(tenant);
  if (user !== prevUser || tenant !== prevTenant) {
    setPrevUser(user);
    setPrevTenant(tenant);
    if (user || tenant) {
      const newProfile = {
        name: user?.name || '',
        phone: user?.phone || '',
        location: tenant?.address || ''
      };
      setProfile(newProfile);
      setDraft(newProfile);
    }
  }

  // Maintenance mode
  const [maintenance, setMaintenance] = useState(false);

  const [general, setGeneral] = useState({
    companyName: tenant?.name || 'No Business', 
    email: user?.email || '', 
    phone: user?.phone || '',
    timezone: 'IST (UTC+5:30)', 
    currency: 'INR (₹)', 
    language: 'English',
    address: tenant?.address || ''
  });

  const [notifs, setNotifs] = useState({
    lowStock: true, expiryAlert: true, newOrder: true, orderDelivered: false,
    weeklyReport: true, monthlyReport: false, emailDigest: true, smsAlerts: false
  });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const startEdit = () => { setDraft({ ...profile }); setEditing(true); };
  const cancelEdit = () => { setDraft({ ...profile }); setEditing(false); };
  const saveProfile = () => {
    setSaving(true);
    setTimeout(() => {
      setProfile({ ...draft });
      setSaving(false);
      setEditing(false);
      showToast('Profile updated successfully!');
    }, 1000);
  };

  const tabs = [
    { id: 'General', icon: SettingsIcon },
    { id: 'Company', icon: Building },
    { id: 'Notifications', icon: Bell },
    { id: 'Subscription', icon: CreditCard },
  ];

  const getInitials = (name?: string) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

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
        <div className="flex-1 space-y-4 overflow-hidden">

          {/* ── GENERAL ── */}
          {activeTab === 'General' && (
            <div className="space-y-4">

              {/* Profile Card */}
              <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-6">

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <h3 className="font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                    <User className="w-4 h-4 text-[var(--color-mint)]" /> My Profile
                  </h3>
                  {!editing ? (
                    <button
                      onClick={startEdit}
                      style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, color: 'var(--color-mint)' }}
                    >
                      <Edit3 size={13} /> Edit Profile
                    </button>
                  ) : (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={cancelEdit}
                        style={{ background: 'transparent', border: '1px solid rgba(29,185,122,0.25)', borderRadius: 8, padding: '6px 14px', fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary)', cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveProfile}
                        disabled={saving}
                        style={{ background: 'linear-gradient(135deg, #1db97a, #17a068)', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: 13, fontWeight: 600, color: 'white', cursor: 'pointer', opacity: saving ? 0.85 : 1 }}
                      >
                        {saving ? 'Saving…' : 'Save Changes'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
                  <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899, #a78bfa, #1db97a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: 'white', flexShrink: 0 }}>
                    {getInitials(user?.name)}
                  </div>
                  <div>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: '1px solid rgba(29,185,122,0.25)', borderRadius: 8, padding: '5px 12px', fontSize: 13, fontWeight: 600, color: D.mint, cursor: 'pointer', marginBottom: 4 }}>
                      <Camera size={12} /> Upload Photo
                    </button>
                    <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>JPG or PNG, max size 2MB</div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(29,185,122,0.10)', marginBottom: 20 }} />

                {/* Fields Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px 32px' }}>

                  {/* Full Name */}
                  <div>
                    <FieldLabel>Full Name</FieldLabel>
                    {editing
                      ? <input type="text" value={draft.name} onChange={e => setDraft(p => ({ ...p, name: e.target.value }))} className={IC} />
                      : <FieldValue value={profile.name} />
                    }
                  </div>

                  {/* Email */}
                  <div>
                    <FieldLabel>Email Address</FieldLabel>
                    <FieldValue
                      icon={Mail}
                      value={user?.email || ''}
                      extra={
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-mint)', background: 'rgba(29,185,122,0.12)', padding: '2px 8px', borderRadius: 20 }}>
                          ✓ Verified
                        </span>
                      }
                    />
                    {editing && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>
                        <Lock size={10} /> Email cannot be changed here
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <FieldLabel>Phone Number</FieldLabel>
                    {editing
                      ? <input type="tel" value={draft.phone} onChange={e => setDraft(p => ({ ...p, phone: e.target.value }))} className={IC} />
                      : <FieldValue icon={Phone} value={profile.phone || 'Not provided'} />
                    }
                  </div>

                  {/* Location */}
                  <div>
                    <FieldLabel>Location</FieldLabel>
                    {editing
                      ? <input type="text" value={draft.location} onChange={e => setDraft(p => ({ ...p, location: e.target.value }))} className={IC} />
                      : <FieldValue icon={MapPin} value={profile.location || 'Not provided'} />
                    }
                  </div>

                  {/* Role */}
                  <div>
                    <FieldLabel>Role</FieldLabel>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'white', background: '#ef4444', padding: '3px 10px', borderRadius: 20 }}>⊙ {user?.role}</span>
                    </div>
                    {editing && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>
                        <Lock size={10} /> Set by administrator
                      </div>
                    )}
                  </div>

                  {/* Workspace */}
                  <div>
                    <FieldLabel>Workspace</FieldLabel>
                    <FieldValue
                      icon={Building}
                      value={tenant?.name || 'Loading...'}
                      extra={
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#a78bfa', background: 'rgba(167,139,250,0.12)', padding: '2px 8px', borderRadius: 20 }}>
                          {tenant?.plan} Plan
                        </span>
                      }
                    />
                  </div>

                </div>
              </div>

              {/* Maintenance Mode Only */}
              <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                  <SettingsIcon className="w-4 h-4 text-[var(--color-mint)]" /> General Settings
                </h3>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-sm font-medium text-[var(--color-text-primary)]">Maintenance Mode</div>
                    <div className="text-xs text-[var(--color-text-muted)]">Temporarily disable the app for maintenance</div>
                  </div>
                  <Toggle checked={maintenance} onChange={() => setMaintenance(m => !m)} />
                </div>
                <div className="flex justify-end">
                  <button onClick={() => showToast('Settings saved!')} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-mint)] text-white rounded-lg font-medium text-sm hover:bg-[var(--color-mint-hover)] transition-colors">
                    <Save className="w-4 h-4" />Save Settings
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* COMPANY */}
          {activeTab === 'Company' && (
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-[var(--color-text-primary)] flex items-center gap-2"><Building className="w-4 h-4 text-[var(--color-mint)]" />Company Profile</h3>
              <div className="flex items-center gap-4 p-4 bg-[var(--color-surface-secondary)] rounded-xl">
                <div className="w-16 h-16 rounded-xl bg-[var(--color-mint)] flex items-center justify-center text-white font-bold text-xl">
                  {getInitials(tenant?.name)}
                </div>
                <div>
                  <div className="font-semibold text-[var(--color-text-primary)]">{tenant?.name}</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">{user?.email}</div>
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
                  <div className="text-sm font-semibold text-[var(--color-mint)]">Current Plan: {tenant?.plan}</div>
                  <div className="text-xs text-[var(--color-text-secondary)]">Manage your business subscription and limits</div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PLANS.map(plan => (
                  <div key={plan.name} className={`bg-[var(--color-card-bg)] border rounded-xl p-5 transition-all ${plan.name === tenant?.plan ? 'border-[var(--color-mint)] ring-2 ring-[var(--color-mint)]/30' : 'border-[var(--color-border)]'}`}>
                    {plan.name === tenant?.plan && (
                      <div className="text-xs font-semibold text-[var(--color-mint)] bg-[var(--color-mint)]/20 px-2 py-0.5 rounded-full inline-block mb-3">Current Plan</div>
                    )}
                    <div className="font-bold text-lg text-[var(--color-text-primary)]">{plan.name}</div>
                    <div className="text-2xl font-bold mt-1 mb-4" style={{ color: plan.name === tenant?.plan ? 'var(--color-mint)' : 'var(--color-text-primary)' }}>{plan.price}</div>
                    <ul className="space-y-2 text-sm text-[var(--color-text-secondary)] mb-5">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[var(--color-mint)]" />{f}</li>
                      ))}
                    </ul>
                    <button className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${plan.name === tenant?.plan ? 'bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] cursor-default' : 'bg-[var(--color-mint)] text-white hover:bg-[var(--color-mint-hover)]'}`}>
                      {plan.name === tenant?.plan ? 'Current Plan' : plan.name === 'Enterprise' ? 'Contact Sales' : 'Upgrade'}
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
