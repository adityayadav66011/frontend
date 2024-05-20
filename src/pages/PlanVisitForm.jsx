import React, { useState, useEffect } from "react";

const PlanVisitForm = ({ customer, onClose }) => {
    const [formData, setFormData] = useState({
        Customer_Code: customer.Customer_Code,
        Last_Visited_Date: customer.Last_Visited,
        Recommended_Date: "",
        Days_Since_Visit_Pending: "",
        Planned_Date: "",
        Planned_Time: "",
        Remarks: ""
    });

    useEffect(() => {
        // Calculate Recommended Date and Days Since Visit Pending
        const lastVisitedDate = new Date(customer.Last_Visited);
        const visitInDays = customer.Visit_In_Days;
        const recommendedDate = new Date(lastVisitedDate.setDate(lastVisitedDate.getDate() + visitInDays)).toISOString().split('T')[0];
        const today = new Date();
        const daysSinceVisitPending = Math.ceil((today - new Date(customer.Last_Visited)) / (1000 * 60 * 60 * 24)) - visitInDays;

        setFormData({
            ...formData,
            Recommended_Date: recommendedDate,
            Days_Since_Visit_Pending: daysSinceVisitPending
        });
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Concatenate planned date and time before submission
        const formattedPlannedDateTime = `${formData.Planned_Date} ${formData.Planned_Time}`;
        try {
            const response = await fetch("https://backend-hj39.onrender.com/api/plan-visit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    Planned_Date: formattedPlannedDateTime, // Update planned date with concatenated value
                    Planned_Time: formattedPlannedDateTime  // Also send the same concatenated value as planned time
                })
            });
            if (response.ok) {
                window.alert("Form submitted successfully!");
                console.log("Plan visit created successfully");
                onClose(); // Close the form after successful submission
            } else {
                window.alert("Failed to submit the form. Please try again.");
                console.error("Failed to create plan visit:", response.statusText);
            }
        } catch (error) {
            window.alert("Error submitting the form. Please try again.");
            console.error("Error creating plan visit:", error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Plan Visit for {customer.Customer_Name}</h2>
                <form onSubmit={handleSubmit}>
                    {/* Existing customer data */}
                    <p>Customer Code: {customer.Customer_Code}</p>
                    <p>City Code: {customer.City_Code}</p>
                    <p>Visit In Days: {customer.Visit_In_Days}</p>
                    <p>Last Visited: {new Date(customer.Last_Visited).toLocaleDateString()}</p>
                    <p>Recommended Date: {formData.Recommended_Date}</p>
                    <p>Days Since Visit Pending: {formData.Days_Since_Visit_Pending}</p>
                    
                    {/* New form fields */}
                    <label>
                        Planned Date:
                        <input
                            type="date"
                            name="Planned_Date"
                            value={formData.Planned_Date}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Planned Time:
                        <input
                            type="time"
                            name="Planned_Time"
                            value={formData.Planned_Time}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Remarks:
                        <textarea
                            name="Remarks"
                            value={formData.Remarks}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default PlanVisitForm;
