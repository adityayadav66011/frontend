import { useState, useEffect } from "react";

const defaultMappingFormData = {
  Crop_Code: "",
  Season_Code: "",
  Soil_Code: ""
};

export const CropSoilSeasonMappingComponent = () => {
  const [mapping, setMapping] = useState(defaultMappingFormData);
  const [cropOptions, setCropOptions] = useState([]);
  const [seasonOptions, setSeasonOptions] = useState([]);
  const [soilOptions, setSoilOptions] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const cropResponse = await fetch('http://localhost:4000/api/form/cropCodes');
        const seasonResponse = await fetch('https://backend-hj39.onrender.com/api/form/seasonCodes');
        const soilResponse = await fetch('https://backend-hj39.onrender.com/api/form/soilCodes');

        const cropData = await cropResponse.json();
        const seasonData = await seasonResponse.json();
        const soilData = await soilResponse.json();

        if (Array.isArray(cropData)) {
          setCropOptions(cropData.map(option => option.Crop_Code));
        }
        if (Array.isArray(seasonData)) {
          setSeasonOptions(seasonData.map(option => option.Season_Code));
        }
        if (Array.isArray(soilData)) {
          setSoilOptions(soilData.map(option => option.Soil_Code));
        }
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    fetchDropdownOptions();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setMapping({
      ...mapping,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backend-hj39.onrender.com/api/crop-soil-season-mapping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mapping)
      });

      if (response.ok) {
        setMapping(defaultMappingFormData);
        alert('Mapping saved successfully');
      }
    } catch (error) {
      alert("Failed to save mapping");
      console.error(error);
    }
  };

  return (
    <>
      <section className="section-mapping">
        <div className="contact-content container">
          <h1 className="main-heading">Crop-Soil-Season Mapping</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/mapping.jpg" alt="Mapping" />
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
                  <option value="">Select Crop</option>
                  {cropOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Season_Code">Season Code</label>
                <select
                  name="Season_Code"
                  id="Season_Code"
                  value={mapping.Season_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Season</option>
                  {seasonOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="Soil_Code">Soil Code</label>
                <select
                  name="Soil_Code"
                  id="Soil_Code"
                  value={mapping.Soil_Code}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Soil</option>
                  {soilOptions.map((option, index) => (
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
