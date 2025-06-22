// // data/services.ts
// import { Camera, Server, Globe, Fingerprint, PhoneCall } from "lucide-react"; // Importing new icons
// import { Service, Item } from "./types";

// export const services: Service[] = [
//   {
//     id: "cctv",
//     name: "CCTV Installation",
//     description:
//       "Secure your property with state-of-the-art surveillance systems.",
//     icon: Camera,
//   },
//   {
//     id: "networking",
//     name: "Networking Services",
//     description:
//       "Reliable and high-speed network setup for homes and businesses.",
//     icon: Server,
//   },
//   {
//     id: "website",
//     name: "Website Development",
//     description:
//       "Professional website design and development tailored to your needs.",
//     icon: Globe,
//   },
//   {
//     id: "access-control",
//     name: "Access Control & Time Attendance",
//     description:
//       "Manage entry and track attendance with advanced biometric and card systems.",
//     icon: Fingerprint, // New icon
//   },
//   {
//     id: "ip-phones",
//     name: "IP Phone Installations",
//     description:
//       "Modern VoIP phone systems for clear communication and cost savings.",
//     icon: PhoneCall, // New icon
//   },
// ];

// // Define specific items for different CCTV system types and general items
// const cctvItems: Item[] = [
//   // --- System Type Choices (these are presented first for CCTV) ---
//   {
//     id: "system-ip",
//     name: "IP Camera System (NVR)",
//     description: "High-resolution digital cameras with network video recorder.",
//     unit: "system base",
//     isSystemType: true,
//     systemType: "ip",
//   },
//   {
//     id: "system-analog",
//     name: "Analog Camera System (DVR)",
//     description:
//       "Cost-effective traditional cameras with digital video recorder.",
//     unit: "system base",
//     isSystemType: true,
//     systemType: "analog",
//   },
//   {
//     id: "system-wireless",
//     name: "Wireless WiFi Camera System",
//     description:
//       "Flexible setup with WiFi cameras, often cloud or local SD storage.",
//     unit: "system base",
//     isSystemType: true,
//     systemType: "wireless",
//   },

//   // --- IP Cameras (compatible with "system-ip") ---
//   {
//     id: "cam-ip-dome",
//     name: "IP Dome Camera (4MP)",
//     description: "Indoor/Outdoor, PoE, Night Vision",
//     unit: "per camera",
//     category: "Camera",
//     systemType: "ip",
//     minQuantity: 1,
//   },
//   {
//     id: "cam-ip-bullet",
//     name: "IP Bullet Camera (5MP)",
//     description: "Outdoor, PoE, Weatherproof, Long Range",
//     unit: "per camera",
//     category: "Camera",
//     systemType: "ip",
//     minQuantity: 1,
//   },
//   {
//     id: "cam-ip-ptz",
//     name: "IP PTZ Camera (Pan/Tilt/Zoom)",
//     description: "Motorized control, high zoom, 360 view",
//     unit: "per camera",
//     category: "Camera",
//     systemType: "ip",
//   },

//   // --- Analog Cameras (compatible with "system-analog") ---
//   {
//     id: "cam-analog-dome",
//     name: "Analog Dome Camera (2MP)",
//     description: "Indoor/Outdoor, BNC connection",
//     unit: "per camera",
//     category: "Camera",
//     systemType: "analog",
//     minQuantity: 1,
//   },
//   {
//     id: "cam-analog-bullet",
//     name: "Analog Bullet Camera (2MP)",
//     description: "Outdoor, Weatherproof, BNC connection",
//     unit: "per camera",
//     category: "Camera",
//     systemType: "analog",
//     minQuantity: 1,
//   },

//   // --- Wireless Cameras (compatible with "system-wireless") ---
//   {
//     id: "cam-wifi-indoor",
//     name: "Wireless Indoor Camera (1080p)",
//     description: "WiFi, Two-way audio, SD card slot",
//     unit: "per camera",
//     category: "Camera",
//     systemType: "wireless",
//     minQuantity: 1,
//   },
//   {
//     id: "cam-wifi-outdoor",
//     name: "Wireless Outdoor Camera (1080p)",
//     description: "WiFi, Battery/Solar option, Weatherproof",
//     unit: "per camera",
//     category: "Camera",
//     systemType: "wireless",
//     minQuantity: 1,
//   },

