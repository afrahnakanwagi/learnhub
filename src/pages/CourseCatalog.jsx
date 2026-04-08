import { useState } from "react";
import { Search, Filter, Star, Users, Clock, BookOpen, ChevronDown, X, SlidersHorizontal } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import CourseCard from "../components/courses/CourseCard";
import { useStore } from "../store/useStore";
import { courses } from "../data/mockData";

const allCategories = ["All", "Web Development", "Data Science", "Design", "Mobile", "Marketing", "Business"];
const allLevels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const sortOptions = ["Most Popular", "Highest Rated", "Newest", "Price: Low to High", "Price: High to Low"];

export default function CourseCatalog() {
  const { enrollments } = useStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All Levels");
  const [sort, setSort] = useState("Most Popular");
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(100);

  const filtered = courses
    .filter(c => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.instructor.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchCat = category === "All" || c.category === category;
      const matchLevel = level === "All Levels" || c.level === level;
      const matchPrice = c.price <= maxPrice;
      return matchSearch && matchCat && matchLevel && matchPrice;
    })
    .sort((a, b) => {
      if (sort === "Highest Rated") return b.rating - a.rating;
      if (sort === "Price: Low to High") return a.price - b.price;
      if (sort === "Price: High to Low") return b.price - a.price;
      return b.students - a.students;
    });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Course Catalog</h1>
          <p className="text-gray-500">Explore {courses.length} expert-led courses and start learning today</p>
        </div>

        {/* Search + Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, instructors, topics..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input pl-11 py-3"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            )}
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-orange-300 hover:bg-orange-50 transition-all">
            <SlidersHorizontal size={17} />
            Filters
            {(category !== "All" || level !== "All Levels") && (
              <span className="w-5 h-5 bg-orange-500 text-white rounded-full text-xs flex items-center justify-center">
                {(category !== "All" ? 1 : 0) + (level !== "All Levels" ? 1 : 0)}
              </span>
            )}
          </button>
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="input py-3 w-auto cursor-pointer">
            {sortOptions.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 mb-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-bold text-gray-700 mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map(cat => (
                    <button key={cat} onClick={() => setCategory(cat)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${category === cat ? "bg-orange-500 text-white border-orange-500" : "border-gray-200 text-gray-600 hover:border-orange-300"}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-700 mb-3">Level</p>
                <div className="flex flex-wrap gap-2">
                  {allLevels.map(l => (
                    <button key={l} onClick={() => setLevel(l)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${level === l ? "bg-orange-500 text-white border-orange-500" : "border-gray-200 text-gray-600 hover:border-orange-300"}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-700 mb-3">Max Price: ${maxPrice}</p>
                <input type="range" min={0} max={100} step={5} value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-orange-500" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Free</span><span>$100+</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
              <button onClick={() => { setCategory("All"); setLevel("All Levels"); setMaxPrice(100); }}
                className="text-sm text-gray-500 hover:text-red-500 font-medium transition-colors">
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {allCategories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`shrink-0 text-sm font-semibold px-4 py-2 rounded-xl transition-all ${category === cat ? "bg-orange-500 text-white shadow-sm" : "bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-500"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900">{filtered.length}</span> courses
            {search && <> for "<span className="text-orange-500">{search}</span>"</>}
          </p>
        </div>

        {/* Course grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                enrollment={enrollments.find(e => e.courseId === course.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No courses found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
            <button onClick={() => { setSearch(""); setCategory("All"); setLevel("All Levels"); }}
              className="btn-primary">Clear filters</button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}