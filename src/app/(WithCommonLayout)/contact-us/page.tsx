"use client";
import { useState } from "react";
import { Phone, MapPin, Mail } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to API)
    console.log(formData);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-default-50 shadow-md rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
        Contact Us
      </h1>
      <p className="text-center mb-4">
        We're here to help! If you have any questions or need support, feel free
        to reach out to us.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-default-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <div className="flex items-center mb-4">
            <Phone className="text-blue-600 mr-2" />
            <span className="text-default-700">(123) 456-7890</span>
          </div>
          <div className="flex items-center mb-4">
            <Mail className="text-blue-600 mr-2" />
            <span className="text-base-700">
              <a
                href="mailto:support@mraapp.com"
                className="text-blue-600 hover:underline"
              >
                support@mraapp.com
              </a>
            </span>
          </div>
          <div className="flex items-center mb-4">
            <MapPin className="text-blue-600 mr-2" />
            <span className="text-default-700">
              123 MRA St, Dhaka, Bangladesh
            </span>
          </div>
        </div>

        <div className="bg-default-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-default-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-default-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-default-700 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
