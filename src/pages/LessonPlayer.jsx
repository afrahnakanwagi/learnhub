import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Pause, Volume2, Maximize, CheckCircle, ChevronLeft, ChevronRight, BookOpen, FileText, List, X, Award } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProgressBar from "../components/ui/ProgressBar";
import Modal from "../components/ui/Modal";
import { useStore } from "../store/useStore";
import { courses } from "../data/mockData";

export default function LessonPlayer() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { enrollments, completeLesson } = useStore();
  const [playing, setPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showCertModal, setShowCertModal] = useState(false);
  const [notes, setNotes] = useState("");

  const course = courses.find(c => c.id === courseId);
  const enrollment = enrollments.find(e => e.courseId === courseId);

  if (!course) return <DashboardLayout><div className="text-center py-20"><p className="text-xl font-bold text-gray-400">Course not found</p></div></DashboardLayout>;

  const allLessons = course.curriculum.flatMap(s => s.lessons.map(l => ({ ...l, section: s.section })));
  const currentLesson = allLessons.find(l => l.id === lessonId) || allLessons[0];
  const currentIdx = allLessons.findIndex(l => l.id === (currentLesson?.id));
  const isCompleted = enrollment?.completedLessons?.includes(currentLesson?.id);

  const handleComplete = () => {
    completeLesson(courseId, currentLesson.id);
    if (currentIdx === allLessons.length - 1) setShowCertModal(true);
  };

  const goTo = (lesson) => navigate(`/learn/${courseId}/${lesson.id}`);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto -mt-2">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <button onClick={() => navigate(`/courses/${courseId}`)} className="hover:text-orange-500 transition-colors font-medium">{course.title}</button>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-semibold">{currentLesson?.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Video Player */}
          <div className={showSidebar ? "lg:col-span-2" : "lg:col-span-3"}>
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl mb-4">
              {/* Video area */}
              <div className="relative aspect-video bg-gray-900 flex items-center justify-center group">
                <img
                  src={course.image}
                  alt="lesson thumbnail"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity ${playing ? "opacity-30" : "opacity-60"}`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setPlaying(!playing)}
                    className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all"
                  >
                    {playing
                      ? <Pause size={28} className="text-orange-500" />
                      : <Play size={28} className="text-orange-500 ml-1" fill="currentColor" />}
                  </button>
                </div>
                {playing && (
                  <div className="absolute bottom-4 left-0 right-0 px-4">
                    <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full w-1/3 animate-pulse" />
                    </div>
                  </div>
                )}
                <button onClick={() => setShowSidebar(!showSidebar)} className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white p-2 rounded-lg transition-colors">
                  <List size={16} />
                </button>
              </div>

              {/* Player controls */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-gray-800">
                <div className="flex items-center gap-3">
                  <button onClick={() => setPlaying(!playing)} className="text-white hover:text-orange-400 transition-colors">
                    {playing ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <Volume2 size={18} className="text-gray-400" />
                  <span className="text-gray-400 text-sm">0:00 / {currentLesson?.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <select className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-lg border border-gray-700">
                    <option>1x</option><option>1.25x</option><option>1.5x</option><option>2x</option>
                  </select>
                  <Maximize size={18} className="text-gray-400 cursor-pointer hover:text-white" />
                </div>
              </div>
            </div>

            {/* Lesson nav */}
            <div className="flex items-center justify-between gap-4 mb-5">
              <button
                onClick={() => currentIdx > 0 && goTo(allLessons[currentIdx - 1])}
                disabled={currentIdx === 0}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-orange-300 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <button
                onClick={handleComplete}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${isCompleted ? "bg-green-100 text-green-700 border border-green-200" : "btn-green"}`}
              >
                <CheckCircle size={16} />
                {isCompleted ? "Completed!" : "Mark Complete"}
              </button>

              <button
                onClick={() => currentIdx < allLessons.length - 1 && goTo(allLessons[currentIdx + 1])}
                disabled={currentIdx === allLessons.length - 1}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-orange-300 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
              <div className="flex border-b border-gray-100">
                {[
                  { id: "overview", label: "Overview", icon: BookOpen },
                  { id: "notes", label: "My Notes", icon: FileText },
                  { id: "resources", label: "Resources", icon: List },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-all ${activeTab === tab.id ? "border-orange-500 text-orange-500" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                    <tab.icon size={15} />{tab.label}
                  </button>
                ))}
              </div>
              <div className="p-6">
                {activeTab === "overview" && (
                  <div>
                    <h3 className="font-extrabold text-lg text-gray-900 mb-2">{currentLesson?.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      In this lesson, you'll learn the core concepts behind {currentLesson?.title?.toLowerCase()}.
                      We'll cover practical examples, best practices, and real-world applications.
                      By the end, you'll be confident applying these concepts in your own projects.
                    </p>
                    <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                      <p className="text-sm font-bold text-orange-800 mb-2">🎯 Learning Objectives</p>
                      <ul className="space-y-1.5">
                        {["Understand the core concepts thoroughly", "Apply best practices in real scenarios", "Build confidence for the upcoming quiz"].map(obj => (
                          <li key={obj} className="flex items-center gap-2 text-xs text-orange-700">
                            <CheckCircle size={13} />{obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                {activeTab === "notes" && (
                  <div>
                    <p className="text-sm text-gray-500 mb-3">Take notes for this lesson:</p>
                    <textarea
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="Start typing your notes here..."
                      className="input min-h-36 resize-none"
                    />
                    <button className="btn-primary mt-3 text-sm">Save Notes</button>
                  </div>
                )}
                {activeTab === "resources" && (
                  <div className="space-y-3">
                    {["Lesson slides (PDF)", "Source code (GitHub)", "Cheat sheet", "Further reading"].map(r => (
                      <div key={r} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <FileText size={14} className="text-orange-500" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{r}</span>
                        </div>
                        <span className="text-xs text-orange-500 font-semibold">Download</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar — lesson list */}
          {showSidebar && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden h-fit sticky top-20">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-extrabold text-gray-900 text-sm">Course Content</h3>
                  <button onClick={() => setShowSidebar(false)}><X size={16} className="text-gray-400" /></button>
                </div>
                <ProgressBar value={enrollment?.progress || 0} showLabel size="sm" />
              </div>
              <div className="overflow-y-auto max-h-[60vh]">
                {course.curriculum.map((section, si) => (
                  <div key={si}>
                    <div className="px-4 py-2 bg-gray-50 border-y border-gray-100">
                      <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">{section.section}</p>
                    </div>
                    {section.lessons.map(lesson => {
                      const done = enrollment?.completedLessons?.includes(lesson.id);
                      const active = lesson.id === currentLesson?.id;
                      return (
                        <button key={lesson.id} onClick={() => goTo(lesson)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-50 transition-colors ${active ? "bg-orange-50 border-l-4 border-l-orange-500" : "hover:bg-gray-50"}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-green-100" : active ? "bg-orange-100" : "bg-gray-100"}`}>
                            {done
                              ? <CheckCircle size={13} className="text-green-500" />
                              : <Play size={10} className={active ? "text-orange-500 ml-0.5" : "text-gray-400 ml-0.5"} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-semibold truncate ${active ? "text-orange-600" : "text-gray-700"}`}>{lesson.title}</p>
                            <p className="text-[10px] text-gray-400">{lesson.duration}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100">
                <button onClick={() => navigate(`/quiz/${courseId}`)} className="btn-green w-full justify-center text-sm" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  Take Course Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      <Modal isOpen={showCertModal} onClose={() => setShowCertModal(false)} title="🎉 Congratulations!">
        <div className="text-center py-4">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award size={48} className="text-yellow-500" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Course Complete!</h3>
          <p className="text-gray-500 mb-6">You've completed <strong>{course.title}</strong>. Your certificate is ready!</p>
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-6 mb-6">
            <Award size={28} className="text-orange-500 mx-auto mb-2" />
            <p className="font-extrabold text-gray-900">{course.title}</p>
            <p className="text-sm text-gray-500 mt-1">Presented to a proud LearnHub graduate</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate("/progress")} className="btn-secondary flex-1 justify-center" style={{ display: "flex", justifyContent: "center" }}>View Progress</button>
            <button className="btn-primary flex-1 justify-center" style={{ display: "flex", justifyContent: "center" }}>Download Certificate</button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}