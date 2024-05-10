import React, { useState } from 'react';

const defaultContactFormData = {
  paymentTermCode: "",
  paymentTermName: "",
  paymentTermDays: "",
};

export const Contact23Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact23", {
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
          <h1 className="main-heading">Payment Term</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/payment.svg" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="paymentTermCode">Payment Term Code</label>
                <input
                  type="text"
                  name="paymentTermCode"
                  id="paymentTermCode"
                  autoComplete="off"
                  value={contact.paymentTermCode}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="paymentTermName">Payment Term Name</label>
                <input
                  type="text"
                  name="paymentTermName"
                  id="paymentTermName"
                  autoComplete="off"
                  value={contact.paymentTermName}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="paymentTermDays">Payment Term Days</label>
                <input
                  type="text"
                  name="paymentTermDays"
                  id="paymentTermDays"
                  autoComplete="off"
                  value={contact.paymentTermDays}
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

export default Contact23Component;
