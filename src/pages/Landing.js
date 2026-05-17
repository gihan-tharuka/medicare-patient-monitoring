import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-vh-100 d-flex flex-column overflow-hidden">
      {/* Navigation Bar - Glassmorphism */}
      <nav className="navbar navbar-hero navbar-expand-lg navbar-dark sticky-top">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-heart-pulse"></i>
            MediSys
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link active">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <a href="#features" className="nav-link">Features</a>
              </li>
              <li className="nav-item">
                <a href="#stats" className="nav-link">Performance</a>
              </li>
              <li className="nav-item">
                <a href="#tech" className="nav-link">Technology</a>
              </li>
              <li className="nav-item">
                <a href="#cta" className="nav-link">Get Started</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section text-white position-relative">
        {/* Floating Background Blobs */}
        <div className="floating-shapes">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>

        {/* Floating Medical Elements */}
        <div className="floating-medical-elements d-none d-lg-block">
          <div className="floating-medical-item">
            <i className="bi bi-activity"></i>
          </div>
          <div className="floating-medical-item">
            <i className="bi bi-graph-up-arrow"></i>
          </div>
          <div className="floating-medical-item">
            <i className="bi bi-heart"></i>
          </div>
        </div>

        <div className="container">
          <div className="row align-items-center min-vh-100 py-5">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1 className="hero-title mb-4">
                  <span className="text-gradient">Next-Gen</span>{' '}
                  Patient Monitoring
                </h1>
                <p className="hero-subtitle mb-4">
                  Experience the future of healthcare with our advanced patient monitoring system.
                  Real-time vital tracking, intelligent alerts powered by AI, and comprehensive 
                  analytics for better patient outcomes.
                </p>
                <div className="hero-actions d-flex gap-3 flex-wrap mb-4">
                  <Link to="/login" className="btn-hero-primary">
                    <i className="bi bi-rocket-takeoff"></i>
                    Get Started Free
                  </Link>
                  <Link to="/login" className="btn-hero-secondary">
                    <i className="bi bi-play-circle"></i>
                    Watch Demo
                  </Link>
                </div>
                <div className="d-flex align-items-center gap-4 hero-actions" style={{ animationDelay: '0.8s' }}>
                  <div className="d-flex align-items-center gap-2">
                    <div className="d-flex">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="rounded-circle border border-white border-2"
                          style={{
                            width: 32,
                            height: 32,
                            background: `linear-gradient(135deg, hsl(${i * 60}, 70%, 60%), hsl(${i * 60 + 30}, 70%, 50%))`,
                            marginLeft: i > 1 ? '-8px' : '0',
                          }}
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                      Trusted by <strong style={{ color: 'rgba(255,255,255,0.9)' }}>50+</strong> healthcare providers
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-visual">
                <div className="hero-visual-inner">
                  {/* Animated Heart Rate SVG */}
                  <div className="heart-rate-container">
                    <svg
                      className="heart-rate-svg"
                      viewBox="0 0 380 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Grid lines */}
                      <line x1="0" y1="30" x2="380" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                      <line x1="0" y1="60" x2="380" y2="60" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                      <line x1="0" y1="90" x2="380" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

                      {/* Heart rate line */}
                      <path
                        className="heart-rate-line"
                        d="M 0 60 L 50 60 L 65 60 L 75 30 L 85 90 L 95 50 L 105 70 L 115 55 L 125 65 L 135 58 L 145 62 L 155 60 L 175 60 L 190 20 L 205 100 L 215 40 L 225 80 L 235 50 L 245 70 L 255 55 L 265 65 L 275 60 L 300 60 L 320 60 L 340 35 L 355 85 L 365 55 L 380 60"
                        stroke="url(#heartGradient)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Glow effect behind line */}
                      <path
                        d="M 0 60 L 50 60 L 65 60 L 75 30 L 85 90 L 95 50 L 105 70 L 115 55 L 125 65 L 135 58 L 145 62 L 155 60 L 175 60 L 190 20 L 205 100 L 215 40 L 225 80 L 235 50 L 245 70 L 255 55 L 265 65 L 275 60 L 300 60 L 320 60 L 340 35 L 355 85 L 365 55 L 380 60"
                        stroke="rgba(102, 126, 234, 0.2)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="heart-rate-line"
                        style={{ animationDelay: '0.9s' }}
                      />

                      {/* Pulsing dot at end */}
                      <circle cx="380" cy="60" r="4" fill="#667eea" className="heart-pulse-dot" />
                      <circle cx="380" cy="60" r="12" fill="rgba(102, 126, 234, 0.2)" className="heart-pulse-glow" />

                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id="heartGradient" x1="0" y1="0" x2="380" y2="0">
                          <stop offset="0%" stopColor="#667eea" />
                          <stop offset="50%" stopColor="#764ba2" />
                          <stop offset="100%" stopColor="#e94560" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Animated Vital Sign Cards */}
                  <div className="vital-cards">
                    <div className="vital-card">
                      <i className="bi bi-heart-pulse vital-card-icon" style={{ color: '#f87171' }}></i>
                      <span className="vital-card-value">72 <small style={{fontSize:'0.6rem', fontWeight:400, opacity:0.6}}>bpm</small></span>
                      <span className="vital-card-label">Heart Rate</span>
                      <span className="vital-card-status online"></span>
                    </div>
                    <div className="vital-card">
                      <i className="bi bi-droplet vital-card-icon" style={{ color: '#60a5fa' }}></i>
                      <span className="vital-card-value">98<small style={{fontSize:'0.6rem', fontWeight:400, opacity:0.6}}>%</small></span>
                      <span className="vital-card-label">SpO₂</span>
                      <span className="vital-card-status online"></span>
                    </div>
                    <div className="vital-card">
                      <i className="bi bi-speedometer2 vital-card-icon" style={{ color: '#34d399' }}></i>
                      <span className="vital-card-value">120/80</span>
                      <span className="vital-card-label">Blood Pressure</span>
                      <span className="vital-card-status online"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="scroll-indicator" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
          <span className="scroll-indicator-text">Scroll</span>
          <div className="scroll-chevron"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section py-5 position-relative overflow-hidden">
        <div className="features-bg-shapes">
          <div className="features-bg-shape features-bg-shape-1"></div>
          <div className="features-bg-shape features-bg-shape-2"></div>
          <div className="features-bg-shape features-bg-shape-3"></div>
        </div>

        <div className="container position-relative">
          <div className="text-center mb-5">
            <span className="features-badge d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3">
              <i className="bi bi-lightning-charge"></i>
              Core Capabilities
            </span>
            <h2 className="features-heading display-5 fw-bold mb-3">
              Powerful Features
            </h2>
            <p className="features-subtitle lead mx-auto" style={{ maxWidth: '600px' }}>
              Everything you need to monitor patient health effectively — from real-time tracking to AI-powered insights.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="feature-card-modern">
                <div className="feature-card-inner">
                  <div className="feature-card-bg"></div>
                  <div className="feature-card-glow"></div>
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon-circle feature-icon-purple">
                      <i className="bi bi-speedometer2"></i>
                    </div>
                  </div>
                  <h3 className="feature-card-title">Real-time Monitoring</h3>
                  <p className="feature-card-desc">
                    Track vital signs continuously with instant updates. Our system processes data in milliseconds, ensuring you never miss a critical change.
                  </p>
                  <div className="feature-card-stats">
                    <div className="feature-stat">
                      <span className="feature-stat-value">{'<100ms'}</span>
                      <span className="feature-stat-label">Response Time</span>
                    </div>
                    <div className="feature-stat-divider"></div>
                    <div className="feature-stat">
                      <span className="feature-stat-value">24/7</span>
                      <span className="feature-stat-label">Coverage</span>
                    </div>
                  </div>
                  <div className="feature-card-arrow">
                    <i className="bi bi-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="feature-card-modern feature-card-delay-1">
                <div className="feature-card-inner">
                  <div className="feature-card-bg"></div>
                  <div className="feature-card-glow"></div>
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon-circle feature-icon-coral">
                      <i className="bi bi-exclamation-triangle"></i>
                    </div>
                  </div>
                  <h3 className="feature-card-title">Smart Alerts</h3>
                  <p className="feature-card-desc">
                    Get notified immediately when vital signs deviate from normal ranges. Our AI filters false positives so you focus on what matters.
                  </p>
                  <div className="feature-card-stats">
                    <div className="feature-stat">
                      <span className="feature-stat-value">99%</span>
                      <span className="feature-stat-label">Accuracy</span>
                    </div>
                    <div className="feature-stat-divider"></div>
                    <div className="feature-stat">
                      <span className="feature-stat-value">10K+</span>
                      <span className="feature-stat-label">Handled</span>
                    </div>
                  </div>
                  <div className="feature-card-arrow">
                    <i className="bi bi-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="feature-card-modern feature-card-delay-2">
                <div className="feature-card-inner">
                  <div className="feature-card-bg"></div>
                  <div className="feature-card-glow"></div>
                  <div className="feature-icon-wrapper">
                    <div className="feature-icon-circle feature-icon-emerald">
                      <i className="bi bi-graph-up"></i>
                    </div>
                  </div>
                  <h3 className="feature-card-title">Advanced Analytics</h3>
                  <p className="feature-card-desc">
                    Comprehensive data analysis with rich visualizations. Identify trends, predict outcomes, and make data-driven decisions for better care.
                  </p>
                  <div className="feature-card-stats">
                    <div className="feature-stat">
                      <span className="feature-stat-value">15+</span>
                      <span className="feature-stat-label">Metrics</span>
                    </div>
                    <div className="feature-stat-divider"></div>
                    <div className="feature-stat">
                      <span className="feature-stat-value">AI</span>
                      <span className="feature-stat-label">Powered</span>
                    </div>
                  </div>
                  <div className="feature-card-arrow">
                    <i className="bi bi-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="features-bottom-row row g-3 mt-4 justify-content-center">
            <div className="col-6 col-md-3">
              <div className="feature-pill d-flex align-items-center gap-2">
                <div className="feature-pill-dot" style={{ background: '#667eea' }}></div>
                <span className="feature-pill-text">HIPAA Compliant</span>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="feature-pill d-flex align-items-center gap-2">
                <div className="feature-pill-dot" style={{ background: '#34d399' }}></div>
                <span className="feature-pill-text">Real-time Sync</span>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="feature-pill d-flex align-items-center gap-2">
                <div className="feature-pill-dot" style={{ background: '#f87171' }}></div>
                <span className="feature-pill-text">Emergency Alerts</span>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="feature-pill d-flex align-items-center gap-2">
                <div className="feature-pill-dot" style={{ background: '#fbbf24' }}></div>
                <span className="feature-pill-text">Export Reports</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Performance Section */}
      <section id="stats" className="stats-section py-5 position-relative overflow-hidden">
        <div className="stats-bg-shapes">
          <div className="stats-bg-circle stats-bg-circle-1"></div>
          <div className="stats-bg-circle stats-bg-circle-2"></div>
          <div className="stats-bg-circle stats-bg-circle-3"></div>
          <div className="stats-bg-circle stats-bg-circle-4"></div>
        </div>

        <div className="container position-relative">
          <div className="text-center mb-5">
            <span className="stats-badge d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3">
              <i className="bi bi-bar-chart-line"></i>
              Real-time Metrics
            </span>
            <h2 className="stats-heading display-5 fw-bold mb-3">
              System Performance
            </h2>
            <p className="stats-subtitle lead mx-auto" style={{ maxWidth: '600px' }}>
              Trusted by healthcare providers worldwide — delivering reliable, high-performance patient monitoring at scale.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stats-main-card stats-main-card-accent">
              <div className="stats-main-inner">
                <div className="stats-main-icon">
                  <i className="bi bi-people"></i>
                </div>
                <div className="stats-main-content">
                  <span className="stats-main-number">5,000+</span>
                  <span className="stats-main-label">Active Patients</span>
                  <div className="stats-main-bar">
                    <div className="stats-main-bar-fill stats-main-bar-fill-purple" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
              <div className="stats-main-trend stats-main-trend-up">
                <i className="bi bi-arrow-up-short"></i>
                <span>+24% this quarter</span>
              </div>
            </div>

            <div className="stats-main-card stats-main-card-accent-2">
              <div className="stats-main-inner">
                <div className="stats-main-icon">
                  <i className="bi bi-bell"></i>
                </div>
                <div className="stats-main-content">
                  <span className="stats-main-number">10,000+</span>
                  <span className="stats-main-label">Alerts Handled</span>
                  <div className="stats-main-bar">
                    <div className="stats-main-bar-fill stats-main-bar-fill-green" style={{ width: '96%' }}></div>
                  </div>
                </div>
              </div>
              <div className="stats-main-trend stats-main-trend-up">
                <i className="bi bi-arrow-up-short"></i>
                <span>+156% this quarter</span>
              </div>
            </div>

            <div className="stats-main-card stats-main-card-accent-3">
              <div className="stats-main-inner">
                <div className="stats-main-icon">
                  <i className="bi bi-cloud-check"></i>
                </div>
                <div className="stats-main-content">
                  <span className="stats-main-number">99.9%</span>
                  <span className="stats-main-label">Uptime SLA</span>
                  <div className="stats-main-bar">
                    <div className="stats-main-bar-fill stats-main-bar-fill-blue" style={{ width: '99.9%' }}></div>
                  </div>
                </div>
              </div>
              <div className="stats-main-trend stats-main-trend-neutral">
                <i className="bi bi-dash"></i>
                <span>Consistent</span>
              </div>
            </div>

            <div className="stats-main-card stats-main-card-accent-4">
              <div className="stats-main-inner">
                <div className="stats-main-icon">
                  <i className="bi bi-buildings"></i>
                </div>
                <div className="stats-main-content">
                  <span className="stats-main-number">50+</span>
                  <span className="stats-main-label">Healthcare Partners</span>
                  <div className="stats-main-bar">
                    <div className="stats-main-bar-fill stats-main-bar-fill-orange" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
              <div className="stats-main-trend stats-main-trend-up">
                <i className="bi bi-arrow-up-short"></i>
                <span>+8 new partners</span>
              </div>
            </div>
          </div>

          <div className="stats-secondary-row row g-3 mt-4 justify-content-center">
            <div className="col-6 col-md-3">
              <div className="stats-secondary-card">
                <div className="stats-secondary-icon text-primary">
                  <i className="bi bi-clock"></i>
                </div>
                <div className="stats-secondary-content">
                  <span className="stats-secondary-value">{'<100ms'}</span>
                  <span className="stats-secondary-label">Avg. Response</span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stats-secondary-card">
                <div className="stats-secondary-icon text-success">
                  <i className="bi bi-shield-check"></i>
                </div>
                <div className="stats-secondary-content">
                  <span className="stats-secondary-value">HIPAA</span>
                  <span className="stats-secondary-label">Compliant</span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stats-secondary-card">
                <div className="stats-secondary-icon text-info">
                  <i className="bi bi-globe"></i>
                </div>
                <div className="stats-secondary-content">
                  <span className="stats-secondary-value">3 Regions</span>
                  <span className="stats-secondary-label">Global Deploy</span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stats-secondary-card">
                <div className="stats-secondary-icon text-warning">
                  <i className="bi bi-cpu"></i>
                </div>
                <div className="stats-secondary-content">
                  <span className="stats-secondary-value">99.97%</span>
                  <span className="stats-secondary-label">Data Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="tech" className="tech-section py-5 position-relative overflow-hidden">
        {/* Background decorations */}
        <div className="tech-bg-shapes">
          <div className="tech-bg-grid"></div>
          <div className="tech-bg-blob tech-bg-blob-1"></div>
          <div className="tech-bg-blob tech-bg-blob-2"></div>
        </div>

        <div className="container position-relative">
          <div className="text-center mb-5">
            <span className="tech-badge d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3">
              <i className="bi bi-cpu"></i>
              Tech Stack
            </span>
            <h2 className="tech-heading display-5 fw-bold mb-3">
              Built with Modern Technology
            </h2>
            <p className="tech-subtitle lead mx-auto" style={{ maxWidth: '640px' }}>
              Powered by cutting-edge tools and frameworks to deliver reliable, 
              scalable, and secure patient monitoring at enterprise scale.
            </p>
          </div>

          {/* Core platform row */}
          <div className="tech-row-label text-center mb-4">
            <span className="tech-row-tag">Core Platform</span>
          </div>
          <div className="row g-4 justify-content-center mb-5">
            <div className="col-6 col-md-4 col-lg-3">
              <div className="tech-card-modern tech-card-reveal-1">
                <div className="tech-card-border"></div>
                <div className="tech-card-content">
                  <div className="tech-card-icon-wrap tech-icon-react">
                    <i className="fab fa-react"></i>
                  </div>
                  <span className="tech-card-name">React</span>
                  <span className="tech-card-desc">UI Framework</span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3">
              <div className="tech-card-modern tech-card-reveal-2">
                <div className="tech-card-border"></div>
                <div className="tech-card-content">
                  <div className="tech-card-icon-wrap tech-icon-aws">
                    <i className="fab fa-aws"></i>
                  </div>
                  <span className="tech-card-name">AWS</span>
                  <span className="tech-card-desc">Cloud Infrastructure</span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3">
              <div className="tech-card-modern tech-card-reveal-3">
                <div className="tech-card-border"></div>
                <div className="tech-card-content">
                  <div className="tech-card-icon-wrap tech-icon-node">
                    <i className="fab fa-node-js"></i>
                  </div>
                  <span className="tech-card-name">Node.js</span>
                  <span className="tech-card-desc">Runtime Engine</span>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting libraries row */}
          <div className="tech-row-label text-center mb-4">
            <span className="tech-row-tag">Supporting Libraries</span>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-6 col-md-4 col-lg-3">
              <div className="tech-card-modern tech-card-reveal-4">
                <div className="tech-card-border"></div>
                <div className="tech-card-content">
                  <div className="tech-card-icon-wrap tech-icon-chart">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <span className="tech-card-name">Chart.js</span>
                  <span className="tech-card-desc">Data Visualization</span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3">
              <div className="tech-card-modern tech-card-reveal-5">
                <div className="tech-card-border"></div>
                <div className="tech-card-content">
                  <div className="tech-card-icon-wrap tech-icon-bootstrap">
                    <i className="fab fa-bootstrap"></i>
                  </div>
                  <span className="tech-card-name">Bootstrap</span>
                  <span className="tech-card-desc">UI Components</span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3">
              <div className="tech-card-modern tech-card-reveal-6">
                <div className="tech-card-border"></div>
                <div className="tech-card-content">
                  <div className="tech-card-icon-wrap tech-icon-db">
                    <i className="fas fa-database"></i>
                  </div>
                  <span className="tech-card-name">Database</span>
                  <span className="tech-card-desc">Data Storage</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="tech-trust-row text-center mt-5">
            <div className="d-flex align-items-center justify-content-center gap-2 tech-trust-text">
              <i className="bi bi-shield-check text-success"></i>
              <span>Enterprise-grade security &bull; SOC 2 compliant &bull; Encrypted at rest</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-5 bg-gradient-primary text-white position-relative overflow-hidden">
        <div className="cta-bg-overlay"></div>
        <div className="container text-center">
          <h2 className="h1 fw-bold text-gradient-primary mb-3">Ready to Transform Patient Care?</h2>
          <p className="lead mb-4" style={{ fontSize: '1.1rem', opacity: 0.9 }}>Join thousands of healthcare providers using MediSys to deliver better patient outcomes.</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/login" className="btn btn-light btn-lg btn-gradient">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Login to System
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-lg">
              <i className="bi bi-person-plus me-2"></i>
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>MediSys Patient Monitoring</h5>
              <p className="text-muted">Advanced healthcare solutions for better patient outcomes.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">&copy; 2024 MediSys. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;