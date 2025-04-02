import React, { useState } from "react";
import "../styles/components.css";

const Form = ({ onSubmit, initialData = {}, labels = {}, legends = {} }) => {
  const defaultLabels = {
    name: "Child's Name",
    yearOfBirth: "Year of Birth",
    parentName: "Parent's Name",
    parentId: "Parent ID",
    contact: "Phone Number",
    email: "Email",
    address: "Address",
    allergies: "Allergies (if any)",
  };

  const defaultLegends = {
    personalInfo: "Child Information",
    supervisorInfo: "Parent Information",
    additionalInfo: "Additional Information",
    photo: "Child's Photo", // Default legend for photo
  };

  const formLabels = { ...defaultLabels, ...labels };
  const formLegends = { ...defaultLegends, ...legends };

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

  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Prevent numbers in text fields
    if (["name", "parentName", "allergies"].includes(name) && /\d/.test(value)) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(file);
    }
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
    setImagePreview(null); // Reset image preview
  };

  return (
    <form className="form-styles" onSubmit={handleSubmit}>
      {/* Personal Information */}
      <fieldset className="form-fieldset">
        <legend>{formLegends.personalInfo}</legend>
        <div className="form-group">
          <label htmlFor="name">{formLabels.name}</label>
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
          <label htmlFor="yearOfBirth">{formLabels.yearOfBirth}</label>
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

      {/* Child's Photo */}
      <fieldset className="form-fieldset">
        <legend>{formLegends.photo}</legend> {/* Use dynamic legend */}
        <div className="form-group">
          <label htmlFor="photo">Upload Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" className="preview-image" />
          </div>
        )}
      </fieldset>

      {/* Supervisor Information */}
      <fieldset className="form-fieldset">
        <legend>{formLegends.supervisorInfo}</legend>
        <div className="form-group">
          <label htmlFor="parentName">{formLabels.parentName}</label>
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
          <label htmlFor="parentId">{formLabels.parentId}</label>
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
          <label htmlFor="contact">{formLabels.contact}</label>
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
          <label htmlFor="email">{formLabels.email}</label>
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
        <legend>{formLegends.additionalInfo}</legend>
        <div className="form-group">
          <label htmlFor="address">{formLabels.address}</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="allergies">{formLabels.allergies}</label>
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
