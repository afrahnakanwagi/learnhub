import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  BookOpen,
  GraduationCap,
  Search,
  UserCheck,
  UserX,
  CheckCircle,
  Award,
  ShieldCheck,
} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import Modal from "../components/ui/Modal";
import { ToastContainer } from "../components/ui/Toast";
import { useToast } from "../hooks/useToast";
import { courses } from "../data/mockData";

const initialInstructors = [
  { id: 501, name: "Sarah Johnson", email: "sarah@learnhub.com", status: "active", courses: 6 },
  { id: 502, name: "Alex Chen", email: "alex@learnhub.com", status: "active", courses: 4 },
  { id: 503, name: "Emma Thompson", email: "emma@learnhub.com", status: "pending", courses: 2 },
];

const initialStudents = [
  { id: 801, name: "Alice Nakamura", email: "alice@email.com", status: "active", enrolledCourses: 3 },
  { id: 802, name: "Bob Okafor", email: "bob@email.com", status: "active", enrolledCourses: 1 },
  { id: 803, name: "David Kim", email: "david@email.com", status: "suspended", enrolledCourses: 2 },
];

const initialEnrollmentRequests = [
  { id: 901, student: "Alice Nakamura", course: "Node.js Backend Development", status: "pending", date: "Today" },
  { id: 902, student: "David Kim", course: "UI/UX Design Masterclass", status: "pending", date: "Today" },
];

const initialCertificates = [
  { id: 1001, student: "Alice Nakamura", course: "Complete React Developer Bootcamp", issued: true, issuedDate: "2026-04-01" },
  { id: 1002, student: "Bob Okafor", course: "Node.js Backend Development", issued: false, issuedDate: null },
];

