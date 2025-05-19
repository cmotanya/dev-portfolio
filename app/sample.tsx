"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  MapPin,
  Settings,
  AlertCircle,
} from "lucide-react";
import { Fade, Slide } from "react-awesome-reveal";

const ConsultationRequest = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "", // Location state
    serviceType: "", // Service type state
    isUrgent: false, // Urgent checkbox state
    message: "",
  });

  // Handle form input changes - Correctly handles text, select, and checkbox
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // --- Updated Basic Client-Side Validation ---
    // Check only the fields you want to be required for brevity
    if (
      !formData.name ||
      !formData.email ||
      !formData.serviceType ||
      !formData.message
    ) {
      alert(
        "Please fill out all required fields (Name, Email, Service Type, Message).",
      );
      return; // Stop submission if required fields are empty
    }
    // Basic email format check (optional, keeping this is good)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    // --- End Updated Validation ---

    // Here you would typically send this data to your backend API endpoint
    // For example, using fetch:
    /*
    fetch('/api/send-consultation-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Show success message banner (recommended over alert)
        alert("Your consultation request has been submitted. I'll get back to you soon!"); // Placeholder
        // Reset form after submission
        setFormData({
            name: "", email: "", phone: "", location: "", serviceType: "", isUrgent: false, message: "",
        });
    })
    .catch((error) => {
        console.error('Error:', error);
        // Show error message banner (recommended over alert)
        alert("There was an error submitting your request. Please try again or contact me directly."); // Placeholder
    });
    */

    // --- Placeholder: Log data and show alert ---
    console.log("Consultation Request:", formData);

    // Show success message (Placeholder)
    alert(
      "Your consultation request has been submitted. I'll get back to you soon!",
    );

    // Reset form after placeholder alert
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      serviceType: "",
      isUrgent: false,
      message: "",
    });
  };

  return (
    <section
      id="consultation" // Updated section ID
      className="mx-auto max-w-4xl py-16 md:px-12 md:py-24"
    >
      {/* Section Title */}
      <Slide direction="down" duration={300} triggerOnce>
        <div className="relative mb-12 flex items-center gap-4">
          <Calendar // Icon - Can change if needed
            size={45}
            className="text-secondary shrink-0 rotate-12"
          />
          <h1 className="text-5xl font-bold tracking-tight whitespace-nowrap lg:text-6xl">
            <span className="text-primary">Request </span>
            <span className="relative">
              Consultation
              <span className="bg-primary absolute right-0 bottom-0 h-1 w-full" />
            </span>
          </h1>
        </div>
      </Slide>

      {/* Form Container */}
      <Fade delay={300} triggerOnce duration={400}>
        <div className="bg-secondary/15 rounded-lg p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-medium">
                  <User size={18} className="text-primary" />
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-3 focus:ring-1 focus:outline-none"
                  required // Required
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-medium">
                  <Mail size={18} className="text-primary" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-3 focus:ring-1 focus:outline-none"
                  required // Required
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-medium">
                  <Phone size={18} className="text-primary" />
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-3 focus:ring-1 focus:outline-none"
                  placeholder="(123) 456-7890"
                />
              </div>

              {/* Location Field - Now Optional */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-medium">
                  <MapPin size={18} className="text-primary" />
                  Your Location (Optional) {/* Updated label */}
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-3 focus:ring-1 focus:outline-none"
                  // removed required attribute
                  placeholder="City, Country or Area"
                />
              </div>

              {/* Service Type Field - Spans 2 columns on md+ */}
              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 font-medium">
                  <Settings size={18} className="text-primary" />
                  Service Needed
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 bg-white p-3 focus:ring-1 focus:outline-none dark:bg-gray-800"
                  required // Required
                >
                  <option value="" disabled>
                    Select a service type
                  </option>
                  <option value="Website Development">
                    Website Development
                  </option>
                  <option value="CCTV & Security">CCTV & Security</option>
                  <option value="Networking">Networking</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Urgent Checkbox - Spans 2 columns on md+ */}
              <div className="flex items-center space-y-2 md:col-span-2">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  id="isUrgent"
                  name="isUrgent"
                  checked={formData.isUrgent}
                  onChange={handleChange}
                  className="focus:ring-primary text-primary h-4 w-4 rounded border-gray-300"
                />
                {/* Label for checkbox */}
                <label
                  htmlFor="isUrgent"
                  className="flex cursor-pointer items-center gap-1 font-medium"
                >
                  <AlertCircle size={18} className="text-primary" />
                  This request is urgent
                </label>
              </div>

              {/* Message Field - Spans 2 columns on md+ */}
              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 font-medium">
                  <MessageSquare size={18} className="text-primary" />
                  Message (Required){" "}
                  {/* Updated label to emphasize it's required */}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="focus:border-primary focus:ring-primary w-full resize-y rounded-md border border-gray-300 p-3 focus:ring-1 focus:outline-none"
                  placeholder="Tell me more about what you're looking for, project scope, specific issues, etc."
                  required // Required
                ></textarea>
              </div>
            </div>{" "}
            {/* End grid */}
            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 inline-block rounded-full px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl active:scale-105"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </Fade>

      {/* Optional Info Text Below Form */}
      <Fade direction="up" delay={500} duration={400} triggerOnce>
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            I will review your request and get back to you as soon as possible.
          </p>
          <p className="mt-2">
            For urgent requests, I will prioritize my response.
          </p>
          <p className="mt-2">
            Please ensure your email and phone number are correct.
          </p>
        </div>
      </Fade>
    </section>
  );
};

export default ConsultationRequest;
// This component is a simple consultation request form with validation and a success message. It uses React hooks for state management and handles form submission with basic validation. The form includes fields for name, email, phone, location, service type, urgency checkbox, and a message textarea. The layout is responsive and uses Tailwind CSS for styling.

// The form is wrapped in a section with a title and optional info text below the form. The component uses animations from react-awesome-reveal for a smooth user experience.
