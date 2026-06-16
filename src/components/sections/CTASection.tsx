import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { siteData } from "@/lib/siteData";

const CTASection = () => {
  const settings = siteData.getSettings();
  return (
  <section className="relative overflow-hidden py-20">
    <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
    <div className="absolute inset-0 noise-overlay" />
    <div className="relative z-10 container-max px-4 sm:px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="heading-lg text-primary-foreground mb-4">
          Ready to Transform Your Career?
        </h2>
        <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
          Join {settings.totalStudents.toLocaleString()}+ students who have already built successful careers with <strong>{settings.instituteName}</strong>.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/courses" className="btn-primary flex items-center gap-2">
            Explore Courses <ArrowRight size={16} />
          </Link>
          <Link to="/franchise" className="btn-outline border-primary-foreground/30 text-primary-foreground hover:border-primary hover:text-primary">
            Join as Franchise
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
  );
};

export default CTASection;

