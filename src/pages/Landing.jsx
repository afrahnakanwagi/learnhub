import { useNavigate } from "react-router-dom";
import {
  BookOpen, Play, Star, Users, Award, TrendingUp,
  CheckCircle, ArrowRight, Zap, Globe, Clock,
} from "lucide-react";

const stats = [
  { label: "Students Enrolled", value: "50,000+", icon: Users },
  { label: "Expert Courses",    value: "342+",    icon: BookOpen },
  { label: "Avg. Rating",       value: "4.8 / 5", icon: Star },
  { label: "Certificates Issued", value: "18,000+", icon: Award },
];

const features = [
  { icon: Zap,       title: "Learn at Your Pace",       desc: "Access lessons anytime, anywhere. Pause, rewind, and rewatch as many times as you need.",                        color: "bg-orange-50 text-orange-500" },
  { icon: Globe,     title: "World-Class Instructors",   desc: "Learn from industry professionals with real-world experience in top companies.",                                 color: "bg-green-50 text-green-500"  },
  { icon: Award,     title: "Earn Certificates",         desc: "Complete courses and earn verified certificates to boost your career profile.",                                  color: "bg-blue-50 text-blue-500"    },
  { icon: TrendingUp,title: "Track Your Progress",       desc: "Visual dashboards and progress tracking to keep you motivated every step.",                                     color: "bg-purple-50 text-purple-500"},
  { icon: Users,     title: "Community Support",         desc: "Join thousands of learners. Ask questions, share projects, and grow together.",                                  color: "bg-pink-50 text-pink-500"    },
  { icon: Clock,     title: "Lifetime Access",           desc: "Pay once and get lifetime access including all future course updates for free.",                                 color: "bg-yellow-50 text-yellow-500"},
];

const testimonials = [
  { name: "Priya Sharma",   role: "Frontend Developer @ Google",  avatar: "PS", rating: 5, text: "LearnHub completely changed my career. I went from zero coding knowledge to landing a job at Google in 8 months!" },
  { name: "Marcus Johnson", role: "UX Designer @ Airbnb",         avatar: "MJ", rating: 5, text: "The UI/UX course here is the best I've ever taken. Incredibly detailed, practical, and the instructor is amazing." },
  { name: "Yuki Tanaka",    role: "Data Scientist @ Netflix",     avatar: "YT", rating: 5, text: "The Python & ML course gave me everything I needed to break into data science. Worth every penny!" },
];

