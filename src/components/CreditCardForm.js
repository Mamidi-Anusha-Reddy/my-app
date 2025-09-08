import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ApplicationService from "../services/applicationService";

const creditCardTypes = [
  { label: "Gold Card", value: "Gold Card" },
  { label: "Platinum Card", value: "Platinum Card" },
  { label: "Silver Card", value: "Silver Card" }
];

const profileTypes = [
  { label: "Existing Profile", value: "Existing Profile" },
  { label: "New Profile", value: "New Profile" }
];

const initialFormData = {
  fullName: "",
  phoneNumber: "",
  email: "",
  creditCardType: "",
  idProof: null,
  addressProof: null,
  incomeProof: null,
  profileType: ""
};

function CreditCardApplicationForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [finalSubmit, setFinalSubmit] = useState(false);
  const [applicationId, setApplicationId] = useState(null); // backend id

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validate form
  const validateForm = () => {
    return (
      formData.fullName.trim() &&
      formData.phoneNumber.trim() &&
      formData.email.trim() &&
      formData.creditCardType.trim() &&
      formData.idProof &&
      formData.addressProof &&
      formData.incomeProof &&
      formData.profileType.trim()
    );
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill all required fields and upload files.");
      return;
    }

    // Prepare multipart form data
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("email", formData.email);
    data.append("creditCardType", formData.creditCardType);
    data.append("profileType", formData.profileType);
    data.append("idProof", formData.idProof);
    data.append("addressProof", formData.addressProof);
    data.append("incomeProof", formData.incomeProof);

    try {
      const response = await ApplicationService.submitApplication(data);
      setApplicationId(response.data.id); // store backend id
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Failed to submit application. Please try again.");
    }
  };

  // Final submission after confirmation
  const handleFinalSubmit = () => {
    setFinalSubmit(true);
  };

  // Edit form
  const handleEdit = () => {
    setSubmitted(false);
    setFinalSubmit(false);
  };

  // Go back
  const handleGoBack = () => {
    setFormData(initialFormData);
    setSubmitted(false);
    setFinalSubmit(false);
    setApplicationId(null);
  };

  // Fetch document from backend and open
  const handleViewDocument = async (docType) => {
    try {
      const res = await ApplicationService.getDocument(applicationId, docType);
      const file = new Blob([res.data], { type: res.headers["content-type"] });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    } catch (err) {
      console.error("Error fetching document:", err);
      alert("Unable to fetch document from server.");
    }
  };

  // Show file name
  const fileNameOrPlaceholder = (file) => (file ? file.name : "No file chosen");

  return (
    <div
      className="container py-4"
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#ffffff",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        padding: "30px 40px",
      }}
    >
      <h3 className="text-center mb-4" style={{ fontWeight: "700", color: "#313335ff" }}>
        Credit Card Application Form
      </h3>

      {!submitted && (
        <form onSubmit={handleSubmit} style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "6px" }}>
          {/* Personal Info */}
          <div className="mb-4">
            <h5 style={{ borderLeft: "4px solid #138496", paddingLeft: "12px", fontWeight: "600" }}>
              Personal Information
            </h5>
            <div className="row gy-3 mt-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Full Name *</label>
                <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Phone Number *</label>
                <input type="tel" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
              </div>
            </div>
            <div className="mt-3">
              <label className="form-label fw-semibold">Email Address *</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          {/* Product Selection */}
          <div className="mb-4">
            <h5 style={{ borderLeft: "4px solid #2978b5", paddingLeft: "12px", fontWeight: "600" }}>Product Selection</h5>
            <select name="creditCardType" className="form-select mt-3" value={formData.creditCardType} onChange={handleChange} required>
              <option value="">Select a credit card type</option>
              {creditCardTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Document Upload */}
          <div className="mb-4">
            <h5 style={{ borderLeft: "4px solid #138496", paddingLeft: "12px", fontWeight: "600" }}>Document Upload</h5>
            <div className="row gy-3 mt-3">
              {["idProof", "addressProof", "incomeProof"].map((doc) => (
                <div className="col-md-4" key={doc}>
                  <label className="form-label fw-semibold">{doc.replace("Proof", " Proof")} *</label>
                  <input type="file" className="form-control" name={doc} accept=".jpg,.jpeg,.png,.pdf" onChange={handleChange} required />
                  <small className="text-muted">{fileNameOrPlaceholder(formData[doc])}</small>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Info */}
          <div className="mb-4">
            <h5 style={{ borderLeft: "4px solid #2978b5", paddingLeft: "12px", fontWeight: "600" }}>Profile Information</h5>
            <select name="profileType" className="form-select mt-3" value={formData.profileType} onChange={handleChange} required>
              <option value="">Select profile type</option>
              {profileTypes.map((pt) => (
                <option key={pt.value} value={pt.value}>
                  {pt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success px-5 py-2 fw-semibold">Submit Application</button>
          </div>
        </form>
      )}

      {/* Confirmation Page */}
      {submitted && (
        <div className="p-4 rounded border" style={{ backgroundColor: "#ffffff" }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-success fw-bold">✔ Application Submitted</h4>
            <button className="btn btn-primary btn-sm" onClick={handleEdit}>Edit</button>
          </div>

          <h5>Application Details</h5>
          <p><b>Full Name:</b> {formData.fullName}</p>
          <p><b>Email:</b> {formData.email}</p>
          <p><b>Phone:</b> {formData.phoneNumber}</p>
          <p><b>Profile Type:</b> {formData.profileType}</p>
          <p><b>Card Type:</b> {formData.creditCardType}</p>

          <h6>Documents</h6>
          <div className="row">
            <div className="col-sm-4">
              <b>ID Proof</b> <br />
              <button className="btn btn-outline-primary btn-sm mt-1" onClick={() => handleViewDocument("idProof")}>View</button>
            </div>
            <div className="col-sm-4">
              <b>Address Proof</b> <br />
              <button className="btn btn-outline-primary btn-sm mt-1" onClick={() => handleViewDocument("addressProof")}>View</button>
            </div>
            <div className="col-sm-4">
              <b>Income Proof</b> <br />
              <button className="btn btn-outline-primary btn-sm mt-1" onClick={() => handleViewDocument("incomeProof")}>View</button>
            </div>
          </div>

          {finalSubmit ? (
            <div className="alert alert-success mt-3 text-center">Application Submitted Successfully</div>
          ) : (
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button onClick={handleFinalSubmit} className="btn btn-success px-4 fw-semibold">Final Submit</button>
              <button onClick={handleGoBack} className="btn btn-secondary px-4">Go Back to Home</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CreditCardApplicationForm;
