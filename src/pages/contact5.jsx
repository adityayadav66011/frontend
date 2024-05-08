import { useState, useEffect } from "react";

const defaultContactFormData = {
  Station_Code: "",
  Station_Name: "",
  Pool_Code: "",
};

export const Contact5Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [poolOptions, setPoolOptions] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    const fetchPoolCodes = async () => {
      try {
        const response = await fetch("https://backend-hj39.onrender.com/api/form/poolCodes");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const uniquePoolCodes = [...new Set(data.map((option) => option.Pool_Code))];
            setPoolOptions(uniquePoolCodes);
          } else {
            console.error("Invalid data received from server:", data);
          }
        } else {
          console.error("Failed to fetch pool codes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching pool codes:", error);
      }
    };

    fetchPoolCodes();
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
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact5", {
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
          <h1 className="main-heading">Station Master</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Pool_Code">Pool Code</label>
                <select
                  name="Pool_Code"
                  id="Pool_Code"
                  value={contact.Pool_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Pool Code</option>
                  {poolOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Station_Code">Station Code</label>
                <input
                  type="text"
                  name="Station_Code"
                  id="Station_Code"
                  autoComplete="off"
                  value={contact.Station_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Station_Name">Station Name</label>
                <input
                  type="text"
                  name="Station_Name"
                  id="Station_Name"
                  autoComplete="off"
                  value={contact.Station_Name}
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

export default Contact5Component;
