import { useState } from "react";
import { useAuth } from "../store/auth";


const defaultContactFormData={
  Country_Code: "",
  Country_Name: "",
  Postal_Code:"",
  Iso_Code:"",
  Iso_Code_3char:"",
  Eu_Country: "",
  Country_Shortname: "",
};

export const Contact1Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);

  // lets tackle our handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backend-hj39.onrender.com/api/form/contact1", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact(defaultContactFormData);
        const data = await response.json();
        console.log(data);
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
          <h1 className="main-heading">Country Master</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="We are always ready to help" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Country_Code">Country Code</label>
                <input
                  type="text"
                  name="Country_Code"
                  id="Country_Code"
                  autoComplete="off"
                  value={contact.Country_Code}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="Country_Name">Country Name</label>
                <input
                  type="text"
                  name="Country_Name"
                  id="Country_Name"
                  autoComplete="off"
                  value={contact.Country_Name}
                  onChange={handleInput}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="Postal_Code">Postal Code</label>
                <input
                  type="text"
                  name="Postal_Code"
                  id="Postal_Code"
                  autoComplete="off"
                  value={contact.Postal_Code}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="Iso_Code">ISO Code</label>
                <input
                  type="text"
                  name="Iso_Code"
                  id="Iso_Code"
                  autoComplete="off"
                  value={contact.Iso_Code}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="Iso_Code_3char">ISO Code 3 Char</label>
                <input
                  type="text"
                  name="Iso_Code_3char"
                  id="Iso_Code_3char"
                  autoComplete="off"
                  value={contact.Iso_Code_3char}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="Eu_Country">EU Country</label>
                <input
                  type="text"
                  name="Eu_Country"
                  id="Eu_Country"
                  autoComplete="off"
                  value={contact.Eu_Country}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="Country_Shortname">Country Shortname</label>
                <input
                  type="text"
                  name="Country_Shortname"
                  id="Country_Shortname"
                  autoComplete="off"
                  value={contact.Country_Shortname}
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
        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.91411937501422!3d18.562253982539413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1697604225432!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};

