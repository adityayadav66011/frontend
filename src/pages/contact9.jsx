import { useState } from "react";

const defaultContactFormData = {
  Functional_Level_Code: "",
  Functional_Level_Name: "",
};

export const Contact9Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [warningMessage, setWarningMessage] = useState("");

  const handleInput = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    // Perform validation based on the input field name
    if (name === "Functional_Level_Code" && value.length > 10) {
      setWarningMessage("Functional Level Code should not exceed 10 characters");
      value = value.slice(0, 10); // Limit the input to 10 characters
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
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact9", {
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
          <h1 className="main-heading">Functional Level Master</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/contactus.svg" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Functional_Level_Code">Functional Level Code</label>
                <input
                  type="text"
                  name="Functional_Level_Code"
                  id="Functional_Level_Code"
                  autoComplete="off"
                  value={contact.Functional_Level_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Functional_Level_Name">Functional Level Name</label>
                <input
                  type="text"
                  name="Functional_Level_Name"
                  id="Functional_Level_Name"
                  autoComplete="off"
                  value={contact.Functional_Level_Name}
                  onChange={handleInput}
                  required
                />
              </div>
              {warningMessage && <p className="warning">{warningMessage}</p>}
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

export default Contact9Component;
