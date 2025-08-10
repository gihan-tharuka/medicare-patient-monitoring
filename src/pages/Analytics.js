import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import HeartRateChart from '../components/HeartRateChart';
import OxygenLevelChart from '../components/OxygenLevelChart';

const Analytics = () => {
  const [patientId, setPatientId] = useState('');
  const [showCharts, setShowCharts] = useState(false);
  const heartRateChartRef = useRef(null);
  const oxygenChartRef = useRef(null);

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
