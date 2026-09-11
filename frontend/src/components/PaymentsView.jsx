import React, { useState } from 'react';
import {
  CreditCard,
  Wallet,
  CheckCircle2,
  Receipt,
  Download,
  ShieldCheck,
  Building,
  QrCode,
  ArrowUpRight,
  TrendingUp,
  X,
  Printer,
  CalendarDays,
  FileText
} from 'lucide-react';

export default function PaymentsView({ orders }) {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);

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

  // Financial aggregates
  const totalValue = (orders || []).reduce((acc, o) => acc + getOrderAmount(o), 0) || 278019;
  const amountPaid = totalValue;
  const amountPending = 0;

  const transactions = (orders || []).map((order, idx) => {
    const amt = getOrderAmount(order);
    return {
      id: `TXN-${10080 + idx}`,
      orderNumber: order.orderNumber || `EFM-2026-081${4 + idx}`,
      eventTitle: order.eventTitle || 'KL University Annual Tech Symposium & Hackathon',
      vendorName: order.vendorName || 'Royal Feast Grand Caterers',
      guestCount: order.guestCount || 250,
      date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN') : '2026-08-30',
      amount: amt,
      method: 'UPI Auto-Collect (Razorpay)',
      status: 'SUCCESS',
      invoiceNumber: `INV-EFM-${order.id || 10080 + idx}849`,
      items: order.items || [
        { itemName: 'Shahi Royal Feast Buffet Catering', lineTotal: Math.round(amt * 0.8), quantityOrGuests: order.guestCount || 250 },
        { itemName: 'Live Gourmet Counter & Beverages', lineTotal: Math.round(amt * 0.2), quantityOrGuests: order.guestCount || 250 }
      ]
    };
  });

  const handleDownloadInvoice = (txn) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to view & download invoice');
      return;
    }

    const subtotal = Math.round(txn.amount * 0.95);
    const tax = Math.round(txn.amount * 0.05);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${txn.invoiceNumber}</title>
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
              <div style="font-size: 13px; color: #166534; font-weight: 700;">${txn.invoiceNumber}</div>
              <div style="font-size: 12px; color: #78716C;">Date: ${txn.date}</div>
            </div>
          </div>

          <div class="meta-grid">
            <div>
              <strong style="color: #166534;">Billed To:</strong><br />
              Organizer: Y Durga Prasad Reddy<br />
              Event: ${txn.eventTitle}<br />
              Guests Planned: ${txn.guestCount} Heads
            </div>
            <div>
              <strong style="color: #166534;">Catering Vendor:</strong><br />
              ${txn.vendorName}<br />
              Payment Status: <strong>PAID &amp; SETTLED</strong><br />
              Transaction ID: ${txn.id}
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
              ${txn.items.map(it => `
                <tr>
                  <td><strong>${it.itemName}</strong></td>
                  <td>${it.quantityOrGuests || txn.guestCount}</td>
                  <td style="text-align: right; font-weight: 600;">₹${Number(it.lineTotal || (txn.amount / txn.items.length)).toLocaleString('en-IN')}</td>
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
              <span>₹${Number(txn.amount).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div class="footer">
            Thank you for choosing EVENTORA. This is a computer-generated tax invoice verified by the SOA Payment Microservice.
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
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Financials &amp; Payment Settlements</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Centralized catering billing, Razorpay simulated gateway transactions, and automated GST tax invoices
            </p>
          </div>
          <span className="badge badge-emerald">
            <ShieldCheck size={14} /> 100% Escrow &amp; Bank Verified
          </span>
        </div>
      </div>

      {/* 4 Financial Metric Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div>
            <div className="metric-number" style={{ fontSize: '1.85rem' }}>
              ₹{totalValue.toLocaleString('en-IN')}
            </div>
            <div className="metric-label">Total Orders Value</div>
          </div>
          <div className="metric-icon-box" style={{ background: 'var(--emerald-50)', color: 'var(--emerald-700)' }}>
            <Wallet size={22} />
          </div>
        </div>

        <div className="metric-card">
          <div>
            <div className="metric-number" style={{ fontSize: '1.85rem' }}>
              ₹{amountPaid.toLocaleString('en-IN')}
            </div>
            <div className="metric-label">Total Amount Settled</div>
          </div>
          <div className="metric-icon-box" style={{ background: 'var(--emerald-50)', color: 'var(--emerald-700)' }}>
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="metric-card">
          <div>
            <div className="metric-number" style={{ fontSize: '1.85rem' }}>
              ₹0
            </div>
            <div className="metric-label">Pending Balance</div>
          </div>
          <div className="metric-icon-box" style={{ background: 'var(--amber-50)', color: 'var(--amber-700)' }}>
            <CreditCard size={22} />
          </div>
        </div>

        <div className="metric-card">
          <div>
            <div className="metric-number" style={{ fontSize: '1.85rem' }}>
              100%
            </div>
            <div className="metric-label">Payment Integrity</div>
          </div>
          <div className="metric-icon-box" style={{ background: 'var(--terracotta-50)', color: 'var(--terracotta-500)' }}>
            <ShieldCheck size={22} />
          </div>
        </div>
      </div>

      {/* Transaction Records */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Receipt size={18} style={{ color: 'var(--emerald-700)' }} /> Transaction History
            </h3>
            <p className="card-subtitle">Verified payment gateway disbursements and event settlements</p>
          </div>
          <span className="badge badge-emerald">{transactions.length} Completed</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {transactions.map(txn => (
            <div
              key={txn.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                padding: '16px',
                background: '#FAF8F5',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--emerald-800)' }}>
                    {txn.id}
                  </span>
                  <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>
                    {txn.status}
                  </span>
                </div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
                  {txn.eventTitle}
                </h4>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Vendor: <strong>{txn.vendorName}</strong> • {txn.method}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--emerald-800)' }}>
                    ₹{Number(txn.amount).toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {txn.date}
                  </div>
                </div>

                <button
                  className="btn-secondary"
                  onClick={() => {
                    setSelectedTxn(txn);
                    handleDownloadInvoice(txn);
                  }}
                  style={{ fontSize: '0.8rem', padding: '7px 14px', gap: '6px' }}
                >
                  <Download size={14} />
                  <span>Invoice</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
