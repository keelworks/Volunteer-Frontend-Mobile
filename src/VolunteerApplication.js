import React, { useState } from 'react';
import VolunteerFormStep1 from './VolunteerFormStep1';
import VolunteerFormStep2 from './VolunteerFormStep2';
import VolunteerFormStep3 from './VolunteerFormStep3';
import VolunteerFormStep4 from './VolunteerFormStep4';
import VolunteerFormStep5 from './VolunteerFormStep5';

const VolunteerApplication = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    alert("Form submitted successfully!");
  };

  return (
    <div>
      {step === 1 && <VolunteerFormStep1 onNext={handleNext} />}
      {step === 2 && <VolunteerFormStep2 onBack={handleBack} onNext={handleNext} />}
      {step === 3 && <VolunteerFormStep3 onBack={handleBack} onNext={handleNext} />}
      {step === 4 && <VolunteerFormStep4 onBack={handleBack} onNext={handleNext} />}
      {step === 5 && <VolunteerFormStep5 onBack={handleBack} onSubmit={handleSubmit} />}
    </div>
  );
};

export default VolunteerApplication;
