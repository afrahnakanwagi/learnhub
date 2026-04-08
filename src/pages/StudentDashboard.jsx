import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BookOpen, Clock, Award, TrendingUp, Play, ChevronRight, Flame, Star, Target, Trophy, Zap } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProgressBar from "../components/ui/ProgressBar";
import { useStore } from "../store/useStore";
import { courses, achievements } from "../data/mockData";

const activityData = [
  { day: "Mon", minutes: 45 }, { day: "Tue", minutes: 90 },
  { day: "Wed", minutes: 30 }, { day: "Thu", minutes: 120 },
  { day: "Fri", minutes: 75 }, { day: "Sat", minutes: 150 },
  { day: "Sun", minutes: 60 },
];

const weeklyData = [
  { week: "W1", lessons: 5 }, { week: "W2", lessons: 8 },
  { week: "W3", lessons: 6 }, { week: "W4", lessons: 12 },
  { week: "W5", lessons: 9 }, { week: "W6", lessons: 15 },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user, enrollments } = useStore();
  const [activeChart, setActiveChart] = useState("activity");

  const enrolledCourseData = enrollments.map(e => ({
    ...e,
    course: courses.find(c => c.id === e.courseId),
  })).filter(e => e.course);

  const totalMinutes = activityData.reduce((a, b) => a + b.minutes, 0);
  const earnedBadges = achievements.filter(a => a.earned).length;

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              {greeting()}, {user?.name?.split(" ")[0]} 👋
            </h1>
            <p className="text-gray-500 mt-1">You have <span className="text-orange-500 font-semibold">3 lessons</span> to complete today. Keep it up!</p>
          </div>
          <button onClick={() => navigate("/courses")} className="btn-primary shrink-0">
            <BookOpen size={16} /> Browse Courses
          </button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Courses Enrolled", value: enrollments.length, icon: BookOpen, color: "bg-orange-50 text-orange-500", change: "+1 this week" },
            { label: "Hours Learned", value: Math.round(totalMinutes / 60) + "h", icon: Clock, color: "bg-blue-50 text-blue-500", change: "+2h today" },
            { label: "Certificates", value: "2", icon: Award, color: "bg-green-50 text-green-500", change: "1 in progress" },
            { label: "Day Streak", value: "7 🔥", icon: Flame, color: "bg-red-50 text-red-500", change: "Personal best!" },
          ].map(({ label, value, icon: Icon, color, change }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 hover:shadow-pop transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
                  <Icon size={18} />
                </div>
                <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">{change}</span>
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Activity Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-extrabold text-gray-900">Learning Activity</h2>
                <p className="text-sm text-gray-500 mt-0.5">Your study time this week</p>
              </div>
              <div className="flex gap-2">
                {["activity", "lessons"].map(tab => (
                  <button key={tab} onClick={() => setActiveChart(tab)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all capitalize ${activeChart === tab ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={activeChart === "activity" ? activityData : weeklyData}>
                <defs>
                  <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey={activeChart === "activity" ? "day" : "week"} tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", fontSize: "13px" }} />
                <Area type="monotone" dataKey={activeChart === "activity" ? "minutes" : "lessons"} stroke="#f97316" strokeWidth={2.5} fill="url(#colorGrad)" dot={{ fill: "#f97316", r: 4 }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Streak & Goals */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 flex flex-col">
            <h2 className="font-extrabold text-gray-900 mb-4">Weekly Goals</h2>
            <div className="space-y-4 flex-1">
              {[
                { label: "Study Time", current: 5.5, target: 7, unit: "hrs", color: "brand" },
                { label: "Lessons Done", current: 8, target: 10, unit: "lessons", color: "forest" },
                { label: "Quiz Score Avg", current: 82, target: 90, unit: "%", color: "blue" },
              ].map(goal => (
                <div key={goal.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-semibold text-gray-700">{goal.label}</span>
                    <span className="text-sm text-gray-500">{goal.current}/{goal.target} {goal.unit}</span>
                  </div>
                  <ProgressBar value={Math.round((goal.current / goal.target) * 100)} color={goal.color} size="md" />
                </div>
              ))}
            </div>
            <div className="mt-6 bg-orange-50 rounded-xl p-4 text-center">
              <Flame size={28} className="text-orange-500 mx-auto mb-1" />
              <p className="font-extrabold text-2xl text-gray-900">7</p>
              <p className="text-sm text-gray-500">Day streak — keep it going!</p>
            </div>
          </div>
        </div>

        {/* Continue Learning */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-extrabold text-gray-900 text-lg">Continue Learning</h2>
            <button onClick={() => navigate("/courses")} className="text-sm text-orange-500 font-semibold hover:underline flex items-center gap-1">
              View all <ChevronRight size={15} />
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {enrolledCourseData.map(({ course, progress }) => (
              <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-pop hover:-translate-y-1 transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => navigate(`/learn/${course.id}/l1`)}>
                <div className="relative overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Play size={18} className="text-orange-500 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <span className="absolute top-2 right-2 bg-white/90 text-xs font-bold text-gray-700 px-2 py-0.5 rounded-full">{progress}%</span>
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-orange-500 mb-1">{course.category}</p>
                  <h3 className="font-bold text-gray-900 text-sm mb-3 line-clamp-2">{course.title}</h3>
                  <ProgressBar value={progress} size="sm" />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{progress}% complete</span>
                    <span className="text-xs font-semibold text-orange-500">Continue →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-extrabold text-gray-900">Achievements</h2>
              <p className="text-sm text-gray-500">{earnedBadges} of {achievements.length} badges earned</p>
            </div>
            <span className="badge-orange"><Trophy size={12} /> {earnedBadges} Earned</span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {achievements.map(badge => (
              <div key={badge.id} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${badge.earned ? "border-orange-200 bg-orange-50" : "border-gray-100 bg-gray-50 opacity-50 grayscale"}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${badge.earned ? "bg-orange-100" : "bg-gray-200"}`}>
                  {badge.earned ? "🏆" : "🔒"}
                </div>
                <p className="text-xs font-bold text-gray-700 text-center leading-tight">{badge.title}</p>
                <p className="text-[10px] text-gray-400 text-center">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}