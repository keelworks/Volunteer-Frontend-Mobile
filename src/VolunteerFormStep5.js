import React, { useState } from 'react';
import './VolunteerFormStep5.css';
import logo from './assets/keelworks-logo.png';
import HeaderBackgroundImage from './assets/nav_background1.jpg';
import { submitVolunteerForm } from './api'; // Import API function
const VolunteerFormStep5 = ({ formData, setFormData, onBack, onSubmit }) => {
  

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
    onSubmit();
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
          <span className="step completed">✓</span>
          <span className="step active">5</span>
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

        <form onSubmit={handleSubmit}>
          <label>
            Gender*
            <select name="gender" value={formData?.gender || ''} onChange={handleChange} required>
              <option value="">Select an option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-Binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </label>

          <label>
            Sexual Orientation*
            <select name="sexualOrientation" value={formData.sexualOrientation} onChange={handleChange} required>
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
            <select name="disability" value={formData.disability} onChange={handleChange} required>
              <option value="">Select an option</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </label>

          {/* Navigation Buttons */}
          <div className="form-navigation">
            <button type="button" className="back-button" onClick={onBack}>Back</button>
            <button type="submit" className="submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VolunteerFormStep5;
