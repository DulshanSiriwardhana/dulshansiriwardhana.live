import { useState } from "react";
import { sendMessage } from "../utils/api";

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
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsSubmitting(false);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div className="group">
          <label
            htmlFor="name"
            className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2 group-focus-within:text-green-400 transition-colors duration-300"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-[#1a1a1a]/50 border border-green-500/20 rounded-lg text-white text-sm md:text-base placeholder-gray-500/70 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 hover:border-green-500/30 hover:bg-[#1a1a1a]/60"
            placeholder="Your Name"
          />
        </div>
        <div className="group">
          <label
            htmlFor="email"
            className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2 group-focus-within:text-green-400 transition-colors duration-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-[#1a1a1a]/50 border border-green-500/20 rounded-lg text-white text-sm md:text-base placeholder-gray-500/70 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 hover:border-green-500/30 hover:bg-[#1a1a1a]/60"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div className="group">
        <label
          htmlFor="subject"
          className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2 group-focus-within:text-green-400 transition-colors duration-300"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-[#1a1a1a]/50 border border-green-500/20 rounded-lg text-white text-sm md:text-base placeholder-gray-500/70 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 hover:border-green-500/30 hover:bg-[#1a1a1a]/60"
          placeholder="What's this about?"
        />
      </div>

      <div className="group">
        <label
          htmlFor="message"
          className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2 group-focus-within:text-green-400 transition-colors duration-300"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-[#1a1a1a]/50 border border-green-500/20 rounded-lg text-white text-sm md:text-base placeholder-gray-500/70 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 resize-none break-words hover:border-green-500/30 hover:bg-[#1a1a1a]/60"
          placeholder="Tell me about your project or just say hello!"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-500/20 to-green-600/10 border border-green-500/50 rounded-lg text-green-400 text-sm md:text-base hover:from-green-500/30 hover:to-green-600/20 hover:border-green-500 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none relative overflow-hidden group"
      >
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <span className="animate-spin text-lg">⏳</span>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </>
          )}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button>

      {submitStatus === "success" && (
        <div className="p-4 bg-gradient-to-r from-green-500/20 to-green-600/10 border border-green-500/50 rounded-lg text-green-400 text-center animate-slide-up shadow-lg shadow-green-500/20">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">✓</span>
            <span>Message sent successfully! I'll get back to you soon.</span>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 bg-gradient-to-r from-red-500/20 to-red-600/10 border border-red-500/50 rounded-lg text-red-400 text-center animate-slide-up shadow-lg shadow-red-500/20">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">✕</span>
            <span>Something went wrong. Please try again or email me directly.</span>
          </div>
        </div>
      )}
    </form>
  );
};

export default ContactForm;

