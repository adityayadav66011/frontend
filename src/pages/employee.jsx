import { useState, useEffect } from "react";

const defaultFormData = {
  employeeNumber: "",
  type: "",
  name: "",
  userId: "",
  email: "",
  phone: "",
  countryCode: "",
  zoneCode: "",
  stateCode: "",
  poolCode: "",
  stationCode: "",
  cityCode: "",
  street: "",
  pincode: ""
};

export const EmployeeForm = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const response = await fetch("https://backend-hj39.onrender.com/api/form/dropdowns");
        if (response.ok) {
          const data = await response.json();
          setDropdownOptions(data);
        } else {
          console.error("Failed to fetch dropdown options:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    fetchDropdowns();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backend-hj39.onrender.com/api/form/employees", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData(defaultFormData);
        alert('Employee data submitted successfully');
      } else {
        alert("Failed to submit employee data");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      alert("Failed to submit employee data");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Employee Form</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/employee.jpg" alt="Employee" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="employeeNumber">Employee Number</label>
                <input
                  type="text"
                  name="employeeNumber"
                  id="employeeNumber"
                  autoComplete="off"
                  value={formData.employeeNumber}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="type">Type</label>
                <input
                  type="text"
                  name="type"
                  id="type"
                  autoComplete="off"
                  value={formData.type}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  value={formData.name}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="userId">User ID</label>
                <input
                  type="text"
                  name="userId"
                  id="userId"
                  autoComplete="off"
                  value={formData.userId}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={formData.email}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={formData.phone}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="countryCode">Country Code</label>
                <select
                  name="countryCode"
                  id="countryCode"
                  value={formData.countryCode}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Country Code</option>
                  {dropdownOptions.Country_Code &&
                    dropdownOptions.Country_Code.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="zoneCode">Zone Code</label>
                <select
                  name="zoneCode"
                  id="zoneCode"
                  value={formData.zoneCode}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Zone Code</option>
                  {dropdownOptions.Zone_Code &&
                    dropdownOptions.Zone_Code.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="stateCode">State Code</label>
                <select
                  name="stateCode"
                  id="stateCode"
                  value={formData.stateCode}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select State Code</option>
                  {dropdownOptions.State_Code &&
                    dropdownOptions.State_Code.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="poolCode">Pool Code</label>
                <select
                  name="poolCode"
                  id="poolCode"
                  value={formData.poolCode}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Pool Code</option>
                  {dropdownOptions.Pool_Code &&
                    dropdownOptions.Pool_Code.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="stationCode">Station Code</label>
                <select
                  name="stationCode"
                  id="stationCode"
                  value={formData.stationCode}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Station Code</option>
                  {dropdownOptions.Station_Code &&
                    dropdownOptions.Station_Code.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="cityCode">City Code</label>
                <select
                  name="cityCode"
                  id="cityCode"
                  value={formData.cityCode}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select City Code</option>
                  {dropdownOptions.City_Code &&
                    dropdownOptions.City_Code.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  autoComplete="off"
                  value={formData.street}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  id="pincode"
                  autoComplete="off"
                  value={formData.pincode}
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

export default EmployeeForm;
