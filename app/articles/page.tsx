// "use client";

// import React, { useState } from "react";
// import { SelectedItem, serviceData } from "../data/service-quotation";
// import { Minus, Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
// import { Fade } from "react-awesome-reveal";
// import {
//   AddItem,
//   removeItem,
//   totalAmount,
//   updateCustomPrice,
//   updateItemOption,
//   updateQuantity,
// } from "@/lib/helper";
// import { cn } from "@/lib/utils";

// const Article = () => {
//   const [serviceType, setServiceType] = useState<string>("");
//   const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

//   // Add window click event listener

//   const handleReset = () => {
//     setServiceType("");
//     setSelectedItems([]);
//   };

//   return (
//     <section id="articles" className="mx-auto max-w-4xl">
//       <div className="relative mb-12">
//         <h1 className="text-6xl font-bold">
//           <span className="text-primary">Articles</span>{" "}
//           <span className="relative">
//             Me
//             <span className="bg-primary absolute right-0 bottom-0 h-1 w-full" />
//           </span>
//         </h1>
//       </div>
//       <h2 className="mb-4 text-2xl font-medium">Service Quotation</h2>
//       <p className="mb-4">
//         Complete the form below to receive a detailed proposal tailored to your
//         specific requirements.
//       </p>
//       {/* reset button */}

//       <div className="flex flex-col gap-4">
//         <Fade cascade direction="up" duration={250}>
//           <div className="flex justify-end">
//             {selectedItems.length > 0 && (
//               <button
//                 onClick={handleReset}
//                 title="Reset All Fields and Selections"
//                 className="bg-primary ring-secondary group flex max-w-max cursor-pointer items-center gap-2 rounded-md p-2 text-xs font-medium ring transition-all duration-300"
//               >
//                 <RotateCcw
//                   size={16}
//                   className="transition-transform duration-600 ease-in-out group-hover:rotate-180"
//                 />
//                 Reset All
//               </button>
//             )}
//           </div>
//         </Fade>
//         <div className="flex flex-col gap-4">
//           {/* Customer Information */}
//           <h3 className="text-xl font-medium">Customer Information</h3>

//           <div className="w-full space-y-3 p-2 px-10">
//             <div className="flex flex-col gap-1">
//               <label
//                 htmlFor="name"
//                 className="text-text/80 block text-sm font-medium"
//               >
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 placeholder="Enter your name"
//                 autoComplete="name"
//                 className={cn(
//                   "ring-secondary placeholder:text-primary-text focus:ring-accent w-full rounded-lg bg-transparent px-3 py-2 ring transition-colors focus:outline-none md:w-[80%]",
//                 )}
//               />
//             </div>

//             <div className="flex flex-col gap-1">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 autoComplete="email"
//                 className={cn(
//                   "ring-secondary placeholder:text-primary-text focus:ring-accent w-full rounded-lg bg-transparent px-3 py-2 ring transition-colors focus:outline-none md:w-[80%]",
//                 )}
//               />
//             </div>

//             <div className="flex flex-col gap-1">
//               <label htmlFor="mobile">Phone</label>
//               <input
//                 type="tel"
//                 id="mobile"
//                 name="mobile"
//                 placeholder="Enter your phone number"
//                 autoComplete="tel"
//                 className={cn(
//                   "ring-secondary placeholder:text-primary-text focus:ring-accent w-full rounded-lg bg-transparent px-3 py-2 ring transition-colors focus:outline-none md:w-[80%]",
//                 )}
//               />
//             </div>
//           </div>
//         </div>{" "}
//         {/* Service Selection */}
//         <div className="mt-8 w-full space-y-3">
//           <h3 className="mt-2 text-xl font-medium">Service Selection</h3>

//           <div className="relative mx-auto max-w-2xl space-y-2">
//             <label
//               htmlFor="service"
//               className="text-primary-text mb-1.5 block tracking-wide"
//             >
//               Select a Service Category
//             </label>
//             <div className="group/select relative">
//               <select
//                 id="service"
//                 name="service"
//                 value={serviceType}
//                 onChange={(e) => {
//                   setServiceType(e.target.value);
//                   setSelectedItems([]);
//                 }}
//                 className="peer/select border-secondary bg-primary focus:border-accent w-full appearance-none rounded-lg border px-4 py-3 pr-10 transition-all duration-300 outline-none"
//               >
//                 <option value="" disabled>
//                   Choose a service category...
//                 </option>
//                 {Object.keys(serviceData).map((category) => (
//                   <option
//                     key={category}
//                     value={category}
//                     className="bg-primary py-2"
//                   >
//                     {category}
//                   </option>
//                 ))}
//               </select>