//   // --- Recorders/Hubs (Specific to system type) ---
//   {
//     id: "nvr-4ch",
//     name: "4-Channel NVR",
//     description: "Records up to 4 IP cameras, PoE ports",
//     unit: "per unit",
//     category: "Recorder",
//     systemType: "ip",
//     minQuantity: 1,
//   },
//   {
//     id: "nvr-8ch",
//     name: "8-Channel NVR",
//     description: "Records up to 8 IP cameras, PoE ports",
//     unit: "per unit",
//     category: "Recorder",
//     systemType: "ip",
//     minQuantity: 1,
//   },
//   {
//     id: "dvr-4ch",
//     name: "4-Channel DVR",
//     description: "Records up to 4 analog cameras",
//     unit: "per unit",
//     category: "Recorder",
//     systemType: "analog",
//     minQuantity: 1,
//   },
//   {
//     id: "dvr-8ch",
//     name: "8-Channel DVR",
//     description: "Records up to 8 analog cameras",
//     unit: "per unit",
//     category: "Recorder",
//     systemType: "analog",
//     minQuantity: 1,
//   },
//   {
//     id: "wifi-hub",
//     name: "Wireless WiFi Hub/Bridge",
//     description: "Central hub for multiple WiFi cameras (optional)",
//     unit: "per unit",
//     category: "Wireless Accessory",
//     systemType: "wireless",
//   },

//   // --- Storage (General, but categorize under recorders or accessories if specific to system) ---
//   {
//     id: "hdd-1tb",
//     name: "1TB Surveillance HDD",
//     description: "For NVR/DVR storage",
//     unit: "per unit",
//     category: "Storage",
//   },
//   {
//     id: "hdd-2tb",
//     name: "2TB Surveillance HDD",
//     description: "For NVR/DVR storage",
//     unit: "per unit",
//     category: "Storage",
//   },

//   // --- Cabling (Specific to system type) ---
//   {
//     id: "cabling-ip",
//     name: "CAT6 Cabling",
//     description: "For IP cameras (PoE), per meter",
//     unit: "per meter",
//     category: "Cabling",
//     systemType: "ip",
//   },
//   {
//     id: "cabling-coax",
//     name: "Coaxial Cabling",
//     description: "For Analog cameras, per meter",
//     unit: "per meter",
//     category: "Cabling",
//     systemType: "analog",
//   },

//   // --- Installation & Accessories (Can apply to all system types or be specific) ---
//   {
//     id: "installation-std",
//     name: "Standard Installation",
//     description: "Mounting, cabling, configuration, per camera/device",
//     unit: "per item",
//     category: "Installation",
//   },
//   {
//     id: "monitor-19",
//     name: "19-inch Monitor",
//     description: "For local NVR/DVR viewing",
//     unit: "per unit",
//     category: "Accessory",
//   },
//   {
//     id: "ups-small",
//     name: "Small UPS (Battery Backup)",
//     description: "For recorder power stability",
//     unit: "per unit",
//     category: "Accessory",
//   },
// ];

