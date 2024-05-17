import React, { useEffect, useState } from "react";

export const AllUsersContacts = () => {
    const [contactData, setContactData] = useState([]);

    const getContactsData = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/contact24Data/filteredData", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setContactData(data);
            } else {
                console.error("Failed to fetch contacts:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    useEffect(() => {
        getContactsData();
    }, []);

    const handlePlanVisit = (customerId) => {
        // Implement logic to handle planning a visit for the selected customer
        console.log("Planning visit for customer with ID:", customerId);
    };

    return (
        <section className="admin-users-section">
            <div className="container">
                <h1>All Users Contact Data</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>City Code</th>
                            <th>Visit In Days</th>
                            <th>Last Visited</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactData.map((contact, index) => (
                            <tr key={index}>
                                <td>{contact.Customer_Name}</td>
                                <td>{contact.City_Code}</td>
                                <td>{contact.Visit_In_Days}</td>
                                <td>{new Date(contact.Last_Visited).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handlePlanVisit(contact.Customer_ID)}>
                                        Plan Visit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AllUsersContacts;
