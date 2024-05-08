import { useState, useEffect } from "react";

const defaultContactFormData = {
  Pool_Code: "",
  Pool_Name: "",
  State_Code: "",
};

export const Contact4Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [stateOptions, setStateOptions] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
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
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact4", {
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
          <h1 className="main-heading">Pool Master</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/pool.jpg" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
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
                <label htmlFor="Pool_Code">Pool Code</label>
                <input
                  type="text"
                  name="Pool_Code"
                  id="Pool_Code"
                  autoComplete="off"
                  value={contact.Pool_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Pool_Name">Pool Name</label>
                <input
                  type="text"
                  name="Pool_Name"
                  id="Pool_Name"
                  autoComplete="off"
                  value={contact.Pool_Name}
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

export default Contact4Component;
