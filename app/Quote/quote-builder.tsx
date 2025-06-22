// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils"; // Assuming this utility is available
// // import { Service, SelectedItem, QuoteRequest, Item } from "../types";
// // import { services, serviceCategories } from "../data/services";
// import { ArrowLeft, CheckCircle, Lightbulb, User } from "lucide-react"; // Common icons for steps
// // Note: Specific icons like Camera, Server, Globe, Fingerprint, PhoneCall are used in services data,
// // ensure they are imported/available in your project's main components/pages that render this.

// // --- Step 1: Service Selection Component ---
// interface ServiceSelectionStepProps {
//   onSelectService: (serviceId: string) => void;
//   selectedServiceId: string | null;
// }

// const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({
//   onSelectService,
//   selectedServiceId,
// }) => (
//   <div className="space-y-8">
//     <h2 className="text-3xl font-bold text-slate-800">
//       <Lightbulb className="mr-3 inline-block text-blue-600" size={32} />
//       Choose Your Service
//     </h2>
//     <p className="max-w-2xl text-lg text-slate-600">
//       Select the type of installation or service you need a quote for.
//     </p>
//     <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//       {services.map((service) => {
//         const Icon = service.icon; // Get the Lucide icon component
//         return (
//           <button
//             key={service.id}
//             onClick={() => onSelectService(service.id)}
//             className={cn(
//               "flex flex-col items-center rounded-2xl border-2 p-8 transition-all duration-300",
//               "shadow-sm hover:-translate-y-1 hover:shadow-lg",
//               selectedServiceId === service.id
//                 ? "border-blue-600 bg-blue-50/70 text-blue-800 ring-2 ring-blue-500"
//                 : "border-slate-200 bg-white/80 text-slate-700 hover:border-blue-300",
//             )}
//           >
//             <Icon
//               size={48}
//               className={cn(
//                 "mb-4 transition-colors duration-300",
//                 selectedServiceId === service.id
//                   ? "text-blue-600"
//                   : "text-slate-500 group-hover:text-blue-500",
//               )}
//             />
//             <h3 className="mb-2 text-xl font-semibold">{service.name}</h3>
//             <p className="text-center text-sm text-slate-600">
//               {service.description}
//             </p>
//           </button>
//         );
//       })}
//     </div>
//   </div>
// );

// // --- Step 2: Item Selection Component ---
// interface ItemSelectionStepProps {
//   selectedServiceId: string;
//   onUpdateItems: (items: SelectedItem[]) => void;
//   selectedItems: SelectedItem[];
//   onNext: () => void;
// }

// const ItemSelectionStep: React.FC<ItemSelectionStepProps> = ({
//   selectedServiceId,
//   onUpdateItems,
//   selectedItems,
//   onNext,
// }) => {
//   const category = serviceCategories.find(
//     (cat) => cat.id === selectedServiceId,
//   );

//   // Filtered items now simply return all items for the selected category
//   const getFilteredItems = useMemo(() => {
//     if (!category) return [];
//     return category.items;
//   }, [category]);

//   // Handles adding or removing an item (sets quantity to 1 or 0)
//   const handleToggleItem = (itemDef: Item) => {
//     const existingItem = selectedItems.find((item) => item.id === itemDef.id);

//     if (existingItem) {
//       // If item exists, remove it (set quantity to 0 and filter out)
//       onUpdateItems(selectedItems.filter((item) => item.id !== itemDef.id));
//     } else {
//       // If item does not exist, add it with quantity 1
//       onUpdateItems([
//         ...selectedItems,
//         {
//           id: itemDef.id,
//           name: itemDef.name,
//           description: itemDef.description,
//           unit: itemDef.unit,
//           quantity: 1, // Quantity is always 1 when added
//         },
//       ]);
//     }
//   };

//   // Condition to enable "Proceed to Review" button: at least one item selected (quantity > 0)
//   const isNextEnabled = selectedItems.some((item) => item.quantity > 0);

//   return (
//     <div className="space-y-8">
//       <h2 className="text-3xl font-bold text-slate-800">
//         <CheckCircle className="mr-3 inline-block text-green-600" size={32} />
//         Select Options for {category?.name}
//       </h2>
//       <p className="max-w-2xl text-lg text-slate-600">
//         Choose the installation package or specific items you'd like to include
//         in your quote request.
//       </p>

//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//         {getFilteredItems.map((item) => {
//           const isSelected = selectedItems.some(
//             (sItem) => sItem.id === item.id && sItem.quantity > 0,
//           );

