import React, { useState } from 'react';
import {
  ChefHat,
  Truck,
  CheckCircle2,
  Clock,
  Thermometer,
  ShieldCheck,
  AlertTriangle,
  Play,
  Check,
  RotateCw
} from 'lucide-react';

export default function VendorDashboard({ orders, vendors, onOrderStatusUpdated }) {
  const [selectedVendorId, setSelectedVendorId] = useState(vendors[0]?.id || 1);

  const vendorOrders = orders.filter(o => o.vendorId === Number(selectedVendorId));
  const currentVendor = vendors.find(v => v.id === Number(selectedVendorId)) || vendors[0];

  const handleNextStatus = (order) => {
    let nextStatus = 'CONFIRMED';
    if (order.status === 'PLACED') nextStatus = 'CONFIRMED';
    else if (order.status === 'CONFIRMED') nextStatus = 'PREPARING';
    else if (order.status === 'PREPARING') nextStatus = 'IN_TRANSIT';
    else if (order.status === 'IN_TRANSIT') nextStatus = 'DELIVERED';

    onOrderStatusUpdated(order.id, nextStatus);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
      
      {/* Top Banner */}
      <div className="card" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Vendor Kitchen Operations Portal</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Kitchen order prep queue, batch ingredient scheduling, and cold-chain vehicle loading dispatch
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Active Kitchen:</span>
            <select
              value={selectedVendorId}
              onChange={(e) => setSelectedVendorId(e.target.value)}
              style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--emerald-900)' }}
            >
              {vendors.map(v => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3 Kitchen Metric Cards */}
      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="metric-card">
          <div>
            <div className="metric-number">{vendorOrders.length}</div>
            <div className="metric-label">Active Kitchen Orders</div>
          </div>
          <div className="metric-icon-box" style={{ background: 'var(--emerald-50)', color: 'var(--emerald-700)' }}>
            <ChefHat size={22} />
          </div>
        </div>

        <div className="metric-card">
          <div>
            <div className="metric-number">
              {vendorOrders.reduce((acc, o) => acc + (Number(o.guestCount) || 0), 0)}
            </div>
            <div className="metric-label">Total Guest Portions to Cook</div>
          </div>
          <div className="metric-icon-box" style={{ background: 'var(--amber-50)', color: 'var(--amber-700)' }}>
            <Clock size={22} />
          </div>
        </div>

        <div className="metric-card">
          <div>
            <div className="metric-number">100%</div>
            <div className="metric-label">Dietary Hygiene Compliance</div>
          </div>
          <div className="metric-icon-box" style={{ background: 'var(--terracotta-50)', color: 'var(--terracotta-500)' }}>
            <ShieldCheck size={22} />
          </div>
        </div>
      </div>

      {/* Orders In Fulfillment Queue */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Clock size={18} style={{ color: 'var(--emerald-700)' }} /> Kitchen Preparation Queue
            </h3>
            <p className="card-subtitle">Advance orders through preparation lifecycle steps</p>
          </div>
        </div>

        {vendorOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-muted)' }}>
            No incoming catering orders assigned to this kitchen currently.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {vendorOrders.map(order => (
              <div
                key={order.id}
                style={{
                  background: '#FAF8F5',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--emerald-800)' }}>
                      {order.orderNumber}
                    </span>
                    <span className="badge badge-emerald">
                      {order.status}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginTop: '4px' }}>
                    {order.eventTitle}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Guest Count: <strong>{order.guestCount} Heads</strong> • Delivery Slot: <strong>{order.deliverySlot}</strong>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Venue: {order.deliveryVenue}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--emerald-800)' }}>
                      ₹{order.grandTotal?.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Paid via Escrow
                    </div>
                  </div>

                  {order.status !== 'DELIVERED' ? (
                    <button
                      className="btn-primary"
                      onClick={() => handleNextStatus(order)}
                      style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                    >
                      <span>
                        {order.status === 'PLACED' ? 'Accept & Confirm' :
                         order.status === 'CONFIRMED' ? 'Start Kitchen Prep' :
                         order.status === 'PREPARING' ? 'Dispatch Delivery Van' :
                         'Mark Delivered'}
                      </span>
                      <Play size={13} />
                    </button>
                  ) : (
                    <span className="badge badge-emerald" style={{ padding: '8px 14px' }}>
                      <CheckCircle2 size={15} /> Completed &amp; Delivered
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