const topCourses = [
  { title: "Complete React Developer Bootcamp", category: "Web Dev",     price: 49.99, rating: 4.8, students: "12.4k", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80", level: "Beginner"     },
  { title: "UI/UX Design Masterclass",          category: "Design",      price: 59.99, rating: 4.9, students: "8.9k",  image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80", level: "Intermediate" },
  { title: "Python for Data Science & ML",      category: "Data Science",price: 69.99, rating: 4.7, students: "18.2k", image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&q=80", level: "Intermediate" },
];

const avatars = [
  { initials: "AK", bg: "bg-orange-500" },
  { initials: "MJ", bg: "bg-blue-500"   },
  { initials: "YT", bg: "bg-emerald-500"},
  { initials: "PS", bg: "bg-violet-500" },
  { initials: "RL", bg: "bg-rose-500"   },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ─── Navbar ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
              <BookOpen size={18} className="text-white" />
            </div>
            <span className="text-xl font-extrabold text-gray-900">
              Learn<span className="text-orange-500">Hub</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features"     className="hover:text-orange-500 transition-colors">Features</a>
            <a href="#courses"      className="hover:text-orange-500 transition-colors">Courses</a>
            <a href="#testimonials" className="hover:text-orange-500 transition-colors">Reviews</a>
            <a href="#pricing"      className="hover:text-orange-500 transition-colors">Pricing</a>
          </div>

          {/* Mobile hamburger placeholder — wire up a Sheet/Drawer here */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="w-5 h-0.5 bg-gray-700 mb-1" />
            <div className="w-5 h-0.5 bg-gray-700 mb-1" />
            <div className="w-5 h-0.5 bg-gray-700" />
          </button>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-semibold text-gray-700 hover:text-orange-500 px-4 py-2 rounded-xl hover:bg-orange-50 transition-all"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all"
            >
              Get Started <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Hero ────────────────────────────────────────────────── */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-hero-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=85')",
          }}
        />

        {/* Overlay: dark on left for text legibility, fades out right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/25" />

        {/* Optional subtle bottom-fade so it blends into the stats bar */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-center w-full">

          {/* ── Left: copy ── */}
          <div>
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/40 text-orange-200 text-xs font-semibold px-4 py-2 rounded-full mb-6 animate-badge-pop">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse flex-shrink-0" />
              #1 Online Learning Platform in 2026
            </span>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.15] tracking-tight mb-5 animate-fade-up [animation-delay:300ms]">
              Learn skills that{" "}
              <span className="text-orange-400">actually</span>{" "}
              get you hired
            </h1>

            {/* Sub */}
            <p className="text-white/75 text-lg leading-relaxed mb-8 animate-fade-up [animation-delay:450ms]">
              Join over 50,000 students mastering in-demand skills through
              expert-led courses, hands-on projects, and a community that
              grows together.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up [animation-delay:600ms]">
              <button
                onClick={() => navigate("/register")}
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
              >
                Start Learning Free <ArrowRight size={16} />
              </button>

              <button className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-white/20 transition-all">
                <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Play size={10} fill="white" className="text-white ml-0.5" />
                </div>
                Watch Demo
              </button>
            </div>

            <p className="text-white/40 text-xs mt-4 animate-fade-up [animation-delay:750ms]">
              No credit card required · Cancel anytime
            </p>

            {/* Social proof avatars */}
            <div className="flex items-center gap-3 mt-6 animate-fade-up [animation-delay:900ms]">
              <div className="flex">
                {avatars.map((av, i) => (
                  <div
                    key={av.initials}
                    className={`w-8 h-8 rounded-full border-2 border-black/40 flex items-center justify-center text-white text-[10px] font-bold ${av.bg} ${i !== 0 ? "-ml-2" : ""}`}
                  >
                    {av.initials}
                  </div>
                ))}
              </div>
              <span className="text-white/70 text-sm">
                <span className="text-white font-semibold">2,400+</span> joined this week
              </span>
            </div>
          </div>

          {/* ── Right: dashboard mockup ── */}
          <div className="relative hidden md:block animate-slide-in-right [animation-delay:400ms]">

            {/* Dashboard card */}
            <div className="bg-white rounded-2xl shadow-2xl border border-white/30 overflow-hidden">

              {/* Browser chrome */}
              <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 bg-white border border-gray-200 rounded-md px-3 py-1 text-[11px] text-gray-400 text-center ml-3">
                  learnhub.app/dashboard
                </div>
              </div>

              {/* Dashboard body */}
              <div className="grid grid-cols-[72px_1fr]">

                {/* Sidebar */}
                <div className="bg-gray-50 border-r border-gray-100 p-3">
                  {["Dashboard", "Courses", "Progress", "Profile"].map((item, i) => (
                    <div
                      key={item}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-[11px] font-medium mb-1 ${
                        i === 0 ? "bg-orange-500 text-white" : "text-gray-400"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === 0 ? "bg-white" : "bg-gray-300"}`} />
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main panel */}
                <div className="p-4 bg-white">
                  <p className="text-[12px] font-semibold text-gray-800 mb-3">Good morning, Alex</p>

                  {/* Stat pills */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { label: "Streak", value: "14d", bg: "bg-orange-50",  color: "text-orange-700" },
                      { label: "Done",   value: "23",  bg: "bg-green-50",   color: "text-green-700"  },
                      { label: "XP",     value: "4.2k",bg: "bg-blue-50",    color: "text-blue-700"   },
                    ].map((s) => (
                      <div key={s.label} className={`${s.bg} rounded-xl p-2.5`}>
                        <p className="text-[10px] text-gray-400 mb-0.5">{s.label}</p>
                        <p className={`text-base font-bold ${s.color}`}>{s.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Course progress list */}
                  <div className="space-y-3">
                    {[
                      { name: "React Developer Bootcamp", pct: 68, color: "bg-orange-400" },
                      { name: "UI/UX Design Masterclass",  pct: 34, color: "bg-emerald-400" },
                      { name: "Python for Data Science",   pct: 12, color: "bg-blue-400"    },
                    ].map((c) => (
                      <div key={c.name} className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-gray-100 rounded-lg flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-medium text-gray-700 truncate mb-1.5">{c.name}</p>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            {/* Inline style needed for the CSS animation custom property */}
                            <div
                              className={`h-full ${c.color} rounded-full animate-progress-fill`}
                              style={{ "--progress-target": `${c.pct}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 flex-shrink-0">{c.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card — certificate */}
            <div className="absolute -left-10 top-14 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3 animate-float-left">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-[12px] font-bold text-gray-800">Certificate earned!</p>
                <p className="text-[11px] text-gray-400">React Developer Course</p>
              </div>
            </div>

            {/* Floating card — students */}
            <div className="absolute -right-10 bottom-14 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3 animate-float-right">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp size={18} className="text-orange-500" />
              </div>
              <div>
                <p className="text-[12px] font-bold text-gray-800">+2,400 students</p>
                <p className="text-[11px] text-gray-400">joined this week</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ───────────────────────────────────────────────── */}
      <section className="bg-orange-500 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((item) => (
              <div key={item.label} className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <item.icon size={22} className="text-white" />
                </div>
                <div className="text-3xl font-extrabold text-white mb-1">{item.value}</div>
                <div className="text-orange-100 text-sm font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ────────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              Why LearnHub?
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to succeed</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              We've built the ultimate learning experience with tools and features designed to
              help you go from beginner to professional.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item) => (
              <div
                key={item.title}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 cursor-default"
              >
                <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Top Courses ─────────────────────────────────────────── */}
      <section id="courses" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-flex bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
                Top Courses
              </span>
              <h2 className="text-4xl font-bold text-gray-900">Most popular right now</h2>
            </div>
            <button
              onClick={() => navigate("/register")}
              className="hidden md:flex items-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-100 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all"
            >
              View All Courses <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {topCourses.map((course) => (
              <div
                key={course.title}
                onClick={() => navigate("/register")}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 text-xs font-semibold text-gray-700 px-2.5 py-1 rounded-full">
                    {course.level}
                  </span>
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    ${course.price}
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                    {course.category}
                  </span>
                  <h3 className="font-bold text-gray-900 mt-1 mb-3 leading-snug">{course.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-gray-700">{course.rating}</span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Users size={13} />{course.students} students
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ────────────────────────────────────────── */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              Student Stories
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Real results from real students</h2>
            <p className="text-xl text-gray-500">
              Don't just take our word for it — hear from students who transformed their careers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(({ name, role, avatar, text, rating }) => (
              <div
                key={name}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-orange-200 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                {/* Border-left quote style instead of italics */}
                <p className="text-gray-700 leading-relaxed mb-6 pl-4 border-l-4 border-orange-200">
                  {text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{name}</p>
                    <p className="text-xs text-gray-500">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              Pricing
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-500">Start free, upgrade when you're ready.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {[
              {
                name: "Free", price: "0", period: "forever",
                color: "border-gray-200", popular: false,
                features: ["5 free courses", "Community access", "Basic progress tracking", "Mobile access"],
                cta: "Get Started Free",
                ctaClass: "w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-100 font-semibold text-sm px-5 py-3 rounded-xl transition-all",
              },
              {
                name: "Pro", price: "19", period: "per month",
                color: "border-orange-400", popular: true,
                features: ["Unlimited courses", "HD video quality", "Certificates of completion", "Priority support", "Download for offline", "1-on-1 mentorship sessions"],
                cta: "Start Pro Free Trial",
                ctaClass: "w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all",
              },
              {
                name: "Team", price: "49", period: "per month",
                color: "border-green-400", popular: false,
                features: ["Everything in Pro", "Up to 20 team seats", "Team analytics dashboard", "Custom learning paths", "Dedicated account manager", "SSO & admin controls"],
                cta: "Contact Sales",
                ctaClass: "w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all",
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl border-2 ${plan.color} p-8 relative ${
                  plan.popular ? "shadow-xl ring-1 ring-orange-200" : "shadow-sm"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-bold text-xl text-gray-900 mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500 text-sm">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate("/register")} className={plan.ctaClass}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ──────────────────────────────────────────── */}
      <section className="bg-orange-500 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to transform your career?</h2>
          <p className="text-orange-100 text-xl mb-10">
            Join 50,000+ students who already changed their lives with LearnHub.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-orange-600 font-bold px-10 py-4 rounded-2xl hover:bg-orange-50 transition-all text-lg shadow-xl hover:-translate-y-0.5"
          >
            Start Learning Today — It's Free
          </button>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center">
                  <BookOpen size={15} className="text-white" />
                </div>
                <span className="text-white font-extrabold text-lg">
                  Learn<span className="text-orange-400">Hub</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                Empowering learners worldwide with world-class education since 2024.
              </p>
            </div>
            {[
              { title: "Courses", links: ["Web Development", "Data Science", "Design", "Marketing", "Business"] },
              { title: "Company", links: ["About Us", "Careers", "Blog", "Press", "Contact"] },
              { title: "Support", links: ["Help Center", "Terms of Service", "Privacy Policy", "Cookie Policy", "Accessibility"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-bold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-orange-400 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 LearnHub. All rights reserved. Built with ❤️ for learners everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}