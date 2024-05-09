import React, { useState, useEffect } from "react";

const defaultContactFormData = {
  Crop_Code: "", // Added Crop_Code field
  Crop_Name: "",
  Crop_Type1: "",
  Crop_Type2: "",
  Crop_Type3: "",
  Crop_Grade: "",
  Crop_Quality: "",
};

export const Contact18Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [lastCropCode, setLastCropCode] = useState("");

  useEffect(() => {
    // Fetch the last used crop code and update the form
    fetchLastCropCode();
  }, []);

  const fetchLastCropCode = async () => {
    try {
      const response = await fetch("https://backend-hj39.onrender.com/api/cropCodes");
      if (response.ok) {
        const data = await response.json();
        const lastCropCode = data.lastCropCode;
        const newCropCode = generateNextCropCode(lastCropCode);
        setLastCropCode(newCropCode); // Update the state with the new crop code
      }
    } catch (error) {
      console.error("Error fetching last crop code:", error);
    }
  };

  const generateNextCropCode = (lastCropCode) => {
    // Extract the numeric part of the last crop code and increment it
    const numericPart = parseInt(lastCropCode.substr(2));
    const nextNumericPart = numericPart + 1;
    const formattedNextNumericPart = nextNumericPart.toString().padStart(4, "0");
    return `CR${formattedNextNumericPart}`;
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
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact18", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact(defaultContactFormData);
        alert("Message sent successfully");
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
          <h1 className="main-heading">Crop Master</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/crop.png" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Crop_Code">Crop Code</label>
                <input
                  type="text"
                  name="Crop_Code"
                  id="Crop_Code"
                  autoComplete="off"
                  value={lastCropCode} // Display the last crop code here
                  readOnly // Make the field uneditable
                  required
                />
              </div>
              <div>
                <label htmlFor="Crop_Name">Crop Name</label>
                <input
                  type="text"
                  name="Crop_Name"
                  id="Crop_Name"
                  autoComplete="off"
                  value={contact.Crop_Name}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Crop_Type1">Crop Type 1</label>
                <input
                  type="text"
                  name="Crop_Type1"
                  id="Crop_Type1"
                  autoComplete="off"
                  value={contact.Crop_Type1}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Crop_Type2">Crop Type 2</label>
                <input
                  type="text"
                  name="Crop_Type2"
                  id="Crop_Type2"
                  autoComplete="off"
                  value={contact.Crop_Type2}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Crop_Type3">Crop Type 3</label>
                <input
                  type="text"
                  name="Crop_Type3"
                  id="Crop_Type3"
                  autoComplete="off"
                  value={contact.Crop_Type3}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Crop_Grade">Crop Grade</label>
                <input
                  type="text"
                  name="Crop_Grade"
                  id="Crop_Grade"
                  autoComplete="off"
                  value={contact.Crop_Grade}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Crop_Quality">Crop Quality</label>
                <input
                  type="text"
                  name="Crop_Quality"
                  id="Crop_Quality"
                  autoComplete="off"
                  value={contact.Crop_Quality}
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

export default Contact18Component;
