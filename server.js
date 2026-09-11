const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { processAiAgentQuery } = require('./ai-agent');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// In-Memory Microservices State
const state = {
  services: [
    { name: 'EUREKA-SERVER', port: 8761, status: 'UP', description: 'Netflix Service Registry & Discovery' },
    { name: 'API-GATEWAY', port: 8080, status: 'UP', description: 'Spring Cloud Gateway & Dynamic Routing' },
    { name: 'AUTH-SERVICE', port: 8081, status: 'UP', description: 'JWT Authentication & Role-Based Access' },
    { name: 'EVENT-SERVICE', port: 8082, status: 'UP', description: 'Event Management & Dynamic Guest Cost Engine' },
    { name: 'VENDOR-SERVICE', port: 8083, status: 'UP', description: 'Catering Onboarding, Menus & Dietary Filtering' },
    { name: 'ORDER-SERVICE', port: 8084, status: 'UP', description: 'Bulk Orders & Cold-Chain Logistics Tracking' },
    { name: 'PAYMENT-SERVICE', port: 8085, status: 'UP', description: 'Payment Simulation & Digital Invoicing' }
  ],
  users: [
    { id: 1, name: "Y Durga Prasad Reddy", email: "organizer@eventfood.com", role: "EVENT_ORGANIZER", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IlkgRHVyZ2EgUHJhc2FkIFJlZGR5Iiwicm9sZSI6IkVWRU5UX09SR0FOSVpFUiJ9.demoSignature" },
    { id: 2, name: "Toram Charam", email: "vendor@eventfood.com", role: "CATERER_VENDOR", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6IlRvcmFtIENoYXJhbSIsInJvbGUiOiJDQVRFUkVSX1ZFTkRPUiJ9.demoSignature" }
  ],
  vendors: [
    {
      id: 1,
      name: "Royal Feast Grand Caterers",
      description: "Premier luxury event caterer specializing in grand Hyderabadi biryani feasts, royal Mughlai dishes, and live gourmet counters.",
      cuisineTypes: "Hyderabadi, Mughlai, North Indian",
      rating: 4.9,
      ratingCount: 340,
      city: "Hyderabad",
      address: "Plot 42, Jubilee Hills, Hyderabad",
      minGuests: 50,
      maxGuests: 2500,
      logoUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=150",
      bannerUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      packages: [
        { id: 101, name: "Shahi Nizami Royal Banquet", pricePerPerson: 850, popularBadge: "Most Popular for Weddings", desc: "Dum Biryani + Galouti Kebabs + Live Roomali Roti + Double Ka Meetha" },
        { id: 102, name: "Executive Corporate Buffet", pricePerPerson: 580, popularBadge: "Top Rated Corporate", desc: "Chicken Biryani / Veg Pulao + Dal Makhani + Butter Naan + Gulab Jamun" }
      ],
      menuItems: [
        { id: 1001, name: "Hyderabadi Zafrani Mutton Dum Biryani", category: "MAIN_COURSE", dietaryType: "NON_VEG", price: 320 },
        { id: 1002, name: "Paneer Tikka Angara", category: "STARTER", dietaryType: "VEG", price: 140 },
        { id: 1003, name: "Jain Dal Tadka (No Onion / No Garlic)", category: "MAIN_COURSE", dietaryType: "JAIN", price: 110 },
        { id: 1004, name: "Tofu Vegan Shahi Curry", category: "MAIN_COURSE", dietaryType: "VEGAN", price: 130 },
        { id: 1005, name: "Gluten-Free Millet Biryani", category: "MAIN_COURSE", dietaryType: "GLUTEN_FREE", price: 160 },
        { id: 1006, name: "Live Jalebi & Rabdi Counter", category: "LIVE_COUNTER", dietaryType: "VEG", price: 80 }
      ]
    },
    {
      id: 2,
      name: "Dakshin Flavours Banquets",
      description: "Authentic South Indian banana leaf & modern buffet catering with specialized Andhra, Telangana, Chettinad, and Udupi dishes.",
      cuisineTypes: "South Indian, Andhra, Chettinad",
      rating: 4.8,
      ratingCount: 290,
      city: "Hyderabad",
      address: "Near Hitec City MMTS, Madhapur",
      minGuests: 40,
      maxGuests: 1800,
      logoUrl: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=150",
      bannerUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
      packages: [
        { id: 201, name: "Traditional Dakshin Banana Leaf Mahabhojanam", pricePerPerson: 490, popularBadge: "Authentic South Indian", desc: "Gutti Vankaya + Natukodi Pulao / Bagara Rice + Sambar + Rasam + Payasam" }
      ],
      menuItems: [
        { id: 2001, name: "Gutti Vankaya Kura", category: "MAIN_COURSE", dietaryType: "VEG", price: 110 },
        { id: 2002, name: "Andhra Natukodi Vepudu", category: "STARTER", dietaryType: "NON_VEG", price: 190 },
        { id: 2003, name: "Live Dosa & Appam Station", category: "LIVE_COUNTER", dietaryType: "VEG", price: 95 }
      ]
    },
    {
      id: 3,
      name: "Green Leaf Pure Veg & Jain Kitchen",
      description: "100% Pure Vegetarian, Jain-compliant, and Vegan certified catering for auspicious events, religious functions, and eco-friendly galas.",
      cuisineTypes: "Pure Vegetarian, Jain Special, Gujarati",
      rating: 4.95,
      ratingCount: 410,
      city: "Hyderabad",
      address: "Secunderabad Banquet Hub",
      minGuests: 30,
      maxGuests: 3000,
      logoUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=150",
      bannerUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800",
      packages: [
        { id: 301, name: "Satvik Shrestha Jain & Veg Utsav", pricePerPerson: 620, popularBadge: "100% Pure Veg & Jain", desc: "Khandvi + Raw Banana Tikki + Shahi Paneer Jain + Dal Baati Churma" }
      ],
      menuItems: [
        { id: 3001, name: "Jain Shahi Paneer (No Onion/Garlic)", category: "MAIN_COURSE", dietaryType: "JAIN", price: 150 },
        { id: 3002, name: "Raw Banana Galouti Tikki", category: "STARTER", dietaryType: "JAIN", price: 120 },
        { id: 3003, name: "Vegan Almond Milk Kheer", category: "DESSERT", dietaryType: "VEGAN", price: 100 },
        { id: 3004, name: "Live Chaat Counter (Pani Puri & Dahi Bhalla)", category: "LIVE_COUNTER", dietaryType: "VEG", price: 90 }
      ]
    }
  ],
  events: [
    { id: 1, title: "KL University Annual Tech Symposium & Hackathon", expectedGuests: 350, eventDate: "2026-09-15", venue: "Main Auditorium, KL University Campus", budget: 191835, status: "PREPARING" },
    { id: 2, title: "Grand Sangeet & Royal Wedding Dinner", expectedGuests: 600, eventDate: "2026-09-22", venue: "Novotel Convention Centre, Hitec City", budget: 450000, status: "MENU_SELECTED" }
  ],
  orders: [
    {
      id: "ORD-2026-8891",
      eventTitle: "KL University Annual Tech Symposium & Hackathon",
      vendorName: "Royal Feast Grand Caterers",
      guestCount: 350,
      packageSelected: "Executive Corporate Buffet",
      totalAmount: 191835,
      deliveryStatus: "IN_TRANSIT",
      stageIndex: 3,
      stages: ["Order Confirmed", "Kitchen Preparation", "Quality & Thermal Sealed", "In Transit (Cold-Chain Active)", "Delivered & Buffet Set"],
      vehicleTelemetry: {
        tempSalad: 3.8,
        tempMains: 72.4,
        driverName: "Ramesh Kumar",
        driverPhone: "+91 98480 12345",
        vehicleNo: "TS 09 EA 4402",
        gpsLocation: "Near KLH Campus Bowrampet, 1.8 km away",
        etaMinutes: 12
      },
      paymentStatus: "PAID",
      createdAt: new Date().toISOString()
    }
  ]
};

// Request Parser Helper
function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

// JSON Responder Helper
function sendJSON(res, data, statusCode = 200) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data, null, 2));
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  // --- API ROUTING ---
  
  // Eureka Service Discovery Status
  if (pathname === '/api/eureka/status' || pathname === '/eureka/apps') {
    return sendJSON(res, {
      registry: "Netflix Eureka Service Registry",
      environment: "SOA Review-1 Distributed Cluster",
      totalServices: state.services.length,
      services: state.services.map(s => ({
        ...s,
        instances: [`http://localhost:${s.port}/actuator/health`],
        lastHeartbeat: new Date().toISOString()
      }))
    });
  }

  // API Gateway Topology & Status
  if (pathname === '/api/system/status' || pathname === '/api/gateway/routes') {
    return sendJSON(res, {
      gatewayPort: 8080,
      timestamp: new Date().toISOString(),
      routes: [
        { path: "/api/auth/**", service: "AUTH-SERVICE", targetPort: 8081, status: "ROUTING_ACTIVE" },
        { path: "/api/events/**", service: "EVENT-SERVICE", targetPort: 8082, status: "ROUTING_ACTIVE" },
        { path: "/api/vendors/**", service: "VENDOR-SERVICE", targetPort: 8083, status: "ROUTING_ACTIVE" },
        { path: "/api/orders/**", service: "ORDER-SERVICE", targetPort: 8084, status: "ROUTING_ACTIVE" },
        { path: "/api/payments/**", service: "PAYMENT-SERVICE", targetPort: 8085, status: "ROUTING_ACTIVE" },
        { path: "/api/ai/**", service: "AI-EVENT-FOOD-AGENT", targetPort: 3000, status: "ROUTING_ACTIVE" }
      ],
      microservices: state.services
    });
  }

  // AI EVENT FOOD AGENT ENDPOINT
  if (pathname === '/api/ai/chat' && method === 'POST') {
    const body = await parseBody(req);
    const userMessage = body.message || "Plan food for my wedding with 250 guests";
    const eventId = body.eventId || null;
    const aiResponse = await processAiAgentQuery(userMessage, eventId, state);
    return sendJSON(res, aiResponse);
  }

  // AI Config Endpoint
  if (pathname === '/api/ai/config' && method === 'GET') {
    return sendJSON(res, {
      ollamaBaseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
      ollamaModel: process.env.OLLAMA_MODEL || 'llama3',
      architecture: 'SOA Microservices Intelligence Layer',
      supportedIntents: [
        'EVENT_PLANNING', 'BUDGET_ESTIMATION', 'VENDOR_SEARCH', 'VENDOR_COMPARISON',
        'MENU_RECOMMENDATION', 'DIETARY_QUERY', 'ALLERGEN_QUERY', 'ORDER_STATUS',
        'DELIVERY_QUERY', 'PAYMENT_QUERY', 'GENERAL_QUERY', 'UNKNOWN'
      ]
    });
  }

  // Auth: Login
  if (pathname === '/api/auth/login' && method === 'POST') {
    const body = await parseBody(req);
    const user = state.users.find(u => u.email === body.email) || state.users[0];
    return sendJSON(res, {
      status: "SUCCESS",
      message: "Authentication successful via Auth-Service (Port 8081)",
      token: user.token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  }

  // Auth: Users List
  if (pathname === '/api/auth/users' && method === 'GET') {
    return sendJSON(res, state.users);
  }

  // Event: Dynamic Guest Cost Calculator Engine
  if (pathname === '/api/events/estimate-cost' && method === 'POST') {
    const body = await parseBody(req);
    const guests = parseInt(body.guestCount || 100);
    const baseRate = parseFloat(body.pricePerPerson || 580);
    const liveCountersCount = parseInt(body.liveCountersCount || 1);
    const liveCounterRate = liveCountersCount * 80;

    let discountPercentage = 0;
    if (guests >= 1000) discountPercentage = 15;
    else if (guests >= 500) discountPercentage = 10;
    else if (guests >= 200) discountPercentage = 5;

    const rawPerGuest = baseRate + liveCounterRate;
    const subtotal = guests * rawPerGuest;
    const discountAmount = Math.round((subtotal * discountPercentage) / 100);
    const discountedTotal = subtotal - discountAmount;
    const logisticsColdChainFee = guests > 300 ? 3500 : 2000;
    const safetyBufferPlates = Math.ceil(guests * 0.05);
    const safetyBufferCost = safetyBufferPlates * (rawPerGuest * 0.5);
    const grandTotal = Math.round(discountedTotal + logisticsColdChainFee + safetyBufferCost);

    return sendJSON(res, {
      guestCount: guests,
      basePlateRate: baseRate,
      liveCounterAddons: liveCounterRate,
      subtotalBeforeDiscount: subtotal,
      discountPercentage: discountPercentage + "%",
      bulkEconomySavings: discountAmount,
      logisticsColdChainFee: logisticsColdChainFee,
      safetyBufferPlatesRecommended: safetyBufferPlates,
      safetyBufferCostEstimate: Math.round(safetyBufferCost),
      grandTotalEstimate: grandTotal,
      currency: "INR (₹)",
      serviceProvider: "EVENT-SERVICE [Port 8082]"
    });
  }

  // Event: List Events
  if (pathname === '/api/events' && method === 'GET') {
    return sendJSON(res, state.events);
  }

  // Vendors: List All Vendors
  if (pathname === '/api/vendors' && method === 'GET') {
    return sendJSON(res, state.vendors);
  }

  // Vendors: Dietary Filter
  if (pathname.startsWith('/api/vendors/filter') && method === 'GET') {
    const query = parsedUrl.query;
    const diet = query.dietary; // VEG, NON_VEG, JAIN, VEGAN, GLUTEN_FREE
    if (!diet || diet === 'ALL') {
      return sendJSON(res, state.vendors);
    }
    const filtered = state.vendors.map(v => ({
      ...v,
      menuItems: v.menuItems.filter(m => m.dietaryType === diet)
    })).filter(v => v.menuItems.length > 0);
    return sendJSON(res, filtered);
  }

  // Orders: List Orders
  if (pathname === '/api/orders' && method === 'GET') {
    return sendJSON(res, state.orders);
  }

  // Orders: Create Bulk Order
  if (pathname === '/api/orders' && method === 'POST') {
    const body = await parseBody(req);
    const newOrder = {
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      eventTitle: body.eventTitle || "University Cultural Festival",
      vendorName: body.vendorName || "Royal Feast Grand Caterers",
      guestCount: body.guestCount || 250,
      packageSelected: body.packageSelected || "Shahi Nizami Royal Banquet",
      totalAmount: body.totalAmount || 185000,
      deliveryStatus: "PLACED",
      stageIndex: 0,
      stages: ["Order Confirmed", "Kitchen Preparation", "Quality & Thermal Sealed", "In Transit (Cold-Chain Active)", "Delivered & Buffet Set"],
      vehicleTelemetry: {
        tempSalad: 4.0,
        tempMains: 70.0,
        driverName: "Ramesh Kumar",
        driverPhone: "+91 98480 12345",
        vehicleNo: "TS 09 EA 4402",
        gpsLocation: "Kitchen Dispatch Hub, Jubilee Hills",
        etaMinutes: 45
      },
      paymentStatus: "PENDING",
      createdAt: new Date().toISOString()
    };
    state.orders.unshift(newOrder);
    return sendJSON(res, {
      status: "ORDER_PLACED_SUCCESS",
      service: "ORDER-SERVICE [Port 8084]",
      order: newOrder
    }, 201);
  }

  // Orders: Update Status (Kitchen Hub)
  if (pathname.startsWith('/api/orders/') && pathname.endsWith('/status') && method === 'POST') {
    const parts = pathname.split('/');
    const orderId = parts[3];
    const body = await parseBody(req);
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
      order.deliveryStatus = body.status || order.deliveryStatus;
      if (body.stageIndex !== undefined) order.stageIndex = body.stageIndex;
      return sendJSON(res, { status: "STATUS_UPDATED", order });
    }
    return sendJSON(res, { error: "Order not found" }, 404);
  }

  // Payment: Simulation
  if (pathname === '/api/payments/process' && method === 'POST') {
    const body = await parseBody(req);
    const txnId = "TXN-" + Date.now().toString(36).toUpperCase();
    return sendJSON(res, {
      transactionId: txnId,
      orderId: body.orderId || "ORD-2026-8891",
      amountPaid: body.amount || 191835,
      currency: "INR (₹)",
      paymentMode: body.paymentMode || "UPI / NET_BANKING",
      status: "COMPLETED",
      gatewayResponse: "200_SUCCESS_AUTHORIZED",
      invoiceUrl: `/api/payments/invoice/${txnId}`,
      timestamp: new Date().toISOString(),
      processedBy: "PAYMENT-SERVICE [Port 8085]"
    });
  }

  // --- STATIC FILE SERVING ---
  const distDir = path.join(__dirname, 'frontend', 'dist');
  let filePath = path.join(distDir, pathname === '/' ? 'index.html' : pathname);

  // If not found in dist, check root folder
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  }

  // Fallback to dist/index.html or root index.html for Single Page App routing
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    filePath = fs.existsSync(path.join(distDir, 'index.html'))
      ? path.join(distDir, 'index.html')
      : path.join(__dirname, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf'
  };

  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (readErr, content) => {
    if (readErr) {
      res.writeHead(500);
      res.end('Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log('================================================================');
  console.log('  ONLINE FOOD & DELIVERY: EVENT FOOD MANAGEMENT SYSTEM');
  console.log('  SOA Project Review-1 Unified All-in-One Server');
  console.log('  KL Deemed to be University - Department of CSE');
  console.log('  Team: Y Durga Prasad Reddy (2420030281) & Toram Charam (2420030653)');
  console.log('================================================================');
  console.log(`  🚀 All 7 Microservices & Unified Frontend running at:`);
  console.log(`     👉 http://localhost:${PORT}`);
  console.log(`     👉 http://127.0.0.1:${PORT}`);
  console.log('================================================================');
});
