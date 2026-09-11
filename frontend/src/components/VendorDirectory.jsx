import React, { useState } from 'react';
import {
  Star,
  Check,
  Plus,
  Utensils,
  MapPin,
  Phone,
  Mail,
  Award,
  Filter,
  Users,
  Search,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';

export default function VendorDirectory({
  vendors,
  activeEvent,
  onAddPackageToTray,
  onAddMenuItemToTray,
  trayItems
}) {
  const [selectedCuisine, setSelectedCuisine] = useState('ALL');
  const [selectedDiet, setSelectedDiet] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVendorModal, setActiveVendorModal] = useState(null);

  // Filter vendors
  const filteredVendors = (vendors || []).filter(v => {
    if (searchQuery && !v.name.toLowerCase().includes(searchQuery.toLowerCase()) && !(v.cuisineTypes || '').toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Top Banner & Filters */}
      <div className="card" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Catering Vendor Marketplace</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {activeEvent ? (
                <span>Filtering packages suitable for <strong style={{ color: 'var(--emerald-800)' }}>{activeEvent.title}</strong> ({activeEvent.expectedGuests} Guests)</span>
              ) : (
                <span>Explore certified bulk catering partners, specialized menus, and live banquet packages</span>
              )}
            </p>
          </div>

          {/* Filter Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Filter by caterer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '30px', fontSize: '0.82rem', height: '36px', width: '180px' }}
              />
            </div>

            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              style={{ fontSize: '0.82rem', height: '36px' }}
            >
              <option value="ALL">All Cuisines</option>
              <option value="Hyderabadi">Hyderabadi &amp; Mughlai</option>
              <option value="South Indian">South Indian &amp; Andhra</option>
              <option value="Pure Vegetarian">Pure Veg &amp; Jain</option>
              <option value="Continental">Continental &amp; Asian</option>
            </select>

            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              style={{ fontSize: '0.82rem', height: '36px' }}
            >
              <option value="ALL">All Dietary Types</option>
              <option value="VEG">Vegetarian Only</option>
              <option value="JAIN">100% Jain Compliant</option>
              <option value="VEGAN">Vegan Certified</option>
              <option value="NON_VEG">Non-Veg Feasts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vendors Marketplace Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {filteredVendors.map(vendor => {
          // Average price or package base price
          const basePkg = vendor.packages?.[0];
          const pricePerHead = basePkg ? basePkg.pricePerPerson : 620;

          return (
            <div
              key={vendor.id}
              className="card"
              style={{
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Card Top: Banner Image & Floating Badges */}
              <div>
                <div style={{ position: 'relative', height: '180px' }}>
                  <img
                    src={vendor.bannerUrl}
                    alt={vendor.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <span className="badge badge-rating" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px' }}>
                      <Star size={13} fill="#B45309" color="#B45309" />
                      <span>{vendor.rating}</span>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({vendor.ratingCount})</span>
                    </span>
                  </div>

                  <div style={{ position: 'absolute', bottom: '12px', left: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={vendor.logoUrl}
                      alt={vendor.name}
                      style={{ width: 48, height: 48, borderRadius: '12px', border: '2px solid #FFFFFF', objectFit: 'cover', background: '#FFFFFF', boxShadow: 'var(--shadow-sm)' }}
                    />
                  </div>
                </div>

                {/* Vendor Content Details */}
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {vendor.name}
                    </h3>
                  </div>

                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--emerald-800)', marginBottom: '8px' }}>
                    {vendor.cuisineTypes}
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
                    {vendor.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} style={{ color: 'var(--terracotta-500)' }} /> {vendor.city}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={13} style={{ color: 'var(--emerald-700)' }} /> Capacity: {vendor.maxGuests} Guests
                    </span>
                  </div>

                  {/* Dietary Badges */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    <span className="badge badge-veg">VEG</span>
                    <span className="badge badge-jain">JAIN</span>
                    <span className="badge badge-vegan">VEGAN</span>
                    {vendor.menuItems?.some(i => i.dietaryType === 'NON_VEG') && (
                      <span className="badge badge-nonveg">NON-VEG</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Price & CTA */}
              <div
                style={{
                  padding: '16px 20px',
                  background: '#FAF8F5',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Starting From</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--emerald-800)' }}>
                    ₹{pricePerHead} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)' }}>/ person</span>
                  </div>
                </div>

                <button
                  className="btn-primary"
                  onClick={() => setActiveVendorModal(vendor)}
                  style={{ padding: '8px 18px', fontSize: '0.84rem' }}
                >
                  <span>View Menu</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vendor Menu Details Modal */}
      {activeVendorModal && (
        <div className="modal-overlay" onClick={() => setActiveVendorModal(null)}>
          <div className="modal-content" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={activeVendorModal.logoUrl}
                  alt={activeVendorModal.name}
                  style={{ width: 52, height: 52, borderRadius: '12px', objectFit: 'cover' }}
                />
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{activeVendorModal.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span>{activeVendorModal.cuisineTypes}</span>
                    <span>•</span>
                    <span style={{ color: 'var(--amber-700)', fontWeight: 700 }}>★ {activeVendorModal.rating}</span>
                  </div>
                </div>
              </div>
              <button className="btn-icon" onClick={() => setActiveVendorModal(null)}>
                <X size={18} />
              </button>
            </div>

            {/* Packages Section */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px' }}>
                Curated Banquet Packages
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeVendorModal.packages?.map(pkg => (
                  <div
                    key={pkg.id}
                    style={{
                      background: 'var(--bg-app)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '16px 18px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: '240px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h5 style={{ fontSize: '0.98rem', fontWeight: 700 }}>{pkg.name}</h5>
                        {pkg.popularBadge && (
                          <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>
                            {pkg.popularBadge}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {pkg.itemsSummary}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--emerald-800)' }}>
                          ₹{pkg.pricePerPerson}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>per guest</div>
                      </div>

                      <button
                        className="btn-primary"
                        onClick={() => {
                          onAddPackageToTray(activeVendorModal, pkg);
                          setActiveVendorModal(null);
                        }}
                        style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                      >
                        <Plus size={14} />
                        <span>Select Package</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Dishes Menu */}
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px' }}>
                A La Carte Menu Items
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                {activeVendorModal.menuItems?.map(item => (
                  <div
                    key={item.id}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px 14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span
                          className={`badge ${
                            item.dietaryType === 'VEG' ? 'badge-veg' :
                            item.dietaryType === 'JAIN' ? 'badge-jain' :
                            item.dietaryType === 'VEGAN' ? 'badge-vegan' : 'badge-nonveg'
                          }`}
                          style={{ fontSize: '0.62rem', padding: '1px 6px' }}
                        >
                          {item.dietaryType}
                        </span>
                        <h6 style={{ fontSize: '0.86rem', fontWeight: 700 }}>{item.name}</h6>
                      </div>
                      <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                        {item.description}
                      </p>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem', fontWeight: 700, color: 'var(--emerald-800)', marginTop: '4px' }}>
                        ₹{item.price} / person
                      </div>
                    </div>

                    <button
                      className="btn-secondary"
                      onClick={() => onAddMenuItemToTray(activeVendorModal, item)}
                      style={{ padding: '6px 10px', fontSize: '0.78rem', marginLeft: '10px' }}
                    >
                      <Plus size={13} />
                      <span>Add</span>
                    </button>
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
