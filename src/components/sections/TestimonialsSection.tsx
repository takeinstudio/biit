import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { siteData } from "@/lib/siteData";

const TestimonialsSection = () => {
  const testimonialPreview = siteData.getTestimonials().slice(0, 3);
  return (
  <section className="relative section-padding overflow-hidden bg-[linear-gradient(168deg,#f8f9fd_0%,#f3f4f9_48%,#eef1f7_100%)]">
    <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_16%_18%,rgba(226,29,47,0.08),transparent_36%),radial-gradient(circle_at_84%_16%,rgba(99,102,241,0.08),transparent_38%),radial-gradient(circle_at_52%_88%,rgba(14,165,233,0.06),transparent_42%)]" />
    <motion.div
      aria-hidden
      animate={{ y: [0, -14, 0], opacity: [0.18, 0.33, 0.18] }}
      transition={{ duration: 8.4, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-[88px]"
    />
    <motion.div
      aria-hidden
      animate={{ y: [0, 18, 0], opacity: [0.16, 0.28, 0.16] }}
      transition={{ duration: 9.2, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
      className="pointer-events-none absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-violet-300/30 blur-[96px]"
    />

    <div className="container-max relative z-10">
      <SectionHeading
        label="Student Stories"
        title="What Our Students Say"
        description="Hear from successful graduates who transformed their careers with BIIT Computer Education."
      />


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonialPreview.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 backdrop-blur-xl"
            style={{ boxShadow: "0 16px 40px rgba(15, 23, 42, 0.10)" }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_24%_14%,rgba(226,29,47,0.16),transparent_40%),radial-gradient(circle_at_84%_90%,rgba(59,130,246,0.12),transparent_42%)]" />
            <span className="absolute inset-x-0 top-0 h-[2px] scale-x-0 bg-[linear-gradient(90deg,transparent,rgba(226,29,47,0.9),transparent)] transition-transform duration-500 origin-left group-hover:scale-x-100" />

            <div className="relative mb-4 flex items-center justify-between">
              <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  size={14}
                  className={j < t.rating ? "text-amber-500 fill-amber-500" : "text-border"}
                />
              ))}
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_10px_26px_rgba(226,29,47,0.35)]">
                <Quote size={15} />
              </div>
            </div>

            <p className="relative text-sm text-foreground/90 leading-relaxed mb-6 flex-1 transition-colors duration-300 group-hover:text-foreground">"{t.review}"</p>

            <div className="relative flex items-center gap-3 pt-4 border-t border-border/70">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-primary/12 text-primary font-bold text-sm transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">{t.name}</p>
                <p className="text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground/70">{t.course}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 flex justify-center"
      >
        <Link
          to="/testimonials"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#e21d2f,#b01020)] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(226,29,47,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(226,29,47,0.38)]"
        >
          See More Reviews
          <Quote size={15} className="transition-transform duration-300 group-hover:scale-110" />
        </Link>
      </motion.div>
    </div>
  </section>
  );
};

export default TestimonialsSection;
