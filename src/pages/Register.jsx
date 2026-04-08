import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookOpen, Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle, GraduationCap, PenTool } from "lucide-react";
import { useStore } from "../store/useStore";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordStrength = (p) => {
    if (!p) return { score: 0, label: "", color: "" };
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    const map = [
      { score: 0, label: "", color: "" },
      { score: 1, label: "Weak", color: "bg-red-400" },
      { score: 2, label: "Fair", color: "bg-yellow-400" },
      { score: 3, label: "Good", color: "bg-blue-400" },
      { score: 4, label: "Strong", color: "bg-green-500" },
    ];
    return map[score];
  };

  const strength = passwordStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    login({ name: form.name, email: form.email, role: form.role });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex">

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-500 to-green-600 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white" style={{ width: `${60 + i*50}px`, height: `${60 + i*50}px`, bottom: `${10 + i*15}%`, right: `${5 + i*8}%` }} />
          ))}
        </div>
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <span className="text-2xl font-extrabold text-white">LearnHub</span>
        </Link>
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-8">
            Start your learning<br />journey today.<br />It's free!
          </h2>
          <div className="space-y-4">
            {[
              "Access 5 free courses immediately",
              "Track your progress visually",
              "Earn certificates on completion",
              "Join a community of 50k+ learners",
              "Learn at your own pace, anytime",
            ].map(item => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-white/80 shrink-0" />
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/50 text-xs relative z-10">© 2026 LearnHub · All rights reserved</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
              <BookOpen size={17} className="text-white" />
            </div>
            <span className="text-xl font-extrabold">Learn<span className="text-orange-500">Hub</span></span>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Create account</h1>
              <p className="text-gray-500">Already have an account? <Link to="/login" className="text-orange-500 font-semibold hover:underline">Sign in</Link></p>
            </div>

            {/* Role selector */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">I want to join as:</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "student" })}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${form.role === "student" ? "border-orange-400 bg-orange-50" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <GraduationCap size={22} className={form.role === "student" ? "text-orange-500" : "text-gray-400"} />
                  <div className="text-left">
                    <p className={`font-bold text-sm ${form.role === "student" ? "text-orange-700" : "text-gray-700"}`}>Student</p>
                    <p className="text-xs text-gray-400">I want to learn</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "instructor" })}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${form.role === "instructor" ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <PenTool size={22} className={form.role === "instructor" ? "text-green-600" : "text-gray-400"} />
                  <div className="text-left">
                    <p className={`font-bold text-sm ${form.role === "instructor" ? "text-green-700" : "text-gray-700"}`}>Instructor</p>
                    <p className="text-xs text-gray-400">I want to teach</p>
                  </div>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full name</label>
                <div className="relative">
                  <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="input pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
                <div className="relative">
                  <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="input pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className="input pl-10 pr-10"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1,2,3,4].map(i => (
                        <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i <= strength.score ? strength.color : "bg-gray-200"}`} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">Password strength: <span className="font-semibold">{strength.label}</span></p>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input type="checkbox" required id="terms" className="mt-1 accent-orange-500" />
                <label htmlFor="terms" className="text-sm text-gray-500">
                  I agree to the <a href="#" className="text-orange-500 hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-orange-500 hover:underline font-medium">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3 text-base rounded-xl mt-2"
                style={{ width: "100%", display: "flex", justifyContent: "center" }}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  <>Create Free Account <ArrowRight size={16} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}