// src/data/adminSidebarList.js
import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaFileAlt,
  FaMoneyBill,
  FaCog
} from "react-icons/fa"

export const adminSidebarList = [
  {
    name: "Dashboard",
    link: "/admin-dashboard",
    icon: FaHome,
  },
  {
    name: "Employees",
    link: "/admin-dashboard/employees",
    icon: FaUsers,
  },
  {
    name: "Department",
    link: "/admin-dashboard/departments",
    icon: FaBuilding,
  },
  {
    name: "Leaves",
    link: "/admin-dashboard/leaves",
    icon: FaFileAlt,
  },
  {
    name: "Salary",
    link: "/admin-dashboard/salary",
    icon: FaMoneyBill,
  },
  {
    name: "Settings",
    link: "/admin-dashboard/settings",
    icon: FaCog,
  },
]
