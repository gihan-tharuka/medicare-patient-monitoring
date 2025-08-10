import React, { useState, useEffect } from 'react';
import HeartRateChart from '../components/HeartRateChart';
import OxygenLevelChart from '../components/OxygenLevelChart';

const Analytics = () => {
  const [patientId, setPatientId] = useState('');
  const [showCharts, setShowCharts] = useState(false);

  const fetchAnalyticsData = async () => {
    // Placeholder for future analytics data fetching
  };

  const handleShowTrends = () => {
    if (patientId.trim()) {
      setShowCharts(true);
    }
  };

  const handlePatientIdChange = (e) => {
    setPatientId(e.target.value);
    if (!e.target.value.trim()) {
      setShowCharts(false);
    }
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

      {/* Patient Selection */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-person-badge me-2"></i>
                Patient Analysis
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3 align-items-end">
                <div className="col-auto">
                  <label className="form-label">Patient ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Patient ID (e.g. P001)"
                    value={patientId}
                    onChange={handlePatientIdChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleShowTrends()}
                  />
                </div>
                <div className="col-auto">
                  <button 
                    className="btn btn-primary" 
                    onClick={handleShowTrends}
                    disabled={!patientId.trim()}
                  >
                    <i className="bi bi-graph-up me-1"></i>
                    Show Patient Trends
                  </button>
                </div>
                {showCharts && patientId && (
                  <div className="col-auto">
                    <button 
                      className="btn btn-outline-secondary" 
                      onClick={() => setShowCharts(false)}
                    >
                      <i className="bi bi-x-circle me-1"></i>
                      Clear Charts
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      {showCharts && patientId && (
        <div className="row mb-4">
          <div className="col-12 mb-4">
            <HeartRateChart patientId={patientId} autoLoad={true} />
          </div>
          <div className="col-12 mb-4">
            <OxygenLevelChart patientId={patientId} autoLoad={true} />
          </div>
        </div>
      )}

      {!showCharts && (
        <div className="row">
          <div className="col-12">
            <div className="text-center text-muted py-5">
              <i className="bi bi-graph-up-arrow" style={{ fontSize: '4rem', opacity: 0.3 }}></i>
              <h4 className="mt-3">Patient Analytics Dashboard</h4>
              <p>Enter a patient ID above to view their vital signs trends and analytics.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
