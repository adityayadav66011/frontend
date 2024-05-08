import { useState, useEffect } from "react";

const defaultContactFormData = {
  State_Code: "",
  State_Name: "",
  Zone_Code: "",
  Ext_Code: "",
};

export const Contact3Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [zoneOptions, setZoneOptions] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    const fetchZoneCodes = async () => {
      try {
        const response = await fetch("https://backend-hj39.onrender.com/api/form/zoneCodes");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const uniqueZoneCodes = [...new Set(data.map((option) => option.Zone_Code))];
            setZoneOptions(uniqueZoneCodes);
          } else {
            console.error("Invalid data received from server:", data);
          }
        } else {
          console.error("Failed to fetch zone codes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching zone codes:", error);
      }
    };

    fetchZoneCodes();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    // Perform validation based on the input field name
    if (name === "Ext_Code" && isNaN(value)) {
      setWarningMessage("Ext Code should be a number");
      value = ""; // Clear the input field if invalid data is entered
    } else {
      setWarningMessage(""); // Clear the warning message if input is valid
    }

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact3", {
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
          <h1 className="main-heading">State Master</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/farmer.jpg" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Zone_Code">Zone Code</label>
                <select
                  name="Zone_Code"
                  id="Zone_Code"
                  value={contact.Zone_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Zone Code</option>
                  {zoneOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="State_Code">State Code</label>
                <input
                  type="text"
                  name="State_Code"
                  id="State_Code"
                  autoComplete="off"
                  value={contact.State_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="State_Name">State Name</label>
                <input
                  type="text"
                  name="State_Name"
                  id="State_Name"
                  autoComplete="off"
                  value={contact.State_Name}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Ext_Code">Ext Code</label>
                <input
                  type="text"
                  name="Ext_Code"
                  id="Ext_Code"
                  autoComplete="off"
                  value={contact.Ext_Code}
                  onChange={handleInput}
                  required
                />
                {warningMessage && <p className="warning">{warningMessage}</p>}
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

export default Contact3Component;
