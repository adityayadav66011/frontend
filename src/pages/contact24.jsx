import React, { useState, useEffect } from "react";

 export const Contact24 = () => {
  const [formData, setFormData] = useState({
    Customer_Code: "",
    Type: "",
    Primary_Contact: "",
    Customer_Name: "",
    Currency_Name: "",
    Customer_Email: "",
    Customer_Phone: "",
    GST_Name: "",
    State_Code: "",
    PAN: "",
    Tax_Preference: "",
    paymentTermCode: "",
    Country_Code: "",
    Zone_Code: "",
    Pool_Code: "",
    Station_Code: "",
    City_Code: "",
    Street: "",
    Pin_Code: "",
    Soil_Name: "",
    Visit_In_Days: "",
    Last_Visited: "",
    Last_Visit_ID: "",
    Erp_Code: ""
  });

  const [dropdownOptions, setDropdownOptions] = useState({});

  useEffect(() => {
    // Fetch dropdown options when component mounts
    fetchDropdownOptions();
  }, []);

  const fetchDropdownOptions = async () => {
    try {
      const response = await fetch("/api/form/dropdowns");
      if (!response.ok) {
        throw new Error("Failed to fetch dropdown options");
      }
      const data = await response.json();
      setDropdownOptions(data);
    } catch (error) {
      console.error("Error fetching dropdown options:", error);
      // Handle error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/form/Contact24", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      const data = await response.json();
      console.log(data.message); // Log success message
      // Reset form data after successful submission (optional)
      setFormData({
        Customer_Code: "",
        Type: "",
        Primary_Contact: "",
        Customer_Name: "",
        Currency_Name: "",
        Customer_Email: "",
        Customer_Phone: "",
        GST_Name: "",
        State_Code: "",
        PAN: "",
        Tax_Preference: "",
        paymentTermCode: "",
        Country_Code: "",
        Zone_Code: "",
        Pool_Code: "",
        Station_Code: "",
        City_Code: "",
        Street: "",
        Pin_Code: "",
        Soil_Name: "",
        Visit_In_Days: "",
        Last_Visited: "",
        Last_Visit_ID: "",
        Erp_Code: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error
    }
  };

  return (
    <div className="contact24-form">
      <h2>Contact Form 24</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for form data */}
        {/* Example: */}
        <label>Customer Code</label>
        <input
          type="text"
          name="Customer_Code"
          value={formData.Customer_Code}
          onChange={handleChange}
        />

        {/* Dropdown select for Currency Name */}
        <label>Currency Name</label>
        <select
          name="Currency_Name"
          value={formData.Currency_Name}
          onChange={handleChange}
        >
          <option value="">Select Currency</option>
          {dropdownOptions.Currency_Name &&
            dropdownOptions.Currency_Name.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
        </select>

        {/* Add more input fields and dropdown selects as needed */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact24;
