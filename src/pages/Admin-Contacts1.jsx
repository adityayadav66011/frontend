import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminContact1 = () => {
    const [contact1Data, setContact1Data] = useState([]);
    const { authorizationToken } = useAuth();

    const getContact1Data = async () => {
        try {
            const response = await fetch("https://backend-hj39.onrender.com/api/admin/contact1", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setContact1Data(data);
            } else {
                console.error("Failed to fetch contact1 data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching contact1 data:", error);
        }
    }

    useEffect(() => {
        getContact1Data();
    }, []);

    return (
        <section className="admin-contact1-section">
            <div className="container">
                <h1>Admin Contact1 Data</h1>
            </div>
            <div className="container admin-contact1">
                <table>
                    <thead>
                        <tr>
                            <th>Country Code</th>
                            <th>Country Name</th>
                            <th>Postal Code</th>
                            <th>ISO Code</th>
                            <th>ISO Code 3 Char</th>
                            <th>EU Country</th>
                            <th>Country Shortname</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contact1Data.map((contact1, index) => (
                            <tr key={index}>
                                <td>{contact1.Country_Code}</td>
                                <td>{contact1.Country_Name}</td>
                                <td>{contact1.Postal_Code}</td>
                                <td>{contact1.Iso_Code}</td>
                                <td>{contact1.Iso_Code_3char}</td>
                                <td>{contact1.Eu_Country}</td>
                                <td>{contact1.Country_Shortname}</td>
                                <td><button className="btn">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
