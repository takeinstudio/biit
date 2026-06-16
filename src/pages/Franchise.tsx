import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, TrendingUp, Users, HeadphonesIcon, BookOpen, BarChart3, DollarSign, Send, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import AnimatedCounter from "@/components/AnimatedCounter";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";
import { siteData } from "@/lib/siteData";

const benefits = [
  { icon: DollarSign, title: "Low Investment", desc: "Start your BIIT franchise center with minimal capital investment and maximum ROI." },
  { icon: TrendingUp, title: "High Revenue", desc: "Proven business model with attractive revenue sharing structure." },
  { icon: HeadphonesIcon, title: "Complete Support", desc: "End-to-end support including setup, marketing, and operations guidance." },
  { icon: Users, title: "Faculty Training", desc: "We train your faculty to deliver courses at BIIT quality standards." },
  { icon: BarChart3, title: "Marketing Support", desc: "Branding, digital marketing materials, and lead generation tools." },
  { icon: BookOpen, title: "Curriculum Provided", desc: "Updated course material and examination system included." },
];

const faqs = [
  { q: "What is the investment required?", a: "The BIIT franchise investment varies depending on the city tier and center size. Our team will share a detailed investment structure during the initial consultation." },
  { q: "What support does BIIT provide?", a: "We provide complete support including faculty training, curriculum, marketing materials, IT infrastructure guidance, and ongoing operational support." },
  { q: "How long does it take to set up?", a: "A typical BIIT franchise center can be operational within 30-45 days of agreement signing." },
  { q: "What is the revenue model?", a: "Revenue is generated through course fees, certifications, and placement services. Average ROI is typically achieved within 8-12 months." },
];

const Franchise = () => {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <PageBreadcrumbHero
        label="Franchise Opportunity"
        title="Franchise"
        description="Start your own BIIT Computer Education center with low investment, high returns, and complete operational support."
      />

      <section className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 lg:pb-12 bg-background">
        <div className="container-max">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center rounded-[28px] border border-slate-200/80 bg-white/80 px-6 py-8 shadow-[0_18px_48px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-10">
            <h2 className="heading-lg text-foreground mb-4">Start Your Own BIIT Computer Education Franchise</h2>
            <p className="text-body mb-6">Join India&apos;s fastest-growing computer education franchise network with a proven model and complete guidance.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#franchise-form" className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#ff334a_0%,#e21d2f_72%,#b91025_100%)] px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(226,29,47,0.38)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_38px_rgba(226,29,47,0.52)]">Apply For Franchise <ArrowRight size={16} /></a>
              <button className="inline-flex items-center rounded-full border border-slate-300 bg-white/70 px-7 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary hover:shadow-[0_14px_30px_rgba(15,23,42,0.1)]">Download Brochure</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20 lg:pb-24 bg-background">
        <div className="container-max">
          <div className="rounded-[32px] bg-[linear-gradient(145deg,rgba(255,255,255,0.97)_0%,rgba(241,245,249,0.9)_100%)] p-[1px] shadow-[0_24px_70px_rgba(15,23,42,0.12)]">
            <div className="bg-card rounded-[31px] grid grid-cols-2 lg:grid-cols-4 divide-x divide-border overflow-hidden">
              <div className="transition-colors duration-300 hover:bg-primary/5"><AnimatedCounter end={150} label="Active Centers" /></div>
              <div className="transition-colors duration-300 hover:bg-primary/5"><AnimatedCounter end={20} label="States Covered" /></div>
              <div className="transition-colors duration-300 hover:bg-primary/5"><AnimatedCounter end={94} suffix="%" label="Partner Satisfaction" /></div>
              <div className="transition-colors duration-300 hover:bg-primary/5"><AnimatedCounter end={12} label="Months Avg ROI" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding section-muted">
        <div className="container-max">
          <SectionHeading label="Benefits" title="Why Partner With BIIT?" description="A proven education franchise model with comprehensive support at every step." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -8 }} className="group card-premium relative overflow-hidden border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:shadow-[0_24px_50px_rgba(15,23,42,0.12)]">
                <div className="absolute inset-x-5 top-0 h-px overflow-hidden bg-slate-200/70">
                  <div className="h-full w-14 -translate-x-16 bg-[linear-gradient(90deg,transparent_0%,rgba(226,29,47,0.2)_20%,rgba(226,29,47,0.92)_50%,rgba(226,29,47,0.2)_80%,transparent_100%)] transition-transform duration-700 group-hover:translate-x-[260px]" />
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(226,29,47,0.08),transparent_30%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/15">
                  <b.icon size={22} className="text-primary" />
                </div>
                <h3 className="relative font-heading font-semibold text-foreground mb-2 text-lg">{b.title}</h3>
                <p className="relative text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-max max-w-3xl">
          <SectionHeading label="FAQ" title="Frequently Asked Questions" />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="group card-premium overflow-hidden border border-slate-200/80 bg-white transition-all duration-300 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)]">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-5 text-left flex items-center justify-between">
                  <span className="font-heading font-semibold text-sm text-foreground">{faq.q}</span>
                  <span className={`text-primary text-xl leading-none transition-all duration-300 ${openFaq === i ? "rotate-45 scale-110" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-5 pb-5 border-t border-slate-100">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="franchise-form" className="section-padding section-muted">
        <div className="container-max max-w-2xl">
          <SectionHeading label="Get Started" title="Apply For Franchise" description="Fill in the form below and our team will reach out to you within 24 hours." />
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-premium p-12 text-center">
              <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
              <h3 className="heading-md text-foreground">Application Submitted!</h3>
              <p className="text-body mt-2">Our franchise team will contact you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="card-premium border border-slate-200/80 bg-white p-8 space-y-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all" />
                <input required placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all" />
              </div>
              <input type="email" required placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required placeholder="City" className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all" />
                <input required placeholder="State" className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all" />
              </div>
              <input placeholder="Investment Budget (₹)" className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all" />
              <textarea placeholder="Tell us about yourself" rows={4} className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all resize-none" />
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#ff334a_0%,#e21d2f_72%,#b91025_100%)] px-6 py-3 font-semibold text-sm text-white shadow-[0_14px_30px_rgba(226,29,47,0.38)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_38px_rgba(226,29,47,0.52)]">
                  <Send size={16} /> Submit Application
                </button>
                <a href={`https://wa.me/${siteData.getSettings().whatsapp}?text=Hi, I'm interested in BIIT Computer Education franchise opportunity`} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-1 hover:bg-green-600 hover:shadow-[0_18px_36px_rgba(34,197,94,0.35)]">
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Franchise;
