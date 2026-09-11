export const initialVendors = [
  {
    id: 1,
    name: "Royal Feast Grand Caterers",
    description: "Premier luxury event caterer specializing in grand Hyderabadi biryani feasts, royal Mughlai dishes, and live gourmet counters.",
    cuisineTypes: "Hyderabadi, Mughlai, North Indian, Desserts",
    rating: 4.9,
    ratingCount: 340,
    city: "Hyderabad",
    address: "Plot 42, Jubilee Hills, Road No. 36, Hyderabad",
    phone: "+91 9876500001",
    email: "contact@royalfeast.com",
    minGuests: 50,
    maxGuests: 2500,
    logoUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=150",
    bannerUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    isVerified: true,
    isAvailable: true,
    packages: [
      {
        id: 101,
        vendorId: 1,
        vendorName: "Royal Feast Grand Caterers",
        name: "Shahi Nizami Royal Banquet",
        description: "Full 7-course royal feast with authentic Dum Biryani, Galouti Kebabs, Live Roomali Roti counter, and Double Ka Meetha.",
        packageType: "PREMIUM_WEDDING",
        pricePerPerson: 850,
        minGuests: 100,
        includesBeverages: true,
        includesLiveCounters: true,
        includesDessert: true,
        itemsSummary: "3 Starters + 2 Live Counters + Mutton Dum Biryani + Paneer Butter Masala + Mirchi Ka Salan + 3 Desserts",
        popularBadge: "Most Popular for Weddings"
      },
      {
        id: 102,
        vendorId: 1,
        vendorName: "Royal Feast Grand Caterers",
        name: "Executive Grand Corporate Buffet",
        description: "Balanced corporate feast designed for quick high-volume service with hot holding units.",
        packageType: "EXECUTIVE_CORPORATE",
        pricePerPerson: 580,
        minGuests: 50,
        includesBeverages: true,
        includesLiveCounters: false,
        includesDessert: true,
        itemsSummary: "2 Starters + Chicken Biryani / Veg Pulao + Dal Makhani + Butter Naan + Gulab Jamun & Ice Cream",
        popularBadge: "Top Rated Corporate"
      }
    ],
    menuItems: [
      { id: 1001, name: "Hyderabadi Zafrani Mutton Dum Biryani", category: "MAIN_COURSE", dietaryType: "NON_VEG", price: 320, description: "Slow-cooked fragrant basmati rice with tender spiced mutton", isChefSpecial: true },
      { id: 1002, name: "Paneer Tikka Angara", category: "STARTER", dietaryType: "VEG", price: 140, description: "Charcoal-grilled cottage cheese marinated in hung curd and spices", isChefSpecial: false },
      { id: 1003, name: "Galouti Kebab with Sheermal", category: "STARTER", dietaryType: "NON_VEG", price: 180, description: "Melt-in-mouth minced meat kebab served with saffron infused sheermal", isChefSpecial: true },
      { id: 1004, name: "Dal Makhani Peshawari", category: "MAIN_COURSE", dietaryType: "VEG", price: 120, description: "Slow simmered black lentils overnight with butter and cream", isChefSpecial: false },
      { id: 1005, name: "Shahi Tukda with Rabdi", category: "DESSERT", dietaryType: "VEG", price: 90, description: "Crispy fried bread soaked in saffron syrup topped with rich pistachio rabdi", isChefSpecial: true },
      { id: 1006, name: "Live Jalebi & Rabdi Counter", category: "LIVE_COUNTER", dietaryType: "VEG", price: 80, description: "Fresh hot crispy jalebis made live for guests", isChefSpecial: true }
    ]
  },
  {
    id: 2,
    name: "Dakshin Flavours Banquets",
    description: "Authentic South Indian banana leaf & modern buffet catering with specialized Andhra, Telangana, Chettinad, and Udupi dishes.",
    cuisineTypes: "South Indian, Andhra, Chettinad, Traditional",
    rating: 4.8,
    ratingCount: 290,
    city: "Hyderabad",
    address: "Near Hitec City MMTS, Madhapur, Hyderabad",
    phone: "+91 9876500002",
    email: "info@dakshinflavours.com",
    minGuests: 40,
    maxGuests: 1800,
    logoUrl: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=150",
    bannerUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
    isVerified: true,
    isAvailable: true,
    packages: [
      {
        id: 201,
        vendorId: 2,
        vendorName: "Dakshin Flavours Banquets",
        name: "Traditional Dakshin Banana Leaf Mahabhojanam",
        description: "Traditional sit-down or buffet meal with 18 authentic varieties served on banana leaves.",
        packageType: "STANDARD_BUFFET",
        pricePerPerson: 490,
        minGuests: 75,
        includesBeverages: true,
        includesLiveCounters: true,
        includesDessert: true,
        itemsSummary: "Gutti Vankaya + Natukodi Pulao / Bagara Rice + Sambar + Rasam + Poori + Gongura Pachadi + Payasam",
        popularBadge: "Authentic South Indian"
      }
    ],
    menuItems: [
      { id: 2001, name: "Gutti Vankaya Kura", category: "MAIN_COURSE", dietaryType: "VEG", price: 110, description: "Stuffed brinjal curry in a rich peanut and sesame gravy", isChefSpecial: true },
      { id: 2002, name: "Andhra Natukodi Vepudu", category: "STARTER", dietaryType: "NON_VEG", price: 190, description: "Country chicken fry tossed with crushed pepper and curry leaves", isChefSpecial: true },
      { id: 2003, name: "Live Dosa & Appam Station", category: "LIVE_COUNTER", dietaryType: "VEG", price: 95, description: "Hot dosas, appams and stew prepared live", isChefSpecial: true },
      { id: 2004, name: "Semiyan Elaneer Payasam", category: "DESSERT", dietaryType: "VEG", price: 75, description: "Tender coconut and vermicelli payasam infused with cardamom", isChefSpecial: false }
    ]
  },
  {
    id: 3,
    name: "Green Leaf Pure Veg & Jain Kitchen",
    description: "100% Pure Vegetarian, Jain-compliant, and Vegan certified catering for auspicious events, religious functions, and eco-friendly galas.",
    cuisineTypes: "Pure Vegetarian, Jain Special, North Indian, Gujarati, Marwari",
    rating: 4.95,
    ratingCount: 410,
    city: "Hyderabad",
    address: "Secunderabad Banquet Hub, Hyderabad",
    phone: "+91 9876500003",
    email: "orders@greenleafcatering.in",
    minGuests: 30,
    maxGuests: 3000,
    logoUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=150",
    bannerUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800",
    isVerified: true,
    isAvailable: true,
    packages: [
      {
        id: 301,
        vendorId: 3,
        vendorName: "Green Leaf Pure Veg & Jain Kitchen",
        name: "Satvik Shrestha Jain & Veg Utsav",
        description: "Prepared with strict no-root vegetable adherence for Jain items, organic ingredients, and zero artificial colors.",
        packageType: "PREMIUM_WEDDING",
        pricePerPerson: 620,
        minGuests: 50,
        includesBeverages: true,
        includesLiveCounters: true,
        includesDessert: true,
        itemsSummary: "Khandvi + Raw Banana Tikki + Shahi Paneer Jain + Rajasthani Dal Baati Churma + Malpua Rabdi",
        popularBadge: "100% Pure Veg & Jain"
      }
    ],
    menuItems: [
      { id: 3001, name: "Jain Shahi Paneer (No Onion/Garlic)", category: "MAIN_COURSE", dietaryType: "JAIN", price: 150, description: "Creamy tomato & cashew gravy prepared without onion or garlic", isChefSpecial: true },
      { id: 3002, name: "Raw Banana Galouti Tikki", category: "STARTER", dietaryType: "JAIN", price: 120, description: "Spiced raw plantain patties pan-fried in pure ghee", isChefSpecial: true },
      { id: 3003, name: "Vegan Quinoa Veg Bowl", category: "MAIN_COURSE", dietaryType: "VEGAN", price: 130, description: "Organic tri-color quinoa tossed with Mediterranean vegetables", isChefSpecial: false },
      { id: 3004, name: "Live Chaat Counter (Pani Puri & Dahi Bhalla)", category: "LIVE_COUNTER", dietaryType: "VEG", price: 90, description: "Hygienic automatic pani puri dispenser and dahi bhalla", isChefSpecial: true }
    ]
  },
  {
    id: 4,
    name: "Urban Wok & Continental Catering",
    description: "Modern global fusion catering offering Live Pasta, Asian Dim Sum Stations, Gourmet Pizzas, and European Charcuterie.",
    cuisineTypes: "Continental, Pan-Asian, Italian, Mexican, Gourmet Salads",
    rating: 4.75,
    ratingCount: 180,
    city: "Hyderabad",
    address: "Gachibowli Financial District, Hyderabad",
    phone: "+91 9876500004",
    email: "contact@urbanwok.com",
    minGuests: 25,
    maxGuests: 1200,
    logoUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=150",
    bannerUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    isVerified: true,
    isAvailable: true,
    packages: [
      {
        id: 401,
        vendorId: 4,
        vendorName: "Urban Wok & Continental Catering",
        name: "Global Fusion & Live Pasta Experience",
        description: "Perfect for modern celebrations, cocktail evenings, and youthful tech gatherings.",
        packageType: "EXECUTIVE_CORPORATE",
        pricePerPerson: 720,
        minGuests: 40,
        includesBeverages: true,
        includesLiveCounters: true,
        includesDessert: true,
        itemsSummary: "Dim Sum Basket + Live Wood-Fired Pizza + Penne Alfredo / Arrabbiata + Tiramisu & Churros",
        popularBadge: "Trendy & Modern"
      }
    ],
    menuItems: [
      { id: 4001, name: "Live Artisanal Pasta Counter", category: "LIVE_COUNTER", dietaryType: "VEG", price: 140, description: "Choice of Penne/Fettuccine in Alfredo, Pesto or Arrabbiata sauce", isChefSpecial: true },
      { id: 4002, name: "Steamed Edamame & Truffle Dim Sum", category: "STARTER", dietaryType: "VEGAN", price: 160, description: "Crystal dumplings packed with edamame and water chestnuts", isChefSpecial: true },
      { id: 4003, name: "Smoked Herb Chicken Steaks", category: "MAIN_COURSE", dietaryType: "NON_VEG", price: 220, description: "Grilled chicken breast in rosemary jus with garlic mash", isChefSpecial: false },
      { id: 4004, name: "Classic Italian Tiramisu", category: "DESSERT", dietaryType: "VEG", price: 110, description: "Espresso soaked savoiardi with whipped mascarpone cream", isChefSpecial: true }
    ]
  }
];