//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
//                 <svg
//                   className="text-text/60 h-4 w-4 fill-current transition-all duration-300 group-focus-within/select:rotate-180"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Available Services */}
//           {serviceType && (
//             <div>
//               <h4 className="tet-xl mb-4 font-medium">
//                 Available {serviceType.toUpperCase()} Services
//               </h4>

//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                 {serviceData[serviceType as keyof typeof serviceData].map(
//                   (service, index) => (
//                     <Fade
//                       key={service.id}
//                       cascade
//                       delay={index * 100}
//                       duration={300}
//                       triggerOnce
//                     >
//                       <div className="border-secondary hover:border-accent group bg-primary h-full rounded-lg border p-3 transition-all ease-in-out">
//                         <div className="mb-4 flex items-start justify-between">
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2">
//                               <h4 className="text-xs-sm font-medium">
//                                 {service.name}
//                               </h4>
//                               <span>{service.category}</span>
//                             </div>
//                             <p className="text-xs text-gray-500">
//                               {service.description}
//                             </p>
//                             <span className="bg-secondary rounded-lg p-1.5">
//                               {service.basePrice}/{service.unit}
//                             </span>
//                           </div>

//                           <button
//                             onClick={() =>
//                               AddItem({
//                                 item: service,
//                                 selectedItems,
//                                 setSelectedItems,
//                               })
//                             }
//                             className="bg-accent text-primary translate-y-2 transform cursor-pointer rounded-md p-0.5 transition-all duration-300 ease-in-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 md:invisible md:opacity-0"
//                           >
//                             <Plus className="transform transition-transform duration-300 group-hover:rotate-90" />
//                           </button>
//                         </div>

//                         {/* show available options */}
//                         {service.options && (
//                           <div className="text-primary-text text-xs">
//                             {Object.entries(service.options).map(
//                               ([key, values]) => (
//                                 <div key={key}>
//                                   <strong className="uppercase">{key}:</strong>{" "}
//                                   {values.join(", ")}
//                                 </div>
//                               ),
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </Fade>
//                   ),
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//         {/* selected items */}
//         <div className="border-secondary mt-8 overflow-hidden rounded-lg border p-4 shadow-sm">
//           <div className="mb-6 flex items-center justify-between">
//             <h3 className="text-xl font-semibold">
//               Selected Items
//               <span className="text-accent ml-2 text-sm">
//                 ({selectedItems.length})
//               </span>
//             </h3>

//             {/* Clear Selection */}
//             {selectedItems.length > 1 && (
//               <Fade direction="left" duration={200} triggerOnce>
//                 <button
//                   onClick={() => setSelectedItems([])}
//                   className="group hover:bg-error/10 relative cursor-pointer rounded-full p-2 transition-all duration-300"
//                   title="Clear all items"
//                 >
//                   <span className="bg-error/5 absolute -inset-2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//                   <Trash2
//                     size={18}
//                     className="text-error relative transition-all duration-300 group-hover:scale-110 group-hover:animate-[shake_0.5s_ease-in-out]"
//                   />
//                 </button>
//               </Fade>
//             )}
//           </div>

