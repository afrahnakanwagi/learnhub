import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Chatbot from "../ui/Chatbot";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64 p-6 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
      <Chatbot />
    </div>
  );
}