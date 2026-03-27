import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1 className="display-4 fw-bold mb-4">Welcome to MediSys Patient Monitoring</h1>
                <p className="lead mb-4">
                  Experience the future of healthcare with our advanced patient monitoring system. 
                  Real-time tracking, intelligent alerts, and comprehensive analytics for better patient care.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <Link to="/login" className="btn btn-light btn-lg">
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Get Started
                  </Link>
                  <Link to="/login" className="btn btn-outline-light btn-lg">
                    <i className="bi bi-play-circle me-2"></i>
                    View Demo
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image text-center">
                <div className="hero-placeholder">
                  <i className="bi bi-heart-pulse" style={{ fontSize: '12rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h1 fw-bold">Powerful Features</h2>
            <p className="lead text-muted">Everything you need to monitor patient health effectively</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-speedometer2" style={{ fontSize: '3rem' }}></i>
                </div>
                <h4 className="h5 fw-bold">Real-time Monitoring</h4>
                <p className="text-muted">Track vital signs continuously with instant updates and notifications.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-exclamation-triangle" style={{ fontSize: '3rem' }}></i>
                </div>
                <h4 className="h5 fw-bold">Smart Alerts</h4>
                <p className="text-muted">Get notified immediately when vital signs fall outside normal ranges.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-graph-up" style={{ fontSize: '3rem' }}></i>
                </div>
                <h4 className="h5 fw-bold">Advanced Analytics</h4>
                <p className="text-muted">Comprehensive data analysis and trend visualization for better insights.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h1 fw-bold">System Performance</h2>
            <p className="lead text-muted">Trusted by healthcare providers worldwide</p>
          </div>
          <div className="row g-4">
            <div className="col-md-3 col-6">
              <div className="stat-card text-center">
                <div className="stat-number text-primary fw-bold" style={{ fontSize: '2.5rem' }}>5,000+</div>
                <div className="stat-label text-muted">Active Patients</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card text-center">
                <div className="stat-number text-success fw-bold" style={{ fontSize: '2.5rem' }}>10,000+</div>
                <div className="stat-label text-muted">Alerts Handled</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card text-center">
                <div className="stat-number text-info fw-bold" style={{ fontSize: '2.5rem' }}>99.9%</div>
                <div className="stat-label text-muted">Uptime</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card text-center">
                <div className="stat-number text-warning fw-bold" style={{ fontSize: '2.5rem' }}>50+</div>
                <div className="stat-label text-muted">Healthcare Partners</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="h1 fw-bold">Built with Modern Technology</h2>
            <p className="lead text-muted">Using cutting-edge tools for reliable performance</p>
          </div>
          <div className="row g-4">
            <div className="col-md-2 col-4 text-center">
              <div className="tech-icon mb-3">
                <i className="fab fa-react" style={{ fontSize: '2rem' }}></i>
              </div>
              <div className="tech-label">React</div>
            </div>
            <div className="col-md-2 col-4 text-center">
              <div className="tech-icon mb-3">
                <i className="fab fa-aws" style={{ fontSize: '2rem' }}></i>
              </div>
              <div className="tech-label">AWS</div>
            </div>
            <div className="col-md-2 col-4 text-center">
              <div className="tech-icon mb-3">
                <i className="fas fa-chart-line" style={{ fontSize: '2rem' }}></i>
              </div>
              <div className="tech-label">Chart.js</div>
            </div>
            <div className="col-md-2 col-4 text-center">
              <div className="tech-icon mb-3">
                <i className="fab fa-bootstrap" style={{ fontSize: '2rem' }}></i>
              </div>
              <div className="tech-label">Bootstrap</div>
            </div>
            <div className="col-md-2 col-4 text-center">
              <div className="tech-icon mb-3">
                <i className="fab fa-node" style={{ fontSize: '2rem' }}></i>
              </div>
              <div className="tech-label">Node.js</div>
            </div>
            <div className="col-md-2 col-4 text-center">
              <div className="tech-icon mb-3">
                <i className="fas fa-database" style={{ fontSize: '2rem' }}></i>
              </div>
              <div className="tech-label">Database</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-gradient-primary text-white">
        <div className="container text-center">
          <h2 className="h1 fw-bold mb-3">Ready to Transform Patient Care?</h2>
          <p className="lead mb-4">Join thousands of healthcare providers using MediSys to deliver better patient outcomes.</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/login" className="btn btn-light btn-lg">
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