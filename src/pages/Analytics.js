import React, { useState, useEffect } from 'react';
import PatientTrend from '../components/PatientTrend';

const Analytics = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedPatient, setSelectedPatient] = useState('all');
  const [analyticsData, setAnalyticsData] = useState({
    totalReadings: 0,
    averageHeartRate: 0,
    averageOxygenLevel: 0,
    alertsGenerated: 0,
    lastUpdated: null
  });

  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 3 Months' }
  ];

  const patients = [
    { value: 'all', label: 'All Patients' },
    { value: 'P001', label: 'Patient P001' },
    { value: 'P002', label: 'Patient P002' },
    { value: 'P003', label: 'Patient P003' }
  ];

  const fetchAnalyticsData = async () => {
    // Mock analytics data - replace with actual API call
    const mockData = {
      totalReadings: Math.floor(Math.random() * 1000) + 500,
      averageHeartRate: Math.floor(Math.random() * 20) + 75,
      averageOxygenLevel: Math.floor(Math.random() * 5) + 96,
      alertsGenerated: Math.floor(Math.random() * 50) + 10,
      lastUpdated: new Date().toISOString()
    };
    setAnalyticsData(mockData);
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedTimeRange, selectedPatient]);

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

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6">
          <label className="form-label">Time Range</label>
          <select 
            className="form-select"
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Patient Filter</label>
          <select 
            className="form-select"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            {patients.map(patient => (
              <option key={patient.value} value={patient.value}>
                {patient.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Readings
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {analyticsData.totalReadings.toLocaleString()}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-graph-up text-primary" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Avg Heart Rate
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {analyticsData.averageHeartRate} BPM
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-heart-pulse text-success" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Avg Oxygen Level
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {analyticsData.averageOxygenLevel}%
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-lungs text-info" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Alerts Generated
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {analyticsData.alertsGenerated}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
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

      {/* Additional Analytics */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-pie-chart me-2"></i>
                Alert Distribution
              </h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-4">
                  <div className="mb-3">
                    <div className="text-danger" style={{ fontSize: '2rem' }}>
                      <i className="bi bi-exclamation-triangle-fill"></i>
                    </div>
                    <h4 className="text-danger">45%</h4>
                    <p className="text-muted">High Priority</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="mb-3">
                    <div className="text-warning" style={{ fontSize: '2rem' }}>
                      <i className="bi bi-exclamation-triangle"></i>
                    </div>
                    <h4 className="text-warning">35%</h4>
                    <p className="text-muted">Medium Priority</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="mb-3">
                    <div className="text-info" style={{ fontSize: '2rem' }}>
                      <i className="bi bi-info-circle"></i>
                    </div>
                    <h4 className="text-info">20%</h4>
                    <p className="text-muted">Low Priority</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-speedometer2 me-2"></i>
                System Performance
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Data Collection Rate</span>
                  <span>98.5%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar bg-success" style={{ width: '98.5%' }}></div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Alert Response Time</span>
                  <span>92%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar bg-warning" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>System Uptime</span>
                  <span>99.9%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar bg-success" style={{ width: '99.9%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Last Updated Info */}
      {analyticsData.lastUpdated && (
        <div className="text-center mt-4">
          <small className="text-muted">
            <i className="bi bi-clock me-1"></i>
            Data last updated: {new Date(analyticsData.lastUpdated).toLocaleString()}
          </small>
        </div>
      )}
    </div>
  );
};

export default Analytics;
