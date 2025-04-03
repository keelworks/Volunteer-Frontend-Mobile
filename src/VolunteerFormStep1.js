import React, { useState } from 'react';
import './VolunteerForm.css';
import logo from './assets/keelworks-logo.png';
import HeaderBackgroundImage from './assets/nav_background1.jpg';
const VolunteerForm = ({ formData, setFormData, onNext }) => {
 

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
    console.log('Step 1 Form Data:', formData);
    onNext(); // Move to Step 2
  };

  return (
    <div className="form-container">
      {/* HEADER SECTION */}
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
          <span className="step active">1</span>
          <div className="step-line"></div> 
          <span className="step">2</span>
          <div className="step-line"></div> 
          <span className="step">3</span>
          <div className="step-line"></div> 
          <span className="step">4</span>
          <div className="step-line"></div>
          <span className="step">5</span>
        </div> */}
        <div className="steps">
          <div className="step-container">
            <span className="step active">1</span>
            <span className="step-label">Personal Information</span>
          </div>
          <div className="step-line"></div>

          <div className="step-container">
            <span className="step">2</span>
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




        <p className="step-description">Step 1: Add your personal details below</p>

        <form onSubmit={handleSubmit}>
          {/* First Name & Middle Name */}
          <div className="form-group">
            <label>
              First Name*
              <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
            </label>

            <label>
              Middle Name (optional)
              <input type="text" name="middle_name" value={formData.middle_name} onChange={handleChange} placeholder="Grace" />
            </label>
          </div>

          <label>
            Last Name*
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required placeholder="Doe" />
          </label>

          <label>
            Email Address*
            <input type="email" name="personal_email" value={formData.personal_email} onChange={handleChange} required placeholder="janedoe@gmail.com" />
          </label>

          <label>
            Phone Number*
            <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required placeholder="+1 1234567890" />
          </label>
		  <label>
			Birth Date*
			<input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} required />
			</label>
          <label>
            Phone Type*
            <select name="phonetype" value={formData.phonetype} onChange={handleChange} required>
              <option value="Mobile">Home</option>
              <option value="Home">Mobile</option>
              <option value="Work">Work</option>
            </select>
          </label>

          <label>
            Address Line 1*
            <input type="text" name="address_line_1" value={formData.address_line_1} onChange={handleChange} required placeholder="123 Main Street" />
          </label>

          <label>
            Address Line 2 (optional)
            <input type="text" name="address_line_2" value={formData.address_line_2} onChange={handleChange} placeholder="Apartment, suite number, etc" />
          </label>

          <label>
            City*
            <select name="city" value={formData.city} onChange={handleChange} required>
              <option value="">Select City</option>
              {['Indianapolis', 'New York', 'Los Angeles', 'Chicago'].map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </label>

          <label>
            State*
            <select name="state" value={formData.state} onChange={handleChange} required>
              {['IN', 'NY', 'CA', 'IL'].map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </label>

          <label>
            Zipcode*
            <input type="text" name="zip_code" value={formData.zip_code} onChange={handleChange} required placeholder="01234" />
          </label>

          <label>
            Country*
            <select name="country" value={formData.country} onChange={handleChange} required>
              {['United States', 'India', 'Canada', 'Australia'].map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </label>

          <label className="checkbox-label">
            <input type="checkbox" name="isCurrentCountrySame" checked={formData.isCurrentCountrySame} onChange={handleChange} />
            Current country is same as home country?
          </label>

          <label>
            Home Country*
            <select name="homeCountry" value={formData.homeCountry} onChange={handleChange} required disabled={formData.isCurrentCountrySame}>
              {['United States', 'India', 'Canada', 'Australia'].map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </label>

          <label>
			Time Zone*
			<select name="time_zone" value={formData.time_zone} onChange={handleChange} required >
			<option value="">-- Select Time Zone --</option>
			<option value="America/New_York">EDT</option>
			<option value="Asia/Kolkata">IST</option>
			<option value="America/Los_Angeles">PST</option>
			<option value="America/Chicago">CST</option>
			</select>
		  </label>

          <label>
            Profile Picture (optional)
            <input type="file" name="profilePicture" onChange={handleChange} accept=".png, .jpg, .jpeg" />
          </label>
          <p className="file-restriction">Maximum size: 2MB, file types allowed: PNG, JPEG</p>

          {/* Next Button to Move to Step 2 */}
          {/* <button type="submit" className="next-button">Next</button> */}
          <button
            type="submit"
            className="next-button"
            style={{ float: 'right' }}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;
