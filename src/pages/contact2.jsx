import { useState, useEffect } from "react";

const defaultContactFormData = {
  Zone_Code: "",
  Zone_Name: "",
  Country_Code: "",
};

export const Contact2Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch("https://backend-hj39.onrender.com/api/form/countryCodes");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            // Filter out duplicate entries based on Country_Code and Country_Name combination
            const uniqueCountryOptions = [];
            const countryCodeSet = new Set();
            data.forEach((option) => {
              const key = `${option.Country_Code}-${option.Country_Name}`;
              if (!countryCodeSet.has(key)) {
                countryCodeSet.add(key);
                uniqueCountryOptions.push(option);
              }
            });
            setCountryOptions(uniqueCountryOptions);
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

    fetchCountryCodes();
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
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact2", {
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
          <h1 className="main-heading">Zone Master</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/contact2.svg" alt="Description of your image" />
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
                    <option key={index} value={`${option.Country_Code}-${option.Country_Name}`}>
                      {`${option.Country_Code}-${option.Country_Name}`}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Zone_Code">Zone Code</label>
                <input
                  type="text"
                  name="Zone_Code"
                  id="Zone_Code"
                  autoComplete="off"
                  value={contact.Zone_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Zone_Name">Zone Name</label>
                <input
                  type="text"
                  name="Zone_Name"
                  id="Zone_Name"
                  autoComplete="off"
                  value={contact.Zone_Name}
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
