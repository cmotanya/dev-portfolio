import { QItem, QService } from "@/lib/types";
import { Camera, Fingerprint, Globe, PhoneCall, Server } from "lucide-react";

export const services: QService[] = [
  {
    id: "cctv",
    name: "CCTV Installation",
    description:
      "Secure your property with state-of-the-art surveillance systems.",
    icon: Camera,
  },
  {
    id: "networking",
    name: "Networking Services",
    description:
      "Reliable and high-speed network setup for homes and businesses.",
    icon: Server,
  },
  {
    id: "website",
    name: "Website Development",
    description:
      "Professional website design and development tailored to your needs.",
    icon: Globe,
  },
  {
    id: "access-control",
    name: "Access Control & Time Attendance",
    description:
      "Manage entry and track attendance with advanced biometric and card systems.",
    icon: Fingerprint,
  },
  {
    id: "ip-phones",
    name: "IP Phone Installations",
    description:
      "Modern VoIP phone systems for clear communication and cost savings.",
    icon: PhoneCall,
  },
];

export const cctvItems: QItem[] = [
  {
    id: "cctv-package-4ip",
    name: "4-Camera IP Installation",
    description:
      "Includes 4 IP cameras, 4-ch NVR, 1TB HDD, standard cabling & installation.",
    unit: "package",
  },
  {
    id: "cctv-package-8ip",
    name: "8-Camera IP Installation",
    description:
      "Includes 8 IP cameras, 8-ch NVR, 2TB HDD, standard cabling & installation.",
    unit: "package",
  },
  {
    id: "cctv-package-4analog",
    name: "4-Camera Analog Installation",
    description:
      "Includes 4 analog cameras, 4-ch DVR, 1TB HDD, standard cabling & installation.",
    unit: "package",
  },
  {
    id: "cctv-package-8analog",
    name: "8-Camera Analog Installation",
    description:
      "Includes 8 analog cameras, 8-ch DVR, 2TB HDD, standard cabling & installation.",
    unit: "package",
  },
  {
    id: "cctv-package-4wireless",
    name: "4-Camera Wireless Installation",
    description: "Includes 4 Wireless cameras, optional WiFi Hub, & app setup.",
    unit: "package",
  },
  {
    id: "cctv-package-custom",
    name: "Customize Your CCTV Installation",
    description:
      "Let us know your specific needs for a tailored CCTV solution.",
    unit: "custom project",
  },
];
