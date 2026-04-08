import { create } from "zustand";
import { enrolledCourses } from "../data/mockData";

export const useStore = create((set, get) => ({
  user: null,
  enrollments: enrolledCourses,
  notifications: [
    { id: 1, text: "Your quiz score is ready!", time: "2m ago", read: false },
    { id: 2, text: "New lesson added to React Bootcamp", time: "1h ago", read: false },
    { id: 3, text: "Certificate earned for JS Basics", time: "2h ago", read: true },
  ],
  sidebarOpen: false,

  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),

  enroll: (courseId) => {
    const existing = get().enrollments.find(e => e.courseId === courseId);
    if (!existing) {
      set(state => ({
        enrollments: [...state.enrollments, { courseId, progress: 0, lastLesson: null, completedLessons: [] }]
      }));
    }
  },

  completeLesson: (courseId, lessonId) => {
    set(state => ({
      enrollments: state.enrollments.map(e => {
        if (e.courseId !== courseId) return e;
        const completed = e.completedLessons.includes(lessonId)
          ? e.completedLessons
          : [...e.completedLessons, lessonId];
        return { ...e, completedLessons: completed, lastLesson: lessonId, progress: Math.min(100, e.progress + 5) };
      })
    }));
  },

  markNotificationsRead: () => {
    set(state => ({
      notifications: state.notifications.map(n => ({ ...n, read: true }))
    }));
  },

  toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
}));