import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube, ArrowRight } from "lucide-react";
import logo from "@/assets/logo-biit.png";
import { siteData } from "@/lib/siteData";

// ── Floating particles config ──────────────────────────────────────
const PARTICLES = [
  { x: "8%",  size: 3, dur: 9,  delay: 0,   opacity: 0.18 },
  { x: "18%", size: 5, dur: 13, delay: 2,   opacity: 0.12 },
  { x: "31%", size: 2, dur: 8,  delay: 4.5, opacity: 0.22 },
  { x: "44%", size: 4, dur: 11, delay: 1,   opacity: 0.15 },
  { x: "55%", size: 6, dur: 15, delay: 3,   opacity: 0.09 },
  { x: "63%", size: 2, dur: 7,  delay: 6,   opacity: 0.20 },
  { x: "72%", size: 3, dur: 10, delay: 0.5, opacity: 0.16 },
  { x: "80%", size: 5, dur: 12, delay: 2.5, opacity: 0.11 },
  { x: "89%", size: 2, dur: 9,  delay: 5,   opacity: 0.19 },
  { x: "95%", size: 4, dur: 14, delay: 1.5, opacity: 0.13 },
  { x: "25%", size: 3, dur: 11, delay: 7,   opacity: 0.17 },
  { x: "50%", size: 2, dur: 8,  delay: 3.5, opacity: 0.21 },
  { x: "76%", size: 5, dur: 16, delay: 0.8, opacity: 0.10 },
];

const quickLinks = [
  { label: "Home",               path: "/" },
  { label: "About Us",           path: "/about" },
  { label: "Courses",            path: "/courses" },
  { label: "Gallery",            path: "/gallery" },
  { label: "Franchise",          path: "/franchise" },
  { label: "Testimonials",       path: "/testimonials" },
  { label: "Verify Certificate", path: "/verify" },
  { label: "Contact Us",         path: "/contact" },
  { label: "Pay Online",         path: "/payment" },
];

