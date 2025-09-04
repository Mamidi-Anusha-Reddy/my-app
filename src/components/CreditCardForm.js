import React, { useState } from "react";
import { submitApplication } from "../services/apiService";
import ApplicationConfirmation from "./ApplicationConfirmation";

const creditCardTypes = [
  { label: "Gold Card", value: "Gold Card" },
  { label: "Platinum Card", value: "Platinum Card" },
  { label: "Silver Card", value: "Silver Card" },
];

const profileTypes = [
  { label: "Existing Profile", value: "Existing Profile" },
  { label: "New Profile", value: "New Profile" },
];

const initialFormData = {
  fullName: "",
  phoneNumber: "",
  email: "",
  creditCardType: "",
  idProof: null,
  addressProof: null,
  incomeProof: null,
  profileType: "",
};

function CreditCardForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [savedApp, setSavedApp] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitApplication(formData);
      setSavedApp(response.data); // store backend response
      setSubmitted(true);
    } catch (err) {
      console.error("Error saving application", err);
      alert("Failed to submit application. Try again.");
    }
  };

  return (
    <div>
      {!submitted ? (
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
          <h3
            className="text-center mb-4"
            style={{
              fontWeight: "700",
              color: "#313335ff",
              letterSpacing: "1px",
            }}
          >
            Credit Card Application Form
          </h3>

          {/* Form UI (your original CSS) */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                className="form-control"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email *</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Credit Card Type *</label>
              <select
                className="form-select"
                name="creditCardType"
                value={formData.creditCardType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {creditCardTypes.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">ID Proof *</label>
              <input
                type="file"
                className="form-control"
                name="idProof"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address Proof *</label>
              <input
                type="file"
                className="form-control"
                name="addressProof"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Income Proof *</label>
              <input
                type="file"
                className="form-control"
                name="incomeProof"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Profile Type *</label>
              <select
                className="form-select"
                name="profileType"
                value={formData.profileType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {profileTypes.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-success w-100">
              Submit Application
            </button>
          </form>
        </div>
      ) : (
        <ApplicationConfirmation application={savedApp} />
      )}
    </div>
  );
}

export default CreditCardForm;
