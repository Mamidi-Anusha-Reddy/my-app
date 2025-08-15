import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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

function CardApplication() {
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill all required fields and upload files.");
      return;
    }
    navigate("/submission", { state: { formData } });
  };

  const fileNameOrPlaceholder = (file) =>
    file ? file.name : "No file chosen";

  return (
    <div className="container py-4" style={{
      maxWidth: "900px",
      margin: "auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#ffffff",
      boxShadow: "0 0 15px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      padding: "30px 40px",
      marginTop: "40px",
      marginBottom: "40px"
    }}>
      <h3 className="text-center mb-4" style={{
        fontWeight: "700",
        color: "#313335ff",
        letterSpacing: "1.2px"
      }}>
        Credit Card Application Form
      </h3>

      <div className="rounded mb-3" style={{ backgroundColor: "#2d66e3ff", padding: "14px 20px" }}>
        <h5 style={{ color: "white", fontWeight: "700" }}>Application Form</h5>
        <small style={{ color: "#cce4f7" }}>
          Please fill all required fields to complete your application
        </small>
      </div>

      <form onSubmit={handleSubmit} style={{
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderRadius: "6px"
      }}>
        {/* Personal Information */}
        <div className="mb-4">
          <h5 style={{ borderLeft: "4px solid #138496", paddingLeft: "12px", color: "#222", fontWeight: "600" }}>
            Personal Information
          </h5>
          <div className="row gy-3 mt-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Full Name *</label>
              <input type="text" className="form-control" name="fullName"
                value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Phone Number *</label>
              <input type="tel" className="form-control" name="phoneNumber"
                value={formData.phoneNumber} onChange={handleChange}
                required pattern="[0-9]{10,15}"
                title="Please enter a valid phone number (10-15 digits)" />
            </div>
          </div>
          <div className="mt-3">
            <label className="form-label fw-semibold">Email Address *</label>
            <input type="email" className="form-control" name="email"
              value={formData.email} onChange={handleChange} required />
          </div>
        </div>

        {/* Product Selection */}
        <div className="mb-4">
          <h5 style={{ borderLeft: "4px solid #2978b5", paddingLeft: "12px", color: "#222", fontWeight: "600" }}>
            Product Selection
          </h5>
          <label className="form-label fw-semibold mt-3">Credit Card Type *</label>
          <select className="form-select" name="creditCardType"
            value={formData.creditCardType} onChange={handleChange} required>
            <option value="">Select a credit card type</option>
            {creditCardTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Document Upload */}
        <div className="mb-4">
          <h5 style={{ borderLeft: "4px solid #138496", paddingLeft: "12px", color: "#222", fontWeight: "600" }}>
            Document Upload
          </h5>
          <div className="row gy-3 mt-3">
            {["idProof", "addressProof", "incomeProof"].map((doc, idx) => (
              <div key={idx} className="col-md-4">
                <label className="form-label fw-semibold">
                  {doc.replace("Proof", " Proof")} *
                </label>
                <input type="file" className="form-control"
                  accept=".jpg,.jpeg,.png,.pdf" name={doc}
                  onChange={handleChange} required />
                <small className="text-muted">{fileNameOrPlaceholder(formData[doc])}</small>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Info */}
        <div className="mb-4">
          <h5 style={{ borderLeft: "4px solid #2978b5", paddingLeft: "12px", color: "#222", fontWeight: "600" }}>
            Profile Information
          </h5>
          <label className="form-label fw-semibold mt-3">Profile Type *</label>
          <select className="form-select" name="profileType"
            value={formData.profileType} onChange={handleChange} required>
            <option value="">Select profile type</option>
            {profileTypes.map((pt) => (
              <option key={pt.value} value={pt.value}>{pt.label}</option>
            ))}
          </select>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success px-5 py-2 fw-semibold">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default CardApplication;
