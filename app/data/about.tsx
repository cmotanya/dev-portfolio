import { SolutionOption } from "@/lib/types";
import { Globe, Shield } from "lucide-react";

export const about = [
  {
    name: "Web Development",

    src: "/about/1.jpg",
  },
  {
    name: "CCTV & Security",
    src: "/about/2.webp",
  },
  {
    name: "Network Services",
    src: "/about/3.jpg",
  },
  {
    name: "Data Analysis",
    src: "/about/4.jpg",
  },
];

export const securityOptions: SolutionOption[] = [
  {
    id: "residential",
    title: "Residential Security",
    description:
      "Protect your home with customized security solutions designed for peace of mind and family safety.",
    icon: <Shield size={24} />,
  },
  {
    id: "small-business",
    title: "Business Enterprise",
    description:
      "Affordable security systems for retail shops, offices, and commercial establishments.",
    icon: <Shield size={24} />,
  },
];

export const webOptions: SolutionOption[] = [
  {
    id: "informational",
    title: "Informational Website",
    description:
      "Professional website to showcase your business with essential information and contact details.",
    icon: <Globe size={24} />,
  },
  {
    id: "business",
    title: "Interactive Business Site",
    description:
      "Dynamic website with content management, forms, and interactive elements for user engagement.",
    icon: <Globe size={24} />,
  },
];

export const siteAssessment = [
  { description: "Free onsite evaluation to understand your security needs" },
  { description: "Tailored security solution based on your requirements" },
  { description: "Comprehensive site assessment to identify vulnerabilities" },
  { description: "Recommendations for optimal security measures" },
  { description: "Detailed report outlining findings and suggestions" },
];

export const webDevProcess = [
  { description: "Understanding your business and goals" },
  { description: "Creating mockups and wireframes" },
  { description: "Building your custom solution" },
  { description: "Going live with ongoing support" },
];