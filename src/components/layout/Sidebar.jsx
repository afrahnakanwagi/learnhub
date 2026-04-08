import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, TrendingUp, Award, User,
  Settings, X, GraduationCap, BarChart2, Users
} from "lucide-react";
import { useStore } from "../../store/useStore";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/courses", icon: BookOpen, label: "Courses" },
  { to: "/progress", icon: TrendingUp, label: "My Progress" },
  { to: "/profile", icon: User, label: "Profile" },
];

const instructorItems = [
  { to: "/instructor", icon: GraduationCap, label: "Instructor Panel" },
];

const adminItems = [
  { to: "/admin", icon: BarChart2, label: "Admin Dashboard" },
];


export default function Sidebar() {
  const { user, sidebarOpen, toggleSidebar } = useStore();

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={toggleSidebar} />
      )}
      <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-100 z-30 flex flex-col transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-3 mb-3">Main Menu</p>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => toggleSidebar()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? "bg-brand-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-brand-50 hover:text-brand-600"}`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}

          {(user?.role === "instructor" || user?.role === "admin") && (
            <>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-3 mt-6 mb-3">Management</p>
              {(user.role === "instructor" ? instructorItems : adminItems).map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => toggleSidebar()}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive ? "bg-forest-500 text-white" : "text-gray-600 hover:bg-forest-50 hover:text-forest-700"}`
                  }
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              ))}
            </>
          )}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-brand-50 rounded-xl p-3">
            <p className="text-xs font-bold text-brand-800">Go Pro 🚀</p>
            <p className="text-xs text-brand-600 mt-0.5">Unlock all courses & certificates</p>
            <button className="mt-2 w-full btn-primary text-xs py-1.5">Upgrade Now</button>
          </div>
        </div>
      </aside>
    </>
  );
}