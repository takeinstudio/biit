import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface PageBreadcrumbHeroProps {
  label: string;
  title: string;
  description: string;
}

const PageBreadcrumbHero = ({ label, title, description }: PageBreadcrumbHeroProps) => (
  <section className="relative isolate h-[300px] overflow-hidden bg-slate-950 text-white">
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,14,30,0.9)_0%,rgba(40,12,26,0.82)_40%,rgba(122,22,40,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(226,29,47,0.3),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="absolute inset-0 noise-overlay" />
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
            {label}
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-sm font-medium">
            <Link
              to="/"
              className="inline-flex items-center rounded-2xl border border-white/14 bg-white/10 px-4 py-2.5 text-white/86 shadow-[0_16px_30px_rgba(2,6,23,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/28 hover:bg-white hover:text-slate-900"
            >
              Home
            </Link>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white/70 shadow-[0_16px_30px_rgba(2,6,23,0.18)] backdrop-blur-md">
              <ChevronRight size={18} />
            </span>
            <span className="inline-flex items-center rounded-2xl border border-primary/40 bg-[linear-gradient(135deg,rgba(40,15,24,0.96)_0%,rgba(226,29,47,0.95)_100%)] px-4 py-2.5 text-white shadow-[0_18px_40px_rgba(226,29,47,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_rgba(226,29,47,0.35)]">
              {title}
            </span>
          </div>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/72 sm:text-base">
            {description}
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default PageBreadcrumbHero;