import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import CourseCatalog from "./pages/CourseCatalog";
import CourseDetail from "./pages/CourseDetail";
import LessonPlayer from "./pages/LessonPlayer";
import Quiz from "./pages/Quiz";
import Progress from "./pages/Progress";
import InstructorDashboard from "./pages/InstructorDashboard";   // Keep this for overview
import InstructorCourses from "./pages/instructor/InstructorCourses"; // Full course management
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminCourses from "./pages/AdminCourses";
import AdminReports from "./pages/AdminReports";
import AdminEnrollments from "./pages/AdminEnrollments";
import AdminCertifications from "./pages/AdminCertifications";
import Profile from "./pages/Profile";
import { useStore } from "./store/useStore";

function ProtectedRoute({ children, role }) {
  const { user } = useStore();
  if (!user) return <Navigate to="/login" />;
  
  if (role && user.role !== role) {
    if (user.role === "admin") return <Navigate to="/admin" />;
    if (user.role === "instructor") return <Navigate to="/instructor" />;
    return <Navigate to="/dashboard" />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><CourseCatalog /></ProtectedRoute>} />
        <Route path="/courses/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
        <Route path="/learn/:courseId/:lessonId" element={<ProtectedRoute><LessonPlayer /></ProtectedRoute>} />
        <Route path="/quiz/:courseId" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Instructor Routes */}
        <Route path="/instructor" element={
          <ProtectedRoute role="instructor">
            <InstructorDashboard />           {/* Overview / Analytics */}
          </ProtectedRoute>
        } />
        
        <Route path="/instructor/courses" element={
          <ProtectedRoute role="instructor">
            <InstructorCourses />             {/* Full Course Management */}
          </ProtectedRoute>
        } />

        {/* Admin Route */}
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute role="admin">
            <AdminUsers />
          </ProtectedRoute>
        } />
        <Route path="/admin/courses" element={
          <ProtectedRoute role="admin">
            <AdminCourses />
          </ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute role="admin">
            <AdminReports />
          </ProtectedRoute>
        } />
        <Route path="/admin/enrollments" element={
          <ProtectedRoute role="admin">
            <AdminEnrollments />
          </ProtectedRoute>
        } />
        <Route path="/admin/certifications" element={
          <ProtectedRoute role="admin">
            <AdminCertifications />
          </ProtectedRoute>
        } />
        <Route path="/instructor/students" element={
          <ProtectedRoute role="instructor">
            <InstructorDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}