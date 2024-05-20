import { useState, useEffect } from "react";

const defaultMappingFormData = {
  Crop_Code: "",
  Material_Code: "",
};

export const CropMaterialMapComponent = () => {
  const [mapping, setMapping] = useState(defaultMappingFormData);
  const [cropOptions, setCropOptions] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const cropResponse = await fetch("https://backend-hj39.onrender.com/api/crop-material-mapping/cropCodes");
        const materialResponse = await fetch("https://backend-hj39.onrender.com/api/crop-material-mapping/materialCodes");

        if (cropResponse.ok && materialResponse.ok) {
          const cropData = await cropResponse.json();
          const materialData = await materialResponse.json();

          setCropOptions(cropData);
          setMaterialOptions(materialData);
        } else {
          console.error("Failed to fetch dropdown options:", cropResponse.statusText, materialResponse.statusText);
        }
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    fetchDropdownOptions();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setMapping({
      ...mapping,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backend-hj39.onrender.com/api/crop-material-mapping", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(mapping),
      });

      if (response.ok) {
        setMapping(defaultMappingFormData);
        alert('Mapping saved successfully');
      } else {
        alert('Failed to save mapping');
      }
    } catch (error) {
      alert("Mapping not saved");
      console.error("Error saving mapping:", error);
    }
  };

  return (
    <>
      <section className="section-mapping">
        <div className="mapping-content container">
          <h1 className="main-heading">Crop Material Mapping</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="mapping-img">
            <img src="/images/mapping.jpg" alt="Description of your image" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Crop_Code">Crop Code</label>
                <select
                  name="Crop_Code"
                  id="Crop_Code"
                  value={mapping.Crop_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Crop Code</option>
                  {cropOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Material_Code">Material Code</label>
                <select
                  name="Material_Code"
                  id="Material_Code"
                  value={mapping.Material_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Material Code</option>
                  {materialOptions.map((option, index) => (
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

export default CropMaterialMapComponent;
