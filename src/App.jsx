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
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
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
        <Route path="/instructor" element={<ProtectedRoute role="instructor"><InstructorDashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}