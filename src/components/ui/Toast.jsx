import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

const icons = {
  success: <CheckCircle size={18} className="text-green-500" />,
  error: <XCircle size={18} className="text-red-500" />,
  warning: <AlertCircle size={18} className="text-yellow-500" />,
  info: <Info size={18} className="text-blue-500" />,
};

const borders = {
  success: "border-l-4 border-green-400",
  error: "border-l-4 border-red-400",
  warning: "border-l-4 border-yellow-400",
  info: "border-l-4 border-blue-400",
};

export function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`flex items-center gap-3 bg-white rounded-xl shadow-pop p-4 min-w-[280px] ${borders[type]}`}>
      {icons[type]}
      <p className="text-sm text-gray-700 flex-1">{message}</p>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X size={16} />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      {toasts.map(t => (
        <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));
  return { toasts, addToast, removeToast };
}