import { motion } from "framer-motion";
import { GraduationCap, Users, Briefcase, Award, BookOpen, Monitor, Globe, Shield } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const features = [
  { icon: GraduationCap, title: "Certified Curriculum", desc: "ISO 9001 certified courses aligned with industry standards." },
  { icon: Users, title: "Expert Faculty", desc: "1500+ certified trainers with real-world industry experience." },
  { icon: Briefcase, title: "Placement Assistance", desc: "Dedicated placement cell with 94% placement rate." },
  { icon: Monitor, title: "Live Projects", desc: "Hands-on experience with real-world projects and case studies." },
  { icon: Globe, title: "150+ Centers", desc: "Pan-India franchise network for accessible education." },
  { icon: Award, title: "Recognized Certificates", desc: "Government-recognized certificates with verification portal." },
  { icon: BookOpen, title: "Updated Syllabus", desc: "Curriculum updated quarterly to match industry trends." },
  { icon: Shield, title: "Startup India", desc: "Recognized by Startup India & Government of Odisha." },
];

const WhyChooseSection = () => (
  <section className="relative section-padding overflow-hidden bg-[linear-gradient(170deg,#f8f9fd_0%,#f3f4f9_45%,#eef1f7_100%)]">
    <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_12%_22%,rgba(226,29,47,0.08),transparent_38%),radial-gradient(circle_at_86%_18%,rgba(139,92,246,0.07),transparent_36%),radial-gradient(circle_at_52%_92%,rgba(59,130,246,0.05),transparent_40%)]" />
    <motion.div
      aria-hidden
      animate={{ y: [0, -18, 0], opacity: [0.28, 0.42, 0.28] }}
      transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-[80px]"
    />
    <motion.div
      aria-hidden
      animate={{ y: [0, 16, 0], opacity: [0.22, 0.35, 0.22] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      className="pointer-events-none absolute -bottom-16 right-0 h-80 w-80 rounded-full bg-violet-300/25 blur-[92px]"
    />

    <div className="container-max relative z-10">
      <SectionHeading
        label="Why BIIT"
        title="Why Choose BIIT Computer Education?"
        description="We don't just teach — we transform careers with industry-aligned training and real placement support."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 backdrop-blur-xl transition-all duration-500"
            style={{ boxShadow: "0 14px 38px rgba(15, 23, 42, 0.10)" }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_22%_14%,rgba(226,29,47,0.18),transparent_40%),radial-gradient(circle_at_80%_88%,rgba(14,165,233,0.15),transparent_42%)]" />
            <span className="absolute inset-x-0 top-0 h-[2px] scale-x-0 bg-[linear-gradient(90deg,transparent,rgba(226,29,47,0.9),transparent)] transition-transform duration-500 origin-left group-hover:scale-x-100" />

            <div className="relative mb-4 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/12 border border-primary/20 transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:shadow-[0_10px_26px_rgba(226,29,47,0.35)] group-hover:-translate-y-0.5">
              <f.icon size={22} className="text-primary transition-all duration-500 group-hover:text-primary-foreground group-hover:scale-110" />
            </div>

            <h3 className="relative font-heading text-[1.04rem] font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-primary">
              {f.title}
            </h3>
            <p className="relative text-xs text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground/85">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseSection;
