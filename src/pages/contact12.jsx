import { useState, useEffect } from "react";

const defaultContactFormData = {
  User_Id: "",
  Company_Code: "",
  Branch_Code: "",
  Function_Codes: [],
  Employee_Code: "",
  Employee_Name: "",
  Emp_Mobile_No: "",
  Emp_Mail_Id: "",
  Functional_Level_Code: "",
  Admin_Rpt_Manager_Code: "",
  Function_Rpt_Manager_Code: "",
};

export const Contact12Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [functionOptions, setFunctionOptions] = useState([]);
  const [functionalLevelOptions, setFunctionalLevelOptions] = useState([]);
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

    const fetchFunctionCodes = async () => {
      try {
        const response = await fetch("https://backend-hj39.onrender.com/api/form/functionCodes");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const uniqueFunctionCodes = [...new Set(data.map((option) => option.Function_Code))];
            setFunctionOptions(uniqueFunctionCodes);
          } else {
            console.error("Invalid data received from server:", data);
          }
        } else {
          console.error("Failed to fetch function codes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching function codes:", error);
      }
    };

    const fetchFunctionalLevelCodes = async () => {
      try {
        const response = await fetch("https://backend-hj39.onrender.com/api/form/functionalLevelCodes");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const uniqueFunctionalLevelCodes = [...new Set(data.map((option) => option.Functional_Level_Code))];
            setFunctionalLevelOptions(uniqueFunctionalLevelCodes);
          } else {
            console.error("Invalid data received from server:", data);
          }
        } else {
          console.error("Failed to fetch functional level codes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching functional level codes:", error);
      }
    };

    fetchCompanyCodes();
    fetchBranchCodes();
    fetchFunctionCodes();
    fetchFunctionalLevelCodes();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "Function_Codes") {
      const isChecked = e.target.checked;
      const code = e.target.value;

      if (isChecked) {
        setContact({
          ...contact,
          [name]: [...contact.Function_Codes, code],
        });
      } else {
        setContact({
          ...contact,
          [name]: contact.Function_Codes.filter((funcCode) => funcCode !== code),
        });
      }
    } else {
      setContact({
        ...contact,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact12", {
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
          <h1 className="main-heading">Contact Form 12</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="User_Id">User ID</label>
                <input
                  type="text"
                  name="User_Id"
                  id="User_Id"
                  autoComplete="off"
                  value={contact.User_Id}
                  onChange={handleInput}
                  required
                />
              </div>
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
                <label>Function Codes</label>
                {functionOptions.map((option, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="checkbox"
                        name="Function_Codes"
                        value={option}
                        checked={contact.Function_Codes.includes(option)}
                        onChange={handleInput}
                      />
                      {option}
                    </label>
                  </div>
                ))}
              </div>
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
                <label htmlFor="Emp_Mobile_No">Employee Mobile No.</label>
                <input
                  type="text"
                  name="Emp_Mobile_No"
                  id="Emp_Mobile_No"
                  autoComplete="off"
                  value={contact.Emp_Mobile_No}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="Emp_Mail_Id">Employee Mail ID</label>
                <input
                  type="email"
                  name="Emp_Mail_Id"
                  id="Emp_Mail_Id"
                  autoComplete="off"
                  value={contact.Emp_Mail_Id}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="Functional_Level_Code">Functional Level Code</label>
                <select
                  name="Functional_Level_Code"
                  id="Functional_Level_Code"
                  value={contact.Functional_Level_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Functional Level Code</option>
                  {functionalLevelOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Admin_Rpt_Manager_Code">Admin Reporting Manager Code</label>
                <input
                  type="text"
                  name="Admin_Rpt_Manager_Code"
                  id="Admin_Rpt_Manager_Code"
                  autoComplete="off"
                  value={contact.Admin_Rpt_Manager_Code}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label htmlFor="Function_Rpt_Manager_Code">Function Reporting Manager Code</label>
                <input
                  type="text"
                  name="Function_Rpt_Manager_Code"
                  id="Function_Rpt_Manager_Code"
                  autoComplete="off"
                  value={contact.Function_Rpt_Manager_Code}
                  onChange={handleInput}
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

export default Contact12Component;
