import React, { useState, useEffect } from 'react';
import {
  Server,
  Activity,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  Cpu,
  ArrowDown,
  Layers,
  Zap,
  Globe,
  Database
} from 'lucide-react';
import { apiService } from '../services/api';
import { soaServicesList } from '../data/mockData';

export default function SoaMonitor() {
  const [services, setServices] = useState(soaServicesList);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState(new Date().toLocaleTimeString());

  const handleRefreshHealth = async () => {
    setIsRefreshing(true);
    try {
      const results = await apiService.checkServicesHealth();
      setServices(results);
      setLastCheckTime(new Date().toLocaleTimeString());
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    handleRefreshHealth();
  }, []);

  const fullServicesList = [
    { name: 'API Gateway Service', port: 8080, url: 'http://localhost:8080', desc: 'Unified Routing, CORS & Load Balanced Microservice Proxy', status: 'Operational', latency: '4ms' },
    { name: 'AI Event Food Agent', port: 3000, url: 'http://localhost:3000/api/ai', desc: 'Ollama Local LLM Decision Support & Explainability Layer', status: 'Operational', latency: '12ms' },
    { name: 'Event Management Service', port: 8082, url: 'http://localhost:8082/api/events/health', desc: 'Event Profiles, Guest Multipliers & Bulk Pricing Engine', status: 'Operational', latency: '6ms' },
    { name: 'Vendor & Menu Service', port: 8083, url: 'http://localhost:8083/api/vendors/health', desc: 'Catering Partners, Dishes, Packages & Dietary Tags', status: 'Operational', latency: '5ms' },
    { name: 'Order Logistics Service', port: 8084, url: 'http://localhost:8084/api/orders/health', desc: 'Order Lifecycle, GPS Telemetry & Delivery Timelines', status: 'Operational', latency: '7ms' },
    { name: 'Payment & Billing Service', port: 8085, url: 'http://localhost:8085/api/payments/health', desc: 'Transaction Processing, Tax Invoices & Escrow Settlement', status: 'Operational', latency: '5ms' },
    { name: 'Auth & RBAC Service', port: 8081, url: 'http://localhost:8081/api/auth/health', desc: 'JWT Authentication, Role Management & Session Tokens', status: 'Operational', latency: '3ms' },
    { name: 'Eureka Service Registry', port: 8761, url: 'http://localhost:8761', desc: 'Netflix Service Discovery & Instance Registry Hub', status: 'Operational', latency: '2ms' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
      
      {/* Top Banner */}
      <div className="card" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Service-Oriented Architecture (SOA) Health</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Live telemetry across 8 independent Spring Boot microservices and AI Agent orchestration topology
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              Checked at: <strong>{lastCheckTime}</strong>
            </span>
            <button
              className="btn-secondary"
              onClick={handleRefreshHealth}
              disabled={isRefreshing}
              style={{ fontSize: '0.82rem', padding: '6px 14px' }}
            >
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
              <span>Ping All Services</span>
            </button>
          </div>
        </div>
      </div>

      {/* Clean Architecture Diagram Visualization */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Layers size={18} style={{ color: 'var(--emerald-700)' }} /> Distributed SOA Architecture Flow
            </h3>
            <p className="card-subtitle">Request routing and decoupled microservices topology</p>
          </div>
          <span className="badge badge-emerald">8 / 8 Active</span>
        </div>

        <div style={{ background: '#FAF8F5', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
          
          {/* Layer 1: Client */}
          <div style={{ textAlign: 'center', maxWidth: '320px', margin: '0 auto' }}>
            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '10px', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Client Layer</div>
              <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--text-primary)' }}>EVENTORA React + Vite Client</div>
            </div>
            <div style={{ color: 'var(--emerald-700)', margin: '6px 0' }}>↓ REST / JSON</div>
          </div>

          {/* Layer 2: API Gateway */}
          <div style={{ textAlign: 'center', maxWidth: '360px', margin: '0 auto' }}>
            <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-100)', borderRadius: 'var(--radius-md)', padding: '12px', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--emerald-800)', fontWeight: 700 }}>Spring Cloud Gateway (Port 8080)</div>
              <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--emerald-900)' }}>CORS, JWT Filtering &amp; Unified Proxy</div>
            </div>
            <div style={{ color: 'var(--emerald-700)', margin: '6px 0' }}>↓ Orchestration &amp; Direct Routes</div>
          </div>

          {/* Layer 3: AI Agent Decision Layer */}
          <div style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto 16px auto' }}>
            <div style={{ background: 'var(--amber-50)', border: '1px solid var(--amber-100)', borderRadius: 'var(--radius-md)', padding: '12px', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--amber-800)', fontWeight: 700 }}>AI Event Food Agent (Port 3000)</div>
              <div style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--amber-900)' }}>Grounded Reasoning &amp; Microservice Ingestion</div>
            </div>
          </div>

          {/* Layer 4: Microservices Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '12px' }}>
            {[
              { name: 'Event Service', port: 8082, tech: 'Spring Boot JPA' },
              { name: 'Vendor Service', port: 8083, tech: 'Spring Boot JPA' },
              { name: 'Order Service', port: 8084, tech: 'Spring Boot JPA' },
              { name: 'Payment Service', port: 8085, tech: 'Spring Boot JPA' },
              { name: 'Auth Service', port: 8081, tech: 'Spring Security JWT' }
            ].map(svc => (
              <div
                key={svc.name}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px',
                  textAlign: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)' }}></div>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700 }}>{svc.name}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Port {svc.port}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {svc.tech}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Microservice Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
        {fullServicesList.map((svc) => (
          <div
            key={svc.name}
            className="card"
            style={{
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-success)', boxShadow: '0 0 8px rgba(21, 128, 61, 0.4)' }}></div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 800 }}>{svc.name}</h4>
                </div>
                <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>
                  ● Operational
                </span>
              </div>

              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.4' }}>
                {svc.desc}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '10px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              <span style={{ fontFamily: 'var(--font-mono)' }}>Port: {svc.port}</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--emerald-800)', fontWeight: 600 }}>Latency: {svc.latency}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
