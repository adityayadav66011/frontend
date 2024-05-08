import { useState, useEffect } from "react";

const defaultContactFormData = {
  Role_Code: "",
  Role_Name: "",
};

export const Contact13Component = () => {
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
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact13", {
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
          <h1 className="main-heading">Role Master</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/contact6.svg" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Role_Code">Role Code</label>
                <input
                  type="text"
                  name="Role_Code"
                  id="Role_Code"
                  autoComplete="off"
                  value={contact.Role_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Role_Name">Role Name</label>
                <input
                  type="text"
                  name="Role_Name"
                  id="Role_Name"
                  autoComplete="off"
                  value={contact.Role_Name}
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

export default Contact13Component;
