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
    } catch {
      setError("Failed to submit application, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-center mb-4">Confirm Your Details</h3>
      <dl className="row mb-3">
        <dt className="col-sm-4">Full Name</dt>
        <dd className="col-sm-8">{formData.fullName || "-"}</dd>

        <dt className="col-sm-4">Email Address</dt>
        <dd className="col-sm-8">{formData.email || "-"}</dd>

        <dt className="col-sm-4">Phone Number</dt>
        <dd className="col-sm-8">{formData.phoneNumber || "-"}</dd>

        <dt className="col-sm-4">Profile Type</dt>
        <dd className="col-sm-8">{formData.profileType || "-"}</dd>

        <dt className="col-sm-4">Credit Card Type</dt>
        <dd className="col-sm-8">{formData.creditCardType || "-"}</dd>

        <dt className="col-sm-4">ID Proof File</dt>
        <dd className="col-sm-8">{formData.idProof ? formData.idProof.name : "-"}</dd>

        <dt className="col-sm-4">Address Proof File</dt>
        <dd className="col-sm-8">{formData.addressProof ? formData.addressProof.name : "-"}</dd>

        <dt className="col-sm-4">Income Proof File</dt>
        <dd className="col-sm-8">{formData.incomeProof ? formData.incomeProof.name : "-"}</dd>
      </dl>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success">
          Application submitted successfully!
        </div>
      )}
      <div className="text-center">
        <button className="btn btn-secondary me-2" onClick={onEdit} disabled={loading}>
          Edit
        </button>
        <button className="btn btn-success" onClick={handleFinalSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Confirm & Submit"}
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPage;
