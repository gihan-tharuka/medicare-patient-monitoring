import React from 'react';

const Header = ({ user, signOut }) => {
  return (
    <header className="bg-primary text-white py-3 fixed-top" style={{ zIndex: 1030 }}>
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <i className="bi bi-heart-pulse me-3" style={{ fontSize: '1.5rem' }}></i>
            <div>
              <h1 className="h4 mb-0">MediSys Patient Monitoring</h1>
              <small className="opacity-75">Real-time health monitoring system</small>
            </div>
          </div>
          
          {/* User info and sign out */}
          <div className="d-flex align-items-center">
            <span className="me-3">
              <i className="bi bi-person-circle me-2"></i>
              Hello, {user?.attributes?.email || user?.signInDetails?.loginId || user?.username}
            </span>
            <button className="btn btn-outline-light btn-sm" onClick={signOut}>
              <i className="bi bi-box-arrow-right me-1"></i>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;