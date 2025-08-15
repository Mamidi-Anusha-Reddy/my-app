// pages/ApplicationSubmitted.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Row({ label, value }) {
  return (
    <div className="row mb-2">
      <div className="col-md-6 text-muted">{label}</div>
      <div className="col-md-6 fw-semibold">{value}</div>
    </div>
  );
}

function ApplicationSubmitted() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">No submission found. Please fill the form first.</div>
      </div>
    );
  }

  const openLink = (url) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener');
  };

  const goEdit = () => {
    navigate('/', { state: { prefill: state } });
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container py-4">
        <div className="bg-white shadow rounded-3 overflow-hidden" style={{ maxWidth: 1000, margin: '0 auto' }}>
          {/* Top bar */}
          <div className="px-4 py-3 d-flex align-items-center justify-content-between" style={{ backgroundColor: '#eaf7ee' }}>
            <div className="d-flex align-items-center gap-2">
              <span className="badge rounded-circle" style={{ backgroundColor: '#198754', width: 22, height: 22 }}></span>
              <h6 className="m-0 text-success">Application Submitted</h6>
            </div>
            <button className="btn btn-outline-secondary btn-sm" onClick={goEdit}>Edit</button>
          </div>

          <div className="px-4 py-4">
            <p className="text-muted mb-4">Review your submitted information below</p>

            <h6 className="text-secondary">Application Details</h6>

            {/* Personal Info */}
            <div className="border rounded p-3 mb-4">
              <h6 className="text-secondary mb-3">Personal Information</h6>
              <Row label="Full Name" value={state.fullName} />
              <Row label="Phone Number" value={state.phone} />
              <Row label="Email Address" value={state.email} />
              <Row label="Profile Type" value={state.profileType} />
            </div>

            {/* Product Info */}
            <div className="border rounded p-3 mb-4">
              <h6 className="text-secondary mb-3">Product Information</h6>
              <Row label="Selected Product" value={state.cardType} />
            </div>

            {/* Documentation */}
            <div className="border rounded p-3 mb-3">
              <h6 className="text-secondary mb-3">Documentation</h6>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="d-flex flex-column gap-1">
                    <span className="text-muted">ID Proof</span>
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-success">Submitted</span>
                      <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => openLink(state.links?.idProof)}>View</button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column gap-1">
                    <span className="text-muted">Address Proof</span>
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-success">Submitted</span>
                      <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => openLink(state.links?.addressProof)}>View</button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column gap-1">
                    <span className="text-muted">Income Proof</span>
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-success">Submitted</span>
                      <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => openLink(state.links?.incomeProof)}>View</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-success d-flex align-items-center" role="alert">
              <div>
                <strong>Application Submitted Successfully</strong>
                <div className="small">Your application is now under review. You will receive an update within 3–5 business days.</div>
              </div>
            </div>

            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-outline-secondary" onClick={goEdit}>Edit</button>
              <button className="btn btn-success" onClick={() => navigate('/home')}>Go Back to Homepage</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationSubmitted;