import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle, CheckCircle } from "lucide-react";

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName?: string;
}

const EnrollModal = ({ isOpen, onClose, courseName = "" }: EnrollModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    course: courseName,
    city: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setForm({ name: "", phone: "", email: "", course: "", city: "", message: "" });
    }, 2500);
  };

  const whatsappEnquiry = () => {
    const text = `Hi, I'm interested in ${form.course || "your courses"}. Name: ${form.name}, Phone: ${form.phone}`;
    window.open(`https://wa.me/919238945751?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-card rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="bg-primary p-6 text-primary-foreground">
              <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full hover:bg-primary-foreground/20 transition-colors">
                <X size={20} />
              </button>
              <h3 className="heading-md text-primary-foreground">Enroll Now</h3>
              <p className="text-sm text-primary-foreground/80 mt-1">Fill the form to start your learning journey</p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 text-center"
              >
                <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                <h4 className="heading-md text-foreground">Enquiry Submitted!</h4>
                <p className="text-body mt-2">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <input
                  required
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
                <input
                  required
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
                <input
                  placeholder="Course Selected"
                  value={form.course || courseName}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
                <input
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                />
                <textarea
                  placeholder="Message (optional)"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                />
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                    <Send size={16} /> Submit Enquiry
                  </button>
                  <button
                    type="button"
                    onClick={whatsappEnquiry}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-green-600"
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnrollModal;
