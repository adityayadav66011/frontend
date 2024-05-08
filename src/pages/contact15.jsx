import { useState, useEffect } from "react";

const defaultContactFormData = {
  Company_Code: "",
  Branch_Code: "",
  Appl_Code: "",
  Appl_Name: "",
  Module_Code: "",
  Module_Name: "",
  Submodule_Code: "",
  Submodule_Name: "",
  Process_Code: "",
  Process_Name: "",
  Function_Codes: [],
  Function_Names: [],
};

export const Contact15Component = () => {
  const [contact, setContact] = useState(defaultContactFormData);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [functionOptions, setFunctionOptions] = useState([]);
  const [functionNameOptions, setFunctionNameOptions] = useState([]);
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

    const fetchFunctionNames = async () => {
      try {
        const response = await fetch("https://backend-hj39.onrender.com/api/form/functionNames");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const uniqueFunctionNames = [...new Set(data.map((option) => option.Function_Name))];
            setFunctionNameOptions(uniqueFunctionNames);
          } else {
            console.error("Invalid data received from server:", data);
          }
        } else {
          console.error("Failed to fetch function names:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching function names:", error);
      }
    };

    fetchCompanyCodes();
    fetchBranchCodes();
    fetchFunctionCodes();
    fetchFunctionNames();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "Function_Codes" || name === "Function_Names") {
      const isChecked = e.target.checked;
      const code = e.target.value;

      if (isChecked) {
        setContact({
          ...contact,
          [name]: [...contact[name], code],
        });
      } else {
        setContact({
          ...contact,
          [name]: contact[name].filter((funcCode) => funcCode !== code),
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
      const response = await fetch("https://backend-hj39.onrender.com/api/form/Contact15", {
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
          <h1 className="main-heading">Application Master</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/front.jpg" alt="Description of your image" />
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
                <label htmlFor="Appl_Code">Appl Code</label>
                <input
                  type="text"
                  name="Appl_Code"
                  id="Appl_Code"
                  autoComplete="off"
                  value={contact.Appl_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Appl_Name">Appl Name</label>
                <input
                  type="text"
                  name="Appl_Name"
                  id="Appl_Name"
                  autoComplete="off"
                  value={contact.Appl_Name}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Module_Code">Module Code</label>
                <input
                  type="text"
                  name="Module_Code"
                  id="Module_Code"
                  autoComplete="off"
                  value={contact.Module_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Module_Name">Module Name</label>
                <input
                  type="text"
                  name="Module_Name"
                  id="Module_Name"
                  autoComplete="off"
                  value={contact.Module_Name}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Submodule_Code">Submodule Code</label>
                <input
                  type="text"
                  name="Submodule_Code"
                  id="Submodule_Code"
                  autoComplete="off"
                  value={contact.Submodule_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Submodule_Name">Submodule Name</label>
                <input
                  type="text"
                  name="Submodule_Name"
                  id="Submodule_Name"
                  autoComplete="off"
                  value={contact.Submodule_Name}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Process_Code">Process Code</label>
                <input
                  type="text"
                  name="Process_Code"
                  id="Process_Code"
                  autoComplete="off"
                  value={contact.Process_Code}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="Process_Name">Process Name</label>
                <input
                  type="text"
                  name="Process_Name"
                  id="Process_Name"
                  autoComplete="off"
                  value={contact.Process_Name}
                  onChange={handleInput}
                  required
                />
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
                <label>Function Names</label>
                {functionNameOptions.map((option, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="checkbox"
                        name="Function_Names"
                        value={option}
                        checked={contact.Function_Names.includes(option)}
                        onChange={handleInput}
                      />
                      {option}
                    </label>
                  </div>
                ))}
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

export default Contact15Component;
