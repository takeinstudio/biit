import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  { step: "01", title: "Explore Courses", desc: "Browse our industry-aligned course catalog and find the right program for your career goals." },
  { step: "02", title: "Submit Enquiry", desc: "Fill out a quick form or reach us on WhatsApp. Our counselor will guide you through the process." },
  { step: "03", title: "Start Learning", desc: "Join your batch, access lab facilities, and start building real-world skills with expert guidance." },
  { step: "04", title: "Get Certified", desc: "Complete your course, earn a recognized certificate, and get placement support from our team." },
];

const AdmissionFunnel = () => (
  <section className="section-padding bg-background">
    <div className="container-max">
      <SectionHeading
        label="How It Works"
        title="Your Path to Success"
        description="A simple, guided process from enrollment to placement — we support you every step of the way."
      />

      <div className="relative">
        {/* Red Thread Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-primary/20 hidden lg:block -translate-x-1/2" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center relative"
            >
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold font-heading relative z-10">
                {s.step}
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Link to="/courses" className="btn-primary inline-flex items-center gap-2">
          Start Your Journey <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default AdmissionFunnel;
