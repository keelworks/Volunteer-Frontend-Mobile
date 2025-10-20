// src/VolunteerFormStep3.js
import React from 'react';
import './VolunteerFormStep3.css';
import logo from './assets/keelworks-logo.png';
import HeaderBackgroundImage from './assets/nav_background1.jpg';

const VolunteerFormStep3 = ({ formData, setFormData, onBack, onNext }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  // Backend-approved values
  const optOptions = [
    {
      value: 'Yes, the OPT period has started',
      label: 'Yes, the OPT period has started',
    },
    {
      value: 'Yes, approved but have not received the EAD card',
      // Friendly label is fine; the value is what gets submitted
      label: 'Yes, approved but haven’t received the EAD card',
    },
    { value: 'No', label: 'No' },
  ];

  return (
    <div className="form-container">
      {/* HEADER */}
      <header className="form-header">
        <img src={logo} alt="KeelWorks Logo" className="header-logo" />
        <button className="donate-button">Donate</button>
        <button className="login-button">Login</button>
        <div className="menu-icon"><div></div><div></div><div></div></div>
      </header>

      <div className="form-content">
        <div className="header">
          <div className="headerText">
            <h1>KeelWorks Volunteer Sign Up</h1>
            <p className="description">
              Join our dedicated team of volunteers and make a lasting impact in our community.
            </p>
          </div>
          <img className="headerBgImg" src={HeaderBackgroundImage} alt="Keelworks" />
        </div>

        <div className="steps">
          <div className="step-container"><span className="step completed">✓</span><span className="step-label">Personal Information</span></div>
          <div className="step-line"></div>
          <div className="step-container"><span className="step completed">✓</span><span className="step-label">Education and Experience</span></div>
          <div className="step-line"></div>
          <div className="step-container"><span className="step active">3</span><span className="step-label">Role and Availability</span></div>
          <div className="step-line"></div>
          <div className="step-container"><span className="step">4</span><span className="step-label">Additional Information</span></div>
          <div className="step-line"></div>
          <div className="step-container"><span className="step">5</span><span className="step-label">Identification</span></div>
        </div>

        <p className="step-description">Step 3: Select your role and availability</p>

        <form onSubmit={handleSubmit}>
          <label>
            Interested Role*
            <select
              name="interestedRole"
              value={formData.interestedRole || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              {['Product Manager', 'Software Engineer', 'Marketing Coordinator', 'Data Analyst'].map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </label>

          <label>
            Hours available to volunteer weekly*
            <input
              type="number"
              name="hours_commitment"
              value={formData.hours_commitment || ''}
              onChange={handleChange}
              required
              placeholder="10 hours"
            />
          </label>

          <label>
            Visa Status*
            <select
              name="visa_status"
              value={formData.visa_status || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select Visa Status</option>
              {['Citizen', 'Permanent Resident', 'Student Visa', 'Work Visa', 'Other'].map((visa) => (
                <option key={visa} value={visa}>{visa}</option>
              ))}
            </select>
          </label>

          <p className="checkbox-label">Do you need OPT support?*</p>
          <div className="opt-radio-group">
            {optOptions.map(({ value, label }, idx) => {
              const id = `opt_support_${idx}`;
              return (
                <div className="opt-radio-option" key={id}>
                  <input
                    id={id}
                    type="radio"
                    name="opt_support"
                    value={value}                 // ✅ exact backend string
                    checked={formData.opt_support === value}
                    onChange={handleChange}
                    required
                  />
                  <span className="opt-radio-text">{label}</span>
                </div>
              );
            })}
          </div>

          <label>
            Desired start date to join KeelWorks*
            <input
              type="date"
              name="start_date"
              value={formData.start_date || ''}
              onChange={handleChange}
              required
            />
          </label>

          {/* Navigation Buttons */}
          <div className="form-navigation">
            <button type="button" className="back-button" onClick={onBack}>Back</button>
            <button type="submit" className="next-button">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VolunteerFormStep3;