//           {selectedItems.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-8">
//               <p className="text-primary-text flex items-center gap-2 text-sm">
//                 {" "}
//                 <Pencil size={18} /> No items selected yet
//               </p>
//               <p className="text-primary-text/60 text-xs">
//                 Choose services from above to get started
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               {selectedItems.map((item, index) => (
//                 <div
//                   key={`${item.id}-${index}`}
//                   className="group/item border-secondary/50 bg-primary/50 hover:border-accent/30 group relative rounded-xl border p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md"
//                 >
//                   {/* Delete Button */}
//                   <button
//                     onClick={() => removeItem({ index, setSelectedItems })}
//                     className="bg-primary group-hover/item:bg-error/5 group/button hover:bg-error/25 absolute -top-1.5 -right-1.5 transform cursor-pointer rounded-full p-1 shadow-md transition-all duration-300 group-hover/item:animate-[shake_0.3s_ease-in-out] hover:animate-none"
//                   >
//                     <span className="bg-error/5 absolute -inset-2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//                     <Trash2
//                       size={16}
//                       className="text-error group-hover/button:scale-110"
//                     />
//                   </button>

//                   <Fade direction="up" duration={200} triggerOnce>
//                     {/* Item Header */}
//                     <div className="space-y-0.5">
//                       <h4 className="font-medium tracking-tight">
//                         {item.name}
//                       </h4>
//                       <p className="text-primary-text/80 text-xs">
//                         {item.description}
//                       </p>
//                     </div>

//                     {/* Options Section */}
//                     {item.options &&
//                       Object.keys(item.selectedOptions).length > 0 && (
//                         <div className="bg-primary mb-4 rounded-lg p-3">
//                           {Object.entries(item.options).map(
//                             ([optionKey, optionValues]) => (
//                               <div
//                                 key={optionKey}
//                                 className="relative mb-2 last:mb-0"
//                               >
//                                 <label className="text-accent mb-0.5 block text-xs font-medium tracking-wide">
//                                   {optionKey.charAt(0).toUpperCase() +
//                                     optionKey.slice(1)}
//                                 </label>
//                                 <select
//                                   name={item.selectedOptions[optionKey]}
//                                   id={item.selectedOptions[optionKey]}
//                                   value={item.selectedOptions[optionKey]}
//                                   onChange={(e) =>
//                                     updateItemOption({
//                                       index,
//                                       optionKey,
//                                       optionValue: e.target.value,
//                                       setSelectedItems,
//                                     })
//                                   }
//                                   className="border-secondary bg-primary focus:border-accent relative w-full appearance-none rounded-md border px-3 py-1.5 text-xs transition-colors outline-none"
//                                 >
//                                   {optionValues?.map((value) => (
//                                     <option key={value} value={value}>
//                                       {value}
//                                     </option>
//                                   ))}
//                                 </select>
//                                 <div className="pointer-events-none absolute inset-y-0 top-5 right-2 flex items-center">
//                                   <svg
//                                     className="text-primary-text h-4 w-4 fill-current"
//                                     viewBox="0 0 20 20"
//                                   >
//                                     <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//                                   </svg>
//                                 </div>
//                               </div>
//                             ),
//                           )}
//                         </div>
//                       )}

//                     {/* Quantity and Price Controls */}
//                     <div className="flex items-center justify-between gap-4">
//                       <div className="flex items-center space-x-2.5">
//                         <button
//                           onClick={() =>
//                             updateQuantity({
//                               index,
//                               quantity: Math.max(1, item.quantity - 1),
//                               setSelectedItems,
//                             })
//                           }
//                           className="bg-secondary/50 hover:bg-secondary flex size-8 cursor-pointer items-center justify-center rounded-md transition-colors"
//                         >
//                           <Minus size={14} />
//                         </button>

//                         <span className="text-primary-text/70 w-8 text-center font-medium">
//                           {item.quantity}
//                         </span>

//                         <button
//                           onClick={() =>
//                             updateQuantity({
//                               index,
//                               quantity: (item.quantity || 1) + 1,
//                               setSelectedItems,
//                             })
//                           }
//                           className="bg-secondary/50 hover:bg-secondary flex h-8 w-8 cursor-pointer items-center justify-center rounded-md transition-colors"
//                         >
//                           <Plus size={14} />
//                         </button>
//                       </div>

//                       <div>
//                         <input
//                           type="number"
//                           value={item.customPrice || item.basePrice}
//                           onChange={(e) =>
//                             updateCustomPrice({
//                               index,
//                               customPrice: parseFloat(e.target.value),
//                               setSelectedItems,
//                             })
//                           }
//                           min={item.basePrice}
//                           step={0.1}
//                           className="border-secondary/30 focus:border-accent text-xs-sm max-w-18 rounded-md border bg-transparent p-2 text-center outline-none"
//                         />
//                         <label
//                           htmlFor=""
//                           className="text-primary-text ml-1 text-xs font-medium"
//                         >
//                           / {item.unit}
//                         </label>
//                       </div>
//                     </div>

//                     {/* Total Amount */}
//                     <div className="bg-accent/10 mt-4 flex items-center justify-between rounded-lg p-3">
//                       <span className="text-accent/80 text-xs font-medium uppercase">
//                         Item Total:
//                       </span>
//                       <span className="text-accent font-bold">
//                         KShs.{" "}
//                         {(item.customPrice !== undefined
//                           ? item.customPrice
//                           : item.basePrice * item.quantity
//                         ).toFixed(2)}
//                       </span>
//                     </div>
//                   </Fade>
//                 </div>
//               ))}
//             </div>
//           )}
//           {selectedItems.length > 0 && (
//             <div className="border-secondary/20 mt-8 border-t pt-6">
//               <div className="flex flex-col items-end space-y-4">
//                 <div className="flex items-center gap-2">
//                   <p className="text-text/60 font-medium">Total Amount:</p>
//                   <p className="text-accent max-w-max text-2xl font-bold">
//                     KShs. {totalAmount(selectedItems).toFixed(2)}
//                   </p>
//                 </div>

//                 <button className="group bg-accent text-background relative cursor-pointer overflow-hidden rounded-full px-6 py-3 font-bold uppercase transition-all duration-300 hover:pr-8 hover:pl-4">
//                   <span className="z-10 transition-all duration-300 group-hover:-translate-x-1">
//                     Submit Order
//                   </span>
//                   <svg
//                     className="absolute top-1/2 right-4 size-4 -translate-y-1/2 transform opacity-0 transition-all duration-300 group-hover:right-3 group-hover:opacity-100"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M14 5l7 7m0 0l-7 7m7-7H3"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Article;