const popularCourses = ["DCA", "PGDCA", "Tally ERP 9.0", "DTP", "C (Level)", "OS-CIT", "C", "C++", "VB", "Oracle", "Java"];
const socialIcons = [
  { Icon: Facebook, key: "facebook" },
  { Icon: Instagram, key: "instagram" },
  { Icon: Twitter, key: "twitter" },
  { Icon: Linkedin, key: "linkedin" },
  { Icon: Youtube, key: "youtube" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const colVariants = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Footer = () => {
  const settings = siteData.getSettings();
  return (
  <footer className="relative overflow-hidden bg-[linear-gradient(120deg,#080e1e_0%,#200a16_48%,#131313_100%)] text-primary-foreground">

    {/* ── Top glowing accent bar ─────────────────────────────── */}
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      className="absolute inset-x-0 top-0 h-[2px] origin-left bg-[linear-gradient(90deg,transparent_0%,rgba(226,29,47,0.5)_25%,rgba(226,29,47,1)_55%,rgba(226,29,47,0.5)_78%,transparent_100%)]"
    />

    {/* ── Ambient glow orbs ──────────────────────────────────── */}
    <motion.div
      animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full bg-primary blur-[100px]"
    />
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.11, 0.06] }}
      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      className="pointer-events-none absolute -bottom-24 right-0 w-[360px] h-[360px] rounded-full bg-violet-600 blur-[110px]"
    />
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.09, 0.05] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full bg-rose-800/30 blur-[80px]"
    />

    {/* ── Noise overlay ──────────────────────────────────────── */}
    <div className="pointer-events-none absolute inset-0 noise-overlay opacity-40" />

    {/* ── Floating particles ─────────────────────────────────── */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          style={{
            left: p.x,
            bottom: "-12px",
            width:  p.size,
            height: p.size,
            borderRadius: "50%",
            background: `rgba(226,29,47,${p.opacity})`,
            position: "absolute",
          }}
          animate={{ y: [0, -320, -640], opacity: [0, p.opacity * 3, 0] }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>

    {/* ── Main content ───────────────────────────────────────── */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="relative z-10 container-max px-6 pt-16 pb-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand column */}
        <motion.div variants={colVariants}>
          <div className="inline-flex items-center justify-center p-1 bg-white rounded-xl mb-5 shadow-sm">
            <motion.img
              src={logo}
              alt="BIIT Computer Education"
              className="h-10 w-auto rounded-lg"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed mb-4">
            {settings.instituteName} — {settings.tagline}. Delivering industry-focused IT training and certification programs since {settings.established}.
          </p>
          <div className="flex flex-col gap-1 mb-5 text-xs text-primary-foreground/60">
            <span className="flex items-center gap-2"><MapPin size={11} className="text-primary shrink-0" /> {settings.address}</span>
          </div>
          {/* Social icons */}
          <div className="flex gap-3">
            {socialIcons.map(({ Icon, key }, i) => (
              <motion.a
                key={i}
                href={settings[key as keyof typeof settings] as string || "#"}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative w-10 h-10 rounded-full border border-white/12 bg-white/5 text-primary-foreground/80 flex items-center justify-center overflow-hidden group"
              >
                <span className="absolute inset-0 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
                <Icon size={15} className="relative z-10" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={colVariants}>
          <h4 className="font-heading font-semibold text-sm mb-5 uppercase tracking-widest text-primary-foreground/90 flex items-center gap-2">
            <span className="inline-block w-5 h-px bg-primary" />
            Quick Links
          </h4>
          <div className="flex flex-col gap-2">
            {quickLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
              >
                <Link
                  to={link.path}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="group relative inline-flex items-center gap-2 py-1 text-sm text-primary-foreground/75 hover:text-primary transition-colors duration-300"
                >
                  <ArrowRight
                    size={12}
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary"
                  />
                  <span className="relative">
                    {link.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px overflow-hidden">
                      <span className="block h-full w-10 -translate-x-12 bg-[linear-gradient(90deg,transparent,rgba(226,29,47,0.85),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-[220%]" />
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Popular Courses */}
        <motion.div variants={colVariants}>
          <h4 className="font-heading font-semibold text-sm mb-5 uppercase tracking-widest text-primary-foreground/90 flex items-center gap-2">
            <span className="inline-block w-5 h-px bg-primary" />
            Courses
          </h4>
          <div className="flex flex-col gap-2">
            {popularCourses.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
              >
                <Link
                  to="/courses"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="group relative inline-flex items-center gap-2 py-1 text-sm text-primary-foreground/75 hover:text-primary transition-colors duration-300"
                >
                  <ArrowRight
                    size={12}
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary"
                  />
                  <span className="relative">
                    {c}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px overflow-hidden">
                      <span className="block h-full w-10 -translate-x-12 bg-[linear-gradient(90deg,transparent,rgba(226,29,47,0.85),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-[220%]" />
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Connect / Info column */}
        <motion.div variants={colVariants}>
          <h4 className="font-heading font-semibold text-sm mb-5 uppercase tracking-widest text-primary-foreground/90 flex items-center gap-2">
            <span className="inline-block w-5 h-px bg-primary" />
            Get In Touch
          </h4>
          <div className="flex flex-col gap-5">
            {[
              {
                Icon: MapPin,
                content: (
                  <span className="text-sm text-primary-foreground/75 leading-relaxed">
                    {settings.address}
                  </span>
                ),
              },
              {
                Icon: Phone,
                content: (
                  <div className="text-sm text-primary-foreground/75 flex flex-col gap-0.5">
                    <a href={`tel:${settings.phone1.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">{settings.phone1}</a>
                    <a href={`tel:${settings.phone2.replace(/\s/g, "")}`} className="hover:text-primary transition-colors">{settings.phone2}</a>
                  </div>
                ),
              },
              {
                Icon: Mail,
                content: (
                  <a href={`mailto:${settings.email}`} className="text-sm text-primary-foreground/75 hover:text-primary transition-colors break-all">
                    {settings.email}
                  </a>
                ),
              },
            ].map(({ Icon, content }, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 group"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="mt-0.5 w-8 h-8 shrink-0 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon size={14} className="text-primary" />
                </div>
                {content}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>

    {/* ── Divider + bottom bar ───────────────────────────────── */}
    <div className="relative z-10">
      <div className="h-px bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.08)_30%,rgba(226,29,47,0.4)_55%,rgba(255,255,255,0.08)_78%,transparent_100%)]" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="container-max px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <p className="text-xs text-primary-foreground/45">
          © {new Date().getFullYear()} {settings.instituteName}. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          {[settings.certifiedBadge1, settings.certifiedBadge2].map((badge, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full border border-primary/25 bg-primary/8 text-primary-foreground/55"
            >
              {badge}
            </span>
          ))}
        </div>
      </motion.div>
    </div>

  </footer>
  );
};

export default Footer;
