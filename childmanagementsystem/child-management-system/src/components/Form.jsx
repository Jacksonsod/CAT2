import React, { useState } from "react";
import "../styles/components.css";

const Form = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    yearOfBirth: initialData.yearOfBirth || "",
    parentName: initialData.parentName || "",
    parentId: initialData.parentId || "",
    contact: initialData.contact || "",
    email: initialData.email || "",
    address: initialData.address || "",
    allergies: initialData.allergies || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Prevent numbers in text fields
    if (["name", "parentName", "allergies"].includes(name) && /\d/.test(value)) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      yearOfBirth: "",
      parentName: "",
      parentId: "",
      contact: "",
      email: "",
      address: "",
      allergies: "",
    }); // Reset form
  };

  return (
    <form className="form-styles" onSubmit={handleSubmit}>
      {/* Child Information */}
      <fieldset className="form-fieldset">
        <legend>Child Information</legend>
        <div className="form-group">
          <label htmlFor="name">Child's Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="yearOfBirth">Year of Birth</label>
          <select
            id="yearOfBirth"
            name="yearOfBirth"
            value={formData.yearOfBirth}
            onChange={handleChange}
            required
          >
            <option value="">Select Year</option>
            {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      {/* Parent Information */}
      <fieldset className="form-fieldset">
        <legend>Parent Information</legend>
        <div className="form-group">
          <label htmlFor="parentName">Parent's Name</label>
          <input
            type="text"
            id="parentName"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="parentId">Parent ID</label>
          <input
            type="text"
            id="parentId"
            name="parentId"
            value={formData.parentId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Phone Number</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            pattern="[0-9]{10}" // Validation for 10-digit phone number
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </fieldset>

      {/* Additional Information */}
      <fieldset className="form-fieldset">
        <legend>Additional Information</legend>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="allergies">Allergies (if any)</label>
          <input
            type="text"
            id="allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <button type="submit" className="form-submit-button">
        Submit
      </button>
    </form>
  );
};

export default Form;
