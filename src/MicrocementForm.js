{step.options.map(option => {
  const fileName = option.toLowerCase()
    .replace(" / ", "-")
    .replace(/[^a-z0-9]+/g, "-");

  return (
    <div
      key={option}
      onClick={() => step.type === 'checkbox'
        ? handleCheckboxChange(step.field, option)
        : handleInputChange(step.field, option)
      }
      style={{
        border: isSelected ? '2px solid #007bff' : '1px solid #ccc',
        borderRadius: 10,
        cursor: 'pointer',
        overflow: 'hidden'
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
