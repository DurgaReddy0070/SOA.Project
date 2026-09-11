import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import DashboardOverview from './components/DashboardOverview';
import PlannerEstimator from './components/PlannerEstimator';
import VendorDirectory from './components/VendorDirectory';
import MenuPlanner from './components/MenuPlanner';
import OrderTracker from './components/OrderTracker';
import PaymentsView from './components/PaymentsView';
import AiPlanner from './components/AiPlanner';
import VendorDashboard from './components/VendorDashboard';
import SoaMonitor from './components/SoaMonitor';
import CheckoutModal from './components/CheckoutModal';
import { apiService } from './services/api';
import { initialVendors, initialEvents, initialOrders } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentRole, setCurrentRole] = useState('ORGANIZER');

  const [vendors, setVendors] = useState(initialVendors || []);
  const [events, setEvents] = useState(initialEvents || []);
  const [orders, setOrders] = useState(initialOrders || []);
  const [activeEvent, setActiveEvent] = useState(initialEvents?.[0] || null);

  const [trayItems, setTrayItems] = useState([
    { id: 101, name: 'Paneer Tikka Angara', price: 140, vendorId: 1, vendorName: 'Royal Feast Grand Caterers', category: 'STARTER', dietaryType: 'VEG' },
    { id: 201, name: 'Jain Shahi Paneer (Satvik)', price: 150, vendorId: 3, vendorName: 'Green Leaf Pure Veg & Jain Kitchen', category: 'MAIN_COURSE', dietaryType: 'JAIN' },
    { id: 301, name: 'Hyderabadi Zafrani Mutton Dum Biryani', price: 320, vendorId: 1, vendorName: 'Royal Feast Grand Caterers', category: 'BREADS_RICE', dietaryType: 'NON_VEG' },
    { id: 501, name: 'Shahi Tukda with Malai Rabdi', price: 90, vendorId: 1, vendorName: 'Royal Feast Grand Caterers', category: 'DESSERT', dietaryType: 'VEG' }
  ]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Load initial data from APIs or fallback
  useEffect(() => {
    async function loadData() {
      try {
        const v = await apiService.getVendors();
        if (Array.isArray(v) && v.length > 0) setVendors(v);
        const e = await apiService.getEvents();
        if (Array.isArray(e) && e.length > 0) {
          setEvents(e);
          setActiveEvent(prev => prev || e[0]);
        }
        const o = await apiService.getOrders();
        if (Array.isArray(o) && o.length > 0) setOrders(o);
      } catch (err) {
        console.warn('Using fallback data');
      }
    }
    loadData();
  }, []);

  // When role changes, switch tabs contextually
  useEffect(() => {
    if (currentRole === 'VENDOR') {
      setActiveTab('vendor-ops');
    } else if (currentRole === 'ADMIN') {
      setActiveTab('soa-health');
    }
  }, [currentRole]);

  const handleEventCreated = (newEvent) => {
    setEvents([newEvent, ...events]);
    setActiveEvent(newEvent);
    setActiveTab('vendors');
  };

  const handleSelectEventForMenu = (event) => {
    setActiveEvent(event);
    setActiveTab('menu-planner');
  };

  const handleAddPackageToTray = (vendor, pkg) => {
    const item = {
      id: pkg.id,
      name: `${pkg.name} (Package)`,
      price: pkg.pricePerPerson,
      vendorId: vendor.id,
      vendorName: vendor.name,
      category: 'PACKAGE',
      dietaryType: 'MULTI_DIET'
    };
    setTrayItems([...trayItems, item]);
    setIsCheckoutOpen(true);
  };

  const handleAddMenuItemToTray = (vendor, menuItem) => {
    const item = {
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      vendorId: vendor?.id || 1,
      vendorName: vendor?.name || 'Catering Partner',
      category: menuItem.category || 'MAIN_COURSE',
      dietaryType: menuItem.dietaryType || 'VEG'
    };
    setTrayItems([...trayItems, item]);
  };

  const handleRemoveTrayItem = (index) => {
    setTrayItems(trayItems.filter((_, i) => i !== index));
  };

  const handleOrderPlaced = (newOrder) => {
    setOrders([newOrder, ...orders]);
    setTrayItems([]);
    setActiveTab('orders');
  };

  const handleOrderStatusUpdated = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="app-layout">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        trayCount={trayItems.length}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <TopNav
          activeTab={activeTab}
          trayCount={trayItems.length}
          openCheckout={() => setIsCheckoutOpen(true)}
          onAskAi={() => setActiveTab('ai-assistant')}
        />

        <main className="content-body">
          {activeTab === 'overview' && (
            <DashboardOverview
              events={events}
              orders={orders}
              vendors={vendors}
              onNavigate={setActiveTab}
              onCreateEventModal={() => setActiveTab('events')}
              onSelectEvent={handleSelectEventForMenu}
            />
          )}

          {activeTab === 'events' && (
            <PlannerEstimator
              events={events}
              onEventCreated={handleEventCreated}
              onSelectEventForMenu={handleSelectEventForMenu}
            />
          )}

          {activeTab === 'vendors' && (
            <VendorDirectory
              vendors={vendors}
              activeEvent={activeEvent}
              onAddPackageToTray={handleAddPackageToTray}
              onAddMenuItemToTray={handleAddMenuItemToTray}
              trayItems={trayItems}
            />
          )}

          {activeTab === 'menu-planner' && (
            <MenuPlanner
              vendors={vendors}
              activeEvent={activeEvent}
              trayItems={trayItems}
              onAddMenuItemToTray={handleAddMenuItemToTray}
              onRemoveTrayItem={handleRemoveTrayItem}
              onProceedToOrder={() => setIsCheckoutOpen(true)}
            />
          )}

          {activeTab === 'orders' && (
            <OrderTracker orders={orders} />
          )}

          {activeTab === 'payments' && (
            <PaymentsView orders={orders} />
          )}

          {activeTab === 'ai-assistant' && (
            <AiPlanner
              activeEvent={activeEvent}
              onNavigateToMenu={() => setActiveTab('menu-planner')}
            />
          )}

          {activeTab === 'vendor-ops' && (
            <VendorDashboard
              orders={orders}
              vendors={vendors}
              onOrderStatusUpdated={handleOrderStatusUpdated}
            />
          )}

          {activeTab === 'soa-health' && (
            <SoaMonitor />
          )}
        </main>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        trayItems={trayItems}
        onRemoveItem={handleRemoveTrayItem}
        activeEvent={activeEvent}
        onOrderPlaced={handleOrderPlaced}
      />
    </div>
  );
}
