// src/VolunteerFormStep4.js
import React, { useState, useEffect, useCallback } from 'react';
import './VolunteerFormStep4.css';
import logo from './assets/keelworks-logo.png';
import HeaderBackgroundImage from './assets/nav_background1.jpg';

const MIN_WORDS = 100;

const VolunteerFormStep4 = ({ formData, setFormData, onBack, onNext }) => {
  const [wordCount, setWordCount] = useState(0);
  const [error, setError] = useState('');

  const countWords = useCallback((text = '') => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  }, []);

  // ✅ Effect (not render) updates local state from parent data
  useEffect(() => {
    setWordCount(countWords(formData.why_kworks || ''));
  }, [formData.why_kworks, countWords]);

  // ✅ Event handler updates parent — safe (not during render)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'why_kworks') {
      // Update parent data + local count in the same event
      setFormData((prev) => ({ ...prev, [name]: value || '' }));
      setWordCount(countWords(value));
      if (error) setError('');
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value || '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (wordCount < MIN_WORDS) {
      setError(`Please write at least ${MIN_WORDS} words (currently ${wordCount}).`);
      return;
    }
    onNext(); // ✅ navigation happens only on submit
  };

  return (
    <div className="form-container">
      {/* HEADER */}
      <header className="form-header">
        <img src={logo} alt="KeelWorks Logo" className="header-logo" />
        <button className="donate-button">Donate</button>
        <button className="login-button">Login</button>
        <div className="menu-icon">
          <div></div><div></div><div></div>
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
          <img className="headerBgImg" src={HeaderBackgroundImage} alt="Keelworks" />
        </div>

        <div className="steps">
          <div className="step-container"><span className="step completed">✓</span><span className="step-label">Personal Information</span></div>
          <div className="step-line"></div>
          <div className="step-container"><span className="step completed">✓</span><span className="step-label">Education and Experience</span></div>
          <div className="step-line"></div>
          <div className="step-container"><span className="step completed">✓</span><span className="step-label">Role and Availability</span></div>
          <div className="step-line"></div>
          <div className="step-container"><span className="step active">4</span><span className="step-label">Additional Information</span></div>
          <div className="step-line"></div>
          <div className="step-container"><span className="step">5</span><span className="step-label">Identification</span></div>
        </div>

        <p className="step-description">Step 4: Tell us more about your interests</p>

        <form onSubmit={handleSubmit}>
          <label>
            <strong>Why are you interested in working with KeelWorks?*</strong>
            <textarea
              name="why_kworks"
              value={formData.why_kworks || ''}
              onChange={handleChange}   // ✅ event handler, safe
              required
              placeholder="Explain why you want to work with our organization"
            />
          </label>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <p className="min-words">Min {MIN_WORDS} words</p>
            <p style={{ margin: 0, fontWeight: 'bold', color: wordCount < MIN_WORDS ? 'crimson' : 'green' }}>
              {wordCount} / {MIN_WORDS}
            </p>
          </div>
          {error && <p style={{ color: 'crimson', marginTop: 6 }}>{error}</p>}

          <label>
            <strong>Any other information (optional)</strong>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo || ''}
              onChange={handleChange}
              placeholder="Anything else we should know about you"
            />
          </label>

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