export const initialEvents = [
  {
    id: 1,
    title: "KL University Annual Tech Symposium & Hackathon",
    eventType: "COLLEGE_FEST",
    organizerId: 1,
    organizerName: "Durga Prasad Reddy",
    organizerEmail: "organizer@eventfood.com",
    eventDate: "2026-09-06",
    deliveryTimeSlot: "12:30 PM - 02:00 PM",
    venueAddress: "Main Auditorium, KL University Bowrampet Campus",
    city: "Hyderabad",
    expectedGuests: 350,
    dietaryRequirements: "VEG,NON_VEG,JAIN",
    cuisinePreferences: "South Indian, North Indian, Desserts",
    status: "PLANNED",
    estimatedBudget: 175000,
    specialInstructions: "Include hot beverage counters and separate Jain food station"
  },
  {
    id: 2,
    title: "Grand Sangeet & Royal Wedding Dinner",
    eventType: "WEDDING",
    organizerId: 1,
    organizerName: "Durga Prasad Reddy",
    organizerEmail: "organizer@eventfood.com",
    eventDate: "2026-09-14",
    deliveryTimeSlot: "07:30 PM - 10:30 PM",
    venueAddress: "Novotel Convention Centre, Hitec City",
    city: "Hyderabad",
    expectedGuests: 600,
    dietaryRequirements: "VEG,NON_VEG,VEGAN,GLUTEN_FREE",
    cuisinePreferences: "Hyderabadi Mughlai, Awadhi, Italian Live Counter, Mocktails",
    status: "MENU_SELECTED",
    estimatedBudget: 450000,
    specialInstructions: "Live chaat and grill counter with dedicated chef staff"
  },
  {
    id: 3,
    title: "FinTech Leadership Executive Summit",
    eventType: "CORPORATE",
    organizerId: 2,
    organizerName: "Toram Charam",
    organizerEmail: "charam@eventfood.com",
    eventDate: "2026-09-03",
    deliveryTimeSlot: "01:00 PM - 02:30 PM",
    venueAddress: "ITC Kohenur, Knowledge City, Madhapur",
    city: "Hyderabad",
    expectedGuests: 120,
    dietaryRequirements: "VEG,NON_VEG,GLUTEN_FREE",
    cuisinePreferences: "Continental, Pan-Asian, Gourmet Salads",
    status: "ORDER_PLACED",
    estimatedBudget: 84000,
    specialInstructions: "Individual pre-packaged premium eco-friendly bento trays"
  }
];

