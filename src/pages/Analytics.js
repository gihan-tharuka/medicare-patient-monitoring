import React, { useState, useEffect } from 'react';
import PatientTrend from '../components/PatientTrend';

const Analytics = () => {
  const fetchAnalyticsData = async () => {
    // Placeholder for future analytics data fetching
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Analytics & Reports</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button className="btn btn-outline-secondary me-2">
            <i className="bi bi-download me-1"></i>
            Export Data
          </button>
          <button className="btn btn-outline-secondary" onClick={fetchAnalyticsData}>
            <i className="bi bi-arrow-clockwise me-1"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-graph-up me-2"></i>
                Patient Trends Over Time
              </h5>
            </div>
            <div className="card-body">
              <PatientTrend />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
