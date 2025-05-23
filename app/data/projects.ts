import { Project } from "@/lib/types";

export const projects: Project[] = [
  // Personal Portfolio Project
  {
    id: 1,
    name: "Personal Portfolio",
    description:
      "A modern, responsive portfolio website built with Next.js and TypeScript. Features include dynamic project showcasing, smooth animations, dark theme, and a contact form with email integration. Implemented best practices for accessibility and performance optimization.",
    image: "/images/project-portfolio.jpg",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveLink: "https://cmotanya.dev",
    githubLink: "https://github.com/cmotanya/dev-portfolio",
  },

  // --- Projects: CCTV and Networking ---
  {
    id: 4,
    name: "CCTV Installation & Security Solutions",
    description:
      "Designed and implemented comprehensive security surveillance systems across multiple residential and commercial properties. Integrated advanced IP cameras with night vision capabilities, configured secure remote access, and established reliable backup systems. Provided client training on system operation and maintenance.",
    image: "/project/1.jpeg",
    tags: [
      "CCTV",
      "Security Systems",
      "IP Cameras",
      "NVR/DVR",
      "Cable Management",
      "Remote Monitoring",
      "Motion Detection",
      "4K Resolution",
    ],
    // No liveLink or githubLink for this type of physical project
  },

  {
    id: 5,
    name: "Office Network Setup",
    description:
      "Deployed and configured a reliable office network infrastructure including router setup, Wi-Fi access points, and secure data cabling. Implemented essential security measures and provided ongoing technical support for seamless business operations.",
    image: "/project/3.webp",
    tags: [
      "Networking",
      "Router Configuration",
      "Wi-Fi Setup",
      "Ethernet Cabling",
      "Switching",
      "Network Security",
      "Installation",
    ],
  },

  // Project for Data Analysis
  {
    id: 3,
    name: "Data Analysis",
    description:
      "A dashboard that allows users to visualize and analyze data from various sources.",
    image: "/project/4.png",
    tags: ["Python", "Pandas", "Matplotlib", "Power Bi", "Jupyter Notebook"],
    githubLink: "https://github.com/cmotanya/churn-prediction-analysis",
  },
];
