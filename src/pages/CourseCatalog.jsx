import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import CourseCard from "../components/courses/CourseCard";
import { useStore } from "../store/useStore";
import { courses } from "../data/mockData";

const categories = ["All", "Web Development", "Data Science", "Design", "Mobile", "Marketing", "Business"];

export default function CourseCatalog() {
  const { user } = useStore();
  const navigate = useNavigate();
  const role = user?.role || "student";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const displayedCourses = useMemo(() => {
    return courses
      .filter(course => {
        const matchesSearch = 
          course.title.toLowerCase().includes(search.toLowerCase()) ||
          course.instructor.toLowerCase().includes(search.toLowerCase()) ||
          course.category.toLowerCase().includes(search.toLowerCase());

        const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;

        return matchesSearch && matchesCategory;
      });
  }, [search, selectedCategory]);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              {role === "instructor" ? "My Courses" : 
               role === "admin" ? "All Platform Courses" : "Discover Courses"}
            </h1>
            <p className="text-gray-500 mt-1">
              {role === "instructor" ? "Manage what you teach" : 
               role === "admin" ? "Oversee all courses" : "Find your next skill"}
            </p>
          </div>

          {(role === "instructor" || role === "admin") && (
            <button 
              onClick={() => navigate("/instructor/courses/new")} // or open modal
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-2xl font-semibold transition-colors"
            >
              <Plus size={20} />
              {role === "instructor" ? "Create New Course" : "Add Course"}
            </button>
          )}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses or instructors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 border border-gray-200 rounded-2xl flex items-center gap-2 hover:bg-orange-50"
          >
            <SlidersHorizontal size={18} /> Filters
          </button>
        </div>

        {showFilters && (
          <div className="bg-white p-6 rounded-2xl border mb-8">
            <p className="font-semibold mb-3">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat 
                      ? "bg-brand-600 text-white" 
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map(course => (
            <CourseCard 
              key={course.id} 
              course={course}
              role={role}   // Pass role so CourseCard can show different buttons
            />
          ))}
        </div>

        {displayedCourses.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No courses found matching your search.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}