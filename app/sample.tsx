// "use client";

// import React, { useState, useEffect } from "react";
// import { nav } from "../data/nav";
// import Link from "next/link";
// import Image from "next/image";
// import { ChevronRight, Menu, X, Sparkles } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { caveat } from "../data/font";
// import { usePathname } from "next/navigation";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const pathname = usePathname();

//   // Handle scroll effect with more sophisticated detection
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrolled = window.scrollY > 10;
//       setIsScrolled(scrolled);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Mouse tracking for interactive effects
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//   const handleCloseMenu = () => setIsMenuOpen(false);

//   return (
//     <>
//       {/* Floating header with glass morphism */}
//       <header
//         className={cn(
//           "fixed top-0 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ease-out",
//           isScrolled ? "top-4 w-[95%] max-w-6xl" : "top-0 w-full",
//         )}
//       >
//         <div
//           className={cn(
//             "relative overflow-hidden transition-all duration-500 ease-out",
//             isScrolled
//               ? "rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl"
//               : "border-secondary/50 border-b bg-transparent backdrop-blur-sm",
//           )}
//         >
//           {/* Dynamic gradient background */}
//           <div
//             className="absolute inset-0 opacity-30 transition-opacity duration-700"
//             style={{
//               background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
//             }}
//           />

//           {/* Animated border gradient */}
//           <div
//             className={cn(
//               "absolute inset-0 opacity-0 transition-opacity duration-500",
//               isScrolled && "opacity-100",
//             )}
//           >
//             <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-[1px]">
//               <div className="h-full w-full rounded-2xl bg-black/40" />
//             </div>
//           </div>

//           <div className="relative z-10 px-6 py-4">
//             <div className="flex items-center justify-between">
//               {/* Enhanced Logo Section */}
//               <Link href="/" className="group flex items-center gap-4">
//                 <div className="relative">
//                   {/* Animated rings around avatar */}
//                   <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[1px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
//                     <div className="h-full w-full rounded-full bg-black" />
//                     <div>
//                       {/* Glow effect */}
//                       <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-400/50 via-purple-400/50 to-pink-400/50 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-70" />

//                       <div className="relative">
//                         <Image
//                           src="/avatar.jpg"
//                           alt="Cornelius Motanya"
//                           width={50}
//                           height={50}
//                           className="relative rounded-full border-2 border-white/20 object-cover shadow-xl transition-all duration-300 group-hover:border-white/40"
//                           priority
//                         />
//                         {/* Status indicator */}
//                         <div className="absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center">
//                           <div className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></div>
//                           <div className="relative h-3 w-3 rounded-full bg-green-500 shadow-lg"></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="hidden sm:block">
//                     <h1
//                       className={cn(
//                         "bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-2xl font-bold text-transparent",
//                         caveat.className,
//                       )}
//                     >
//                       Cornelius
//                     </h1>
//                     <p className="flex items-center gap-1 text-sm font-medium text-white/70">
//                       <Sparkles className="h-3 w-3 text-yellow-400" />
//                       Developer & Security Specialist
//                     </p>
//                   </div>
//                 </div>
//               </Link>

//               {/* Enhanced Desktop Navigation */}
//               <nav className="hidden md:block">
//                 <ul className="flex items-center gap-2">
//                   {nav.map((item) => {
//                     const isActive = pathname === item.link;
//                     return (
//                       <li key={item.link}>
//                         <Link
//                           href={item.link}
//                           className="group relative overflow-hidden rounded-xl px-5 py-2.5 transition-all duration-300"
//                         >
//                           {/* Active state background */}
//                           {isActive && (
//                             <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-lg" />
//                           )}

//                           {/* Hover effect */}
//                           <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

//                           {/* Shine effect */}
//                           <div className="absolute inset-0 -translate-x-full rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

//                           <span
//                             className={cn(
//                               "relative z-10 text-sm font-semibold tracking-wide uppercase transition-all duration-300",
//                               isActive
//                                 ? "text-white shadow-sm"
//                                 : "text-white/80 group-hover:text-white",
//                             )}
//                           >
//                             {item.name}
//                           </span>
//                         </Link>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </nav>

//               {/* Enhanced Right Side Actions */}
//               <div className="flex items-center gap-4">
//                 {/* Premium CTA Button */}
//                 <div className="hidden sm:block">
//                   <Link
//                     href="/resume"
//                     className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-[1px] shadow-2xl transition-all duration-300 hover:shadow-blue-500/25"
//                   >
//                     <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300">
//                       <span>Resume</span>
//                       <div>
//                         <ChevronRight className="h-4 w-4" />
//                       </div>
//                     </div>

//                     {/* Shine effect */}
//                     <div className="absolute inset-0 -translate-x-full rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
//                   </Link>
//                 </div>

//                 {/* Enhanced Mobile Menu Button */}
//                 <button
//                   onClick={toggleMenu}
//                   className="group relative overflow-hidden rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 md:hidden"
//                   aria-label="Toggle menu"
//                 >
//                   {isMenuOpen ? (
//                     <div key="close">
//                       <X className="h-5 w-5 text-white" />
//                     </div>
//                   ) : (
//                     <div key="menu">
//                       <Menu className="h-5 w-5 text-white" />
//                     </div>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Enhanced Mobile Menu */}
//       {isMenuOpen && (
//         <>
//           {/* Backdrop */}
//           <div
//             className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
//             onClick={handleCloseMenu}
//           />

//           {/* Menu Panel */}
//           <nav className="fixed top-20 right-4 z-50 w-80 overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-2 shadow-2xl backdrop-blur-2xl">
//             {/* Menu gradient background */}
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

//             <div className="relative z-10">
//               <ul className="space-y-1">
//                 {nav.map((item) => {
//                   const isActive = pathname === item.link;
//                   return (
//                     <li key={item.link}>
//                       <Link
//                         href={item.link}
//                         onClick={handleCloseMenu}
//                         className={cn(
//                           "group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300",
//                           isActive
//                             ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white shadow-lg"
//                             : "text-white/80 hover:bg-white/10 hover:text-white",
//                         )}
//                       >
//                         <span className="text-xl transition-transform duration-300 group-hover:scale-110">
//                           {item.icon}
//                         </span>
//                         <span className="font-medium">{item.name}</span>
//                         {isActive && (
//                           <div className="ml-auto h-2 w-2 rounded-full bg-blue-400" />
//                         )}
//                       </Link>
//                     </li>
//                   );
//                 })}

//                 {/* Resume link in mobile menu */}
//                 <li className="border-t border-white/10 pt-2">
//                   <Link
//                     href="/resume"
//                     onClick={handleCloseMenu}
//                     className="group flex items-center gap-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-white transition-all duration-300 hover:from-blue-500 hover:to-purple-500"
//                   >
//                     <Sparkles className="h-5 w-5" />
//                     <span className="font-semibold">View Resume</span>
//                     <div className="ml-auto">
//                       <ChevronRight className="h-4 w-4" />
//                     </div>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </nav>
//         </>
//       )}
//     </>
//   );
// };
