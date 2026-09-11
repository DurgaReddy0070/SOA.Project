import React from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  Store,
  ChefHat,
  Truck,
  CreditCard,
  Sparkles,
  Server,
  UtensilsCrossed,
  ShieldCheck,
  UserCheck,
  ChevronDown
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, currentRole, setCurrentRole, trayCount }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'events', label: 'My Events', icon: CalendarDays },
    { id: 'vendors', label: 'Find Vendors', icon: Store },
    { id: 'menu-planner', label: 'Menu Planner', icon: ChefHat },
    { id: 'orders', label: 'Orders', icon: Truck },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Sparkles, badge: 'AI' },
    { id: 'soa-health', label: 'Service Health', icon: Server, badge: 'SOA' },
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="brand-wrapper" onClick={() => setActiveTab('overview')}>
          <div className="brand-emblem">
            <UtensilsCrossed size={20} />
          </div>
          <div>
            <div className="brand-title">EVENTORA</div>
            <div className="brand-subtitle">Smart Event Food Management</div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="sidebar-nav">
        <div className="nav-section-label">Main Menu</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={18} className="nav-icon" />
              <span>{item.label}</span>
              {item.badge && (
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '9999px',
                    backgroundColor: isActive ? 'var(--emerald-700)' : 'var(--emerald-50)',
                    color: isActive ? '#FFFFFF' : 'var(--emerald-700)',
                    border: '1px solid rgba(22, 101, 52, 0.15)'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Vendor Kitchen Portal Shortcut */}
        <div className="nav-section-label" style={{ marginTop: '16px' }}>Operations</div>
        <button
          className={`nav-item-btn ${activeTab === 'vendor-ops' ? 'active' : ''}`}
          onClick={() => setActiveTab('vendor-ops')}
        >
          <ChefHat size={18} className="nav-icon" />
          <span>Vendor Kitchen</span>
        </button>
      </div>

      {/* Bottom Profile / Role Switcher */}
      <div className="sidebar-footer">
        <div className="user-profile-card">
          <div className="user-avatar-circle">
            DP
          </div>
          <div className="user-info">
            <div className="user-name">Durga Prasad Reddy</div>
            <div className="user-role-label">
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--emerald-700)',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="ORGANIZER">Event Organizer</option>
                <option value="VENDOR">Catering Vendor</option>
                <option value="ADMIN">SOA Architect / Admin</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
