import React, { useState, useEffect } from 'react';
import { Users, Calculator, Sparkles, PlusCircle, CheckCircle2, ShieldAlert, ArrowRight, Tag, Clock, MapPin, Layers, Calendar } from 'lucide-react';
import { apiService } from '../services/api';

export default function PlannerEstimator({ events, onEventCreated, onSelectEventForMenu }) {
  // Estimator state
  const [guestCount, setGuestCount] = useState(250);
  const [packageType, setPackageType] = useState('STANDARD_BUFFET');
  const [includeBeverages, setIncludeBeverages] = useState(true);
  const [includeLiveCounters, setIncludeLiveCounters] = useState(true);
  const [includeDessertBar, setIncludeDessertBar] = useState(true);
  const [estimateResult, setEstimateResult] = useState(null);

  // New Event Form state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('COLLEGE_FEST');
  const [eventDate, setEventDate] = useState('2026-09-20');
  const [deliverySlot, setDeliverySlot] = useState('12:30 PM - 02:30 PM');
  const [venueAddress, setVenueAddress] = useState('KL University Main Auditorium, Hyderabad');
  const [selectedDiets, setSelectedDiets] = useState(['VEG', 'NON_VEG', 'JAIN']);
  const [specialInstructions, setSpecialInstructions] = useState('Provide separate vegetarian and Jain buffet counters with heating warmers');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate cost on input changes
  useEffect(() => {
    async function calculate() {
      const res = await apiService.estimateCost({
        guestCount,
        packageType,
        includeBeverages,
        includeLiveCounters,
        includeDessertBar
      });
      setEstimateResult(res);
    }
    calculate();
  }, [guestCount, packageType, includeBeverages, includeLiveCounters, includeDessertBar]);

  const toggleDiet = (diet) => {
    if (selectedDiets.includes(diet)) {
      setSelectedDiets(selectedDiets.filter(d => d !== diet));
    } else {
      setSelectedDiets([...selectedDiets, diet]);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!eventTitle) return;
    setIsSubmitting(true);

    const newEvent = {
      title: eventTitle,
      eventType,
      organizerId: 1,
      organizerName: 'Durga Prasad Reddy',
      organizerEmail: 'organizer@eventfood.com',
      eventDate,
      deliveryTimeSlot: deliverySlot,
      venueAddress,
      city: 'Hyderabad',
      expectedGuests: guestCount,
      dietaryRequirements: selectedDiets.join(','),
      cuisinePreferences: 'Multi-Cuisine Buffet',
      estimatedBudget: estimateResult ? estimateResult.grandTotal : 150000,
      specialInstructions
    };

    const created = await apiService.createEvent(newEvent);
    onEventCreated(created);
    setIsSubmitting(false);
    setShowCreateModal(false);
    setEventTitle('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Hero Banner with Problem Statement & Objectives Context */}
      <div className="hero-banner">
        <div className="hero-glow-blob"></div>
        <div className="hero-badge-row">
          <span className="badge-pill" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#c7d2fe', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
            <Layers size={14} /> Enterprise Event Catering
          </span>
          <span className="badge-pill" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
            Bulk Order Management
          </span>
        </div>
        <h1 className="hero-title">
          Online Food &amp; Event Delivery Management System
        </h1>
        <p className="hero-desc">
          Unlike standard single-meal delivery apps, EventFood is purpose-built for large-scale event catering (weddings, corporate galas, college symposiums). It solves multi-vendor coordination, dynamic guest-count cost estimation, cold-chain temperature assurance, and centralized order tracking.
        </p>

        {/* Stats Row */}
        <div className="hero-stats-grid">
          <div className="stat-box">
            <div className="stat-value">5+</div>
            <div className="stat-label">Verified Catering Partners</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">Up to 15%</div>
            <div className="stat-label">Bulk Scale Tier Discount</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">100%</div>
            <div className="stat-label">Dietary Integrity (Veg/Jain/Halal)</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">7 Services</div>
            <div className="stat-label">Eureka Registered Microservices</div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid: Cost Estimator + Event Creator */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
        
        {/* Dynamic Guest Count Cost Estimator */}
        <div className="glass-card">
          <div className="glass-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
                <Calculator size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Guest-Count Cost Estimator</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Real-time bulk scale pricing algorithm</p>
              </div>
            </div>
            <span className="badge-pill" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#d8b4fe' }}>
              Smart Pricing Engine
            </span>
          </div>

          {/* Guest Count Slider */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="form-label" style={{ margin: 0 }}>
                Expected Guest Count
              </label>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#818cf8', fontFamily: 'var(--font-mono)' }}>
                {guestCount} Guests
              </span>
            </div>
            <input
              type="range"
              min="25"
              max="1500"
              step="25"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#6366f1', height: '6px', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>25 (Intimate Party)</span>
              <span>250 (Grand Reception)</span>
              <span>500+ (Mega Fest)</span>
              <span>1500+</span>
            </div>
          </div>

          {/* Package Selection */}
          <div className="form-group">
            <label className="form-label">Catering Package Tier</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { id: 'STANDARD_BUFFET', label: 'Standard Buffet', rate: '₹450/plate' },
                { id: 'PREMIUM_WEDDING', label: 'Royal Wedding Feast', rate: '₹750/plate' },
                { id: 'EXECUTIVE_CORPORATE', label: 'Executive Corporate', rate: '₹580/plate' },
                { id: 'HI_TEA', label: 'Hi-Tea & Snacks', rate: '₹300/plate' }
              ].map(pkg => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setPackageType(pkg.id)}
                  style={{
                    padding: '10px',
                    borderRadius: '10px',
                    textAlign: 'left',
                    background: packageType === pkg.id ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${packageType === pkg.id ? '#6366f1' : 'var(--border-subtle)'}`,
                    color: packageType === pkg.id ? 'white' : 'var(--text-secondary)'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{pkg.label}</div>
                  <div style={{ fontSize: '0.75rem', color: packageType === pkg.id ? '#a5b4fc' : 'var(--text-muted)' }}>{pkg.rate}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons Checkboxes */}
          <div className="form-group">
            <label className="form-label">Live Add-ons &amp; Counters</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={includeLiveCounters}
                  onChange={(e) => setIncludeLiveCounters(e.target.checked)}
                  style={{ accentColor: '#6366f1', width: 16, height: 16 }}
                />
                <span>Live Cooking Counters (Dosa, Chaat, Pasta) <strong style={{ color: '#cbd5e1' }}>+₹120/guest</strong></span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={includeBeverages}
                  onChange={(e) => setIncludeBeverages(e.target.checked)}
                  style={{ accentColor: '#6366f1', width: 16, height: 16 }}
                />
                <span>Welcome Mocktails &amp; Hot Beverages <strong style={{ color: '#cbd5e1' }}>+₹60/guest</strong></span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={includeDessertBar}
                  onChange={(e) => setIncludeDessertBar(e.target.checked)}
                  style={{ accentColor: '#6366f1', width: 16, height: 16 }}
                />
                <span>Artisanal Dessert &amp; Ice Cream Bar <strong style={{ color: '#cbd5e1' }}>+₹80/guest</strong></span>
              </label>
            </div>
          </div>

          {/* Estimate Breakdown Card */}
          {estimateResult && (
            <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '12px', padding: '16px', marginTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Effective Rate / Plate:</span>
                <strong style={{ color: 'white' }}>₹{estimateResult.effectiveRatePerPlate}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Food Base:</span>
                <span>₹{estimateResult.totalFoodCost.toLocaleString()}</span>
              </div>
              {estimateResult.bulkDiscountPercent > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem', color: '#34d399' }}>
                  <span>Bulk Discount ({estimateResult.bulkDiscountPercent}%):</span>
                  <span>-₹{estimateResult.bulkDiscountAmount.toLocaleString()}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Cold-Chain Logistics &amp; Warmers:</span>
                <span>₹{estimateResult.serviceAndLogisticsFee.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>GST (5% Catering):</span>
                <span>₹{estimateResult.taxGst.toLocaleString()}</span>
              </div>

              <div style={{ borderTop: '1px dashed rgba(255, 255, 255, 0.15)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Grand Total</div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                    ₹{estimateResult.grandTotal.toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge-pill badge-live" style={{ fontSize: '0.72rem' }}>
                    + {estimateResult.recommendedBufferPlates} Buffer Plates Included
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Event Profiles & Quick Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Active Events Header with Create Button */}
          <div className="glass-card">
            <div className="glass-card-header" style={{ marginBottom: 14 }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Your Registered Events</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Manage event requirements &amp; menus</p>
              </div>
              <button
                className="btn-primary"
                onClick={() => setShowCreateModal(true)}
                style={{ padding: '8px 14px', fontSize: '0.85rem' }}
              >
                <PlusCircle size={16} />
                <span>New Event</span>
              </button>
            </div>

            {/* Event Cards List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(events || []).map((ev) => (
                <div
                  key={ev.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1rem', color: 'white' }}>{ev.title}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>
                        <span><Calendar size={13} style={{ display: 'inline', marginRight: 3 }} /> {ev.eventDate}</span>
                        <span><Clock size={13} style={{ display: 'inline', marginRight: 3 }} /> {ev.deliveryTimeSlot}</span>
                        <span><Users size={13} style={{ display: 'inline', marginRight: 3 }} /> {ev.expectedGuests} Guests</span>
                      </div>
                    </div>
                    <span className="badge-pill badge-soa" style={{ fontSize: '0.7rem' }}>
                      {ev.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={13} style={{ color: '#ec4899', flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.venueAddress}</span>
                  </div>

                  {/* Dietary tags */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {(ev.dietaryRequirements || 'VEG,NON_VEG').split(',').map((tag, idx) => (
                      <span key={idx} className={`diet-badge diet-${tag.toLowerCase().replace('_', '')}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10, marginTop: 4 }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Budget: <strong style={{ color: '#38bdf8' }}>₹{ev.estimatedBudget?.toLocaleString()}</strong>
                    </div>
                    <button
                      className="btn-secondary"
                      onClick={() => onSelectEventForMenu(ev)}
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    >
                      <span>Select Menu &amp; Vendors</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Create New Event */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}>
          <div className="glass-card" style={{ maxWidth: 550, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="glass-card-header">
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Register New Event</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Microservice: event-service (Port 8082)</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{ color: 'var(--text-muted)', fontSize: '1.2rem', padding: '4px 8px' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEvent}>
              <div className="form-group">
                <label className="form-label">Event Name / Occasion</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KL University Alumni Gala & Dinner"
                  className="form-input"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Event Category</label>
                  <select
                    className="form-select"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                  >
                    <option value="COLLEGE_FEST">College Fest / Hackathon</option>
                    <option value="WEDDING">Wedding &amp; Reception</option>
                    <option value="CORPORATE">Corporate Summit</option>
                    <option value="BIRTHDAY">Birthday &amp; Social Party</option>
                    <option value="GALA">Grand Gala Banquet</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Event Date</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Delivery &amp; Setup Time Slot</label>
                <select
                  className="form-select"
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value)}
                >
                  <option value="12:00 PM - 02:00 PM">Lunch (12:00 PM - 02:00 PM)</option>
                  <option value="01:00 PM - 03:00 PM">Afternoon (01:00 PM - 03:00 PM)</option>
                  <option value="07:30 PM - 10:30 PM">Dinner (07:30 PM - 10:30 PM)</option>
                  <option value="04:00 PM - 06:30 PM">Hi-Tea (04:00 PM - 06:30 PM)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Venue &amp; Delivery Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Novotel Hitec City or Campus Hall"
                  className="form-input"
                  value={venueAddress}
                  onChange={(e) => setVenueAddress(e.target.value)}
                />
              </div>

              {/* Dietary Tags */}
              <div className="form-group">
                <label className="form-label">Dietary Preferences to Accommodate</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['VEG', 'NON_VEG', 'JAIN', 'VEGAN', 'GLUTEN_FREE'].map(diet => (
                    <button
                      key={diet}
                      type="button"
                      onClick={() => toggleDiet(diet)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        background: selectedDiets.includes(diet) ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${selectedDiets.includes(diet) ? '#6366f1' : 'var(--border-subtle)'}`,
                        color: selectedDiets.includes(diet) ? '#a5b4fc' : 'var(--text-muted)'
                      }}
                    >
                      {diet}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Special Instructions for Caterers</label>
                <textarea
                  rows="2"
                  className="form-textarea"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                ></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20 }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? 'Registering...' : 'Save & Plan Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
