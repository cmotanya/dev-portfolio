import { Project } from "@/lib/types";

export const projects: Project[] = [
  // Personal Portfolio Project
  {
    id: 1,
    name: "Personal Portfolio",
    description:
      "This very website! Built to showcase my projects, skills, and connect with others.",
    image: "/images/project-portfolio.jpg",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveLink: "https://cmotanya.dev",
    githubLink: "https://github.com/cmotanya/dev-portfolio",
  },

  {
    id: 2,
    name: "Simple Weather App",
    description:
      "A clean and responsive web application that fetches and displays current weather data based on user location or city search.",
    image: "/images/project-weather-app.jpg",
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Weather API",
      "Fetch API",
      "Responsive Design",
    ],
    githubLink: "https://github.com/cmotanya/weather-app",
  },

  // Project for Data Analysis
  {
    id: 3,
    name: "Data Analysis Dashboard",
    description:
      "A dashboard that allows users to visualize and analyze data from various sources.",
    image: "/images/project-data-analysis.jpg",
    tags: ["Python", "Pandas", "Matplotlib", "Power Bi", "Jupyter Notebook"],
    githubLink: "https://github.com/cmotanya/churn-prediction-analysis",
  },

  // --- Projects: CCTV and Networking ---
  {
    id: 4,
    name: "Residential CCTV System Installation",
    description:
      "Designed and installed a comprehensive security camera system for a residential property, including camera placement, cabling, NVR setup, and remote viewing configuration.",
    image: "/images/project-cctv-install.jpg",
    tags: [
      "CCTV",
      "Security Systems",
      "IP Cameras",
      "NVR/DVR",
      "Cable Management",
      "Networking Basics",
      "Remote Access",
      "Installation",
    ],
    // No liveLink or githubLink for this type of physical project
  },
  {
    id: 5,
    name: "Small Office Network Setup",
    description:
      "Provided complete network infrastructure setup for a small office, including router/firewall configuration, structured cabling for wired connections, and secure Wi-Fi deployment.",
    image: "/images/project-networking-install.jpg",
    tags: [
      "Networking",
      "Router Configuration",
      "Firewall",
      "Wi-Fi Setup",
      "Ethernet Cabling",
      "Switching",
      "TCP/IP",
      "Network Security",
      "Installation",
    ],
    // No liveLink or githubLink for this type of physical project
  },
];
