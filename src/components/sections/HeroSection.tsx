import { motion } from "framer-motion";
import { ArrowRight, Play, Users, BookOpen, Award } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedCounter from "@/components/AnimatedCounter";
import heroBg from "@/assets/hero-bg.jpg";
import { siteData } from "@/lib/siteData";

const floatingCards = [
  { icon: Users, text: "New Enrollment: +12", delay: 0 },
  { icon: BookOpen, text: "Course Rating: 4.9/5", delay: 0.2 },
  { icon: Award, text: "Placement: 92%", delay: 0.4 },
];

const HeroSection = () => {
  const settings = siteData.getSettings();
  return (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,14,30,0.9)_0%,rgba(42,12,28,0.82)_42%,rgba(122,22,40,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_84%_75%,rgba(255,255,255,0.08),transparent_30%)]" />
      <div className="absolute inset-0 noise-overlay" />
    </div>

    {/* Floating Cards */}
    <div className="absolute right-8 top-1/4 hidden xl:flex flex-col gap-4 z-10">
      {floatingCards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + card.delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="animate-float bg-background/90 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-3 shadow-lg"
          style={{ animationDelay: `${card.delay * 2}s` }}
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <card.icon size={16} className="text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground">{card.text}</span>
        </motion.div>
      ))}
    </div>

    <div className="relative z-10 container-max px-4 sm:px-6 py-20">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block bg-primary/20 text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-primary-foreground/10">
            {settings.certifiedBadge1}
          </span>
          <h1 className="heading-xl text-primary-foreground leading-[1.1] mb-6">
            Build Your Future with{" "}
            <span className="text-primary">{settings.instituteName}</span>
          </h1>
          <p className="text-base sm:text-lg text-primary-foreground/70 max-w-xl mb-8 leading-relaxed">
            {settings.heroSubtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap gap-4"
        >
          <Link to="/courses" className="btn-primary flex items-center gap-2 text-sm">
            Explore Courses <ArrowRight size={16} />
          </Link>
          <Link to="/franchise" className="btn-outline border-primary-foreground/30 text-primary-foreground hover:border-primary hover:text-primary text-sm">
            Franchise Opportunity
          </Link>
          <button className="flex items-center gap-2 text-primary-foreground/80 text-sm font-medium hover:text-primary transition-colors">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center backdrop-blur-sm animate-pulse-glow">
              <Play size={16} className="text-primary-foreground ml-0.5" />
            </div>
            Watch Video
          </button>
        </motion.div>
      </div>
    </div>

    {/* Stats Bar */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="absolute bottom-0 inset-x-0 z-10"
    >
      <div className="container-max px-4 sm:px-6">
          <div className="bg-background/95 backdrop-blur-xl rounded-t-2xl shadow-xl border border-border/50 grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
          <AnimatedCounter end={settings.totalStudents} label="Certified Students" />
          <AnimatedCounter end={settings.totalClasses} label="Classes Completed" />
          <AnimatedCounter end={settings.totalTeachers} label="Certified Teachers" />
          <AnimatedCounter end={settings.totalCenters} label="Franchise Centers" />
        </div>
      </div>
    </motion.div>
  </section>
  );
};

export default HeroSection;
