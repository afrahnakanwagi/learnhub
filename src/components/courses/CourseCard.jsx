import { useNavigate } from "react-router-dom";
import { Clock, Users, BookOpen, Star, Edit, Trash2, Users as UsersIcon } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";

export default function CourseCard({ 
  course, 
  enrollment, 
  role = "student" 
}) {
  const navigate = useNavigate();

  const levelColors = {
    Beginner: "bg-green-50 text-green-700",
    Intermediate: "bg-orange-50 text-orange-700",
    Advanced: "bg-red-50 text-red-700",
  };

  const handleCardClick = () => navigate(`/courses/${course.id}`);

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/instructor/courses/edit/${course.id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm(`Delete "${course.title}"?`)) {
      // Will be connected to real delete + toast later
      alert(`"${course.title}" has been deleted.`);
    }
  };

  const handleViewStudents = (e) => {
    e.stopPropagation();
    navigate(`/instructor/courses/${course.id}/students`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-pop hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors[course.level]}`}>
          {course.level}
        </span>
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-bold text-brand-600 px-2.5 py-1 rounded-full">
          ${course.price}
        </span>
      </div>

      <div className="p-4">
        <span className="text-xs font-semibold text-brand-500 uppercase tracking-wide">{course.category}</span>
        <h3 className="font-bold text-gray-900 mt-1 mb-2 line-clamp-2 leading-snug">{course.title}</h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-700">
            {course.instructorAvatar}
          </div>
          <span className="text-xs text-gray-500">{course.instructor}</span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[1,2,3,4,5].map(i => (
            <Star key={i} size={12} className={i <= Math.round(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"} />
          ))}
          <span className="text-xs font-semibold text-gray-700 ml-1">{course.rating}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1"><Clock size={12} />{course.duration}</span>
          <span className="flex items-center gap-1"><BookOpen size={12} />{course.lessons} lessons</span>
          <span className="flex items-center gap-1"><Users size={12} />{(course.students/1000).toFixed(1)}k</span>
        </div>

        {enrollment && role === "student" && (
          <div className="mt-2 pt-3 border-t border-gray-100">
            <ProgressBar value={enrollment.progress} size="md" />
            <p className="text-xs text-gray-500 mt-1">{enrollment.progress}% complete</p>
          </div>
        )}

        {/* Instructor & Admin Actions */}
        {(role === "instructor" || role === "admin") && (
          <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100" onClick={e => e.stopPropagation()}>
            <button
              onClick={handleEdit}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium border border-brand-200 text-brand-600 rounded-xl hover:bg-brand-50 transition-colors"
            >
              <Edit size={16} /> Edit
            </button>

            {role === "instructor" && (
              <button
                onClick={handleViewStudents}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium border border-forest-200 text-forest-600 rounded-xl hover:bg-forest-50 transition-colors"
              >
                <UsersIcon size={16} /> Students
              </button>
            )}

            <button
              onClick={handleDelete}
              className="p-2.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-xl transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}