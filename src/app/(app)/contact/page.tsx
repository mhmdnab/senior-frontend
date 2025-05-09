"use client";
import React from "react";
import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log("Form submitted:", formData);
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="bg-gradient-to-tr from-[#522c5d] to-[#232323] py-16 px-6 shadow-2xl flex flex-col items-center">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-bold text-[#cb6ce6] mb-6 text-center">
          Let's Connect
        </h2>
        <p className="text-[#89499b] mb-8 text-center">
          We'd love to hear from you! Send us a message and we'll get back to
          you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-[#cb6ce6] leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 bg-[#7c7c7c]"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-[#cb6ce6] leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 bg-[#7c7c7c]"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              Your Email
            </label>
            <input
              type="gender"
              id="gender"
              name="gender"
              value={formData.email}
              onChange={handleChange}
              className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-[#cb6ce6] leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 bg-[#7c7c7c]"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-[#cb6ce6] leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 bg-[#7c7c7c]"
              placeholder="Your phone number"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-gray-300 text-sm font-semibold mb-2"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-[#cb6ce6] leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 bg-[#7c7c7c]"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
