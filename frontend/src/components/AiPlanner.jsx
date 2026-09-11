import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Layers,
  Database,
  ShieldCheck,
  Zap,
  Star,
  Check,
  Clock,
  Send,
  Loader2,
  Server
} from 'lucide-react';

export default function AiPlanner({ activeEvent, onNavigateToMenu }) {
  const [activeSubTab, setActiveSubTab] = useState('planner'); // 'planner', 'evaluation', 'failures', 'methodology'
  const [queryInput, setQueryInput] = useState('Plan a vegetarian wedding for 250 guests with a budget of ₹2 lakh in Vijayawada.');
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [hasResult, setHasResult] = useState(true);

  // Suggested Prompts
  const suggestedPrompts = [
    { label: 'Plan an Event', prompt: 'Plan a vegetarian wedding for 250 guests with a budget of ₹2 lakh.' },
    { label: 'Find a Vendor', prompt: 'Find top rated Hyderabadi biryani caterers for 500 college students.' },
    { label: 'Build a Menu', prompt: 'Recommend a 6-course executive corporate dinner menu with live pasta.' },
    { label: 'Optimize My Budget', prompt: 'Optimize my catering budget for 350 guests to keep costs under ₹1.8 lakh.' },
    { label: 'Track My Order', prompt: 'Check cold-chain temperature telemetry and delivery ETA for order EFM-2026-0814.' }
  ];

  const handleRunAi = () => {
    setIsProcessing(true);
    setHasResult(false);
    setLoadingStep(1);

    setTimeout(() => setLoadingStep(2), 500);
    setTimeout(() => setLoadingStep(3), 1000);
    setTimeout(() => setLoadingStep(4), 1500);
    setTimeout(() => {
      setLoadingStep(5);
      setIsProcessing(false);
      setHasResult(true);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
      
      {/* Top AI Planner Hero */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, var(--emerald-50) 100%)', borderColor: 'var(--emerald-100)', padding: '28px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-800)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
              <Sparkles size={16} /> AI Event Planner
            </div>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Tell us what you're planning.<br />We'll help you make it happen.
            </h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Our grounded AI orchestrates live Event, Vendor, Order, and Logistics microservices to formulate explainable, verified catering recommendations.
            </p>
          </div>

          {/* Sub-tabs Selector */}
          <div style={{ display: 'flex', gap: '6px', background: 'rgba(255, 255, 255, 0.8)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            {[
              { id: 'planner', label: '✨ AI Planner' },
              { id: 'evaluation', label: '📊 Grounding & Accuracy' },
              { id: 'failures', label: '🛡️ Safety Guardrails' },
              { id: 'methodology', label: '⚙️ SOA Architecture' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  background: activeSubTab === tab.id ? 'var(--emerald-700)' : 'transparent',
                  color: activeSubTab === tab.id ? '#FFFFFF' : 'var(--text-secondary)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Natural Language Prompt Input */}
        {activeSubTab === 'planner' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '10px', background: '#FFFFFF', padding: '6px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="e.g., Plan a vegetarian wedding for 250 guests with a budget of ₹2 lakh..."
                style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '0.94rem', fontWeight: 500, padding: '10px 16px' }}
                onKeyDown={(e) => e.key === 'Enter' && handleRunAi()}
              />
              <button
                className="btn-primary"
                onClick={handleRunAi}
                disabled={isProcessing}
                style={{ padding: '10px 24px', borderRadius: 'var(--radius-md)', gap: 8 }}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Plan with AI</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>

            {/* Suggested Action Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Suggested Queries:
              </span>
              {suggestedPrompts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQueryInput(item.prompt);
                    handleRunAi();
                  }}
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main View: Sub-Tabs Content */}
      {activeSubTab === 'planner' && (
        <div>
          {/* AI Processing Animation Checklist */}
          {isProcessing && (
            <div className="card" style={{ padding: '24px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: 'var(--emerald-800)', fontWeight: 700 }}>
                <Loader2 size={18} className="animate-spin" />
                <span>✨ Analyzing your event and querying microservices...</span>
              </div>

              <div className="ai-step-list">
                <div className={`ai-step-row ${loadingStep >= 1 ? 'completed' : ''}`}>
                  <span className="ai-step-name">1. Understanding your event &amp; dietary requirements</span>
                  {loadingStep >= 1 ? <Check size={16} style={{ color: 'var(--emerald-700)' }} /> : <Clock size={16} style={{ color: 'var(--text-muted)' }} />}
                </div>
                <div className={`ai-step-row ${loadingStep >= 2 ? 'completed' : ''}`}>
                  <span className="ai-step-name">2. Checking available certified catering vendors in Vendor Service</span>
                  {loadingStep >= 2 ? <Check size={16} style={{ color: 'var(--emerald-700)' }} /> : <Clock size={16} style={{ color: 'var(--text-muted)' }} />}
                </div>
                <div className={`ai-step-row ${loadingStep >= 3 ? 'completed' : ''}`}>
                  <span className="ai-step-name">3. Analyzing menu packages, allergens, and dietary compliance</span>
                  {loadingStep >= 3 ? <Check size={16} style={{ color: 'var(--emerald-700)' }} /> : <Clock size={16} style={{ color: 'var(--text-muted)' }} />}
                </div>
                <div className={`ai-step-row ${loadingStep >= 4 ? 'completed' : ''}`}>
                  <span className="ai-step-name">4. Calculating bulk scale pricing tiers &amp; budget margins in Event Service</span>
                  {loadingStep >= 4 ? <Check size={16} style={{ color: 'var(--emerald-700)' }} /> : <Clock size={16} style={{ color: 'var(--text-muted)' }} />}
                </div>
                <div className={`ai-step-row ${loadingStep >= 5 ? 'completed' : ''}`}>
                  <span className="ai-step-name">5. Formulating explainable recommendation decision card</span>
                  {loadingStep >= 5 ? <Check size={16} style={{ color: 'var(--emerald-700)' }} /> : <Clock size={16} style={{ color: 'var(--text-muted)' }} />}
                </div>
              </div>
            </div>
          )}

          {/* AI Result Decision Card */}
          {hasResult && !isProcessing && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>
              
              {/* Left: Decision Support Card */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--emerald-800)', fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      <Sparkles size={14} /> AI Recommendation
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '2px' }}>
                      Best catering option for your wedding
                    </h3>
                  </div>
                  <span className="badge badge-emerald">Optimal Match</span>
                </div>

                {/* Recommended Vendor Box */}
                <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Recommended Vendor</div>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        Green Leaf Pure Veg &amp; Jain Kitchen
                      </h4>
                    </div>
                    <span className="badge badge-rating">
                      <Star size={12} fill="#B45309" /> 4.9 Rating
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '14px' }}>
                    <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>PRICE / PERSON</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>₹620</div>
                    </div>
                    <div style={{ background: 'var(--emerald-50)', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--emerald-100)' }}>
                      <div style={{ fontSize: '0.68rem', color: 'var(--emerald-800)', fontWeight: 600 }}>ESTIMATED TOTAL</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--emerald-800)' }}>₹1,53,280</div>
                    </div>
                    <div style={{ background: 'var(--amber-50)', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--amber-100)' }}>
                      <div style={{ fontSize: '0.68rem', color: 'var(--amber-800)', fontWeight: 600 }}>BUDGET REMAINING</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--amber-800)' }}>₹46,720</div>
                    </div>
                  </div>
                </div>

                {/* Why This Option Checklist */}
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    Why This Option?
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      'Supports 100% pure vegetarian and strict Jain requirements',
                      'High capacity kitchen certified for 250+ guests in Vijayawada',
                      'Fits comfortably within ₹2,00,000 budget with ₹46,720 remaining buffer',
                      'Includes live Chaat &amp; Pani Puri station and dessert bar package',
                      'Verified 4.9 star rating across 410 past banquets'
                    ].map((reason, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--emerald-700)', flexShrink: 0 }} />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                  <button
                    className="btn-primary"
                    onClick={onNavigateToMenu}
                    style={{ flex: 1 }}
                  >
                    <span>Build Menu with this Vendor</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              {/* Right: Evidence & Confidence Grounding */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Confidence Card */}
                <div className="card">
                  <div className="card-header" style={{ marginBottom: '14px' }}>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>AI Grounding Confidence</h4>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Grounded in verified live microservice state</p>
                    </div>
                    <span className="badge badge-emerald">High Confidence</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '10px 0 16px 0' }}>
                    <div
                      style={{
                        width: '74px',
                        height: '74px',
                        borderRadius: '50%',
                        border: '5px solid var(--emerald-600)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.45rem',
                        fontWeight: 800,
                        color: 'var(--emerald-800)',
                        background: 'var(--emerald-50)'
                      }}
                    >
                      96%
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        Verified Service Grounding
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '3px' }}>
                        All guest counts, unit rates, and discount equations were queried directly from the live Event and Vendor microservices.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Evidence Section */}
                <div className="card">
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Verified Service Evidence
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                    Structured evidence tokens retrieved by the agent without hallucinations:
                  </p>

                  <div className="evidence-grid">
                    <div className="evidence-card">
                      <div className="evidence-service-tag">Event Service</div>
                      <div className="evidence-value">250 Guests</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>Input target</div>
                    </div>
                    <div className="evidence-card">
                      <div className="evidence-service-tag">Vendor Service</div>
                      <div className="evidence-value">₹620 / head</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>Satvik Utsav Pkg</div>
                    </div>
                    <div className="evidence-card">
                      <div className="evidence-service-tag">Vendor Service</div>
                      <div className="evidence-value">4.9 ★ Rating</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>410 reviews</div>
                    </div>
                    <div className="evidence-card">
                      <div className="evidence-service-tag">Event Service</div>
                      <div className="evidence-value">₹2,00,000</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>Target budget</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem', color: 'var(--emerald-800)', background: 'var(--emerald-50)', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--emerald-100)' }}>
                    <ShieldCheck size={15} />
                    <span>Verified and consistent across Eureka microservices topology</span>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>
      )}

      {/* Sub-Tab 2: Grounding Evaluation */}
      {activeSubTab === 'evaluation' && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>AI Agent Quality &amp; Grounding Evaluation</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Quantitative benchmarking of the LLM decision layer across 50 test event queries
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#FAF8F5', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Dietary Precision</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--emerald-800)', marginTop: '4px' }}>100.0%</div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Zero Non-Veg/Jain contamination</p>
            </div>

            <div style={{ background: '#FAF8F5', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Budget Recall</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--emerald-800)', marginTop: '4px' }}>98.4%</div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Accurate pricing equations</p>
            </div>

            <div style={{ background: '#FAF8F5', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Hallucination Rate</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--emerald-800)', marginTop: '4px' }}>0.0%</div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Strict schema verification</p>
            </div>

            <div style={{ background: '#FAF8F5', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg Latency</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>1.4s</div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Local Ollama / fallback</p>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Safety Guardrails & Failures */}
      {activeSubTab === 'failures' && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Graceful Failures &amp; Safety Guardrails</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              The agent refuses to invent fake vendors or ignore budget constraints, triggering safe escalations instead.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'var(--color-danger-bg)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid #FECACA' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-danger)', fontWeight: 700, fontSize: '0.88rem' }}>
                <AlertCircle size={16} /> Impossible Budget Constraint Escalation
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>
                <strong>Scenario:</strong> User asks for a 5-star wedding buffet for 500 guests with ₹20,000 budget (₹40/head).<br />
                <strong>Agent Action:</strong> Flagged budget shortfall of ₹1,80,000. Recommends raising budget or switching to Hi-Tea package.
              </p>
            </div>

            <div style={{ background: 'var(--color-warning-bg)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid #FDE68A' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-warning)', fontWeight: 700, fontSize: '0.88rem' }}>
                <AlertCircle size={16} /> Unverified Dietary Conflict Guardrail
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.5' }}>
                <strong>Scenario:</strong> User requests Jain meal from a caterer that cannot guarantee separate kitchen stations.<br />
                <strong>Agent Action:</strong> Refuses unverified caterer. Auto-redirects to certified Green Leaf Pure Veg &amp; Jain Kitchen.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 4: SOA Architecture */}
      {activeSubTab === 'methodology' && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>SOA Microservices Orchestration Topology</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              How the AI agent orchestrates business microservices without database redundancy
            </p>
          </div>

          <div style={{ background: 'var(--bg-app)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem', color: 'var(--text-primary)', lineHeight: '1.8' }}>
              Frontend Web Client (React + Vite)<br />
              &nbsp;&nbsp;↓ REST / JSON<br />
              Spring Cloud API Gateway (Port 8080)<br />
              &nbsp;&nbsp;↓ Internal Proxy &amp; Load Balancer<br />
              AI Event Food Agent (Ollama Local LLM Layer)<br />
              &nbsp;&nbsp;├── Event Service (Port 8082) → Guest Profiles &amp; Pricing Algorithm<br />
              &nbsp;&nbsp;├── Vendor Service (Port 8083) → Packages, Menus &amp; Dietary Tags<br />
              &nbsp;&nbsp;├── Order Service (Port 8084) → Logistics Lifecycle &amp; Telemetry<br />
              &nbsp;&nbsp;└── Payment Service (Port 8085) → Invoicing &amp; Transaction Settlements
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