//           return (
//             <div
//               key={item.id}
//               className={cn(
//                 "rounded-xl border-2 p-6 transition-all duration-200",
//                 isSelected
//                   ? "border-blue-600 bg-blue-50/70 shadow-md" // Highlight active selection
//                   : "border-slate-200 bg-white/80 hover:border-blue-300",
//               )}
//             >
//               <h3 className="mb-2 text-xl font-semibold text-slate-900">
//                 {item.name}
//               </h3>
//               <p className="mb-3 text-sm text-slate-600">{item.description}</p>
//               <div className="mt-4 flex items-center justify-end">
//                 {" "}
//                 {/* Removed unit text, justified button right */}
//                 {/* Single Add/Remove button */}
//                 <button
//                   onClick={() => handleToggleItem(item)}
//                   className={cn(
//                     "rounded-md px-6 py-2 font-semibold transition-colors",
//                     isSelected
//                       ? "bg-red-500 text-white hover:bg-red-600" // Deselect button
//                       : "bg-blue-500 text-white hover:bg-blue-600", // Add button
//                   )}
//                 >
//                   {isSelected ? "Remove" : "Add"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="sticky bottom-0 mt-8 flex items-center justify-end rounded-t-lg border-t border-slate-200 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
//         <button
//           onClick={onNext}
//           disabled={!isNextEnabled}
//           className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           Proceed to Review
//         </button>
//       </div>
//     </div>
//   );
// };

// // --- Step 3: Review & Contact Component (Minor change to review list) ---
// interface ReviewContactStepProps {
//   selectedService: Service;
//   selectedItems: SelectedItem[];
//   onGoBack: () => void;
//   onSubmitQuote: (quote: QuoteRequest) => void;
// }

// const ReviewContactStep: React.FC<ReviewContactStepProps> = ({
//   selectedService,
//   selectedItems,
//   onGoBack,
//   onSubmitQuote,
// }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [notes, setNotes] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     // When submitting, filter out only items with quantity > 0
//     const finalSelectedItems = selectedItems.filter(
//       (item) => item.quantity > 0,
//     );

//     const quoteData: QuoteRequest = {
//       serviceId: selectedService.id,
//       selectedItems: finalSelectedItems, // Send only relevant items
//       notes,
//       contact: { name, email, phone },
//     };