// const accessControlItems: Item[] = [
//   {
//     id: "ac-controller-1door",
//     name: "1-Door Access Controller",
//     description: "Manages access for a single door",
//     unit: "per unit",
//     minQuantity: 1,
//     category: "Controller",
//   },
//   {
//     id: "ac-controller-2door",
//     name: "2-Door Access Controller",
//     description: "Manages access for two doors",
//     unit: "per unit",
//     minQuantity: 1,
//     category: "Controller",
//   },
//   {
//     id: "ac-controller-4door",
//     name: "4-Door Access Controller",
//     description: "Manages access for four doors",
//     unit: "per unit",
//     minQuantity: 1,
//     category: "Controller",
//   },
//   {
//     id: "reader-fingerprint",
//     name: "Biometric Fingerprint Reader",
//     description: "Fingerprint authentication for access",
//     unit: "per reader",
//     minQuantity: 1,
//     category: "Reader",
//   },
//   {
//     id: "reader-card",
//     name: "RFID Card Reader",
//     description: "Proximity card authentication for access",
//     unit: "per reader",
//     minQuantity: 1,
//     category: "Reader",
//   },
//   {
//     id: "reader-facial",
//     name: "Facial Recognition Terminal",
//     description: "Advanced facial recognition access",
//     unit: "per terminal",
//     minQuantity: 1,
//     category: "Reader",
//   },
//   {
//     id: "lock-mag-600lb",
//     name: "Magnetic Lock (600lb)",
//     description: "Electromagnetic lock for secure doors",
//     unit: "per lock",
//     minQuantity: 1,
//     category: "Lock",
//   },
//   {
//     id: "lock-electric-bolt",
//     name: "Electric Bolt Lock",
//     description: "Fail-safe/fail-secure electric bolt lock",
//     unit: "per lock",
//     minQuantity: 1,
//     category: "Lock",
//   },
//   {
//     id: "time-attend-bio",
//     name: "Biometric Time Attendance Device",
//     description: "Fingerprint/Face for attendance tracking",
//     unit: "per device",
//     minQuantity: 1,
//     category: "Time Attendance",
//   },
//   {
//     id: "software-license-basic",
//     name: "Access Control Software License (Basic)",
//     description: "Base software for system management",
//     unit: "license",
//     minQuantity: 1,
//     maxQuantity: 1,
//     category: "Software",
//   },
//   {
//     id: "cabling-ac",
//     name: "Access Control Cabling",
//     description: "Data and power cabling, per meter",
//     unit: "per meter",
//     category: "Cabling",
//   },
//   {
//     id: "installation-ac",
//     name: "Installation & Programming",
//     description: "Per door/device setup and software configuration",
//     unit: "per item",
//     category: "Installation",
//   },
// ];

// const ipPhoneItems: Item[] = [
//   {
//     id: "ipphone-basic",
//     name: "Basic IP Phone",
//     description: "Standard desk phone with essential features",
//     unit: "per phone",
//     minQuantity: 1,
//     category: "IP Phone",
//   },
//   {
//     id: "ipphone-executive",
//     name: "Executive IP Phone",
//     description: "Advanced features, color screen, multiple lines",
//     unit: "per phone",
//     minQuantity: 1,
//     category: "IP Phone",
//   },
//   {
//     id: "ipphone-conference",
//     name: "IP Conference Phone",
//     description: "Omni-directional microphone for meeting rooms",
//     unit: "per phone",
//     minQuantity: 1,
//     category: "IP Phone",
//   },
//   {
//     id: "pbx-software-50ext",
//     name: "Software PBX License (50 Ext)",
//     description: "Software-based phone system for 50 extensions",
//     unit: "license",
//     minQuantity: 1,
//     maxQuantity: 1,
//     category: "PBX",
//   },
//   {
//     id: "pbx-hardware-small",
//     name: "Hardware PBX (Small Business)",
//     description: "Appliance-based phone system for small offices",
//     unit: "per unit",
//     minQuantity: 1,
//     maxQuantity: 1,
//     category: "PBX",
//   },
//   {
//     id: "voip-gateway-4port",
//     name: "VoIP Gateway (4 Port FXO/FXS)",
//     description: "Connects traditional lines/phones to VoIP",
//     unit: "per unit",
//     category: "Gateway",
//   },
//   {
//     id: "sip-trunk-channel",
//     name: "SIP Trunk Channel",
//     description: "Digital phone line (per concurrent call)",
//     unit: "per channel",
//     minQuantity: 1,
//     category: "SIP Trunk",
//   },
//   {
//     id: "headset-basic",
//     name: "Basic IP Phone Headset",
//     description: "Wired headset for call center or office use",
//     unit: "per headset",
//     category: "Accessory",
//   },
//   {
//     id: "headset-wireless",
//     name: "Wireless IP Phone Headset",
//     description: "Bluetooth/DECT headset for freedom of movement",
//     unit: "per headset",
//     category: "Accessory",
//   },
//   {
//     id: "cabling-ipphone",
//     name: "IP Phone Network Cabling",
//     description: "CAT5e/6 cabling for phone extensions, per meter",
//     unit: "per meter",
//     category: "Cabling",
//   },
//   {
//     id: "configuration-ipphone",
//     name: "IP Phone Configuration",
//     description: "Programming and setup of phones/extensions",
//     unit: "per phone",
//     category: "Installation/Config",
//   },
//   {
//     id: "pbx-config",
//     name: "PBX System Configuration",
//     description: "Full PBX system setup and customization",
//     unit: "fixed fee",
//     minQuantity: 1,
//     maxQuantity: 1,
//     category: "Installation/Config",
//   },
// ];

