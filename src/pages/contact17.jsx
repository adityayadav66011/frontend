import { useState } from "react";

const defaultContactFormData = {
  GST_Code: "",
  GST_Name: "",
};

export const Contact17Component = () => {
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
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact17", {
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
          <h1 className="main-heading">GST Master</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="GST_Code">GST Code</label>
                <input
                  type="text"
                  name="GST_Code"
                  id="GST_Code"
                  autoComplete="off"
                  value={contact.GST_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="GST_Name">GST Name</label>
                <input
                  type="text"
                  name="GST_Name"
                  id="GST_Name"
                  autoComplete="off"
                  value={contact.GST_Name}
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

export default Contact17Component;
