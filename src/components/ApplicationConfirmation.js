import React, { useState } from "react";
import { getApplication, getDocument } from "../services/apiService";

function ApplicationConfirmation() {
  const [appId, setAppId] = useState("");
  const [application, setApplication] = useState(null);

  const fetchDetails = async () => {
    try {
      const res = await getApplication(appId);
      setApplication(res.data);
    } catch (err) {
      alert("Error fetching application details");
    }
  };

  const viewDocument = async (docType) => {
    try {
      const res = await getDocument(appId, docType);
      const fileURL = URL.createObjectURL(new Blob([res.data]));
      window.open(fileURL);
    } catch (err) {
      alert("Error fetching document");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "900px", margin: "auto" }}>
      <h3 className="text-center mb-4">Application Confirmation</h3>

      <div className="d-flex mb-3">
        <input
          type="text"
          placeholder="Enter Application ID"
          className="form-control me-2"
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
        />
        <button onClick={fetchDetails} className="btn btn-primary">
          Fetch
        </button>
      </div>

      {application && (
        <div className="border p-3 rounded">
          <h5>Application Details</h5>
          <p><strong>Full Name:</strong> {application.fullName}</p>
          <p><strong>Email:</strong> {application.email}</p>
          <p><strong>Phone:</strong> {application.phoneNumber}</p>
          <p><strong>Credit Card:</strong> {application.creditCardType}</p>
          <p><strong>Profile Type:</strong> {application.profileType}</p>

          <h6>Documents</h6>
          <button className="btn btn-outline-info btn-sm me-2" onClick={() => viewDocument("idProof")}>
            View ID Proof
          </button>
          <button className="btn btn-outline-info btn-sm me-2" onClick={() => viewDocument("addressProof")}>
            View Address Proof
          </button>
          <button className="btn btn-outline-info btn-sm" onClick={() => viewDocument("incomeProof")}>
            View Income Proof
          </button>
        </div>
      )}
    </div>
  );
}

export default ApplicationConfirmation;
