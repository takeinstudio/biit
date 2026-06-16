import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  ChevronRight,
  Globe,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import AnimatedCounter from "@/components/AnimatedCounter";
import heroBg from "@/assets/hero-bg.jpg";

const spotlightStats = [
  { icon: GraduationCap, title: "15,000+", desc: "Learners Trained" },
  { icon: Users, title: "500+", desc: "Certified Faculty" },
  { icon: Globe, title: "50+", desc: "Centers Across India" },
  { icon: Award, title: "ISO 9001", desc: "Quality Certified" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Industry-Ready Learning",
    desc: "Curriculum is built around practical assignments, confidence-building labs, and live tools students actually use at work.",
  },
  {
    icon: Briefcase,
    title: "Career-First Guidance",
    desc: "We design every learner journey to move from certification to employability with stronger portfolios, mentoring, and outcomes.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Delivery Standards",
    desc: "Processes, faculty enablement, and center operations are built to keep the experience consistent as the network grows.",
  },
];

const About = () => {
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rightPanelRef,
    offset: ["start end", "end start"],
  });
  const rightPanelParallaxY = useTransform(scrollYProgress, [0, 1], [10, -10]);

  return (
  <>
    <section className="premium-breadcrumb-section relative isolate h-[300px] overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <motion.img
          src={heroBg}
          alt="Students learning together"
          className="h-full w-full object-cover"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1.14 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.78)_0%,rgba(15,23,42,0.84)_45%,rgba(17,24,39,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(226,29,47,0.3),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="absolute inset-0 noise-overlay" />
        <motion.div
          className="absolute -left-10 top-[-60px] h-44 w-44 rounded-full bg-primary/20 blur-3xl"
          animate={{ x: [0, 18, 0], y: [0, 10, 0], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-90px] right-[8%] h-56 w-56 rounded-full bg-primary/20 blur-3xl"
          animate={{ x: [0, -16, 0], y: [0, -12, 0], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-y-0 left-[12%] hidden w-px bg-white/20 sm:block"
          animate={{ opacity: [0.12, 0.3, 0.12] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 flex h-full items-center">
        <div className="container-max px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/78 shadow-[0_16px_40px_rgba(2,6,23,0.24)] backdrop-blur-md">
              <Sparkles size={14} className="text-primary" />
              About BIIT Computer Education
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              About Us
            </h1>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-sm font-medium">
              <Link
                to="/"
                className="inline-flex items-center rounded-2xl border border-white/14 bg-white/10 px-4 py-2.5 text-white/86 shadow-[0_16px_30px_rgba(2,6,23,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/28 hover:bg-white hover:text-slate-900 hover:shadow-[0_18px_40px_rgba(255,255,255,0.12)]"
              >
                Home
              </Link>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white/70 shadow-[0_16px_30px_rgba(2,6,23,0.18)] backdrop-blur-md">
                <ChevronRight size={18} />
              </span>
              <span className="inline-flex items-center rounded-2xl border border-primary/40 bg-[linear-gradient(135deg,rgba(40,15,24,0.96)_0%,rgba(226,29,47,0.95)_100%)] px-4 py-2.5 text-white shadow-[0_18px_40px_rgba(226,29,47,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_rgba(226,29,47,0.35)]">
                About Us
              </span>
            </div>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/72 sm:text-base">
              Empowering learners with skills that shape real careers. Where knowledge meets practical,
              industry-ready training for the next generation of professionals.
            </p>

            <div className="mt-4 inline-flex max-w-full items-center justify-center rounded-full border border-white/14 bg-white/10 px-5 py-3 text-xs font-semibold text-white/84 shadow-[0_16px_36px_rgba(2,6,23,0.22)] backdrop-blur-md sm:text-sm">
              Verified | Government Recognized | ISO Certified
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="section-padding bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <div className="container-max relative">
        <div className="pointer-events-none absolute -left-12 top-10 hidden h-48 w-48 rounded-full bg-primary/8 blur-3xl lg:block" />
        <div className="pointer-events-none absolute -right-10 bottom-12 hidden h-56 w-56 rounded-full bg-primary/10 blur-3xl lg:block" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-flex rounded-full border border-accent/15 bg-accent/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              About BIIT Computer Education
            </span>
            <h2 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              A Decade of Experience.
              <br />
              A Future-Focused Vision.
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
                BIIT Computer Education has been shaping practical technology careers with an approach rooted in clarity, confidence, and execution. We do not just teach software skills; we train learners to perform in classrooms, labs, interviews, and real work environments.
              </p>
              <p>
                Supported by a growing network of centers, our ecosystem brings certified programs, faculty support, and consistent quality standards to students across the region.
              </p>
              <p>
                Our focus remains simple: close the gap between academic theory and the expectations of employers through hands-on, structured, career-first education.
              </p>
            </div>
          </motion.div>

          <motion.div
            ref={rightPanelRef}
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            style={{ y: shouldReduceMotion ? 0 : rightPanelParallaxY }}
            className="relative"
          >
            <div className="absolute -left-6 top-10 hidden h-32 w-32 rounded-full bg-primary/10 blur-3xl lg:block" />
            <div className="card-premium relative overflow-hidden border border-slate-200/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.95)_45%,rgba(241,245,249,0.92)_100%)] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.1)] sm:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(226,29,47,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.08),transparent_30%)]" />
              <div className="relative space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-600 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                  <ShieldCheck size={14} className="text-primary" />
                  What Sets Us Apart
                </div>
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.08, duration: 0.45 }}
                    whileHover={{ y: -6 }}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/90 p-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)] transition-shadow duration-300 hover:shadow-[0_20px_42px_rgba(15,23,42,0.11)]"
                  >
                    <div className="absolute inset-x-5 top-0 h-px overflow-hidden rounded-full bg-slate-200/70">
                      <div className="h-full w-16 -translate-x-20 bg-[linear-gradient(90deg,transparent_0%,rgba(226,29,47,0.2)_20%,rgba(226,29,47,0.95)_50%,rgba(226,29,47,0.2)_80%,transparent_100%)] transition-transform duration-700 group-hover:translate-x-[280px]" />
                    </div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(226,29,47,0.08),transparent_28%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-[linear-gradient(135deg,#0f172a_0%,#e21d2f_100%)]">
                        <value.icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.8rem]">{value.title}</h3>
                        <p className="mt-2 text-base leading-8 text-slate-600">{value.desc}</p>
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

    <section className="section-padding section-muted">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="section-label">Mission & Vision</span>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Built To Create Confident, Employable Learners
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every program, process, and center is designed to produce real skills, measurable growth, and stronger career outcomes.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group card-premium relative overflow-hidden border border-white/70 bg-white p-8 transition-all duration-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:p-10"
          >
            <div className="absolute inset-x-10 top-0 h-px overflow-hidden rounded-full bg-slate-200/70">
              <div className="h-full w-16 -translate-x-20 bg-[linear-gradient(90deg,transparent_0%,rgba(226,29,47,0.2)_20%,rgba(226,29,47,0.9)_50%,rgba(226,29,47,0.2)_80%,transparent_100%)] transition-transform duration-700 group-hover:translate-x-[360px]" />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(226,29,47,0.1),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-[linear-gradient(135deg,rgba(226,29,47,0.2)_0%,rgba(226,29,47,0.08)_100%)]">
              <Target size={28} />
            </div>
            <h3 className="relative mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Mission</h3>
            <p className="text-body relative mt-4 transition-colors duration-300 group-hover:text-slate-700">
              To deliver accessible, high-quality IT education that equips learners with practical knowledge, professional discipline, and the confidence to succeed in a global digital economy.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            whileHover={{ y: -8 }}
            className="group card-premium relative overflow-hidden border border-white/70 bg-white p-8 transition-all duration-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] sm:p-10"
          >
            <div className="absolute inset-x-10 top-0 h-px overflow-hidden rounded-full bg-slate-200/70">
              <div className="h-full w-16 -translate-x-20 bg-[linear-gradient(90deg,transparent_0%,rgba(226,29,47,0.2)_20%,rgba(226,29,47,0.9)_50%,rgba(226,29,47,0.2)_80%,transparent_100%)] transition-transform duration-700 group-hover:translate-x-[360px]" />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(226,29,47,0.1),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-105 group-hover:bg-[linear-gradient(135deg,rgba(226,29,47,0.2)_0%,rgba(226,29,47,0.08)_100%)] group-hover:text-primary">
              <BookOpen size={28} />
            </div>
            <h3 className="relative mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Vision</h3>
            <p className="text-body relative mt-4 transition-colors duration-300 group-hover:text-slate-700">
              To become India&apos;s most trusted education network for career-oriented learning, where ambitious students can access premium training regardless of geography or background.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="section-padding section-muted">
      <div className="container-max">
        <SectionHeading
          label="Network Strength"
          title="Our Scale, Backed By Outcomes"
          description="A quick snapshot of the reach, quality, and learner impact that defines the BIIT network."
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {spotlightStats.map((item, index) => (
            <motion.div
              key={item.desc}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-[30px] border border-slate-200/90 bg-white p-7 text-left shadow-[0_20px_50px_rgba(15,23,42,0.06)] transition-shadow duration-300 hover:shadow-[0_28px_65px_rgba(15,23,42,0.14)]"
            >
              <div className="absolute inset-x-6 top-0 h-px overflow-hidden rounded-full bg-slate-200/80">
                <div className="h-full w-20 -translate-x-24 bg-[linear-gradient(90deg,transparent_0%,rgba(226,29,47,0.18)_12%,rgba(226,29,47,0.92)_52%,rgba(226,29,47,0.18)_88%,transparent_100%)] transition-transform duration-700 group-hover:translate-x-[320px]" />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(226,29,47,0.1),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(226,29,47,0.08),transparent_26%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-[linear-gradient(135deg,#0f172a_0%,#e21d2f_100%)]">
                  <item.icon size={24} />
                </div>
                <div className="mt-7 flex items-end gap-2">
                  <span className="text-3xl font-bold text-slate-900">{item.title}</span>
                  <span className="mb-1 text-xs uppercase tracking-[0.24em] text-slate-400 transition-colors duration-300 group-hover:text-primary">0{index + 1}</span>
                </div>
                <p className="mt-3 text-base leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-700">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    <section className="relative overflow-hidden pb-24 pt-8">
      <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)]" />
      <div className="absolute inset-x-0 bottom-0 top-20 bg-[linear-gradient(120deg,#0b1224_0%,#3a0e23_30%,#7a1628_62%,#e21d2f_100%)]" />
      <div className="absolute inset-x-0 bottom-0 top-20 [background:radial-gradient(circle_at_12%_24%,rgba(255,255,255,0.12),transparent_25%),radial-gradient(circle_at_85%_16%,rgba(255,255,255,0.14),transparent_24%),radial-gradient(circle_at_72%_78%,rgba(255,255,255,0.1),transparent_27%)]" />
      <div className="absolute inset-x-0 bottom-0 top-20 opacity-80 [background:conic-gradient(from_220deg_at_50%_65%,rgba(255,255,255,0.08),transparent_40%,rgba(255,255,255,0.06),transparent_75%)]" />
      <div className="absolute inset-x-0 bottom-0 top-20 noise-overlay" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-20 overflow-hidden">
        {[
          { left: "6%", size: 4, delay: 0.1, duration: 7.5 },
          { left: "14%", size: 3, delay: 0.6, duration: 8.8 },
          { left: "22%", size: 5, delay: 0.2, duration: 9.5 },
          { left: "31%", size: 3, delay: 1.1, duration: 7.9 },
          { left: "39%", size: 4, delay: 0.9, duration: 8.4 },
          { left: "48%", size: 3, delay: 0.5, duration: 9.2 },
          { left: "57%", size: 5, delay: 1.4, duration: 8.1 },
          { left: "66%", size: 3, delay: 0.3, duration: 8.6 },
          { left: "74%", size: 4, delay: 1.2, duration: 9.1 },
          { left: "83%", size: 3, delay: 0.8, duration: 7.7 },
          { left: "91%", size: 4, delay: 1.5, duration: 8.3 },
        ].map((particle, index) => (
          <motion.span
            key={`particle-${index}`}
            className="absolute bottom-[-20px] rounded-full bg-white/45"
            style={{ left: particle.left, width: particle.size, height: particle.size }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -220, opacity: [0, 0.85, 0] }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.4,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 container-max px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-6xl"
        >
          <div className="rounded-[34px] bg-[linear-gradient(135deg,rgba(255,255,255,0.95)_0%,rgba(203,213,225,0.85)_100%)] p-[1px] shadow-[0_26px_70px_rgba(15,23,42,0.2)]">
            <div className="overflow-hidden rounded-[33px] border border-white/80 bg-white/95 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-px bg-slate-200/70 lg:grid-cols-4">
                <div className="bg-white"><AnimatedCounter end={50} label="Centers" /></div>
                <div className="bg-white"><AnimatedCounter end={15000} label="Students" /></div>
                <div className="bg-white"><AnimatedCounter end={200} label="Teachers" /></div>
                <div className="bg-white"><AnimatedCounter end={80000} label="Classes" /></div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="relative mx-auto mt-11 max-w-4xl overflow-hidden rounded-[30px] border border-white/15 bg-white/[0.06] px-6 pb-8 pt-7 text-center shadow-[0_30px_70px_rgba(2,6,23,0.25)] backdrop-blur-md sm:px-10"
        >
          <div className="pointer-events-none absolute -left-10 top-8 h-32 w-32 rounded-full bg-white/8 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 bottom-0 h-36 w-36 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-14 top-0 h-px bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.5)_50%,transparent_100%)]" />

          <span className="relative inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">
            Career Growth Starts Here
          </span>
          <h2 className="relative mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Transform Your Career?
          </h2>
          <p className="relative mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-white/90 sm:text-base">
            Join 15,000+ students who have already built successful careers with
            <span className="font-semibold text-white"> BIIT Computer Education</span>.
          </p>
          <div className="relative mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/courses"
              className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#ff3b4f_0%,#e21d2f_68%,#b91025_100%)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(226,29,47,0.55)] ring-1 ring-white/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(226,29,47,0.65)]"
            >
              Explore Courses
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/franchise"
              className="inline-flex items-center rounded-full border border-white/35 bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.03)_100%)] px-7 py-3.5 text-sm font-semibold text-white/95 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/18"
            >
              Join as Franchise
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </>
  );
};

export default About;
