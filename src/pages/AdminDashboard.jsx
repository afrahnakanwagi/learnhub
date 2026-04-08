import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Users, BookOpen, DollarSign, TrendingUp, Search, MoreVertical, Shield, AlertTriangle, CheckCircle, XCircle, Eye, Edit } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Modal from "../components/ui/Modal";
import { useToast, ToastContainer } from "../components/ui/Toast";
import { adminStats, recentUsers, courses } from "../data/mockData";

const revenueData = [
  { month: "Oct", revenue: 12000 }, { month: "Nov", revenue: 15400 },
  { month: "Dec", revenue: 18900 }, { month: "Jan", revenue: 22100 },
  { month: "Feb", revenue: 19800 }, { month: "Mar", revenue: 26500 },
  { month: "Apr", revenue: 31200 },
];

const userGrowthData = [
  { month: "Oct", users: 1200 }, { month: "Nov", users: 1850 },
  { month: "Dec", users: 2400 }, { month: "Jan", users: 3100 },
  { month: "Feb", users: 4200 }, { month: "Mar", users: 5800 },
  { month: "Apr", users: 7200 },
];

export default function AdminDashboard() {
  const { toasts, addToast, removeToast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchUser, setSearchUser] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const filteredUsers = recentUsers.filter(u =>
    u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Platform overview and management</p>
          </div>
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 rounded-xl">
            <Shield size={16} className="text-red-500" />
            <span className="text-sm font-bold text-red-600">Admin Access</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: adminStats.totalUsers.toLocaleString(), icon: Users, color: "bg-blue-50 text-blue-500", sub: `+${adminStats.newUsersThisWeek} this week` },
            { label: "Total Courses", value: adminStats.totalCourses, icon: BookOpen, color: "bg-orange-50 text-orange-500", sub: "12 pending review" },
            { label: "Total Revenue", value: `$${adminStats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "bg-green-50 text-green-500", sub: "+18% this month" },
            { label: "Active Today", value: adminStats.activeToday.toLocaleString(), icon: TrendingUp, color: "bg-purple-50 text-purple-500", sub: "Real-time" },
          ].map(({ label, value, icon: Icon, color, sub }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={18} />
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-xs text-green-600 font-semibold mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
          {["overview", "users", "courses", "reports"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all capitalize ${activeTab === tab ? "bg-white text-orange-500 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
                <h2 className="font-extrabold text-gray-900 mb-1">Revenue Growth</h2>
                <p className="text-sm text-gray-500 mb-4">Monthly revenue (last 7 months)</p>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", fontSize: "12px" }} formatter={v => [`$${v.toLocaleString()}`, "Revenue"]} />
                    <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2.5} fill="url(#revGrad)" dot={{ fill: "#22c55e", r: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
                <h2 className="font-extrabold text-gray-900 mb-1">User Growth</h2>
                <p className="text-sm text-gray-500 mb-4">Cumulative users over time</p>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={userGrowthData}>
                    <defs>
                      <linearGradient id="usrGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", fontSize: "12px" }} formatter={v => [`${v.toLocaleString()}`, "Users"]} />
                    <Area type="monotone" dataKey="users" stroke="#f97316" strokeWidth={2.5} fill="url(#usrGrad)" dot={{ fill: "#f97316", r: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* System health */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
              <h2 className="font-extrabold text-gray-900 mb-5">System Health</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Server Uptime", value: "99.98%", status: "good" },
                  { label: "API Response", value: "142ms", status: "good" },
                  { label: "Error Rate", value: "0.02%", status: "good" },
                  { label: "DB Load", value: "34%", status: "warning" },
                ].map(({ label, value, status }) => (
                  <div key={label} className={`p-4 rounded-xl border ${status === "good" ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-600">{label}</span>
                      {status === "good" ? <CheckCircle size={14} className="text-green-500" /> : <AlertTriangle size={14} className="text-yellow-500" />}
                    </div>
                    <p className={`text-xl font-extrabold ${status === "good" ? "text-green-700" : "text-yellow-700"}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-extrabold text-gray-900">User Management</h2>
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search users..." value={searchUser} onChange={e => setSearchUser(e.target.value)} className="input pl-9 py-2 text-sm w-60" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["User","Email","Role","Joined","Courses","Actions"].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{user.avatar}</div>
                          <span className="font-semibold text-gray-900 text-sm">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-sm text-gray-500">{user.email}</td>
                      <td className="py-3 pr-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${user.role === "instructor" ? "bg-green-100 text-green-700" : user.role === "admin" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-sm text-gray-500">{user.joined}</td>
                      <td className="py-3 pr-4 text-sm text-gray-700 font-semibold">{user.courses}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => { setSelectedUser(user); setShowUserModal(true); }} className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-colors"><Eye size={14} /></button>
                          <button className="p-1.5 rounded-lg hover:bg-orange-50 text-gray-400 hover:text-orange-500 transition-colors"><Edit size={14} /></button>
                          <button onClick={() => addToast(`${user.name} has been suspended.`, "warning")} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><XCircle size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
            <h2 className="font-extrabold text-gray-900 mb-5">Course Management</h2>
            <div className="space-y-3">
              {courses.map(course => (
                <div key={course.id} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-orange-200 transition-all">
                  <img src={course.image} alt="" className="w-14 h-10 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">{course.title}</p>
                    <p className="text-xs text-gray-500">{course.instructor} · {course.category}</p>
                  </div>
                  <div className="shrink-0 text-right hidden md:block">
                    <p className="text-sm font-bold text-gray-900">{course.students.toLocaleString()} students</p>
                    <p className="text-xs text-gray-400">${course.price}</p>
                  </div>
                  <span className="badge-green text-[10px] shrink-0">Published</span>
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-colors"><Eye size={14} /></button>
                    <button onClick={() => addToast(`${course.title} has been flagged for review.`, "warning")} className="p-1.5 rounded-lg hover:bg-yellow-50 text-gray-400 hover:text-yellow-500 transition-colors"><AlertTriangle size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Monthly Revenue Report", desc: "Detailed breakdown of earnings and refunds", icon: "💰", color: "bg-green-50 border-green-200" },
              { title: "User Engagement Report", desc: "Active users, session time, retention rates", icon: "📊", color: "bg-blue-50 border-blue-200" },
              { title: "Course Performance", desc: "Completion rates, ratings, and revenue per course", icon: "📚", color: "bg-orange-50 border-orange-200" },
              { title: "Support Tickets", desc: "Open issues, response times, and resolutions", icon: "🎟️", color: "bg-purple-50 border-purple-200" },
            ].map(r => (
              <div key={r.title} className={`bg-white rounded-2xl border ${r.color} p-6 hover:shadow-md transition-all cursor-pointer`} onClick={() => addToast("Report downloaded!", "success")}>
                <div className="text-3xl mb-3">{r.icon}</div>
                <h3 className="font-extrabold text-gray-900 mb-1">{r.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{r.desc}</p>
                <span className="text-xs font-bold text-orange-500 hover:underline">Download PDF →</span>
              </div>
              ))}
          </div>
        )}

      </div>

      {/* User Detail Modal */}
      <Modal isOpen={showUserModal} onClose={() => setShowUserModal(false)} title="User Details">
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                {selectedUser.avatar}
              </div>
              <div>
                <p className="font-extrabold text-gray-900">{selectedUser.name}</p>
                <p className="text-sm text-gray-500">{selectedUser.email}</p>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${selectedUser.role === "instructor" ? "bg-green-100 text-green-700" : selectedUser.role === "admin" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>
                  {selectedUser.role}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">Joined</p>
                <p className="font-bold text-gray-900 text-sm">{selectedUser.joined}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-500">Courses Enrolled</p>
                <p className="font-bold text-gray-900 text-sm">{selectedUser.courses}</p>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowUserModal(false)} className="btn-secondary flex-1">Close</button>
              <button
                onClick={() => {
                  setShowUserModal(false);
                  addToast(`${selectedUser.name} has been suspended.`, "warning");
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors"
              >
                Suspend User
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </DashboardLayout>
  );
}