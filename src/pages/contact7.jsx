import { useState, useEffect } from "react";

const defaultContactFormData = {
  Company_Code: "",
  Company_Name: "",
  Company_Address_Line1: "",
  Company_Address_Line2: "",
  Street: "",
  Area_Village: "",
  City_Code: "", // City_Code is now a dropdown
  State_Code: "",
  Country_Code: "",
  Pincode: "",
  GST_No: "",
};

export const Contact7Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch("https://backend-hj39.onrender.com/api/form/countryCodes");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const uniqueCountryCodes = [...new Set(data.map((option) => option.Country_Code))];
            setCountryOptions(uniqueCountryCodes);
          } else {
            console.error("Invalid data received from server:", data);
          }
        } else {
          console.error("Failed to fetch country codes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching country codes:", error);
      }
    };

    const fetchStateCodes = async () => {
      try {
        const response = await fetch("https://backend-hj39.onrender.com/api/form/stateCodes");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const uniqueStateCodes = [...new Set(data.map((option) => option.State_Code))];
            setStateOptions(uniqueStateCodes);
          } else {
            console.error("Invalid data received from server:", data);
          }
        } else {
          console.error("Failed to fetch state codes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching state codes:", error);
      }
    };

    const fetchCityCodes = async () => {
      try {
        const response = await fetch("https://backend-hj39.onrender.com/api/form/cityCodes");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const uniqueCityCodes = [...new Set(data.map((option) => option.City_Code))];
            setCityOptions(uniqueCityCodes);
          } else {
            console.error("Invalid data received from server:", data);
          }
        } else {
          console.error("Failed to fetch city codes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching city codes:", error);
      }
    };
    fetchCountryCodes();
    fetchStateCodes();
    fetchCityCodes();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact7", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact(defaultContactFormData);
        alert('Message sent successfully');
      }
    } catch (error) {
      alert("Message not sent");
      console.log(error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Company Master</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Company_Code">Company Code</label>
                <input
                  type="text"
                  name="Company_Code"
                  id="Company_Code"
                  autoComplete="off"
                  value={contact.Company_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Company_Name">Company Name</label>
                <input
                  type="text"
                  name="Company_Name"
                  id="Company_Name"
                  autoComplete="off"
                  value={contact.Company_Name}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Company_Address_Line1">Address Line 1</label>
                <input
                  type="text"
                  name="Company_Address_Line1"
                  id="Company_Address_Line1"
                  autoComplete="off"
                  value={contact.Company_Address_Line1}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Company_Address_Line2">Address Line 2</label>
                <input
                  type="text"
                  name="Company_Address_Line2"
                  id="Company_Address_Line2"
                  autoComplete="off"
                  value={contact.Company_Address_Line2}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="Street">Street</label>
                <input
                  type="text"
                  name="Street"
                  id="Street"
                  autoComplete="off"
                  value={contact.Street}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="Area_Village">Area/Village</label>
                <input
                  type="text"
                  name="Area_Village"
                  id="Area_Village"
                  autoComplete="off"
                  value={contact.Area_Village}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="State_Code">State Code</label>
                <select
                  name="State_Code"
                  id="State_Code"
                  value={contact.State_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select State Code</option>
                  {stateOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Country_Code">Country Code</label>
                <select
                  name="Country_Code"
                  id="Country_Code"
                  value={contact.Country_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Country Code</option>
                  {countryOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="City_Code">City Code</label>
                <select
                  name="City_Code"
                  id="City_Code"
                  value={contact.City_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select City Code</option>
                  {cityOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Pincode">Pincode</label>
                <input
                  type="text"
                  name="Pincode"
                  id="Pincode"
                  autoComplete="off"
                  value={contact.Pincode}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="GST_No">GST Number</label>
                <input
                  type="text"
                  name="GST_No"
                  id="GST_No"
                  autoComplete="off"
                  value={contact.GST_No}
                  onChange={handleInput}
                />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};

export default Contact7Component;
