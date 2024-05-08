import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminContacts = () => {
    const [contactData, setContactData] = useState([]);
    const { authorizationToken } = useAuth();

    const getContactsData = async () => {
        try {
            const response = await fetch("https://backend-hj39.onrender.com/api/admin/contacts", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
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
    }

    useEffect(() => {
        getContactsData();
    }, []);

    return (
        <section className="admin-contacts-section">
            <div className="container">
                <h1>Admin Contact Data</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>Material</th>
                            <th>Quantity</th>
                            <th>Message</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactData.map((contact, index) => (
                            <tr key={index}>
                                <td>{contact.username}</td>
                                <td>{contact.email}</td>
                                <td>{contact.material}</td>
                                <td>{contact.quantity}</td>
                                <td>{contact.message}</td>
                                <td><button className="btn">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
