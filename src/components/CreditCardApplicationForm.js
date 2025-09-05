import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { submitApplication } from './services/applicationService';

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Form validation - basic required fields check
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

  // Submit handler (move to confirmation)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill all required fields and upload files.");
      return;
    }
    setSubmitted(true);
  };

  // Final submission after confirmation page
  const handleFinalSubmit = async () => {
    try {
      const applicationData = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        creditCardType: formData.creditCardType,
        profileType: formData.profileType
      };
      
      const files = {
        idProof: formData.idProof,
        addressProof: formData.addressProof,
        incomeProof: formData.incomeProof
      };
      
      const result = await submitApplication(applicationData, files);
      console.log('Application submitted successfully:', result);
      setFinalSubmit(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  // Edit form - back to form page with data
  const handleEdit = () => {
    setSubmitted(false);
    setFinalSubmit(false);
  };

  // Go back to home (clear form & states)
  const handleGoBack = () => {
    setFormData(initialFormData);
    setSubmitted(false);
    setFinalSubmit(false);
  };

  // Helper function to display file name or placeholder
  const fileNameOrPlaceholder = (file) =>
    file ? file.name : "No file chosen";

  return (
    <div
      className="container py-4"
      // Adjusted styles for centering and width coverage
      style={{
        maxWidth: "900px",
        minWidth: "320px",
        marginLeft: "auto",
        marginRight: "auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#ffffff",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        padding: "30px 40px",
        marginTop: "40px",
        marginBottom: "40px"
      }}
    >
      {/* Header */}
      <h3
        className="text-center mb-4"
        style={{
          fontWeight: "700",
          color: "#313335ff",
          letterSpacing: "1px"
        }}
      >
        Credit Card Application Form
      </h3>

      {!submitted && (
        <>
          {/* Application Form Header */}
          <div className="rounded mb-3" style={{ backgroundColor: "#2d66e3ff", padding: "14px 20px" }}>
            <h5 style={{ color: "white", fontWeight: "700" }}>
              Application Form
            </h5>
            <small style={{ color: "#cce4f7" }}>
              Please fill all required fields to complete your application
            </small>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "6px" }}
          >
            {/* Personal Information */}
            <div className="mb-4">
              <h5 style={{ borderLeft: "4px solid #138496", paddingLeft: "12px", color: "#222", fontWeight: "600" }}>
                Personal Information
              </h5>
              <div className="row gy-3 mt-3">
                <div className="col-md-6">
                  <label htmlFor="fullName" className="form-label fw-semibold" style={{ color: "#222" }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phoneNumber" className="form-label fw-semibold" style={{ color: "#222" }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    pattern="[0-9]{10,15}"
                    title="Please enter a valid phone number (10-15 digits)"
                    autoComplete="tel"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label htmlFor="email" className="form-label fw-semibold" style={{ color: "#222" }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Product Selection */}
            <div className="mb-4">
              <h5 style={{ borderLeft: "4px solid #2978b5", paddingLeft: "12px", color: "#222", fontWeight: "600" }}>
                Product Selection
              </h5>
              <label htmlFor="creditCardType" className="form-label fw-semibold mt-3" style={{ color: "#222" }}>
                Credit Card Type *
              </label>
              <select
                id="creditCardType"
                name="creditCardType"
                className="form-select"
                value={formData.creditCardType}
                onChange={handleChange}
                required
              >
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
              <h5 style={{ borderLeft: "4px solid #138496", paddingLeft: "12px", color: "#222", fontWeight: "600" }}>
                Document Upload
              </h5>

              <div className="row gy-3 mt-3">
                <div className="col-md-4">
                  <label className="form-label fw-semibold" style={{ color: "#222" }}>
                    ID Proof *
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept=".jpg,.jpeg,.png,.pdf"
                    name="idProof"
                    onChange={handleChange}
                    required
                  />
                  <small className="text-muted">{fileNameOrPlaceholder(formData.idProof)}</small>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold" style={{ color: "#222" }}>
                    Address Proof *
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept=".jpg,.jpeg,.png,.pdf"
                    name="addressProof"
                    onChange={handleChange}
                    required
                  />
                  <small className="text-muted">{fileNameOrPlaceholder(formData.addressProof)}</small>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold" style={{ color: "#222" }}>
                    Income Proof *
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept=".jpg,.jpeg,.png,.pdf"
                    name="incomeProof"
                    onChange={handleChange}
                    required
                  />
                  <small className="text-muted">{fileNameOrPlaceholder(formData.incomeProof)}</small>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="mb-4">
              <h5 style={{ borderLeft: "4px solid #2978b5", paddingLeft: "12px", color: "#222", fontWeight: "600" }}>
                Profile Information
              </h5>
              <label htmlFor="profileType" className="form-label fw-semibold mt-3" style={{ color: "#222" }}>
                Profile Type *
              </label>
              <select
                id="profileType"
                name="profileType"
                className="form-select"
                value={formData.profileType}
                onChange={handleChange}
                required
              >
                <option value="">Select profile type</option>
                {profileTypes.map((pt) => (
                  <option key={pt.value} value={pt.value}>
                    {pt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-success px-5 py-2 fw-semibold" style={{ fontSize: "1rem" }}>
                Submit Application
              </button>
            </div>

            <p className="text-center mt-4 text-muted" style={{ fontSize: "0.85rem" }}>
              By submitting this application, you agree to our Terms &amp; Conditions and Privacy
              Policy. All applications are subject to credit approval. Processing time is typically 5-7
              business days.
            </p>
          </form>
        </>
      )}

      {/* Confirmation Page */}
      {submitted && (
        <div
          className="p-4 rounded border"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#c2e0c6",
            boxShadow: "0 0 15px 2px #ceeac5"
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="text-success fw-bold d-flex align-items-center mb-0">
              <span
                className="me-2"
                style={{
                  fontSize: "1.5rem",
                  lineHeight: "1",
                  userSelect: "none"
                }}
              >
                &#x2714;
              </span>
              Application Submitted
            </h4>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleEdit}
              style={{
                backgroundColor: "#005b96",
                borderColor: "#005b96"
              }}
              tabIndex={0}
              aria-label="Edit Application"
            >
              Edit
            </button>
          </div>

          <div>
            <h5 className="fw-semibold mb-3" style={{ color: "#222" }}>
              Application Details
            </h5>

            {/* Personal Information */}
            <div className="mb-4">
              <h6 className="fw-semibold text-secondary mb-3">Personal Information</h6>
              <div className="row">
                <div className="col-sm-6">
                  <p className="mb-1">
                    <strong>Full Name</strong>
                    <br />
                    {formData.fullName || "-"}
                  </p>
                  <p>
                    <strong>Email Address</strong>
                    <br />
                    {formData.email || "-"}
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-1">
                    <strong>Phone Number</strong>
                    <br />
                    {formData.phoneNumber || "-"}
                  </p>
                  <p>
                    <strong>Profile Type</strong>
                    <br />
                    {formData.profileType || "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="mb-4">
              <h6 className="fw-semibold text-secondary mb-3">Product Information</h6>
              <p>
                <input
                  type="radio"
                  checked
                  readOnly
                  aria-label={`Selected Product: ${formData.creditCardType}`}
                />{" "}
                {formData.creditCardType || "-"}
              </p>
            </div>

           {/* Documentation */}
<div className="mb-4">
  <h6 className="fw-semibold text-secondary mb-3">Documentation</h6>
  <div className="row text-secondary">
    <div className="col-sm-4 mb-2">
      <strong>ID Proof</strong>
      <br />
      {formData.idProof ? (
        <>
          Submitted{" "}
          <a
            href={URL.createObjectURL(formData.idProof)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-primary ms-2"
          >
            View
          </a>
        </>
      ) : (
        "Not Submitted"
      )}
    </div>

    <div className="col-sm-4 mb-2">
      <strong>Address Proof</strong>
      <br />
      {formData.addressProof ? (
        <>
          Submitted{" "}
          <a
            href={URL.createObjectURL(formData.addressProof)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-primary ms-2"
          >
            View
          </a>
        </>
      ) : (
        "Not Submitted"
      )}
    </div>

    <div className="col-sm-4 mb-2">
      <strong>Income Proof</strong>
      <br />
      {formData.incomeProof ? (
        <>
          Submitted{" "}
          <a
            href={URL.createObjectURL(formData.incomeProof)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-primary ms-2"
          >
            View
          </a>
        </>
      ) : (
        "Not Submitted"
      )}
    </div>
  </div>
</div>

{finalSubmit ? (
  <>
    <div className="alert alert-success text-center py-3" role="alert" style={{ fontWeight: "600" }}>
      Application Submitted Successfully
    </div>
    <div className="text-center mt-3">
      <button
        onClick={handleGoBack}
        className="btn btn-success px-4"
        aria-label="Go Back to Home"
      >
        Go Back to Home
      </button>
    </div>
  </>
) : (
  <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
    <button
      onClick={handleFinalSubmit}
      className="btn btn-success px-4 fw-semibold"
      aria-label="Confirm and Final Submit Application"
    >
      Final Submit
    </button>
    <button
      onClick={handleGoBack}
      className="btn btn-success px-4"
      aria-label="Go Back to Home"
    >
      Go Back to Home
    </button>
  </div>
)}
    </div>
    </div>
      )}
      </div>
  );
}

export default CreditCardApplicationForm;
