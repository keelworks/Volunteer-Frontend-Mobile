import React, { useState } from 'react';
import './VolunteerFormStep2.css';
import logo from './assets/keelworks-logo.png';
import HeaderBackgroundImage from './assets/nav_background1.jpg';

const VolunteerFormStep2 = ({formData, setFormData, onBack, onNext }) => {
  

    const handleChange = (e, index, section) => { // ✅ Pass `index` and `section` as parameters
  const { name, value, files } = e.target;

  setFormData((prevData) => {
    if (!prevData[section]) return prevData; // ✅ Ensure section exists before modifying

    const updatedSection = [...prevData[section]];
    updatedSection[index] = { ...updatedSection[index], [name]: files ? files[0] : value };

    return { ...prevData, [section]: updatedSection };
  });
};



  const addEntry = (section) => {
  setFormData((prevData) => ({
    ...prevData,
    [section]: [
      ...prevData[section],
      section === 'employments'
        ? { job_title: '', company_name: '', location: '', start_date: '', end_date: '', responsibilities: '' }
        : { institution_name: '', degree: '', major: '', start_date: '', end_date: '' },
    ],
  }));
};


 const removeEntry = (index, section) => {
  setFormData((prevData) => {
    const updatedSection = prevData[section].filter((_, i) => i !== index);
    return { ...prevData, [section]: updatedSection };
  });
};
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onNext();
  };
  const handleSimpleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
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
          <span className="step active">2</span>
          <div className="step-line"></div> 
          <span className="step">3</span>
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
            <span className="step active">2</span>
            <span className="step-label">educations and Experience</span>
          </div>
          <div className="step-line"></div>

          <div className="step-container">
            <span className="step">3</span>
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

        <p className="step-description">Step 2: Add your educations and experience</p>

        <form onSubmit={handleSubmit}>
          {/* Experience Section */}
          {(formData.employments || []).map((exp, index) => (
            <div key={index} className="employments-section">
              <div className="employments-header">
                <h3>employments {index + 1}</h3>
                {index > 0 && <button type="button" className="delete-button" onClick={() => removeEntry(index, 'employments')}>Delete</button>}
              </div>
              <label>Job Title* <input type="text" name="job_title" value={exp.job_title} onChange={(e) => handleChange(e, index, 'employments')} required /></label>
              <label>Company* <input type="text" name="company_name" value={exp.company_name} onChange={(e) => handleChange(e, index, 'employments')} required /></label>
              <label>Location* <input type="text" name="location" value={exp.location} onChange={(e) => handleChange(e, index, 'employments')} required /></label>
              <div className="date-group">
                <label>Start Date* <input type="text" name="start_date" value={exp.start_date} onChange={(e) => handleChange(e, index, 'employments')} required placeholder="MM/YYYY" /></label>
                <label>End Date* <input type="text" name="end_date" value={exp.end_date} onChange={(e) => handleChange(e, index, 'employments')} required placeholder="MM/YYYY" /></label>
              </div>
              <label>Responsibilities* <textarea name="responsibilities" value={exp.responsibilities} onChange={(e) => handleChange(e, index, 'employments')} required /></label>
            </div>
          ))}
          <button type="button" className="add-button" onClick={() => addEntry('employments')}>Add another</button>

          {/* Proper Spacing Between Sections */}
          <div className="section-spacing"></div>

          {/* educations Section */}
          {(formData.educations || []).map((edu, index) => (
            <div key={index} className="educations-section">
              <div className="educations-header">
                <h3>educations {index + 1}</h3>
                {index > 0 && <button type="button" className="delete-button" onClick={() => removeEntry(index, 'educations')}>Delete</button>}
              </div>
              <label>School or University Name* <input type="text" name="institution_name" value={edu.institution_name} onChange={(e) => handleChange(e, index, 'educations')} required /></label>
              <label>Degree* <input type="text" name="degree" value={edu.degree} onChange={(e) => handleChange(e, index, 'educations')} required /></label>
              <label>Field of Study* <input type="text" name="major" value={edu.major} onChange={(e) => handleChange(e, index, 'educations')} required /></label>
              <div className="date-group">
                <label>Start Date* <input type="text" name="start_date" value={edu.start_date} onChange={(e) => handleChange(e, index, 'educations')} required placeholder="MM/YYYY" /></label>
                <label>End Date* <input type="text" name="end_date" value={edu.end_date} onChange={(e) => handleChange(e, index, 'educations')} required placeholder="MM/YYYY" /></label>
              </div>
            </div>
          ))}
          <button type="button" className="add-button" onClick={() => addEntry('educations')}>Add another</button>

          {/* Additional Information */}
          <h3>Additional Information</h3>
          <label>LinkedIn Profile Link* <input type="text" name="linkedin_url" value={formData.linkedin_url} onChange={(handleSimpleChange) } required /></label>
          <label>Additional Website (Optional) <input type="text" name="website" value={formData.website || ''} onChange={(handleSimpleChange) } /></label>
          <label>Resume* <input type="file" name="resume" onChange={handleChange} accept=".pdf,.doc" required /></label>
          <p className="file-restriction">File type allowed: PDF, DOC</p>

          {/* Navigation Buttons */}
          <div className="form-navigation">
            <button type="button" className="back-button" onClick={onBack}>Back</button>
            <button type="button" className="back-button" onClick={onBack}>Back</button>
            <button type="submit" className="next-button">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VolunteerFormStep2;