export const initialOrders = [
  {
    id: 1,
    orderNumber: "EFM-2026-0814",
    eventId: 1,
    eventTitle: "KL University Annual Tech Symposium & Hackathon",
    organizerId: 1,
    organizerName: "Durga Prasad Reddy",
    organizerEmail: "organizer@eventfood.com",
    vendorId: 1,
    vendorName: "Royal Feast Grand Caterers",
    guestCount: 350,
    status: "PREPARING",
    totalAmount: 203000,
    discountAmount: 20300,
    taxAmount: 9135,
    grandTotal: 191835,
    deliveryDate: "2026-09-06",
    deliverySlot: "12:30 PM - 02:00 PM",
    deliveryVenue: "Main Auditorium, KL University Bowrampet Campus",
    specialRequests: "Maintain separate temperature controlled insulated food containers for Jain counter",
    paymentStatus: "PAID",
    createdAt: "2026-08-30 08:30",
    updatedAt: "2026-08-30 11:00",
    vehicleTemp: "68°C (Hot Holding Active)",
    driverName: "Suresh Rao (+91 9848011223)",
    vehicleNo: "TS 09 UB 4821",
    items: [
      { id: 1, menuItemId: 1001, itemName: "Hyderabadi Zafrani Mutton Dum Biryani", category: "MAIN_COURSE", dietaryType: "NON_VEG", quantityOrGuests: 200, unitPrice: 320, lineTotal: 64000 },
      { id: 2, menuItemId: 1002, itemName: "Paneer Tikka Angara", category: "STARTER", dietaryType: "VEG", quantityOrGuests: 150, unitPrice: 140, lineTotal: 21000 },
      { id: 3, menuItemId: 1004, itemName: "Dal Makhani Peshawari", category: "MAIN_COURSE", dietaryType: "VEG", quantityOrGuests: 350, unitPrice: 120, lineTotal: 42000 },
      { id: 4, menuItemId: 1006, itemName: "Live Jalebi & Rabdi Counter", category: "LIVE_COUNTER", dietaryType: "VEG", quantityOrGuests: 350, unitPrice: 80, lineTotal: 28000 }
    ]
  },
  {
    id: 2,
    orderNumber: "EFM-2026-0815",
    eventId: 3,
    eventTitle: "FinTech Leadership Executive Summit",
    organizerId: 2,
    organizerName: "Toram Charam",
    organizerEmail: "charam@eventfood.com",
    vendorId: 4,
    vendorName: "Urban Wok & Continental Catering",
    guestCount: 120,
    status: "IN_TRANSIT",
    totalAmount: 86400,
    discountAmount: 4320,
    taxAmount: 4104,
    grandTotal: 86184,
    deliveryDate: "2026-08-30",
    deliverySlot: "01:00 PM - 02:30 PM",
    deliveryVenue: "ITC Kohenur, Knowledge City, Madhapur",
    specialRequests: "Delivery van equipped with GPS live tracking and temperature sensors",
    paymentStatus: "PAID",
    createdAt: "2026-08-30 06:15",
    updatedAt: "2026-08-30 11:10",
    vehicleTemp: "4°C (Cold Chain Salad Compartment) & 70°C (Hot Mains)",
    driverName: "Mohammed Farhan (+91 9700123456)",
    vehicleNo: "TS 07 EA 9012",
    items: [
      { id: 5, menuItemId: 4001, itemName: "Live Artisanal Pasta Counter", category: "LIVE_COUNTER", dietaryType: "VEG", quantityOrGuests: 120, unitPrice: 140, lineTotal: 16800 },
      { id: 6, menuItemId: 4002, itemName: "Steamed Edamame & Truffle Dim Sum", category: "STARTER", dietaryType: "VEGAN", quantityOrGuests: 120, unitPrice: 160, lineTotal: 19200 },
      { id: 7, menuItemId: 4003, itemName: "Smoked Herb Chicken Steaks", category: "MAIN_COURSE", dietaryType: "NON_VEG", quantityOrGuests: 80, unitPrice: 220, lineTotal: 17600 },
      { id: 8, menuItemId: 4004, itemName: "Classic Italian Tiramisu", category: "DESSERT", dietaryType: "VEG", quantityOrGuests: 120, unitPrice: 110, lineTotal: 13200 }
    ]
  }
];

