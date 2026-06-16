import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle, ArrowRight, MessageSquare } from "lucide-react";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";
import { siteData } from "@/lib/siteData";

const inputCls =
  "w-full h-12 px-4 rounded-xl border border-border bg-white text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const settings = siteData.getSettings();

  const infoCards = [
    {
      icon: MapPin,
      title: "Our Location",
      lines: [settings.address],
      href: `https://maps.google.com/?q=${encodeURIComponent(settings.address)}`,
      color: "from-rose-500/20 to-rose-700/10",
      glow: "rgba(226,29,47,0.18)",
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      lines: [settings.phone1, settings.phone2],
      href: `tel:${settings.phone1.replace(/\s/g, "")}`,
      color: "from-violet-500/20 to-violet-700/10",
      glow: "rgba(139,92,246,0.18)",
    },
    {
      icon: Mail,
      title: "Email Support",
      lines: [settings.email],
      href: `mailto:${settings.email}`,
      color: "from-sky-500/20 to-sky-700/10",
      glow: "rgba(14,165,233,0.18)",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Submit inquiry to the Admissions store (since enquiries are consolidated with admissions)
    siteData.addAdmission({
      name,
      phone,
      email,
      course: subject || "General Enquiry",
      city: "Website Contact Form",
      message: message,
    });

    setSubmitted(true);
    setName("");
    setPhone("");
    setEmail("");
    setSubject("");
    setMessage("");

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <PageBreadcrumbHero
        label="Contact Us"
        title="Contact"
        description="Get in touch with our team for course guidance, admissions support, and center enquiries."
      />

      {/* ── Info & Form Section ────────────────────────────────────── */}
      <section className="relative bg-background overflow-hidden py-16">
        {/* Soft background blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-primary/5 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 w-[340px] h-[340px] rounded-full bg-violet-400/5 blur-[70px]" />

        <div className="container-max px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
                  <MessageSquare size={13} /> Get In Touch
                </span>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
                  Reach Out to BIIT
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Have questions about our certification courses or eligibility? Reach out directly or drop us a message and our counselor will assist you.
                </p>
              </motion.div>

              <div className="space-y-4">
                {infoCards.map((card, i) => (
                  <motion.a
                    key={i}
                    href={card.href}
                    target={card.icon === MapPin ? "_blank" : undefined}
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="group relative flex items-start gap-4 p-6 rounded-2xl border border-border bg-white overflow-hidden shadow-sm"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                      style={{ background: `radial-gradient(circle at 10% 50%, ${card.glow}, transparent 70%)` }}
                    />
                    <div className={`relative w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${card.color} border border-white/60 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                      <card.icon size={20} className="text-primary" />
                    </div>
                    <div className="space-y-1 relative z-10 flex-1">
                      <h3 className="font-heading font-bold text-foreground text-sm tracking-wide uppercase text-muted-foreground">{card.title}</h3>
                      {card.lines.map((line, j) => (
                        <p key={j} className="text-sm text-foreground/80 leading-relaxed font-medium">{line}</p>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 relative rounded-2xl border border-border/60 bg-white overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
            >
              <div className="h-1.5 w-full bg-[linear-gradient(90deg,rgba(226,29,47,0.0),rgba(226,29,47,1),rgba(226,29,47,0.0))]" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16 px-8 min-h-[450px]"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-6"
                    >
                      <CheckCircle size={32} className="text-green-500" />
                    </motion.div>
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Message Submitted!</h3>
                    <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                      Thank you for contacting us. Your message has been saved in our Admissions dashboard. A counselor will get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 space-y-4"
                  >
                    <div>
                      <h3 className="font-heading text-xl font-bold text-foreground">Send a Message</h3>
                      <p className="text-xs text-muted-foreground mt-1">Fill this form to instantly forward your enquiry to the admin dashboard.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Full Name</label>
                        <input
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          className={inputCls}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Phone Number</label>
                        <input
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Contact Number"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className={inputCls}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Subject / Course of Interest</label>
                      <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. DCA Admission, Course Fees Query"
                        className={inputCls}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Your Message</label>
                      <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us how we can help you..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300 resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(226,29,47,0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full h-12 mt-2 rounded-xl bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/95 transition-all duration-300"
                    >
                      <Send size={15} /> Submit Message
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Embedded Map Section (At the down of the page) ────────────────────────── */}
      <section className="relative border-t border-border bg-slate-50 py-16">
        <div className="container-max px-4">
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Find Us on Google Maps</h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Visit our campus to talk directly to our counselors and experience our lab setup.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full rounded-2xl overflow-hidden shadow-md border border-border/80 bg-white"
            style={{ height: "450px" }}
          >
            <iframe
              src="https://maps.google.com/maps?q=Amalapada,%20Nimapada,%20Puri&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="BIIT Computer Education Location Map"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
