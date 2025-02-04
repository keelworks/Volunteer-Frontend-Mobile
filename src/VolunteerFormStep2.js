import React, { useState } from 'react';
import './VolunteerFormStep2.css';
import logo from './assets/keelworks-logo.png';
import HeaderBackgroundImage from './assets/nav_background1.jpg';

const VolunteerFormStep2 = ({ onBack, onNext }) => {
  const [formData, setFormData] = useState({
    experiences: [{ jobTitle: '', company: '', location: '', startDate: '', endDate: '', responsibilities: '' }],
    education: [{ schoolName: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }],
    linkedin: '',
    website: '',
    resume: null,
  });

  const handleChange = (e, index, section) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => {
      // If it's a section (array like experiences or education), update accordingly
      if (section) {
        const updatedSection = Array.isArray(prevData[section]) ? [...prevData[section]] : [];
        updatedSection[index] = { ...updatedSection[index], [name]: files ? files[0] : value };

        return { ...prevData, [section]: updatedSection };
      }

      // Otherwise, update normal input fields like LinkedIn and Website
      return { ...prevData, [name]: files ? files[0] : value };
    });
  };


  const addEntry = (section) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: [
        ...(Array.isArray(prevData[section]) ? prevData[section] : []), // Ensure it's an array
        section === 'experiences'
          ? { jobTitle: '', company: '', location: '', startDate: '', endDate: '', responsibilities: '' }
          : { schoolName: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' },
      ],
    }));
  };

  const removeEntry = (index, section) => {
    setFormData((prevData) => {
      const updatedSection = Array.isArray(prevData[section]) ? prevData[section].filter((_, i) => i !== index) : [];
      return { ...prevData, [section]: updatedSection };
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
            <span className="step-label">Education and Experience</span>
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

        <p className="step-description">Step 2: Add your education and experience</p>

        <form onSubmit={handleSubmit}>
          {/* Experience Section */}
          {formData.experiences.map((exp, index) => (
            <div key={index} className="experience-section">
              <div className="experience-header">
                <h3>Experience {index + 1}</h3>
                {index > 0 && <button type="button" className="delete-button" onClick={() => removeEntry(index, 'experiences')}>Delete</button>}
              </div>
              <label>Job Title* <input type="text" name="jobTitle" value={exp.jobTitle} onChange={(e) => handleChange(e, index, 'experiences')} required /></label>
              <label>Company* <input type="text" name="company" value={exp.company} onChange={(e) => handleChange(e, index, 'experiences')} required /></label>
              <label>Location* <input type="text" name="location" value={exp.location} onChange={(e) => handleChange(e, index, 'experiences')} required /></label>
              <div className="date-group">
                <label>Start Date* <input type="text" name="startDate" value={exp.startDate} onChange={(e) => handleChange(e, index, 'experiences')} required placeholder="MM/YYYY" /></label>
                <label>End Date* <input type="text" name="endDate" value={exp.endDate} onChange={(e) => handleChange(e, index, 'experiences')} required placeholder="MM/YYYY" /></label>
              </div>
              <label>Responsibilities* <textarea name="responsibilities" value={exp.responsibilities} onChange={(e) => handleChange(e, index, 'experiences')} required /></label>
            </div>
          ))}
          <button type="button" className="add-button" onClick={() => addEntry('experiences')}>Add another</button>

          {/* Proper Spacing Between Sections */}
          <div className="section-spacing"></div>

          {/* Education Section */}
          {formData.education.map((edu, index) => (
            <div key={index} className="education-section">
              <div className="education-header">
                <h3>Education {index + 1}</h3>
                {index > 0 && <button type="button" className="delete-button" onClick={() => removeEntry(index, 'education')}>Delete</button>}
              </div>
              <label>School or University Name* <input type="text" name="schoolName" value={edu.schoolName} onChange={(e) => handleChange(e, index, 'education')} required /></label>
              <label>Degree* <input type="text" name="degree" value={edu.degree} onChange={(e) => handleChange(e, index, 'education')} required /></label>
              <label>Field of Study* <input type="text" name="fieldOfStudy" value={edu.fieldOfStudy} onChange={(e) => handleChange(e, index, 'education')} required /></label>
              <div className="date-group">
                <label>Start Date* <input type="text" name="startDate" value={edu.startDate} onChange={(e) => handleChange(e, index, 'education')} required placeholder="MM/YYYY" /></label>
                <label>End Date* <input type="text" name="endDate" value={edu.endDate} onChange={(e) => handleChange(e, index, 'education')} required placeholder="MM/YYYY" /></label>
              </div>
            </div>
          ))}
          <button type="button" className="add-button" onClick={() => addEntry('education')}>Add another</button>

          {/* Additional Information */}
          <h3>Additional Information</h3>
          <label>LinkedIn Profile Link* <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} required /></label>
          <label>Additional Website (Optional) <input type="text" name="website" value={formData.website} onChange={handleChange} /></label>
          <label>Resume* <input type="file" name="resume" onChange={handleChange} accept=".pdf,.doc" required /></label>
          <p className="file-restriction">File type allowed: PDF, DOC</p>

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
