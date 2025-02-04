import React, { useState } from 'react';
import './VolunteerFormStep3.css';
import logo from './assets/keelworks-logo.png';
import HeaderBackgroundImage from './assets/nav_background1.jpg';

const VolunteerFormStep3 = ({ onBack, onNext }) => {
  const [formData, setFormData] = useState({
    interestedRole: '',
    hoursAvailable: '',
    visaStatus: '',
    optSupport: '',
    startDate: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
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
          <div className="step-line"></div> 
          <span className="step completed">✓</span>
          <div className="step-line"></div> 
          <span className="step active">3</span>
          <div className="step-line"></div> 
          <span className="step">4</span>
          <div className="step-line"></div> 
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
            <span className="step active">3</span>
            <span className="step-label">Role and Availability</span>
          </div>
          <div className="step-line"></div>

          <div className="step-container">
            <span className="step">4</span>
            <span className="step-label">Additional Information</span>
          </div>
          <div className="step-line"></div>

          <div className="step-container">
            <span className="step">5</span>
            <span className="step-label">Identification</span>
          </div>
        </div>


        <p className="step-description">Step 3: Select your role and availability</p>

        <form onSubmit={handleSubmit}>
          <label>
            Interested Role*
            <select name="interestedRole" value={formData.interestedRole} onChange={handleChange} required>
              <option value="">Select Role</option>
              {['Product Manager', 'Software Engineer', 'Marketing Coordinator', 'Data Analyst'].map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </label>

          <label>
            Hours available to volunteer weekly*
            <input type="number" name="hoursAvailable" value={formData.hoursAvailable} onChange={handleChange} required placeholder="10 hours" />
          </label>

          <label>
            Visa Status*
            <select name="visaStatus" value={formData.visaStatus} onChange={handleChange} required>
              <option value="">Select Visa Status</option>
              {['F1 Visa', 'H1B Visa', 'Green Card Holder', 'Citizen'].map(visa => (
                <option key={visa} value={visa}>{visa}</option>
              ))}
            </select>
          </label>

          <label className="checkbox-label">Do you need OPT support?*</label>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="optSupport" value="Yes, the OPT period has started" onChange={handleChange} />
              Yes, the OPT period has started
            </label>
            <label>
              <input type="checkbox" name="optSupport" value="Yes, approved but haven’t received the EAD card" onChange={handleChange} />
              Yes, approved but haven’t received the EAD card
            </label>
            <label>
              <input type="checkbox" name="optSupport" value="No" onChange={handleChange} />
              No
            </label>
          </div>

          <label>
            Desired start date to join KeelWorks*
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
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
