import { BarChart2, Home } from "lucide-react";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaTableTennisPaddleBall } from "react-icons/fa6";
import {
  FaHistory,
  FaUsersCog,
  FaLock,
  FaRocket,
  FaCalendarCheck,
  FaPalette,
} from "react-icons/fa";

export const navItems = [
  { path: "/", label: "Home" },
  { path: "/courts", label: "Courts" },
  { path: "/blogs", label: "Blogs" },
  { path: "/about", label: "About" },
];

export const footerItems = [
  { path: "/privacy", label: "Privacy Policy" },
  { path: "/terms", label: "Terms of Service" },
  { path: "/support", label: "Support" },
];

export const authItems = [
  { path: "/login", label: "Login" },
  { path: "/register", label: "Register" },
];

export const profileItems = [
  { path: "", label: "Profile" },
  { path: "history", label: "History" },
];

export const howItWorksSteps = [
  {
    title: "1. Browse Available Courts",
    description:
      "Easily find padel courts that fit your schedule and location preferences using our intuitive search.",
  },
  {
    title: "2. Pick Your Preferred Date & Time",
    description:
      "Select the perfect slot from the real-time availability calendar. See what's open at a glance.",
  },
  {
    title: "3. Confirm & Get Ready to Play!",
    description:
      "Secure your booking instantly with a simple confirmation. You'll receive all the details you need.",
  },
];

export const whyPadeloFeatures = [
  {
    title: "Fast & Easy Booking",
    icon: FaCalendarCheck,
    description:
      "Quickly find available courts and reserve your slot in just a few clicks. Manage all your bookings effortlessly in one place.",
  },
  {
    title: "Detailed Reservation History",
    icon: FaHistory,
    description:
      "Keep track of all your past and upcoming reservations, making it easy to rebook your favorite slots or review your activity.",
  },
  {
    title: "Robust Admin & User Controls",
    icon: FaUsersCog,
    description:
      "Administrators have full control to manage courts and bookings, while users can easily manage their profiles and preferences.",
  },
  {
    title: "Transaction Safety",
    icon: FaLock,
    description:
      "Critical booking operations are protected using MongoDB transactions, ensuring data consistency and reliability for every reservation.",
  },
  {
    title: "Scalable & Modern Platform",
    icon: FaRocket,
    description:
      "Built with cutting-edge technologies like Node.js, Express, and React, Padelo is designed to handle growth and increased user demand.",
  },
  {
    title: "Comfortable Dark/Light Mode",
    icon: FaPalette,
    description:
      "Enjoy Padelo in your preferred theme for comfortable viewing, whether it's bright daylight or late at night.",
  },
];

export const dashboardItems = [
  { icon: Home, label: "Home", path: "" },
  { icon: PiUsersThreeFill, label: "Users", path: "users" },
  { icon: FaTableTennisPaddleBall, label: "Courts", path: "courts" },
];
