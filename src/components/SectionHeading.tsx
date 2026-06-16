import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  center?: boolean;
}

const SectionHeading = ({ label, title, description, center = true }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-12 ${center ? "text-center" : "text-left"}`}
  >
    <span className="section-label">{label}</span>
    <h2 className="heading-lg text-foreground">{title}</h2>
    {description && (
      <p className="text-body mt-4 max-w-2xl mx-auto">{description}</p>
    )}
  </motion.div>
);

export default SectionHeading;