//     // --- Replace with your actual API call to send the selected items ---
//     try {
//       console.log("Submitting Quote Request:", quoteData);
//       // Simulate API call delay
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       alert(
//         "Your quote request has been sent! We will review your selections and contact you with a detailed quotation soon.",
//       );
//       onSubmitQuote(quoteData); // Callback to reset state or navigate to a thank you page
//     } catch (error) {
//       console.error("Error submitting quote request:", error);
//       alert("Failed to submit quote request. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const isFormValid =
//     name && email && phone && selectedItems.some((item) => item.quantity > 0);

//   return (
//     <div className="space-y-8">
//       <h2 className="text-3xl font-bold text-slate-800">
//         <User className="mr-3 inline-block text-purple-600" size={32} />
//         Review Your Selections & Request Quote
//       </h2>
//       <p className="max-w-2xl text-lg text-slate-600">
//         Please review the items you've selected and provide your contact
//         information. We'll get back to you with a personalized quotation.
//       </p>

//       {/* Quote Summary (without prices) */}
//       <div className="rounded-xl border border-slate-200 bg-white/80 p-6 shadow-md">
//         <h3 className="mb-4 text-2xl font-bold text-slate-900">
//           Items Selected for {selectedService.name}
//         </h3>
//         {selectedItems.length > 0 &&
//         selectedItems.some((item) => item.quantity > 0) ? ( // Check for items with quantity > 0
//           <ul className="mb-6 space-y-2">
//             {selectedItems
//               .filter((item) => item.quantity > 0)
//               .map(
//                 (
//                   item, // Filter for review
//                 ) => (
//                   <li
//                     key={item.id}
//                     className="flex items-center justify-between text-slate-700"
//                   >
//                     <span className="font-medium">
//                       {item.name}{" "}
//                       {item.quantity > 1 ? `(x${item.quantity})` : ""}{" "}
//                       {/* Only show quantity if > 1 */}
//                     </span>
//                     {/* No unit display here as per previous request */}
//                   </li>
//                 ),
//               )}
//           </ul>
//         ) : (
//           <p className="text-slate-500 italic">
//             No items selected. Please go back to select items.
//           </p>
//         )}
//       </div>

//       {/* Contact Form */}
//       <div className="space-y-4 rounded-xl border border-slate-200 bg-white/80 p-6 shadow-md">
//         <h3 className="mb-4 text-2xl font-bold text-slate-900">
//           Your Contact Information
//         </h3>
//         <div>
//           <label
//             htmlFor="name"
//             className="mb-2 block font-medium text-slate-700"
//           >
//             Full Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full rounded-md border border-slate-300 p-3 transition-all focus:border-blue-500 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="email"
//             className="mb-2 block font-medium text-slate-700"
//           >
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full rounded-md border border-slate-300 p-3 transition-all focus:border-blue-500 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="phone"
//             className="mb-2 block font-medium text-slate-700"
//           >
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             id="phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full rounded-md border border-slate-300 p-3 transition-all focus:border-blue-500 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="notes"
//             className="mb-2 block font-medium text-slate-700"
//           >
//             Additional Notes (Optional)
//           </label>
//           <textarea
//             id="notes"
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             rows={4}
//             className="w-full rounded-md border border-slate-300 p-3 transition-all focus:border-blue-500 focus:ring-blue-500"
//           ></textarea>
//         </div>
//       </div>

//       <div className="mt-8 flex items-center justify-between">
//         <button
//           onClick={onGoBack}
//           className="rounded-lg bg-slate-200 px-6 py-3 font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-300"
//         >
//           <ArrowLeft size={16} className="mr-2 inline-block" /> Go Back
//         </button>
//         <button
//           onClick={handleSubmit}
//           disabled={!isFormValid || isSubmitting} // isFormValid already checks for selected items
//           className="rounded-xl bg-gradient-to-r from-green-500 to-teal-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:from-green-600 hover:to-teal-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           {isSubmitting ? "Sending Request..." : "Request My Quote"}
//         </button>
//       </div>
//     </div>
//   );
// };

// // --- Main QuoteBuilder Component ---
// const QuoteBuilder: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
//     null,
//   );
//   // Using a specific key for selectedItems to force re-render/reset when service changes
//   const [selectedItemsKey, setSelectedItemsKey] = useState(0);
//   const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

//   const selectedService = useMemo(
//     () => services.find((s) => s.id === selectedServiceId),
//     [selectedServiceId],
//   );

//   const handleSelectService = (serviceId: string) => {
//     setSelectedServiceId(serviceId);
//     setSelectedItems([]); // Clear selected items when service changes
//     setSelectedItemsKey((prev) => prev + 1); // Increment key to force ItemSelectionStep reset
//     setCurrentStep(2);
//   };

//   const handleUpdateItems = (newItems: SelectedItem[]) => {
//     setSelectedItems(newItems);
//   };

//   const handleGoToNextStep = () => {
//     setCurrentStep((prev) => prev + 1);
//   };

//   const handleGoToPrevStep = () => {
//     setCurrentStep((prev) => prev - 1);
//   };

//   const handleSubmitQuote = (quote: QuoteRequest) => {
//     // Logic after successful submission
//     // Here you would typically clear the form,
//     // display a thank you message, or redirect.
//     setCurrentStep(1); // Reset to start for a new quote
//     setSelectedServiceId(null);
//     setSelectedItems([]);
//     setSelectedItemsKey(0); // Reset key
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12 font-sans text-slate-800 md:py-16">
//       <div className="mx-auto max-w-4xl px-6">
//         {/* Progress Indicator */}
//         <div className="relative mb-12 flex items-center justify-between">
//           <div className="absolute top-1/2 right-0 left-0 h-1 -translate-y-1/2 rounded-full bg-slate-200" />
//           {[1, 2, 3].map((stepNum) => (
//             <div
//               key={stepNum}
//               className={cn(
//                 "relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-bold text-white transition-all duration-300",
//                 currentStep >= stepNum ? "bg-blue-600" : "bg-slate-400",
//                 currentStep > stepNum && "scale-110", // Pulse effect for completed steps
//               )}
//             >
//               {stepNum}
//             </div>
//           ))}
//         </div>

//         {/* Dynamic Step Rendering */}
//         <div className="rounded-2xl border border-slate-200/50 bg-white/70 p-8 shadow-xl backdrop-blur-sm md:p-10">
//           {currentStep === 1 && (
//             <ServiceSelectionStep
//               onSelectService={handleSelectService}
//               selectedServiceId={selectedServiceId}
//             />
//           )}

//           {currentStep === 2 && selectedServiceId && (
//             <ItemSelectionStep
//               key={selectedItemsKey} // Key to force re-mount/reset when service changes
//               selectedServiceId={selectedServiceId}
//               onUpdateItems={handleUpdateItems}
//               selectedItems={selectedItems}
//               onNext={handleGoToNextStep}
//             />
//           )}

//           {currentStep === 3 && selectedService && (
//             <ReviewContactStep
//               selectedService={selectedService}
//               selectedItems={selectedItems}
//               onGoBack={handleGoToPrevStep}
//               onSubmitQuote={handleSubmitQuote}
//             />
//           )}

//           {/* Navigation Buttons (only for step 2 back) */}
//           {currentStep === 2 && (
//             <div className="mt-8 border-t border-slate-200 pt-8">
//               <button
//                 onClick={handleGoToPrevStep}
//                 className="rounded-lg bg-slate-200 px-6 py-3 font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-300"
//               >
//                 <ArrowLeft size={16} className="mr-2 inline-block" /> Back
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuoteBuilder;
