import React, { useState } from "react";
import { submitApplication } from "../services/applicationService";

// No markup/spacing changed, still Bootstrap
function ConfirmationPage({ formData, onEdit, resetForm }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFinalSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      await submitApplication(formData);
      setSuccess(true);
      setTimeout(resetForm, 2000); // Reset after 2 seconds for user to see success
    } catch (err) {
      setError("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success)
    return (
      <div className="alert alert-success text-center">
        Application submitted successfully!
      </div>
    );

  return (
    <div>
      <h4 className="mb-4 text-center">Please Confirm Your Details</h4>
      <ul className="list-group mb-3">
        <li className="list-group-item">
          <b>Full Name:</b> {formData.fullName}
        </li>
        <li className="list-group-item">
          <b>Phone Number:</b> {formData.phoneNumber}
        </li>
        <li className="list-group-item">
          <b>Email Address:</b> {formData.email}
        </li>
        <li className="list-group-item">
          <b>Profile Type:</b> {formData.profileType}
        </li>
        <li className="list-group-item">
          <b>Credit Card Type:</b> {formData.creditCardType}
        </li>
        <li className="list-group-item">
          <b>ID Proof:</b> {formData.idProof ? formData.idProof.name : "-"}
        </li>
        <li className="list-group-item">
          <b>Address Proof:</b> {formData.addressProof ? formData.addressProof.name : "-"}
        </li>
        <li className="list-group-item">
          <b>Income Proof:</b> {formData.incomeProof ? formData.incomeProof.name : "-"}
        </li>
      </ul>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-secondary" onClick={onEdit} disabled={loading}>
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
