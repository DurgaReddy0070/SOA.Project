import React from 'react';
import { UtensilsCrossed, Sparkles, Server, Calendar, ShoppingBag, Truck, ChefHat, ShieldCheck, UserCheck } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, currentRole, setCurrentRole, trayCount, openCheckout }) {
  return (
    <header>
      {/* Main Navbar */}
      <nav className="navbar">
        <div className="nav-wrapper">
          {/* Brand */}
          <div className="brand-logo" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('planner')}>
            <div className="brand-icon-box">
              <UtensilsCrossed size={22} />
            </div>
            <div>
              <div className="brand-title">EventFood SOA</div>
              <div className="brand-subtitle">Bulk Catering &amp; Event Food Management System</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="nav-tabs">
            <button
              className={`nav-tab-btn ${activeTab === 'planner' ? 'active' : ''}`}
              onClick={() => setActiveTab('planner')}
            >
              <Calendar size={16} />
              <span>Event Planner &amp; Estimator</span>
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'vendors' ? 'active' : ''}`}
              onClick={() => setActiveTab('vendors')}
            >
              <UtensilsCrossed size={16} />
              <span>Catering Vendors</span>
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'tracker' ? 'active' : ''}`}
              onClick={() => setActiveTab('tracker')}
            >
              <Truck size={16} />
              <span>Live Logistics Tracker</span>
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'vendor-ops' ? 'active' : ''}`}
              onClick={() => setActiveTab('vendor-ops')}
            >
              <ChefHat size={16} />
              <span>Vendor Kitchen Portal</span>
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'soa-monitor' ? 'active' : ''}`}
              onClick={() => setActiveTab('soa-monitor')}
            >
              <Server size={16} />
              <span>SOA Architecture</span>
            </button>
          </div>

          {/* Right Controls: Role Switcher & Event Tray Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div className="role-pill-box" title="Switch user role for review demonstration">
              <UserCheck size={15} style={{ color: '#818cf8' }} />
              <select
                className="role-select"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
              >
                <option value="ORGANIZER">Event Organizer (Durga)</option>
                <option value="VENDOR">Catering Vendor (Royal Feast)</option>
                <option value="ADMIN">SOA Admin (Eureka Monitor)</option>
              </select>
            </div>

            {trayCount > 0 && (
              <button
                className="btn-primary"
                onClick={openCheckout}
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                <ShoppingBag size={16} />
                <span>Tray ({trayCount})</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
