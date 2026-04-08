import { useState } from "react";
import Modal from "../ui/Modal";
import { useToast } from "../../hooks/useToast";

export default function CourseEditModal({ 
  isOpen, 
  onClose, 
  course = null, 
  onSave 
}) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    title: course?.title || "",
    description: course?.description || "",
    category: course?.category || "Web Development",
    level: course?.level || "Beginner",
    price: course?.price || 49.99,
    duration: course?.duration || "30h",
    lessons: course?.lessons || 120,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    addToast(
      course 
        ? `Course "${formData.title}" updated successfully!` 
        : "New course created successfully!",
      "success"
    );
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={course ? "Edit Course" : "Create New Course"}>
      <form onSubmit={handleSubmit} className="space-y-5 py-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="input"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input"
            >
              {["Web Development", "Data Science", "Design", "Mobile", "Marketing", "Business"].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="input"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lessons</label>
            <input
              type="number"
              value={formData.lessons}
              onChange={(e) => setFormData({ ...formData, lessons: parseInt(e.target.value) })}
              className="input"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="button" onClick={onClose} className="btn-secondary flex-1">
            Cancel
          </button>
          <button type="submit" className="btn-primary flex-1">
            {course ? "Update Course" : "Create Course"}
          </button>
        </div>
      </form>
    </Modal>
  );
}