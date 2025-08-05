import React, { useState } from 'react';
import { useEffect } from 'react';
import PatientCount from './PatientCount';
import AlertsList from './AlertsList';
import PatientTrend from './PatientTrend';
import AddPatient from './AddPatient'; // Import the AddPatient component
import apiService from '../services/api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    activePatients: 0,
    recentAlerts: [],
    lastUpdated: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Test data form state
  const [testData, setTestData] = useState({
    patientId: 'P001',
    heartRate: 75,
    oxygenLevel: 98,
    inactivityMinutes: 0,
  });

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

  const sendTestData = async () => {
    try {
      await apiService.sendTestData(
        testData.patientId,
        parseInt(testData.heartRate, 10),
        parseInt(testData.oxygenLevel, 10),
        parseInt(testData.inactivityMinutes, 10)
      );
      alert('Test data sent successfully!');
      // Refresh dashboard after sending test data
      setTimeout(fetchDashboardData, 2000);
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
      alert(errorMessage);
    }
  };

  const handleTestDataChange = (field, value) => {
    setTestData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    fetchDashboardData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Add Patient Form at the top */}
      <div className="row">
        <div className="col-12">
          <AddPatient onSuccess={fetchDashboardData} />
        </div>
      </div>

      {/* Patient statistics and test data form */}
      <div className="row">
        <div className="col-md-4">
          <PatientCount count={dashboardData.activePatients} loading={loading} />
        </div>
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Send Test Data</h5>
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
                  <label className="form-label">Heart Rate</label>
                  <input
                    type="number"
                    className="form-control"
                    value={testData.heartRate}
                    onChange={e => handleTestDataChange('heartRate', e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Oxygen Level</label>
                  <input
                    type="number"
                    className="form-control"
                    value={testData.oxygenLevel}
                    onChange={e => handleTestDataChange('oxygenLevel', e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Inactivity (min)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={testData.inactivityMinutes}
                    onChange={e => handleTestDataChange('inactivityMinutes', e.target.value)}
                  />
                </div>
              </div>

              <button className="btn btn-primary mt-3" onClick={sendTestData}>
                Send Test Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="row">
        <div className="col-12">
          <AlertsList alerts={dashboardData.recentAlerts} loading={loading} />
        </div>
      </div>

      {/* Trends Chart */}
      <div className="row">
        <div className="col-12">
          <PatientTrend />
        </div>
      </div>

      {dashboardData.lastUpdated && (
        <div className="text-center mt-4">
          <small className="text-muted">
            Last updated: {dashboardData.lastUpdated}
          </small>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
