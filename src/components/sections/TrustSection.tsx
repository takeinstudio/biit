import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Shield, Award, Rocket } from "lucide-react";
import { siteData } from "@/lib/siteData";

const badges = [
  { icon: Shield, title: "ISO 9001:2015", desc: "Quality Management Certified" },
  { icon: Rocket, title: "Govt. Recognized", desc: "Government Recognized Institute" },
  { icon: Award, title: "Student Excellence", desc: "15,000+ Students Trained" },
];

const TrustSection = () => {
  const settings = siteData.getSettings();
  return (
  <section className="relative section-padding overflow-hidden bg-[linear-gradient(170deg,#f8f9fd_0%,#f2f3f8_48%,#eef1f7_100%)]">
    <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_14%_18%,rgba(226,29,47,0.08),transparent_38%),radial-gradient(circle_at_84%_20%,rgba(99,102,241,0.08),transparent_36%),radial-gradient(circle_at_54%_90%,rgba(14,165,233,0.05),transparent_40%)]" />
    <motion.div
      aria-hidden
      animate={{ y: [0, -16, 0], opacity: [0.2, 0.35, 0.2] }}
      transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute -top-20 -left-16 h-72 w-72 rounded-full bg-primary/20 blur-[85px]"
    />
    <motion.div
      aria-hidden
      animate={{ y: [0, 18, 0], opacity: [0.18, 0.3, 0.18] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
      className="pointer-events-none absolute -bottom-16 right-0 h-80 w-80 rounded-full bg-violet-300/25 blur-[95px]"
    />

    <div className="container-max relative z-10">
      <SectionHeading
        label="Trust & Recognition"
        title="Nationally Recognized Excellence"
        description="Our certifications and recognitions speak for the quality of education we deliver."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {badges.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-8 text-center backdrop-blur-xl"
            style={{ boxShadow: "0 16px 40px rgba(15, 23, 42, 0.10)" }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_20%_15%,rgba(226,29,47,0.16),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(59,130,246,0.12),transparent_44%)]" />
            <span className="absolute inset-x-0 top-0 h-[2px] scale-x-0 bg-[linear-gradient(90deg,transparent,rgba(226,29,47,0.9),transparent)] transition-transform duration-500 origin-left group-hover:scale-x-100" />

            <div className="relative w-16 h-16 rounded-2xl bg-primary/12 border border-primary/20 flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:shadow-[0_10px_28px_rgba(226,29,47,0.35)] group-hover:-translate-y-0.5">
              <b.icon size={28} className="text-primary transition-all duration-500 group-hover:text-primary-foreground group-hover:scale-110" />
            </div>
            <h3 className="relative font-heading font-bold text-foreground text-lg mb-1 transition-colors duration-300 group-hover:text-primary">{b.title}</h3>
            <p className="relative text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/85">{b.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/70 backdrop-blur-xl"
        style={{ boxShadow: "0 16px 44px rgba(15, 23, 42, 0.12)" }}
      >
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_12%_18%,rgba(226,29,47,0.12),transparent_38%),radial-gradient(circle_at_90%_88%,rgba(14,165,233,0.12),transparent_44%)]" />
        <div className="relative grid grid-cols-2 lg:grid-cols-4 divide-x divide-border/70">
        <AnimatedCounter end={settings.totalCenters} label="Centers" />
        <AnimatedCounter end={settings.totalClasses} label="Classes Completed" />
        <AnimatedCounter end={settings.totalStudents} label="Students Enrolled" />
        <AnimatedCounter end={settings.totalTeachers} label="Certified Teachers" />
        </div>
      </motion.div>
    </div>
  </section>
  );
};

export default TrustSection;
