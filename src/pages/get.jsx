import React, { useEffect, useState } from "react";
import PlanVisitForm from "./PlanVisitForm";

export const AllUsersContacts = () => {
    const [contactData, setContactData] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showPlanVisitForm, setShowPlanVisitForm] = useState(false);

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

    const calculateRecommendedDate = (lastVisitedDate, visitInDays) => {
        const lastVisited = new Date(lastVisitedDate);
        const recommendedDate = new Date(lastVisited.setDate(lastVisited.getDate() + visitInDays));
        return recommendedDate.toISOString().split('T')[0];
    };

    const calculateDaysSinceVisitPending = (lastVisitedDate, visitInDays) => {
        const lastVisited = new Date(lastVisitedDate);
        const today = new Date();
        const pendingDays = Math.ceil((today - lastVisited) / (1000 * 60 * 60 * 24)) - visitInDays;
        return pendingDays;
    };

    const handlePlanVisit = (customer) => {
        setSelectedCustomer(customer);
        setShowPlanVisitForm(true);
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
                            <th>Customer Code</th> {/* Display Customer Code */}
                            <th>City Code</th>
                            <th>Visit In Days</th>
                            <th>Last Visited</th>
                            <th>Recommended Date</th>
                            <th>Days Since Visit Pending</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactData.map((contact, index) => (
                            <tr key={index}>
                                <td>{contact.Customer_Name}</td>
                                <td>{contact.Customer_Code}</td> {/* Display Customer Code */}
                                <td>{contact.City_Code}</td>
                                <td>{contact.Visit_In_Days}</td>
                                <td>{new Date(contact.Last_Visited).toLocaleDateString()}</td>
                                <td>{calculateRecommendedDate(contact.Last_Visited, contact.Visit_In_Days)}</td>
                                <td>{calculateDaysSinceVisitPending(contact.Last_Visited, contact.Visit_In_Days)}</td>
                                <td>
                                    <button onClick={() => handlePlanVisit(contact)}>
                                        Plan Visit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showPlanVisitForm && selectedCustomer && (
                <PlanVisitForm 
                    customer={selectedCustomer} 
                    onClose={() => setShowPlanVisitForm(false)} 
                />
            )}
        </section>
    );
};

export default AllUsersContacts;
