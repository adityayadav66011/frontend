import React, { useState, useEffect } from 'react';

const defaultContactFormData = {
  materialCode: "",
  materialType: "",
  materialName: "",
};

export const Contact22Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [warningMessage, setWarningMessage] = useState("");
  const [previousMaterialCode, setPreviousMaterialCode] = useState("");
  
  useEffect(() => {
    fetchPreviousMaterialCode();
  }, []);

  const fetchPreviousMaterialCode = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/form/previousMaterialCode');
      if (response.status === 200) {
        const { previousMaterialCode } = await response.json();
        setPreviousMaterialCode(previousMaterialCode);
      }
    } catch (error) {
      console.error('Error fetching previous Material Code:', error);
    }
  };

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
      const response = await fetch('http://localhost:4000/api/form/contact22', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact(defaultContactFormData);
        alert('Material submitted successfully');
      }
    } catch (error) {
      alert('Material not submitted');
      console.log(error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Material</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/contact22.svg" alt="Material Image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="materialCode">Material Code</label>
                <input
                  type="text"
                  name="materialCode"
                  id="materialCode"
                  autoComplete="off"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Material Type</label>
                <div>
                  <input
                    type="radio"
                    id="pesticides"
                    name="materialType"
                    value="pesticides"
                    checked={contact.materialType === 'pesticides'}
                    onChange={handleInput}
                  />
                  <label htmlFor="pesticides">Pesticides</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="fertilizers"
                    name="materialType"
                    value="fertilizers"
                    checked={contact.materialType === 'fertilizers'}
                    onChange={handleInput}
                  />
                  <label htmlFor="fertilizers">Fertilizers</label>
                </div>
              </div>
              <div>
                <label htmlFor="materialName">Material Name</label>
                <input
                  type="text"
                  name="materialName"
                  id="materialName"
                  autoComplete="off"
                  value={contact.materialName}
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

export default Contact22Component;
