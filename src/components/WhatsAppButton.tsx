import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteData } from "@/lib/siteData";

const WhatsAppButton = () => {
  const settings = siteData.getSettings();
  const waUrl = `https://wa.me/${settings.whatsapp}?text=Hello%20${encodeURIComponent(settings.instituteName)}%2C%20I%20want%20to%20know%20more%20about%20your%20courses.`;
  return (
  <motion.a
    href={waUrl}
    target="_blank"
    rel="noreferrer"
    aria-label={`Chat with ${settings.instituteName} on WhatsApp`}
    initial={{ opacity: 0, scale: 0.9, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
    whileHover={{ scale: 1.06, y: -2 }}
    whileTap={{ scale: 0.97 }}
    className="fixed bottom-6 right-6 z-[70]"
  >
    <span className="absolute inset-0 rounded-full bg-[#25D366]/35 blur-xl animate-pulse" />
    <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[linear-gradient(135deg,#25D366_0%,#1ea952_100%)] text-white shadow-[0_18px_40px_rgba(37,211,102,0.35)]">
      <MessageCircle size={26} />
    </span>
  </motion.a>
  );
};

export default WhatsAppButton;
