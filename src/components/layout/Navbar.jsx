import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bell, Search, Menu, LogOut, User, Settings, BookOpen, ChevronDown, X } from "lucide-react";
import { useStore } from "../../store/useStore";

export default function Navbar() {
  const { user, logout, notifications, markNotificationsRead, toggleSidebar } = useStore();
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");

  const unread = notifications.filter(n => !n.read).length;

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <nav className="h-16 bg-white border-b border-gray-100 flex items-center px-4 gap-4 sticky top-0 z-40 shadow-sm">
      <button onClick={toggleSidebar} className="p-2 rounded-xl hover:bg-gray-100 transition-colors lg:hidden">
        <Menu size={20} className="text-gray-600" />
      </button>

      <Link to="/dashboard" className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 bg-brand-500 rounded-xl flex items-center justify-center">
          <BookOpen size={16} className="text-white" />
        </div>
        <span className="font-extrabold text-gray-900 text-lg hidden sm:block">Learn<span className="text-brand-500">Hub</span></span>
      </Link>

      <div className="flex-1 max-w-md mx-auto hidden md:block">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Link to="/courses" className="hidden md:block text-sm font-semibold text-gray-600 hover:text-brand-600 px-3 py-2 rounded-xl hover:bg-brand-50 transition-colors">
          Courses
        </Link>

        <div className="relative">
          <button
            onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); markNotificationsRead(); }}
            className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Bell size={20} className="text-gray-600" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-brand-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-pop border border-gray-100 overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Notifications</h3>
                <button onClick={() => setShowNotifs(false)}><X size={16} className="text-gray-400" /></button>
              </div>
              {notifications.map(n => (
                <div key={n.id} className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!n.read ? "bg-brand-50/40" : ""}`}>
                  <p className="text-sm text-gray-800">{n.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.[0] || "U"}
            </div>
            <span className="text-sm font-semibold text-gray-700 hidden md:block">{user?.name?.split(" ")[0]}</span>
            <ChevronDown size={14} className="text-gray-400 hidden md:block" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-pop border border-gray-100 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
                <span className="badge-orange mt-1">{user?.role}</span>
              </div>
              <div className="py-1">
                <button onClick={() => { navigate("/profile"); setShowProfile(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <User size={16} className="text-gray-400" />Profile
                </button>
                {user?.role === "instructor" && (
                  <button onClick={() => { navigate("/instructor"); setShowProfile(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <BookOpen size={16} className="text-gray-400" />Instructor Panel
                  </button>
                )}
                {user?.role === "admin" && (
                  <button onClick={() => { navigate("/admin"); setShowProfile(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Settings size={16} className="text-gray-400" />Admin Panel
                  </button>
                )}
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut size={16} />Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}