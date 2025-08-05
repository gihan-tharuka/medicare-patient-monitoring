import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    activePatients: 0,
    recentAlerts: [],
    lastUpdated: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getDashboardData();
      setDashboardData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard Overview</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button className="btn btn-sm btn-outline-secondary" onClick={fetchDashboardData}>
            <i className="bi bi-arrow-clockwise me-1"></i>
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      {/* Quick Stats Cards */}
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Active Patients
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {loading ? '...' : dashboardData.activePatients}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-people text-primary" style={{ fontSize: '2rem' }}></i>
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
                    Active Alerts
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {loading ? '...' : dashboardData.recentAlerts.length}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '2rem' }}></i>
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
                    System Status
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    Online
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-check-circle text-success" style={{ fontSize: '2rem' }}></i>
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
                    Last Updated
                  </div>
                  <div className="h6 mb-0 font-weight-bold text-gray-800">
                    {dashboardData.lastUpdated ? new Date(dashboardData.lastUpdated).toLocaleTimeString() : 'Never'}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-clock text-info" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <Link to="/patients" className="btn btn-primary btn-lg w-100 mb-2">
                    <i className="bi bi-person-plus me-2"></i>
                    Add Patient
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/monitoring" className="btn btn-success btn-lg w-100 mb-2">
                    <i className="bi bi-activity me-2"></i>
                    Monitor Vitals
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/alerts" className="btn btn-warning btn-lg w-100 mb-2">
                    <i className="bi bi-bell me-2"></i>
                    View Alerts
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/analytics" className="btn btn-info btn-lg w-100 mb-2">
                    <i className="bi bi-graph-up me-2"></i>
                    View Analytics
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts Summary */}
      {dashboardData.recentAlerts.length > 0 && (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Recent Critical Alerts</h5>
                <Link to="/alerts" className="btn btn-sm btn-outline-primary">
                  View All Alerts
                </Link>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Patient ID</th>
                        <th>Alert Type</th>
                        <th>Severity</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.recentAlerts.slice(0, 5).map((alert, index) => (
                        <tr key={index}>
                          <td>{alert.patientId}</td>
                          <td>{alert.alertType}</td>
                          <td>
                            <span className={`badge ${
                              alert.severity === 'HIGH' ? 'bg-danger' : 
                              alert.severity === 'MEDIUM' ? 'bg-warning' : 'bg-info'
                            }`}>
                              {alert.severity}
                            </span>
                          </td>
                          <td>{new Date(alert.timestamp).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
