import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Toast = ({ message, type, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: 'bg-green-500/20 border-green-500/50 text-green-400',
    error: 'bg-red-500/20 border-red-500/50 text-red-400',
    info: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
  };

  const icons = {
    success: '✓',
    error: '×',
    info: 'ℹ',
  };

  return (
    <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg border backdrop-blur-sm shadow-lg animate-slide-in ${colors[type]} flex items-center gap-3 min-w-[300px]`}>
      <span className="text-2xl font-bold">{icons[type]}</span>
      <span className="flex-1 font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-current opacity-70 hover:opacity-100 transition-opacity text-xl"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;

