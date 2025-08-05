import React, { useState } from 'react';
import apiService from '../services/api';

const Monitoring = () => {
  const [testData, setTestData] = useState({
    patientId: 'P001',
    heartRate: 75,
    oxygenLevel: 98,
    inactivityMinutes: 0,
  });
  const [monitoringData, setMonitoringData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const sendTestData = async () => {
    try {
      setLoading(true);
      await apiService.sendTestData(
        testData.patientId,
        parseInt(testData.heartRate, 10),
        parseInt(testData.oxygenLevel, 10),
        parseInt(testData.inactivityMinutes, 10)
      );
      setError(null);
      setLastUpdate(new Date());
      // Add the test data to local monitoring data for demonstration
      const newDataPoint = {
        patientId: testData.patientId,
        heartRate: testData.heartRate,
        oxygenLevel: testData.oxygenLevel,
        inactivityMinutes: testData.inactivityMinutes,
        timestamp: new Date().toISOString(),
      };
      setMonitoringData(prev => [newDataPoint, ...prev.slice(0, 9)]); // Keep last 10 entries
    } catch (err) {
      console.error('Test data error:', err);
      let errorMessage = 'Failed to send test data';
      if (err.response) {
        errorMessage += `: ${err.response.status} - ${err.response.data?.message || err.response.statusText}`;
      } else if (err.request) {
        errorMessage += ': Network error - check if API is accessible and CORS is configured';
      } else {
        errorMessage += `: ${err.message}`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleTestDataChange = (field, value) => {
    setTestData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const getVitalStatus = (type, value) => {
    if (type === 'heartRate') {
      if (value < 60 || value > 100) return 'danger';
      if (value < 70 || value > 90) return 'warning';
      return 'success';
    }
    if (type === 'oxygenLevel') {
      if (value < 95) return 'danger';
      if (value < 98) return 'warning';
      return 'success';
    }
    if (type === 'inactivity') {
      if (value > 30) return 'danger';
      if (value > 15) return 'warning';
      return 'success';
    }
    return 'secondary';
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'danger': return 'bg-danger';
      case 'warning': return 'bg-warning';
      case 'success': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Real-time Monitoring</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          {lastUpdate && (
            <span className="badge bg-info me-2">
              Last update: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      {/* Test Data Simulation */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-send me-2"></i>
                Send Test Data
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <label className="form-label">Patient ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={testData.patientId}
                    onChange={e => handleTestDataChange('patientId', e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Heart Rate (BPM)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={testData.heartRate}
                    onChange={e => handleTestDataChange('heartRate', e.target.value)}
                    min="30"
                    max="200"
                  />
                  <small className="text-muted">Normal: 60-100 BPM</small>
                </div>

                <div className="col-md-3">
                  <label className="form-label">Oxygen Level (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={testData.oxygenLevel}
                    onChange={e => handleTestDataChange('oxygenLevel', e.target.value)}
                    min="70"
                    max="100"
                  />
                  <small className="text-muted">Normal: 95-100%</small>
                </div>

                <div className="col-md-3">
                  <label className="form-label">Inactivity (minutes)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={testData.inactivityMinutes}
                    onChange={e => handleTestDataChange('inactivityMinutes', e.target.value)}
                    min="0"
                    max="120"
                  />
                  <small className="text-muted">Alert if &gt; 30 min</small>
                </div>
              </div>

              <button 
                className="btn btn-primary mt-3" 
                onClick={sendTestData}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send me-2"></i>
                    Send Test Data
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Current Vitals Preview */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <i className="bi bi-heart-pulse text-danger" style={{ fontSize: '2rem' }}></i>
              <h4 className="card-title mt-2">Heart Rate</h4>
              <h2 className={`text-${getVitalStatus('heartRate', testData.heartRate) === 'success' ? 'success' : getVitalStatus('heartRate', testData.heartRate) === 'warning' ? 'warning' : 'danger'}`}>
                {testData.heartRate} BPM
              </h2>
              <span className={`badge ${getStatusBadgeClass(getVitalStatus('heartRate', testData.heartRate))}`}>
                {getVitalStatus('heartRate', testData.heartRate).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <i className="bi bi-lungs text-primary" style={{ fontSize: '2rem' }}></i>
              <h4 className="card-title mt-2">Oxygen Level</h4>
              <h2 className={`text-${getVitalStatus('oxygenLevel', testData.oxygenLevel) === 'success' ? 'success' : getVitalStatus('oxygenLevel', testData.oxygenLevel) === 'warning' ? 'warning' : 'danger'}`}>
                {testData.oxygenLevel}%
              </h2>
              <span className={`badge ${getStatusBadgeClass(getVitalStatus('oxygenLevel', testData.oxygenLevel))}`}>
                {getVitalStatus('oxygenLevel', testData.oxygenLevel).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <i className="bi bi-person-walking text-warning" style={{ fontSize: '2rem' }}></i>
              <h4 className="card-title mt-2">Inactivity</h4>
              <h2 className={`text-${getVitalStatus('inactivity', testData.inactivityMinutes) === 'success' ? 'success' : getVitalStatus('inactivity', testData.inactivityMinutes) === 'warning' ? 'warning' : 'danger'}`}>
                {testData.inactivityMinutes} min
              </h2>
              <span className={`badge ${getStatusBadgeClass(getVitalStatus('inactivity', testData.inactivityMinutes))}`}>
                {getVitalStatus('inactivity', testData.inactivityMinutes).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Monitoring Data */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-activity me-2"></i>
                Recent Monitoring Data
              </h5>
            </div>
            <div className="card-body">
              {monitoringData.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-activity" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                  <p className="mt-2 text-muted">No monitoring data available. Send test data to see results here.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead className="table-light">
                      <tr>
                        <th>Patient ID</th>
                        <th>Heart Rate</th>
                        <th>Oxygen Level</th>
                        <th>Inactivity</th>
                        <th>Timestamp</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monitoringData.map((data, index) => {
                        const heartStatus = getVitalStatus('heartRate', data.heartRate);
                        const oxygenStatus = getVitalStatus('oxygenLevel', data.oxygenLevel);
                        const inactivityStatus = getVitalStatus('inactivity', data.inactivityMinutes);
                        const overallStatus = [heartStatus, oxygenStatus, inactivityStatus].includes('danger') ? 'danger' :
                                             [heartStatus, oxygenStatus, inactivityStatus].includes('warning') ? 'warning' : 'success';
                        
                        return (
                          <tr key={index}>
                            <td><strong>{data.patientId}</strong></td>
                            <td>
                              <span className={`text-${heartStatus === 'success' ? 'success' : heartStatus === 'warning' ? 'warning' : 'danger'}`}>
                                {data.heartRate} BPM
                              </span>
                            </td>
                            <td>
                              <span className={`text-${oxygenStatus === 'success' ? 'success' : oxygenStatus === 'warning' ? 'warning' : 'danger'}`}>
                                {data.oxygenLevel}%
                              </span>
                            </td>
                            <td>
                              <span className={`text-${inactivityStatus === 'success' ? 'success' : inactivityStatus === 'warning' ? 'warning' : 'danger'}`}>
                                {data.inactivityMinutes} min
                              </span>
                            </td>
                            <td>{new Date(data.timestamp).toLocaleString()}</td>
                            <td>
                              <span className={`badge ${getStatusBadgeClass(overallStatus)}`}>
                                {overallStatus.toUpperCase()}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
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

export default Monitoring;
