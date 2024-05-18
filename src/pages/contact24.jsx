import { useState, useEffect } from "react";

const defaultFormData = {
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
};

export const ContactForm24 = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const response = await fetch("https://backend-hj39.onrender.com/api/contact24Data/dropdowns");
        if (response.ok) {
          const data = await response.json();
          setDropdownOptions(data);
        } else {
          console.error("Failed to fetch dropdown options:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    fetchDropdowns();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact24", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData(defaultFormData);
        alert('Contact form 24 submitted successfully');
      } else {
        alert("Failed to submit contact form 24");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      alert("Failed to submit contact form 24");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Contact Form 24</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/contact.jpg" alt="Contact Form" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Customer_Code">Customer Code</label>
                <input
                  type="text"
                  name="Customer_Code"
                  id="Customer_Code"
                  value={formData.Customer_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Type">Type</label>
                <select
                  name="Type"
                  id="Type"
                  value={formData.Type}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="business">Business</option>
                  <option value="individual">Individual</option>
                </select>
              </div>
              <div>
                <label htmlFor="Primary_Contact">Primary Contact</label>
                <input
                  type="text"
                  name="Primary_Contact"
                  id="Primary_Contact"
                  value={formData.Primary_Contact}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Customer_Name">Customer Name</label>
                <input
                  type="text"
                  name="Customer_Name"
                  id="Customer_Name"
                  value={formData.Customer_Name}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Currency_Name">Currency Name</label>
                <select
                  name="Currency_Name"
                  id="Currency_Name"
                  value={formData.Currency_Name}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Currency Name</option>
                  {dropdownOptions.Currency_Name?.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Customer_Email">Customer Email</label>
                <input
                  type="email"
                  name="Customer_Email"
                  id="Customer_Email"
                  value={formData.Customer_Email}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Customer_Phone">Customer Phone</label>
                <input
                  type="text"
                  name="Customer_Phone"
                  id="Customer_Phone"
                  value={formData.Customer_Phone}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="GST_Name">GST Name</label>
                <select
                  name="GST_Name"
                  id="GST_Name"
                  value={formData.GST_Name}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select GST Name</option>
                  {dropdownOptions.GST_Name?.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="State_Code">State Code</label>
                <select
                  name="State_Code"
                  id="State_Code"
                  value={formData.State_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select State Code</option>
                  {dropdownOptions.State_Code?.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="PAN">PAN</label>
                <input
                  type="text"
                  name="PAN"
                  id="PAN"
                  value={formData.PAN}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Tax_Preference">Tax Preference</label>
                <select
                  name="Tax_Preference"
                  id="Tax_Preference"
                  value={formData.Tax_Preference}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Tax Preference</option>
                  <option value="taxable">Taxable</option>
                  <option value="non taxable">Non Taxable</option>
                </select>
              </div>
              <div>
                <label htmlFor="paymentTermCode">Payment Term Code</label>
                <select
                  name="paymentTermCode"
                  id="paymentTermCode"
                  value={formData.paymentTermCode}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Payment Term Code</option>
                  {dropdownOptions.paymentTermCode?.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Country_Code">Country Code</label>
                <select
                  name="Country_Code"
                  id="Country_Code"
                  value={formData.Country_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Country Code</option>
                  {dropdownOptions.Country_Code?.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Zone_Code">Zone Code</label>
                <select
                  name="Zone_Code"
                  id="Zone_Code"
                  value={formData.Zone_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Zone Code</option>
                  {dropdownOptions.Zone_Code?.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Pool_Code">Pool Code</label>
                <select
                  name="Pool_Code"
                  id="Pool_Code"
                  value={formData.Pool_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Pool Code</option>
                  {dropdownOptions.Pool_Code?.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Station_Code">Station Code</label>
                <select
                  name="Station_Code"
                  id="Station_Code"
                  value={formData.Station_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Station Code</option>
                  {dropdownOptions.Station_Code?.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="City_Code">City Code</label>
                <select
                  name="City_Code"
                  id="City_Code"
                  value={formData.City_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select City Code</option>
                  {dropdownOptions.City_Code?.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Street">Street</label>
                <input
                  type="text"
                  name="Street"
                  id="Street"
                  value={formData.Street}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Pin_Code">Pin Code</label>
                <input
                  type="text"
                  name="Pin_Code"
                  id="Pin_Code"
                  value={formData.Pin_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Soil_Name">Soil Name</label>
                <select
                  name="Soil_Name"
                  id="Soil_Name"
                  value={formData.Soil_Name}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Soil Name</option>
                  {dropdownOptions.Soil_Name?.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Visit_In_Days">Visit In Days</label>
                <input
                  type="number"
                  name="Visit_In_Days"
                  id="Visit_In_Days"
                  value={formData.Visit_In_Days}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Last_Visited">Last Visited</label>
                <input
                  type="date"
                  name="Last_Visited"
                  id="Last_Visited"
                  value={formData.Last_Visited}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Last_Visit_ID">Last Visit ID</label>
                <input
                  type="text"
                  name="Last_Visit_ID"
                  id="Last_Visit_ID"
                  value={formData.Last_Visit_ID}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Erp_Code">ERP Code</label>
                <input
                  type="text"
                  name="Erp_Code"
                  id="Erp_Code"
                  value={formData.Erp_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};

export default ContactForm24;
