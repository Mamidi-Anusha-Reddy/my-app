// pages/ApplicationForm.js
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const shades = {
  blue: '#0d6efd', // bootstrap primary
  green: '#198754', // bootstrap success
  lightBlueBg: '#e7f1ff',
};

const SectionTitle = ({ title }) => (
  <div className="d-flex align-items-center gap-2 mb-3">
    <div style={{ width: 4, height: 28, backgroundColor: '#2ca34d', borderRadius: 4 }} />
    <h6 className="m-0 text-secondary fw-semibold">{title}</h6>
  </div>
);

const initialData = {
  fullName: '',
  phone: '',
  email: '',
  cardType: '',
  idProof: null,
  addressProof: null,
  incomeProof: null,
  profileType: '',
};

function ApplicationForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const editPayload = location.state?.prefill || null;

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editPayload) {
      setFormData(editPayload);
    }
  }, [editPayload]);

  const blobUrls = useMemo(() => ({
    idProof: formData.idProof ? URL.createObjectURL(formData.idProof) : '',
    addressProof: formData.addressProof ? URL.createObjectURL(formData.addressProof) : '',
    incomeProof: formData.incomeProof ? URL.createObjectURL(formData.incomeProof) : '',
  }), [formData.idProof, formData.addressProof, formData.incomeProof]);

  useEffect(() => () => {
    // revoke when unmounting
    Object.values(blobUrls).forEach(u => u && URL.revokeObjectURL(u));
  }, [blobUrls]);

  const validators = {
    fullName: v => (/^[A-Za-z ]{3,}$/.test(v) ? '' : 'Enter full name (letters & spaces, min 3).'),
    phone: v => (/^\d{10}$/.test(v) ? '' : 'Enter 10-digit phone number.'),
    email: v => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address.'),
    cardType: v => (v ? '' : 'Select a credit card type.'),
    idProof: v => (v ? '' : 'Upload ID proof.'),
    addressProof: v => (v ? '' : 'Upload Address proof.'),
    incomeProof: v => (v ? '' : 'Upload Income proof.'),
    profileType: v => (v ? '' : 'Select profile type.'),
  };

  const setError = (name, value) => {
    setErrors(prev => ({ ...prev, [name]: validators[name](value) }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
    setError(name, newValue);
  };

  const validateAll = () => {
    const newErrors = Object.fromEntries(Object.entries(formData).map(([k, v]) => [k, validators[k](v)]));
    setErrors(newErrors);
    return Object.values(newErrors).every(msg => !msg);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    navigate('/submitted', {
      state: {
        ...formData,
        links: blobUrls,
      },
    });
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container py-4">
        <div className="bg-white shadow rounded-3 overflow-hidden" style={{ maxWidth: 1000, margin: '0 auto' }}>
          {/* Top blue header */}
          <div className="px-4 py-3" style={{ backgroundColor: shades.blue }}>
            <h6 className="text-white text-center mb-0 fw-semibold">Credit Card Application Form</h6>
          </div>

          {/* Intro strip */}
          <div className="px-4 py-3" style={{ backgroundColor: shades.lightBlueBg }}>
            <div className="fw-semibold text-dark">Application Form</div>
            <small className="text-secondary">Please fill out all required fields to complete your application</small>
          </div>

          {/* Form body */}
          <form className="px-4 py-4" onSubmit={onSubmit} noValidate>
            {/* Personal Information */}
            <SectionTitle title="Personal Information" />
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Full Name *</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  type="text"
                  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone Number *</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
              <div className="col-12">
                <label className="form-label">Email Address *</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Enter your email address"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
            </div>

            <hr className="my-4" />

            {/* Product Selection */}
            <SectionTitle title="Product Selection" />
            <div className="mb-3">
              <label className="form-label">Credit Card Type *</label>
              <select
                name="cardType"
                value={formData.cardType}
                onChange={handleChange}
                className={`form-select ${errors.cardType ? 'is-invalid' : ''}`}
              >
                <option value="">Select a credit card type</option>
                <option value="Gold Card">Gold Card</option>
                <option value="Platinum Card">Platinum Card</option>
                <option value="Silver Card">Silver Card</option>
              </select>
              {errors.cardType && <div className="invalid-feedback d-block">{errors.cardType}</div>}
            </div>

            <hr className="my-4" />

            {/* Document Upload */}
            <SectionTitle title="Document Upload" />
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">ID Proof *</label>
                <input name="idProof" onChange={handleChange} type="file" className={`form-control ${errors.idProof ? 'is-invalid' : ''}`} />
                {errors.idProof && <div className="invalid-feedback d-block">{errors.idProof}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label">Address Proof *</label>
                <input name="addressProof" onChange={handleChange} type="file" className={`form-control ${errors.addressProof ? 'is-invalid' : ''}`} />
                {errors.addressProof && <div className="invalid-feedback d-block">{errors.addressProof}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label">Income Proof *</label>
                <input name="incomeProof" onChange={handleChange} type="file" className={`form-control ${errors.incomeProof ? 'is-invalid' : ''}`} />
                {errors.incomeProof && <div className="invalid-feedback d-block">{errors.incomeProof}</div>}
              </div>
            </div>

            <hr className="my-4" />

            {/* Profile Information */}
            <SectionTitle title="Profile Information" />
            <div className="mb-3">
              <label className="form-label">Profile Type *</label>
              <select
                name="profileType"
                value={formData.profileType}
                onChange={handleChange}
                className={`form-select ${errors.profileType ? 'is-invalid' : ''}`}
              >
                <option value="">Select profile type</option>
                <option value="New Profile">New Profile</option>
                <option value="Existing Profile">Existing Profile</option>
              </select>
              {errors.profileType && <div className="invalid-feedback d-block">{errors.profileType}</div>}
            </div>

            <div className="text-center py-2">
              <button className="btn btn-success px-4 py-2 fw-semibold rounded-2" type="submit">
                {editPayload ? 'Submit Changes' : 'Submit Application'}
              </button>
            </div>

            <div className="text-center text-muted small pb-3">
              By submitting this application, you agree to our Terms & Conditions and Privacy Policy. All applications are subject to credit approval.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApplicationForm;