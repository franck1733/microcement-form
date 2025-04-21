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
    const current = Array.isArray(formData[field]) ? [...formData[field]] : [];
    if (current.includes(value)) {
      setFormData({ ...formData, [field]: current.filter(v => v !== value) });
    } else {
      setFormData({ ...formData, [field]: [...current, value] });
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

  const step = formSteps[currentStep];

  if (completed) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h2>Thank you!</h2>
        <p>We’ve received your information and will be in touch soon.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      {/* Avatar + question bubble */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", overflow: "hidden" }}>
          <img
            src="/images/avatar.jpg"
            alt="Assistant"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={{
          background: "#f0f4f8",
          padding: 16,
          borderRadius: 12,
          flex: 1,
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            top: 20,
            left: -10,
            width: 20,
            height: 20,
            background: "#f0f4f8",
            transform: "rotate(45deg)"
          }} />
          <h3 style={{ margin: 0 }}>{step.question}</h3>
        </div>
      </div>

      {/* Step image */}
      <div style={{ marginTop: 20 }}>
        <img
          src={stepImages[currentStep]}
          alt={`Step ${currentStep + 1}`}
          style={{ width: "100%", borderRadius: 16, marginBottom: 20 }}
        />
      </div>

      {/* Image options */}
      {(step.type === 'checkbox' || step.type === 'radio') && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginBottom: 20
        }}>
          {step.options.map(option => {
            const isSelected = step.type === 'checkbox'
              ? formData[step.field]?.includes(option)
              : formData[step.field] === option;

            const fileName = option
              .toLowerCase()
              .replace(/ /g, "-")
              .replace(/\//g, "")
              .replace(/[()]/g, "")
              .replace(/[^a-z0-9-]/g, "");

            return (
              <div
                key={option}
                onClick={() => {
                  if (step.type === 'checkbox') {
                    handleCheckboxChange(step.field, option);
                  } else {
                    handleInputChange(step.field, option);
                    setTimeout(() => handleNextStep(), 300);
                  }
                }}
                style={{
                  border: isSelected ? '3px solid #007bff' : '1px solid #ccc',
                  borderRadius: 14,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  background: isSelected ? '#e9f5ff' : '#fff',
                  boxShadow: isSelected ? '0 0 10px rgba(0,123,255,0.5)' : '0 2px 6px rgba(0,0,0,0.1)'
                }}
              >
                <img
                  src={`/images/options/${fileName}.jpg`}
                  alt={option}
                  style={{ width: "100%", height: 200, objectFit: "cover" }}
                />
                <div style={{ padding: 14, fontSize: 18, fontWeight: 600, textAlign: "center" }}>{option}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Number input */}
      {step.type === 'number' && (
        <input
          type="number"
          placeholder={step.placeholder}
          value={formData[step.field]}
          onChange={(e) => handleInputChange(step.field, e.target.value)}
          style={{ width: "100%", padding: 12, fontSize: 16 }}
        />
      )}

      {/* Contact info */}
      {step.type === 'contact' && (
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
        {step.type !== 'radio' && (
          <button onClick={handleNextStep} disabled={!isValid()}>
            {currentStep === formSteps.length - 1 ? "Submit" : "Next"}
          </button>
        )}
      </div>

      <div style={{ marginTop: 20, textAlign: "center", fontSize: 14 }}>
        Step {currentStep + 1} of {formSteps.length}
      </div>
    </div>
  );
};

export default MicrocementForm;
