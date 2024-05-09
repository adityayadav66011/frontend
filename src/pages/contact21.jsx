import React, { useState, useEffect } from 'react';

const defaultContactFormData = {
  Season_Code: "",
  Season_Name: "",
};

export const Contact21Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [warningMessage, setWarningMessage] = useState("");
  const [previousSeasonCode, setPreviousSeasonCode] = useState("");

  useEffect(() => {
    fetchPreviousSeasonCode();
  }, []);

  const fetchPreviousSeasonCode = async () => {
    try {
      const response = await fetch('https://backend-hj39.onrender.com/api/form/previousSeasonCode');
      if (response.status === 200) {
        const { previousSeasonCode } = await response.json();
        setPreviousSeasonCode(previousSeasonCode);
      }
    } catch (error) {
      console.error('Error fetching previous Season Code:', error);
    }
  };

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
      const response = await fetch('https://backend-hj39.onrender.com/api/form/contact21', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact(defaultContactFormData);
        alert('Message sent successfully');
      }
    } catch (error) {
      alert('Message not sent');
      console.log(error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Season </h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/contact21.svg" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Season_Code">Season Code</label>
                <input
                  type="text"
                  name="Season_Code"
                  id="Season_Code"
                  autoComplete="off"
                  value={previousSeasonCode}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="Season_Name">Season Name</label>
                <input
                  type="text"
                  name="Season_Name"
                  id="Season_Name"
                  autoComplete="off"
                  value={contact.Season_Name}
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

export default Contact21Component;
