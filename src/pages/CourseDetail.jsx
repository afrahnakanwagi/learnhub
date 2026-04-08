import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Star, Users, Clock, BookOpen, Play, Lock, ChevronDown, ChevronUp, 
  CheckCircle, Award, Globe, RefreshCw, Smartphone, Edit, Trash2 
} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Modal from "../components/ui/Modal";
import CourseEditModal from "../components/modals/CourseEditModal";
import { useStore } from "../store/useStore";
import { useToast } from "../hooks/useToast";
import { courses } from "../data/mockData";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enrollments, enroll, user } = useStore();
  const { addToast } = useToast();

  const [openSection, setOpenSection] = useState(0);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const course = courses.find(c => c.id === id);
  const enrollment = enrollments.find(e => e.courseId === id);
  const isEnrolled = !!enrollment;
  const role = user?.role || "student";

  if (!course) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <p className="text-2xl font-bold text-gray-400">Course not found</p>
          <button onClick={() => navigate("/courses")} className="btn-primary mt-4">
            Back to Courses
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const handleEnroll = async () => {
    setEnrolling(true);
    await new Promise(r => setTimeout(r, 1200));
    enroll(id);
    setEnrolling(false);
    addToast("Enrollment successful! Redirecting to first lesson...", "success");
    setTimeout(() => {
      setShowEnrollModal(false);
      navigate(`/learn/${id}/l1`);
    }, 1500);
  };

  const handleEditCourse = () => setShowEditModal(true);

  const handleDeleteCourse = () => {
    if (window.confirm(`Delete "${course.title}"? This action cannot be undone.`)) {
      addToast(`Course "${course.title}" has been deleted.`, "success");
      navigate("/courses");
    }
  };

  const handleSaveCourse = (formData) => {
    addToast(`Course "${formData.title}" updated successfully!`, "success");
    setShowEditModal(false);
  };

  const levelColors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-orange-100 text-orange-700",
    Advanced: "bg-red-100 text-red-700",
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl overflow-hidden mb-8">
          <div className="grid lg:grid-cols-3 gap-0">
            <div className="lg:col-span-2 p-8 md:p-12">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge-orange">{course.category}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors[course.level]}`}>
                  {course.level}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                {course.title}
              </h1>
              <p className="text-gray-300 mb-6 leading-relaxed">{course.description}</p>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i <= Math.round(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-600 fill-gray-600"} 
                    />
                  ))}
                  <span className="text-yellow-400 font-bold ml-1">{course.rating}</span>
                  <span className="text-gray-400 text-sm">({course.reviews.toLocaleString()} reviews)</span>
                </div>
                <span className="text-gray-400 text-sm flex items-center gap-1">
                  <Users size={14} />{course.students.toLocaleString()} students
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {course.instructorAvatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{course.instructor}</p>
                  <p className="text-gray-400 text-xs">Course Instructor</p>
                </div>
              </div>
            </div>

            {/* Right Sidebar Info + Action Buttons */}
            <div className="p-6 flex flex-col justify-center items-center bg-white/5 border-l border-white/10">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full rounded-2xl mb-6 shadow-2xl aspect-video object-cover" 
              />

              {/* Role-based Action Buttons */}
              {role === "student" ? (
                isEnrolled ? (
                  <button 
                    onClick={() => navigate(`/learn/${id}/l1`)} 
                    className="btn-primary w-full justify-center py-3 text-base"
                  >
                    <Play size={18} fill="white" /> Continue Learning
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowEnrollModal(true)} 
                    className="btn-primary w-full justify-center py-3 text-base"
                  >
                    Enroll Now — ${course.price}
                  </button>
                )
              ) : (role === "instructor" || role === "admin") ? (
                <div className="flex flex-col gap-3 w-full">
                  <button 
                    onClick={handleEditCourse}
                    className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white py-3 rounded-2xl font-semibold transition-colors"
                  >
                    <Edit size={18} /> Edit Course
                  </button>
                  <button 
                    onClick={handleDeleteCourse}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-semibold transition-colors"
                  >
                    <Trash2 size={18} /> Delete Course
                  </button>
                </div>
              ) : null}

              <p className="text-gray-400 text-xs mt-3 text-center">30-day money-back guarantee</p>

              <div className="grid grid-cols-2 gap-3 mt-6 w-full text-xs text-gray-300">
                {[
                  { icon: Clock, label: course.duration },
                  { icon: BookOpen, label: `${course.lessons} lessons` },
                  { icon: Globe, label: "English" },
                  { icon: Award, label: "Certificate" },
                  { icon: Smartphone, label: "Mobile access" },
                  { icon: RefreshCw, label: "Lifetime access" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <item.icon size={13} className="text-gray-500" /> {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* What you'll learn */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
              <h2 className="text-xl font-extrabold text-gray-900 mb-5">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {course.whatYouLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle size={17} className="text-forest-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
              <h2 className="text-xl font-extrabold text-gray-900 mb-2">Course Curriculum</h2>
              <p className="text-sm text-gray-500 mb-5">
                {course.lessons} lessons · {course.duration} total
              </p>
              <div className="space-y-3">
                {course.curriculum.map((section, si) => (
                  <div key={si} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenSection(openSection === si ? -1 : si)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center text-xs font-bold text-brand-600">
                          {si + 1}
                        </div>
                        <span className="font-semibold text-gray-900 text-sm">{section.section}</span>
                        <span className="text-xs text-gray-400">{section.lessons.length} lessons</span>
                      </div>
                      {openSection === si ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {openSection === si && (
                      <div className="divide-y divide-gray-50">
                        {section.lessons.map(lesson => (
                          <div key={lesson.id} className="flex items-center justify-between p-4 hover:bg-orange-50/30 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${lesson.free ? "bg-forest-100" : "bg-gray-100"}`}>
                                {lesson.type === "video" ? (
                                  <Play size={13} className={lesson.free ? "text-forest-600" : "text-gray-400"} />
                                ) : (
                                  <BookOpen size={13} className={lesson.free ? "text-forest-600" : "text-gray-400"} />
                                )}
                              </div>
                              <span className="text-sm text-gray-700">{lesson.title}</span>
                              {lesson.free && <span className="text-[10px] font-bold text-forest-600 bg-forest-50 px-2 py-0.5 rounded-full">FREE</span>}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400">{lesson.duration}</span>
                              {!lesson.free && !isEnrolled && <Lock size={13} className="text-gray-300" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h3 className="font-bold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {course.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="text-xs font-semibold px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-brand-100 hover:text-brand-700 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-forest-50 rounded-2xl border border-forest-100 p-5">
              <Award size={28} className="text-forest-500 mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Certificate of Completion</h3>
              <p className="text-sm text-gray-600 mb-4">
                Finish this course and earn a verified certificate.
              </p>
              <div className="bg-white rounded-xl p-3 border border-forest-200 text-center">
                <p className="text-xs font-bold text-forest-600">LearnHub Certificate</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{course.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enroll Modal - Student Only */}
      <Modal isOpen={showEnrollModal} onClose={() => setShowEnrollModal(false)} title="Enroll in Course">
        <div className="space-y-6">
          <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
            <img src={course.image} alt="" className="w-20 h-16 rounded-xl object-cover" />
            <div>
              <h3 className="font-bold text-gray-900">{course.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>
              <p className="text-brand-600 font-extrabold text-xl mt-2">${course.price}</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              "Full lifetime access",
              `${course.lessons} lessons • ${course.duration}`,
              "Certificate of completion",
              "30-day money-back guarantee"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle size={18} className="text-forest-500" />
                {item}
              </div>
            ))}
          </div>

          <button 
            onClick={handleEnroll} 
            disabled={enrolling}
            className="btn-primary w-full py-3 text-base"
          >
            {enrolling ? "Processing..." : `Confirm Enrollment — $${course.price}`}
          </button>
        </div>
      </Modal>

      {/* Course Edit Modal - Instructor/Admin Only */}
      <CourseEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        course={course}
        onSave={handleSaveCourse}
      />
    </DashboardLayout>
  );
}