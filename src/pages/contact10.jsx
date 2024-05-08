import { useState, useEffect } from "react";

const defaultContactFormData = {
  Company_Code: "",
  Branch_Code: "",
  Function_Code: "",
  Function_Name: "",
};

export const Contact10Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    const fetchCompanyCodes = async () => {
      try {
        const response = await fetch("https://backend-hj39.onrender.com/api/form/companyCodes");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const uniqueCompanyCodes = [...new Set(data.map((option) => option.Company_Code))];
            setCompanyOptions(uniqueCompanyCodes);
          } else {
            console.error("Invalid data received from server:", data);
          }
        } else {
          console.error("Failed to fetch company codes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching company codes:", error);
      }
    };

    const fetchBranchCodes = async () => {
      try {
        const response = await fetch("https://backend-hj39.onrender.com/api/form/branchCodes");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const uniqueBranchCodes = [...new Set(data.map((option) => option.Branch_Code))];
            setBranchOptions(uniqueBranchCodes);
          } else {
            console.error("Invalid data received from server:", data);
          }
        } else {
          console.error("Failed to fetch branch codes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching branch codes:", error);
      }
    };

    fetchCompanyCodes();
    fetchBranchCodes();
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
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact10", {
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
          <h1 className="main-heading">Function Master</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Company_Code">Company Code</label>
                <select
                  name="Company_Code"
                  id="Company_Code"
                  value={contact.Company_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Company Code</option>
                  {companyOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Branch_Code">Branch Code</label>
                <select
                  name="Branch_Code"
                  id="Branch_Code"
                  value={contact.Branch_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Branch Code</option>
                  {branchOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
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
                <label htmlFor="Function_Name">Function Name</label>
                <input
                  type="text"
                  name="Function_Name"
                  id="Function_Name"
                  autoComplete="off"
                  value={contact.Function_Name}
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

export default Contact10Component;
