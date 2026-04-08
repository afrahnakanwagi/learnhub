import { useState } from "react";
import { User, Mail, Camera, Save, Bell, Lock, Globe, Shield, CheckCircle } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useStore } from "../store/useStore";
import { ToastContainer } from "../components/ui/Toast";
import { useToast } from "../hooks/useToast";

export default function Profile() {
  const { user, login } = useStore();
  const { toasts, addToast, removeToast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", bio: "Passionate learner on a mission to master web development.", location: "Kampala, Uganda", website: "" });
  const [notifSettings, setNotifSettings] = useState({ email: true, push: true, newCourse: false, weeklyReport: true });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    login({ ...user, name: form.name, email: form.email });
    setSaving(false);
    addToast("Profile updated successfully!", "success");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Profile & Settings</h1>
          <p className="text-gray-500 mt-1">Manage your account and preferences</p>
        </div>

        {/* Cover + Avatar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-orange-400 to-orange-600 relative">
            <div className="absolute bottom-0 left-8 translate-y-1/2 flex items-end gap-4">
              <div className="relative">
                <div className="w-24 h-24 bg-orange-500 rounded-2xl border-4 border-white flex items-center justify-center text-white text-3xl font-extrabold shadow-lg">
                  {user?.name?.[0] || "U"}
                </div>
                <button className="absolute bottom-1 right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-orange-50 transition-colors">
                  <Camera size={13} className="text-orange-500" />
                </button>
              </div>
            </div>
          </div>
          <div className="pt-16 pb-6 px-8">
            <h2 className="text-xl font-extrabold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <span className="badge-orange mt-2 capitalize">{user?.role}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
          {[
            { id: "profile", label: "Profile", icon: User },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "security", label: "Security", icon: Lock },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.id ? "bg-white text-orange-500 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
              <tab.icon size={15} />{tab.label}
            </button>
          ))}
        </div>

        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8">
            <h2 className="font-extrabold text-gray-900 text-lg mb-6">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input className="input pl-10" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input className="input pl-10" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                <textarea className="input min-h-24 resize-none" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input className="input pl-10" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                <input className="input" placeholder="https://yoursite.com" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} />
              </div>
            </div>
            <button onClick={handleSave} disabled={saving} className="btn-primary mt-6">
              {saving ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Saving...</> : <><Save size={16} />Save Changes</>}
            </button>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8">
            <h2 className="font-extrabold text-gray-900 text-lg mb-6">Notification Preferences</h2>
            <div className="space-y-5">
              {[
                { key: "email", label: "Email Notifications", desc: "Receive course updates and newsletters via email" },
                { key: "push", label: "Push Notifications", desc: "Browser notifications for activity and reminders" },
                { key: "newCourse", label: "New Course Alerts", desc: "Get notified when new courses are added" },
                { key: "weeklyReport", label: "Weekly Progress Report", desc: "A summary of your learning activity each week" },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifSettings(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${notifSettings[item.key] ? "bg-orange-500" : "bg-gray-200"}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${notifSettings[item.key] ? "left-7" : "left-1"}`} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => addToast("Notification preferences saved!", "success")} className="btn-primary mt-6">
              <Save size={16} /> Save Preferences
            </button>
          </div>
        )}

        {activeTab === "security" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8">
            <h2 className="font-extrabold text-gray-900 text-lg mb-6">Security Settings</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="password" className="input pl-10" placeholder="••••••••" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="password" className="input pl-10" placeholder="••••••••" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="password" className="input pl-10" placeholder="••••••••" />
                </div>
              </div>
              <button onClick={() => addToast("Password updated successfully!", "success")} className="btn-primary">
                <Shield size={16} /> Update Password
              </button>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Active Sessions</h3>
              {[
                { device: "Chrome on Windows", location: "Kampala, Uganda", time: "Now", current: true },
                { device: "Firefox on Android", location: "Kampala, Uganda", time: "2 hours ago", current: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 mb-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{s.device}</p>
                    <p className="text-xs text-gray-500">{s.location} · {s.time}</p>
                  </div>
                  {s.current ? <span className="badge-green text-[10px]">Current</span> : <button className="text-xs text-red-500 font-semibold hover:underline">Revoke</button>}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </DashboardLayout>
  );
}