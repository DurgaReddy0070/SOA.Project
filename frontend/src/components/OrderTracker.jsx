import React, { useState } from 'react';
import { Truck, CheckCircle2, Clock, MapPin, Receipt, ShieldCheck, Thermometer, Phone, AlertCircle, Sparkles, Download } from 'lucide-react';

export default function OrderTracker({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(orders[0] || null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const getStepIndex = (status) => {
    switch (status) {
      case 'PLACED': return 0;
      case 'CONFIRMED': return 1;
      case 'PREPARING': return 2;
      case 'IN_TRANSIT': return 3;
      case 'DELIVERED': return 4;
      default: return 1;
    }
  };

  const steps = [
    { title: 'Order Placed', desc: 'Verified by system' },
    { title: 'Vendor Confirmed', desc: 'Ingredients staged' },
    { title: 'Kitchen Prep', desc: 'Cooking & thermal packing' },
    { title: 'In Transit', desc: 'Cold-chain GPS van en route' },
    { title: 'Delivered & Setup', desc: 'Venue buffet ready' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div className="glass-card" style={{ padding: '18px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Live Order Logistics &amp; Status Tracker</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Real-time monitoring of food preparation, temperature-controlled transit, and venue delivery
            </p>
          </div>
          <span className="badge-pill badge-live">
            <ShieldCheck size={14} /> Quality &amp; Cold-Chain Assured
          </span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '50px 20px' }}>
          <p style={{ color: 'var(--text-muted)' }}>No active orders placed yet. Plan an event and select catering to view live tracking.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          
          {/* Orders Selection List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#a5b4fc' }}>Active Bulk Orders</h3>
            {orders.map(order => {
              const isSelected = selectedOrder?.id === order.id;
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  style={{
                    background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'rgba(15, 23, 42, 0.6)',
                    border: `1px solid ${isSelected ? '#6366f1' : 'var(--border-subtle)'}`,
                    borderRadius: '14px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>
                        {order.orderNumber}
                      </span>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'white', marginTop: 2 }}>{order.eventTitle}</h4>
                    </div>
                    <span className="badge-pill badge-soa" style={{ fontSize: '0.72rem' }}>
                      {order.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                    <span>Vendor: <strong style={{ color: '#cbd5e1' }}>{order.vendorName}</strong></span>
                    <span>{order.guestCount} Guests</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                      ₹{order.grandTotal?.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Slot: {order.deliverySlot}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Selected Order Tracker */}
          {selectedOrder && (
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="glass-card-header" style={{ marginBottom: 0 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Order {selectedOrder.orderNumber}</h3>
                    <span className="badge-pill badge-live" style={{ fontSize: '0.7rem' }}>PAID</span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    Event: {selectedOrder.eventTitle} • Caterer: {selectedOrder.vendorName}
                  </p>
                </div>
                <button
                  className="btn-secondary"
                  onClick={() => setShowInvoiceModal(true)}
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  <Receipt size={14} />
                  <span>Invoice</span>
                </button>
              </div>

              {/* Progress Stepper */}
              <div className="order-stepper">
                <div className="stepper-line">
                  <div
                    className="stepper-line-progress"
                    style={{ width: `${(getStepIndex(selectedOrder.status) / (steps.length - 1)) * 100}%` }}
                  ></div>
                </div>

                {steps.map((step, idx) => {
                  const currentIdx = getStepIndex(selectedOrder.status);
                  const isCompleted = currentIdx > idx;
                  const isActive = currentIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`step-node ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                    >
                      <div className="step-circle">
                        {isCompleted ? <CheckCircle2 size={20} /> : idx + 1}
                      </div>
                      <div className="step-label">{step.title}</div>
                    </div>
                  );
                })}
              </div>

              {/* Live Logistics Telemetry */}
              <div style={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem', marginBottom: 12 }}>
                  <Thermometer size={16} />
                  <span>Cold-Chain &amp; Van Telemetry System</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', fontSize: '0.82rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: 10, borderRadius: 8 }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Temperature Control</div>
                    <div style={{ fontWeight: 700, color: '#34d399', marginTop: 2 }}>{selectedOrder.vehicleTemp || '70°C (Insulated Hot Pods)'}</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: 10, borderRadius: 8 }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Logistics Fleet Van</div>
                    <div style={{ fontWeight: 700, color: 'white', marginTop: 2 }}>{selectedOrder.vehicleNo || 'TS 09 UB 4821'}</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: 10, borderRadius: 8 }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Driver &amp; Logistics Lead</div>
                    <div style={{ fontWeight: 700, color: 'white', marginTop: 2 }}>{selectedOrder.driverName || 'Suresh (+91 9848011223)'}</div>
                  </div>
                </div>
              </div>

              {/* Order Items Breakdown */}
              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#cbd5e1', marginBottom: 8 }}>
                  Menu Items Included ({selectedOrder.guestCount} Portions)
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {selectedOrder.items?.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: 8, fontSize: '0.82rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className={`diet-badge diet-${item.dietaryType?.toLowerCase().replace('_', '')}`}>
                          {item.dietaryType}
                        </span>
                        <span style={{ fontWeight: 600, color: 'white' }}>{item.itemName}</span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>
                        ₹{item.unitPrice} × {item.quantityOrGuests}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Venue & Special Instructions */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
                  <MapPin size={14} style={{ color: '#ec4899' }} />
                  <span>Venue: <strong>{selectedOrder.deliveryVenue}</strong></span>
                </div>
                {selectedOrder.specialRequests && (
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontStyle: 'italic' }}>
                    Note: "{selectedOrder.specialRequests}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Digital Tax Invoice Modal */}
      {showInvoiceModal && selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}>
          <div className="glass-card" style={{ maxWidth: 650, width: '100%', background: '#0f172a', border: '1px solid rgba(255,255,255,0.15)' }}>
            <div className="glass-card-header">
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Tax Invoice &amp; Receipt</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Invoice #{`INV-EFM-${selectedOrder.id}084`}</p>
              </div>
              <button
                onClick={() => setShowInvoiceModal(false)}
                style={{ color: 'var(--text-muted)', fontSize: '1.2rem', padding: '4px 8px' }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '10px 0', fontSize: '0.84rem', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Billed To:</div>
                  <div style={{ fontWeight: 700, color: 'white' }}>{selectedOrder.organizerName}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{selectedOrder.organizerEmail}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Catering Provider:</div>
                  <div style={{ fontWeight: 700, color: 'white' }}>{selectedOrder.vendorName}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>Hyderabad GSTIN: 36AAAFE1234F1Z9</div>
                </div>
              </div>

              {/* Items Table */}
              <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: 12 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '6px 0' }}>Item</th>
                      <th style={{ padding: '6px 0', textAlign: 'center' }}>Guests</th>
                      <th style={{ padding: '6px 0', textAlign: 'right' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items?.map(item => (
                      <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '6px 0', color: 'white' }}>{item.itemName}</td>
                        <td style={{ padding: '6px 0', textAlign: 'center' }}>{item.quantityOrGuests}</td>
                        <td style={{ padding: '6px 0', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>₹{item.lineTotal?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Calculation breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.82rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Food Subtotal:</span>
                  <span>₹{selectedOrder.totalAmount?.toLocaleString()}</span>
                </div>
                {selectedOrder.discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399' }}>
                    <span>Bulk Scale Discount:</span>
                    <span>-₹{selectedOrder.discountAmount?.toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>GST (5% Catering Rate):</span>
                  <span>₹{selectedOrder.taxAmount?.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 8 }}>
                  <span>Grand Total Paid:</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>₹{selectedOrder.grandTotal?.toLocaleString()}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                <button
                  className="btn-secondary"
                  onClick={() => alert("Invoice PDF download simulated successfully!")}
                >
                  <Download size={14} /> Download PDF
                </button>
                <button
                  className="btn-primary"
                  onClick={() => setShowInvoiceModal(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
