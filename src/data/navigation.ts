// Navigation links for the entire application
import { FaHome, FaInfoCircle, FaTools, FaEnvelope } from "react-icons/fa";
import type { IconType } from "react-icons/lib";

export interface NavLink {
  path: string;
  translationKey: string;
  defaultText: string;
  icon: IconType;
}

export const navLinks: NavLink[] = [
  {
    path: "/",
    translationKey: "header.home",
    defaultText: "Home",
    icon: FaHome,
  },
  {
    path: "/about",
    translationKey: "header.about",
    defaultText: "About Us",
    icon: FaInfoCircle,
  },
  {
    path: "/services",
    translationKey: "header.services",
    defaultText: "Services",
    icon: FaTools,
  },
  {
    path: "/contact",
    translationKey: "header.contact",
    defaultText: "Contact Us",
    icon: FaEnvelope,
  },
];
