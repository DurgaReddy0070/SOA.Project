import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  CalendarDays,
  MapPin,
  Clock,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  CheckCircle2,
  X,
  ArrowRight,
  Receipt,
  Sparkles
} from 'lucide-react';
import { apiService } from '../services/api';

export default function CheckoutModal({
  isOpen,
  onClose,
  trayItems,
  onRemoveItem,
  activeEvent,
  onOrderPlaced
}) {
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [specialNotes, setSpecialNotes] = useState('Ensure cold-chain temperature logger is attached to the delivery van');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const guests = Number(activeEvent?.expectedGuests) || 250;
  
  // Ensure items are available for bill breakdown
  const effectiveItems = trayItems.length > 0 ? trayItems : [
    { id: 101, name: 'Shahi Royal Event Catering Package', price: 620, vendorId: 1, vendorName: 'Royal Feast Grand Caterers', category: 'PACKAGE', dietaryType: 'MULTI_DIET' },
    { id: 102, name: 'Live Chaat & Beverage Counters', price: 120, vendorId: 1, vendorName: 'Royal Feast Grand Caterers', category: 'LIVE_COUNTER', dietaryType: 'VEG' }
  ];

  const costPerPerson = effectiveItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  const subtotal = costPerPerson * guests;
  
  // Bulk discount calculation
  let discountPercent = 0;
  if (guests >= 500) discountPercent = 15;
  else if (guests >= 250) discountPercent = 10;
  else if (guests >= 100) discountPercent = 5;

  const bulkDiscount = Math.round(subtotal * (discountPercent / 100));
  const logisticsFee = 2500;
  const gst = Math.round((subtotal - bulkDiscount + logisticsFee) * 0.05);
  const grandTotal = Math.round(subtotal - bulkDiscount + logisticsFee + gst);

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    const vendorId = effectiveItems[0]?.vendorId || 1;
    const vendorName = effectiveItems[0]?.vendorName || 'Royal Feast Grand Caterers';

    const orderPayload = {
      eventId: activeEvent?.id || 1,
      eventTitle: activeEvent?.title || 'Wedding Reception Gala',
      organizerId: 1,
      organizerName: 'Durga Prasad Reddy',
      organizerEmail: 'organizer@eventfood.com',
      vendorId: vendorId,
      vendorName: vendorName,
      guestCount: guests,
      totalAmount: subtotal,
      discountAmount: bulkDiscount,
      taxAmount: gst,
      grandTotal: grandTotal,
      deliveryDate: activeEvent?.eventDate || '2026-10-18',
      deliverySlot: activeEvent?.deliveryTimeSlot || '12:30 PM - 02:30 PM',
      deliveryVenue: activeEvent?.venueAddress || 'Grand Palace, Vijayawada',
      specialRequests: specialNotes,
      items: effectiveItems.map((item, idx) => ({
        menuItemId: item.id || 1000 + idx,
        itemName: item.name,
        category: item.category || 'MAIN_COURSE',
        dietaryType: item.dietaryType || 'VEG',
        quantityOrGuests: guests,
        unitPrice: item.price,
        lineTotal: item.price * guests
      }))
    };

    const newOrder = await apiService.createOrder(orderPayload);
    setIsSubmitting(false);
    onClose();
    onOrderPlaced(newOrder);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Confirm Catering Order &amp; Bill Breakdown</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Finalize items, delivery destination, and simulated escrow payment
            </p>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Event Destination Card */}
        <div style={{ background: '#FAF8F5', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{activeEvent?.title || 'Selected Event'}</h4>
            <span className="badge badge-emerald">{guests} Guests Planned</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CalendarDays size={13} style={{ color: 'var(--emerald-700)' }} /> {activeEvent?.eventDate || '2026-10-18'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={13} style={{ color: 'var(--amber-600)' }} /> {activeEvent?.deliveryTimeSlot || '12:30 PM - 02:30 PM'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', gridColumn: 'span 2' }}>
              <MapPin size={13} style={{ color: 'var(--terracotta-500)' }} /> {activeEvent?.venueAddress || 'Grand Palace, Vijayawada'}
            </span>
          </div>
        </div>

        {/* Selected Items Tray */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Included Menu Items ({effectiveItems.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
            {effectiveItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 12px',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    ₹{item.price}/head • Provided by {item.vendorName || 'Caterer'}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 700, color: 'var(--emerald-800)' }}>
                    ₹{(item.price * guests).toLocaleString()}
                  </span>
                  {trayItems.length > 0 && onRemoveItem && (
                    <button
                      onClick={() => onRemoveItem(idx)}
                      style={{ color: 'var(--color-danger)', padding: '4px', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Generated Bill Breakdown */}
        <div style={{ background: '#FAF8F5', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
            <span>Food Subtotal ({guests} guests x ₹{costPerPerson}/head):</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>₹{subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
            <span>Bulk Scale Tier Discount ({discountPercent}% OFF):</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--emerald-700)', fontWeight: 700 }}>-₹{bulkDiscount.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
            <span>Insulated Cold-Chain Logistics &amp; Warmers:</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>₹{logisticsFee.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '10px' }}>
            <span>GST Tax (5%):</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>₹{gst.toLocaleString()}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid var(--border-subtle)', paddingTop: '10px' }}>
            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Final Grand Total Bill</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--emerald-800)' }}>
                ₹{grandTotal.toLocaleString()}
              </div>
            </div>
            <span className="badge badge-emerald">
              Razorpay Escrow Protected
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={handleConfirmOrder}
            disabled={isSubmitting}
            style={{ padding: '10px 24px' }}
          >
            <span>{isSubmitting ? 'Processing...' : 'Confirm & Place Order'}</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </div>
  );
}
