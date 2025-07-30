import React from 'react';

const PatientCount = ({ count, loading }) => {
return (
<div className="card bg-success text-white mb-4">
<div className="card-body text-center">
<h2 className="display-4 mb-2">
{loading ? '...' : count}
</h2>
<p className="card-text">Actively Monitored Patients</p>
</div>
</div>
);
};

export default PatientCount;