import { useState, useMemo, useRef } from "react";
import {
  Plus, Edit, Trash2, Eye, BookOpen, Users, Star,
  TrendingUp, ChevronDown, ChevronUp, GripVertical,
  Upload, X, CheckCircle, Clock, AlertCircle, Video,
  FileText, Award, Search, BarChart2, ArrowLeft,
  Save, Send, Image, PlusCircle, Layers, DollarSign,
} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Modal from "../components/ui/Modal";
import { ToastContainer } from "../components/ui/Toast";
import { useToast } from "../hooks/useToast";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Web Development", "Data Science", "Design", "Marketing",
  "Business", "Mobile Dev", "DevOps", "AI & ML",
];

const LEVELS = ["Beginner", "Intermediate", "Advanced"];

const initialCourses = [
  {
    id: "c1",
    title: "Complete React Developer Bootcamp",
    category: "Web Development",
    level: "Beginner",
    price: 49.99,
    status: "approved",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    description: "Master React from the ground up with real-world projects.",
    whatYouLearn: [
      "Build production-grade React apps",
      "Understand hooks, context, and state management",
      "Deploy apps with CI/CD pipelines",
    ],
    requirements: ["Basic JavaScript knowledge", "HTML & CSS fundamentals"],
    tags: ["react", "javascript", "frontend"],
    students: 1240,
    rating: 4.8,
    reviews: 312,
    revenue: 61950,
    curriculum: [
      {
        id: "s1", title: "Getting Started", lessons: [
          { id: "l1", title: "Course Introduction", type: "video", duration: "5:20", preview: true },
          { id: "l2", title: "Setting up the Environment", type: "video", duration: "12:45", preview: false },
          { id: "l3", title: "Module Quiz", type: "quiz", duration: "10:00", preview: false },
        ],
      },
      {
        id: "s2", title: "React Fundamentals", lessons: [
          { id: "l4", title: "JSX Deep Dive", type: "video", duration: "18:30", preview: true },
          { id: "l5", title: "Components & Props", type: "video", duration: "22:10", preview: false },
          { id: "l6", title: "Practice Exercise", type: "resource", duration: "—", preview: false },
        ],
      },
    ],
    createdAt: "2025-11-15",
    updatedAt: "2026-03-20",
  },
  {
    id: "c2",
    title: "Node.js Backend Development",
    category: "Web Development",
    level: "Intermediate",
    price: 59.99,
    status: "pending",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    description: "Build scalable REST APIs and microservices with Node.js.",
    whatYouLearn: ["REST API design", "Authentication with JWT", "Database integration"],
    requirements: ["JavaScript proficiency", "Basic terminal usage"],
    tags: ["nodejs", "backend", "api"],
    students: 870,
    rating: 4.6,
    reviews: 198,
    revenue: 52190,
    curriculum: [
      {
        id: "s3", title: "Node.js Basics", lessons: [
          { id: "l7", title: "What is Node.js?", type: "video", duration: "8:15", preview: true },
          { id: "l8", title: "Module System", type: "video", duration: "14:00", preview: false },
        ],
      },
    ],
    createdAt: "2026-01-10",
    updatedAt: "2026-04-05",
  },
  {
    id: "c3",
    title: "TypeScript Masterclass",
    category: "Web Development",
    level: "Intermediate",
    price: 44.99,
    status: "draft",
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80",
    description: "Go from zero to hero with TypeScript and advanced type patterns.",
    whatYouLearn: ["Type system fundamentals", "Generics & utility types", "TS with React"],
    requirements: ["JavaScript experience"],
    tags: ["typescript", "javascript"],
    students: 0,
    rating: 0,
    reviews: 0,
    revenue: 0,
    curriculum: [],
    createdAt: "2026-04-20",
    updatedAt: "2026-04-20",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusConfig = {
  approved: { label: "Published",  bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  icon: CheckCircle },
  pending:  { label: "In Review",  bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200",  icon: Clock       },
  draft:    { label: "Draft",      bg: "bg-gray-100",  text: "text-gray-600",   border: "border-gray-200",   icon: FileText    },
  rejected: { label: "Rejected",   bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",    icon: AlertCircle },
};

const lessonTypeConfig = {
  video:    { label: "Video",    icon: Video,    color: "text-blue-500",   bg: "bg-blue-50"   },
  quiz:     { label: "Quiz",     icon: FileText, color: "text-amber-500",  bg: "bg-amber-50"  },
  resource: { label: "Resource", icon: FileText, color: "text-green-500",  bg: "bg-green-50"  },
};

const emptyLesson = () => ({
  id: `l${Date.now()}`,
  title: "",
  type: "video",
  duration: "",
  preview: false,
});

const emptySection = () => ({
  id: `s${Date.now()}`,
  title: "",
  lessons: [emptyLesson()],
});

const emptyCourse = () => ({
  id: `c${Date.now()}`,
  title: "",
  category: CATEGORIES[0],
  level: LEVELS[0],
  price: "",
  description: "",
  whatYouLearn: [""],
  requirements: [""],
  tags: "",
  thumbnail: "",
  curriculum: [],
  students: 0,
  rating: 0,
  reviews: 0,
  revenue: 0,
  status: "draft",
  createdAt: new Date().toISOString().slice(0, 10),
  updatedAt: new Date().toISOString().slice(0, 10),
});

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.draft;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <Icon size={11} />
      {cfg.label}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
        <Icon size={18} />
      </div>
      <p className="text-2xl font-extrabold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

// ─── Course Builder (multi-step) ──────────────────────────────────────────────

const STEPS = ["Basic Info", "Content", "Curriculum", "Preview"];

function CourseBuilder({ course: initial, onSave, onCancel }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(() => ({
    ...initial,
    tags: Array.isArray(initial.tags) ? initial.tags.join(", ") : (initial.tags || ""),
  }));
  const [expandedSections, setExpandedSections] = useState({});
  const fileRef = useRef();

  const set = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  // Bullets helpers
  const setBullet = (key, idx, val) =>
    set(key, form[key].map((v, i) => (i === idx ? val : v)));
  const addBullet = (key) => set(key, [...form[key], ""]);
  const removeBullet = (key, idx) => set(key, form[key].filter((_, i) => i !== idx));

  // Curriculum helpers
  const addSection = () => set("curriculum", [...form.curriculum, emptySection()]);
  const updateSection = (sIdx, key, val) =>
    set("curriculum", form.curriculum.map((s, i) => (i === sIdx ? { ...s, [key]: val } : s)));
  const removeSection = (sIdx) =>
    set("curriculum", form.curriculum.filter((_, i) => i !== sIdx));
  const addLesson = (sIdx) =>
    set("curriculum", form.curriculum.map((s, i) =>
      i === sIdx ? { ...s, lessons: [...s.lessons, emptyLesson()] } : s));
  const updateLesson = (sIdx, lIdx, key, val) =>
    set("curriculum", form.curriculum.map((s, i) =>
      i === sIdx
        ? { ...s, lessons: s.lessons.map((l, j) => (j === lIdx ? { ...l, [key]: val } : l)) }
        : s));
  const removeLesson = (sIdx, lIdx) =>
    set("curriculum", form.curriculum.map((s, i) =>
      i === sIdx ? { ...s, lessons: s.lessons.filter((_, j) => j !== lIdx) } : s));

  const toggleSection = (id) =>
    setExpandedSections((p) => ({ ...p, [id]: !p[id] }));

  const canProceed = () => {
    if (step === 0) return form.title.trim() && form.description.trim() && form.category && form.level;
    if (step === 1) return form.whatYouLearn.some((v) => v.trim()) && form.requirements.some((v) => v.trim());
    return true;
  };

  const handleSubmit = (asDraft) => {
    const tags = form.tags
      ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];
    onSave({
      ...form,
      tags,
      price: Number(form.price) || 0,
      updatedAt: new Date().toISOString().slice(0, 10),
      status: asDraft ? "draft" : "pending",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <button onClick={onCancel} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} /> Back to courses
        </button>
        <h1 className="text-base font-extrabold text-gray-900">
          {initial.id ? "Edit Course" : "Create New Course"}
        </h1>
        <div className="flex items-center gap-2">
          <button onClick={() => handleSubmit(true)} className="flex items-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm px-4 py-2 rounded-xl transition-all">
            <Save size={15} /> Save Draft
          </button>
          {step === STEPS.length - 1 && (
            <button onClick={() => handleSubmit(false)} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-all">
              <Send size={15} /> Submit for Review
            </button>
          )}
        </div>
      </div>

      {/* Step indicators */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          {STEPS.map((s, i) => (
            <button
              key={s}
              onClick={() => i < step + 1 && setStep(i)}
              className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
                i === step
                  ? "bg-orange-500 text-white"
                  : i < step
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {i < step && <CheckCircle size={13} />}
              {i + 1}. {s}
            </button>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* ── Step 0: Basic Info ── */}
        {step === 0 && (
          <div className="space-y-6">
            <SectionCard title="Course Identity" icon={BookOpen}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Course Title *</label>
                  <input
                    className="input"
                    placeholder="e.g. Complete React Developer Bootcamp"
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description *</label>
                  <textarea
                    className="input min-h-[110px] resize-y"
                    placeholder="Describe your course — what students will achieve and why it matters."
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category *</label>
                    <select className="input" value={form.category} onChange={(e) => set("category", e.target.value)}>
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Level *</label>
                    <select className="input" value={form.level} onChange={(e) => set("level", e.target.value)}>
                      {LEVELS.map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price (USD)</label>
                    <div className="relative">
                      <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        className="input pl-8"
                        type="number"
                        min="0"
                        placeholder="49.99"
                        value={form.price}
                        onChange={(e) => set("price", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tags (comma-separated)</label>
                  <input
                    className="input"
                    placeholder="e.g. react, javascript, frontend"
                    value={form.tags}
                    onChange={(e) => set("tags", e.target.value)}
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Thumbnail Image" icon={Image}>
              <div
                className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-all"
                onClick={() => fileRef.current?.click()}
              >
                {form.thumbnail ? (
                  <div className="relative inline-block">
                    <img src={form.thumbnail} alt="thumbnail" className="w-64 h-36 object-cover rounded-xl mx-auto" />
                    <button
                      onClick={(e) => { e.stopPropagation(); set("thumbnail", ""); }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Upload size={22} className="text-orange-400" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">Click to upload thumbnail</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP · Max 2MB · 1280×720 recommended</p>
                  </div>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) set("thumbnail", URL.createObjectURL(file));
                  }}
                />
              </div>
              <div className="mt-3">
                <label className="block text-xs text-gray-500 mb-1">Or paste an image URL</label>
                <input
                  className="input text-sm"
                  placeholder="https://..."
                  value={form.thumbnail}
                  onChange={(e) => set("thumbnail", e.target.value)}
                />
              </div>
            </SectionCard>
          </div>
        )}

        {/* ── Step 1: Content ── */}
        {step === 1 && (
          <div className="space-y-6">
            <SectionCard title="What students will learn" icon={CheckCircle}>
              <div className="space-y-2">
                {form.whatYouLearn.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <CheckCircle size={15} className="text-green-500 flex-shrink-0" />
                    <input
                      className="input flex-1"
                      placeholder={`Learning outcome ${idx + 1}`}
                      value={item}
                      onChange={(e) => setBullet("whatYouLearn", idx, e.target.value)}
                    />
                    {form.whatYouLearn.length > 1 && (
                      <button onClick={() => removeBullet("whatYouLearn", idx)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={() => addBullet("whatYouLearn")} className="flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 mt-1 transition-colors">
                  <PlusCircle size={15} /> Add outcome
                </button>
              </div>
            </SectionCard>

            <SectionCard title="Requirements & prerequisites" icon={Layers}>
              <div className="space-y-2">
                {form.requirements.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-0.5" />
                    <input
                      className="input flex-1"
                      placeholder={`Requirement ${idx + 1}`}
                      value={item}
                      onChange={(e) => setBullet("requirements", idx, e.target.value)}
                    />
                    {form.requirements.length > 1 && (
                      <button onClick={() => removeBullet("requirements", idx)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={() => addBullet("requirements")} className="flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 mt-1 transition-colors">
                  <PlusCircle size={15} /> Add requirement
                </button>
              </div>
            </SectionCard>
          </div>
        )}

        {/* ── Step 2: Curriculum ── */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-gray-900">Course Curriculum</h2>
                <p className="text-sm text-gray-500">
                  {form.curriculum.length} section{form.curriculum.length !== 1 ? "s" : ""} ·{" "}
                  {form.curriculum.reduce((acc, s) => acc + s.lessons.length, 0)} lessons total
                </p>
              </div>
              <button onClick={addSection} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-all">
                <Plus size={15} /> Add Section
              </button>
            </div>

            {form.curriculum.length === 0 && (
              <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-14 text-center">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Layers size={22} className="text-orange-400" />
                </div>
                <p className="text-sm font-semibold text-gray-600">No sections yet</p>
                <p className="text-xs text-gray-400 mt-1 mb-4">Add sections to organize your course content</p>
                <button onClick={addSection} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl mx-auto transition-all">
                  <Plus size={15} /> Add First Section
                </button>
              </div>
            )}

            {form.curriculum.map((section, sIdx) => {
              const isOpen = expandedSections[section.id] !== false;
              return (
                <div key={section.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  {/* Section header */}
                  <div className="flex items-center gap-3 px-5 py-4 bg-gray-50 border-b border-gray-100">
                    <GripVertical size={16} className="text-gray-300 flex-shrink-0" />
                    <input
                      className="flex-1 bg-transparent text-sm font-bold text-gray-900 placeholder-gray-400 focus:outline-none"
                      placeholder={`Section ${sIdx + 1} title`}
                      value={section.title}
                      onChange={(e) => updateSection(sIdx, "title", e.target.value)}
                    />
                    <span className="text-xs text-gray-400">{section.lessons.length} lesson{section.lessons.length !== 1 ? "s" : ""}</span>
                    <button onClick={() => toggleSection(section.id)} className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <button onClick={() => removeSection(sIdx)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>

                  {/* Lessons */}
                  {isOpen && (
                    <div className="p-4 space-y-2">
                      {section.lessons.map((lesson, lIdx) => {
                        const typeCfg = lessonTypeConfig[lesson.type] || lessonTypeConfig.video;
                        const TypeIcon = typeCfg.icon;
                        return (
                          <div key={lesson.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-orange-200 bg-white group transition-all">
                            <GripVertical size={14} className="text-gray-300 flex-shrink-0" />
                            <div className={`w-7 h-7 ${typeCfg.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <TypeIcon size={13} className={typeCfg.color} />
                            </div>
                            <input
                              className="flex-1 text-sm text-gray-800 font-medium placeholder-gray-400 focus:outline-none bg-transparent"
                              placeholder="Lesson title"
                              value={lesson.title}
                              onChange={(e) => updateLesson(sIdx, lIdx, "title", e.target.value)}
                            />
                            <select
                              className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 focus:outline-none focus:ring-1 focus:ring-orange-300"
                              value={lesson.type}
                              onChange={(e) => updateLesson(sIdx, lIdx, "type", e.target.value)}
                            >
                              <option value="video">Video</option>
                              <option value="quiz">Quiz</option>
                              <option value="resource">Resource</option>
                            </select>
                            <input
                              className="w-20 text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 focus:outline-none focus:ring-1 focus:ring-orange-300"
                              placeholder="5:30"
                              value={lesson.duration}
                              onChange={(e) => updateLesson(sIdx, lIdx, "duration", e.target.value)}
                            />
                            <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={lesson.preview}
                                onChange={(e) => updateLesson(sIdx, lIdx, "preview", e.target.checked)}
                                className="w-3.5 h-3.5 accent-orange-500"
                              />
                              Free preview
                            </label>
                            <button onClick={() => removeLesson(sIdx, lIdx)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                              <X size={14} />
                            </button>
                          </div>
                        );
                      })}
                      <button onClick={() => addLesson(sIdx)} className="flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 pl-2 mt-1 transition-colors">
                        <PlusCircle size={15} /> Add lesson
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Step 3: Preview ── */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {form.thumbnail && (
                <img src={form.thumbnail} alt="thumbnail" className="w-full h-56 object-cover" />
              )}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="text-2xl font-extrabold text-gray-900">{form.title || "Untitled Course"}</h2>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{form.level}</span>
                    <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">{form.category}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{form.description || "No description provided."}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
                  <span className="font-bold text-gray-900 text-xl">${Number(form.price || 0).toFixed(2)}</span>
                  <span>{form.curriculum.reduce((a, s) => a + s.lessons.length, 0)} lessons</span>
                  <span>{form.curriculum.length} sections</span>
                </div>

                {form.whatYouLearn.filter(Boolean).length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 mb-2">What you'll learn</h3>
                    <div className="grid grid-cols-2 gap-1.5">
                      {form.whatYouLearn.filter(Boolean).map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {form.requirements.filter(Boolean).length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Requirements</h3>
                    <ul className="space-y-1">
                      {form.requirements.filter(Boolean).map((r, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Curriculum preview */}
            {form.curriculum.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Curriculum Preview</h3>
                <div className="space-y-3">
                  {form.curriculum.map((s, sIdx) => (
                    <div key={s.id} className="border border-gray-100 rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                        <span className="font-semibold text-sm text-gray-900">{s.title || `Section ${sIdx + 1}`}</span>
                        <span className="text-xs text-gray-400">{s.lessons.length} lessons</span>
                      </div>
                      <div className="divide-y divide-gray-50">
                        {s.lessons.map((l) => {
                          const tCfg = lessonTypeConfig[l.type];
                          const TIcon = tCfg.icon;
                          return (
                            <div key={l.id} className="flex items-center gap-3 px-4 py-2.5">
                              <TIcon size={13} className={tCfg.color} />
                              <span className="text-sm text-gray-700 flex-1">{l.title || "Untitled lesson"}</span>
                              {l.preview && <span className="text-[11px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">Preview</span>}
                              <span className="text-xs text-gray-400">{l.duration || "—"}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
              <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800">Ready to submit?</p>
                <p className="text-sm text-amber-700 mt-0.5">
                  Submitting sends your course for admin review. You'll be notified when it's approved or if changes are needed. You can still save as draft to keep editing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between pt-4 border-t border-gray-200">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-sm px-5 py-2.5 rounded-xl transition-all"
          >
            <ArrowLeft size={15} /> Previous
          </button>
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all"
            >
              Next: {STEPS[step + 1]} →
            </button>
          ) : (
            <div className="flex gap-3">
              <button onClick={() => handleSubmit(true)} className="flex items-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all">
                <Save size={15} /> Save Draft
              </button>
              <button onClick={() => handleSubmit(false)} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all">
                <Send size={15} /> Submit for Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
        <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center justify-center">
          <Icon size={16} className="text-orange-500" />
        </div>
        <h3 className="font-extrabold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ─── Analytics Panel ──────────────────────────────────────────────────────────

function CourseAnalytics({ course, onBack }) {
  const monthlyData = [
    { month: "Nov", students: 80,  revenue: 3999  },
    { month: "Dec", students: 140, revenue: 7000  },
    { month: "Jan", students: 210, revenue: 10499 },
    { month: "Feb", students: 175, revenue: 8750  },
    { month: "Mar", students: 320, revenue: 15998 },
    { month: "Apr", students: 315, revenue: 15703 },
  ];
  const maxStudents = Math.max(...monthlyData.map((d) => d.students));
  const maxRevenue  = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">{course.title}</h2>
          <p className="text-sm text-gray-500">Course Analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}    label="Total Students" value={course.students.toLocaleString()} color="bg-blue-50 text-blue-600" />
        <StatCard icon={DollarSign} label="Total Revenue" value={`$${course.revenue.toLocaleString()}`} color="bg-green-50 text-green-600" />
        <StatCard icon={Star}     label="Avg Rating"    value={course.rating || "—"} sub={`${course.reviews} reviews`} color="bg-amber-50 text-amber-600" />
        <StatCard icon={Award}    label="Completions"   value={Math.floor(course.students * 0.61)} sub="61% completion rate" color="bg-orange-50 text-orange-600" />
      </div>

      {/* Bar charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-1">Monthly Students</h3>
          <p className="text-xs text-gray-400 mb-5">New enrolments per month</p>
          <div className="flex items-end gap-2 h-40">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-gray-500">{d.students}</span>
                <div
                  className="w-full bg-orange-400 rounded-t-lg transition-all"
                  style={{ height: `${(d.students / maxStudents) * 100}%` }}
                />
                <span className="text-[10px] text-gray-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-1">Monthly Revenue</h3>
          <p className="text-xs text-gray-400 mb-5">USD earned per month</p>
          <div className="flex items-end gap-2 h-40">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-gray-500">${(d.revenue / 1000).toFixed(1)}k</span>
                <div
                  className="w-full bg-green-400 rounded-t-lg transition-all"
                  style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                />
                <span className="text-[10px] text-gray-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Curriculum stats */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Curriculum Overview</h3>
        <div className="space-y-3">
          {course.curriculum.map((section, i) => (
            <div key={section.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-orange-50 flex items-center justify-center text-[11px] font-bold text-orange-600">{i + 1}</span>
                <span className="text-sm font-medium text-gray-800">{section.title}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{section.lessons.length} lessons</span>
                <span>{section.lessons.filter((l) => l.type === "video").length} videos</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function InstructorDashboard() {
  const { toasts, addToast, removeToast } = useToast();
  const [courses, setCourses] = useState(initialCourses);
  const [view, setView] = useState("list");        // "list" | "builder" | "analytics"
  const [editingCourse, setEditingCourse] = useState(null);
  const [analyticsCourse, setAnalyticsCourse] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() =>
    courses.filter((c) => {
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      const matchSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchStatus && matchSearch;
    }),
  [courses, statusFilter, searchTerm]);

  const totalStudents = courses.reduce((a, c) => a + c.students, 0);
  const totalRevenue  = courses.reduce((a, c) => a + c.revenue, 0);
  const avgRating     = courses.filter((c) => c.rating > 0).reduce((a, c, _, arr) => a + c.rating / arr.length, 0);

  const openCreate = () => {
    setEditingCourse(emptyCourse());
    setView("builder");
  };

  const openEdit = (course) => {
    setEditingCourse(course);
    setView("builder");
  };

  const openAnalytics = (course) => {
    setAnalyticsCourse(course);
    setView("analytics");
  };

  const handleSave = (updated) => {
    const isNew = !courses.find((c) => c.id === updated.id);
    if (isNew) {
      setCourses((prev) => [updated, ...prev]);
      addToast(updated.status === "draft" ? "Draft saved." : "Course submitted for review.", "success");
    } else {
      setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      addToast(updated.status === "draft" ? "Draft saved." : "Course resubmitted for review.", "success");
    }
    setView("list");
  };

  const handleDelete = (course) => {
    setCourses((prev) => prev.filter((c) => c.id !== course.id));
    addToast(`"${course.title}" deleted.`, "warning");
    setDeleteTarget(null);
  };

  // Full-screen builder / analytics
  if (view === "builder" && editingCourse) {
    return (
      <>
        <CourseBuilder course={editingCourse} onSave={handleSave} onCancel={() => setView("list")} />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">My Courses</h1>
            <p className="text-gray-500 mt-0.5">Create, manage, and track your course catalog</p>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all hover:-translate-y-0.5 shadow-sm">
            <Plus size={16} /> Create New Course
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={BookOpen}    label="Total Courses"  value={courses.length}                     color="bg-orange-50 text-orange-500" />
          <StatCard icon={Users}       label="Total Students" value={totalStudents.toLocaleString()}      color="bg-blue-50 text-blue-500"    />
          <StatCard icon={DollarSign}  label="Total Revenue"  value={`$${totalRevenue.toLocaleString()}`} color="bg-green-50 text-green-600"  />
          <StatCard icon={Star}        label="Avg Rating"     value={avgRating ? avgRating.toFixed(1) : "—"} sub={`across ${courses.filter(c=>c.rating>0).length} rated courses`} color="bg-amber-50 text-amber-500" />
        </div>

        {/* Filters + search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search your courses..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
          <div className="flex gap-2">
            {["all", "approved", "pending", "draft", "rejected"].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${
                  statusFilter === f
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f === "all" ? "All" : statusConfig[f]?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Analytics inline view */}
        {view === "analytics" && analyticsCourse && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
            <CourseAnalytics course={analyticsCourse} onBack={() => setView("list")} />
          </div>
        )}

        {/* Course list */}
        {view === "list" && (
          <>
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-16 text-center">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={26} className="text-orange-400" />
                </div>
                <p className="text-base font-bold text-gray-700">No courses found</p>
                <p className="text-sm text-gray-400 mt-1 mb-6">
                  {searchTerm || statusFilter !== "all" ? "Try adjusting your filters." : "Start by creating your first course."}
                </p>
                {!searchTerm && statusFilter === "all" && (
                  <button onClick={openCreate} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-3 rounded-xl mx-auto transition-all">
                    <Plus size={15} /> Create First Course
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((course) => (
                  <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-pop hover:-translate-y-0.5 transition-all overflow-hidden">
                    <div className="flex gap-0">
                      {/* Thumbnail */}
                      <div className="w-44 flex-shrink-0 relative hidden sm:block">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-5 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <StatusBadge status={course.status} />
                              <span className="text-xs text-gray-400">{course.category}</span>
                              <span className="text-xs text-gray-400">·</span>
                              <span className="text-xs text-gray-400">{course.level}</span>
                            </div>
                            <h3 className="font-extrabold text-gray-900 text-base leading-snug truncate">{course.title}</h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">{course.description}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xl font-extrabold text-gray-900">${course.price.toFixed(2)}</p>
                          </div>
                        </div>

                        {/* Stats row */}
                        <div className="flex items-center gap-5 mt-4 pt-4 border-t border-gray-50">
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <Users size={14} className="text-blue-400" />
                            <span className="font-semibold">{course.students.toLocaleString()}</span>
                            <span className="text-gray-400">students</span>
                          </div>
                          {course.rating > 0 && (
                            <div className="flex items-center gap-1.5 text-sm text-gray-600">
                              <Star size={14} className="text-amber-400 fill-amber-400" />
                              <span className="font-semibold">{course.rating}</span>
                              <span className="text-gray-400">({course.reviews})</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <DollarSign size={14} className="text-green-500" />
                            <span className="font-semibold">${course.revenue.toLocaleString()}</span>
                            <span className="text-gray-400">earned</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <Layers size={14} className="text-gray-400" />
                            <span>{course.curriculum.length} sections · {course.curriculum.reduce((a, s) => a + s.lessons.length, 0)} lessons</span>
                          </div>

                          {/* Actions */}
                          <div className="ml-auto flex items-center gap-1.5">
                            <button
                              onClick={() => openAnalytics(course)}
                              className="p-2 rounded-xl hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-colors"
                              title="Analytics"
                            >
                              <BarChart2 size={16} />
                            </button>
                            <button
                              onClick={() => openEdit(course)}
                              className="p-2 rounded-xl hover:bg-orange-50 text-gray-500 hover:text-orange-600 transition-colors"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => setDeleteTarget(course)}
                              className="p-2 rounded-xl hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Rejection notice */}
                        {course.status === "rejected" && (
                          <div className="mt-3 flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                            <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
                            <p className="text-xs text-red-700">This course was rejected. Edit and resubmit for another review.</p>
                            <button onClick={() => openEdit(course)} className="ml-auto text-xs font-semibold text-red-600 hover:text-red-700 underline">
                              Edit now
                            </button>
                          </div>
                        )}

                        {/* Pending notice */}
                        {course.status === "pending" && (
                          <div className="mt-3 flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                            <Clock size={14} className="text-amber-500 flex-shrink-0" />
                            <p className="text-xs text-amber-700">Under admin review. You'll be notified once a decision is made.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete confirm modal */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Course" size="sm">
        {deleteTarget && (
          <div className="space-y-5">
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <p className="text-sm font-semibold text-red-800">{deleteTarget.title}</p>
              <p className="text-xs text-red-600 mt-1">
                {deleteTarget.students > 0
                  ? `This course has ${deleteTarget.students} enrolled students. Deleting will permanently remove all content.`
                  : "This action cannot be undone."}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm px-4 py-2.5 rounded-xl transition-all" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all" onClick={() => handleDelete(deleteTarget)}>
                Delete permanently
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </DashboardLayout>
  );
}