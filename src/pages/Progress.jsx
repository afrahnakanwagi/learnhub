import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell } from "recharts";
import { Award, TrendingUp, Clock, BookOpen, Flame, Star, Trophy, Target, ChevronRight } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProgressBar from "../components/ui/ProgressBar";
import { useStore } from "../store/useStore";
import { courses, achievements } from "../data/mockData";

const monthlyData = [
  { month: "Nov", hours: 12 }, { month: "Dec", hours: 18 },
  { month: "Jan", hours: 25 }, { month: "Feb", hours: 20 },
  { month: "Mar", hours: 32 }, { month: "Apr", hours: 28 },
];

const categoryData = [
  { name: "Web Dev", value: 45, fill: "#f97316" },
  { name: "Design", value: 25, fill: "#22c55e" },
  { name: "Data", value: 30, fill: "#3b82f6" },
];

export default function Progress() {
  const navigate = useNavigate();
  const { enrollments } = useStore();

  const enrolledCourseData = enrollments.map(e => ({
    ...e,
    course: courses.find(c => c.id === e.courseId),
  })).filter(e => e.course);

  const avgProgress = Math.round(enrolledCourseData.reduce((s, e) => s + e.progress, 0) / (enrolledCourseData.length || 1));

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">My Progress</h1>
          <p className="text-gray-500 mt-1">Track your learning journey and celebrate your wins</p>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Hours Learned", value: "135h", icon: Clock, color: "text-blue-500 bg-blue-50", sub: "+28h this month" },
            { label: "Courses In Progress", value: enrollments.length, icon: BookOpen, color: "text-orange-500 bg-orange-50", sub: "2 near completion" },
            { label: "Certificates Earned", value: "2", icon: Award, color: "text-green-500 bg-green-50", sub: "1 pending" },
            { label: "Current Streak", value: "7 days", icon: Flame, color: "text-red-500 bg-red-50", sub: "🔥 Personal best!" },
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

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Monthly hours chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-card p-6">
            <h2 className="font-extrabold text-gray-900 mb-1">Monthly Learning Hours</h2>
            <p className="text-sm text-gray-500 mb-6">Your study hours over the last 6 months</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData} barSize={36}>
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", fontSize: "13px" }}
                  formatter={(v) => [`${v} hours`, "Study time"]}
                />
                <Bar dataKey="hours" fill="#f97316" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
            <h2 className="font-extrabold text-gray-900 mb-1">Learning by Category</h2>
            <p className="text-sm text-gray-500 mb-4">Time distribution</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {categoryData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, ""]} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {categoryData.map(c => (
                <div key={c.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: c.fill }} />
                    <span className="text-gray-600">{c.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course progress */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-extrabold text-gray-900">Course Progress</h2>
              <p className="text-sm text-gray-500 mt-0.5">Overall average: {avgProgress}%</p>
            </div>
            <button onClick={() => navigate("/courses")} className="btn-secondary text-sm">Explore More</button>
          </div>
          <div className="space-y-5">
            {enrolledCourseData.map(({ course, progress }) => (
              <div key={course.id} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group" onClick={() => navigate(`/learn/${course.id}/l1`)}>
                <img src={course.image} alt="" className="w-16 h-12 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm mb-0.5 truncate">{course.title}</p>
                  <p className="text-xs text-gray-400 mb-2">{course.instructor}</p>
                  <ProgressBar value={progress} size="sm" color={progress >= 70 ? "forest" : "brand"} />
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-extrabold text-gray-900">{progress}%</p>
                  <p className="text-xs text-gray-400">{progress >= 100 ? "Complete!" : "In progress"}</p>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-gray-900">Achievements & Badges</h2>
            <span className="badge-orange"><Trophy size={12} />{achievements.filter(a=>a.earned).length}/{achievements.length} earned</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievements.map(badge => (
              <div key={badge.id} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 text-center transition-all ${badge.earned ? "border-orange-200 bg-orange-50 hover:shadow-md" : "border-dashed border-gray-200 bg-gray-50 opacity-50"}`}>
                <div className={`text-3xl mb-1 ${!badge.earned && "grayscale"}`}>
                  {badge.earned ? ["🏆","▶️","🎯","🔥","⭐","🎓"][badge.id - 1] : "🔒"}
                </div>
                <p className="text-xs font-bold text-gray-800 leading-tight">{badge.title}</p>
                <p className="text-[10px] text-gray-500">{badge.description}</p>
                {badge.earned && <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">Earned</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Streak calendar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <h2 className="font-extrabold text-gray-900 mb-1">Learning Streak</h2>
          <p className="text-sm text-gray-500 mb-5">Your activity for the last 28 days</p>
          <div className="grid grid-cols-7 gap-2">
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
              <p key={d} className="text-xs text-center text-gray-400 font-semibold">{d}</p>
            ))}
            {Array.from({ length: 28 }, (_, i) => {
              const active = [0,1,3,4,6,7,8,10,11,13,14,20,21,22,23,24,25,26,27].includes(i);
              const today = i === 27;
              return (
                <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all ${today ? "ring-2 ring-orange-500 ring-offset-1" : ""} ${active ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-300"}`}>
                  {active && "✓"}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}