// export const serviceCategories: ServiceCategory[] = [
//   {
//     id: "cctv",
//     name: "CCTV Systems",
//     items: cctvItems,
//   },
//   {
//     id: "networking",
//     name: "Network Infrastructure",
//     items: [
//       {
//         id: "router-wifi",
//         name: "Wi-Fi Router (AC1200)",
//         description: "High-speed wireless router",
//         unit: "per unit",
//       },
//       {
//         id: "switch-8port",
//         name: "8-Port Gigabit Switch",
//         description: "Expands network connections",
//         unit: "per unit",
//       },
//       {
//         id: "ap-indoor",
//         name: "Indoor Access Point",
//         description: "Extends Wi-Fi coverage indoors",
//         unit: "per unit",
//       },
//       {
//         id: "ap-outdoor",
//         name: "Outdoor Access Point",
//         description: "Weatherproof outdoor Wi-Fi",
//         unit: "per unit",
//       },
//       {
//         id: "cabling-net",
//         name: "Network Cabling (CAT6)",
//         description: "Per meter, including termination",
//         unit: "per meter",
//       },
//       {
//         id: "rack-small",
//         name: "Small Network Rack (6U)",
//         description: "For network equipment",
//         unit: "per unit",
//       },
//       {
//         id: "config-basic",
//         name: "Basic Network Configuration",
//         unit: "fixed fee",
//         description: "Router/AP setup, security",
//       },
//     ],
//   },
//   {
//     id: "website",
//     name: "Website Development Packages & Add-ons",
//     items: [
//       {
//         id: "pkg-basic",
//         name: "Basic Website Package",
//         description: "5 pages, contact form, responsive design",
//         unit: "fixed fee",
//       },
//       {
//         id: "pkg-ecom",
//         name: "E-commerce Website Package",
//         description: "10 products, payment gateway, inventory",
//         unit: "fixed fee",
//       },
//       {
//         id: "blog-addon",
//         name: "Blog Integration",
//         description: "CMS for articles, comments",
//         unit: "add-on",
//       },
//       {
//         id: "seo-basic",
//         name: "Basic SEO Setup",
//         description: "Keyword research, on-page optimization",
//         unit: "add-on",
//       },
//       {
//         id: "custom-design-hr",
//         name: "Custom Design Hours",
//         description: "Additional design work (hourly)",
//         unit: "per hour",
//         minQuantity: 1,
//       },
//       {
//         id: "maintenance-yr",
//         name: "Annual Maintenance Plan (Basic)",
//         description: "Updates, backups, support",
//         unit: "per year",
//       },
//       {
//         id: "domain-setup",
//         name: "Domain & Hosting Setup",
//         description: "Assistance with domain registration and hosting",
//         unit: "fixed fee",
//       },
//     ],
//   },
//   {
//     id: "access-control",
//     name: "Access Control & Time Attendance",
//     items: accessControlItems,
//   },
//   {
//     id: "ip-phones",
//     name: "IP Phone Installations",
//     items: ipPhoneItems,
//   },
// ];
