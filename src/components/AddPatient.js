import React, { useState } from 'react';
import apiService from '../services/api';

const AddPatient = ({ onSuccess }) => {
  const [form, setForm] = useState({ name: '', age: '', gender: '', contact: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      console.log('Submitting patient data:', form);
      const result = await apiService.createPatient(form);
      console.log('Patient created successfully:', result);
      setMessage('Patient created successfully!');
      setForm({ name: '', age: '', gender: '', contact: '' });
      onSuccess && onSuccess();
    } catch (err) {
      console.error('Error creating patient:', err);
      let errorMessage = 'Error creating patient';
      if (err.response) {
        errorMessage += `: ${err.response.status} - ${err.response.data?.message || err.response.statusText}`;
      } else if (err.request) {
        errorMessage += ': No response from server';
      } else {
        errorMessage += `: ${err.message}`;
      }
      setMessage(errorMessage);
    }
    setLoading(false);
  };

  return (
    <div className="card mb-4">
      <div className="card-header">Add New Patient</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-2">
            <div className="col-md-3">
              <input className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
            </div>
            <div className="col-md-2">
              <input className="form-control" name="age" value={form.age} onChange={handleChange} placeholder="Age" required type="number" min="0"/>
            </div>
            <div className="col-md-2">
              <select className="form-control" name="gender" value={form.gender} onChange={handleChange} required>
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-md-3">
              <input className="form-control" name="contact" value={form.contact} onChange={handleChange} placeholder="Phone/Email" required />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Add Patient'}
              </button>
            </div>
          </div>
        </form>
        {message && <div className="mt-2">{message}</div>}
      </div>
    </div>
  );
};

export default AddPatient;