export const soaServicesList = [
  { name: "Eureka Service Registry", port: 8761, url: "http://localhost:8761", description: "Netflix Service Discovery & Registry Instance Locator", status: "UP" },
  { name: "API Gateway Service", port: 8080, url: "http://localhost:8080", description: "Unified Routing, CORS & Load Balanced Microservice Proxy", status: "UP" },
  { name: "Auth & RBAC Service", port: 8081, url: "http://localhost:8081/api/auth/health", description: "JWT Authentication, Role Management & Session Security", status: "UP" },
  { name: "Event Management Service", port: 8082, url: "http://localhost:8082/api/events/health", description: "Event Lifecycle, Guest Profile & Bulk Cost Estimation Engine", status: "UP" },
  { name: "Vendor & Menu Service", port: 8083, url: "http://localhost:8083/api/vendors/health", description: "Caterer Profiles, Packages, Dietary Filters & Menus", status: "UP" },
  { name: "Order Logistics Service", port: 8084, url: "http://localhost:8084/api/orders/health", description: "Bulk Ordering, Timeline Coordination & Status Lifecycle", status: "UP" },
  { name: "Payment & Notification Service", port: 8085, url: "http://localhost:8085/api/payments/health", description: "Transaction Processing, Invoicing & SMS/Email Notification Dispatch", status: "UP" }
];
