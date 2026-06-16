import { motion } from "framer-motion";
import { ArrowRight, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { siteData } from "@/lib/siteData";

const GalleryPreviewSection = () => {
  const galleryItems = siteData.getGallery().slice(0, 3);
  return (
  <section className="section-padding bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
    <div className="container-max">
      <SectionHeading
        label="Campus Gallery"
        title="Moments From BIIT"
        description="Take a quick look at our classrooms, events, and hands-on learning spaces that shape confident careers."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-[28px] border border-white/80 bg-white/80 p-2 shadow-[0_18px_48px_rgba(15,23,42,0.10)] backdrop-blur-xl"
          >
            <div className="absolute inset-x-8 top-0 h-px overflow-hidden rounded-full bg-slate-200/70">
              <div className="h-full w-16 -translate-x-20 bg-[linear-gradient(90deg,transparent_0%,rgba(226,29,47,0.25)_20%,rgba(226,29,47,0.95)_50%,rgba(226,29,47,0.25)_80%,transparent_100%)] transition-transform duration-700 group-hover:translate-x-[420px]" />
            </div>
            <div className="relative overflow-hidden rounded-[22px]">
              <img
                src={item.url}
                alt={item.caption || `BIIT Gallery ${index + 1}`}
                className="h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(15,23,42,0.15)_55%,rgba(15,23,42,0.78)_100%)] opacity-80" />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                <Camera size={12} className="text-primary" />
                {item.category || "Gallery Highlight"}
              </div>
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/70">BIIT Computer Education</p>
                  <h3 className="mt-2 text-xl font-bold text-white">{item.caption || "Learning In Action"}</h3>
                </div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-primary group-hover:border-primary">
                  <ArrowRight size={18} />
                </span>
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
          to="/gallery"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#e21d2f,#b01020)] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(226,29,47,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(226,29,47,0.38)]"
        >
          Open Gallery
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  </section>
  );
};

export default GalleryPreviewSection;
