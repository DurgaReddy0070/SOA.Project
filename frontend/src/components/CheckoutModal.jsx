import React, { useState } from 'react';
import { ShoppingBag, CreditCard, QrCode, Building2, CheckCircle2, ShieldCheck, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { apiService } from '../services/api';

export default function CheckoutModal({ isOpen, onClose, trayItems, onRemoveItem, activeEvent, onOrderPlaced }) {
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('durga.reddy@oksbi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);

  if (!isOpen) return null;

  const guests = activeEvent?.expectedGuests || 250;

  // Calculate items subtotal
  const itemsSubtotal = trayItems.reduce((sum, item) => {
    return sum + (item.price * guests);
  }, 0);

  // Bulk discount
  let discountPercent = 0;
  if (guests >= 500) discountPercent = 15;
  else if (guests >= 250) discountPercent = 10;
  else if (guests >= 100) discountPercent = 5;

  const discountAmount = itemsSubtotal * (discountPercent / 100);
  const discountedFood = itemsSubtotal - discountAmount;
  const logisticsFee = 1500 + (guests * 5);
  const taxGst = (discountedFood + logisticsFee) * 0.05;
  const grandTotal = Math.round((discountedFood + logisticsFee + taxGst) * 100) / 100;

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (trayItems.length === 0) return;
    setIsProcessing(true);

    const orderPayload = {
      eventId: activeEvent?.id || 1,
      eventTitle: activeEvent?.title || 'KL University Tech Fest',
      organizerId: 1,
      organizerName: 'Durga Prasad Reddy',
      organizerEmail: 'organizer@eventfood.com',
      vendorId: trayItems[0]?.vendorId || 1,
      vendorName: trayItems[0]?.vendorName || 'Royal Feast Grand Caterers',
      guestCount: guests,
      totalAmount: itemsSubtotal,
      discountAmount,
      taxAmount: taxGst,
      grandTotal,
      deliveryDate: activeEvent?.eventDate || '2026-09-20',
      deliverySlot: activeEvent?.deliveryTimeSlot || '12:30 PM - 02:30 PM',
      deliveryVenue: activeEvent?.venueAddress || 'KL University Campus, Hyderabad',
      specialRequests: activeEvent?.specialInstructions || 'Ensure hot buffet setups with temperature check logs',
      items: trayItems.map(item => ({
        menuItemId: item.id,
        itemName: item.name,
        category: item.category || 'MAIN_COURSE',
        dietaryType: item.dietaryType || 'VEG',
        quantityOrGuests: guests,
        unitPrice: item.price,
        lineTotal: item.price * guests
      }))
    };

    // 1. Create order in order-service
    const createdOrder = await apiService.createOrder(orderPayload);

    // 2. Process payment in payment-service
    const paymentPayload = {
      orderId: createdOrder.id,
      orderNumber: createdOrder.orderNumber,
      organizerId: 1,
      amount: grandTotal,
      paymentMethod,
      paymentDetails: upiId
    };
    const paymentRes = await apiService.processPayment(paymentPayload);

    setIsProcessing(false);
    setPaymentSuccess(true);
    setSuccessOrder({ ...createdOrder, paymentResponse: paymentRes });
    onOrderPlaced(createdOrder);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 110,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }}>
      <div className="glass-card" style={{ maxWidth: 700, width: '100%', maxHeight: '92vh', overflowY: 'auto' }}>
        
        {paymentSuccess ? (
          <div style={{ textAlign: 'center', padding: '30px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'rgba(16,185,129,0.2)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #10b981' }}>
              <CheckCircle2 size={36} />
            </div>

            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Catering Order Confirmed!</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                Order #{successOrder?.orderNumber} • Transaction #{successOrder?.paymentResponse?.transactionId}
              </p>
            </div>

            <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 12, padding: 16, width: '100%', textAlign: 'left', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: 'var(--text-muted)' }}>Event:</span>
                <strong style={{ color: 'white' }}>{successOrder?.eventTitle}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: 'var(--text-muted)' }}>Caterer:</span>
                <span>{successOrder?.vendorName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: 'var(--text-muted)' }}>Guests:</span>
                <span>{successOrder?.guestCount} Portions</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 8, fontSize: '1rem', fontWeight: 800, color: '#38bdf8' }}>
                <span>Grand Total Paid:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>₹{successOrder?.grandTotal?.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#34d399', fontSize: '0.8rem' }}>
              <Sparkles size={14} />
              <span>Automated SMS &amp; Email alerts dispatched to Organizer &amp; Vendor Kitchen</span>
            </div>

            <button
              className="btn-primary"
              onClick={() => {
                setPaymentSuccess(false);
                onClose();
              }}
              style={{ width: '100%', marginTop: 10 }}
            >
              <span>Track Live Delivery Logistics</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div>
            <div className="glass-card-header">
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Event Food Tray &amp; Checkout</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Event: <strong style={{ color: '#818cf8' }}>{activeEvent?.title || 'Selected Event'}</strong> ({guests} Guests)
                </p>
              </div>
              <button
                onClick={onClose}
                style={{ color: 'var(--text-muted)', fontSize: '1.2rem', padding: '4px 8px' }}
              >
                ✕
              </button>
            </div>

            {trayItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                Your Event Tray is empty. Select catering packages or dishes from the vendor directory.
              </div>
            ) : (
              <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                
                {/* Tray Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 220, overflowY: 'auto' }}>
                  {trayItems.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15,23,42,0.8)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '10px 14px' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'white' }}>{item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {item.vendorName} • ₹{item.price}/person × {guests} Guests
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                          ₹{(item.price * guests).toLocaleString()}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(idx)}
                          style={{ color: '#f87171', padding: 4 }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: 14, fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Food Base Subtotal:</span>
                    <span>₹{itemsSubtotal.toLocaleString()}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399' }}>
                      <span>Bulk Tier Discount ({discountPercent}%):</span>
                      <span>-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Insulated Logistics &amp; Setup:</span>
                    <span>₹{logisticsFee.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>GST (5% Catering Rate):</span>
                    <span>₹{taxGst.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 8 }}>
                    <span>Grand Total:</span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="form-label">Select Payment Method (Simulated)</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {[
                      { id: 'UPI', label: 'UPI / QR Code', icon: QrCode },
                      { id: 'CREDIT_CARD', label: 'Credit / Debit Card', icon: CreditCard },
                      { id: 'CORPORATE_INVOICE', label: 'Corporate Invoice', icon: Building2 }
                    ].map(method => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          style={{
                            padding: 10,
                            borderRadius: 8,
                            background: paymentMethod === method.id ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${paymentMethod === method.id ? '#6366f1' : 'var(--border-subtle)'}`,
                            color: paymentMethod === method.id ? 'white' : 'var(--text-secondary)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          <Icon size={18} />
                          <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{method.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">UPI VPA ID</label>
                    <input
                      type="text"
                      className="form-input"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn-primary"
                    style={{ flex: 1 }}
                  >
                    {isProcessing ? 'Authorizing Payment & Services...' : `Pay ₹${grandTotal.toLocaleString()} & Confirm Order`}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
