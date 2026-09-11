import React from 'react';
import {
  CalendarDays,
  Truck,
  Users,
  Wallet,
  Sparkles,
  Plus,
  ArrowRight,
  MapPin,
  Clock,
  CheckCircle2,
  TrendingUp,
  Store,
  ChevronRight,
  ShieldCheck,
  Star
} from 'lucide-react';

export default function DashboardOverview({
  events,
  orders,
  vendors,
  onNavigate,
  onCreateEventModal,
  onSelectEvent
}) {
  // Metric card calculations or fallback display
  const upcomingEventsCount = events?.length || 3;
  const activeOrdersCount = orders?.length || 12;
  const totalGuestsCount = events?.reduce((acc, e) => acc + (Number(e.expectedGuests) || 0), 0) || 850;
  
  // Showcase event cards
  const showcaseEvents = [
    {
      id: 'showcase-1',
      type: 'WEDDING',
      title: 'Priya & Rahul Wedding Reception',
      date: '18 October 2026',
      location: 'Vijayawada Grand Palace',
      guestCount: 250,
      budget: '₹2,00,000',
      progress: 78,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
      caterer: 'Green Leaf Pure Veg & Jain Kitchen',
      status: 'Menu Selected'
    },
    {
      id: 'showcase-2',
      type: 'COLLEGE_FEST',
      title: 'KL University Annual Tech Symposium',
      date: '06 September 2026',
      location: 'Bowrampet Campus, Hyderabad',
      guestCount: 350,
      budget: '₹1,75,000',
      progress: 92,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80',
      caterer: 'Royal Feast Grand Caterers',
      status: 'Order Placed'
    },
    {
      id: 'showcase-3',
      type: 'CORPORATE',
      title: 'FinTech Leadership Executive Summit',
      date: '30 August 2026',
      location: 'ITC Kohenur, Hitec City',
      guestCount: 120,
      budget: '₹84,000',
      progress: 100,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop&q=80',
      caterer: 'Urban Wok & Continental Catering',
      status: 'In Transit'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Hero Section */}
      <div className="hero-dashboard">
        <div className="hero-tagline">
          <Sparkles size={14} /> Smart Event Food Management
        </div>
        <h1 className="hero-headline">
          Plan unforgettable events.<br />We'll handle the food.
        </h1>
        <p className="hero-description">
          Discover certified catering vendors, build multi-course menus, optimize bulk budgets, and coordinate live delivery telemetry all from one unified platform.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onCreateEventModal}>
            <Plus size={16} />
            <span>Create Event</span>
          </button>
          <button className="btn-secondary" onClick={() => onNavigate('ai-assistant')}>
            <Sparkles size={16} style={{ color: 'var(--amber-600)' }} />
            <span>Ask AI Assistant</span>
          </button>
        </div>
      </div>

      {/* 4 Event Overview Metric Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div>
            <div className="metric-number">
              {upcomingEventsCount < 10 ? `0${upcomingEventsCount}` : upcomingEventsCount}
            </div>
            <div className="metric-label">Upcoming Events</div>
          </div>
          <div className="metric-icon-box" style={{ background: 'var(--emerald-50)', color: 'var(--emerald-700)' }}>
            <CalendarDays size={22} />
          </div>
        </div>

        <div className="metric-card">
          <div>
            <div className="metric-number">
              {activeOrdersCount < 10 ? `0${activeOrdersCount}` : activeOrdersCount}
            </div>
            <div className="metric-label">Active Orders</div>
          </div>
          <div className="metric-icon-box" style={{ background: 'var(--amber-50)', color: 'var(--amber-700)' }}>
            <Truck size={22} />
          </div>
        </div>

        <div className="metric-card">
          <div>
            <div className="metric-number">{totalGuestsCount}</div>
            <div className="metric-label">Total Guests Planned</div>
          </div>
          <div className="metric-icon-box" style={{ background: 'var(--terracotta-50)', color: 'var(--terracotta-500)' }}>
            <Users size={22} />
          </div>
        </div>

        <div className="metric-card">
          <div>
            <div className="metric-number">₹46,720</div>
            <div className="metric-label">Remaining Budget</div>
          </div>
          <div className="metric-icon-box" style={{ background: 'var(--emerald-50)', color: 'var(--emerald-700)' }}>
            <Wallet size={22} />
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700 }}>Upcoming Events</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Events currently in food planning, vendor quotation, or live logistics
            </p>
          </div>
          <button
            className="btn-secondary"
            onClick={() => onNavigate('events')}
            style={{ fontSize: '0.82rem', padding: '6px 14px' }}
          >
            <span>View All ({events?.length || 3})</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '22px' }}>
          {showcaseEvents.map((evt) => (
            <div
              key={evt.id}
              className="card"
              style={{
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
              }}
              onClick={() => onNavigate('menu-planner')}
            >
              {/* Event Image */}
              <div style={{ position: 'relative', height: '170px' }}>
                <img
                  src={evt.image}
                  alt={evt.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(28, 25, 23, 0.75)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em'
                  }}
                >
                  {evt.type}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(8px)',
                    color: 'var(--emerald-800)',
                    padding: '3px 9px',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 700
                  }}
                >
                  {evt.budget} Budget
                </div>
              </div>

              {/* Event Details */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>
                  {evt.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CalendarDays size={13} style={{ color: 'var(--emerald-700)' }} /> {evt.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={13} style={{ color: 'var(--terracotta-500)' }} /> {evt.location}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <span>Food Planning</span>
                  <span style={{ fontWeight: 700, color: 'var(--emerald-700)' }}>{evt.progress}% complete</span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${evt.progress}%` }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    <strong>{evt.guestCount}</strong> Guests Planned
                  </span>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--emerald-700)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Build Menu <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column Section: Interactive Budget Experience + Featured Caterers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* Visual Budget Experience */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">
                <Wallet size={18} style={{ color: 'var(--emerald-700)' }} /> Budget Experience
              </h3>
              <p className="card-subtitle">Live allocation for current active wedding event</p>
            </div>
            <span className="badge badge-emerald">Real-time</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', margin: '14px 0 20px 0' }}>
            <div style={{ background: 'var(--bg-app)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)' }}>TOTAL BUDGET</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>₹2,00,000</div>
            </div>
            <div style={{ background: 'var(--emerald-50)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--emerald-100)' }}>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--emerald-800)' }}>ESTIMATED FOOD</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--emerald-800)', marginTop: '4px' }}>₹1,53,280</div>
            </div>
            <div style={{ background: 'var(--amber-50)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--amber-100)' }}>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--amber-700)' }}>REMAINING</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--amber-700)', marginTop: '4px' }}>₹46,720</div>
            </div>
          </div>

          {/* Allocation Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
                <span>Catering &amp; Food (76%)</span>
                <span>₹1,53,280</span>
              </div>
              <div className="progress-bar-track" style={{ height: '7px' }}>
                <div className="progress-bar-fill" style={{ width: '76%', background: 'var(--emerald-600)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
                <span>Buffet Staging &amp; Warmers (15%)</span>
                <span>₹30,000</span>
              </div>
              <div className="progress-bar-track" style={{ height: '7px' }}>
                <div className="progress-bar-fill" style={{ width: '15%', background: 'var(--amber-500)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
                <span>Cold-Chain Logistics &amp; Transport (9%)</span>
                <span>₹16,720</span>
              </div>
              <div className="progress-bar-track" style={{ height: '7px' }}>
                <div className="progress-bar-fill" style={{ width: '9%', background: 'var(--terracotta-500)' }}></div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Bulk Tier Discount Applied: <strong style={{ color: 'var(--emerald-700)' }}>10% OFF</strong>
            </span>
            <button
              className="btn-secondary"
              onClick={() => onNavigate('events')}
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              Adjust Estimator
            </button>
          </div>
        </div>

        {/* AI Quick Assistant Banner */}
        <div
          className="card"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, var(--emerald-50) 100%)',
            borderColor: 'var(--emerald-100)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-800)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
              <Sparkles size={16} /> Grounded AI Intelligence
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Let AI plan your catering in seconds.
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '18px' }}>
              "Plan a vegetarian wedding for 250 guests with a budget of ₹2 lakh." Our AI agent queries real-time vendor microservices and estimates menus without hallucinations.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--emerald-700)' }} />
                <span>Strict dietary verification (Veg, Jain, Vegan, Halal)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--emerald-700)' }} />
                <span>Grounded live pricing across verified caterers</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--emerald-700)' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--emerald-700)' }} />
                <span>Zero database duplication across SOA microservices</span>
              </div>
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={() => onNavigate('ai-assistant')}
            style={{ width: '100%' }}
          >
            <Sparkles size={16} />
            <span>Launch AI Event Planner</span>
          </button>
        </div>

      </div>

    </div>
  );
}
