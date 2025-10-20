// File: src/VolunteerApplication.js
import React, { useState, useMemo } from "react";
import VolunteerFormStep1 from "./VolunteerFormStep1";
import VolunteerFormStep2 from "./VolunteerFormStep2";
import VolunteerFormStep3 from "./VolunteerFormStep3";
import VolunteerFormStep4 from "./VolunteerFormStep4";
import VolunteerFormStep5 from "./VolunteerFormStep5";
import { submitVolunteerForm } from "./api";

export default function VolunteerApplication() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitOk, setSubmitOk] = useState(false);

  const goNext = () => setStep((s) => Math.min(5, s + 1));
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const onFinalSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    setSubmitOk(false);
    try {
      await submitVolunteerForm(formData);
      setSubmitOk(true);
    } catch (e) {
      setSubmitError(e?.message || "Something went wrong while submitting.");
    } finally {
      setSubmitting(false);
    }
  };

  const stepEl = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <VolunteerFormStep1
            formData={formData}
            setFormData={setFormData}
            onNext={goNext}
          />
        );
      case 2:
        return (
          <VolunteerFormStep2
            formData={formData}
            setFormData={setFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 3:
        return (
          <VolunteerFormStep3
            formData={formData}
            setFormData={setFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 4:
        return (
          <VolunteerFormStep4
            formData={formData}
            setFormData={setFormData}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 5:
      default:
        return (
          <VolunteerFormStep5
            formData={formData}
            setFormData={setFormData}
            onBack={goBack}
            onSubmit={onFinalSubmit}
            submitting={submitting}
            submitError={submitError}
            submitOk={submitOk}
          />
        );
    }
  }, [step, formData, submitting, submitError, submitOk]);

  return <div className="volunteer-app">{stepEl}</div>;
}
