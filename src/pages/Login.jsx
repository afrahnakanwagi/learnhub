import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookOpen, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { useStore } from "../store/useStore";

const demoAccounts = [
  { label: "Student", email: "student@demo.com", password: "demo123", role: "student", name: "Alex Johnson" },
  { label: "Instructor", email: "instructor@demo.com", password: "demo123", role: "instructor", name: "Sarah Johnson" },
  { label: "Admin", email: "admin@demo.com", password: "demo123", role: "admin", name: "Admin User" },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    const match = demoAccounts.find(a => a.email === form.email && a.password === form.password);
  if (match) {
    login({ name: match.name, email: match.email, role: match.role });
    if (match.role === "admin") navigate("/admin");
    else if (match.role === "instructor") navigate("/instructor");
    else navigate("/dashboard");
  }
    setLoading(false);
  };

  const loginDemo = (account) => {
    setForm({ email: account.email, password: account.password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex">

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-orange-500 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white" style={{ width: `${80 + i*40}px`, height: `${80 + i*40}px`, top: `${10 + i*12}%`, left: `${5 + i*8}%`, opacity: 0.5 }} />
          ))}
        </div>
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <span className="text-2xl font-extrabold text-white">LearnHub</span>
        </Link>
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-6">
            Welcome back!<br />Keep learning,<br />keep growing.
          </h2>
          <div className="space-y-4">
            {[
              { stat: "50,000+", label: "Active learners worldwide" },
              { stat: "342+", label: "Expert-led courses" },
              { stat: "4.8★", label: "Average course rating" },
            ].map(({ stat, label }) => (
              <div key={stat} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/60" />
                <span className="text-white/80 text-sm"><strong className="text-white">{stat}</strong> {label}</span>
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
            <span className="text-xl font-extrabold text-gray-900">Learn<span className="text-orange-500">Hub</span></span>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Sign in</h1>
              <p className="text-gray-500">Don't have an account? <Link to="/register" className="text-orange-500 font-semibold hover:underline">Sign up free</Link></p>
            </div>

            {/* Demo accounts */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Demo Login</p>
              <div className="flex gap-2">
                {demoAccounts.map(account => (
                  <button
                    key={account.role}
                    onClick={() => loginDemo(account)}
                    className="flex-1 py-2 px-3 rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all text-xs font-semibold text-gray-600 hover:text-orange-600"
                  >
                    {account.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">or sign in with email</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">Password</label>
                  <a href="#" className="text-sm text-orange-500 hover:underline font-medium">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className="input pl-10 pr-10"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3 text-base rounded-xl"
                style={{ width: "100%", justifyContent: "center", display: "flex" }}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <>Sign In <ArrowRight size={16} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}