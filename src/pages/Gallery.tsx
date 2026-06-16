import { motion } from "framer-motion";
import { Camera, ImageIcon, Sparkles, Users } from "lucide-react";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";
import CTASection from "@/components/sections/CTASection";
import { galleryImages } from "@/lib/galleryImages";

const highlights = [
  { icon: Camera, value: "09", label: "Curated Photos" },
  { icon: Users, value: "Live", label: "Training Environment" },
  { icon: ImageIcon, value: "Real", label: "Campus Moments" },
];

const Gallery = () => (
  <>
    <PageBreadcrumbHero
      label="Campus Gallery"
      title="Gallery"
      description="Explore BIIT Computer Education through real classroom moments, campus highlights, and snapshots of practical learning in action."
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
              Gallery Experience
            </span>
            <h2 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              A Visual Look Into
              <br />
              BIIT Learning Culture.
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
                Our gallery reflects the same spirit that defines BIIT Computer Education: practical training, focused environments,
                active participation, and students building confidence through real experiences.
              </p>
              <p>
                From classroom engagement to campus moments, these images capture the atmosphere behind our industry-ready approach.
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
                  What You'll See
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

    <section className="section-padding bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
      <div className="container-max">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[30px] border border-white/80 bg-white/75 p-2 shadow-[0_18px_48px_rgba(15,23,42,0.10)] backdrop-blur-xl"
            >
              <div className="absolute inset-x-8 top-0 h-px overflow-hidden rounded-full bg-slate-200/70">
                <div className="h-full w-16 -translate-x-20 bg-[linear-gradient(90deg,transparent_0%,rgba(226,29,47,0.25)_20%,rgba(226,29,47,0.95)_50%,rgba(226,29,47,0.25)_80%,transparent_100%)] transition-transform duration-700 group-hover:translate-x-[420px]" />
              </div>
              <div className="relative overflow-hidden rounded-[24px]">
                <img
                  src={image}
                  alt={`BIIT gallery ${index + 1}`}
                  className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(15,23,42,0.16)_55%,rgba(15,23,42,0.82)_100%)] opacity-80" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  <Sparkles size={12} className="text-primary" />
                  Gallery Frame
                </div>
                <div className="absolute inset-x-5 bottom-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/72">BIIT Computer Education</p>
                  <h3 className="mt-2 text-xl font-bold text-white">Training Environment {index + 1}</h3>
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

export default Gallery;
