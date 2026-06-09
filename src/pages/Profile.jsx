import { useState } from "react";
import { User, Mail, Camera, Save, Bell, Lock, Globe, Shield, CheckCircle, AlertTriangle, X, Info } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useStore } from "../store/useStore";

/* ─── Toast system ─────────────────────────────────────────────────── */
function ToastIcon({ type }) {
  if (type === "success") return <CheckCircle size={18} className="text-green-500" />;
  if (type === "error")   return <X size={18} className="text-red-500" />;
  return <Info size={18} className="text-orange-500" />;
}

function Toast({ toast, onRemove }) {
  const styles = {
    success: "border-green-200 bg-white",
    error:   "border-red-200   bg-white",
    info:    "border-orange-200 bg-white",
  };
  const progress = {
    success: "bg-green-500",
    error:   "bg-red-500",
    info:    "bg-orange-500",
  };
  const iconBg = {
    success: "bg-green-50",
    error:   "bg-red-50",
    info:    "bg-orange-50",
  };

  return (
    <div
      className={`relative flex items-start gap-3 min-w-[280px] max-w-[360px] rounded-2xl border-[1.5px] p-4 shadow-xl overflow-hidden
        ${styles[toast.type]} animate-[toastIn_.35s_cubic-bezier(.34,1.56,.64,1)_forwards]`}
    >
      {/* icon */}
      <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${iconBg[toast.type]}`}>
        <ToastIcon type={toast.type} />
      </div>

      {/* body */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900">{toast.title}</p>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{toast.message}</p>
      </div>

      {/* close */}
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <X size={13} />
      </button>

      {/* progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-[3px] ${progress[toast.type]} animate-[toastProgress_3.5s_linear_forwards]`}
        style={{ width: "100%" }}
      />
    </div>
  );
}

function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-2.5 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto">
          <Toast toast={t} onRemove={onRemove} />
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);
  let nextId = 0;

  const addToast = (title, message, type = "success") => {
    const id = ++nextId + Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => removeToast(id), 3500);
  };

  const removeToast = id =>
    setToasts(prev => prev.filter(t => t.id !== id));

  return { toasts, addToast, removeToast };
}

