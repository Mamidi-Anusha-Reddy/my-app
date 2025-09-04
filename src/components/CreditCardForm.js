import React, { useState } from "react";
import { submitApplication } from "../services/apiService";

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
  const [applicationId, setApplicationId] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitApplication(formData);
      alert("Application Submitted Successfully!");
      setApplicationId(response.data.id);
    } catch (error) {
      console.error("Error submitting application", error);
      alert("Submission failed, try again.");
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "900px", margin: "auto" }}>
      <h3 className="text-center mb-4">Credit Card Application Form</h3>

      <form
        onSubmit={handleSubmit}
        style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "6px" }}
      >
        {/* Full Name */}
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

        {/* Phone Number */}
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

        {/* Email */}
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

        {/* Credit Card Type */}
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

        {/* Documents */}
        <div className="mb-3">
          <label className="form-label">ID Proof *</label>
          <input type="file" className="form-control" name="idProof" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Address Proof *</label>
          <input type="file" className="form-control" name="addressProof" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Income Proof *</label>
          <input type="file" className="form-control" name="incomeProof" onChange={handleChange} required />
        </div>

        {/* Profile Type */}
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

        {applicationId && <p className="text-success mt-3">Application ID: {applicationId}</p>}
      </form>
    </div>
  );
}

export default CreditCardForm;
