import { useState, useEffect } from "react";

const defaultContactFormData = {
  Soil_Code: "",
  Soil_Name: "",
};

export const Contact20Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [previousSoilCode, setPreviousSoilCode] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    const fetchPreviousSoilCode = async () => {
      try {
        const response = await fetch("https://backend-hj39.onrender.com/api/form/previousSoilCode");
        if (response.ok) {
          const data = await response.json();
          setPreviousSoilCode(data.previousSoilCode);
        } else {
          console.error("Failed to fetch previous Soil Code:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching previous Soil Code:", error);
      }
    };

    fetchPreviousSoilCode();
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
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact20", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact(defaultContactFormData);
        alert('Contact form 20 created successfully');
      }
    } catch (error) {
      alert("Failed to create contact form 20");
      console.log(error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Soil Master</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/soil.jpg" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Soil_Code">Soil Code</label>
                <input
                  type="text"
                  name="Soil_Code"
                  id="Soil_Code"
                  autoComplete="off"
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="Soil_Name">Soil Name</label>
                <input
                  type="text"
                  name="Soil_Name"
                  id="Soil_Name"
                  autoComplete="off"
                  value={contact.Soil_Name}
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

export default Contact20Component;
