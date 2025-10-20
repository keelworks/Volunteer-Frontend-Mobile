// src/VolunteerFormStep5.js
import React from 'react';
import './VolunteerFormStep5.css';
import logo from './assets/keelworks-logo.png';
import HeaderBackgroundImage from './assets/nav_background1.jpg';

const VolunteerFormStep5 = ({
  formData,
  setFormData,
  onBack,
  onSubmit,
  // NEW optional props (safe if not passed)
  submitting,
  submitError,
  submitOk,
}) => {
  const handleChange = (e, index, section) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (section) {
        return {
          ...prevData,
          [section]: prevData[section].map((item, idx) =>
            idx === index ? { ...item, [name]: value } : item
          ),
        };
      } else {
        return { ...prevData, [name]: value || '' };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final Submission:', formData);
    onSubmit && onSubmit();
  };

  return (
    <div className="form-container">
      {/* HEADER */}
      <header className="form-header">
        <img src={logo} alt="KeelWorks Logo" className="header-logo" />
        <button className="donate-button">Donate</button>
        <button className="login-button">Login</button>
        <div className="menu-icon">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </header>

      <div className="form-content">
        <div className="header">
          <div className="headerText">
            <h1>KeelWorks Volunteer Sign Up</h1>
            <p className="description">
              Join our dedicated team of volunteers and make a lasting impact in our community.
            </p>
          </div>
          <img className="headerBgImg" src={HeaderBackgroundImage} alt="Keelworks Image" />
        </div>

        <div className="steps">
          <div className="step-container">
            <span className="step completed">✓</span>
            <span className="step-label">Personal Information</span>
          </div>
          <div className="step-line"></div>

          <div className="step-container">
            <span className="step completed">✓</span>
            <span className="step-label">Education and Experience</span>
          </div>
          <div className="step-line"></div>

          <div className="step-container">
            <span className="step completed">✓</span>
            <span className="step-label">Role and Availability</span>
          </div>
          <div className="step-line"></div>

          <div className="step-container">
            <span className="step completed">✓</span>
            <span className="step-label">Additional Information</span>
          </div>
          <div className="step-line"></div>

          <div className="step-container">
            <span className="step active">5</span>
            <span className="step-label">Identification</span>
          </div>
        </div>

        <p className="step-description">Step 5: Voluntary Identification</p>

        {/* NEW: status banners (render only if props provided) */}
        {submitOk ? (
          <div
            className="submit-ok-banner"
            style={{ marginBottom: 12, padding: 12, background: '#e7f6e7' }}
          >
            Your application was submitted successfully.
          </div>
        ) : null}

        {submitError ? (
          <div
            className="submit-error-banner"
            style={{ marginBottom: 12, padding: 12, background: '#fdecea', color: '#b00020' }}
          >
            {submitError}
          </div>
        ) : null}

        <form onSubmit={handleSubmit}>
          <label>
            Gender*
            <select
              name="gender"
              value={formData?.gender || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-Binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </label>

          <label>
            Sexual Orientation*
            {/* ✅ snake_case so backend accepts it */}
            <select
              name="sexual_orientation"
              value={formData?.sexual_orientation || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option value="Heterosexual">Heterosexual</option>
              <option value="Homosexual">Homosexual</option>
              <option value="Bisexual">Bisexual</option>
              <option value="Asexual">Asexual</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </label>

          <label>
            Disability*
            <select
              name="disability"
              value={formData?.disability || ''}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </label>

          {/* Navigation Buttons */}
          <div className="form-navigation">
            <button
              type="button"
              className="back-button"
              onClick={onBack}
              disabled={!!submitting}
            >
              Back
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={!!submitting}
            >
              {submitting ? 'Submitting…' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VolunteerFormStep5;
