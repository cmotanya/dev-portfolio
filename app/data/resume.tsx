import { CalendarDays, MapPin } from "lucide-react";

export const resumeCV = [
  {
    id: 1,
    title: "FREELANCE: CCTV & Network",
    company: "Self-Employed",
    location: "Mombasa, Kenya",
    date: "2020 - Present",
    icon: { iconDate: <CalendarDays />, iconLocation: <MapPin /> },
    description: [
      "Completed 40+ CCTV installations for residential and commercial clients, including camera setup, wiring, and software configuration",
      "Installed and configured biometric time attendance systems and access control solutions",
      "Set up and troubleshot networks for schools and small businesses, ensuring optimal performance for both wired and wireless systems",
      "Performed hardware repairs and software installations for individual customers",
      "Built lasting client relationships through professional communication and attention to detail",
    ],
  },
  {
    id: 2,
    title: "Sales & Technical Support",
    company: "Ken Computers Ltd.",
    location: "Mombasa, Kenya",
    icon: { iconDate: <CalendarDays />, iconLocation: <MapPin /> },
    date: " 01/2019 - 04/2020",
    description: [
      "Assisted customers in Consistently exceeded sales targets through effective customer engagement strategies",
      "Conducted product demonstrations and provided technical advice on computer hardware, software, and CCTV systems",
      "Improved inventory management, reducing stock discrepancies by 10%",
      "Received recognition for exceptional customer service and satisfaction",
      "Collaborated with team members to achieve collective sales goals",
    ],
  },
];
