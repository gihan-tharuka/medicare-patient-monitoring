import React from 'react';

const AlertsList = ({ alerts, loading }) => {
if (loading) {
return (
<div className="card">
<div className="card-header">
<h5 className="mb-0">Recent Critical Alerts</h5>
</div>
<div className="card-body">
<div className="text-center">Loading alerts...</div>
</div>
</div>
);
}

return (
<div className="card">
<div className="card-header d-flex justify-content-between align-items-center">
<h5 className="mb-0">Recent Critical Alerts</h5>
<span className="badge bg-danger">{alerts.length}</span>
</div>
<div className="card-body">
{alerts.length === 0 ? (
<div className="text-center text-muted">No critical alerts</div>
) : (
<div className="list-group list-group-flush">
{alerts.map((alert, index) => (
<div key={alert.alertId || index} className="list-group-item">
<div className="d-flex justify-content-between align-items-start">
<div>
<h6 className="mb-1 text-danger">
Patient {alert.patientId}
</h6>
<p className="mb-1">{alert.message}</p>
<small className="text-muted">{alert.datetime}</small>
</div>
<span className="badge bg-danger rounded-pill">Critical</span>
</div>
</div>
))}
</div>
)}
</div>
</div>
);
};

export default AlertsList;