export default function AdminDashboard({ initialTab = "overview" }) {
  const { toasts, addToast, removeToast } = useToast();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState("");

  const [courseList, setCourseList] = useState(
    courses.map((c, i) => ({
      ...c,
      status: i % 3 === 0 ? "pending" : "approved",
    }))
  );
  const [instructors, setInstructors] = useState(initialInstructors);
  const [students, setStudents] = useState(initialStudents);
  const [enrollmentRequests, setEnrollmentRequests] = useState(initialEnrollmentRequests);
  const [certificates, setCertificates] = useState(initialCertificates);

  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({ title: "", category: "", level: "Beginner", price: "" });

  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({ name: "", email: "", role: "student", status: "active" });
  const [courseDetails, setCourseDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [enrollmentDetails, setEnrollmentDetails] = useState(null);
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const totalUsers = instructors.length + students.length;
  const totalCourses = courseList.length;
  const pendingCourses = courseList.filter((c) => c.status === "pending").length;
  const pendingEnrollments = enrollmentRequests.filter((r) => r.status === "pending").length;
  const issuedCertificates = certificates.filter((c) => c.issued).length;

  const userMixData = [
    { name: "Instructors", value: instructors.length, color: "#22c55e" },
    { name: "Students", value: students.length, color: "#f97316" },
  ];

  const monthlyOpsData = [
    { month: "Nov", courses: 8, enrollments: 30 },
    { month: "Dec", courses: 12, enrollments: 46 },
    { month: "Jan", courses: 14, enrollments: 54 },
    { month: "Feb", courses: 11, enrollments: 51 },
    { month: "Mar", courses: 19, enrollments: 63 },
    { month: "Apr", courses: 22, enrollments: 71 },
  ];

  const filteredCourses = useMemo(
    () =>
      courseList.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [courseList, searchTerm]
  );

  const filteredInstructors = useMemo(
    () =>
      instructors.filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [instructors, searchTerm]
  );

  const filteredStudents = useMemo(
    () =>
      students.filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [students, searchTerm]
  );

  const openCreateCourse = () => {
    setEditingCourse(null);
    setCourseForm({ title: "", category: "", level: "Beginner", price: "" });
    setShowCourseModal(true);
  };

  const openEditCourse = (course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      category: course.category,
      level: course.level,
      price: String(course.price),
    });
    setShowCourseModal(true);
  };

  const saveCourse = () => {
    if (!courseForm.title.trim() || !courseForm.category.trim()) return;
    if (editingCourse) {
      setCourseList((prev) =>
        prev.map((c) =>
          c.id === editingCourse.id
            ? { ...c, ...courseForm, price: Number(courseForm.price || 0) }
            : c
        )
      );
      addToast("Course updated successfully.", "success");
    } else {
      setCourseList((prev) => [
        {
          id: String(Date.now()),
          instructor: "Pending Assignment",
          instructorAvatar: "PA",
          rating: 0,
          reviews: 0,
          students: 0,
          duration: "0h 00m",
          lessons: 0,
          image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&q=80",
          tags: [],
          description: "New course submission.",
          whatYouLearn: [],
          curriculum: [],
          status: "pending",
          ...courseForm,
          price: Number(courseForm.price || 0),
        },
        ...prev,
      ]);
      addToast("Course created and sent for admin approval.", "success");
    }
    setShowCourseModal(false);
  };

  const deleteCourse = (course) => {
    setCourseList((prev) => prev.filter((c) => c.id !== course.id));
    addToast(`Deleted course "${course.title}".`, "warning");
  };

  const approveCourse = (courseId) => {
    setCourseList((prev) => prev.map((c) => (c.id === courseId ? { ...c, status: "approved" } : c)));
    addToast("Course approved successfully.", "success");
  };

  const rejectCourse = (courseId) => {
    setCourseList((prev) => prev.map((c) => (c.id === courseId ? { ...c, status: "rejected" } : c)));
    addToast("Course rejected.", "error");
  };

  const openCreateUser = (role) => {
    setEditingUser(null);
    setUserForm({ name: "", email: "", role, status: "active" });
    setShowUserModal(true);
  };

  const openEditUser = (role, user) => {
    setEditingUser(user);
    setUserForm({ name: user.name, email: user.email, role, status: user.status });
    setShowUserModal(true);
  };

  const saveUser = () => {
    if (!userForm.name.trim() || !userForm.email.trim()) return;
    const setFn = userForm.role === "instructor" ? setInstructors : setStudents;
    if (editingUser) {
      setFn((prev) => prev.map((u) => (u.id === editingUser.id ? { ...u, ...userForm } : u)));
      addToast("User updated successfully.", "success");
    } else {
      const newUser = {
        id: Date.now(),
        ...userForm,
        courses: userForm.role === "instructor" ? 0 : undefined,
        enrolledCourses: userForm.role === "student" ? 0 : undefined,
      };
      setFn((prev) => [newUser, ...prev]);
      addToast("User created successfully.", "success");
    }
    setShowUserModal(false);
  };

  const updateUserStatus = (role, id, status) => {
    const setFn = role === "instructor" ? setInstructors : setStudents;
    setFn((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
    addToast(`User status changed to ${status}.`, "success");
  };

  const deleteUser = (role, id) => {
    const setFn = role === "instructor" ? setInstructors : setStudents;
    setFn((prev) => prev.filter((u) => u.id !== id));
    addToast("User removed.", "warning");
  };

  const approveEnrollment = (id) => {
    setEnrollmentRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r)));
    addToast("Enrollment request approved.", "success");
  };

  const rejectEnrollment = (id) => {
    setEnrollmentRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r)));
    addToast("Enrollment request rejected.", "error");
  };

  const issueCertificate = (id) => {
    setCertificates((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, issued: true, issuedDate: new Date().toISOString().slice(0, 10) } : c
      )
    );
    addToast("Certificate issued successfully.", "success");
  };

  const revokeCertificate = (id) => {
    setCertificates((prev) => prev.map((c) => (c.id === id ? { ...c, issued: false, issuedDate: null } : c)));
    addToast("Certificate revoked.", "warning");
  };

  const askConfirm = (title, message, onConfirm, tone = "success", confirmText = "Confirm") => {
    setConfirmDialog({ title, message, onConfirm, tone, confirmText });
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Control courses, users, enrollments, and certifications</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses, users, instructors..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Total Users", value: totalUsers, icon: Users, color: "bg-brand-50 text-brand-600" },
            { label: "Courses", value: totalCourses, icon: BookOpen, color: "bg-forest-50 text-forest-600" },
            { label: "Pending Courses", value: pendingCourses, icon: ShieldCheck, color: "bg-orange-50 text-orange-600" },
            { label: "Enroll Requests", value: pendingEnrollments, icon: UserCheck, color: "bg-green-50 text-green-600" },
            { label: "Certificates Issued", value: issuedCertificates, icon: Award, color: "bg-brand-50 text-brand-600" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-2xl border border-gray-100 shadow-card p-4">
              <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center mb-2`}>
                <item.icon size={18} />
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{item.value}</p>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
          {["overview", "courses", "instructors", "students", "enrollments", "certifications"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-colors ${
                activeTab === tab ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-card p-6">
              <h2 className="font-extrabold text-gray-900 mb-1">Platform Activity</h2>
              <p className="text-sm text-gray-500 mb-4">Course approvals and enrollment trends</p>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={monthlyOpsData}>
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="courses" stroke="#22c55e" strokeWidth={3} />
                  <Line type="monotone" dataKey="enrollments" stroke="#f97316" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
              <h2 className="font-extrabold text-gray-900 mb-4">User Distribution</h2>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={userMixData} dataKey="value" outerRadius={80} innerRadius={45}>
                    {userMixData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-card p-6">
              <h2 className="font-extrabold text-gray-900 mb-4">Operational Snapshot</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyOpsData}>
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="courses" fill="#22c55e" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="enrollments" fill="#f97316" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-extrabold text-gray-900">Course Management (CRUD + Approval)</h2>
              <button onClick={openCreateCourse} className="btn-primary">
                <Plus size={16} /> Add Course
              </button>
            </div>
            <div className="space-y-3">
              {filteredCourses.map((course) => (
                <div key={course.id} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-gray-900">{course.title}</p>
                    <p className="text-sm text-gray-500">{course.instructor} · {course.category} · ${course.price}</p>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full mt-2 inline-block ${
                      course.status === "approved" ? "bg-green-100 text-green-700" :
                      course.status === "pending" ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCourseDetails(course)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"><Eye size={16} /></button>
                    <button onClick={() => openEditCourse(course)} className="p-2 rounded-lg hover:bg-orange-50 text-gray-600"><Edit size={16} /></button>
                    <button onClick={() => askConfirm("Delete Course", `Delete "${course.title}" permanently?`, () => deleteCourse(course), "danger", "Delete")} className="p-2 rounded-lg hover:bg-red-50 text-red-600"><Trash2 size={16} /></button>
                    <button onClick={() => askConfirm("Approve Course", `Approve "${course.title}" for publishing?`, () => approveCourse(course.id), "success", "Approve")} className="px-3 py-2 text-xs font-semibold rounded-lg bg-green-600 text-white">Approve</button>
                    <button onClick={() => askConfirm("Reject Course", `Reject "${course.title}" submission?`, () => rejectCourse(course.id), "danger", "Reject")} className="px-3 py-2 text-xs font-semibold rounded-lg bg-red-600 text-white">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab === "instructors" || activeTab === "students") && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-extrabold text-gray-900 capitalize">{activeTab} Management (CRUD)</h2>
              <button onClick={() => openCreateUser(activeTab === "instructors" ? "instructor" : "student")} className="btn-primary">
                <Plus size={16} /> Add {activeTab === "instructors" ? "Instructor" : "Student"}
              </button>
            </div>
            <div className="space-y-3">
              {(activeTab === "instructors" ? filteredInstructors : filteredStudents).map((user) => (
                <div key={user.id} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full mt-2 inline-block ${
                      user.status === "active" ? "bg-green-100 text-green-700" :
                      user.status === "pending" ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"
                    }`}>
                      {user.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setUserDetails({ ...user, role: activeTab === "instructors" ? "instructor" : "student" })} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"><Eye size={16} /></button>
                    <button onClick={() => openEditUser(activeTab === "instructors" ? "instructor" : "student", user)} className="p-2 rounded-lg hover:bg-orange-50 text-gray-600"><Edit size={16} /></button>
                    <button onClick={() => askConfirm("Remove User", `Remove ${user.name} from platform?`, () => deleteUser(activeTab === "instructors" ? "instructor" : "student", user.id), "danger", "Remove")} className="p-2 rounded-lg hover:bg-red-50 text-red-600"><Trash2 size={16} /></button>
                    <button onClick={() => askConfirm("Activate User", `Set ${user.name} to active?`, () => updateUserStatus(activeTab === "instructors" ? "instructor" : "student", user.id, "active"), "success", "Activate")} className="px-3 py-2 text-xs font-semibold rounded-lg bg-green-600 text-white"><UserCheck size={14} /></button>
                    <button onClick={() => askConfirm("Suspend User", `Suspend ${user.name}?`, () => updateUserStatus(activeTab === "instructors" ? "instructor" : "student", user.id, "suspended"), "danger", "Suspend")} className="px-3 py-2 text-xs font-semibold rounded-lg bg-red-600 text-white"><UserX size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "enrollments" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
            <h2 className="font-extrabold text-gray-900 mb-5">Enrollment Approvals</h2>
            <div className="space-y-3">
              {enrollmentRequests.map((req) => (
                <div key={req.id} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-gray-900">{req.student}</p>
                    <p className="text-sm text-gray-500">{req.course} · {req.date}</p>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full mt-2 inline-block ${
                      req.status === "approved" ? "bg-green-100 text-green-700" :
                      req.status === "pending" ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setEnrollmentDetails(req)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"><Eye size={16} /></button>
                    <button onClick={() => askConfirm("Approve Enrollment", `Approve ${req.student} for ${req.course}?`, () => approveEnrollment(req.id), "success", "Approve")} className="px-3 py-2 text-xs font-semibold rounded-lg bg-green-600 text-white"><CheckCircle size={14} /></button>
                    <button onClick={() => askConfirm("Reject Enrollment", `Reject ${req.student}'s enrollment for ${req.course}?`, () => rejectEnrollment(req.id), "danger", "Reject")} className="px-3 py-2 text-xs font-semibold rounded-lg bg-red-600 text-white"><UserX size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "certifications" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
            <h2 className="font-extrabold text-gray-900 mb-5">Certification Management</h2>
            <div className="space-y-3">
              {certificates.map((cert) => (
                <div key={cert.id} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-gray-900 flex items-center gap-2"><GraduationCap size={16} className="text-brand-500" /> {cert.student}</p>
                    <p className="text-sm text-gray-500">{cert.course}</p>
                    <p className="text-xs text-gray-500 mt-1">{cert.issued ? `Issued: ${cert.issuedDate}` : "Not issued yet"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setCertificateDetails(cert)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"><Eye size={16} /></button>
                    {cert.issued ? (
                      <button onClick={() => askConfirm("Revoke Certificate", `Revoke ${cert.student}'s certificate for ${cert.course}?`, () => revokeCertificate(cert.id), "danger", "Revoke")} className="px-3 py-2 text-xs font-semibold rounded-lg bg-red-600 text-white">Revoke</button>
                    ) : (
                      <button onClick={() => askConfirm("Issue Certificate", `Issue certificate to ${cert.student} for ${cert.course}?`, () => issueCertificate(cert.id), "success", "Issue")} className="px-3 py-2 text-xs font-semibold rounded-lg bg-green-600 text-white">Issue</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={showCourseModal} onClose={() => setShowCourseModal(false)} title={editingCourse ? "Edit Course" : "Create Course"}>
        <div className="space-y-4">
          <input
            className="input"
            placeholder="Course title"
            value={courseForm.title}
            onChange={(e) => setCourseForm((prev) => ({ ...prev, title: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              className="input"
              placeholder="Category"
              value={courseForm.category}
              onChange={(e) => setCourseForm((prev) => ({ ...prev, category: e.target.value }))}
            />
            <input
              className="input"
              placeholder="Price"
              value={courseForm.price}
              onChange={(e) => setCourseForm((prev) => ({ ...prev, price: e.target.value }))}
            />
          </div>
          <select
            className="input"
            value={courseForm.level}
            onChange={(e) => setCourseForm((prev) => ({ ...prev, level: e.target.value }))}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <div className="flex gap-3">
            <button className="btn-secondary flex-1" onClick={() => setShowCourseModal(false)}>Cancel</button>
            <button className="btn-primary flex-1" onClick={saveCourse}>{editingCourse ? "Update" : "Create"}</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showUserModal} onClose={() => setShowUserModal(false)} title={editingUser ? "Edit User" : "Create User"}>
        <div className="space-y-4">
          <input className="input" placeholder="Full name" value={userForm.name} onChange={(e) => setUserForm((p) => ({ ...p, name: e.target.value }))} />
          <input className="input" placeholder="Email address" value={userForm.email} onChange={(e) => setUserForm((p) => ({ ...p, email: e.target.value }))} />
          <select className="input" value={userForm.status} onChange={(e) => setUserForm((p) => ({ ...p, status: e.target.value }))}>
            <option value="active">active</option>
            <option value="pending">pending</option>
            <option value="suspended">suspended</option>
          </select>
          <div className="flex gap-3">
            <button className="btn-secondary flex-1" onClick={() => setShowUserModal(false)}>Cancel</button>
            <button className="btn-primary flex-1" onClick={saveUser}>{editingUser ? "Update" : "Create"}</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!courseDetails} onClose={() => setCourseDetails(null)} title="Course Details">
        {courseDetails && (
          <div className="space-y-4">
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
              <p className="font-bold text-gray-900">{courseDetails.title}</p>
              <p className="text-sm text-gray-600 mt-1">{courseDetails.instructor} · {courseDetails.category} · {courseDetails.level}</p>
              <p className="text-sm text-gray-600">Price: ${courseDetails.price}</p>
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary flex-1" onClick={() => { setCourseDetails(null); openEditCourse(courseDetails); }}>Edit</button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2.5 rounded-xl flex-1" onClick={() => askConfirm("Approve Course", `Approve "${courseDetails.title}"?`, () => approveCourse(courseDetails.id), "success", "Approve")}>Approve</button>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2.5 rounded-xl flex-1" onClick={() => askConfirm("Reject Course", `Reject "${courseDetails.title}"?`, () => rejectCourse(courseDetails.id), "danger", "Reject")}>Reject</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!userDetails} onClose={() => setUserDetails(null)} title="User Details">
        {userDetails && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <p className="font-bold text-gray-900">{userDetails.name}</p>
              <p className="text-sm text-gray-600">{userDetails.email}</p>
              <p className="text-sm text-gray-600 capitalize">{userDetails.role} · {userDetails.status}</p>
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary flex-1" onClick={() => { setUserDetails(null); openEditUser(userDetails.role, userDetails); }}>Edit</button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2.5 rounded-xl flex-1" onClick={() => askConfirm("Activate User", `Set ${userDetails.name} active?`, () => updateUserStatus(userDetails.role, userDetails.id, "active"), "success", "Activate")}>Activate</button>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2.5 rounded-xl flex-1" onClick={() => askConfirm("Suspend User", `Suspend ${userDetails.name}?`, () => updateUserStatus(userDetails.role, userDetails.id, "suspended"), "danger", "Suspend")}>Suspend</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!enrollmentDetails} onClose={() => setEnrollmentDetails(null)} title="Enrollment Details">
        {enrollmentDetails && (
          <div className="space-y-4">
            <div className="bg-brand-50 border border-brand-100 rounded-xl p-4">
              <p className="font-bold text-gray-900">{enrollmentDetails.student}</p>
              <p className="text-sm text-gray-600">{enrollmentDetails.course}</p>
              <p className="text-sm text-gray-600">Requested: {enrollmentDetails.date}</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2.5 rounded-xl flex-1" onClick={() => askConfirm("Approve Enrollment", `Approve ${enrollmentDetails.student}?`, () => approveEnrollment(enrollmentDetails.id), "success", "Approve")}>Approve</button>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2.5 rounded-xl flex-1" onClick={() => askConfirm("Reject Enrollment", `Reject ${enrollmentDetails.student}?`, () => rejectEnrollment(enrollmentDetails.id), "danger", "Reject")}>Reject</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!certificateDetails} onClose={() => setCertificateDetails(null)} title="Certification Details">
        {certificateDetails && (
          <div className="space-y-4">
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
              <p className="font-bold text-gray-900">{certificateDetails.student}</p>
              <p className="text-sm text-gray-600">{certificateDetails.course}</p>
              <p className="text-sm text-gray-600">{certificateDetails.issued ? `Issued on ${certificateDetails.issuedDate}` : "Not yet issued"}</p>
            </div>
            <div className="flex gap-3">
              {certificateDetails.issued ? (
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2.5 rounded-xl flex-1" onClick={() => askConfirm("Revoke Certificate", `Revoke certificate for ${certificateDetails.student}?`, () => revokeCertificate(certificateDetails.id), "danger", "Revoke")}>Revoke Certificate</button>
              ) : (
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2.5 rounded-xl flex-1" onClick={() => askConfirm("Issue Certificate", `Issue certificate to ${certificateDetails.student}?`, () => issueCertificate(certificateDetails.id), "success", "Issue")}>Issue Certificate</button>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!confirmDialog} onClose={() => setConfirmDialog(null)} title={confirmDialog?.title || "Confirm Action"} size="sm">
        {confirmDialog && (
          <div className="space-y-5">
            <p className="text-sm text-gray-600">{confirmDialog.message}</p>
            <div className="flex gap-3">
              <button className="btn-secondary flex-1" onClick={() => setConfirmDialog(null)}>Cancel</button>
              <button
                className={`flex-1 font-semibold px-4 py-2.5 rounded-xl text-white ${
                  confirmDialog.tone === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                }`}
                onClick={() => {
                  confirmDialog.onConfirm();
                  setConfirmDialog(null);
                }}
              >
                {confirmDialog.confirmText}
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </DashboardLayout>
  );
}