import { useEffect } from 'react';

interface ToastProps {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Toast = ({ show, message, type, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const colors = {
    success: 'border-green-500/50 text-green-400 bg-green-500/10',
    error: 'border-red-500/50 text-red-400 bg-red-500/10',
    info: 'border-blue-500/50 text-blue-400 bg-blue-500/10',
  };

  const icons = {
    success: '[OK]',
    error: '[FAIL]',
    info: '[INFO]',
  };

  return (
    <div className={`fixed top-6 right-6 z-[100] px-6 py-4 glass-panel border rounded-xl shadow-2xl animate-slide-in ${colors[type]} flex items-center gap-4 min-w-[320px]`}>
      <span className="mono text-[10px] font-bold tracking-tighter shrink-0">{icons[type]}</span>
      <span className="flex-1 text-sm font-bold uppercase tracking-wider">{message}</span>
      <button
        onClick={onClose}
        className="text-current opacity-40 hover:opacity-100 transition-opacity text-lg mono"
      >
        [X]
      </button>
    </div>
  );
};

export default Toast;
