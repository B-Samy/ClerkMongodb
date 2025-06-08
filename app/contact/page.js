'use client'
import { toast } from 'react-toastify';
import '../globals.css'
import { useState } from "react";

export default function ContactForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatus(
        toast.warn("Oops! Some fields are still empty.")
      );
      return;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error:", data.error);
      setStatus("Failed to send message.");
    } else {
      console.log("Success:", data.message);
      setStatus(
        toast.success("Got it ! We'll be in touch soon.")
      );
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (


    <div id='formid'>
      
    <form id='contactForm' onSubmit={handleSubmit}>
    <h1>Contact Me</h1>
      <p>Feel free to reach out to me using the form below.</p>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button type="submit">Send</button>
      {status && <p>{status}</p>}
    </form>
    </div>


  );
}
