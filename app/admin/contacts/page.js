'use client'

import {useState, useEffect} from "react";

export default  function AdminContactPage() {

const [contacts, setContacts] = useState([])



    useEffect(() => {
        const fetchData = async() =>{
            const res = await fetch('/api/contact-list')
            const data = await res.json()
            setContacts(data.contacts)
        }
        fetchData()
    }, [])


    const deleteContact = async (id) => {
       const res = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
       })  
       if (res.ok){
          setContacts(prev => prev.filter(c=> c._id !== id))
       }
    }



return (
<>
 <div className="admin-container">
      <h1>Admin Contact Page</h1>
      <ul className="contact-list">
        {contacts.map((c) => (
          <li className="contact-card" key={c._id}>
            <h2>{c.name}</h2>
            <p><strong>Email:</strong> {c.email}</p>
            <p><strong>Message:</strong> {c.message}</p>
            <p><strong>Date:</strong> {new Date(c.createdAt).toLocaleString()}</p>
            <button className="delete-button" onClick={() => deleteContact(c._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
</>
)
}