"use client";

import React, { useState } from "react";
import { SelectedItem, serviceData } from "../data/service-quotation";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import {
  AddItem,
  removeItem,
  submitQuoteAlert,
  totalAmount,
  updateCustomPrice,
  updateItemOption,
  updateQuantity,
} from "@/lib/helper";

const Article = () => {
  const [serviceType, setServiceType] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  return (
    <section id="articles" className="mx-auto max-w-4xl">
      <div className="relative mb-12">
        <h1 className="text-6xl font-bold">
          <span className="text-primary">Articles</span>{" "}
          <span className="relative">
            Me
            <span className="bg-primary absolute right-0 bottom-0 h-1 w-full" />
          </span>
        </h1>
      </div>

      <h2 className="mb-4 text-2xl font-medium">Service Quotation</h2>

      <p className="mb-4">
        Complete the form below to receive a detailed proposal tailored to your
        specific requirements.
      </p>

      <div className="bg-primary border-secondary rounded-md border p-2">
        {/* Customer Information */}
        <h3 className="text-xl font-medium">Customer Information</h3>

        <div className="mt-5 w-full space-y-3 p-2 px-10">
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
              className="ring-secondary focus:ring-accent w-full rounded-full bg-transparent px-3 py-2 ring transition-colors focus:outline-none md:w-[80%]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="ring-secondary focus:ring-accent w-full rounded-full bg-transparent px-3 py-2 ring transition-colors focus:outline-none md:w-[80%]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="tel">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              className="ring-secondary focus:ring-accent w-full rounded-full bg-transparent px-3 py-2 ring transition-colors focus:outline-none md:w-[80%]"
            />
          </div>
        </div>
      </div>

      {/* Service Selection */}
      <div className="mt-8 w-full space-y-3">
        <h3 className="mt-2 text-xl font-medium">Service Selection</h3>

        <div className="flex flex-col gap-1 px-10">
          <label
            htmlFor="service"
            className="text-text/80 block text-sm font-medium"
          >
            Select a Service
          </label>
          <select
            id="service"
            name="service"
            onChange={(e) => {
              setServiceType(e.target.value);
              setSelectedItems([]);
            }}
            className="ring-secondary/50 focus:ring-accent bg-primary w-full rounded-full px-3 py-2 ring transition-colors focus:outline-none md:w-[80%]"
          >
            {Object.keys(serviceData).map((category) => {
              return (
                <option
                  key={category}
                  value={category}
                  className="flex items-center gap-2"
                >
                  {category}
                </option>
              );
            })}
          </select>
        </div>

        {/* Available Services */}
        {serviceType && (
          <div>
            <h4 className="tet-xl mb-4 font-medium">
              Available {serviceType.toUpperCase()} Services
            </h4>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {serviceData[serviceType as keyof typeof serviceData].map(
                (service, index) => (
                  <Fade
                    key={service.id}
                    cascade
                    delay={index * 100}
                    duration={300}
                    triggerOnce
                  >
                    <div className="border-secondary hover:border-accent group bg-primary h-full rounded-lg border p-3 transition-all ease-in-out">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs-sm font-medium">
                              {service.name}
                            </h4>
                            <span>{service.category}</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {service.description}
                          </p>
                          <span className="bg-secondary rounded-lg p-1.5">
                            {service.basePrice}/{service.unit}
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
                          className="bg-accent text-primary translate-y-2 transform rounded-md p-0.5 transition-all duration-300 ease-in-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 md:invisible md:opacity-0"
                        >
                          <Plus className="transform transition-transform duration-300 group-hover:rotate-90" />
                        </button>
                      </div>

                      {/* show available options */}
                      {service.options && (
                        <div className="text-primary-text text-xs">
                          {Object.entries(service.options).map(
                            ([key, values]) => (
                              <div key={key}>
                                <strong className="uppercase">{key}:</strong>{" "}
                                {values.join(", ")}
                              </div>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  </Fade>
                ),
              )}
            </div>
          </div>
        )}
      </div>

      {/* selected items */}
      <div className="border-secondary mt-8 overflow-hidden rounded-lg border p-4 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            Selected Items
            <span className="text-accent ml-2 text-sm">
              ({selectedItems.length})
            </span>
          </h3>
        </div>

        {selectedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-primary-text text-sm">No items selected yet</p>
            <p className="text-primary-text/60 text-xs">
              Choose services from above to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {selectedItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="bg-primary group/item hover:border-warning border-secondary/50 [&:has(button:hover)]:border-error group/delete-hover:border-error relative rounded-lg border p-4 transition-all duration-300"
              >
                <div className="border-error absolute inset-0 -z-10 overflow-hidden rounded-lg opacity-0 transition group-hover/delete:opacity-100" />
                <button
                  onClick={() => removeItem({ index, setSelectedItems })}
                  className="bg-primary group/delete hover:bg-error/40 absolute -top-2 -right-2 z-30 cursor-pointer overflow-hidden rounded-full p-1.5 transition-all duration-300"
                >
                  <Trash2
                    size={16}
                    className="text-error transform transition-all duration-200 hover:animate-[shake_0.3s_ease-in-out_infinite]"
                  />
                </button>

                <Fade direction="up" duration={200} triggerOnce>
                  <div className="mb-4">
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-primary-text mt-1 text-xs">
                        {item.description}
                      </p>
                    </div>

                    {/* item options */}
                    {item.options &&
                      Object.keys(item.selectedOptions).length > 0 && (
                        <div className="bg-secondary/5 ml-8 space-y-0.5 rounded-md">
                          {Object.entries(item.options).map(
                            ([optionKey, optionValues]) => (
                              <div key={optionKey} className="space-y-1">
                                <label className="text-accent text-xs font-medium uppercase">
                                  {optionKey}
                                </label>
                                <select
                                  name={item.selectedOptions[optionKey]}
                                  id={item.selectedOptions[optionKey]}
                                  onChange={(e) =>
                                    updateItemOption({
                                      index,
                                      optionKey,
                                      optionValue: e.target.value,
                                      setSelectedItems,
                                    })
                                  }
                                  className="border-secondary bg-primary focus:border-accent w-full rounded-md border px-2 py-1.5 text-xs transition-colors focus:outline-none"
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
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity({
                            index,
                            quantity: Math.max(1, item.quantity - 1),
                            setSelectedItems,
                          })
                        }
                        title="Decrease quantity"
                        className="bg-secondary size-6 rounded"
                      >
                        <Minus />
                      </button>

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
                        step={0.1}
                        className="border-secondary w-14 rounded border p-1"
                      />
                      <button
                        onClick={() =>
                          updateQuantity({
                            index,
                            quantity: Math.max(1, item.quantity + 1),
                            setSelectedItems,
                          })
                        }
                        title="Increase quantity"
                        className="bg-secondary size-6 rounded"
                      >
                        <Plus />
                      </button>
                    </div>
                    {/* unit */}
                    <span className="text-primary-text text-xs">
                      / {item.unit}
                    </span>
                  </div>

                  {/* total */}
                  <p className="text-accent text-xs-sm mt-4 uppercase">
                    Item Total: Ksh.{" "}
                    {(item.customPrice !== undefined
                      ? item.customPrice
                      : item.basePrice * item.quantity
                    ).toFixed(2)}
                  </p>
                </Fade>
              </div>
            ))}
          </div>
        )}
        {selectedItems.length > 0 && (
          <div>
            <div>
              <h3>Total</h3>
              <p>KSH. {totalAmount(selectedItems).toFixed(2)}</p>
            </div>

            <button
              onClick={() => submitQuoteAlert(totalAmount(selectedItems))}
              className="bg-accent text-primary mt-6 inline-block max-w-full cursor-pointer rounded-full p-1.5 font-semibold"
            >
              Submit Quote
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Article;
