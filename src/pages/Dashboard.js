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
  const [currentPage, setCurrentPage] = useState(1);
  const [alertsPerPage, setAlertsPerPage] = useState(10);

  // Helper function to calculate time ago
  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  // Pagination calculations
  const totalAlerts = dashboardData.recentAlerts.length;
  const totalPages = Math.ceil(totalAlerts / alertsPerPage);
  const startIndex = (currentPage - 1) * alertsPerPage;
  const endIndex = startIndex + alertsPerPage;
  const currentAlerts = dashboardData.recentAlerts.slice(startIndex, endIndex);

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (perPage) => {
    setAlertsPerPage(perPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Reset pagination when data changes
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalAlerts, totalPages, currentPage]);

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

      {/* Critical Alerts Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
                Critical Alerts ({totalAlerts})
              </h5>
              <div className="d-flex gap-2 align-items-center">
                <div className="d-flex align-items-center me-3">
                  <label htmlFor="alertsPerPage" className="form-label me-2 mb-0 text-muted small">
                    Show:
                  </label>
                  <select 
                    id="alertsPerPage"
                    className="form-select form-select-sm" 
                    value={alertsPerPage}
                    onChange={(e) => handlePerPageChange(parseInt(e.target.value))}
                    style={{ width: 'auto' }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={fetchDashboardData}
                  disabled={loading}
                >
                  <i className="bi bi-arrow-clockwise me-1"></i>
                  {loading ? 'Refreshing...' : 'Refresh'}
                </button>
                <Link to="/alerts" className="btn btn-sm btn-outline-primary">
                  <i className="bi bi-eye me-1"></i>
                  View All Alerts
                </Link>
              </div>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 text-muted">Loading critical alerts...</p>
                </div>
              ) : dashboardData.recentAlerts.length > 0 ? (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="text-muted small">
                      Showing {startIndex + 1} to {Math.min(endIndex, totalAlerts)} of {totalAlerts} alerts
                    </div>
                  </div>
                  
                  <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <table className="table table-hover align-middle">
                      <thead className="table-dark" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                        <tr>
                          <th scope="col" style={{ fontWeight: '600' }}>Alert ID</th>
                          <th scope="col" style={{ fontWeight: '600' }}>Patient ID</th>
                          <th scope="col" style={{ fontWeight: '600' }}>Message</th>
                          <th scope="col" style={{ fontWeight: '600' }}>Severity</th>
                          <th scope="col" style={{ fontWeight: '600' }}>Date & Time</th>
                          <th scope="col" style={{ fontWeight: '600' }}>Time Ago</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentAlerts.map((alert) => {
                          const alertTime = new Date(alert.timestamp * 1000);
                          const timeAgo = getTimeAgo(alertTime);
                          
                          return (
                            <tr key={alert.alertId} style={{ cursor: 'default' }}>
                              <td>
                                <code className="text-primary" style={{ backgroundColor: '#e9ecef', padding: '2px 6px', borderRadius: '3px' }}>
                                  {alert.alertId}
                                </code>
                              </td>
                              <td>
                                <strong className="text-info">{alert.patientId}</strong>
                              </td>
                              <td>
                                <span className="text-dark">{alert.message}</span>
                              </td>
                              <td>
                                <span className="badge bg-danger" style={{ fontSize: '0.75em' }}>
                                  <i className="bi bi-exclamation-triangle-fill me-1"></i>
                                  Critical
                                </span>
                              </td>
                              <td>
                                <div className="text-nowrap">
                                  <div style={{ fontWeight: '500' }}>
                                    {alert.datetime ? alert.datetime : alertTime.toLocaleString()}
                                  </div>
                                </div>
                              </td>
                              <td>
                                <small className="text-muted">{timeAgo}</small>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <nav aria-label="Alerts pagination" className="mt-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="text-muted small">
                          Page {currentPage} of {totalPages}
                        </div>
                        <ul className="pagination pagination-sm mb-0">
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button 
                              className="page-link" 
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              <i className="bi bi-chevron-left"></i>
                              Previous
                            </button>
                          </li>
                          
                          {/* Page numbers */}
                          {(() => {
                            const pages = [];
                            const maxVisiblePages = 5;
                            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                            
                            // Adjust start page if we're near the end
                            if (endPage - startPage + 1 < maxVisiblePages) {
                              startPage = Math.max(1, endPage - maxVisiblePages + 1);
                            }
                            
                            // First page and ellipsis
                            if (startPage > 1) {
                              pages.push(
                                <li key={1} className="page-item">
                                  <button className="page-link" onClick={() => handlePageChange(1)}>
                                    1
                                  </button>
                                </li>
                              );
                              if (startPage > 2) {
                                pages.push(
                                  <li key="start-ellipsis" className="page-item disabled">
                                    <span className="page-link">...</span>
                                  </li>
                                );
                              }
                            }
                            
                            // Visible page numbers
                            for (let i = startPage; i <= endPage; i++) {
                              pages.push(
                                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                                  <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(i)}
                                  >
                                    {i}
                                  </button>
                                </li>
                              );
                            }
                            
                            // Last page and ellipsis
                            if (endPage < totalPages) {
                              if (endPage < totalPages - 1) {
                                pages.push(
                                  <li key="end-ellipsis" className="page-item disabled">
                                    <span className="page-link">...</span>
                                  </li>
                                );
                              }
                              pages.push(
                                <li key={totalPages} className="page-item">
                                  <button className="page-link" onClick={() => handlePageChange(totalPages)}>
                                    {totalPages}
                                  </button>
                                </li>
                              );
                            }
                            
                            return pages;
                          })()}
                          
                          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button 
                              className="page-link" 
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                            >
                              Next
                              <i className="bi bi-chevron-right"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  )}
                </>
              ) : (
                <div className="text-center py-5">
                  <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
                  <h4 className="mt-3 text-success">No Critical Alerts</h4>
                  <p className="text-muted">All patient vitals are within normal ranges.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
