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

function CreditCardForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);

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
    setSubmitted(true);
  };

  const handleEdit = () => setSubmitted(false);

  const fileNameOrPlaceholder = (file) => (file ? file.name : "No file chosen");

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              {!submitted ? (
                <>
                  <h2 className="mb-4 text-center">Credit Card Application Form</h2>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label">
                        Full Name <span className="text-danger">*</span>
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
                        Phone Number <span className="text-danger">*</span>
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
                        Email Address <span className="text-danger">*</span>
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
                        Profile Type <span className="text-danger">*</span>
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
                        Credit Card Type <span className="text-danger">*</span>
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
                        ID Proof <span className="text-danger">*</span>
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
                        Address Proof <span className="text-danger">*</span>
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
                        Income Proof <span className="text-danger">*</span>
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
                    <button type="submit" className="btn btn-primary w-100">
                      Submit
                    </button>
                  </form>
                </>
              ) : (
                <ConfirmationPage
                  formData={formData}
                  onEdit={handleEdit}
                  onFinalSubmit={() => setSubmitted(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditCardForm;
