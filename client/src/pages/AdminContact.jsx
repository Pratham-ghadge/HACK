import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/Auth';
import { Link } from 'react-router-dom';

const AdminContacts = () => {
  const { Authorizationtoken } = useAuth();
  const [contacts, setContacts] = useState([]);

  const getAllContacts = async () => {
    try {
      const response = await fetch("http://localhost:2000/api/admin/contact", {
        method: "GET",
        headers: {
          Authorization: Authorizationtoken,
        },
      });

      const data = await response.json();
      console.log(`data of contacts ${data}`);
      setContacts(data);
    } catch (error) {
      console.error("Error in fetching contacts:", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`http://localhost:2000/api/admin/contact/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: Authorizationtoken,
        },
      });

      const data = await response.json();
      console.log(`Contact After Delete ${data}`);

      if (response.ok) {
        getAllContacts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <>
      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">S.No</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Message</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts && contacts.map((contact, index) => (
            <tr key={index}>
              <td className="px-4 py-2 text-white">{index + 1}</td>
              <td className="px-4 py-2 text-white">{contact.username}</td>
              <td className="px-4 py-2 text-white">{contact.email}</td>
              <td className="px-4 py-2 text-white">{contact.message}</td>
              <td className="px-4 py-2">
                <button onClick={() => deleteContact(contact._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminContacts;
