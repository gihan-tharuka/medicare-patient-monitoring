import React, { useState, useEffect } from 'react';
import AddPatient from '../components/AddPatient';
import apiService from '../services/api';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllPatients();
      console.log('Fetched patients:', data);
      setPatients(data.patients || data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patients');
      console.error('Patients fetch error:', err);
      // Fallback to empty array if API fails
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePatientAdded = () => {
    setShowAddForm(false);
    fetchPatients(); // Refresh the list
  };

  const filteredPatients = patients.filter(patient =>
    (patient.name && patient.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (patient.id && patient.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (patient.patientId && patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Patient Management</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button 
            className="btn btn-primary me-2" 
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <i className="bi bi-person-plus me-1"></i>
            {showAddForm ? 'Cancel' : 'Add Patient'}
          </button>
          <button className="btn btn-outline-secondary" onClick={fetchPatients}>
            <i className="bi bi-arrow-clockwise me-1"></i>
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
          <div className="mt-2">
            <small>Please check your internet connection and try again. If the problem persists, contact support.</small>
          </div>
        </div>
      )}

      {/* Add Patient Form */}
      {showAddForm && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Add New Patient</h5>
              </div>
              <div className="card-body">
                <AddPatient onSuccess={handlePatientAdded} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search patients by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-end">
            <span className="badge bg-secondary fs-6">
              {filteredPatients.length} of {patients.length} patient(s) found
            </span>
          </div>
        </div>
      </div>

      {/* Patients List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Patients List</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading patients...</p>
                </div>
              ) : filteredPatients.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-people" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                  <p className="mt-2 text-muted">
                    {searchTerm ? 'No patients found matching your search.' : 'No patients registered yet.'}
                  </p>
                  {!searchTerm && (
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowAddForm(true)}
                    >
                      Add First Patient
                    </button>
                  )}
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Patient ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients.map((patient, index) => (
                        <tr key={patient.id || patient.patientId || index}>
                          <td>
                            <strong>{patient.id || patient.patientId || 'N/A'}</strong>
                          </td>
                          <td>{patient.name || 'N/A'}</td>
                          <td>{patient.age || 'N/A'}</td>
                          <td>{patient.gender || 'N/A'}</td>
                          <td>{patient.contact || patient.phoneNumber || 'N/A'}</td>
                          <td>
                            <span className={`badge ${
                              (patient.status === 'Active' || patient.status === 'active') ? 'bg-success' : 'bg-secondary'
                            }`}>
                              {patient.status || 'Unknown'}
                            </span>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm" role="group">
                              <button className="btn btn-outline-primary" title="View Details">
                                <i className="bi bi-eye"></i>
                              </button>
                              <button className="btn btn-outline-secondary" title="Edit Patient">
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button className="btn btn-outline-danger" title="Delete Patient">
                                <i className="bi bi-trash"></i>
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

export default Patients;
