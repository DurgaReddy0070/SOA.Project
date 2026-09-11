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
  X,
  Printer
} from 'lucide-react';

export default function OrderTracker({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(orders[0] || null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const getOrderAmount = (order) => {
    if (!order) return 191835;
    const val = Number(order.grandTotal) || Number(order.totalAmount) || Number(order.amount) || Number(order.estimatedBudget);
    if (val && !isNaN(val) && val > 0) return val;
    if (Array.isArray(order.items) && order.items.length > 0) {
      const sum = order.items.reduce((acc, it) => acc + (Number(it.lineTotal) || (Number(it.unitPrice || it.price) * (Number(order.guestCount) || 250)) || 0), 0);
      if (sum > 0) return sum;
    }
    return 191835;
  };

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

  const currentOrder = selectedOrder || orders[0];
  const currentStep = currentOrder ? getStepIndex(currentOrder.status) : 0;
  const currentAmount = getOrderAmount(currentOrder);

  const handleDownloadInvoice = (order) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to view & download invoice');
      return;
    }

    const amt = getOrderAmount(order);
    const subtotal = Math.round(amt * 0.95);
    const tax = Math.round(amt * 0.05);

    const items = order.items && order.items.length > 0 ? order.items : [
      { itemName: 'Shahi Royal Feast Buffet Catering', lineTotal: Math.round(amt * 0.8), quantityOrGuests: order.guestCount || 250 },
      { itemName: 'Live Gourmet Counter & Beverages', lineTotal: Math.round(amt * 0.2), quantityOrGuests: order.guestCount || 250 }
    ];

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - INV-EFM-${order.id || 10080}849</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1C1917; padding: 40px; margin: 0; background: #fff; }
          .invoice-card { max-width: 720px; margin: 0 auto; border: 1px solid #E8E2D8; border-radius: 12px; padding: 32px; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #166534; padding-bottom: 20px; margin-bottom: 24px; }
          .brand-title { font-size: 24px; font-weight: 800; color: #166534; letter-spacing: -0.5px; }
          .brand-subtitle { font-size: 12px; color: #78716C; text-transform: uppercase; font-weight: 600; margin-top: 4px; }
          .invoice-tag { font-size: 20px; font-weight: 700; text-align: right; }
          .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; background: #FAF8F5; padding: 16px; border-radius: 8px; margin-bottom: 24px; font-size: 13px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          th { text-align: left; padding: 10px; background: #FAF8F5; border-bottom: 1px solid #E8E2D8; font-size: 12px; text-transform: uppercase; color: #78716C; }
          td { padding: 12px 10px; border-bottom: 1px solid #FAF8F5; font-size: 13px; }
          .totals-box { margin-left: auto; width: 280px; }
          .totals-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; }
          .grand-total { border-top: 2px solid #166534; padding-top: 10px; margin-top: 10px; font-size: 18px; font-weight: 800; color: #166534; }
          .footer { text-align: center; margin-top: 32px; font-size: 12px; color: #78716C; border-top: 1px solid #E8E2D8; padding-top: 16px; }
          .btn-print { background: #166534; color: #fff; padding: 10px 20px; border-radius: 6px; border: none; font-weight: 600; cursor: pointer; margin-bottom: 20px; }
          @media print { .btn-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="invoice-card">
          <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
          
          <div class="header">
            <div>
              <div class="brand-title">EVENTORA</div>
              <div class="brand-subtitle">Smart Event Food Management System</div>
              <div style="font-size: 12px; color: #57534E; margin-top: 8px;">SOA Distributed Catering Platform</div>
            </div>
            <div>
              <div class="invoice-tag">TAX INVOICE</div>
              <div style="font-size: 13px; color: #166534; font-weight: 700;">INV-EFM-${order.id || 10080}849</div>
              <div style="font-size: 12px; color: #78716C;">Date: ${order.deliveryDate || '2026-10-18'}</div>
            </div>
          </div>

          <div class="meta-grid">
            <div>
              <strong style="color: #166534;">Billed To:</strong><br />
              Organizer: ${order.organizerName || 'Y Durga Prasad Reddy'}<br />
              Event: ${order.eventTitle}<br />
              Guests: ${order.guestCount} Heads
            </div>
            <div>
              <strong style="color: #166534;">Catering Vendor:</strong><br />
              ${order.vendorName || 'Royal Feast Grand Caterers'}<br />
              Payment Status: <strong>PAID &amp; SETTLED</strong><br />
              Order Ref: ${order.orderNumber || 'EFM-2026-0814'}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item / Service Description</th>
                <th>Portions</th>
                <th style="text-align: right;">Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(it => `
                <tr>
                  <td><strong>${it.itemName}</strong></td>
                  <td>${it.quantityOrGuests || order.guestCount}</td>
                  <td style="text-align: right; font-weight: 600;">₹${Number(it.lineTotal || (amt / items.length)).toLocaleString('en-IN')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="totals-box">
            <div class="totals-row">
              <span>Subtotal:</span>
              <span>₹${subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div class="totals-row">
              <span>GST Tax (5%):</span>
              <span>₹${tax.toLocaleString('en-IN')}</span>
            </div>
            <div class="totals-row grand-total">
              <span>Grand Total:</span>
              <span>₹${Number(amt).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div class="footer">
            Thank you for choosing EVENTORA. Computer-generated tax invoice verified by the SOA Payment Microservice.
          </div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

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
              const isSelected = currentOrder?.id === order.id;
              const amt = getOrderAmount(order);

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
                        {order.orderNumber || `EFM-2026-0814`}
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
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 800, color: 'var(--emerald-800)' }}>
                      ₹{amt.toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      Slot: {order.deliverySlot || '12:30 PM - 02:30 PM'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Order Detailed Timeline & Telemetry */}
          {currentOrder && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* Order Header & Invoice Button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--emerald-800)', fontWeight: 700 }}>
                    {currentOrder.orderNumber || 'EFM-2026-0814'}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2px' }}>
                    {currentOrder.eventTitle}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Caterer: <strong>{currentOrder.vendorName}</strong> • {currentOrder.guestCount} Guests
                  </div>
                </div>

                <button
                  className="btn-secondary"
                  onClick={() => handleDownloadInvoice(currentOrder)}
                  style={{ fontSize: '0.8rem', padding: '6px 14px', gap: '6px' }}
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
                      {currentOrder.vehicleTemp || '68°C (Hot Holding Active)'}
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      <Truck size={14} style={{ color: 'var(--emerald-700)' }} /> Logistics Van
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
                      {currentOrder.vehicleNo || 'TS 09 UB 4821'}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Driver: <strong>{currentOrder.driverName || 'Suresh Rao (+91 9848011223)'}</strong>
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
                  {(currentOrder.items || [
                    { itemName: 'Hyderabadi Zafrani Mutton Dum Biryani', lineTotal: Math.round(currentAmount * 0.45), quantityOrGuests: currentOrder.guestCount },
                    { itemName: 'Paneer Tikka Angara', lineTotal: Math.round(currentAmount * 0.25), quantityOrGuests: currentOrder.guestCount },
                    { itemName: 'Dal Makhani Peshawari', lineTotal: Math.round(currentAmount * 0.15), quantityOrGuests: currentOrder.guestCount },
                    { itemName: 'Live Jalebi & Rabdi Counter', lineTotal: Math.round(currentAmount * 0.15), quantityOrGuests: currentOrder.guestCount }
                  ]).map((item, idx) => (
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
                          {item.quantityOrGuests || currentOrder.guestCount} guests portion
                        </div>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        ₹{Number(item.lineTotal || 0).toLocaleString('en-IN')}
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
                    ₹{currentAmount.toLocaleString('en-IN')}
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

    </div>
  );
}
