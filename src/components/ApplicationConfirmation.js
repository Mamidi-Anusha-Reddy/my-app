import React, { useState } from "react";
import { submitApplication } from "../services/applicationService";

function ConfirmationPage({ formData, onEdit, onFinalSubmit }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleFinalSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await submitApplication(formData);
      setSuccess(true);
      onFinalSubmit();
    } catch (err) {
      setError("Failed to submit application, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-3">
      <h3>Confirm Your Details</h3>
      <dl className="row">
        <dt className="col-sm-3">Full Name</dt>
        <dd className="col-sm-9">{formData.fullName || "-"}</dd>

        <dt className="col-sm-3">Email Address</dt>
        <dd className="col-sm-9">{formData.email || "-"}</dd>

        <dt className="col-sm-3">Phone Number</dt>
        <dd className="col-sm-9">{formData.phoneNumber || "-"}</dd>

        <dt className="col-sm-3">Profile Type</dt>
        <dd className="col-sm-9">{formData.profileType || "-"}</dd>

        <dt className="col-sm-3">Credit Card Type</dt>
        <dd className="col-sm-9">{formData.creditCardType || "-"}</dd>

        <dt className="col-sm-3">ID Proof File</dt>
        <dd className="col-sm-9">{formData.idProof ? formData.idProof.name : "-"}</dd>

        <dt className="col-sm-3">Address Proof File</dt>
        <dd className="col-sm-9">{formData.addressProof ? formData.addressProof.name : "-"}</dd>

        <dt className="col-sm-3">Income Proof File</dt>
        <dd className="col-sm-9">{formData.incomeProof ? formData.incomeProof.name : "-"}</dd>
      </dl>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success">
          Application submitted successfully!
        </div>
      )}

      <button className="btn btn-secondary me-2" onClick={onEdit} disabled={loading}>
        Edit
      </button>
      <button className="btn btn-primary" onClick={handleFinalSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Confirm & Submit"}
      </button>
    </div>
  );
}

export default ConfirmationPage;
