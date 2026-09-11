import React, { useState, useEffect } from 'react';
import {
  Users,
  Calculator,
  Sparkles,
  Plus,
  CheckCircle2,
  ArrowRight,
  CalendarDays,
  MapPin,
  Clock,
  Wallet,
  Tag,
  Check,
  X
} from 'lucide-react';
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
  const [eventType, setEventType] = useState('WEDDING');
  const [eventDate, setEventDate] = useState('2026-10-18');
  const [deliverySlot, setDeliverySlot] = useState('12:30 PM - 02:30 PM');
  const [venueAddress, setVenueAddress] = useState('Grand Royal Palace, Vijayawada');
  const [selectedDiets, setSelectedDiets] = useState(['VEG', 'JAIN']);
  const [specialInstructions, setSpecialInstructions] = useState('Provide separate Jain buffet counter and insulated food warmers');
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
      city: 'Vijayawada',
      expectedGuests: guestCount,
      dietaryRequirements: selectedDiets.join(','),
      cuisinePreferences: 'Traditional Andhra & Pure Veg',
      estimatedBudget: estimateResult ? estimateResult.grandTotal : 200000,
      specialInstructions
    };

    const created = await apiService.createEvent(newEvent);
    onEventCreated(created);
    setIsSubmitting(false);
    setShowCreateModal(false);
    setEventTitle('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>My Events &amp; Cost Estimator</h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            Manage active event profiles, simulate scale-tiered catering budgets, and select dishes
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
          <Plus size={16} />
          <span>Create New Event</span>
        </button>
      </div>

      {/* 2-Column Grid: Live Events List + Dynamic Cost Estimator */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '26px' }}>
        
        {/* Left Column: Events List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Your Active Events</h3>
            <span className="badge badge-emerald">{events?.length || 0} Registered</span>
          </div>

          {events?.map((evt) => (
            <div
              key={evt.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                padding: '20px',
                borderLeft: '4px solid var(--emerald-700)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.68rem', marginBottom: '6px' }}>
                    {evt.eventType}
                  </span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {evt.title}
                  </h4>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: 'var(--emerald-800)'
                  }}
                >
                  ₹{evt.estimatedBudget?.toLocaleString()}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CalendarDays size={13} style={{ color: 'var(--emerald-700)' }} />
                  <span>{evt.eventDate}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={13} style={{ color: 'var(--terracotta-500)' }} />
                  <span>{evt.expectedGuests} Guests</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={13} style={{ color: 'var(--amber-600)' }} />
                  <span>{evt.deliveryTimeSlot}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={13} style={{ color: 'var(--emerald-700)' }} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {evt.venueAddress}
                  </span>
                </div>
              </div>

              {evt.dietaryRequirements && (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {evt.dietaryRequirements.split(',').map((diet, idx) => (
                    <span
                      key={idx}
                      className={`badge ${
                        diet === 'VEG' ? 'badge-veg' :
                        diet === 'JAIN' ? 'badge-jain' :
                        diet === 'VEGAN' ? 'badge-vegan' : 'badge-nonveg'
                      }`}
                    >
                      {diet}
                    </span>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Status: <strong style={{ color: 'var(--emerald-800)' }}>{evt.status}</strong>
                </span>
                <button
                  className="btn-primary"
                  onClick={() => onSelectEventForMenu(evt)}
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                >
                  <span>Build Menu</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Dynamic Cost Estimator Engine */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card-header" style={{ marginBottom: 0 }}>
            <div>
              <h3 className="card-title">
                <Calculator size={18} style={{ color: 'var(--emerald-700)' }} /> Guest-Count Cost Estimator
              </h3>
              <p className="card-subtitle">Real-time bulk scale pricing algorithm with tier discounts</p>
            </div>
            <span className="badge badge-emerald">Smart Engine</span>
          </div>

          {/* Guest Count Slider */}
          <div style={{ background: 'var(--bg-app)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Expected Guest Count:
              </label>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--emerald-800)'
                }}
              >
                {guestCount} Guests
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="1500"
              step="10"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--emerald-700)', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>30 Intimate</span>
              <span>250 Grand</span>
              <span>500+ Mega Scale (15% OFF)</span>
            </div>
          </div>

          {/* Package Type Selector */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
              Catering Service Tier:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { id: 'STANDARD_BUFFET', label: 'Standard Banquet', rate: '₹450/head' },
                { id: 'PREMIUM_WEDDING', label: 'Royal Wedding Feast', rate: '₹750/head' },
                { id: 'EXECUTIVE_CORPORATE', label: 'Executive Corporate', rate: '₹580/head' },
                { id: 'HI_TEA', label: 'Hi-Tea & Gourmet Snacks', rate: '₹300/head' }
              ].map(pkg => (
                <div
                  key={pkg.id}
                  onClick={() => setPackageType(pkg.id)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${packageType === pkg.id ? 'var(--emerald-700)' : 'var(--border-light)'}`,
                    background: packageType === pkg.id ? 'var(--emerald-50)' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: packageType === pkg.id ? 'var(--emerald-900)' : 'var(--text-primary)' }}>
                    {pkg.label}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: packageType === pkg.id ? 'var(--emerald-700)' : 'var(--text-muted)' }}>
                    {pkg.rate}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons Checklist */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
              Curated Add-ons:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', cursor: 'pointer' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={includeLiveCounters}
                    onChange={(e) => setIncludeLiveCounters(e.target.checked)}
                    style={{ accentColor: 'var(--emerald-700)' }}
                  />
                  <span>Live Gourmet Counters (+₹120/head)</span>
                </span>
                <span style={{ color: 'var(--text-muted)' }}>Fresh Dosa/Chaat/Pasta</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', cursor: 'pointer' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={includeDessertBar}
                    onChange={(e) => setIncludeDessertBar(e.target.checked)}
                    style={{ accentColor: 'var(--emerald-700)' }}
                  />
                  <span>Artisanal Dessert &amp; Mithai Bar (+₹80/head)</span>
                </span>
                <span style={{ color: 'var(--text-muted)' }}>Rabdi/Tiramisu/Kulfi</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', cursor: 'pointer' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={includeBeverages}
                    onChange={(e) => setIncludeBeverages(e.target.checked)}
                    style={{ accentColor: 'var(--emerald-700)' }}
                  />
                  <span>Mocktail &amp; Beverage Station (+₹60/head)</span>
                </span>
                <span style={{ color: 'var(--text-muted)' }}>Welcome Drinks &amp; Tea</span>
              </label>
            </div>
          </div>

          {/* Real-time Calculation Breakdown */}
          {estimateResult && (
            <div style={{ background: '#FAF8F5', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Base Catering Rate:</span>
                <span>₹{estimateResult.effectiveRatePerPlate} / plate</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Scale Tier Discount ({estimateResult.bulkDiscountPercent}%):</span>
                <span style={{ color: 'var(--emerald-700)', fontWeight: 700 }}>-₹{estimateResult.bulkDiscountAmount?.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Logistics &amp; Insulated Transport:</span>
                <span>₹{estimateResult.serviceAndLogisticsFee?.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>GST (5%):</span>
                <span>₹{estimateResult.taxGst?.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Estimated Total</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.45rem', fontWeight: 800, color: 'var(--emerald-800)' }}>
                    ₹{estimateResult.grandTotal?.toLocaleString()}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-emerald">
                    +{estimateResult.recommendedBufferPlates} Buffer Plates
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Create New Event</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Initialize event profile in Event Microservice
                </p>
              </div>
              <button className="btn-icon" onClick={() => setShowCreateModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Priya &amp; Rahul Wedding Reception"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <option value="WEDDING">Royal Wedding</option>
                    <option value="COLLEGE_FEST">College Fest / Hackathon</option>
                    <option value="CORPORATE">Corporate Summit</option>
                    <option value="BIRTHDAY">Birthday Gala</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    Delivery Time Slot
                  </label>
                  <input
                    type="text"
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    placeholder="12:30 PM - 02:30 PM"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    Venue &amp; City
                  </label>
                  <input
                    type="text"
                    value={venueAddress}
                    onChange={(e) => setVenueAddress(e.target.value)}
                    placeholder="Grand Palace, Vijayawada"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Dietary Integrity Requirements
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['VEG', 'NON_VEG', 'JAIN', 'VEGAN', 'GLUTEN_FREE'].map(diet => (
                    <button
                      key={diet}
                      type="button"
                      onClick={() => toggleDiet(diet)}
                      className={`badge ${
                        selectedDiets.includes(diet) ? 'badge-emerald' : 'badge'
                      }`}
                      style={{
                        padding: '6px 12px',
                        cursor: 'pointer',
                        border: selectedDiets.includes(diet) ? '1px solid var(--emerald-700)' : '1px solid var(--border-light)'
                      }}
                    >
                      {selectedDiets.includes(diet) && <Check size={12} />}
                      <span>{diet}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Special Catering Instructions
                </label>
                <textarea
                  rows="2"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  style={{ width: '100%', resize: 'none' }}
                ></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Save & Plan Food'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
