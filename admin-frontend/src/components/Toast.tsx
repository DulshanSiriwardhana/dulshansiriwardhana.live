import { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  const colors = {
    success: 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5',
    error: 'border-rose-500/20 text-rose-400 bg-rose-500/5',
    info: 'border-blue-500/20 text-blue-400 bg-blue-500/5',
  };

  const Icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
  };

  const Icon = Icons[type];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          className={`fixed top-6 right-6 z-[100] px-5 py-3.5 glass-panel border rounded-2xl shadow-2xl ${colors[type]} flex items-center gap-4 min-w-[300px] max-w-[450px] overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          <Icon size={20} className="shrink-0" />
          <span className="flex-1 text-sm font-semibold tracking-tight leading-snug">{message}</span>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;

