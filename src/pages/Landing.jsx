import { useNavigate } from "react-router-dom";
import { BookOpen, Play, Star, Users, Award, TrendingUp, CheckCircle, ArrowRight, Zap, Globe, Clock } from "lucide-react";

const stats = [
  { label: "Students Enrolled", value: "50,000+", icon: Users },
  { label: "Expert Courses", value: "342+", icon: BookOpen },
  { label: "Avg. Rating", value: "4.8 / 5", icon: Star },
  { label: "Certificates Issued", value: "18,000+", icon: Award },
];

const features = [
  { icon: Zap, title: "Learn at Your Pace", desc: "Access lessons anytime, anywhere. Pause, rewind, and rewatch as many times as you need.", color: "bg-orange-50 text-orange-500" },
  { icon: Globe, title: "World-Class Instructors", desc: "Learn from industry professionals with real-world experience in top companies.", color: "bg-green-50 text-green-500" },
  { icon: Award, title: "Earn Certificates", desc: "Complete courses and earn verified certificates to boost your career profile.", color: "bg-blue-50 text-blue-500" },
  { icon: TrendingUp, title: "Track Your Progress", desc: "Visual dashboards and progress tracking to keep you motivated every step.", color: "bg-purple-50 text-purple-500" },
  { icon: Users, title: "Community Support", desc: "Join thousands of learners. Ask questions, share projects, and grow together.", color: "bg-pink-50 text-pink-500" },
  { icon: Clock, title: "Lifetime Access", desc: "Pay once and get lifetime access including all future course updates for free.", color: "bg-yellow-50 text-yellow-500" },
];

const testimonials = [
  { name: "Priya Sharma", role: "Frontend Developer @ Google", avatar: "PS", text: "LearnHub completely changed my career. I went from zero coding knowledge to landing a job at Google in 8 months!", rating: 5 },
  { name: "Marcus Johnson", role: "UX Designer @ Airbnb", avatar: "MJ", text: "The UI/UX course here is the best I've ever taken. Incredibly detailed, practical, and the instructor is amazing.", rating: 5 },
  { name: "Yuki Tanaka", role: "Data Scientist @ Netflix", avatar: "YT", text: "The Python & ML course gave me everything I needed to break into data science. Worth every penny!", rating: 5 },
];

