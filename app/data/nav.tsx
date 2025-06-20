import {
  BriefcaseBusiness,
  FileUser,
  LayoutGrid,
  Mail,
  Newspaper,
} from "lucide-react";

export const navigationLinks = [
  { icon: <LayoutGrid />, name: "Home", link: "/" },
  { icon: <FileUser />, name: "About", link: "/about" },
  { icon: <BriefcaseBusiness />, name: "Projects", link: "/projects" },
  { icon: <Newspaper />, name: "Articles", link: "/articles " },
  { icon: <Mail />, name: "Contact", link: "/contact" },
];

export const resume = [{ name: "resume", link: "/resume" }];
