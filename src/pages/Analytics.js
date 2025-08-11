import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import HeartRateChart from '../components/HeartRateChart';
import OxygenLevelChart from '../components/OxygenLevelChart';
import { apiService } from '../services/api';

const Analytics = () => {
  const [patientId, setPatientId] = useState('');
  const [showCharts, setShowCharts] = useState(false);
  const [allPatientData, setAllPatientData] = useState([]);
  const [loadingPatientData, setLoadingPatientData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const heartRateChartRef = useRef(null);
  const oxygenChartRef = useRef(null);

  const fetchAnalyticsData = async () => {
    // Placeholder for future analytics data fetching
  };

  const fetchAllPatientData = async () => {
    setLoadingPatientData(true);
    try {
      const response = await apiService.getAllPatientData();
      console.log('All patient data response:', response);
      // Assuming the response has a data array or is directly an array
      const data = Array.isArray(response) ? response : response.data || response.items || [];
      setAllPatientData(data);
    } catch (error) {
      console.error('Error fetching all patient data:', error);
      setAllPatientData([]);
    } finally {
      setLoadingPatientData(false);
    }
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

  const downloadChart = async (chartRef, chartName) => {
    if (!chartRef.current) {
      alert('Chart not available for download');
      return;
    }

    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      });

      const link = document.createElement('a');
      link.download = `${chartName}_Patient_${patientId}_${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading chart:', error);
      alert('Failed to download chart. Please try again.');
    }
  };

  const downloadHeartRateChart = () => {
    downloadChart(heartRateChartRef, 'Heart_Rate_Chart');
  };

  const downloadOxygenChart = () => {
    downloadChart(oxygenChartRef, 'Oxygen_Level_Chart');
  };

  const downloadBothCharts = async () => {
    if (!heartRateChartRef.current || !oxygenChartRef.current) {
      alert('Charts not available for download');
      return;
    }

    try {
      // Create a container with both charts
      const container = document.createElement('div');
      container.style.backgroundColor = '#ffffff';
      container.style.padding = '20px';
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.width = '1200px';

      // Clone both chart elements
      const heartRateClone = heartRateChartRef.current.cloneNode(true);
      const oxygenClone = oxygenChartRef.current.cloneNode(true);
      
      // Add title
      const title = document.createElement('h2');
      title.textContent = `Patient ${patientId} - Vital Signs Analysis`;
      title.style.textAlign = 'center';
      title.style.marginBottom = '30px';
      title.style.color = '#333';

      container.appendChild(title);
      container.appendChild(heartRateClone);
      container.appendChild(oxygenClone);
      document.body.appendChild(container);

      const canvas = await html2canvas(container, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: 1200,
        height: container.scrollHeight
      });

      // Clean up
      document.body.removeChild(container);

      const link = document.createElement('a');
      link.download = `Patient_${patientId}_Complete_Analysis_${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading combined charts:', error);
      alert('Failed to download charts. Please try again.');
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
    fetchAllPatientData();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Analytics & Reports</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          {showCharts && patientId && (
            <div className="btn-group me-2">
              <button 
                className="btn btn-outline-danger btn-sm"
                onClick={downloadHeartRateChart}
                title="Download Heart Rate Chart"
              >
                <i className="bi bi-download me-1"></i>
                Heart Rate
              </button>
              <button 
                className="btn btn-outline-primary btn-sm"
                onClick={downloadOxygenChart}
                title="Download Oxygen Level Chart"
              >
                <i className="bi bi-download me-1"></i>
                Oxygen Level
              </button>
              <button 
                className="btn btn-success btn-sm"
                onClick={downloadBothCharts}
                title="Download Both Charts"
              >
                <i className="bi bi-download me-1"></i>
                Both Charts
              </button>
            </div>
          )}
          <button className="btn btn-outline-secondary" onClick={() => { fetchAnalyticsData(); fetchAllPatientData(); }}>
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

      {/* All Patient Data Table */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-table me-2"></i>
                All Patient Data
              </h5>
              <button 
                className="btn btn-outline-primary btn-sm"
                onClick={fetchAllPatientData}
                disabled={loadingPatientData}
              >
                {loadingPatientData ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Loading...
                  </>
                ) : (
                  <>
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Refresh Data
                  </>
                )}
              </button>
            </div>
            <div className="card-body">
              {loadingPatientData ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 text-muted">Loading patient data...</p>
                </div>
              ) : allPatientData.length > 0 ? (
                <>
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead className="table-dark">
                        <tr>
                          <th>Patient ID</th>
                          <th>Timestamp</th>
                          <th>Heart Rate (BPM)</th>
                          <th>Oxygen Level (%)</th>
                          <th>Inactivity (min)</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allPatientData
                          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                          .map((record, index) => {
                            const heartRate = record.heartRate;
                            const oxygenLevel = record.oxygenLevel;
                            const inactivity = record.inactivityMinutes || 0;
                            
                            // Determine status based on critical conditions
                            let status = 'Normal';
                            let statusClass = 'text-success';
                            
                            if ((heartRate && (heartRate > 120 || heartRate < 50)) || 
                                (oxygenLevel && oxygenLevel < 92) || 
                                inactivity > 60) {
                              status = 'Critical';
                              statusClass = 'text-danger';
                            } else if ((heartRate && (heartRate > 100 || heartRate < 60)) || 
                                     (oxygenLevel && oxygenLevel < 95)) {
                              status = 'Warning';
                              statusClass = 'text-warning';
                            }
                            
                            return (
                              <tr key={`${record.patientId}-${record.timestamp}-${index}`}>
                                <td>
                                  <strong>{record.patientId}</strong>
                                </td>
                                <td>
                                  {record.timestamp ? 
                                    new Date(record.timestamp * 1000).toLocaleString() : 
                                    'N/A'
                                  }
                                </td>
                                <td>
                                  {heartRate ? (
                                    <span className={heartRate > 120 || heartRate < 50 ? 'text-danger fw-bold' : ''}>
                                      {heartRate}
                                    </span>
                                  ) : 'N/A'}
                                </td>
                                <td>
                                  {oxygenLevel ? (
                                    <span className={oxygenLevel < 92 ? 'text-danger fw-bold' : ''}>
                                      {oxygenLevel}%
                                    </span>
                                  ) : 'N/A'}
                                </td>
                                <td>
                                  <span className={inactivity > 60 ? 'text-danger fw-bold' : ''}>
                                    {inactivity}
                                  </span>
                                </td>
                                <td>
                                  <span className={`fw-bold ${statusClass}`}>
                                    {status}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination */}
                  {allPatientData.length > itemsPerPage && (
                    <nav className="mt-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="text-muted">
                          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, allPatientData.length)} of {allPatientData.length} records
                        </div>
                        <ul className="pagination pagination-sm mb-0">
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button 
                              className="page-link" 
                              onClick={() => setCurrentPage(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              Previous
                            </button>
                          </li>
                          {[...Array(Math.ceil(allPatientData.length / itemsPerPage))].map((_, i) => (
                            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                              <button 
                                className="page-link" 
                                onClick={() => setCurrentPage(i + 1)}
                              >
                                {i + 1}
                              </button>
                            </li>
                          ))}
                          <li className={`page-item ${currentPage === Math.ceil(allPatientData.length / itemsPerPage) ? 'disabled' : ''}`}>
                            <button 
                              className="page-link" 
                              onClick={() => setCurrentPage(currentPage + 1)}
                              disabled={currentPage === Math.ceil(allPatientData.length / itemsPerPage)}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  )}
                </>
              ) : (
                <div className="text-center text-muted py-4">
                  <i className="bi bi-inbox" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
                  <h5 className="mt-3">No Patient Data Available</h5>
                  <p>No patient telemetry data has been recorded yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      {showCharts && patientId && (
        <div className="row mb-4">
          <div className="col-12 mb-4">
            <div ref={heartRateChartRef}>
              <HeartRateChart patientId={patientId} autoLoad={true} />
            </div>
          </div>
          <div className="col-12 mb-4">
            <div ref={oxygenChartRef}>
              <OxygenLevelChart patientId={patientId} autoLoad={true} />
            </div>
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
