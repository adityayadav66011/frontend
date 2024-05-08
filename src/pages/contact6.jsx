import { useState, useEffect } from "react";

const defaultContactFormData = {
  City_Code: "",
  City_Name: "",
  Country_Code: "",
  State_Code: "",
};

export const Contact6Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
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

    fetchCountryCodes();
    fetchStateCodes();
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
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact6", {
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
          <h1 className="main-heading">City Master</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
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
                <label htmlFor="City_Code">City Code</label>
                <input
                  type="text"
                  name="City_Code"
                  id="City_Code"
                  autoComplete="off"
                  value={contact.City_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="City_Name">City Name</label>
                <input
                  type="text"
                  name="City_Name"
                  id="City_Name"
                  autoComplete="off"
                  value={contact.City_Name}
                  onChange={handleInput}
                  required
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

export default Contact6Component;
