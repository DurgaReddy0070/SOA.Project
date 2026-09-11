import React, { useState } from 'react';
import {
  ChefHat,
  Plus,
  Trash2,
  Users,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  UtensilsCrossed
} from 'lucide-react';

export default function MenuPlanner({
  vendors,
  activeEvent,
  trayItems,
  onAddMenuItemToTray,
  onRemoveTrayItem,
  onProceedToOrder
}) {
  const [activeCategory, setActiveCategory] = useState('STARTER');
  const [guestCount, setGuestCount] = useState(activeEvent?.expectedGuests || 250);

  const categories = [
    { id: 'STARTER', label: 'Starters & Appetizers', count: 6 },
    { id: 'MAIN_COURSE', label: 'Main Course & Curries', count: 8 },
    { id: 'BREADS_RICE', label: 'Biryani, Rice & Breads', count: 5 },
    { id: 'LIVE_COUNTER', label: 'Live Gourmet Stations', count: 4 },
    { id: 'DESSERT', label: 'Artisanal Desserts', count: 5 },
    { id: 'BEVERAGE', label: 'Welcome Drinks & Teas', count: 4 }
  ];

  // Comprehensive catalog of dishes with images, badges, allergens
  const dishCatalog = [
    // Starters
    {
      id: 101,
      name: 'Paneer Tikka Angara',
      category: 'STARTER',
      dietaryType: 'VEG',
      allergen: 'Contains Dairy',
      price: 140,
      description: 'Charcoal-grilled cottage cheese marinated in hung curd, Kashmiri chili, and carom seeds.',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Royal Feast Grand Caterers',
      vendorId: 1
    },
    {
      id: 102,
      name: 'Raw Banana Galouti Tikki',
      category: 'STARTER',
      dietaryType: 'JAIN',
      allergen: 'Nut Free • No Root Veg',
      price: 120,
      description: 'Melt-in-mouth spiced raw plantain patties pan-fried in pure desi ghee.',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Green Leaf Pure Veg & Jain Kitchen',
      vendorId: 3
    },
    {
      id: 103,
      name: 'Steamed Edamame & Truffle Dim Sum',
      category: 'STARTER',
      dietaryType: 'VEGAN',
      allergen: 'Gluten Free • Soy',
      price: 160,
      description: 'Crystal dumplings packed with fresh edamame, water chestnuts, and black truffle oil.',
      image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Urban Wok & Continental Catering',
      vendorId: 4
    },
    {
      id: 104,
      name: 'Andhra Natukodi Vepudu',
      category: 'STARTER',
      dietaryType: 'NON_VEG',
      allergen: 'Contains Poultry',
      price: 190,
      description: 'Country chicken dry roast tossed with crushed black pepper, shallots, and curry leaves.',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Dakshin Flavours Banquets',
      vendorId: 2
    },

    // Main Course
    {
      id: 201,
      name: 'Jain Shahi Paneer (Satvik)',
      category: 'MAIN_COURSE',
      dietaryType: 'JAIN',
      allergen: 'Dairy • No Onion/Garlic',
      price: 150,
      description: 'Velvety cottage cheese cubes simmered in fresh vine-tomato and cashew gravy without onion/garlic.',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Green Leaf Pure Veg & Jain Kitchen',
      vendorId: 3
    },
    {
      id: 202,
      name: 'Gutti Vankaya Kura (Andhra Brinjal)',
      category: 'MAIN_COURSE',
      dietaryType: 'VEG',
      allergen: 'Peanuts • Sesame',
      price: 110,
      description: 'Traditional small eggplants stuffed with roasted peanut, sesame, and coriander paste.',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Dakshin Flavours Banquets',
      vendorId: 2
    },
    {
      id: 203,
      name: 'Dal Makhani Peshawari',
      category: 'MAIN_COURSE',
      dietaryType: 'VEG',
      allergen: 'Contains Dairy',
      price: 120,
      description: 'Black lentils slow-cooked overnight on charcoal with rich white butter and fresh cream.',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Royal Feast Grand Caterers',
      vendorId: 1
    },
    {
      id: 204,
      name: 'Smoked Herb Chicken Steaks',
      category: 'MAIN_COURSE',
      dietaryType: 'NON_VEG',
      allergen: 'Contains Poultry',
      price: 220,
      description: 'Tender grilled chicken breasts basted in rosemary thyme jus, served with garlic mash.',
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Urban Wok & Continental Catering',
      vendorId: 4
    },

    // Rice & Breads
    {
      id: 301,
      name: 'Hyderabadi Zafrani Mutton Dum Biryani',
      category: 'BREADS_RICE',
      dietaryType: 'NON_VEG',
      allergen: 'Contains Mutton • Saffron',
      price: 320,
      description: 'Aged long-grain basmati rice layered with spiced tender mutton, saffron milk, and fried onions.',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Royal Feast Grand Caterers',
      vendorId: 1
    },
    {
      id: 302,
      name: 'Kashmiri Saffron Veg Pulao',
      category: 'BREADS_RICE',
      dietaryType: 'VEG',
      allergen: 'Dry Fruits • Saffron',
      price: 140,
      description: 'Fragrant basmati rice tossed with fresh garden vegetables, caramelized nuts, and golden raisins.',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Green Leaf Pure Veg & Jain Kitchen',
      vendorId: 3
    },
    {
      id: 303,
      name: 'Assorted Gourmet Naan & Kulcha Basket',
      category: 'BREADS_RICE',
      dietaryType: 'VEG',
      allergen: 'Contains Gluten • Dairy',
      price: 60,
      description: 'Fresh tandoor-baked Butter Naan, Garlic Naan, and Amritsari Paneer Kulcha.',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Royal Feast Grand Caterers',
      vendorId: 1
    },

    // Live Counters
    {
      id: 401,
      name: 'Live Artisanal Wood-Fired Pasta Station',
      category: 'LIVE_COUNTER',
      dietaryType: 'VEG',
      allergen: 'Gluten • Dairy',
      price: 140,
      description: 'Live chef preparing Penne, Fettuccine in choice of Truffle Alfredo, Basil Pesto or Arrabbiata.',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Urban Wok & Continental Catering',
      vendorId: 4
    },
    {
      id: 402,
      name: 'Live Dosa & Fluffy Appam Counter',
      category: 'LIVE_COUNTER',
      dietaryType: 'VEG',
      allergen: 'Fermented Rice & Lentil',
      price: 95,
      description: 'Hot made-to-order ghee roast dosas, pesarattu, and soft appams with stew & 4 chutneys.',
      image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Dakshin Flavours Banquets',
      vendorId: 2
    },
    {
      id: 403,
      name: 'Live Chaat & Automatic Pani Puri Station',
      category: 'LIVE_COUNTER',
      dietaryType: 'VEG',
      allergen: 'Spices • Tamarind',
      price: 90,
      description: 'Hygienic touchless flavored water dispensers, Delhi style Dahi Bhalla, and Papdi Chaat.',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Green Leaf Pure Veg & Jain Kitchen',
      vendorId: 3
    },

    // Desserts
    {
      id: 501,
      name: 'Shahi Tukda with Malai Rabdi',
      category: 'DESSERT',
      dietaryType: 'VEG',
      allergen: 'Dairy • Pistachios',
      price: 90,
      description: 'Golden fried brioche soaked in saffron cardamom syrup and smothered in thick pistachio rabdi.',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Royal Feast Grand Caterers',
      vendorId: 1
    },
    {
      id: 502,
      name: 'Classic Italian Espresso Tiramisu',
      category: 'DESSERT',
      dietaryType: 'VEG',
      allergen: 'Dairy • Coffee',
      price: 110,
      description: 'Espresso-soaked ladyfingers layered with whipped mascarpone cream and dusted with Dutch cocoa.',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Urban Wok & Continental Catering',
      vendorId: 4
    },
    {
      id: 503,
      name: 'Semiyan Elaneer Tender Coconut Payasam',
      category: 'DESSERT',
      dietaryType: 'VEG',
      allergen: 'Coconut • Cardamom',
      price: 75,
      description: 'Delicate tender coconut pulp simmered with roasted vermicelli, milk, and crushed cashew.',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Dakshin Flavours Banquets',
      vendorId: 2
    },

    // Beverages
    {
      id: 601,
      name: 'Royal Kesaria Thandai & Mocktails',
      category: 'BEVERAGE',
      dietaryType: 'VEG',
      allergen: 'Almonds • Saffron',
      price: 60,
      description: 'Traditional cooling saffron almond beverage alongside fresh Passion Fruit Mojito coolers.',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80',
      vendorName: 'Green Leaf Pure Veg & Jain Kitchen',
      vendorId: 3
    }
  ];

  const filteredDishes = dishCatalog.filter(d => d.category === activeCategory);

  // Calculate Tray totals
  const costPerPerson = trayItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  const estimatedSubtotal = costPerPerson * guestCount;
  const bulkDiscount = guestCount >= 250 ? estimatedSubtotal * 0.1 : estimatedSubtotal * 0.05;
  const logisticsFee = 2500;
  const grandTotal = Math.round(estimatedSubtotal - bulkDiscount + logisticsFee);
  const totalBudget = activeEvent?.estimatedBudget || 200000;
  const budgetRemaining = totalBudget - grandTotal;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div className="card" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Visual Menu Planner &amp; Builder</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Curate individual dishes across certified caterers for <strong style={{ color: 'var(--emerald-800)' }}>{activeEvent?.title || 'Your Event'}</strong>
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="badge badge-emerald">
              <Users size={13} /> {guestCount} Guests Target
            </span>
            <span className="badge badge-rating">
              Budget: ₹{totalBudget?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* 3-Column Interactive Menu Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 320px', gap: '22px', alignItems: 'start' }}>
        
        {/* Left Column: Categories Sidebar */}
        <div className="card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', padding: '6px 10px' }}>
            Menu Categories
          </div>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`nav-item-btn ${activeCategory === cat.id ? 'active' : ''}`}
              style={{ fontSize: '0.82rem', padding: '10px 12px' }}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Center Column: Dish Cards with Images */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              {categories.find(c => c.id === activeCategory)?.label}
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {filteredDishes.length} items available
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            {filteredDishes.map(dish => (
              <div
                key={dish.id}
                className="card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ position: 'relative', height: '140px' }}>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                      <span
                        className={`badge ${
                          dish.dietaryType === 'VEG' ? 'badge-veg' :
                          dish.dietaryType === 'JAIN' ? 'badge-jain' :
                          dish.dietaryType === 'VEGAN' ? 'badge-vegan' : 'badge-nonveg'
                        }`}
                      >
                        {dish.dietaryType}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: '16px' }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '4px' }}>
                      {dish.name}
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '8px' }}>
                      {dish.description}
                    </p>
                    <div style={{ fontSize: '0.7rem', color: 'var(--amber-700)', fontWeight: 600, background: 'var(--amber-50)', padding: '2px 6px', borderRadius: '4px', display: 'inline-block' }}>
                      {dish.allergen}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: '12px 16px',
                    background: '#FAF8F5',
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 800, color: 'var(--emerald-800)' }}>
                    ₹{dish.price} <span style={{ fontSize: '0.72rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ head</span>
                  </div>

                  <button
                    className="btn-primary"
                    onClick={() => onAddMenuItemToTray({ id: dish.vendorId, name: dish.vendorName }, dish)}
                    style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                  >
                    <Plus size={13} />
                    <span>Add to Menu</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sticky "Your Menu" Tray */}
        <div
          className="card"
          style={{
            position: 'sticky',
            top: '84px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingBag size={18} style={{ color: 'var(--emerald-700)' }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Your Menu</h3>
            </div>
            <span className="badge badge-emerald">{trayItems.length} items</span>
          </div>

          {/* Guest Count Selector */}
          <div>
            <label style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Guests Multiplier
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <input
                type="number"
                min="10"
                max="2000"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                style={{ width: '100%', fontSize: '0.9rem', fontWeight: 700, padding: '6px 10px' }}
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Heads</span>
            </div>
          </div>

          {/* Selected Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
            {trayItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 10px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                No dishes selected yet. Click "+ Add to Menu" on any item.
              </div>
            ) : (
              trayItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-app)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '8px 10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0, paddingRight: '8px' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      ₹{item.price} / head
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveTrayItem(idx)}
                    style={{ color: 'var(--color-danger)', padding: '4px', cursor: 'pointer' }}
                    title="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Cost Summary Box */}
          <div style={{ background: '#FAF8F5', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Cost per Person:</span>
              <span style={{ fontWeight: 700 }}>₹{costPerPerson}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Estimated Total ({guestCount} heads):</span>
              <span style={{ fontWeight: 700 }}>₹{estimatedSubtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Scale Tier Discount:</span>
              <span style={{ color: 'var(--emerald-700)', fontWeight: 700 }}>-₹{bulkDiscount.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Remaining Budget:</span>
              <span style={{ color: budgetRemaining >= 0 ? 'var(--emerald-800)' : 'var(--color-danger)', fontWeight: 700 }}>
                ₹{budgetRemaining.toLocaleString()}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Grand Total</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--emerald-800)' }}>
                ₹{grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* CTA */}
          <button
            className="btn-primary"
            onClick={onProceedToOrder}
            disabled={trayItems.length === 0}
            style={{ width: '100%', opacity: trayItems.length === 0 ? 0.6 : 1 }}
          >
            <span>Continue to Order</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </div>

    </div>
  );
}
