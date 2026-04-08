import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Users, BookOpen, Star, DollarSign, Plus, Edit, Trash2, Eye, TrendingUp, Award } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Modal from "../components/ui/Modal";
import { useToast, ToastContainer } from "../components/ui/Toast";
import { courses } from "../data/mockData";
import { useStore } from "../store/useStore";

const earningsData = [
  { month: "Nov", earnings: 1200 }, { month: "Dec", earnings: 1800 },
  { month: "Jan", earnings: 2200 }, { month: "Feb", earnings: 1950 },
  { month: "Mar", earnings: 2800 }, { month: "Apr", earnings: 3100 },
];

const enrollmentData = [
  { month: "Nov", students: 45 }, { month: "Dec", students: 78 },
  { month: "Jan", students: 92 }, { month: "Feb", students: 65 },
  { month: "Mar", students: 110 }, { month: "Apr", students: 134 },
];

export default function InstructorDashboard() {
  const { user } = useStore();
  const { toasts, addToast, removeToast } = useToast();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [activeChart, setActiveChart] = useState("earnings");
  const [newCourse, setNewCourse] = useState({ title: "", category: "", level: "Beginner", price: "" });
  const [creating, setCreating] = useState(false);

  const myCourses = courses.slice(0, 3);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    await new Promise(r => setTimeout(r, 1200));
    setCreating(false);
    setShowCreateModal(false);
    setNewCourse({ title: "", category: "", level: "Beginner", price: "" });
    addToast("Course created successfully! It's now in review.", "success");
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Instructor Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, {user?.name} 👋</p>
          </div>
          <button onClick={() => setShowCreateModal(true)} className="btn-primary">
            <Plus size={17} /> Create Course
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Students", value: "2,847", icon: Users, color: "bg-blue-50 text-blue-500", change: "+134 this month" },
            { label: "Active Courses", value: myCourses.length, icon: BookOpen, color: "bg-orange-50 text-orange-500", change: "1 in review" },
            { label: "Avg. Rating", value: "4.8 ★", icon: Star, color: "bg-yellow-50 text-yellow-500", change: "+0.1 this month" },
            { label: "Total Earnings", value: "$13,100", icon: DollarSign, color: "bg-green-50 text-green-500", change: "+$3,100 this month" },
          ].map(({ label, value, icon: Icon, color, change }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={18} />
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-xs text-green-600 font-semibold mt-1">{change}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-extrabold text-gray-900">Analytics Overview</h2>
              <p className="text-sm text-gray-500">Last 6 months performance</p>
            </div>
            <div className="flex gap-2">
              {["earnings", "students"].map(tab => (
                <button key={tab} onClick={() => setActiveChart(tab)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg capitalize transition-all ${activeChart === tab ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={activeChart === "earnings" ? earningsData : enrollmentData}>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", fontSize: "13px" }}
                formatter={(v) => [activeChart === "earnings" ? `$${v}` : `${v} students`, ""]} />
              <Bar dataKey={activeChart === "earnings" ? "earnings" : "students"} fill={activeChart === "earnings" ? "#22c55e" : "#f97316"} radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* My Courses */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-gray-900">My Courses</h2>
            <button onClick={() => setShowCreateModal(true)} className="btn-secondary text-sm">
              <Plus size={15} /> New Course
            </button>
          </div>
          <div className="space-y-4">
            {myCourses.map(course => (
              <div key={course.id} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all">
                <img src={course.image} alt="" className="w-16 h-12 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate">{course.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500 flex items-center gap-1"><Users size={11} />{course.students.toLocaleString()} students</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1"><Star size={11} className="text-yellow-400" />{course.rating}</span>
                    <span className="badge-green text-[10px]">Published</span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-extrabold text-green-600">${course.price}</p>
                  <p className="text-xs text-gray-400">{course.reviews} reviews</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-colors"><Eye size={16} /></button>
                  <button className="p-2 rounded-lg hover:bg-orange-50 text-gray-400 hover:text-orange-500 transition-colors"><Edit size={16} /></button>
                  <button onClick={() => setShowDeleteModal(course)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent reviews */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <h2 className="font-extrabold text-gray-900 mb-5">Recent Student Reviews</h2>
          <div className="space-y-4">
            {[
              { name: "Alice K.", avatar: "AK", course: "React Bootcamp", rating: 5, comment: "Best React course I've ever taken! Super clear explanations." },
              { name: "Bob M.", avatar: "BM", course: "React Bootcamp", rating: 4, comment: "Great content, would love more exercises on hooks." },
              { name: "Clara D.", avatar: "CD", course: "UI/UX Design", rating: 5, comment: "Sarah explains everything so well. Worth every penny!" },
            ].map((review, i) => (
              <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">{review.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, j) => <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{review.course}</p>
                  <p className="text-sm text-gray-700">"{review.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

    </div>

      {/* Create Course Modal */}
    <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create New Course">
            <form onSubmit={handleCreate} className="space-y-4">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Course Title</label>
                <input
                type="text"
                required
                value={newCourse.title}
                onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="e.g. Complete React Bootcamp"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <input
                type="text"
                required
                value={newCourse.category}
                onChange={e => setNewCourse({ ...newCourse, category: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="e.g. Web Development"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Level</label>
                <select
                    value={newCourse.level}
                    onChange={e => setNewCourse({ ...newCourse, level: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                </select>
                </div>
                <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
                <input
                    type="number"
                    required
                    value={newCourse.price}
                    onChange={e => setNewCourse({ ...newCourse, price: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="29.99"
                />
                </div>
            </div>
            <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={creating} className="btn-primary flex-1">
                {creating ? "Creating..." : "Create Course"}
                </button>
            </div>
            </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={!!showDeleteModal} onClose={() => setShowDeleteModal(null)} title="Delete Course">
            <div className="space-y-4">
            <p className="text-sm text-gray-600">
                Are you sure you want to delete <span className="font-bold text-gray-900">"{showDeleteModal?.title}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
                <button onClick={() => setShowDeleteModal(null)} className="btn-secondary flex-1">Cancel</button>
                <button
                onClick={() => {
                    setShowDeleteModal(null);
                    addToast("Course deleted successfully.", "error");
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                Delete
                </button>
            </div>
            </div>
        </Modal>

        <ToastContainer toasts={toasts} removeToast={removeToast} />
        </DashboardLayout>
    );
    }