/* ─── Confirm Modal ────────────────────────────────────────────────── */
function ConfirmModal({ open, onConfirm, onCancel, title, message, confirmLabel = "Confirm", danger = false }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/45 backdrop-blur-sm"
      onClick={onCancel}
      style={{ animation: "fadeIn .2s ease" }}
    >
      <div
        className="bg-white rounded-2xl p-7 max-w-sm w-[90%] shadow-2xl"
        onClick={e => e.stopPropagation()}
        style={{ animation: "modalIn .3s cubic-bezier(.34,1.56,.64,1)" }}
      >
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${danger ? "bg-amber-50 border border-amber-200" : "bg-orange-50 border border-orange-200"}`}>
          <AlertTriangle size={26} className={danger ? "text-amber-500" : "text-orange-500"} />
        </div>
        <h3 className="text-lg font-extrabold text-center text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 text-center leading-relaxed mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Keep editing
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-colors ${danger ? "bg-red-500 hover:bg-red-600" : "bg-orange-500 hover:bg-orange-600"}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Toggle ───────────────────────────────────────────────────────── */
function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${checked ? "bg-orange-500" : "bg-gray-200"}`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${checked ? "left-6" : "left-1"}`}
      />
    </button>
  );
}

/* ─── Main Page ────────────────────────────────────────────────────── */
export default function Profile() {
  const { user, login } = useStore();
  const { toasts, addToast, removeToast } = useToast();

  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [form, setForm] = useState({
    name:     user?.name  || "Jordan Kamya",
    email:    user?.email || "jordan.kamya@email.com",
    bio:      "Passionate learner on a mission to master web development.",
    location: "Kampala, Uganda",
    website:  "",
  });

  const [notifs, setNotifs] = useState({
    email:   true,
    push:    true,
    newCourse: false,
    weekly:  true,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    login({ ...user, name: form.name, email: form.email });
    setSaving(false);
    addToast("Profile updated", "Your changes have been saved successfully.", "success");
  };

  const handleCancel = () => setShowCancelModal(true);

  const confirmCancel = () => {
    setShowCancelModal(false);
    setForm({
      name: user?.name || "Jordan Kamya",
      email: user?.email || "jordan.kamya@email.com",
      bio: "Passionate learner on a mission to master web development.",
      location: "Kampala, Uganda",
      website: "",
    });
    addToast("Changes discarded", "Your edits have been reverted.", "error");
  };

  const tabs = [
    { id: "profile",       label: "Profile",       icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security",      label: "Security",      icon: Lock },
  ];

  return (
    <DashboardLayout>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(100%) scale(.9); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes toastProgress {
          from { width: 100%; }
          to   { width: 0%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <div className="max-w-3xl mx-auto space-y-5 pb-10">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Profile & Settings</h1>
          <p className="text-gray-500 mt-1">Manage your account and preferences</p>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div
            className="h-28 relative"
            style={{ background: "linear-gradient(135deg,#F97316 0%,#FB923C 40%,#FDBA74 100%)" }}
          >
            <div className="absolute bottom-0 left-7 translate-y-1/2">
              <div className="relative">
                <div className="w-20 h-20 bg-orange-500 rounded-2xl border-4 border-white flex items-center justify-center text-white text-3xl font-extrabold shadow-lg">
                  {user?.name?.[0] || "J"}
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-orange-50 transition-colors border border-gray-100">
                  <Camera size={11} className="text-orange-500" />
                </button>
              </div>
            </div>
          </div>
          <div className="pt-14 pb-5 px-7">
            <h2 className="text-xl font-extrabold text-gray-900">{user?.name || "Jordan Kamya"}</h2>
            <p className="text-gray-500 text-sm">{user?.email || "jordan.kamya@email.com"}</p>
            <span className="inline-flex mt-2 px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full uppercase tracking-wide">
              {user?.role || "Student"}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-white text-orange-500 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Profile tab ── */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <h2 className="text-base font-extrabold text-gray-900">Personal Information</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                <div className="relative">
                  <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full border-[1.5px] border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    className="w-full border-[1.5px] border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bio</label>
                <textarea
                  className="w-full border-[1.5px] border-gray-200 rounded-xl py-2.5 px-4 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none min-h-[88px]"
                  value={form.bio}
                  onChange={e => setForm({ ...form, bio: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Location</label>
                <div className="relative">
                  <Globe size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    className="w-full border-[1.5px] border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Website</label>
                <input
                  type="url"
                  placeholder="https://yoursite.com"
                  className="w-full border-[1.5px] border-gray-200 rounded-xl py-2.5 px-4 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  value={form.website}
                  onChange={e => setForm({ ...form, website: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-200 active:translate-y-0"
              >
                {saving ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Saving…
                  </>
                ) : (
                  <><Save size={14} /> Save Changes</>
                )}
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-5 py-2.5 border-[1.5px] border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm font-bold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── Notifications tab ── */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <h2 className="text-base font-extrabold text-gray-900">Notification Preferences</h2>
            </div>
            <div className="space-y-3">
              {[
                { key: "email",     label: "Email Notifications",    desc: "Receive course updates and newsletters via email" },
                { key: "push",      label: "Push Notifications",     desc: "Browser notifications for activity and reminders" },
                { key: "newCourse", label: "New Course Alerts",      desc: "Get notified when new courses are added" },
                { key: "weekly",    label: "Weekly Progress Report", desc: "A summary of your learning activity each week" },
              ].map(item => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 rounded-xl border-[1.5px] border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all"
                >
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle
                    checked={notifs[item.key]}
                    onChange={v => setNotifs(prev => ({ ...prev, [item.key]: v }))}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => addToast("Preferences saved", "Your notification settings have been updated.", "success")}
              className="flex items-center gap-2 mt-6 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-200"
            >
              <Save size={14} /> Save Preferences
            </button>
          </div>
        )}

        {/* ── Security tab ── */}
        {activeTab === "security" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <h2 className="text-base font-extrabold text-gray-900">Change Password</h2>
            </div>
            <div className="space-y-4">
              {["Current Password", "New Password", "Confirm New Password"].map(label => (
                <div key={label}>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full border-[1.5px] border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 bg-gray-50 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => addToast("Password changed", "Your password has been updated securely.", "success")}
                className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-200"
              >
                <Shield size={14} /> Update Password
              </button>
            </div>

            <hr className="my-7 border-gray-100" />

            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <h2 className="text-base font-extrabold text-gray-900">Active Sessions</h2>
            </div>
            {[
              { device: "Chrome on Windows", location: "Kampala, Uganda", time: "Now",          current: true  },
              { device: "Firefox on Android", location: "Kampala, Uganda", time: "2 hours ago", current: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 mb-2 border border-gray-100">
                <div>
                  <p className="text-sm font-bold text-gray-900">{s.device}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.location} · {s.time}</p>
                </div>
                {s.current
                  ? <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-600 uppercase tracking-wider">Current</span>
                  : <button
                      onClick={() => addToast("Session revoked", "The device has been signed out.", "info")}
                      className="text-xs font-bold text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Revoke
                    </button>
                }
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toasts */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Cancel modal */}
      <ConfirmModal
        open={showCancelModal}
        title="Discard changes?"
        message="You have unsaved changes. Are you sure you want to discard them? This action cannot be undone."
        confirmLabel="Discard"
        danger
        onConfirm={confirmCancel}
        onCancel={() => setShowCancelModal(false)}
      />
    </DashboardLayout>
  );
}