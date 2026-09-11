import React, { useState, useEffect } from 'react';
import { Server, Activity, ShieldCheck, RefreshCw, Cpu, Layers, GitFork, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import { apiService } from '../services/api';
import { soaServicesList } from '../data/mockData';

export default function SoaMonitor() {
  const [services, setServices] = useState(soaServicesList);
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState(new Date().toLocaleTimeString());

  const checkHealth = async () => {
    setIsChecking(true);
    const updated = await apiService.checkServicesHealth();
    setServices(updated);
    setIsChecking(false);
    setLastChecked(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div className="glass-card" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Server size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>SOA Microservices Registry &amp; Topology</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                System Architecture • Netflix Eureka Discovery &amp; Spring Cloud Gateway
              </p>
            </div>
          </div>

          <button
            className="btn-secondary"
            onClick={checkHealth}
            disabled={isChecking}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <RefreshCw size={14} className={isChecking ? 'spin-anim' : ''} />
            <span>{isChecking ? 'Pinging Services...' : 'Refresh Health Checks'}</span>
          </button>
        </div>
      </div>

      {/* Services Topology Cards Grid */}
      <div className="soa-services-grid">
        {services.map((srv, idx) => (
          <div key={idx} className="soa-service-card">
            <div className="soa-service-header">
              <div className="soa-service-name">{srv.name}</div>
              <div className="soa-service-port">:{srv.port}</div>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 12, minHeight: 36 }}>
              {srv.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10 }}>
              <div className={`status-indicator ${srv.status === 'UP' ? 'status-up' : 'status-waiting'}`}>
                <span className="status-dot"></span>
                <span>{srv.status}</span>
              </div>

              <span style={{ fontSize: '0.72rem', color: '#818cf8', fontFamily: 'var(--font-mono)' }}>
                localhost:{srv.port}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Microservice Specifications Matrix */}
      <div className="glass-card">
        <div className="glass-card-header">
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>SOA Microservice Specifications &amp; Routing Matrix</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>API Gateway route mappings and service capabilities</p>
          </div>
          <span className="badge-pill badge-live">
            7 Services Active
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px 12px' }}>Microservice</th>
                <th style={{ padding: '10px 12px' }}>Port</th>
                <th style={{ padding: '10px 12px' }}>Gateway Route</th>
                <th style={{ padding: '10px 12px' }}>Key REST Endpoints</th>
                <th style={{ padding: '10px 12px' }}>Technology Stack</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '10px 12px', fontWeight: 700, color: 'white' }}>eureka-server</td>
                <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>8761</td>
                <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>Discovery Hub</td>
                <td style={{ padding: '10px 12px' }}><code>/eureka/apps</code>, <code>/eureka/status</code></td>
                <td style={{ padding: '10px 12px', color: '#a5b4fc' }}>Spring Cloud Netflix Eureka</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '10px 12px', fontWeight: 700, color: 'white' }}>api-gateway</td>
                <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>8080</td>
                <td style={{ padding: '10px 12px', color: '#34d399' }}>/api/**</td>
                <td style={{ padding: '10px 12px' }}>CORS, Load Balancing, Service Proxy</td>
                <td style={{ padding: '10px 12px', color: '#a5b4fc' }}>Spring Cloud Gateway + LoadBalancer</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '10px 12px', fontWeight: 700, color: 'white' }}>auth-service</td>
                <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>8081</td>
                <td style={{ padding: '10px 12px', color: '#34d399' }}>/api/auth/**</td>
                <td style={{ padding: '10px 12px' }}><code>POST /register</code>, <code>POST /login</code>, <code>GET /validate</code></td>
                <td style={{ padding: '10px 12px', color: '#a5b4fc' }}>Spring Security + JJWT + JPA</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '10px 12px', fontWeight: 700, color: 'white' }}>event-service</td>
                <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>8082</td>
                <td style={{ padding: '10px 12px', color: '#34d399' }}>/api/events/**</td>
                <td style={{ padding: '10px 12px' }}><code>POST /</code>, <code>POST /estimate-cost</code>, <code>PUT /{id}/status</code></td>
                <td style={{ padding: '10px 12px', color: '#a5b4fc' }}>Spring Boot + H2 JPA + Actuator</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '10px 12px', fontWeight: 700, color: 'white' }}>vendor-service</td>
                <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>8083</td>
                <td style={{ padding: '10px 12px', color: '#34d399' }}>/api/vendors/**</td>
                <td style={{ padding: '10px 12px' }}><code>GET /</code>, <code>GET /{id}/packages</code>, <code>GET /{id}/menu-items</code></td>
                <td style={{ padding: '10px 12px', color: '#a5b4fc' }}>Spring Boot + JPA + RestTemplate</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '10px 12px', fontWeight: 700, color: 'white' }}>order-service</td>
                <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>8084</td>
                <td style={{ padding: '10px 12px', color: '#34d399' }}>/api/orders/**</td>
                <td style={{ padding: '10px 12px' }}><code>POST /</code>, <code>PUT /{id}/status</code>, <code>GET /number/{num}</code></td>
                <td style={{ padding: '10px 12px', color: '#a5b4fc' }}>Spring Boot + JPA Transactions</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 12px', fontWeight: 700, color: 'white' }}>payment-service</td>
                <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>8085</td>
                <td style={{ padding: '10px 12px', color: '#34d399' }}>/api/payments/**</td>
                <td style={{ padding: '10px 12px' }}><code>POST /process</code>, <code>GET /invoice/{id}</code>, <code>POST /notify</code></td>
                <td style={{ padding: '10px 12px', color: '#a5b4fc' }}>Spring Boot + Mock Gateway + Notifications</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
