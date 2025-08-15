import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CardSubmission() {
  const location = useLocation();
  const navigate = useNavigate();
  const [finalSubmit, setFinalSubmit] = useState(false);

  const formData = location.state?.formData;

  if (!formData) {
    return <div className="container mt-5">No application data found.</div>;
  }

  const handleEdit = () => navigate("/", { state: { formData } });
  const handleFinalSubmit = () => setFinalSubmit(true);
  const handleGoBack = () => navigate("/home");

  const openFile = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  return (
    <div className="container mt-5 p-4 rounded border"
      style={{ backgroundColor: "#fff", boxShadow: "0 0 15px 2px #ceeac5" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-success fw-bold">
          &#x2714; Application Submitted
        </h4>
        <button className="btn btn-primary btn-sm" onClick={handleEdit}>
          Edit
        </button>
      </div>

      {/* Details */}
      <h5>Application Details</h5>
      <p><strong>Full Name:</strong> {formData.fullName}</p>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Phone:</strong> {formData.phoneNumber}</p>
      <p><strong>Profile Type:</strong> {formData.profileType}</p>
      <p><strong>Credit Card Type:</strong> {formData.creditCardType}</p>

      {/* Documents */}
      <h6 className="mt-4">Documentation</h6>
      <div className="row">
        <div className="col-sm-4">
          <strong>ID Proof</strong><br />
          <button onClick={() => openFile(formData.idProof)} className="btn btn-outline-primary btn-sm">View</button>
        </div>
        <div className="col-sm-4">
          <strong>Address Proof</strong><br />
          <button onClick={() => openFile(formData.addressProof)} className="btn btn-outline-primary btn-sm">View</button>
        </div>
        <div className="col-sm-4">
          <strong>Income Proof</strong><br />
          <button onClick={() => openFile(formData.incomeProof)} className="btn btn-outline-primary btn-sm">View</button>
        </div>
      </div>

      {finalSubmit ? (
        <div className="text-center mt-4">
          <div className="alert alert-success">Application Submitted Successfully</div>
          <button onClick={handleGoBack} className="btn btn-success">Go Back to Home</button>
        </div>
      ) : (
        <div className="text-center mt-4">
          <button onClick={handleFinalSubmit} className="btn btn-success me-2">Final Submit</button>
          <button onClick={handleGoBack} className="btn btn-success">Go Back to Home</button>
        </div>
      )}
    </div>
  );
}

export default CardSubmission;
