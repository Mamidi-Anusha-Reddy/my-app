import React from "react";
import { getDocument } from "../services/apiService";

function ApplicationConfirmation({ application }) {
  const viewDoc = async (docType) => {
    try {
      const res = await getDocument(application.id, docType);
      const fileURL = URL.createObjectURL(new Blob([res.data]));
      window.open(fileURL);
    } catch (err) {
      alert("Failed to fetch document");
    }
  };

  return (
    <div
      className="container py-4"
      style={{
        maxWidth: "900px",
        margin: "auto",
        backgroundColor: "#ffffff",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        padding: "30px 40px",
        marginTop: "40px",
      }}
    >
      <h4 className="text-success fw-bold">✔ Application Submitted</h4>
      <hr />
      <p><strong>Full Name:</strong> {application.fullName}</p>
      <p><strong>Email:</strong> {application.email}</p>
      <p><strong>Phone:</strong> {application.phoneNumber}</p>
      <p><strong>Credit Card:</strong> {application.creditCardType}</p>
      <p><strong>Profile Type:</strong> {application.profileType}</p>

      <h5>Documents</h5>
      <button className="btn btn-outline-primary btn-sm me-2" onClick={() => viewDoc("idProof")}>
        View ID Proof
      </button>
      <button className="btn btn-outline-primary btn-sm me-2" onClick={() => viewDoc("addressProof")}>
        View Address Proof
      </button>
      <button className="btn btn-outline-primary btn-sm" onClick={() => viewDoc("incomeProof")}>
        View Income Proof
      </button>
    </div>
  );
}

export default ApplicationConfirmation;
