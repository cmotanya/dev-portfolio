// import React, { useMemo, useState } from "react";
// import { serviceCategories } from "../Quote/services";
// import { QCategory, QItem, QSelectedItem } from "@/lib/types";
// import { cn } from "@/lib/utils";
// import { ArrowRight } from "lucide-react";
// import { Fade } from "react-awesome-reveal";

// interface ItemSelectionStepProps {
//   selectedServiceId: string;
//   onUpdateItems: (items: QSelectedItem[]) => void;
//   selectedItems: QSelectedItem[];
//   onNext?: () => void;
// }

// const ItemSelectionStep: React.FC<ItemSelectionStepProps> = ({
//   selectedServiceId,
//   onUpdateItems,
//   selectedItems,
//   onNext,
// }) => {
//   const [isButtonIdClicked, setIsButtonIdClicked] = useState<string | null>(
//     null,
//   );

//   const category: QCategory | undefined = serviceCategories.find(
//     (cat: QSelectedItem) => cat.id === selectedServiceId,
//   );

//   // filter items based on selected system type
//   const filteredItems = useMemo(() => {
//     if (!category) return [];

//     return category.items;
//   }, [category]);

//   // handle quantity changes for item
//   const handleToggleItem = (itemId: QItem) => {
//     const availableItems = selectedItems.find((item) => item.id === itemId.id);

//     setIsButtonIdClicked(itemId.id);

//     if (availableItems) {
//       onUpdateItems(selectedItems.filter((item) => item.id !== itemId.id));
//     } else {
//       onUpdateItems([
//         ...selectedItems,
//         {
//           id: itemId.id,
//           name: itemId.name,
//           description: itemId.description,
//           quantity: 1,
//           unit: itemId.unit,
//         },
//       ]);
//     }

//     setTimeout(() => {
//       setIsButtonIdClicked(null);
//     }, 200);
//   };

//   const canProceed = () => selectedItems.some((item) => item.quantity > 0);

//   return (
//     <div className="">
//       <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
//         <h2 className="from-accent via-tertiary to-secondary bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent uppercase">
//           Select Items for {category?.name}
//         </h2>
//       </div>
//       <p className="text-secondary-text">
//         Choose the items you need for your installation.
//       </p>

//       <div className="container grid grid-cols-1 gap-4 overflow-hidden md:grid-cols-3">
//         <Fade direction="up" triggerOnce cascade damping={0.5} duration={250}>
//           {filteredItems.map((item) => {
//             const isSelected = selectedItems.find(
//               (sItem) => sItem.id === item.id && sItem.quantity > 0,
//             );

//             return (
//               <div
//                 key={item.id}
//                 className={cn(
//                   "bg-background border-secondary/30 relative flex items-center rounded-xl border p-2 shadow-md transition-all duration-200 md:hover:-translate-y-1",
//                   isSelected
//                     ? "bg-secondary/30 translate-y-0"
//                     : "hover:shadow-lg",

//                   isButtonIdClicked === item.id &&
//                     "-translate-y-1 md:translate-y-0",
//                 )}
//               >
//                 <div className="">
//                   <h3 className="text-primary/70 text-xl font-semibold">
//                     {item.name}
//                   </h3>
//                   <p className="text-secondary-text text-sm font-medium">
//                     {item.description}
//                   </p>
//                 </div>

//                 <button
//                   onClick={() => handleToggleItem(item)}
//                   className={cn(
//                     "absolute top-0.5 right-0.5 rounded-full px-2 py-1 text-xs font-semibold backdrop-blur-md",
//                     isSelected
//                       ? "bg-tertiary text-background"
//                       : "bg-secondary/20 text-primary border-secondary/40 hover:bg-secondary/40 border",
//                   )}
//                 >
//                   {isSelected ? "Remove" : "Add"}
//                 </button>
//               </div>
//             );
//           })}
//         </Fade>
//       </div>

//       {/* button to go to next step */}
//       <button
//         onClick={onNext}
//         disabled={!canProceed}
//         className="border-secondary/50 group text-primary bg-secondary/30 absolute right-2 bottom-2 ml-0 flex items-center gap-1 rounded-full border p-3 font-semibold md:right-6 md:bottom-5.5"
//       >
//         Proceed to Review
//         <ArrowRight
//           size={16}
//           className="transition-all duration-300 ease-out group-hover:translate-x-1.5 group-active:translate-x-1"
//         />
//       </button>
//     </div>
//   );
// };

// export default ItemSelectionStep;
