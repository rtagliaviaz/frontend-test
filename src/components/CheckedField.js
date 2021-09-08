import React  from "react";

const CheckedField = ({ checked, value, label, name,  type, onChange }) => (
  <div className="form-group">
    {label && <label htmlFor="checked-field">{label}</label>}
    <input
      type={type}
      value={value}
      name={name}
      className="form-control"
      onChange={onChange}
    />
  </div>
);

export default CheckedField;