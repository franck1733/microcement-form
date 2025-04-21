import React, { useState } from 'react';

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
    {
      question: "1. Who are you?",
      type: "checkbox",
      field: "userType",
      options: ["Architect", "Interior Designer", "Investor", "Contractor"]
    },
    {
      question: "2. Is this project for a client or yourself?",
      type: "radio",
      field: "projectType",
      options: ["For a client", "For myself"]
    },
    {
      question: "3. For which space are you planning microcement?",
      type: "checkbox",
      field: "space",
      options: ["Floor", "Wall", "Stairs", "Bathroom", "Shower area", "Kitchen countertop", "Pool", "Other"]
    },
    {
      question: "4. Approximate area (in m²)?",
      type: "number",
      field: "area",
      placeholder: "Enter area in m²"
    },
    {
      question: "5. What is the current substrate?",
      type: "checkbox",
      field: "surface",
      options: ["Ceramic tiles", "Screed (cement)", "Parquet / wooden surface", "Concrete - finished", "Concrete - raw", "OSB boards", "Drywall", "Fermacell", "Plaster", "Other / Not sure"]
    },
    {
      question: "6. Contact information:",
      type: "contact",
      field: "contactInfo",
      fields: {
        name: "Full name",
        email: "Email",
        phone: "Phone number"
      }
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCheckboxChange = (field, value) => {
    const values = Array.isArray(formData[field]) ? [...formData[field]] : [];
    if (values.includes(value)) {
      setFormData({ ...formData, [field]: values.filter(v => v !== value) });
    } else {
      setFormData({ ...formData, [field]: [...values, value] });
    }
  };

  const handleNextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const isValid = () => {
    const step = formSteps[currentStep];
    if (!step) return true;
    if (step.type === 'checkbox') return formData[step.field]?.length > 0;
    if (step.type === 'contact') return formData.name && formData.email;
    return formData[step.field];
  };

  const current = formSteps[currentStep];

  if (completed) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h2>Thank you!</h2>
        <p>We’ve received your information and will be in touch soon.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 20 }}>
      <img
        src={stepImages[currentStep]}
        alt={`Step ${currentStep + 1}`}
        style={{ width: "100%", borderRadius: 12, marginBottom: 20 }}
      />
      <h3 style={{ marginBottom: 20 }}>{current.question}</h3>

      {/* Image-based answers */}
      {(current.type === 'checkbox' || current.type === 'radio') && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
          marginBottom: 20
        }}>
          {current.options.map(option => {
            const isSelected = current.type === 'checkbox'
              ? formData[current.field]?.includes(option)
              : formData[current.field] === option;
            const fileName = option.toLowerCase().replace(/[^a-z0-9]+/g, "-");

            return (
              <div
                key={option}
                onClick={() =>
                  current.type === 'checkbox'
                    ? handleCheckboxChange(current.field, option)
                    : handleInputChange(current.field, option)
                }
                style={{
                  border: isSelected ? '2px solid #007bff' : '1px solid #ccc',
                  borderRadius: 10,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  background: isSelected ? '#e9f5ff' : '#fff',
                  boxShadow: isSelected ? '0 0 10px rgba(0,123,255,0.5)' : '0 1px 4px rgba(0,0,0,0.1)'
                }}
              >
                <img
                  src={`/images/options/${fileName}.jpg`}
                  alt={option}
                  style={{ width: "100%", height: 100, objectFit: "cover" }}
                />
                <div style={{ padding: 10, textAlign: "center", fontWeight: 500 }}>{option}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Number input */}
      {current.type === 'number' && (
        <input
          type="number"
          placeholder={current.placeholder}
          value={formData[current.field]}
          onChange={(e) => handleInputChange(current.field, e.target.value)}
          style={{ width: "100%", padding: 12, fontSize: 16 }}
        />
      )}

      {/* Contact form */}
      {current.type === 'contact' && (
        <div>
          <input
            type="text"
            placeholder="Full name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            style={{ width: "100%", padding: 10 }}
          />
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 30 }}>
        <button onClick={handlePrevStep} disabled={currentStep === 0}>Back</button>
        <button onClick={handleNextStep} disabled={!isValid()}>
          {currentStep === formSteps.length - 1 ? "Submit" : "Next"}
        </button>
      </div>

      <div style={{ marginTop: 20, textAlign: "center", fontSize: 14 }}>
        Step {currentStep + 1} of {formSteps.length}
      </div>
    </div>
  );
};

export default MicrocementForm;
