# Online Food & Delivery: Event Food Management System
## Service-Oriented Architecture (SOA) & Microservices Project — Review-1

**KL Deemed to be University**  
Department of Computer Science and Engineering — KLH Bowrampet Campus  
**Guide**: Mrs. R. Navyatha (Associate Professor, CSE)  
**Team Members**:
- **Y Durga Prasad Reddy** (Roll No: 2420030281)
- **Toram Charam** (Roll No: 2420030653)

---

## 🏛️ Project Architecture

```
                          ┌───────────────────────────┐
                          │   Frontend Web App (SPA)  │
                          │ (React + Vite / Modern UI)│
                          └─────────────┬─────────────┘
                                        │ HTTP / REST (Port 3000 / 5173)
                                        ▼
                          ┌───────────────────────────┐
                          │   API Gateway (Port 8080) │
                          │   (Spring Cloud Gateway)  │
                          └──────┬─────────────┬──────┘
                                 │             │
        ┌────────────────────────┼─────────────┼────────────────────────┐
        │                        │             │                        │
        ▼                        ▼             ▼                        ▼
┌───────────────┐        ┌───────────────┐ ┌───────────────┐    ┌───────────────┐
│ Auth Service  │        │ Event Service │ │Vendor Service │    │ Order Service │
│  (Port 8081)  │        │  (Port 8082)  │ │  (Port 8083)  │    │  (Port 8084)  │
└───────┬───────┘        └───────┬───────┘ └───────┬───────┘    └───────┬───────┘
        │                        │                 │                    │
        └────────────────────────┼─────────────────┼────────────────────┘
                                 │                 │
                                 ▼                 ▼
                          ┌───────────────┐ ┌──────────────────────────┐
                          │Payment Service│ │  Eureka Service Registry │
                          │  (Port 8085)  │ │       (Port 8761)        │
                          └───────────────┘ └──────────────────────────┘
```

---

## 📁 Repository Structure

```
event-food-management/
│
├── pom.xml                                   # Root Maven multi-module configuration
├── start-all.bat / start-all.ps1             # 1-click startup scripts
├── start-frontend.bat                        # Frontend launcher
├── build-all.bat                             # Full ecosystem build script
│
├── eureka-server/                            # [Port 8761] Netflix Eureka Service Discovery
├── api-gateway/                              # [Port 8080] Spring Cloud API Gateway & Reverse Proxy
├── auth-service/                             # [Port 8081] JWT Auth & Role-Based Access Control
├── event-service/                            # [Port 8082] Event Profiles & Dynamic Guest Cost Engine
├── vendor-service/                           # [Port 8083] Caterer Onboarding, Packages & Menus
├── order-service/                            # [Port 8084] Bulk Event Orders & Delivery Stepper
├── payment-service/                          # [Port 8085] Payment Simulation & Digital Invoicing
└── frontend/                                 # [Port 3000] Modern React + Vite Single Page Application
```

---

## ⚡ Quick Start

### 1. Launch All Microservices & Frontend (1-Click)
Run either:
- **Batch script**: Double-click `start-all.bat`
- **PowerShell**: `./start-all.ps1`

### 2. Access the Ecosystem
- **Web Application**: [http://localhost:3000](http://localhost:3000)
- **API Gateway**: [http://localhost:8080](http://localhost:8080)
- **Eureka Service Registry**: [http://localhost:8761](http://localhost:8761)

---

## 🎯 Key Innovation & Review-1 Features

1. **Guest-Count Cost Estimator**:
   - Interactive slider calculating per-plate base rate, live counter add-ons, bulk economy-of-scale discounts (5% to 15%), cold-chain logistics fees, and safety buffer plates.
2. **Dietary Integrity Filtering**:
   - Tagging and isolation of `VEG`, `NON_VEG`, `JAIN` (no onion/garlic/root veg), `VEGAN`, and `GLUTEN_FREE` dishes across catering packages.
3. **Real-time Order Logistics Tracker**:
   - 5-stage delivery lifecycle stepper with vehicle temperature sensor telemetry (`4°C` salad cold chain / `70°C` hot mains) and driver GPS fleet tracking.
4. **Vendor Kitchen Management Hub**:
   - Dedicated kitchen dashboard for caterers to update food preparation states (`PLACED` -> `PREPARING` -> `IN_TRANSIT` -> `DELIVERED`).
5. **SOA Topology Monitor**:
   - Live architectural status dashboard querying Eureka and all 5 backend microservices with graceful demo fallback mode.
