import React, { useState } from 'react';
import { Star, Check, Plus, Utensils, MapPin, Phone, Mail, Award, Flame, Filter, ShoppingBag } from 'lucide-react';

export default function VendorDirectory({ vendors, activeEvent, onAddPackageToTray, onAddMenuItemToTray, trayItems }) {
  const [selectedCuisine, setSelectedCuisine] = useState('ALL');
  const [selectedDiet, setSelectedDiet] = useState('ALL');
  const [activeVendorModal, setActiveVendorModal] = useState(null);

  // Filter vendors
  const filteredVendors = (vendors || []).filter(v => {
    if (selectedCuisine !== 'ALL' && !(v.cuisineTypes || '').toLowerCase().includes(selectedCuisine.toLowerCase())) {
      return false;
    }
    if (selectedDiet !== 'ALL') {
      const hasDietItem = v.menuItems && v.menuItems.some(i => i.dietaryType === selectedDiet);
      if (!hasDietItem) return false;
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Filter and Event Context Banner */}
      <div className="glass-card" style={{ padding: '18px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Catering Vendor Catalog &amp; Menus</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {activeEvent ? (
                <span>Planning for Event: <strong style={{ color: '#818cf8' }}>{activeEvent.title}</strong> ({activeEvent.expectedGuests} Guests)</span>
              ) : (
                <span>Select curated bulk catering packages or customize dish trays for your event</span>
              )}
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(15,23,42,0.8)', padding: '4px 8px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <Filter size={14} style={{ color: '#94a3b8' }} />
              <select
                className="role-select"
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
              >
                <option value="ALL">All Cuisines</option>
                <option value="Hyderabadi">Hyderabadi &amp; Mughlai</option>
                <option value="South Indian">South Indian &amp; Andhra</option>
                <option value="Pure Vegetarian">Pure Veg &amp; Jain</option>
                <option value="Continental">Continental &amp; Asian</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(15,23,42,0.8)', padding: '4px 8px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <select
                className="role-select"
                value={selectedDiet}
                onChange={(e) => setSelectedDiet(e.target.value)}
              >
                <option value="ALL">All Dietary Types</option>
                <option value="VEG">Vegetarian Only</option>
                <option value="NON_VEG">Non-Veg</option>
                <option value="JAIN">100% Jain Compliant</option>
                <option value="VEGAN">Vegan Certified</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Vendors Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>
        {filteredVendors.map(vendor => (
          <div key={vendor.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
            {/* Banner Image */}
            <div style={{ position: 'relative', height: 160, overflow: 'hidden' }}>
              <img
                src={vendor.bannerUrl}
                alt={vendor.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
                <span className="badge-pill" style={{ background: 'rgba(15, 23, 42, 0.85)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                  <Star size={13} fill="#fbbf24" style={{ marginRight: 3 }} /> {vendor.rating} ({vendor.ratingCount})
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: 12, left: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <img
                  src={vendor.logoUrl}
                  alt={vendor.name}
                  style={{ width: 44, height: 44, borderRadius: 10, border: '2px solid white', objectFit: 'cover' }}
                />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                    {vendor.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {vendor.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <span><MapPin size={13} style={{ display: 'inline', color: '#ec4899', marginRight: 3 }} /> {vendor.city}</span>
                <span>•</span>
                <span>Capacity: {vendor.minGuests} - {vendor.maxGuests} Guests</span>
              </div>

              {/* Cuisine Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {(vendor.cuisineTypes || 'Multi-Cuisine').split(',').map((c, i) => (
                  <span key={i} style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: '#cbd5e1' }}>
                    {c.trim()}
                  </span>
                ))}
              </div>

              {/* Package Preview Box */}
              {vendor.packages && vendor.packages.length > 0 && (
                <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase' }}>
                      {vendor.packages[0].popularBadge || 'Featured Package'}
                    </span>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                      ₹{vendor.packages[0].pricePerPerson}/plate
                    </span>
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white' }}>
                    {vendor.packages[0].name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    {vendor.packages[0].itemsSummary}
                  </div>

                  <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                    <button
                      className="btn-primary"
                      onClick={() => onAddPackageToTray(vendor, vendor.packages[0])}
                      style={{ flex: 1, padding: '7px 12px', fontSize: '0.8rem' }}
                    >
                      <Plus size={14} />
                      <span>Add Package to Tray</span>
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => setActiveVendorModal(vendor)}
                      style={{ padding: '7px 12px', fontSize: '0.8rem' }}
                    >
                      <span>View Menu</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Vendor Menu & Package Modal */}
      {activeVendorModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}>
          <div className="glass-card" style={{ maxWidth: 750, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="glass-card-header">
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{activeVendorModal.name} — Full Menu</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Select individual dishes or comprehensive catering packages</p>
              </div>
              <button
                onClick={() => setActiveVendorModal(null)}
                style={{ color: 'var(--text-muted)', fontSize: '1.2rem', padding: '4px 8px' }}
              >
                ✕
              </button>
            </div>

            {/* Packages Section */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12, color: '#a5b4fc' }}>
                Catering Packages
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {activeVendorModal.packages?.map(pkg => (
                  <div key={pkg.id} style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid var(--border-subtle)', borderRadius: 10, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>{pkg.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{pkg.description}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>{pkg.itemsSummary}</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                        ₹{pkg.pricePerPerson}/person
                      </div>
                      <button
                        className="btn-primary"
                        onClick={() => {
                          onAddPackageToTray(activeVendorModal, pkg);
                          setActiveVendorModal(null);
                        }}
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        <Plus size={13} /> Select Package
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Individual Menu Items */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12, color: '#a5b4fc' }}>
                Individual Menu Items &amp; Live Counters
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {activeVendorModal.menuItems?.map(item => (
                  <div key={item.id} style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                        <span className={`diet-badge diet-${item.dietaryType.toLowerCase().replace('_', '')}`}>
                          {item.dietaryType}
                        </span>
                        {item.isChefSpecial && (
                          <span style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Flame size={12} /> Chef's Pick
                          </span>
                        )}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'white' }}>{item.name}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 2 }}>{item.description}</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8 }}>
                      <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                        ₹{item.price}/person
                      </span>
                      <button
                        className="btn-secondary"
                        onClick={() => onAddMenuItemToTray(activeVendorModal, item)}
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      >
                        <Plus size={12} /> Add Item
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
