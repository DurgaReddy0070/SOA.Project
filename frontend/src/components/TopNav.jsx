import React from 'react';
import { Search, Bell, ShoppingBag, Sparkles, User } from 'lucide-react';

export default function TopNav({ activeTab, trayCount, openCheckout, onAskAi }) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview': return { title: 'Dashboard Overview', badge: 'Smart Planning' };
      case 'events': return { title: 'My Events & Estimator', badge: 'Event Management' };
      case 'vendors': return { title: 'Catering Marketplace', badge: 'Verified Vendors' };
      case 'menu-planner': return { title: 'Interactive Menu Planner', badge: 'Custom Trays' };
      case 'orders': return { title: 'Order Tracking & Logistics', badge: 'Live Telemetry' };
      case 'payments': return { title: 'Financials & Invoicing', badge: 'Settlement' };
      case 'ai-assistant': return { title: 'AI Event Food Agent', badge: 'Ollama Grounded' };
      case 'soa-health': return { title: 'SOA Microservices Health', badge: '8 Services' };
      case 'vendor-ops': return { title: 'Vendor Kitchen Portal', badge: 'Order Fulfillment' };
      default: return { title: 'Eventora Platform', badge: 'Event Food' };
    }
  };

  const { title, badge } = getTabTitle();

  return (
    <header className="top-navbar">
      <div className="page-header-title">
        <span>{title}</span>
        {badge && <span className="page-header-badge">{badge}</span>}
      </div>

      <div className="top-nav-actions">
        {/* Global Search */}
        <div className="search-bar-box">
          <Search size={16} className="search-icon-pos" />
          <input
            type="text"
            className="search-bar-input"
            placeholder="Search events, vendors, dishes..."
          />
        </div>

        {/* AI Quick Assistant Trigger */}
        <button
          className="btn-secondary"
          onClick={onAskAi}
          style={{ padding: '8px 14px', fontSize: '0.82rem', gap: 6 }}
        >
          <Sparkles size={15} style={{ color: 'var(--amber-600)' }} />
          <span>Ask AI</span>
        </button>

        {/* Notification Bell */}
        <button className="btn-icon" title="Notifications">
          <Bell size={18} />
        </button>

        {/* Event Tray Cart */}
        {trayCount > 0 && (
          <button
            className="btn-primary"
            onClick={openCheckout}
            style={{ padding: '8px 16px', fontSize: '0.84rem' }}
          >
            <ShoppingBag size={16} />
            <span>Tray ({trayCount})</span>
          </button>
        )}

        {/* User Avatar */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
          title="Account Profile"
        >
          <User size={18} />
        </div>
      </div>
    </header>
  );
}
