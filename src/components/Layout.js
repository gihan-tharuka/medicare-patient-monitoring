import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from './Header';

const Layout = ({ children, signOut, user }) => {
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: 'bi-speedometer2' },
    { path: '/patients', label: 'Patients', icon: 'bi-people' },
    { path: '/monitoring', label: 'Monitoring', icon: 'bi-activity' },
    { path: '/alerts', label: 'Alerts', icon: 'bi-exclamation-triangle' },
    { path: '/analytics', label: 'Analytics', icon: 'bi-bar-chart' },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header user={user} signOut={signOut} />

      <div className="container-fluid flex-grow-1">
        <div className="row h-100">
          {/* Sidebar Navigation */}
          <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                {navigationItems.map((item) => (
                  <li className="nav-item" key={item.path}>
                    <Link
                      className={`nav-link ${
                        location.pathname === item.path ? 'active bg-primary text-white rounded' : 'text-dark'
                      }`}
                      to={item.path}
                    >
                      <i className={`${item.icon} me-2`}></i>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="pt-3">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
