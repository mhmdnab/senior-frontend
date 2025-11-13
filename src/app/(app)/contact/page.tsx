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
    <div className="bg-gradient-to-tr from-[#522c5d] to-[#232323] min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Floating Background Accents */}
      <div className="absolute top-10 left-[-50px] w-72 h-72 bg-[#cb6ce6]/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-0 right-[-80px] w-96 h-96 bg-[#89499b]/20 rounded-full blur-3xl animate-float pointer-events-none"></div>

      {/* Card */}
      <div className="relative w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl px-8 py-10">
        <h2 className="text-3xl font-extrabold text-[#cb6ce6] mb-3 text-center drop-shadow-sm">
          Let’s Connect
        </h2>

        <p className="text-[#d9b2e6] mb-10 text-center leading-relaxed">
          We’d love to hear from you. Send us a message and we’ll reply as soon
          as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-200 text-sm font-semibold mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="
            w-full px-4 py-3 rounded-lg bg-white/10 text-white
            placeholder:text-purple-200/50
            border border-white/20
            focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40
            outline-none transition
          "
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-200 text-sm font-semibold mb-2"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="
            w-full px-4 py-3 rounded-lg bg-white/10 text-white
            placeholder:text-purple-200/50
            border border-white/20
            focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40
            outline-none transition
          "
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-gray-200 text-sm font-semibold mb-2"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="
            w-full px-4 py-3 rounded-lg bg-white/10 text-white
            placeholder:text-purple-200/50
            border border-white/20
            focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40
            outline-none resize-none transition
          "
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="
          w-full py-3 rounded-lg font-semibold text-white
          bg-gradient-to-r from-purple-600 to-pink-600
          hover:from-purple-500 hover:to-pink-500
          shadow-md shadow-purple-900/40
          hover:shadow-purple-700/50
          transition-all duration-300
          active:scale-[0.97]
        "
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
