import React, { useState } from "react";
import ConfirmationPage from "./ConfirmationPage";
import "bootstrap/dist/css/bootstrap.min.css";

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
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateForm = () =>
    formData.fullName.trim() &&
    formData.phoneNumber.trim() &&
    formData.email.trim() &&
    formData.creditCardType.trim() &&
    formData.idProof &&
    formData.addressProof &&
    formData.incomeProof &&
    formData.profileType.trim();

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
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="p-4 border rounded shadow-sm bg-white">
            {!submitted ? (
              <>
                <h3 className="mb-4 text-center">Credit Card Application</h3>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
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
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      pattern="[0-9]{10,15}"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
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
                    <label className="form-label">Profile Type</label>
                    <select
                      className="form-select"
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
                    <label className="form-label">Credit Card Type</label>
                    <select
                      className="form-select"
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
                    <label className="form-label">ID Proof</label>
                    <input
                      type="file"
                      className="form-control"
                      name="idProof"
                      onChange={handleChange}
                      accept="image/*,.pdf"
                      required
                    />
                    <div className="form-text">{fileNameOrPlaceholder(formData.idProof)}</div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address Proof</label>
                    <input
                      type="file"
                      className="form-control"
                      name="addressProof"
                      onChange={handleChange}
                      accept="image/*,.pdf"
                      required
                    />
                    <div className="form-text">{fileNameOrPlaceholder(formData.addressProof)}</div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Income Proof</label>
                    <input
                      type="file"
                      className="form-control"
                      name="incomeProof"
                      onChange={handleChange}
                      accept="image/*,.pdf"
                      required
                    />
                    <div className="form-text">{fileNameOrPlaceholder(formData.incomeProof)}</div>
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
                resetForm={() => setSubmitted(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreditCardForm;
