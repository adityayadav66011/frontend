import { useState, useEffect } from "react";

const defaultContactFormData = {
  Employee_Code: "",
  Employee_Name: "",
  Company_Code: "",
  Branch_Code: "",
  Function_Code: "",
  Role_Code: "",
  Role_Name: "",
};

export const Contact14Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [roleCodeOptions, setRoleCodeOptions] = useState([]);
  const [roleNameOptions, setRoleNameOptions] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    const fetchRoleCodes = async () => {
      try {
        const response = await fetch("https://backend-hj39.onrender.com/api/form/roleCodes");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const uniqueRoleCodes = [...new Set(data.map((option) => option.Role_Code))];
            setRoleCodeOptions(uniqueRoleCodes);
          } else {
            console.error("Invalid data received from server:", data);
          }
        } else {
          console.error("Failed to fetch role codes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching role codes:", error);
      }
    };

    const fetchRoleNames = async () => {
      try {
        const response = await fetch("https://backend-hj39.onrender.com/api/form/roleNames");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const uniqueRoleNames = [...new Set(data.map((option) => option.Role_Name))];
            setRoleNameOptions(uniqueRoleNames);
          } else {
            console.error("Invalid data received from server:", data);
          }
        } else {
          console.error("Failed to fetch role names:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching role names:", error);
      }
    };

    fetchRoleCodes();
    fetchRoleNames();
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
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact14", {
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
          <h1 className="main-heading">User Role Combination</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/contact2.svg" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Employee_Code">Employee Code</label>
                <input
                  type="text"
                  name="Employee_Code"
                  id="Employee_Code"
                  autoComplete="off"
                  value={contact.Employee_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Employee_Name">Employee Name</label>
                <input
                  type="text"
                  name="Employee_Name"
                  id="Employee_Name"
                  autoComplete="off"
                  value={contact.Employee_Name}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Company_Code">Company Code</label>
                <input
                  type="text"
                  name="Company_Code"
                  id="Company_Code"
                  autoComplete="off"
                  value={contact.Company_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Branch_Code">Branch Code</label>
                <input
                  type="text"
                  name="Branch_Code"
                  id="Branch_Code"
                  autoComplete="off"
                  value={contact.Branch_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Function_Code">Function Code</label>
                <input
                  type="text"
                  name="Function_Code"
                  id="Function_Code"
                  autoComplete="off"
                  value={contact.Function_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Role_Code">Role Code</label>
                <select
                  name="Role_Code"
                  id="Role_Code"
                  value={contact.Role_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Role Code</option>
                  {roleCodeOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Role_Name">Role Name</label>
                <select
                  name="Role_Name"
                  id="Role_Name"
                  value={contact.Role_Name}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Role Name</option>
                  {roleNameOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
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

export default Contact14Component;
