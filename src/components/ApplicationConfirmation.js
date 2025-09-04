import React, { useState } from "react";
import { submitApplication } from "../services/applicationService";

function ConfirmationPage({ formData, onEdit }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFinalSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      await submitApplication(formData);
      setSuccess(true);
    } catch {
      setError("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success)
    return (
      <div className="container my-5">
        <div className="alert alert-success text-center">Application submitted successfully!</div>
      </div>
    );

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-center">Confirm Your Details</h3>
      <dl className="row">
        <dt className="col-sm-3">Full Name</dt>
        <dd className="col-sm-9">{formData.fullName}</dd>

        <dt className="col-sm-3">Email Address</dt>
        <dd className="col-sm-9">{formData.email}</dd>

        <dt className="col-sm-3">Phone Number</dt>
        <dd className="col-sm-9">{formData.phoneNumber}</dd>

        <dt className="col-sm-3">Profile Type</dt>
        <dd className="col-sm-9">{formData.profileType}</dd>

        <dt className="col-sm-3">Credit Card Type</dt>
        <dd className="col-sm-9">{formData.creditCardType}</dd>

        <dt className="col-sm-3">ID Proof File</dt>
        <dd className="col-sm-9">{formData.idProof ? formData.idProof.name : "-"}</dd>

        <dt className="col-sm-3">Address Proof File</dt>
        <dd className="col-sm-9">{formData.addressProof ? formData.addressProof.name : "-"}</dd>

        <dt className="col-sm-3">Income Proof File</dt>
        <dd className="col-sm-9">{formData.incomeProof ? formData.incomeProof.name : "-"}</dd>
      </dl>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={onEdit} disabled={loading}>
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
