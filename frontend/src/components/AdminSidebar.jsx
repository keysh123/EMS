
import React from "react"
import { Link, useLocation } from "react-router-dom"
import { adminSidebarList } from "./AdminSidebarList"

const AdminSidebar = () => {
  const location = useLocation()

  return (
    <div className="h-screen w-64 bg-gray-800 fixed left-0 top-0 bottom-0 text-white  ">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
      <h3 className="text-2xl font-bold text-center">Employee MS</h3>
      </div>
      <ul className="space-y-2 mt-3">
        {adminSidebarList.map((item, idx) => {
          const Icon = item.icon
          const isActive = location.pathname === item.link
          return (
            <li key={idx}>
              <Link
                to={item.link}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 
                  ${isActive ? "bg-teal-500" : "hover:bg-gray-800"}
                `}
              >
                <Icon className="text-xl" />
                <span className="text-md">{item.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AdminSidebar
