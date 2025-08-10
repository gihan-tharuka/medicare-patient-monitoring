import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import apiService from '../services/api';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OxygenLevelChart = ({ patientId: propPatientId, autoLoad = false }) => {
  const [patientId, setPatientId] = useState(propPatientId || '');
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrend = async (id = patientId) => {
    if (!id) {
      setError('Please enter a patient ID');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getPatientTrend(id);
      setTrendData(data);
    } catch (err) {
      setError('Could not fetch oxygen level data');
    } finally {
      setLoading(false);
    }
  };

  // Update patient ID when prop changes
  React.useEffect(() => {
    if (propPatientId) {
      setPatientId(propPatientId);
    }
  }, [propPatientId]);

  // Auto-load when propPatientId changes
  React.useEffect(() => {
    if (propPatientId && autoLoad) {
      fetchTrend(propPatientId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propPatientId, autoLoad]);

  const chartData = {
    labels: trendData.map(d => new Date(d.timestamp * 1000).toLocaleString()),
    datasets: [
      {
        label: 'Oxygen Saturation (%)',
        data: trendData.map(d => d.oxygenLevel),
        borderColor: 'rgb(13, 110, 253)',
        backgroundColor: 'rgba(13, 110, 253, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(13, 110, 253)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: `Oxygen Saturation Trend - Patient ${patientId}`,
        color: '#333',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      x: {
        type: 'category',
        title: { 
          display: true, 
          text: 'Time',
          color: '#666',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        grid: {
          color: '#e9ecef'
        },
        ticks: {
          color: '#666',
          maxTicksLimit: 10
        }
      },
      y: {
        beginAtZero: false,
        min: 85,
        max: 100,
        title: { 
          display: true, 
          text: 'Oxygen Saturation (%)',
          color: '#666',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        grid: {
          color: '#e9ecef'
        },
        ticks: {
          color: '#666',
          callback: function(value) {
            return value + '%';
          }
        }
      },
    },
  };

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          <i className="bi bi-lungs me-2"></i>
          Oxygen Saturation Analysis
        </h5>
      </div>
      <div className="card-body">
        {!propPatientId && (
          <div className="row g-3 align-items-end mb-3">
            <div className="col-auto">
              <label className="form-label text-muted small">Patient ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. P001"
                value={patientId}
                onChange={e => setPatientId(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button 
                className="btn btn-primary" 
                disabled={loading} 
                onClick={() => fetchTrend()}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Loading...
                  </>
                ) : (
                  <>
                    <i className="bi bi-graph-up me-1"></i>
                    Show Oxygen Levels
                  </>
                )}
              </button>
            </div>
          </div>
        )}
        
        {error && (
          <div className="alert alert-danger">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}
        
        {!loading && trendData.length > 0 && (
          <div style={{ height: '400px' }}>
            <Line options={options} data={chartData} />
          </div>
        )}
        
        {!loading && !error && trendData.length === 0 && patientId && (
          <div className="text-center text-muted py-5">
            <i className="bi bi-graph-down" style={{ fontSize: '3rem' }}></i>
            <p className="mt-2">No oxygen saturation data available for this patient.</p>
          </div>
        )}
        
        {!patientId && !loading && (
          <div className="text-center text-muted py-5">
            <i className="bi bi-lungs" style={{ fontSize: '3rem' }}></i>
            <p className="mt-2">Enter a patient ID to view oxygen saturation trends.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OxygenLevelChart;
