"use client";
import React from "react";
import { useState } from "react";
import emailjs from "emailjs-com";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .send(
        "service_p5vr1dt",
        "template_dmb73fs",
        formData,
        "VNUKt7eT6-4RfIXAu"
      )
      .then(
        () => {
          alert("Your message has been sent!");
          setFormData({ name: "", email: "", phone: "", message: "" });
        },
        (error) => {
          console.error(error);
          alert("Failed to send message.");
        }
      );
  };

  return (
    <div className="bg-gradient-to-tr from-[#522c5d] to-[#232323] min-h-screen flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-lg bg-[#3c2343]/80 rounded-2xl shadow-2xl px-8 py-10 backdrop-blur-md border border-[#7c7c7c]/30">
        <h2 className="text-3xl font-bold text-[#cb6ce6] mb-3 text-center drop-shadow-sm">
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
              className="shadow-sm appearance-none border border-[#cb6ce6]/40 rounded-lg w-full py-3 px-4 text-[#cb6ce6] bg-white/10 focus:bg-white/20 placeholder:text-[#b891c6] leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
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
              className="shadow-sm appearance-none border border-[#cb6ce6]/40 rounded-lg w-full py-3 px-4 text-[#cb6ce6] bg-white/10 focus:bg-white/20 placeholder:text-[#b891c6] leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition"
              placeholder="Enter your email"
              required
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
              rows={5}
              className="shadow-sm appearance-none border border-[#cb6ce6]/40 rounded-lg w-full py-3 px-4 text-[#cb6ce6] bg-white/10 focus:bg-white/20 placeholder:text-[#b891c6] leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 resize-none transition"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition active:scale-[0.98]"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
