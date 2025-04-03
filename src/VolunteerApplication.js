import React, { useState } from 'react';
import VolunteerFormStep1 from './VolunteerFormStep1';
import VolunteerFormStep2 from './VolunteerFormStep2';
import VolunteerFormStep3 from './VolunteerFormStep3';
import VolunteerFormStep4 from './VolunteerFormStep4';
import VolunteerFormStep5 from './VolunteerFormStep5';
import { submitVolunteerForm } from './api';

const VolunteerApplication = () => {
  const [step, setStep] = useState(1); // ✅ Add step state
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    personal_email: '',
    phone_number: '',
    address_line_1: '',
	address_line_2: '',
    city: '',
    state: '',
	zip_code: '',
    country: '',
    gender: '',
	birth_date: '',
    opt_support: '',
    visa_status: '',
    desired_start_date: '',
    why_kworks: '',
    application_status: 'pending',
	hours_commitment: '',
	start_date: '',
    educations: [
      {
        institution_name: '',
        degree: '',
        major: '',
        start_date: '',
        end_date: '',
      },
    ],
    employments: [
      {
        company_name: '',
        job_title: '',
        location: '',
        start_date: '',
        end_date: '',
        responsibilities: '',
      },
    ],
    linkedin_url: '',
    website: '',
    resume: null,
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const response = await submitVolunteerForm(formData);
      if (response.success) {
        alert('Application submitted successfully!');
      } else {
        alert('Error: ' + response.message);
      }
    } catch (error) {
      alert('Submission failed.');
    }
  };

  return (
    <div>
      {step === 1 && <VolunteerFormStep1 formData={formData} setFormData={setFormData} onNext={handleNext} />}
      {step === 2 && <VolunteerFormStep2 formData={formData} setFormData={setFormData} onBack={handleBack} onNext={handleNext} />}
      {step === 3 && <VolunteerFormStep3 formData={formData} setFormData={setFormData} onBack={handleBack} onNext={handleNext} />}
      {step === 4 && <VolunteerFormStep4 formData={formData} setFormData={setFormData} onBack={handleBack} onNext={handleNext} />}
      {step === 5 && <VolunteerFormStep5 formData={formData} setFormData={setFormData} onBack={handleBack} onSubmit={handleSubmit} />}
    </div>
  );
};

export default VolunteerApplication;
