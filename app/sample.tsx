"use client";

import React, { useState, useMemo } from "react"; // Added useMemo
import { SelectedItem, serviceData } from "../data/service-quotation"; // Assuming this path is correct
import { Minus, Plus, Trash2 } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import {
  AddItem,
  removeItem,
  updateCustomPrice,
  updateItemOption,
  updateQuantity,
} from "@/lib/helper"; // Assuming this path is correct

const Article = () => {
  const [serviceType, setServiceType] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  // Calculate total amount
  const totalAmount = useMemo(() => {
    return selectedItems.reduce((acc, item) => {
      const price =
        item.customPrice !== undefined ? item.customPrice : item.basePrice;
      return acc + price * item.quantity;
    }, 0);
  }, [selectedItems]);

  // Handler for service type change - Initialize with a default service type if needed
  // For instance, to pre-select the first available service category:
  // useEffect(() => {
  //   if (Object.keys(serviceData).length > 0 && !serviceType) {
  //     setServiceType(Object.keys(serviceData)[0]);
  //   }
  // }, [serviceType]);

  return (
    <section
      id="articles" // Corrected: removed trailing space
      className="mx-auto max-w-4xl py-8 md:py-12" // Added some padding
    >
      <div className="relative mb-12">
        <h1 className="text-center text-6xl font-bold md:text-left">
          {" "}
          {/* Centered on small screens */}
          <span className="text-primary">Service</span>{" "}
          <span className="relative">
            Quotation
            <span className="bg-primary absolute right-0 bottom-0 h-1 w-full" />
          </span>
        </h1>
      </div>

      <p className="mb-8 text-center md:text-left">
        {" "}
        {/* Centered on small screens */}
        Complete the form below to receive a detailed proposal tailored to your
        specific requirements.
      </p>

      <div className="bg-primary border-secondary rounded-md border p-4 md:p-6">
        {" "}
        {/* Adjusted padding */}
        {/* Customer Information */}
        <h3 className="mb-4 text-xl font-medium">Customer Information</h3>{" "}
        {/* Added mb-4 */}
        <div className="mt-5 w-full space-y-4 p-2 md:px-10">
          {" "}
          {/* Adjusted spacing and padding */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-text/80 block text-sm font-medium"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="ring-secondary focus:ring-accent w-full rounded-full bg-transparent px-4 py-2.5 ring-1 transition-colors focus:outline-none md:w-[80%]" // Adjusted padding and ring
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-text/80 block text-sm font-medium"
            >
              Email
            </label>{" "}
            {/* Added class for consistency */}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="ring-secondary focus:ring-accent w-full rounded-full bg-transparent px-4 py-2.5 ring-1 transition-colors focus:outline-none md:w-[80%]" // Adjusted padding and ring
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="tel"
              className="text-text/80 block text-sm font-medium"
            >
              Phone
            </label>{" "}
            {/* Added class for consistency */}
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className="ring-secondary focus:ring-accent w-full rounded-full bg-transparent px-4 py-2.5 ring-1 transition-colors focus:outline-none md:w-[80%]" // Adjusted padding and ring
            />
          </div>
        </div>
      </div>

      {/* Service Selection */}
      <div className="mt-8 w-full space-y-3">
        <h3 className="mt-2 text-xl font-medium">Service Selection</h3>

        <div className="flex flex-col gap-1 px-2 md:px-10">
          {" "}
          {/* Adjusted padding */}
          <label
            htmlFor="service"
            className="text-text/80 block text-sm font-medium"
          >
            Select a Service Category
          </label>
          <select
            id="service"
            name="service"
            value={serviceType} // Controlled component
            onChange={(e) => {
              setServiceType(e.target.value);
              setSelectedItems([]); // Reset selected items when category changes
            }}
            className="ring-secondary/50 focus:ring-accent bg-primary w-full rounded-full px-4 py-2.5 ring-1 transition-colors focus:outline-none md:w-[80%]" // Adjusted padding and ring
          >
            <option value="" disabled className="text-gray-500">
              -- Select a Category --
            </option>
            {Object.keys(serviceData).map((category) => (
              <option
                key={category}
                value={category}
                className="flex items-center gap-2" // This class might not render as expected in native options
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Available Services */}
        {serviceType &&
          serviceData[serviceType as keyof typeof serviceData] && (
            <div className="mt-6">
              {" "}
              {/* Added mt-6 */}
              <h4 className="mb-4 px-2 text-xl font-medium md:px-0">
                {" "}
                {/* Adjusted padding */}
                Available {serviceType.toUpperCase()} Services
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {serviceData[serviceType as keyof typeof serviceData].map(
                  (service, index) => (
                    <Fade
                      key={service.id}
                      cascade={false} // Changed cascade to false for individual item animation
                      delay={index * 50} // Reduced delay
                      duration={300}
                      triggerOnce
                      direction="up" // Explicit direction
                    >
                      <div className="border-secondary hover:border-accent group bg-primary flex h-full flex-col justify-between rounded-lg border p-4 transition-all ease-in-out">
                        {" "}
                        {/* Adjusted padding and flex for alignment */}
                        <div>
                          <div className="mb-3 flex items-start justify-between">
                            {" "}
                            {/* Adjusted mb */}
                            <div className="flex-1">
                              <div className="mb-1 flex items-center gap-2">
                                {" "}
                                {/* Added mb-1 */}
                                <h4 className="text-lg font-medium">
                                  {" "}
                                  {/* Increased size */}
                                  {service.name}
                                </h4>
                                {/* <span>{service.category}</span> Item category could be shown if different from serviceType */}
                              </div>
                              <p className="mb-2 text-xs text-gray-500">
                                {service.description}
                              </p>
                              <span className="bg-secondary rounded-md p-1.5 px-2.5 text-sm">
                                {" "}
                                {/* Adjusted padding and size */}$
                                {service.basePrice.toFixed(2)}/{service.unit}{" "}
                                {/* Added $ and toFixed(2) */}
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
                              title={`Add ${service.name}`}
                              className="bg-accent text-primary ml-2 flex-shrink-0 translate-y-1 transform rounded-md p-1 transition-all duration-300 ease-in-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 md:invisible md:opacity-0"
                            >
                              <Plus className="transform transition-transform duration-300 group-hover:rotate-90" />
                            </button>
                          </div>

                          {/* show available options */}
                          {service.options &&
                            Object.keys(service.options).length > 0 && (
                              <div className="text-primary-text mt-3 space-y-1 text-xs">
                                {" "}
                                {/* Added mt-3 and space-y-1 */}
                                <h5 className="mb-1 text-sm font-semibold">
                                  Options:
                                </h5>
                                {Object.entries(service.options).map(
                                  ([key, values]) => (
                                    <div key={key}>
                                      <strong className="uppercase">
                                        {key}:
                                      </strong>{" "}
                                      {values.join(", ")}
                                    </div>
                                  ),
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    </Fade>
                  ),
                )}
              </div>
            </div>
          )}
      </div>

      {/* selected items */}
      <div className="border-secondary mt-10 overflow-hidden rounded-lg border p-4 shadow-sm md:p-6">
        {" "}
        {/* Adjusted padding and mt */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            Selected Items
            <span className="text-accent ml-2 text-sm">
              ({selectedItems.length})
            </span>
          </h3>
        </div>
        {selectedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            {" "}
            {/* Adjusted padding */}
            <p className="text-primary-text text-base">
              {" "}
              {/* Increased size */}
              No items selected yet.
            </p>
            <p className="text-primary-text/60 mt-1 text-sm">
              {" "}
              {/* Adjusted size and mt */}
              Choose services from the list above to add them to your quote.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {" "}
            {/* Increased gap */}
            {selectedItems.map((item, index) => (
              <div
                key={`${item.id}-${index}-${item.name}`} // More robust key
                className="bg-primary group/item hover:border-warning border-secondary/50 [&:has(button:hover)]:border-error group/delete-hover:border-error relative rounded-lg border p-4 transition-all duration-300"
              >
                <div className="border-error absolute inset-0 -z-10 overflow-hidden rounded-lg opacity-0 transition group-hover/delete:opacity-100" />
                <button
                  onClick={() => removeItem({ index, setSelectedItems })}
                  title="Remove item"
                  className="bg-primary group/delete hover:bg-error/40 absolute -top-2.5 -right-2.5 z-30 cursor-pointer overflow-hidden rounded-full p-1.5 shadow-md transition-all duration-300" // Adjusted position and added shadow
                >
                  <Trash2
                    size={16}
                    className="text-error transform transition-all duration-200 group-hover/delete:scale-110" // Simpler hover effect
                  />
                </button>

                <Fade direction="up" duration={300} triggerOnce cascade={false}>
                  {" "}
                  {/* Added cascade=false */}
                  <div className="mb-4">
                    <div>
                      <h4 className="text-md pr-6 font-medium">{item.name}</h4>{" "}
                      {/* Added pr-6 for space from delete button */}
                      <p className="text-primary-text mt-1 text-xs">
                        {item.description}
                      </p>
                    </div>

                    {/* item options */}
                    {item.options &&
                      Object.keys(item.selectedOptions).length > 0 && (
                        <div className="bg-secondary/5 mt-3 space-y-2 rounded-md p-3">
                          {" "}
                          {/* Added padding and adjusted spacing */}
                          {Object.entries(item.options).map(
                            ([optionKey, optionValues]) => (
                              <div key={optionKey} className="space-y-1">
                                <label
                                  htmlFor={`${item.id}-${optionKey}-${index}`}
                                  className="text-accent text-xs font-medium uppercase"
                                >
                                  {optionKey}
                                </label>
                                <select
                                  name={optionKey} // Use optionKey for name
                                  id={`${item.id}-${optionKey}-${index}`} // Unique ID
                                  value={item.selectedOptions[optionKey] || ""} // Controlled component
                                  onChange={(e) =>
                                    updateItemOption({
                                      index,
                                      optionKey,
                                      optionValue: e.target.value,
                                      setSelectedItems,
                                      selectedItems, // Pass selectedItems if helper needs it for complex logic
                                    })
                                  }
                                  className="border-secondary bg-primary focus:border-accent w-full rounded-md border px-3 py-2 text-xs transition-colors focus:outline-none" // Adjusted padding
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
                  </div>
                  {/* quantity and price control */}
                  <div className="flex items-center justify-between">
                    {" "}
                    {/* justify-between to space out controls and total */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity({
                            index,
                            quantity: Math.max(1, item.quantity - 1),
                            setSelectedItems,
                            selectedItems, // Pass selectedItems if helper needs it
                          })
                        }
                        title="Decrease quantity"
                        className="bg-secondary hover:bg-secondary/80 text-text flex size-7 items-center justify-center rounded transition-colors" // Adjusted size and added flex for icon centering
                      >
                        <Minus size={16} />
                      </button>

                      <span className="text-md w-8 text-center font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          // THIS WAS THE MISSING PART
                          updateQuantity({
                            index,
                            quantity: item.quantity + 1,
                            setSelectedItems,
                            selectedItems, // Pass selectedItems if helper needs it
                          })
                        }
                        title="Increase quantity"
                        className="bg-secondary hover:bg-secondary/80 text-text flex size-7 items-center justify-center rounded transition-colors" // Adjusted size
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Price:</span>
                      <input
                        type="number"
                        value={
                          item.customPrice !== undefined
                            ? item.customPrice
                            : item.basePrice
                        }
                        min="0"
                        step="0.01"
                        onChange={(e) =>
                          updateCustomPrice({
                            index,
                            customPrice: parseFloat(e.target.value) || 0, // Ensure it's a number, default to 0 if parse fails
                            setSelectedItems,
                            selectedItems, // Pass selectedItems if helper needs it
                          })
                        }
                        className="border-secondary w-20 rounded border bg-transparent p-1.5 text-right text-sm" // Adjusted padding and text-right
                      />
                      <span className="text-sm">/ {item.unit}</span>
                    </div>
                  </div>
                  <p className="text-md mt-2 text-right font-semibold">
                    Item Total: $
                    {(
                      (item.customPrice !== undefined
                        ? item.customPrice
                        : item.basePrice) * item.quantity
                    ).toFixed(2)}
                  </p>
                </Fade>
              </div>
            ))}
          </div>
        )}
        {/* Total Amount Display */}
        {selectedItems.length > 0 && (
          <div className="border-secondary mt-8 border-t pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Estimated Total</h3>
              <p className="text-accent text-3xl font-bold">
                ${totalAmount.toFixed(2)}
              </p>
            </div>
            <button
              className="bg-accent hover:bg-accent/90 text-primary focus:ring-accent focus:ring-opacity-50 mt-6 w-full rounded-md py-3 font-semibold transition-colors focus:ring-2 focus:outline-none"
              onClick={() =>
                alert(
                  `Quotation Submitted! Total: $${totalAmount.toFixed(2)}\n\nNote: Customer info and actual submission logic would be handled here.`,
                )
              }
            >
              Submit Quotation
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Article;
