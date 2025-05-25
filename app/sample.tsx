"use client";

import React, { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
} from "lucide-react";

// Mock service data structure
const serviceData = {
  "Web Development": [
    {
      id: 1,
      name: "Custom Website",
      description: "Professional website development",
      basePrice: 50000,
      unit: "project",
      category: "Web Development",
      options: {
        framework: ["React", "Next.js", "Vue"],
        design: ["Basic", "Premium", "Custom"],
      },
    },
    {
      id: 2,
      name: "E-commerce Site",
      description: "Online store development",
      basePrice: 80000,
      unit: "project",
      category: "Web Development",
      options: {
        platform: ["Shopify", "WooCommerce", "Custom"],
        features: ["Basic", "Advanced", "Enterprise"],
      },
    },
  ],
  "Digital Marketing": [
    {
      id: 3,
      name: "SEO Optimization",
      description: "Search engine optimization services",
      basePrice: 15000,
      unit: "month",
      category: "Digital Marketing",
      options: {
        package: ["Basic", "Standard", "Premium"],
        duration: ["3 months", "6 months", "12 months"],
      },
    },
  ],
};

const Article = () => {
  const [serviceType, setServiceType] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Helper functions
  const AddItem = ({ item, selectedItems, setSelectedItems }) => {
    const newItem = {
      ...item,
      quantity: 1,
      selectedOptions: item.options
        ? Object.fromEntries(
            Object.entries(item.options).map(([key, values]) => [
              key,
              values[0],
            ]),
          )
        : {},
    };
    setSelectedItems([...selectedItems, newItem]);
  };

  const removeItem = ({ index, setSelectedItems }) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = ({ index, quantity, setSelectedItems }) => {
    setSelectedItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity } : item)),
    );
  };

  const updateCustomPrice = ({ index, customPrice, setSelectedItems }) => {
    setSelectedItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, customPrice } : item)),
    );
  };

  const updateItemOption = ({
    index,
    optionKey,
    optionValue,
    setSelectedItems,
  }) => {
    setSelectedItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              selectedOptions: {
                ...item.selectedOptions,
                [optionKey]: optionValue,
              },
            }
          : item,
      ),
    );
  };

  const totalAmount = (items) => {
    return items.reduce((total, item) => {
      const price =
        item.customPrice !== undefined ? item.customPrice : item.basePrice;
      return total + price * item.quantity;
    }, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitQuote = () => {
    if (!customerData.name || !customerData.email || !customerData.phone) {
      alert("Please fill in all customer information fields.");
      return;
    }
    if (selectedItems.length === 0) {
      alert("Please select at least one service.");
      return;
    }
    setShowSummary(true);
  };

  const handleBackToForm = () => {
    setShowSummary(false);
  };

  const handleNewQuote = () => {
    setShowSummary(false);
    setSelectedItems([]);
    setServiceType("");
    setCustomerData({ name: "", email: "", phone: "" });
  };

  // Summary Page Component
  if (showSummary) {
    return (
      <section className="mx-auto max-w-4xl p-6">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={handleBackToForm}
            className="flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-700"
          >
            <ArrowLeft size={20} />
            Back to Form
          </button>
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={24} />
            <span className="font-semibold">Quote Submitted Successfully!</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h1 className="mb-2 text-3xl font-bold">
              Service Quotation Summary
            </h1>
            <p className="opacity-90">
              Quote generated on {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Customer Information */}
          <div className="border-b border-gray-200 p-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <User className="text-blue-600" size={20} />
              Customer Information
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <User className="text-gray-400" size={16} />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{customerData.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-gray-400" size={16} />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{customerData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gray-400" size={16} />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{customerData.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Services */}
          <div className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Selected Services</h2>
            <div className="space-y-4">
              {selectedItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="rounded-lg bg-gray-50 p-4"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                      <span className="mt-1 inline-block rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
                        {item.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-semibold">
                        {item.quantity} {item.unit}
                        {item.quantity > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Selected Options */}
                  {Object.keys(item.selectedOptions).length > 0 && (
                    <div className="mb-3">
                      <p className="mb-2 text-sm font-medium text-gray-700">
                        Selected Options:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(item.selectedOptions).map(
                          ([key, value]) => (
                            <div key={key} className="text-sm">
                              <span className="font-medium capitalize">
                                {key}:
                              </span>{" "}
                              {value}
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {/* Pricing */}
                  <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                    <div className="text-sm text-gray-600">
                      KShs.{" "}
                      {(item.customPrice !== undefined
                        ? item.customPrice
                        : item.basePrice
                      ).toLocaleString()}{" "}
                      per {item.unit}
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      KShs.{" "}
                      {(
                        (item.customPrice !== undefined
                          ? item.customPrice
                          : item.basePrice) * item.quantity
                      ).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Amount */}
            <div className="mt-6 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Total Quote Amount</h3>
                  <p className="text-gray-600">All services included</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    KShs. {totalAmount(selectedItems).toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-500">Excluding taxes</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={handleNewQuote}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Create New Quote
              </button>
              <button
                onClick={() => window.print()}
                className="rounded-lg bg-gray-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-700"
              >
                Print Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Original Form Component
  return (
    <section id="articles" className="mx-auto max-w-4xl p-6">
      <div className="relative mb-12">
        <h1 className="text-6xl font-bold">
          <span className="text-blue-600">Service</span>{" "}
          <span className="relative">
            Quote
            <span className="absolute right-0 bottom-0 h-1 w-full bg-blue-600" />
          </span>
        </h1>
      </div>

      <h2 className="mb-4 text-2xl font-medium">Service Quotation</h2>
      <p className="mb-4">
        Complete the form below to receive a detailed proposal tailored to your
        specific requirements.
      </p>

      <div className="mb-8 rounded-md border border-blue-200 bg-blue-50 p-6">
        {/* Customer Information */}
        <h3 className="mb-4 text-xl font-medium">Customer Information</h3>

        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none md:w-[80%]"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none md:w-[80%]"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={customerData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none md:w-[80%]"
              required
            />
          </div>
        </div>
      </div>

      {/* Service Selection */}
      <div className="mt-8 w-full space-y-6">
        <h3 className="text-xl font-medium">Service Selection</h3>

        <div className="relative mx-auto max-w-2xl">
          <label
            htmlFor="service"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Select a Service Category
          </label>
          <select
            id="service"
            name="service"
            value={serviceType}
            onChange={(e) => {
              setServiceType(e.target.value);
              setSelectedItems([]);
            }}
            className="w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 pr-10 focus:border-blue-500 focus:outline-none"
          >
            <option value="" disabled>
              Choose a service category...
            </option>
            {Object.keys(serviceData).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Available Services */}
        {serviceType && (
          <div>
            <h4 className="mb-4 text-xl font-medium">
              Available {serviceType} Services
            </h4>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {serviceData[serviceType].map((service) => (
                <div
                  key={service.id}
                  className="group h-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="mb-1 text-lg font-medium">
                        {service.name}
                      </h4>
                      <p className="mb-2 text-sm text-gray-600">
                        {service.description}
                      </p>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
                        KShs. {service.basePrice.toLocaleString()}/
                        {service.unit}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        AddItem({
                          item: service,
                          selectedItems,
                          setSelectedItems,
                        })
                      }
                      className="rounded-md bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {service.options && (
                    <div className="text-sm text-gray-600">
                      {Object.entries(service.options).map(([key, values]) => (
                        <div key={key} className="mb-1">
                          <strong className="uppercase">{key}:</strong>{" "}
                          {values.join(", ")}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Selected Items */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            Selected Items
            <span className="ml-2 text-sm text-blue-600">
              ({selectedItems.length})
            </span>
          </h3>

          {selectedItems.length > 0 && (
            <button
              onClick={() => setSelectedItems([])}
              className="rounded-full p-2 text-red-600 transition-all hover:bg-red-50 hover:text-red-700"
              title="Clear all items"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        {selectedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-600">No items selected yet</p>
            <p className="text-sm text-gray-400">
              Choose services from above to get started
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="rounded-lg border border-gray-200 bg-gray-50 p-4"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <button
                    onClick={() => removeItem({ index, setSelectedItems })}
                    className="p-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Options */}
                {item.options &&
                  Object.keys(item.selectedOptions).length > 0 && (
                    <div className="mb-4 space-y-2">
                      {Object.entries(item.options).map(
                        ([optionKey, optionValues]) => (
                          <div key={optionKey}>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              {optionKey.charAt(0).toUpperCase() +
                                optionKey.slice(1)}
                            </label>
                            <select
                              value={item.selectedOptions[optionKey]}
                              onChange={(e) =>
                                updateItemOption({
                                  index,
                                  optionKey,
                                  optionValue: e.target.value,
                                  setSelectedItems,
                                })
                              }
                              className="w-full rounded border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none"
                            >
                              {optionValues?.map((value) => (
                                <option key={value} value={value}>
                                  {value}
                                </option>
                              ))}
                            </select>
                          </div>
                        ),
                      )}
                    </div>
                  )}

                {/* Quantity and Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        updateQuantity({
                          index,
                          quantity: Math.max(1, item.quantity - 1),
                          setSelectedItems,
                        })
                      }
                      className="flex h-8 w-8 items-center justify-center rounded bg-gray-200 hover:bg-gray-300"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="w-12 text-center">{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity({
                          index,
                          quantity: (item.quantity || 1) + 1,
                          setSelectedItems,
                        })
                      }
                      className="flex h-8 w-8 items-center justify-center rounded bg-gray-200 hover:bg-gray-300"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="text-right">
                    <input
                      type="number"
                      value={item.customPrice || item.basePrice}
                      onChange={(e) =>
                        updateCustomPrice({
                          index,
                          customPrice: parseFloat(e.target.value),
                          setSelectedItems,
                        })
                      }
                      min={item.basePrice}
                      step={0.01}
                      className="w-24 rounded border border-gray-300 px-2 py-1 text-right text-sm"
                    />
                    <p className="text-xs text-gray-500">per {item.unit}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3">
                  <span className="text-sm font-medium">Item Total:</span>
                  <span className="font-bold text-blue-600">
                    KShs.{" "}
                    {(
                      (item.customPrice !== undefined
                        ? item.customPrice
                        : item.basePrice) * item.quantity
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}

            <div className="mt-6 border-t pt-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xl font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-blue-600">
                  KShs. {totalAmount(selectedItems).toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleSubmitQuote}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Submit Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Article;