const topCourses = [
  { title: "Complete React Developer Bootcamp", category: "Web Dev", price: 49.99, rating: 4.8, students: "12.4k", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80", level: "Beginner" },
  { title: "UI/UX Design Masterclass", category: "Design", price: 59.99, rating: 4.9, students: "8.9k", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80", level: "Intermediate" },
  { title: "Python for Data Science & ML", category: "Data Science", price: 69.99, rating: 4.7, students: "18.2k", image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&q=80", level: "Intermediate" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
              <BookOpen size={18} className="text-white" />
            </div>
            <span className="text-xl font-extrabold text-gray-900">Learn<span className="text-orange-500">Hub</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-orange-500 transition-colors">Features</a>
            <a href="#courses" className="hover:text-orange-500 transition-colors">Courses</a>
            <a href="#testimonials" className="hover:text-orange-500 transition-colors">Reviews</a>
            <a href="#pricing" className="hover:text-orange-500 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/login")} className="text-sm font-semibold text-gray-700 hover:text-orange-500 px-4 py-2 rounded-xl hover:bg-orange-50 transition-all">
              Log In
            </button>
            <button onClick={() => navigate("/register")} className="btn-primary text-sm">
              Get Started <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-green-50 pt-20 pb-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-40" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-40" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Zap size={14} /> #1 Online Learning Platform in 2026
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Learn Skills That
              <span className="text-orange-500"> Actually </span>
              Get You Hired
            </h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed">
              Join over 50,000 students mastering in-demand skills through expert-led courses,
              hands-on projects, and a community that grows together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate("/register")} className="btn-primary text-base px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Start Learning Free <ArrowRight size={18} />
              </button>
              <button className="flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all shadow-sm">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Play size={12} className="text-white ml-0.5" fill="white" />
                </div>
                Watch Demo
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-5">No credit card required · Cancel anytime</p>
          </div>

          {/* Hero image / mockup */}
          <div className="mt-16 relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-1 text-xs text-gray-400 text-center ml-4">
                  learnhub.app/dashboard
                </div>
              </div>
              <div className="grid grid-cols-4 gap-0">
                {/* Sidebar mock */}
                <div className="col-span-1 bg-gray-50 border-r border-gray-100 p-4 min-h-48">
                  <div className="space-y-2">
                    {["Dashboard","Courses","Progress","Profile"].map((item, i) => (
                      <div key={item} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${i === 0 ? "bg-orange-500 text-white" : "text-gray-500"}`}>
                        <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-white" : "bg-gray-300"}`} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Content mock */}
                <div className="col-span-3 p-5 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-32 mb-1" />
                      <div className="h-3 bg-gray-100 rounded w-48" />
                    </div>
                    <div className="w-8 h-8 bg-orange-100 rounded-full" />
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {["bg-orange-50","bg-green-50","bg-blue-50"].map((c, i) => (
                      <div key={i} className={`${c} rounded-xl p-3`}>
                        <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                        <div className="h-5 bg-gray-300 rounded w-1/2" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {[68, 32, 15].map((p, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg shrink-0" />
                        <div className="flex-1">
                          <div className="h-2.5 bg-gray-200 rounded w-full mb-1.5" />
                          <div className="h-2 bg-gray-100 rounded w-full overflow-hidden">
                            <div className="h-full bg-orange-400 rounded" style={{ width: `${p}%` }} />
                          </div>
                        </div>
                        <span className="text-xs font-bold text-gray-400">{p}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -left-8 top-12 bg-white rounded-2xl shadow-pop border border-gray-100 px-4 py-3 hidden lg:flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Award size={18} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Certificate Earned!</p>
                <p className="text-xs text-gray-400">React Developer Course</p>
              </div>
            </div>

            <div className="absolute -right-8 bottom-12 bg-white rounded-2xl shadow-pop border border-gray-100 px-4 py-3 hidden lg:flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <TrendingUp size={18} className="text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">+2,400 students</p>
                <p className="text-xs text-gray-400">joined this week</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-orange-500 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} className="text-white" />
                </div>
                <div className="text-3xl font-extrabold text-white mb-1">{value}</div>
                <div className="text-orange-100 text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="badge-orange mb-4 inline-flex">Why LearnHub?</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              We've built the ultimate learning experience with tools and features designed to help you go from beginner to professional.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="group p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 cursor-default">
                <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Courses */}
      <section id="courses" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="badge-orange mb-3 inline-flex">Top Courses</span>
              <h2 className="text-4xl font-extrabold text-gray-900">Most Popular Right Now</h2>
            </div>
            <button onClick={() => navigate("/register")} className="btn-secondary hidden md:flex">
              View All Courses <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {topCourses.map((course) => (
              <div key={course.title} className="bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-pop hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group" onClick={() => navigate("/register")}>
                <div className="relative overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 bg-white/90 text-xs font-semibold text-gray-700 px-2.5 py-1 rounded-full">{course.level}</span>
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">${course.price}</span>
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">{course.category}</span>
                  <h3 className="font-bold text-gray-900 mt-1 mb-3 leading-snug">{course.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-gray-700">{course.rating}</span>
                    </div>
                    <span className="flex items-center gap-1"><Users size={13} />{course.students} students</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="badge-green mb-4 inline-flex">Student Stories</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Real Results from Real Students</h2>
            <p className="text-xl text-gray-500">Don't just take our word for it — hear from the students who transformed their careers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(({ name, role, avatar, text, rating }) => (
              <div key={name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-orange-200 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
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

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="badge-orange mb-4 inline-flex">Pricing</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-500">Start free, upgrade when you're ready.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free", price: "0", period: "forever", color: "border-gray-200",
                features: ["5 free courses", "Community access", "Basic progress tracking", "Mobile access"],
                cta: "Get Started Free", ctaClass: "btn-secondary w-full justify-center", popular: false,
              },
              {
                name: "Pro", price: "19", period: "per month", color: "border-orange-400",
                features: ["Unlimited courses", "HD video quality", "Certificates of completion", "Priority support", "Download for offline", "1-on-1 mentorship sessions"],
                cta: "Start Pro Free Trial", ctaClass: "btn-primary w-full justify-center", popular: true,
              },
              {
                name: "Team", price: "49", period: "per month", color: "border-green-400",
                features: ["Everything in Pro", "Up to 20 team seats", "Team analytics dashboard", "Custom learning paths", "Dedicated account manager", "SSO & admin controls"],
                cta: "Contact Sales", ctaClass: "btn-green w-full justify-center", popular: false,
              },
            ].map(plan => (
              <div key={plan.name} className={`bg-white rounded-2xl border-2 ${plan.color} p-8 relative ${plan.popular ? "shadow-pop scale-105" : "shadow-card"}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-extrabold text-xl text-gray-900 mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500 text-sm">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={16} className="text-green-500 shrink-0" />
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

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">Ready to Transform Your Career?</h2>
          <p className="text-orange-100 text-xl mb-10">Join 50,000+ students who already changed their lives with LearnHub.</p>
          <button onClick={() => navigate("/register")} className="bg-white text-orange-600 font-extrabold px-10 py-4 rounded-2xl hover:bg-orange-50 transition-all text-lg shadow-xl hover:-translate-y-0.5">
            Start Learning Today — It's Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center">
                  <BookOpen size={15} className="text-white" />
                </div>
                <span className="text-white font-extrabold text-lg">Learn<span className="text-orange-400">Hub</span></span>
              </div>
              <p className="text-sm leading-relaxed">Empowering learners worldwide with world-class education since 2024.</p>
            </div>
            {[
              { title: "Courses", links: ["Web Development", "Data Science", "Design", "Marketing", "Business"] },
              { title: "Company", links: ["About Us", "Careers", "Blog", "Press", "Contact"] },
              { title: "Support", links: ["Help Center", "Terms of Service", "Privacy Policy", "Cookie Policy", "Accessibility"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-white font-bold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}><a href="#" className="text-sm hover:text-orange-400 transition-colors">{link}</a></li>
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