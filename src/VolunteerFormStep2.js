// src/VolunteerFormStep2.js
import React, { useEffect } from 'react';
import './VolunteerFormStep2.css';
import logo from './assets/keelworks-logo.png';
import HeaderBackgroundImage from './assets/nav_background1.jpg';

const VolunteerFormStep2 = ({ formData, setFormData, onBack, onNext }) => {
  // --- Seed one blank row for each section on first mount ---
  useEffect(() => {
    setFormData((prev) => {
      const next = { ...prev };
      if (!Array.isArray(next.employments) || next.employments.length === 0) {
        next.employments = [
          {
            job_title: '',
            company_name: '',
            location: '',
            start_date: '',
            end_date: '',
            responsibilities: '',
          },
        ];
      }
      if (!Array.isArray(next.educations) || next.educations.length === 0) {
        next.educations = [
          {
            institution_name: '',
            degree: '',
            major: '',
            start_date: '',
            end_date: '',
          },
        ];
      }
      return next;
    });
    // seed only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Helpers for month inputs ---
  // Normalize stored date (YYYY/MM or MM/YYYY or '') -> month input value 'YYYY-MM'
  const toMonthInputValue = (v) => {
    if (!v || typeof v !== 'string') return '';
    const trimmed = v.trim();
    if (/^\d{4}\/(0[1-9]|1[0-2])$/.test(trimmed)) {
      const [year, month] = trimmed.split('/');
      return `${year}-${month}`;
    }
    if (/^(0[1-9]|1[0-2])\/\d{4}$/.test(trimmed)) {
      const [mm, yyyy] = trimmed.split('/');
      return `${yyyy}-${mm}`;
    }
    if (/^\d{4}-(0[1-9]|1[0-2])$/.test(trimmed)) {
      return trimmed;
    }
    return '';
  };

  // On change, take month input 'YYYY-MM' -> store as 'YYYY/MM'
  const monthChangeToYYYYslashMM = (e, index, section) => {
    const { name, value } = e.target; // value like '2024-07'
    const out =
      /^\d{4}-(0[1-9]|1[0-2])$/.test(value)
        ? `${value.slice(0, 4)}/${value.slice(5, 7)}`
        : '';
    handleChange({ target: { name, value: out } }, index, section);
  };

  // Handles both array sections and top-level fields (including resume file)
  const handleChange = (e, index, section) => {
    const { name, value, files } = e.target;

    if (section) {
      setFormData((prev) => {
        const current = Array.isArray(prev[section]) ? prev[section] : [];
        const updated = [...current];
        const existing = updated[index] || {};
        updated[index] = { ...existing, [name]: files ? files[0] : value };
        return { ...prev, [section]: updated };
      });
      return;
    }

    // Top-level updates (e.g., linkedin_url, website, resume)
    // --- 10 MB guard for resume ---
    if (name === 'resume' && files && files[0]) {
      const f = files[0];
      if (f.size > 10 * 1024 * 1024) {
        alert('Please upload a file smaller than 10 MB.');
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: f }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const addEntry = (section) => {
    setFormData((prev) => {
      const current = Array.isArray(prev[section]) ? prev[section] : [];
      const blank =
        section === 'employments'
          ? {
              job_title: '',
              company_name: '',
              location: '',
              start_date: '',
              end_date: '',
              responsibilities: '',
            }
          : {
              institution_name: '',
              degree: '',
              major: '',
              start_date: '',
              end_date: '',
            };
      return { ...prev, [section]: [...current, blank] };
    });
  };

  const removeEntry = (index, section) => {
    setFormData((prev) => {
      const current = Array.isArray(prev[section]) ? prev[section] : [];
      const updated = current.filter((_, i) => i !== index);
      return { ...prev, [section]: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const handleSimpleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const employments = Array.isArray(formData.employments) ? formData.employments : [];
  const educations = Array.isArray(formData.educations) ? formData.educations : [];

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
        <div className='header'>
          <div className="headerText">
            <h1>KeelWorks Volunteer Sign Up</h1>
            <p className="description">
              Join our dedicated team of volunteers and make a lasting impact in our community.
            </p>
          </div>
          <img className="headerBgImg" src={HeaderBackgroundImage} alt="Keelworks Image" />
        </div>

        <div className="steps">
          <div className="step-container"><span className="step completed">✓</span><span className="step-label">Personal Information</span></div>
          <div className="step-line"></div>
          <div className="step-container"><span className="step active">2</span><span className="step-label">Educations and Experience</span></div>
          <div className="step-line"></div>
          <div className="step-container"><span className="step">3</span><span className="step-label">Role and Availability</span></div>
          <div className="step-line"></div>
          <div className="step-container"><span className="step">4</span><span className="step-label">Additional Information</span></div>
          <div className="step-line"></div>
          <div className="step-container"><span className="step">5</span><span className="step-label">Identification</span></div>
        </div>

        <p className="step-description">Step 2: Add your educations and experience</p>

        <form onSubmit={handleSubmit}>
          {/* Experience Section */}
          {employments.map((exp, index) => (
            <div key={index} className="employments-section">
              <div className="employments-header">
                <h3>Employment {index + 1}</h3>
                {employments.length > 1 && index > 0 && (
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => removeEntry(index, 'employments')}
                  >
                    Delete
                  </button>
                )}
              </div>

              <label>Job Title*
                <input
                  type="text"
                  name="job_title"
                  value={exp.job_title || ''}
                  onChange={(e) => handleChange(e, index, 'employments')}
                  required
                />
              </label>

              <label>Company*
                <input
                  type="text"
                  name="company_name"
                  value={exp.company_name || ''}
                  onChange={(e) => handleChange(e, index, 'employments')}
                  required
                />
              </label>

              <label>Location*
                <input
                  type="text"
                  name="location"
                  value={exp.location || ''}
                  onChange={(e) => handleChange(e, index, 'employments')}
                  required
                />
              </label>

              <div className="date-group">
                <label>Start Date* {/* month picker -> store YYYY/MM */}
                  <input
                    type="month"
                    name="start_date"
                    value={toMonthInputValue(exp.start_date)}
                    onChange={(e) => monthChangeToYYYYslashMM(e, index, 'employments')}
                    required
                  />
                </label>
                <label>End Date*
                  <input
                    type="month"
                    name="end_date"
                    value={toMonthInputValue(exp.end_date)}
                    onChange={(e) => monthChangeToYYYYslashMM(e, index, 'employments')}
                    required
                  />
                </label>
              </div>

              <label>Responsibilities*
                <textarea
                  name="responsibilities"
                  value={exp.responsibilities || ''}
                  onChange={(e) => handleChange(e, index, 'employments')}
                  required
                />
              </label>
            </div>
          ))}

          <button
            type="button"
            className="add-button"
            onClick={() => addEntry('employments')}
          >
            Add another employment
          </button>

          <div className="section-spacing"></div>

          {/* Education Section */}
          {educations.map((edu, index) => (
            <div key={index} className="educations-section">
              <div className="educations-header">
                <h3>Education {index + 1}</h3>
                {educations.length > 1 && index > 0 && (
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => removeEntry(index, 'educations')}
                  >
                    Delete
                  </button>
                )}
              </div>

              <label>School or University Name*
                <input
                  type="text"
                  name="institution_name"
                  value={edu.institution_name || ''}
                  onChange={(e) => handleChange(e, index, 'educations')}
                  required
                />
              </label>

              <label>Degree*
                <input
                  type="text"
                  name="degree"
                  value={edu.degree || ''}
                  onChange={(e) => handleChange(e, index, 'educations')}
                  required
                />
              </label>

              <label>Field of Study*
                <input
                  type="text"
                  name="major"
                  value={edu.major || ''}
                  onChange={(e) => handleChange(e, index, 'educations')}
                  required
                />
              </label>

              <div className="date-group">
                <label>Start Date*
                  <input
                    type="month"
                    name="start_date"
                    value={toMonthInputValue(edu.start_date)}
                    onChange={(e) => monthChangeToYYYYslashMM(e, index, 'educations')}
                    required
                  />
                </label>
                <label>End Date*
                  <input
                    type="month"
                    name="end_date"
                    value={toMonthInputValue(edu.end_date)}
                    onChange={(e) => monthChangeToYYYYslashMM(e, index, 'educations')}
                    required
                  />
                </label>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="add-button"
            onClick={() => addEntry('educations')}
          >
            Add another education
          </button>

          {/* Additional Information */}
          <h3>Additional Information</h3>

          <label>LinkedIn Profile Link*
            <input
              type="text"
              name="linkedin_url"
              value={formData.linkedin_url || ''}
              onChange={handleSimpleChange}
              required
            />
          </label>

          <label>Additional Website (Optional)
            <input
              type="text"
              name="website"
              value={formData.website || ''}
              onChange={handleSimpleChange}
            />
          </label>

          {/* Resume file — stored in formData.resume as File */}
          <label>Resume*
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
              required
            />
          </label>
          <p className="file-restriction">
            File types allowed: PDF, DOC, DOCX
            {formData?.resume && formData.resume.name ? ` — Selected: ${formData.resume.name}` : ''}
          </p>

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

export default VolunteerFormStep2;
