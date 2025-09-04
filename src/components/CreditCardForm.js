import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ConfirmationPage from "./ConfirmationPage";

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

function CreditCardApplicationForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);

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

  // Submit handler - go to confirmation page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill all required fields and upload files.");
      return;
    }
    setSubmitted(true);
  };

  // Edit form - back to form page with data
  const handleEdit = () => {
    setSubmitted(false);
  };

  // Helper function to display file name or placeholder
  const fileNameOrPlaceholder = (file) => (file ? file.name : "No file chosen");

  return (
    <div className="container mt-3">
      {!submitted ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              pattern="[0-9]{10,15}"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="profileType" className="form-label">
              Profile Type
            </label>
            <select
              className="form-select"
              id="profileType"
              name="profileType"
              value={formData.profileType}
              onChange={handleChange}
              required
            >
              <option value="">Select Profile Type</option>
              {profileTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="creditCardType" className="form-label">
              Credit Card Type
            </label>
            <select
              className="form-select"
              id="creditCardType"
              name="creditCardType"
              value={formData.creditCardType}
              onChange={handleChange}
              required
            >
              <option value="">Select Credit Card Type</option>
              {creditCardTypes.map((card) => (
                <option key={card.value} value={card.value}>
                  {card.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="idProof" className="form-label">
              ID Proof
            </label>
            <input
              type="file"
              className="form-control"
              id="idProof"
              name="idProof"
              onChange={handleChange}
              accept="image/*,.pdf"
              required
            />
            <small className="form-text text-muted">
              {fileNameOrPlaceholder(formData.idProof)}
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="addressProof" className="form-label">
              Address Proof
            </label>
            <input
              type="file"
              className="form-control"
              id="addressProof"
              name="addressProof"
              onChange={handleChange}
              accept="image/*,.pdf"
              required
            />
            <small className="form-text text-muted">
              {fileNameOrPlaceholder(formData.addressProof)}
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="incomeProof" className="form-label">
              Income Proof
            </label>
            <input
              type="file"
              className="form-control"
              id="incomeProof"
              name="incomeProof"
              onChange={handleChange}
              accept="image/*,.pdf"
              required
            />
            <small className="form-text text-muted">
              {fileNameOrPlaceholder(formData.incomeProof)}
            </small>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      ) : (
        <ConfirmationPage
          formData={formData}
          onEdit={handleEdit}
          onFinalSubmit={() => setSubmitted(false)}
        />
      )}
    </div>
  );
}

export default CreditCardApplicationForm;
