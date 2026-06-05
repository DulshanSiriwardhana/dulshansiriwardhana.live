import { useState } from "react";
import { sendMessage } from "../utils/api";
import { Send, Loader2, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await sendMessage(formData);
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsSubmitting(false);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group">
          <label
            htmlFor="name"
            className="block text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-green-500 transition-colors"
          >
            System Identity (Name)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-700 focus:outline-none focus:border-green-500/50 focus:bg-black/60 transition-all font-medium"
            placeholder="John Doe"
          />
        </div>
        <div className="group">
          <label
            htmlFor="email"
            className="block text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-green-500 transition-colors"
          >
            Return Path (Email)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-700 focus:outline-none focus:border-green-500/50 focus:bg-black/60 transition-all font-medium"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="group">
        <label
          htmlFor="subject"
          className="block text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-green-500 transition-colors"
        >
          Signal Purpose (Subject)
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-700 focus:outline-none focus:border-green-500/50 focus:bg-black/60 transition-all font-medium"
          placeholder="I have a project for you..."
        />
      </div>

      <div className="group">
        <label
          htmlFor="message"
          className="block text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 mb-2 group-focus-within:text-green-500 transition-colors"
        >
          Data Payload (Message)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-700 focus:outline-none focus:border-green-500/50 focus:bg-black/60 transition-all font-medium resize-none"
          placeholder="Transmission starts here..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-5 bg-green-500/10 border-2 border-green-500/40 rounded-2xl text-green-400 font-bold uppercase tracking-[0.3em] hover:bg-green-500 hover:text-black hover:scale-[1.02] active:scale-95 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-3 shadow-xl hover:shadow-green-500/30 overflow-hidden relative"
      >
        <span className="relative z-10 flex items-center gap-3">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Encrypting & Sending...
            </>
          ) : (
            <>
              Initialize Transmission
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </span>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </button>

      {submitStatus === "success" && (
        <div className="p-5 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 animate-slide-up shadow-2xl shadow-green-500/10">
          <CheckCircle2 size={18} className="text-green-500" />
          Transmission Successful. Response Incoming.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-5 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 animate-slide-up shadow-2xl shadow-red-500/10">
          <XCircle size={18} className="text-red-500" />
          Critical Failure: Signal Lost.
        </div>
      )}
    </form>
  );
};

export default ContactForm;
