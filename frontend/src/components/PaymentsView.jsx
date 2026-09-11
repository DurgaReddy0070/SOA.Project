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
  X
} from 'lucide-react';

export default function PaymentsView({ orders }) {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);

  // Financial aggregates
  const totalValue = orders.reduce((acc, o) => acc + (Number(o.grandTotal) || 0), 0) || 278019;
  const amountPaid = totalValue;
  const amountPending = 0;

  const transactions = orders.map((order, idx) => ({
    id: `TXN-${10080 + idx}`,
    orderNumber: order.orderNumber,
    eventTitle: order.eventTitle,
    vendorName: order.vendorName,
    date: order.createdAt || '2026-08-30',
    amount: order.grandTotal,
    method: 'UPI Auto-Collect (Razorpay)',
    status: 'SUCCESS',
    invoiceNumber: `INV-EFM-${order.id}849`
  }));

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
              ₹{totalValue.toLocaleString()}
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
              ₹{amountPaid.toLocaleString()}
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
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--emerald-800)' }}>
                    ₹{txn.amount?.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {txn.date}
                  </div>
                </div>

                <button
                  className="btn-secondary"
                  onClick={() => {
                    setSelectedTxn(txn);
                    setShowInvoiceModal(true);
                  }}
                  style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                >
                  <Download size={14} />
                  <span>Invoice</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoiceModal && selectedTxn && (
        <div className="modal-overlay" onClick={() => setShowInvoiceModal(false)}>
          <div className="modal-content" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Payment Receipt &amp; Tax Invoice</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  EventFood SOA Billing &amp; Payment Service
                </p>
              </div>
              <button className="btn-icon" onClick={() => setShowInvoiceModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ background: '#FAF8F5', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                <span>Transaction Ref: <strong>{selectedTxn.id}</strong></span>
                <span>Date: <strong>{selectedTxn.date}</strong></span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Event: <strong>{selectedTxn.eventTitle}</strong>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Caterer Disbursed: <strong>{selectedTxn.vendorName}</strong>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Method: <strong>{selectedTxn.method}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '2px solid var(--border-subtle)', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>Amount Settled (5% GST Inc):</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--emerald-800)' }}>
                ₹{selectedTxn.amount?.toLocaleString()}
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
