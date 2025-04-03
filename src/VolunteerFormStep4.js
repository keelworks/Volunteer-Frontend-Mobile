import React, { useState } from 'react';
import './VolunteerFormStep4.css';
import logo from './assets/keelworks-logo.png';
import HeaderBackgroundImage from './assets/nav_background1.jpg';

const VolunteerFormStep4 = ({ formData, setFormData, onBack, onNext }) => {
  
  
  

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
    console.log(formData);
    onNext();
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
        <div className='header'>
          <div className="headerText">
            <h1>KeelWorks Volunteer Sign Up</h1>
            <p className="description">
              Join our dedicated team of volunteers and make a lasting impact in our community.
            </p>
          </div>
          <img className="headerBgImg" src={HeaderBackgroundImage} alt="Keelworks Image" />
        </div>
        {/* <div className="steps">
          <span className="step completed">✓</span>
          <span className="step completed">✓</span>
          <span className="step completed">✓</span>
          <span className="step active">4</span>
          <span className="step">5</span>
        </div> */}
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
            <span className="step active">4</span>
            <span className="step-label">Additional Information</span>
          </div>
          <div className="step-line"></div>

          <div className="step-container">
            <span className="step">5</span>
            <span className="step-label">Identification</span>
          </div>
        </div>

        <p className="step-description">Step 4: Tell us more about your interests</p>

        <form onSubmit={handleSubmit}>
          <label>
            <strong>Why are you interested in working with KeelWorks?*</strong>
            <textarea
              name="interestReason"
              value={formData.interestReason}
              onChange={handleChange}
              required
              placeholder="Explain why you want to work with our organization"
            />
          </label>
          <p className="min-words">Min 100 words</p>

          <label>
            <strong>Any other information (optional)</strong>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Anything else we should know about you"
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

export default VolunteerFormStep4;
