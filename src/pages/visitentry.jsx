import React, { useState, useEffect } from 'react';
import VisitDetail from './visitdetail';

export const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatDateTime = (dateTime) => {
  const d = new Date(dateTime);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const DataDisplay = () => {
  const [contactData, setContactData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const data = [
      {
        Customer_Name: 'XYZ Enterprises',
        Customer_Code: 'CC0002',
        City_Code: 'CC002',
        Last_Visited: '2024-01-01',
        Visit_In_Days: 30,
        Planned_Date: '2024-02-31',
        Planned_Time: '2024-02-31 19:38',
        Remarks: 'this is a remark'
      },
      {
        Customer_Name: 'ABC Corp',
        Customer_Code: 'CC0003',
        City_Code: 'CC003',
        Last_Visited: '2024-01-02',
        Visit_In_Days: 45,
        Planned_Date: '2024-03-16',
        Planned_Time: '2024-03-16 14:30',
        Remarks: 'this is a remark for ABC Corp'
      },
      {
        Customer_Name: 'DEF Ltd',
        Customer_Code: 'CC0004',
        City_Code: 'CC004',
        Last_Visited: '2024-01-03',
        Visit_In_Days: 60,
        Planned_Date: '2024-04-03',
        Planned_Time: '2024-04-03 09:15',
        Remarks: 'this is a remark for DEF Ltd'
      },
      {
        Customer_Name: 'GHI Inc',
        Customer_Code: 'CC0005',
        City_Code: 'CC005',
        Last_Visited: '2024-01-04',
        Visit_In_Days: 90,
        Planned_Date: '2024-05-03',
        Planned_Time: '2024-05-03 11:00',
        Remarks: 'this is a remark for GHI Inc'
      },
      {
        Customer_Name: 'JKL Co',
        Customer_Code: 'CC0006',
        City_Code: 'CC006',
        Last_Visited: '2024-01-05',
        Visit_In_Days: 120,
        Planned_Date: '2024-06-04',
        Planned_Time: '2024-06-04 16:45',
        Remarks: 'this is a remark for JKL Co'
      },
      {
        Customer_Name: 'MNO Group',
        Customer_Code: 'CC0007',
        City_Code: 'CC007',
        Last_Visited: '2024-01-06',
        Visit_In_Days: 150,
        Planned_Date: '2024-07-05',
        Planned_Time: '2024-07-05 10:00',
        Remarks: 'this is a remark for MNO Group'
      },
    ];

    const today = new Date();

    const updatedData = data.map(contact => {
      const lastVisitedDate = new Date(contact.Last_Visited);
      const recommendedDate = new Date(lastVisitedDate);
      recommendedDate.setDate(lastVisitedDate.getDate() + contact.Visit_In_Days);
      
      const daysSinceVisitPending = Math.ceil((today - recommendedDate) / (1000 * 60 * 60 * 24));

      return {
        ...contact,
        Recommended_Date: formatDate(recommendedDate),
        Days_Since_Visit_Pending: daysSinceVisitPending >= 0 ? daysSinceVisitPending : 0,
        Planned_Date: formatDate(contact.Planned_Date),
        Planned_Time: formatDateTime(contact.Planned_Time)
      };
    });

    setContactData(updatedData);
  }, []);

  const handleVisitDetail = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Visit Entry</h1>
      </div>
      <div className="container admin-users">
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Customer Code</th>
              <th>City Code</th>
              <th>Last Visited</th>
              <th>Visit in Days</th>
              <th>Recommended Date</th>
              <th>Days Since Visit Pending</th>
              <th>Planned Date</th>
              <th>Planned Time</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contactData.map((contact, index) => (
              <tr key={index}>
                <td>{contact.Customer_Name}</td>
                <td>{contact.Customer_Code}</td>
                <td>{contact.City_Code}</td>
                <td>{formatDate(contact.Last_Visited)}</td>
                <td>{contact.Visit_In_Days}</td>
                <td>{contact.Recommended_Date}</td>
                <td>{contact.Days_Since_Visit_Pending}</td>
                <td>{contact.Planned_Date}</td>
                <td>{contact.Planned_Time}</td>
                <td>{contact.Remarks}</td>
                <td>
                  <button onClick={() => handleVisitDetail(contact)}>Visit Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedCustomer && <VisitDetail customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />}
    </section>
  );
};

export default DataDisplay;
