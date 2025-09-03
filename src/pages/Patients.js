import React, { useState, useEffect } from 'react';
import AddPatient from '../components/AddPatient';
import apiService from '../services/api';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPatient, setEditingPatient] = useState(null);
  const [deletingPatient, setDeletingPatient] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    age: '',
    gender: '',
    contact: ''
  });

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
    setSuccess('Patient added successfully!');
    setError(null);
    // Clear success message after 5 seconds
    setTimeout(() => setSuccess(null), 5000);
    fetchPatients(); // Refresh the list
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setEditForm({
      name: patient.name || '',
      age: patient.age || '',
      gender: patient.gender || '',
      contact: patient.contact || patient.phoneNumber || ''
    });
    setShowAddForm(false); // Close add form if open
    setSuccess(null); // Clear any success messages
    setError(null); // Clear any error messages
  };

  const handleCancelEdit = () => {
    setEditingPatient(null);
    setEditForm({
      name: '',
      age: '',
      gender: '',
      contact: ''
    });
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdatePatient = async () => {
    try {
      setLoading(true);
      const patientId = editingPatient.id || editingPatient.patientId;
      
      await apiService.updatePatient(patientId, {
        name: editForm.name,
        age: parseInt(editForm.age, 10),
        gender: editForm.gender,
        contact: editForm.contact
      });

      setError(null);
      setSuccess(`Patient "${editForm.name}" updated successfully!`);
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000);
      handleCancelEdit();
      fetchPatients(); // Refresh the list
    } catch (err) {
      setError('Failed to update patient');
      setSuccess(null);
      console.error('Patient update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatient = (patient) => {
    setDeletingPatient(patient);
    setSuccess(null); // Clear any success messages
    setError(null); // Clear any error messages
  };

  const confirmDeletePatient = async () => {
    try {
      setLoading(true);
      const patientId = deletingPatient.id || deletingPatient.patientId;
      
      await apiService.deletePatient(patientId);

      setError(null);
      setSuccess(`Patient "${deletingPatient.name}" deleted successfully!`);
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000);
      setDeletingPatient(null);
      fetchPatients(); // Refresh the list
    } catch (err) {
      setError('Failed to delete patient');
      setSuccess(null);
      console.error('Patient delete error:', err);
    } finally {
      setLoading(false);
    }
  };

  const cancelDeletePatient = () => {
    setDeletingPatient(null);
  };

  const filteredPatients = patients.filter(patient =>
    (patient.name && patient.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (patient.id && patient.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (patient.patientId && patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate statistics
  const totalPatients = patients.length;
  const malePatients = patients.filter(patient => patient.gender?.toLowerCase() === 'male').length;
  const femalePatients = patients.filter(patient => patient.gender?.toLowerCase() === 'female').length;
  const averageAge = totalPatients > 0 
    ? Math.round(patients.reduce((sum, patient) => sum + (parseInt(patient.age) || 0), 0) / totalPatients)
    : 0;

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
            onClick={() => {
              setShowAddForm(!showAddForm);
              if (editingPatient) handleCancelEdit(); // Close edit form if open
              if (deletingPatient) setDeletingPatient(null); // Close delete modal if open
              setSuccess(null); // Clear success messages
              setError(null); // Clear error messages
            }}
          >
            <i className="bi bi-person-plus me-1"></i>
            {showAddForm ? 'Cancel' : 'Add Patient'}
          </button>
          <button 
            className="btn btn-outline-secondary" 
            onClick={() => {
              fetchPatients();
              if (deletingPatient) setDeletingPatient(null); // Close delete modal if open
              setSuccess(null); // Clear success messages
              setError(null); // Clear error messages
            }}
          >
            <i className="bi bi-arrow-clockwise me-1"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Patient Statistics Cards */}
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Patients
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {loading ? '...' : totalPatients}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-people text-primary" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Male Patients
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {loading ? '...' : malePatients}
                    {!loading && totalPatients > 0 && (
                      <small className="text-muted ms-2">({Math.round((malePatients / totalPatients) * 100)}%)</small>
                    )}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-person text-success" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Female Patients
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {loading ? '...' : femalePatients}
                    {!loading && totalPatients > 0 && (
                      <small className="text-muted ms-2">({Math.round((femalePatients / totalPatients) * 100)}%)</small>
                    )}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-person-dress text-info" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Average Age
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {loading ? '...' : `${averageAge} years`}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="bi bi-calendar-date text-warning" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
            </div>
          </div>
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

      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="bi bi-check-circle me-2"></i>
          {success}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setSuccess(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingPatient && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Confirm Delete Patient
                </h5>
              </div>
              <div className="modal-body">
                <p className="mb-3">
                  Are you sure you want to delete this patient? This action cannot be undone.
                </p>
                <div className="card bg-light">
                  <div className="card-body">
                    <h6 className="card-title">Patient Details:</h6>
                    <p className="card-text mb-1">
                      <strong>ID:</strong> {deletingPatient.id || deletingPatient.patientId}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Name:</strong> {deletingPatient.name}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Age:</strong> {deletingPatient.age}
                    </p>
                    <p className="card-text mb-0">
                      <strong>Contact:</strong> {deletingPatient.contact || deletingPatient.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={cancelDeletePatient}
                  disabled={loading}
                >
                  <i className="bi bi-x-lg me-2"></i>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={confirmDeletePatient}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-trash me-2"></i>
                      Delete Patient
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Patient Form */}
      {editingPatient && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-warning">
              <div className="card-header bg-warning text-dark">
                <h5 className="mb-0">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Patient: {editingPatient.name}
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => { e.preventDefault(); handleUpdatePatient(); }}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editForm.name}
                          onChange={(e) => handleEditFormChange('name', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Age *</label>
                        <input
                          type="number"
                          className="form-control"
                          value={editForm.age}
                          onChange={(e) => handleEditFormChange('age', e.target.value)}
                          min="1"
                          max="120"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Gender *</label>
                        <select
                          className="form-select"
                          value={editForm.gender}
                          onChange={(e) => handleEditFormChange('gender', e.target.value)}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Contact *</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={editForm.contact}
                          onChange={(e) => handleEditFormChange('contact', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button 
                      type="submit" 
                      className="btn btn-warning"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Updating...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-lg me-2"></i>
                          Update Patient
                        </>
                      )}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={handleCancelEdit}
                      disabled={loading}
                    >
                      <i className="bi bi-x-lg me-2"></i>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
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
                            <div className="btn-group btn-group-sm" role="group">
                              <button 
                                className="btn btn-outline-secondary" 
                                title="Edit Patient"
                                onClick={() => handleEditPatient(patient)}
                                disabled={loading}
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button 
                                className="btn btn-outline-danger" 
                                title="Delete Patient"
                                onClick={() => handleDeletePatient(patient)}
                                disabled={loading}
                              >
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
