import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, high, medium, low
  const [searchTerm, setSearchTerm] = useState('');
  const [downloadPatientId, setDownloadPatientId] = useState('all');
  const [downloadTimeRange, setDownloadTimeRange] = useState('all');
  const [displayTimeRange, setDisplayTimeRange] = useState('all');

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const data = await apiService.getDashboardData();
      setAlerts(data.recentAlerts || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch alerts');
      console.error('Alerts fetch error:', err);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  const acknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, status: 'acknowledged' } : alert
    ));
  };

  const resolveAlert = (alertId) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, status: 'resolved' } : alert
    ));
  };

  const filterAlertsByTimeRange = (alerts, timeRange) => {
    if (timeRange === 'all') return alerts;
    
    const now = new Date();
    let cutoffDate;
    
    switch (timeRange) {
      case '24h':
        cutoffDate = new Date(now - 24 * 60 * 60 * 1000);
        break;
      case '1week':
        cutoffDate = new Date(now - 7 * 24 * 60 * 60 * 1000);
        break;
      case '1month':
        cutoffDate = new Date(now - 30 * 24 * 60 * 60 * 1000);
        break;
      case '1year':
        cutoffDate = new Date(now - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        return alerts;
    }
    
    return alerts.filter(alert => {
      if (!alert.timestamp) return false;
      const alertDate = new Date(alert.timestamp * 1000);
      return alertDate >= cutoffDate;
    });
  };

  const downloadAlerts = () => {
    let alertsToDownload = alerts;

    // Filter by patient if specific patient selected
    if (downloadPatientId !== 'all') {
      alertsToDownload = alertsToDownload.filter(alert => alert.patientId === downloadPatientId);
    }

    // Filter by time range
    alertsToDownload = filterAlertsByTimeRange(alertsToDownload, downloadTimeRange);

    // Prepare CSV data
    const csvHeaders = ['Patient ID', 'Message', 'Severity', 'Time'];
    const csvData = alertsToDownload.map(alert => [
      alert.patientId || 'N/A',
      `"${(alert.message || 'N/A').replace(/"/g, '""')}"`, // Escape quotes in message
      'CRITICAL',
      alert.timestamp ? new Date(alert.timestamp * 1000).toLocaleString() : 'N/A' // FIXED HERE
    ]);

    // Create CSV content
    const csvContent = [
      csvHeaders.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);

    const timeRangeText = downloadTimeRange === 'all' ? 'all_time' : downloadTimeRange;
    const patientText = downloadPatientId === 'all' ? 'all_patients' : `patient_${downloadPatientId}`;
    const fileName = `${patientText}_alerts_${timeRangeText}_${new Date().toISOString().split('T')[0]}.csv`;

    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getUniquePatientIds = () => {
    const patientIds = [...new Set(alerts.map(alert => alert.patientId).filter(id => id))];
    return patientIds.sort();
  };

  const getFilteredAlertsCount = () => {
    let alertsToCount = alerts;
    
    // Filter by patient if specific patient selected
    if (downloadPatientId !== 'all') {
      alertsToCount = alertsToCount.filter(alert => alert.patientId === downloadPatientId);
    }
    
    // Filter by time range
    alertsToCount = filterAlertsByTimeRange(alertsToCount, downloadTimeRange);
    
    return alertsToCount.length;
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'all' || (alert.severity && alert.severity.toLowerCase() === filter.toLowerCase());
    const matchesSearch = (alert.patientId && alert.patientId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (alert.alertType && alert.alertType.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (alert.message && alert.message.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Apply time range filter
    const timeFilteredAlerts = filterAlertsByTimeRange([alert], displayTimeRange);
    const matchesTimeRange = timeFilteredAlerts.length > 0;
    
    return matchesFilter && matchesSearch && matchesTimeRange;
  });

  const getAlertCounts = () => {
    let heartRateCount = 0;
    let oxygenCount = 0;
    let inactivityCount = 0;

    alerts.forEach(alert => {
      const alertText = JSON.stringify(alert).toLowerCase();
      if (
        alertText.includes('heart rate') ||
        alertText.includes('heart') ||
        alertText.includes('cardiac') ||
        alertText.includes('pulse') ||
        alertText.includes('bpm')
      ) {
        heartRateCount++;
      }
      if (
        alertText.includes('oxygen') ||
        alertText.includes('o2') ||
        alertText.includes('saturation') ||
        alertText.includes('spo2') ||
        alertText.includes('breathing')
      ) {
        oxygenCount++;
      }
      if (
        alertText.includes('inactivity') ||
        alertText.includes('inactive') ||
        alertText.includes('movement') ||
        alertText.includes('activity') ||
        alertText.includes('motion')
      ) {
        inactivityCount++;
      }
    });

    return {
      total: alerts.length,
      heartRate: heartRateCount,
      oxygen: oxygenCount,
      inactivity: inactivityCount
    };
  };

  const counts = getAlertCounts();

  useEffect(() => {
    fetchAlerts();
    // Refresh every 30 seconds
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Alert Management</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <select
              className="form-select form-select-sm me-2"
              value={downloadPatientId}
              onChange={(e) => setDownloadPatientId(e.target.value)}
              style={{ minWidth: '120px' }}
            >
              <option value="all">All Patients</option>
              {getUniquePatientIds().map(patientId => (
                <option key={patientId} value={patientId}>
                  Patient {patientId}
                </option>
              ))}
            </select>
            <select
              className="form-select form-select-sm me-2"
              value={downloadTimeRange}
              onChange={(e) => setDownloadTimeRange(e.target.value)}
              style={{ minWidth: '110px' }}
            >
              <option value="all">All Time</option>
              <option value="24h">Past 24 Hours</option>
              <option value="1week">Past Week</option>
              <option value="1month">Past Month</option>
              <option value="1year">Past Year</option>
            </select>
            <button
              className="btn btn-success btn-sm me-2"
              onClick={downloadAlerts}
              disabled={alerts.length === 0 || getFilteredAlertsCount() === 0}
              title={`Download ${getFilteredAlertsCount()} alerts`}
            >
              <i className="bi bi-download me-1"></i>
              Download ({getFilteredAlertsCount()})
            </button>
          </div>
          <button className="btn-sm btn-outline-secondary" onClick={fetchAlerts}>
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

      {/* Alert Statistics */}
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Alerts
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {counts.total}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-bell text-primary"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-left-danger shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                    Critical Heart Rate
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {counts.heartRate}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-heart-pulse text-danger"></i>
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
                    Low Oxygen Saturation
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {counts.oxygen}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-lungs text-warning"></i>
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
                    Prolonged Inactivity
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {counts.inactivity}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-person-walking text-info"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="row mb-3">
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="d-flex justify-content-center align-items-center">
            <label className="me-2">Severity:</label>
            <select
              className="form-select w-auto"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Severities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>
        <div className="col-md-4">
          <div className="d-flex justify-content-end align-items-center">
            <label className="me-2">Time Range:</label>
            <select
              className="form-select w-auto"
              value={displayTimeRange}
              onChange={(e) => setDisplayTimeRange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="24h">Past 24 Hours</option>
              <option value="1week">Past Week</option>
              <option value="1month">Past Month</option>
              <option value="1year">Past Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-list-ul me-2"></i>
                Alerts List ({filteredAlerts.length} alerts)
              </h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading alerts...</p>
                </div>
              ) : filteredAlerts.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-bell-slash" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                  <p className="mt-2 text-muted">
                    {searchTerm || filter !== 'all' ? 'No alerts found matching your criteria.' : 'No alerts available.'}
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Patient ID</th>
                        <th>Message</th>
                        <th>Severity</th>
                        <th>Time</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAlerts.map((alert) => (
                        <tr key={alert.id || alert.alertId}>
                          <td><strong>{alert.patientId || 'N/A'}</strong></td>
                          <td>{alert.message || 'N/A'}</td>
                          <td>
                            <span className="badge bg-danger">
                              CRITICAL
                            </span>
                          </td>
                          {/* ---- Timestamp fix here: ---- */}
                          <td>{alert.timestamp ? new Date(alert.timestamp * 1000).toLocaleString() : 'N/A'}</td>
                          <td>
                            <div className="btn-group btn-group-sm" role="group">
                              {alert.status === 'active' && (
                                <button
                                  className="btn btn-outline-warning"
                                  onClick={() => acknowledgeAlert(alert.id)}
                                  title="Acknowledge Alert"
                                >
                                  <i className="bi bi-check"></i>
                                </button>
                              )}
                              {alert.status !== 'resolved' && (
                                <button
                                  className="btn btn-outline-success"
                                  onClick={() => resolveAlert(alert.id)}
                                  title="Resolve Alert"
                                >
                                  <i className="bi bi-check-all"></i>
                                </button>
                              )}
                              <button className="btn btn-outline-primary" title="View Details">
                                <i className="bi bi-eye"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
