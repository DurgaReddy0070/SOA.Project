import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PlannerEstimator from './components/PlannerEstimator';
import VendorDirectory from './components/VendorDirectory';
import OrderTracker from './components/OrderTracker';
import VendorDashboard from './components/VendorDashboard';
import SoaMonitor from './components/SoaMonitor';
import CheckoutModal from './components/CheckoutModal';
import { apiService } from './services/api';
import { initialVendors, initialEvents, initialOrders } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('planner');
  const [currentRole, setCurrentRole] = useState('ORGANIZER');

  const [vendors, setVendors] = useState(initialVendors || []);
  const [events, setEvents] = useState(initialEvents || []);
  const [orders, setOrders] = useState(initialOrders || []);
  const [activeEvent, setActiveEvent] = useState(initialEvents?.[0] || null);

  const [trayItems, setTrayItems] = useState([]);
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
      setActiveTab('soa-monitor');
    } else {
      setActiveTab('planner');
    }
  }, [currentRole]);

  const handleEventCreated = (newEvent) => {
    setEvents([newEvent, ...events]);
    setActiveEvent(newEvent);
    setActiveTab('vendors');
  };

  const handleSelectEventForMenu = (event) => {
    setActiveEvent(event);
    setActiveTab('vendors');
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
      vendorId: vendor.id,
      vendorName: vendor.name,
      category: menuItem.category,
      dietaryType: menuItem.dietaryType
    };
    setTrayItems([...trayItems, item]);
  };

  const handleRemoveTrayItem = (index) => {
    setTrayItems(trayItems.filter((_, i) => i !== index));
  };

  const handleOrderPlaced = (newOrder) => {
    setOrders([newOrder, ...orders]);
    setTrayItems([]);
    setActiveTab('tracker');
  };

  const handleOrderStatusUpdated = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="app-container">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        trayCount={trayItems.length}
        openCheckout={() => setIsCheckoutOpen(true)}
      />

      <main className="main-content">
        {activeTab === 'planner' && (
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

        {activeTab === 'tracker' && (
          <OrderTracker orders={orders} />
        )}

        {activeTab === 'vendor-ops' && (
          <VendorDashboard
            orders={orders}
            vendors={vendors}
            onOrderStatusUpdated={handleOrderStatusUpdated}
          />
        )}

        {activeTab === 'soa-monitor' && (
          <SoaMonitor />
        )}
      </main>

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
