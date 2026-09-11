import React, { useState } from 'react';
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Receipt,
  ShieldCheck,
  Thermometer,
  Phone,
  AlertCircle,
  Download,
  CalendarDays,
  User,
  X
} from 'lucide-react';

export default function OrderTracker({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(orders[0] || null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const getStepIndex = (status) => {
    switch (status) {
      case 'PLACED': return 0;
      case 'CONFIRMED': return 1;
      case 'PREPARING': return 2;
      case 'IN_TRANSIT':
      case 'DISPATCHED': return 3;
      case 'DELIVERED': return 4;
      default: return 1;
    }
  };

  const steps = [
    { title: 'Placed', desc: 'Order logged' },
    { title: 'Confirmed', desc: 'Vendor accepted' },
    { title: 'Preparing', desc: 'Kitchen active' },
    { title: 'Dispatched', desc: 'Van en route' },
    { title: 'Delivered', desc: 'Venue buffet setup' }
  ];

  const currentStep = selectedOrder ? getStepIndex(selectedOrder.status) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
      
      {/* Top Banner */}
      <div className="card" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Live Order Logistics &amp; Status Tracking</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Real-time temperature monitoring, kitchen dispatch status, and venue buffet arrival timeline
            </p>
          </div>
          <span className="badge badge-emerald">
            <ShieldCheck size={14} /> Cold-Chain Assured
          </span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Truck size={36} style={{ color: 'var(--text-muted)', margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>No Active Orders</h3>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Select a catering package or create a custom dish tray to initiate live logistics tracking.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', alignItems: 'start' }}>
          
          {/* Left Column: Orders List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Active Orders ({orders.length})</h3>
            </div>

            {orders.map(order => {
              const isSelected = selectedOrder?.id === order.id;
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="card"
                  style={{
                    padding: '18px',
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--emerald-700)' : 'var(--border-light)',
                    background: isSelected ? 'var(--emerald-50)' : '#FFFFFF',
                    borderLeft: `4px solid ${isSelected ? 'var(--emerald-700)' : 'transparent'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--emerald-800)' }}>
                        {order.orderNumber}
                      </span>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                        {order.eventTitle}
                      </h4>
                    </div>
                    <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                      {order.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    <span>Vendor: <strong>{order.vendorName}</strong></span>
                    <span>{order.guestCount} Guests</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', fontWeight: 800, color: 'var(--emerald-800)' }}>
                      ₹{order.grandTotal?.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      Slot: {order.deliverySlot}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Order Detailed Timeline & Telemetry */}
          {selectedOrder && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* Order Header & Invoice Button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--emerald-800)', fontWeight: 700 }}>
                    {selectedOrder.orderNumber}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2px' }}>
                    {selectedOrder.eventTitle}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Caterer: <strong>{selectedOrder.vendorName}</strong> • {selectedOrder.guestCount} Guests
                  </div>
                </div>

                <button
                  className="btn-secondary"
                  onClick={() => setShowInvoiceModal(true)}
                  style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                >
                  <Receipt size={14} />
                  <span>Invoice</span>
                </button>
              </div>

              {/* Horizontal Timeline */}
              <div>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  Delivery Progress Timeline
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', position: 'relative' }}>
                  {steps.map((step, idx) => {
                    const isDone = idx <= currentStep;
                    const isCurrent = idx === currentStep;

                    return (
                      <div key={idx} style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: isDone ? 'var(--emerald-700)' : '#EBE5DC',
                            color: isDone ? '#FFFFFF' : 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 6px auto',
                            fontSize: '0.8rem',
                            fontWeight: 700
                          }}
                        >
                          {isDone ? <CheckCircle2 size={16} /> : idx + 1}
                        </div>
                        <div style={{ fontSize: '0.78rem', fontWeight: isCurrent ? 700 : 500, color: isDone ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                          {step.title}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          {step.desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cold-Chain Telemetry & Driver Card */}
              <div style={{ background: '#FAF8F5', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      <Thermometer size={14} style={{ color: 'var(--terracotta-500)' }} /> Vehicle Temperature
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
                      {selectedOrder.vehicleTemp || '68°C (Hot Holding Active)'}
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      <Truck size={14} style={{ color: 'var(--emerald-700)' }} /> Logistics Van
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
                      {selectedOrder.vehicleNo || 'TS 09 UB 4821'}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Driver: <strong>{selectedOrder.driverName || 'Suresh Rao'}</strong>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>
                    GPS Live
                  </span>
                </div>
              </div>

              {/* Order Line Items */}
              <div>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  Prepared Menu Items
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedOrder.items?.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.82rem',
                        padding: '8px 10px',
                        background: '#FFFFFF',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 600 }}>{item.itemName}</span>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {item.quantityOrGuests} guests portion
                        </div>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        ₹{item.lineTotal?.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Settlement Box */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--emerald-50)', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--emerald-100)' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--emerald-800)', fontWeight: 700 }}>Total Order Value</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--emerald-900)' }}>
                    ₹{selectedOrder.grandTotal?.toLocaleString()}
                  </div>
                </div>
                <span className="badge badge-emerald">
                  Paid &amp; Verified
                </span>
              </div>

            </div>
          )}

        </div>
      )}

      {/* Invoice Modal */}
      {showInvoiceModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowInvoiceModal(false)}>
          <div className="modal-content" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Official Tax Invoice</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  EventFood SOA Billing &amp; Payment Service
                </p>
              </div>
              <button className="btn-icon" onClick={() => setShowInvoiceModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ background: '#FAF8F5', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '18px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '8px' }}>
                <span>Invoice No: <strong>INV-EFM-{selectedOrder.id}849</strong></span>
                <span>Date: <strong>{selectedOrder.deliveryDate}</strong></span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Billed To: <strong>{selectedOrder.organizerName}</strong> ({selectedOrder.eventTitle})
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Caterer: <strong>{selectedOrder.vendorName}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {selectedOrder.items?.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '6px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span>{item.itemName} (x{item.quantityOrGuests})</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>₹{item.lineTotal?.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '2px solid var(--border-subtle)', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>Grand Total (Inc. 5% GST):</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--emerald-800)' }}>
                ₹{selectedOrder.grandTotal?.toLocaleString()}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn-secondary" onClick={() => setShowInvoiceModal(false)}>
                Close
              </button>
              <button className="btn-primary" onClick={() => setShowInvoiceModal(false)}>
                <Download size={15} />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
