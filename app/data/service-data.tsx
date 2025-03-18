// data/services.ts
import { ServiceData } from "@/lib/types";

export const servicesData: ServiceData[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Professional web development services tailored to your business needs.",
    fullDescription: `I offer comprehensive web development services that combine creativity with technical expertise to deliver exceptional digital experiences. From responsive design to full-stack development, I create websites that not only look stunning but also perform flawlessly.

My approach focuses on user experience, performance optimization, and scalable architecture to ensure your website stands out in today's competitive digital landscape. Whether you need a simple landing page or a complex web application, I deliver solutions that align with your business goals.

I stay current with the latest technologies and best practices in web development to provide cutting-edge solutions that are both innovative and reliable. My development process is collaborative, transparent, and focused on achieving your vision while meeting the highest standards of quality.`,
    imagePath: "/services/web-development.jpg",
    skills: [{ name: "React" }, { name: "Next.js" }, { name: "Node.js" }],
    iconColor: "text-blue-600",
    category: "webDevelopment",
  },
  {
    id: "cctv-security",
    title: "CCTV & Security",
    description:
      "Comprehensive security solutions to protect your property and assets.",
    fullDescription: `I provide state-of-the-art CCTV and security solutions designed to protect your property, assets, and people. My security systems combine cutting-edge technology with strategic implementation to create comprehensive protection tailored to your specific needs.

My expertise covers the full spectrum of security services, from initial security assessment to system design, installation, and ongoing maintenance. I work with leading brands and technologies to ensure reliable performance and seamless integration with your existing infrastructure.

Security is not just about installing cameras; it's about creating a strategic system that addresses vulnerabilities, deters potential threats, and provides you with peace of mind. I take the time to understand your unique security challenges and develop customized solutions that balance security needs with practical considerations.`,
    imagePath: "/services/cctv-4.jpg",
    skills: [{ name: "CCTV Installation" }, { name: "Security Assessment" }],
    iconColor: "text-red-600",
    category: "cctvSecurity",
  },
  {
    id: "network-services",
    title: "Network Services",
    description: "Reliable networking solutions for businesses of all sizes.",
    fullDescription: `I deliver comprehensive network services that form the backbone of your digital infrastructure. From initial design to implementation and ongoing management, I provide reliable networking solutions that keep your business connected, secure, and performing optimally.

My approach to networking is both strategic and practical, focusing on creating systems that support your current needs while allowing for future growth and adaptation. I understand that network reliability is critical to your operations, which is why I implement redundancy measures and monitoring systems to ensure maximum uptime.

Whether you need a complete network overhaul, targeted improvements to address specific issues, or ongoing support for your existing infrastructure, I bring technical expertise and a problem-solving mindset to every project. My network solutions are designed to be robust, secure, and aligned with industry best practices.`,
    imagePath: "/services/network-2.jpg",
    skills: [{ name: "Network Design" }, { name: "Firewall Configuration" }],
    iconColor: "text-green-600",
    category: "networkServices",
  },
  {
    id: "data-analysis",
    title: "Data Analysis",
    description:
      "Advanced data analysis and visualization to drive data-driven decisions.",
    fullDescription: `I provide comprehensive data analysis services to help you make informed decisions based on actionable insights. From data cleaning and preprocessing to advanced statistical analysis and machine learning, I transform raw data into meaningful information.

My expertise includes data visualization using tools like Tableau, Power BI, and Python libraries such as Matplotlib and Seaborn. I also specialize in predictive modeling, trend analysis, and creating interactive dashboards to present complex data in an easy-to-understand format.

Whether you need to analyze customer behavior, optimize business processes, or uncover hidden patterns in your data, I deliver solutions that align with your goals and drive measurable results.`,
    imagePath: "/services/data-analysis.jpg",
    skills: [
      { name: "Python" },
      { name: "Tableau" },
      { name: "Machine Learning" },
    ],
    iconColor: "text-purple-600",
    category: "dataAnalysis",
  },
];
