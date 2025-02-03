import React, { useState } from 'react';
import './VolunteerFormStep5.css';
import logo from './assets/keelworks-logo.png';

const VolunteerFormStep5 = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    gender: '',
    sexualOrientation: '',
    disability: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
        <div className="menu-icon">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </header>

      <div className="form-content">
        <h1>KeelWorks Volunteer</h1>
        <h2>Sign Up</h2>
        <p className="description">
          Join our dedicated team of volunteers and make a lasting impact in our community.
        </p>
        <div className="steps">
          <span className="step completed">✓</span>
          <span className="step completed">✓</span>
          <span className="step completed">✓</span>
          <span className="step completed">✓</span>
          <span className="step active">5</span>
        </div>
        <p className="step-description">Step 5: Voluntary Identification</p>

        <form onSubmit={handleSubmit}>
          <label>
            Gender*
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select an option</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </label>

          <label>
            Sexual Orientation*
            <select name="sexualOrientation" value={formData.sexualOrientation} onChange={handleChange} required>
              <option value="">Select an option</option>
              <option value="Heterosexual">Heterosexual</option>
              <option value="LGBTQ+">LGBTQ+</option>
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
