import { useState, useMemo } from "react";
import { Plus, Edit, Trash2, Users, Search } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CourseEditModal from "../../components/modals/CourseEditModal";   // ← Make sure this path is correct
import Modal from "../../components/ui/Modal";
import { useToast } from "../../hooks/useToast";
import { courses } from "../../data/mockData";

// Mock students for demo
const mockStudents = [
  { id: 1, name: "Alice Nakamura", email: "alice@email.com", progress: 68, status: "approved" },
  { id: 2, name: "Bob Okafor", email: "bob@email.com", progress: 32, status: "pending" },
  { id: 3, name: "Clara Diaz", email: "clara@email.com", progress: 95, status: "approved" },
];

export default function InstructorCourses() {
  const { addToast } = useToast();

  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = useMemo(() => 
    courses.filter(c => 
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
    ), [search]);

  // Open Edit Modal (Create or Edit)
  const openEditModal = (course = null) => {
    setEditingCourse(course);
    setShowEditModal(true);
  };

  // Handle Save from CourseEditModal
  const handleSaveCourse = (formData) => {
    const message = editingCourse 
      ? `Course "${formData.title}" updated successfully!` 
      : `New course "${formData.title}" created successfully!`;
    
    addToast(message, "success");
    setShowEditModal(false);
    setEditingCourse(null);
  };

  // Delete Course
  const deleteCourse = (course) => {
    if (window.confirm(`Are you sure you want to delete "${course.title}"?`)) {
      addToast(`Course "${course.title}" has been deleted successfully.`, "success");
    }
  };

  // Open Students Modal
  const viewStudents = (course) => {
    setSelectedCourse(course);
    setShowStudentsModal(true);
  };

  // Student Actions
  const approveStudent = (student) => {
    addToast(`${student.name} has been approved for "${selectedCourse?.title}".`, "success");
  };

  const rejectStudent = (student) => {
    addToast(`${student.name} has been rejected from "${selectedCourse?.title}".`, "error");
  };

  const removeStudent = (student) => {
    if (window.confirm(`Remove ${student.name} from this course?`)) {
      addToast(`${student.name} has been removed successfully.`, "warning");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">My Courses</h1>
            <p className="text-gray-500">Manage your courses and enrolled students</p>
          </div>
          <button
            onClick={() => openEditModal()}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-2xl font-semibold transition-colors"
          >
            <Plus size={20} /> Create New Course
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search your courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-11 py-3 w-full"
          />
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div 
              key={course.id} 
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all group"
            >
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="p-5">
                <h3 className="font-bold text-lg line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{course.category} • {course.level}</p>

                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => openEditModal(course)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-brand-200 text-brand-600 rounded-2xl hover:bg-brand-50 transition-colors"
                  >
                    <Edit size={16} /> Edit
                  </button>

                  <button
                    onClick={() => viewStudents(course)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-forest-200 text-forest-600 rounded-2xl hover:bg-forest-50 transition-colors"
                  >
                    <Users size={16} /> Students
                  </button>

                  <button
                    onClick={() => deleteCourse(course)}
                    className="p-2.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-2xl transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Edit Modal */}
      <CourseEditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingCourse(null);
        }}
        course={editingCourse}
        onSave={handleSaveCourse}
      />

      {/* Students Modal */}
      <Modal 
        isOpen={showStudentsModal} 
        onClose={() => setShowStudentsModal(false)} 
        title={`Students • ${selectedCourse?.title || ""}`}
      >
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
          {mockStudents.map(student => (
            <div key={student.id} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-bold">
                  {student.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Progress</p>
                  <p className="font-medium text-gray-900">{student.progress}%</p>
                </div>

                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  student.status === "approved" 
                    ? "bg-forest-100 text-forest-700" 
                    : "bg-amber-100 text-amber-700"
                }`}>
                  {student.status}
                </span>

                <div className="flex gap-1">
                  {student.status === "pending" && (
                    <>
                      <button 
                        onClick={() => approveStudent(student)}
                        className="btn-green text-sm px-4 py-1.5"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => rejectStudent(student)}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-xl"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => removeStudent(student)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </DashboardLayout>
  );
}