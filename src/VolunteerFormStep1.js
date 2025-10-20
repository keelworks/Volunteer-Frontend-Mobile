// src/VolunteerFormStep1.js
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './VolunteerForm.css';
import logo from './assets/keelworks-logo.png';
import HeaderBackgroundImage from './assets/nav_background1.jpg';
import { getCountries, getStates, getCities } from './api';

const VolunteerFormStep1 = ({ formData, setFormData, onNext }) => {
  // Reference data
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Loading/errors
  const [loading, setLoading] = useState({ countries: false, states: false, cities: false });
  const [errs, setErrs] = useState({ countries: '', states: '', cities: '' });

  // ---- helpers to normalize various backend shapes ----
  const asArray = (x) => {
    if (Array.isArray(x)) return x;
    if (x && Array.isArray(x.data)) return x.data;
    if (x && x.data && Array.isArray(x.data.items)) return x.data.items;
    if (x && x.items && Array.isArray(x.items)) return x.items;
    return [];
  };
  const mapCountries = (list) =>
    asArray(list)
      .map((c) => ({
        id: c.country_id ?? c.id ?? c.code,              // numeric id (preferred)
        code: c.country_code ?? c.code,                  // 2-letter code (for /states/:code)
        name: c.country_name ?? c.name,
      }))
      .filter((c) => c.name && (c.id || c.code));

  const mapStates = (list) =>
    asArray(list)
      .map((s) => ({
        id: s.state_id ?? s.id ?? s.code,
        code: s.state_code ?? s.code ?? String(s.state_id ?? s.id ?? '').trim(),
        name: s.state_name ?? s.name ?? s.code,
      }))
      .filter((s) => (s.id || s.code) && s.name);

  const mapCities = (list) =>
    asArray(list)
      .map((ci) => ({
        id: ci.city_id ?? ci.id,
        name: ci.city_name ?? ci.name ?? String(ci.city_id ?? ci.id),
      }))
      .filter((ci) => ci.id && ci.name);

  // Load countries on mount (used by both Home Country and Address Country)
  useEffect(() => {
    (async () => {
      setLoading((p) => ({ ...p, countries: true }));
      setErrs((p) => ({ ...p, countries: '' }));
      try {
        const data = await getCountries();
        const list = mapCountries(data);
        setCountries(list);
        if (!list.length) {
          console.warn('[step1] Countries list empty; raw:', data);
          setErrs((p) => ({ ...p, countries: 'No countries returned by the API.' }));
        }
      } catch (e) {
        console.error(e);
        setErrs((p) => ({ ...p, countries: 'Failed to load countries' }));
      } finally {
        setLoading((p) => ({ ...p, countries: false }));
      }
    })();
  }, []);

  // --- General change handler for text inputs ---
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- Home Country (numeric id required by backend) ---
  const onHomeCountryChange = (e) => {
    const value = e.target.value; // string id
    const numericId = value ? Number(value) : 0;
    setFormData((prev) => ({ ...prev, home_country: numericId }));
  };

  // --- Address Country (uses country_code to fetch states) ---
  const onCountryChange = async (e) => {
    const country_code = e.target.value || '';
    // reset dependent address fields
    setFormData((prev) => ({
      ...prev,
      country_code,
      state_id: '',
      state_code: '',
      city_id: '',
      state: '',
      city: '',
    }));
    setStates([]);
    setCities([]);
    if (!country_code) return;

    setLoading((p) => ({ ...p, states: true }));
    setErrs((p) => ({ ...p, states: '' }));
    try {
      const res = await getStates(country_code);
      const list = mapStates(res);
      setStates(list);
      if (!list.length) {
        console.warn('[step1] States list empty for country:', country_code, 'Raw:', res);
        setErrs((p) => ({ ...p, states: 'No states returned for selected country.' }));
      }
    } catch (e2) {
      console.error(e2);
      setErrs((p) => ({ ...p, states: 'Failed to load states' }));
    } finally {
      setLoading((p) => ({ ...p, states: false }));
    }
  };

  // --- State change (stores both code and id; cities need the id) ---
  const onStateChange = async (e) => {
    const value = e.target.value || '';
    const st = states.find((s) => s.code === value || String(s.id) === value);
    const state_code = st?.code || value;
    const state_id = st?.id ?? '';

    setFormData((prev) => ({
      ...prev,
      state_id,
      state_code,
      state: st?.name || state_code,
      city_id: '',
      city: '',
    }));
    setCities([]);

    if (!state_id) return;

    setLoading((p) => ({ ...p, cities: true }));
    setErrs((p) => ({ ...p, cities: '' }));
    try {
      const res = await getCities(state_id);
      const list = mapCities(res);
      setCities(list);
      if (!list.length) {
        console.warn('[step1] Cities list empty for state:', state_id, 'Raw:', res);
        setErrs((p) => ({ ...p, cities: 'No cities returned for selected state.' }));
      }
    } catch (e3) {
      console.error(e3);
      setErrs((p) => ({ ...p, cities: 'Failed to load cities' }));
    } finally {
      setLoading((p) => ({ ...p, cities: false }));
    }
  };

  // --- City change (stores city_id and display name) ---
  const onCityChange = (e) => {
    const city_id = e.target.value || '';
    const cityObj = cities.find((c) => String(c.id) === city_id);
    setFormData((prev) => ({
      ...prev,
      city_id,
      city: cityObj?.name || '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext?.();
  };

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
          <div className="step-container"><span className="step active">1</span><span className="step-label">Personal Information</span></div>
          <div className="step-line"></div>
          <div className="step-container"><span className="step">2</span><span className="step-label">Education and Experience</span></div>
          <div className="step-line"></div>
          <div className="step-container"><span className="step">3</span><span className="step-label">Role and Availability</span></div>
          <div className="step-line"></div>
          <div className="step-container"><span className="step">4</span><span className="step-label">Additional Information</span></div>
          <div className="step-line"></div>
          <div className="step-container"><span className="step">5</span><span className="step-label">Identification</span></div>
        </div>

        {errs.countries && <p style={{ color: 'red' }}>{errs.countries}</p>}

        <p className="step-description">Step 1: Add your personal details below</p>

        <form onSubmit={handleSubmit}>
          {/* Home Country (REQUIRED numeric id) */}
          <label>
            Home Country*
            <select
              name="home_country_select"
              value={formData.home_country != null ? String(formData.home_country) : ''}
              onChange={onHomeCountryChange}
              required
              disabled={loading.countries}
            >
              <option value="">{loading.countries ? 'Loading...' : 'Select Home Country'}</option>
              {countries.map((c) => (
                <option key={String(c.id)} value={String(c.id)}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          {/* Names */}
          <div className="form-group">
            <label>
              First Name*
              <input
                type="text"
                name="first_name"
                value={formData.first_name || ''}
                onChange={handleTextChange}
                required
              />
            </label>

            <label>
              Middle Name (optional)
              <input
                type="text"
                name="middle_name"
                value={formData.middle_name || ''}
                onChange={handleTextChange}
                placeholder="Grace"
              />
            </label>
          </div>

          <label>
            Last Name*
            <input
              type="text"
              name="last_name"
              value={formData.last_name || ''}
              onChange={handleTextChange}
              required
              placeholder="Doe"
            />
          </label>

          <label>
            Email Address*
            <input
              type="email"
              name="personal_email"
              value={formData.personal_email || ''}
              onChange={handleTextChange}
              required
              placeholder="janedoe@gmail.com"
            />
          </label>

          <label>
            Phone Number*
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number || ''}
              onChange={handleTextChange}
              required
              placeholder="+1 1234567890"
            />
          </label>

          <label>
            Birth Date*
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date || ''}
              onChange={handleTextChange}
              required
            />
          </label>

          <label>
            Phone Type*
            <select
              name="phonetype"
              value={formData.phonetype || 'Mobile'}
              onChange={handleTextChange}
              required
            >
              <option value="Mobile">Mobile</option>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
            </select>
          </label>

          {/* Address */}
          <label>
            Address Line 1*
            <input
              type="text"
              name="address_line_1"
              value={formData.address_line_1 || ''}
              onChange={handleTextChange}
              required
              placeholder="123 Main Street"
            />
          </label>

          <label>
            Address Line 2 (optional)
            <input
              type="text"
              name="address_line_2"
              value={formData.address_line_2 || ''}
              onChange={handleTextChange}
              placeholder="Apartment, suite number, etc"
            />
          </label>

          {/* Address Country (for states/cities) — value is country_code */}
          <label>
            Country (Residence)*
            <select
              name="countrySelect"
              value={formData.country_code || ''}
              onChange={onCountryChange}
              required
              disabled={loading.countries}
            >
              <option value="">{loading.countries ? 'Loading...' : 'Select Country'}</option>
              {countries
                .filter((c) => !!c.code) // only those with codes usable for /states
                .map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
            </select>
          </label>

          {/* State (by code/id) */}
          <label>
            State / Province*
            <select
              name="stateSelect"
              value={formData.state_code || ''}
              onChange={onStateChange}
              required
              disabled={!formData.country_code || loading.states}
            >
              <option value="">{loading.states ? 'Loading...' : 'Select State'}</option>
              {states.map((s) => (
                <option key={String(s.id || s.code)} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>

          {/* City (by city_id) */}
          <label>
            City*
            <select
              name="citySelect"
              value={formData.city_id != null ? String(formData.city_id) : ''}
              onChange={onCityChange}
              required
              disabled={(!formData.state_id && !formData.state_code) || loading.cities}
            >
              <option value="">{loading.cities ? 'Loading...' : 'Select City'}</option>
              {cities.map((c) => (
                <option key={String(c.id)} value={String(c.id)}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Zipcode*
            <input
              type="text"
              name="zip_code"
              value={formData.zip_code || ''}
              onChange={handleTextChange}
              required
              placeholder="01234"
            />
          </label>

          {/* Time Zone */}
          <label>
            Time Zone*
            <select
              name="time_zone"
              value={formData.time_zone || ''}
              onChange={handleTextChange}
              required
            >
              <option value="">-- Select Time Zone --</option>
              <option value="America/New_York">EDT</option>
              <option value="Asia/Kolkata">IST</option>
              <option value="America/Los_Angeles">PST</option>
              <option value="America/Chicago">CST</option>
            </select>
          </label>

          {/* Next */}
          <button type="submit" className="next-button" style={{ float: 'right' }}>
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerFormStep1;
