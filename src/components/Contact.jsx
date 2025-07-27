// src/components/Contact.jsx
'use client';
import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch('https://formspree.io/f/mnnzprva', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data,
      });
      if (res.ok) {
        setStatus('Thanks! I’ll get back to you soon.');
        form.reset();
      } else {
        setStatus('Oops—something went wrong. Please try again later.');
      }
    } catch {
      setStatus('Network error. Please try again later.');
    }
  };

  return (
    <section
      id="contact"
      className="relative h-screen flex flex-col justify-between bg-gray-800 text-white px-8 py-24"
    >
      {/* Section title */}
      <h2 className="mt-8 text-3xl font-bold text-center">Contact</h2>

      {/* Form & links */}
      <div className="flex-1 max-w-md mx-auto w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm">Name</span>
            <input
              type="text"
              name="name"
              required
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </label>
          <label className="block">
            <span className="text-sm">Email</span>
            <input
              type="email"
              name="email"
              required
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </label>
          <label className="block">
            <span className="text-sm">Message</span>
            <textarea
              name="message"
              rows="5"
              required
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </label>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded font-bold text-white transition"
          >
            Send Message
          </button>
        </form>

        {status && (
          <p className="mt-4 text-center text-gray-300">{status}</p>
        )}

        <div className="mt-6 text-center space-x-6">
          <a
            href="mailto:milburnj@udel.edu"
            className="underline hover:text-gray-300"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/jakeb-milburn-23401a208/"
            target="_blank"
            rel="noopener"
            className="underline hover:text-gray-300"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/milburnj"
            target="_blank"
            rel="noopener"
            className="underline hover:text-gray-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
