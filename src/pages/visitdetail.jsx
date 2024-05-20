import React, { useState } from 'react';
import { formatDate, formatDateTime } from './visitentry';

const VisitDetail = ({ customer, onClose }) => {
  const [formData, setFormData] = useState({
    Last_Visited_Date: customer.Last_Visited,
    Days_Since_Visit_Pending: customer.Days_Since_Visit_Pending,
    Planned_Date: customer.Planned_Date,
    Planned_Time: customer.Planned_Time,
    Remarks: customer.Remarks,
    Amount_Receivables: '50000 INR',
    Overdue_Amount: '23000 INR',
    Fixed_Field: 'Mango',
    Last_Material_Recommended: 'Fertilizers',
    Feedback: '',
    Season_Recommendation: 'Red',
    New_Recommended_Crops: [],
    New_Recommended_Materials: [],
    Next_Visit_Suggested: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked ? [...formData[name], value] : formData[name].filter(item => item !== value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backend-hj39.onrender.com/api/plan-visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        window.alert("Form submitted successfully!");
        onClose();
      } else {
        window.alert("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      window.alert("Error submitting the form. Please try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Visit Detail for {customer.Customer_Name}</h2>
        <form onSubmit={handleSubmit}>
          {/* Existing customer data */}
          <p>Last Visited: {formatDate(customer.Last_Visited)}</p>
          <p>Planned Visit Date: {formData.Planned_Date}</p>
          <p>Planned Visit Time: {formData.Planned_Time}</p>
          <p>Amount Receivables: {formData.Amount_Receivables}</p>
          <p>Overdue Amount: {formData.Overdue_Amount}</p>
          <p>Crop Recommended in Last Week: {formData.Fixed_Field}</p>
          <p>Material Recommended in Last Week: {formData.Last_Material_Recommended}</p>
          <p>Remarks: {formData.Remarks}</p>
          
          {/* New form fields */}
          <label>
            Feedback:
            <textarea
              name="Feedback"
              value={formData.Feedback}
              onChange={handleChange}
            />
          </label>
          <label>
            Season Recommendation:
            <select name="Season_Recommendation" value={formData.Season_Recommendation} onChange={handleChange}>
              <option value="Red">Red</option>
              <option value="Black">Black</option>
              <option value="Arid">Arid</option>
            </select>
          </label>
          <fieldset>
            <legend>New Recommended Crops</legend>
            <label>
              <input
                type="checkbox"
                name="New_Recommended_Crops"
                value="Crop1"
                checked={formData.New_Recommended_Crops.includes('Crop1')}
                onChange={handleChange}
              />
              Crop1
            </label>
            <label>
              <input
                type="checkbox"
                name="New_Recommended_Crops"
                value="Crop2"
                checked={formData.New_Recommended_Crops.includes('Crop2')}
                onChange={handleChange}
              />
              Crop2
            </label>
          </fieldset>
          <fieldset>
            <legend>New Recommended Materials</legend>
            <label>
              <input
                type="checkbox"
                name="New_Recommended_Materials"
                value="Material1"
                checked={formData.New_Recommended_Materials.includes('Material1')}
                onChange={handleChange}
              />
              Material1
            </label>
            <label>
              <input
                type="checkbox"
                name="New_Recommended_Materials"
                value="Material2"
                checked={formData.New_Recommended_Materials.includes('Material2')}
                onChange={handleChange}
              />
              Material2
            </label>
          </fieldset>
          <label>
            Next Visit Suggested:
            <input
              type="datetime-local"
              name="Next_Visit_Suggested"
              value={formData.Next_Visit_Suggested}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default VisitDetail;
