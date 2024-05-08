import { useState } from "react";

const defaultContactFormData = {
  Industry_Code: "",
  Industry_Name: "",
};

export const Contact11Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [warningMessage, setWarningMessage] = useState("");

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
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact11", {
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
          <h1 className="main-heading">Industry Master</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/contactus.svg" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Industry_Code">Industry Code</label>
                <input
                  type="text"
                  name="Industry_Code"
                  id="Industry_Code"
                  autoComplete="off"
                  value={contact.Industry_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Industry_Name">Industry Name</label>
                <input
                  type="text"
                  name="Industry_Name"
                  id="Industry_Name"
                  autoComplete="off"
                  value={contact.Industry_Name}
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

export default Contact11Component;
