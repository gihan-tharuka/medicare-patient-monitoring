import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,   // for 'category' scale on x-axis
  LinearScale,     // for linear scale on y-axis
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import apiService from '../services/api';

// Register Chart.js components before using the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PatientTrend = () => {
  const [patientId, setPatientId] = useState('');
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrend = async () => {
    if (!patientId) {
      setError('Please enter a patient ID');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getPatientTrend(patientId);
      setTrendData(data);
    } catch (err) {
      setError('Could not fetch trend data');
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: trendData.map(d => new Date(d.timestamp * 1000).toLocaleString()),
    datasets: [
      {
        label: 'Heart Rate',
        data: trendData.map(d => d.heartRate),
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Oxygen Level',
        data: trendData.map(d => d.oxygenLevel),
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Trend for Patient ${patientId}`,
      },
    },
    scales: {
      x: {
        type: 'category',
        title: { display: true, text: 'Timestamp' },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Value' },
      },
    },
  };

  return (
    <div className="card mt-4 mb-4">
      <div className="card-header">
        <h5 className="mb-0">Patient Trend Analysis</h5>
      </div>
      <div className="card-body">
        <div className="row g-3 align-items-end">
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Patient ID (e.g. P001)"
              value={patientId}
              onChange={e => setPatientId(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary" disabled={loading} onClick={fetchTrend}>
              {loading ? 'Loading...' : 'Show Trend'}
            </button>
          </div>
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {!loading && trendData.length > 0 && (
          <div className="mt-4">
            <Line options={options} data={chartData} />
          </div>
        )}
        {!loading && !error && trendData.length === 0 && (
          <div className="text-muted mt-4">No trend data to display.</div>
        )}
      </div>
    </div>
  );
};

export default PatientTrend;
