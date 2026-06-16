import { motion } from "framer-motion";
import { Quote, Sparkles, Star, TrendingUp } from "lucide-react";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";
import CTASection from "@/components/sections/CTASection";
import { testimonials } from "@/lib/testimonials";

const highlights = [
  { icon: Quote, value: "6", label: "Featured Reviews" },
  { icon: Star, value: "4.9", label: "Average Rating" },
  { icon: TrendingUp, value: "Real", label: "Career Outcomes" },
];

const Testimonials = () => (
  <>
    <PageBreadcrumbHero
      label="Student Stories"
      title="Testimonials"
      description="Read what our students say about their learning journey, practical experience, and career transformation at BIIT Computer Education."
    />

    <section className="section-padding bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <div className="container-max relative">
        <div className="pointer-events-none absolute -left-12 top-10 hidden h-48 w-48 rounded-full bg-primary/8 blur-3xl lg:block" />
        <div className="pointer-events-none absolute -right-10 bottom-12 hidden h-56 w-56 rounded-full bg-primary/10 blur-3xl lg:block" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-flex rounded-full border border-accent/15 bg-accent/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              Testimonials Experience
            </span>
            <h2 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Stories From Learners
              <br />
              Who Built Real Momentum.
            </h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 170, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 h-1 rounded-full bg-[linear-gradient(90deg,rgba(226,29,47,0.95)_0%,rgba(15,23,42,0.88)_100%)]"
            />
            <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-slate-600 sm:text-lg">
              <p>
                These testimonials reflect the practical training, faculty guidance, and placement-focused support that define the BIIT learning experience.
              </p>
              <p>
                From beginners building confidence to graduates landing their first roles, each review highlights outcomes shaped by real classroom and project work at BIIT.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="relative"
          >
            <div className="card-premium relative overflow-hidden border border-slate-200/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.95)_45%,rgba(241,245,249,0.92)_100%)] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.1)] sm:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(226,29,47,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.08),transparent_30%)]" />
              <div className="relative space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                  <Sparkles size={14} className="text-primary" />
                  Snapshot
                </div>
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + index * 0.08, duration: 0.45 }}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/90 p-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)] transition-shadow duration-300 hover:shadow-[0_20px_42px_rgba(15,23,42,0.11)]"
                  >
                    <div className="absolute inset-x-5 top-0 h-px overflow-hidden rounded-full bg-slate-200/70">
                      <div className="h-full w-16 -translate-x-20 bg-[linear-gradient(90deg,transparent_0%,rgba(226,29,47,0.2)_20%,rgba(226,29,47,0.95)_50%,rgba(226,29,47,0.2)_80%,transparent_100%)] transition-transform duration-700 group-hover:translate-x-[280px]" />
                    </div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(226,29,47,0.08),transparent_28%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative flex items-start gap-4">
                      <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-[linear-gradient(135deg,#0f172a_0%,#e21d2f_100%)]">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.8rem]">{item.value}</h3>
                        <p className="mt-2 text-base leading-8 text-slate-600">{item.label}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
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

              <p className="relative mb-6 flex-1 text-sm leading-relaxed text-foreground/90 transition-colors duration-300 group-hover:text-foreground">"{t.review}"</p>

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
      </div>
    </section>

    <CTASection />
  </>
);

export default Testimonials;
