import { useState } from "react";

const defaultContactFormData = {
  Currency_Code: "",
  Currency_Name: "",
};

export const Contact16Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);

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
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact16", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact(defaultContactFormData);
        alert('Message sent successfully');
      } else {
        alert("Message not sent");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Message not sent");
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Currency Master</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Currency_Code">Currency Code</label>
                <input
                  type="text"
                  name="Currency_Code"
                  id="Currency_Code"
                  autoComplete="off"
                  value={contact.Currency_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Currency_Name">Currency Name</label>
                <input
                  type="text"
                  name="Currency_Name"
                  id="Currency_Name"
                  autoComplete="off"
                  value={contact.Currency_Name}
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

export default Contact16Component;
