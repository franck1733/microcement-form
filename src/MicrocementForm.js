import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Send, CheckCircle } from 'lucide-react';

const MicrocementForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    userType: [],
    projectType: '',
    space: [],
    area: '',
    surface: [],
    name: '',
    email: '',
    phone: ''
  });
  const [completed, setCompleted] = useState(false);

  const stepImages = {
    0: "/images/steps/step1-user-type.jpg",
    1: "/images/steps/step2-project-type.jpg",
    2: "/images/steps/step3-space.jpg",
    3: "/images/steps/step4-area.jpg",
    4: "/images/steps/step5-surface.jpg",
    5: "/images/steps/step6-contact.jpg"
  };

  const formSteps = [
    { question: "1. Who are you?", type: "checkbox", field: "userType", options: ["Architect", "Interior Designer", "Investor", "Contractor"] },
    { question: "2. Is this project for a client or yourself?", type: "radio", field: "projectType", options: ["For a client", "For myself"] },
    { question: "3. For which space are you planning microcement?", type: "checkbox", field: "space", options: ["Floor", "Wall", "Stairs", "Bathroom", "Shower area", "Kitchen countertop", "Pool", "Other"] },
    { question: "4. Approximate area (in m²)?", type: "number", field: "area", placeholder: "Enter area in m²" },
    { question: "5. What is the current substrate?", type: "checkbox", field: "surface", options: ["Ceramic tiles", "Screed (cement)", "Parquet / wooden surface", "Concrete - finished", "Concrete - raw", "OSB boards", "Drywall", "Fermacell", "Plaster", "Other / Not sure"] },
    { question: "6. Contact information:", type: "contact", field: "contactInfo", fields: { name: "Full name", email: "Email", phone: "Phone number" } }
  ];

  const handleInputChange = (field, value) => setFormData({ ...formData, [field]: value });

  const handleCheckboxChange = (field, value) => {
    const values = Array.isArray(formData[field]) ? [...formData[field]] : [];
    if (values.includes(value)) {
      setFormData({ ...formData, [field]: values.filter(v => v !== value) });
    } else {
      setFormData({ ...formData, [field]: [...values, value] });
    }
  };

  const handleNextStep = () => currentStep < formSteps.length - 1 ? setCurrentStep(currentStep + 1) : setCompleted(true);
  const handlePrevStep = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  const isValid = () => {
    const step = formSteps[currentStep];
    if (!step) return true;
    if (step.type === 'checkbox') return formData[step.field]?.length > 0;
    if (step.type === 'contact') return formData.name && formData.email;
    return formData[step.field];
  };

  if (completed) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h2>Thank you!</h2>
        <p>We’ve received your information and will be in touch soon.</p>
        <CheckCircle size={48} color="green" />
      </div>
    );
  }

  const step = formSteps[currentStep];
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <img src={stepImages[currentStep]} alt={`Step ${currentStep + 1}`} style={{ width: "100%", borderRadius: 12, marginBottom: 20 }} />
      <h3>{step.question}</h3>

      <div style={{ margin: "20px 0" }}>
        {step.type === 'radio' && step.options.map(option => (
          <label key={option} style={{ display: "block", margin: "8px 0" }}>
            <input type="radio" checked={formData[step.field] === option} onChange={() => handleInputChange(step.field, option)} />{" "}{option}
          </label>
        ))}
        {step.type === 'checkbox' && step.options.map(option => (
          <label key={option} style={{ display: "block", margin: "8px 0" }}>
            <input type="checkbox" checked={formData[step.field]?.includes(option)} onChange={() => handleCheckboxChange(step.field, option)} />{" "}{option}
          </label>
        ))}
        {step.type === 'number' && (
          <input type="number" placeholder={step.placeholder} value={formData[step.field]} onChange={(e) => handleInputChange(step.field, e.target.value)} style={{ width: "100%", padding: 10, fontSize: 16 }} />
        )}
        {step.type === 'contact' && (
          <>
            <input type="text" placeholder="Full name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} style={{ width: "100%", marginBottom: 10, padding: 10 }} />
            <input type="email" placeholder="Email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} style={{ width: "100%", marginBottom: 10, padding: 10 }} />
            <input type="tel" placeholder="Phone number" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} style={{ width: "100%", padding: 10 }} />
          </>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={handlePrevStep} disabled={currentStep === 0} style={{ padding: 10 }}><ChevronLeft /> Back</button>
        <button onClick={handleNextStep} disabled={!isValid()} style={{ padding: 10, backgroundColor: "#007bff", color: "white", border: "none" }}>{currentStep === formSteps.length - 1 ? "Submit" : "Next"} <ChevronRight /></button>
      </div>

      <div style={{ textAlign: "center", marginTop: 10 }}>
        Step {currentStep + 1} of {formSteps.length}
      </div>
    </div>
  );
};

export default MicrocementForm;

