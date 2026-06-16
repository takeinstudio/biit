import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { siteData } from "@/lib/siteData";

// Fixed preview picks by index
const PREVIEW_INDICES = [0, 4, 6, 1];

interface CoursesSectionProps {
  compactTop?: boolean;
  showAll?: boolean;
}

const CoursesSection = ({ compactTop = false, showAll = false }: CoursesSectionProps) => {
  const navigate = useNavigate();
  const allCourses = siteData.getCourses();
  const courses = showAll ? allCourses : PREVIEW_INDICES.map((i) => allCourses[i]).filter(Boolean);

  return (
    <section className={`${compactTop ? "px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 lg:pb-24" : "section-padding"} bg-background`}>
      <div className="container-max">
        <SectionHeading
          label="Our Programs"
          title="Industry-Ready Courses"
          description="Certified programs designed to transform beginners into skilled professionals ready for the tech industry."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group card-premium p-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-slate-100">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                />
                <div className="absolute top-3 left-3 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-foreground flex items-center gap-1">
                  <Clock size={12} /> {course.duration}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-foreground mb-1 font-heading">{course.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{course.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-accent font-bold tabular-nums text-sm">₹{course.fee}</span>
                  <button
                    onClick={() => { navigate("/courses"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="text-xs font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Learn More <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {!showAll && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-10 flex justify-center"
        >
          <motion.button
            onClick={() => { navigate("/courses"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            whileHover={{ y: -2, boxShadow: "0 8px 28px rgba(226,29,47,0.30)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[linear-gradient(135deg,#e21d2f,#b01020)] text-white text-sm font-semibold transition-all duration-300"
          >
            See All Courses <ArrowRight size={15} />
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};

export default CoursesSection;
