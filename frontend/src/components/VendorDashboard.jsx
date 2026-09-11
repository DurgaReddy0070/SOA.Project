import React, { useState } from 'react';
import { ChefHat, CheckCircle, Clock, Truck, Utensils, DollarSign, Users, AlertCircle, Sparkles } from 'lucide-react';
import { apiService } from '../services/api';

export default function VendorDashboard({ orders, vendors, onOrderStatusUpdated }) {
  const [selectedVendorId, setSelectedVendorId] = useState(1);
  const [updatingId, setUpdatingId] = useState(null);

  const vendor = vendors.find(v => v.id === selectedVendorId) || vendors[0];
  const vendorOrders = orders.filter(o => o.vendorId === selectedVendorId);

  const totalRevenue = vendorOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const totalGuests = vendorOrders.reduce((sum, o) => sum + (o.guestCount || 0), 0);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    await apiService.updateOrderStatus(orderId, newStatus);
    onOrderStatusUpdated(orderId, newStatus);
    setUpdatingId(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Vendor Header */}
      <div className="glass-card" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #f59e0b, #ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <ChefHat size={26} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Vendor Kitchen Operations Hub</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Active Kitchen: <strong style={{ color: '#fbbf24' }}>{vendor?.name}</strong> • Microservice: <code style={{ color: '#a5b4fc' }}>vendor-service:8083</code>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Switch Kitchen:</span>
            <select
              className="form-select"
              value={selectedVendorId}
              onChange={(e) => setSelectedVendorId(Number(e.target.value))}
              style={{ padding: '6px 12px', fontSize: '0.85rem' }}
            >
              {vendors.map(v => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginTop: 20 }}>
          <div className="stat-box">
            <div className="stat-value" style={{ color: '#38bdf8' }}>₹{totalRevenue.toLocaleString()}</div>
            <div className="stat-label">Total Catering Revenue</div>
          </div>
          <div className="stat-box">
            <div className="stat-value" style={{ color: '#34d399' }}>{vendorOrders.length}</div>
            <div className="stat-label">Active &amp; Completed Events</div>
          </div>
          <div className="stat-box">
            <div className="stat-value" style={{ color: '#f59e0b' }}>{totalGuests}</div>
            <div className="stat-label">Total Guests Served</div>
          </div>
          <div className="stat-box">
            <div className="stat-value" style={{ color: '#a855f7' }}>{vendor?.packages?.length || 2} Packages</div>
            <div className="stat-label">Active Catering Menus</div>
          </div>
        </div>
      </div>

      {/* Incoming Orders Stream */}
      <div className="glass-card">
        <div className="glass-card-header">
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Incoming Bulk Orders Queue</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Advance order status to trigger notifications to organizers</p>
          </div>
          <span className="badge-pill badge-soa">
            Order Service (Port 8084)
          </span>
        </div>

        {vendorOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)' }}>
            No incoming orders currently assigned to this vendor.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {vendorOrders.map(order => (
              <div
                key={order.id}
                style={{
                  background: 'rgba(15,23,42,0.8)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#38bdf8', fontWeight: 700 }}>
                        {order.orderNumber}
                      </span>
                      <span className="badge-pill badge-soa" style={{ fontSize: '0.7rem' }}>
                        {order.status}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'white', marginTop: 4 }}>
                      {order.eventTitle}
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                      Organizer: <strong>{order.organizerName}</strong> ({order.organizerEmail}) • <strong>{order.guestCount} Guests</strong>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                      ₹{order.grandTotal?.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Slot: {order.deliverySlot} ({order.deliveryDate})
                    </div>
                  </div>
                </div>

                {/* Items preview */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: 8, fontSize: '0.8rem' }}>
                  <div style={{ color: 'var(--text-muted)', marginBottom: 4, fontWeight: 600 }}>Kitchen Preparation Items:</div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {order.items?.map((item, idx) => (
                      <span key={idx} style={{ color: '#cbd5e1' }}>
                        • {item.itemName} ({item.quantityOrGuests} portions)
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status action buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginRight: 6 }}>Update Fulfillment:</span>
                  
                  {order.status !== 'CONFIRMED' && order.status !== 'PREPARING' && order.status !== 'IN_TRANSIT' && order.status !== 'DELIVERED' && (
                    <button
                      className="btn-secondary"
                      disabled={updatingId === order.id}
                      onClick={() => handleStatusChange(order.id, 'CONFIRMED')}
                      style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                    >
                      Confirm Order
                    </button>
                  )}

                  {order.status !== 'PREPARING' && order.status !== 'IN_TRANSIT' && order.status !== 'DELIVERED' && (
                    <button
                      className="btn-primary"
                      disabled={updatingId === order.id}
                      onClick={() => handleStatusChange(order.id, 'PREPARING')}
                      style={{ padding: '6px 12px', fontSize: '0.78rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                    >
                      <ChefHat size={13} /> Start Kitchen Prep
                    </button>
                  )}

                  {order.status !== 'IN_TRANSIT' && order.status !== 'DELIVERED' && (
                    <button
                      className="btn-primary"
                      disabled={updatingId === order.id}
                      onClick={() => handleStatusChange(order.id, 'IN_TRANSIT')}
                      style={{ padding: '6px 12px', fontSize: '0.78rem', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}
                    >
                      <Truck size={13} /> Dispatch Fleet
                    </button>
                  )}

                  {order.status !== 'DELIVERED' && (
                    <button
                      className="btn-success"
                      disabled={updatingId === order.id}
                      onClick={() => handleStatusChange(order.id, 'DELIVERED')}
                      style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                    >
                      <CheckCircle size={13} /> Delivered &amp; Setup
                    </button>
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
