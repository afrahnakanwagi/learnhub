import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  User,
  GraduationCap,
  BarChart2,
  Users,
  ClipboardCheck,
  Award,
  Settings,
} from "lucide-react";
import { useStore } from "../../store/useStore";

// Centralized navigation configuration
const navigationConfig = {
  student: [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/courses", icon: BookOpen, label: "Courses" },
    { to: "/progress", icon: TrendingUp, label: "My Progress" },
    { to: "/profile", icon: User, label: "Profile" },
  ],

  instructor: [
    { to: "/instructor", icon: GraduationCap, label: "Instructor Dashboard" },
    { to: "/courses", icon: BookOpen, label: "My Courses" },
    { to: "/instructor/students", icon: Users, label: "My Students" },
    { to: "/profile", icon: User, label: "Profile" },
  ],

  admin: [
    { to: "/admin", icon: BarChart2, label: "Admin Dashboard" },
    { to: "/admin/users", icon: Users, label: "Manage Users" },
    { to: "/admin/courses", icon: BookOpen, label: "Manage Courses" },
    { to: "/admin/enrollments", icon: ClipboardCheck, label: "Enrollments" },
    { to: "/admin/certifications", icon: Award, label: "Certifications" },
    { to: "/admin/reports", icon: BarChart2, label: "Reports" },
    { to: "/profile", icon: User, label: "Profile" },
  ],
};

export default function Sidebar() {
  const { user, sidebarOpen, toggleSidebar } = useStore();
  const role = user?.role || "student"; // fallback to student

  // Get the correct navigation items based on user role
  const navItems = navigationConfig[role] || navigationConfig.student;

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 lg:hidden" 
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-100 z-30 flex flex-col transition-transform duration-300 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-3 mb-4">
            {role === "admin" ? "ADMINISTRATION" : 
             role === "instructor" ? "INSTRUCTOR HUB" : "MAIN MENU"}
          </p>

          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => toggleSidebar()} // Close sidebar on mobile after navigation
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 group
                ${isActive 
                  ? "bg-brand-600 text-white shadow-md" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <item.icon size={20} className="transition-transform group-hover:scale-110" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer Section - Role Specific */}
        <div className="p-4 border-t border-gray-100 mt-auto">
          {role === "admin" && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-sm">
              <div className="flex items-center gap-2 text-red-600 font-semibold mb-1">
                <Settings size={16} />
                Admin Mode
              </div>
              <p className="text-xs text-red-500">Full platform control active</p>
            </div>
          )}

          {role === "instructor" && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
              <p className="text-xs font-bold text-emerald-700 mb-1">Instructor Tools</p>
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2.5 rounded-xl font-medium transition-colors">
                Create New Course
              </button>
            </div>
          )}

          {role === "student" && (
            <div className="bg-brand-50 rounded-2xl p-4">
              <p className="text-xs font-bold text-brand-700">Go Pro 🚀</p>
              <p className="text-xs text-brand-600 mt-1">Unlock unlimited courses & certificates</p>
              <button className="mt-3 w-full bg-brand-600 hover:bg-brand-700 text-white text-xs py-2.5 rounded-xl font-medium transition-colors">
                Upgrade Now
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}