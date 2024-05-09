import React, { useState, useEffect } from "react";

const defaultContactFormData = {
  Crop_Name: "",
  Crop_Type1: "",
  Crop_Type2: "",
  Crop_Type3: "",
  Crop_Grade: "",
  Crop_Quality: "",
  Crop_Lot_Number: "",
  Date_Of_Reaping: "",
};

export const Contact19Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [cropNameOptions, setCropNameOptions] = useState([]);
  const [cropType1Options, setCropType1Options] = useState([]);
  const [cropType2Options, setCropType2Options] = useState([]);
  const [cropType3Options, setCropType3Options] = useState([]);
  const [cropGradeOptions, setCropGradeOptions] = useState([]);
  const [cropQualityOptions, setCropQualityOptions] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    const fetchCropNameOptions = async () => {
      try {
        const response = await fetch("https://backend-hj39.onrender.com/api/form/cropNames");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const uniqueCropNames = [...new Set(data.map((option) => option.Crop_Name))];
            setCropNameOptions(uniqueCropNames);
          } else {
            console.error("Invalid data received from server:", data);
          }
        } else {
          console.error("Failed to fetch crop names:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching crop names:", error);
      }
    };

    const fetchCropType1Options = async () => {
        try {
          const response = await fetch("https://backend-hj39.onrender.com/api/form/cropTypes1");
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
              const uniqueCropType1 = [...new Set(data.map((option) => option.Crop_Type1))];
              setCropType1Options(uniqueCropType1);
            } else {
              console.error("Invalid data received from server:", data);
            }
          } else {
            console.error("Failed to fetch crop type 1:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching crop type 1:", error);
        }
      };

      const fetchCropType2Options = async () => {
        try {
          const response = await fetch("https://backend-hj39.onrender.com/api/form/cropTypes2");
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
              const uniqueCropType2 = [...new Set(data.map((option) => option.Crop_Type2))];
              setCropType2Options(uniqueCropType2);
            } else {
              console.error("Invalid data received from server:", data);
            }
          } else {
            console.error("Failed to fetch crop type 1:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching crop type 1:", error);
        }
      };

      const fetchCropType3Options = async () => {
        try {
          const response = await fetch("https://backend-hj39.onrender.com/api/form/cropTypes3");
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
              const uniqueCropType3 = [...new Set(data.map((option) => option.Crop_Type3))];
              setCropType3Options(uniqueCropType3);
            } else {
              console.error("Invalid data received from server:", data);
            }
          } else {
            console.error("Failed to fetch crop type 3:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching crop type 3:", error);
        }
      };

      const fetchCropGradeOptions = async () => {
        try {
          const response = await fetch("https://backend-hj39.onrender.com/api/form/cropGrades");
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
              const uniqueCropGrades = [...new Set(data.map((option) => option.Crop_Grade))];
              setCropGradeOptions(uniqueCropGrades);
            } else {
              console.error("Invalid data received from server:", data);
            }
          } else {
            console.error("Failed to fetch crop grades:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching crop grades:", error);
        }
      };

      const fetchCropQualityOptions = async () => {
        try {
          const response = await fetch("https://backend-hj39.onrender.com/api/form/cropQualities");
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
              const uniqueCropQualities = [...new Set(data.map((option) => option.Crop_Quality))];
              setCropQualityOptions(uniqueCropQualities);
            } else {
              console.error("Invalid data received from server:", data);
            }
          } else {
            console.error("Failed to fetch crop qualities:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching crop qualities:", error);
        }
      };
      
      
      


    // Fetch other dropdown options here
    fetchCropType1Options();
    fetchCropNameOptions();
    fetchCropType2Options();
    fetchCropType3Options();
    fetchCropGradeOptions();
    fetchCropQualityOptions();
  }, []);

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
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact19", {
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
          <h1 className="main-heading">Crop Lot Master</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/crop.png" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Crop_Name">Crop Name</label>
                <select
                  name="Crop_Name"
                  id="Crop_Name"
                  value={contact.Crop_Name}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Crop Name</option>
                  {cropNameOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Crop_Type1">Crop Type 1</label>
                <select
                  name="Crop_Type1"
                  id="Crop_Type1"
                  value={contact.Crop_Type1}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Crop Type 1</option>
                  {cropType1Options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Crop_Type2">Crop Type 2</label>
                <select
                  name="Crop_Type2"
                  id="Crop_Type2"
                  value={contact.Crop_Type2}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Crop Type 2</option>
                  {cropType2Options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Crop_Type3">Crop Type 3</label>
                <select
                  name="Crop_Type3"
                  id="Crop_Type3"
                  value={contact.Crop_Type3}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Crop Type 3</option>
                  {cropType3Options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Crop_Grade">Crop Grade</label>
                <select
                  name="Crop_Grade"
                  id="Crop_Grade"
                  value={contact.Crop_Grade}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Crop Grade</option>
                  {cropGradeOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Crop_Quality">Crop Quality</label>
                <select
                  name="Crop_Quality"
                  id="Crop_Quality"
                  value={contact.Crop_Quality}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Crop Quality</option>
                  {cropQualityOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Crop_Lot_Number">Crop Lot Number</label>
                <input
                  type="text"
                  name="Crop_Lot_Number"
                  id="Crop_Lot_Number"
                  autoComplete="off"
                  value={contact.Crop_Lot_Number}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Date_Of_Reaping">Date of Reaping</label>
                <input
                  type="date"
                  name="Date_Of_Reaping"
                  id="Date_Of_Reaping"
                  value={contact.Date_Of_Reaping}
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

export default Contact19Component;
