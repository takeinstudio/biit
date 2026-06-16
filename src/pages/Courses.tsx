import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, Clock, BookOpen, TrendingUp, Users, Award, Star,
  ChevronDown, CheckCircle, ArrowRight, Send, MessageCircle, Briefcase,
  GraduationCap, Target, Lightbulb, HelpCircle
} from "lucide-react";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";
import SectionHeading from "@/components/SectionHeading";
import { siteData } from "@/lib/siteData";
import type { Course } from "@/lib/siteData";

const CATEGORIES = [
  { key: "all", label: "All Courses" },
  { key: "diploma", label: "Diploma" },
  { key: "short-term", label: "Short-Term" },
  { key: "programming", label: "Programming" },
  { key: "accounting", label: "Accounting" },
  { key: "design", label: "Design" },
];

const LEVEL_COLORS = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-blue-100 text-blue-700",
  Advanced: "bg-purple-100 text-purple-700",
};

const placementStats = [
  { icon: Briefcase, value: "92%", label: "Placement Rate" },
  { icon: Users, value: "200+", label: "Hiring Companies" },
  { icon: TrendingUp, value: "3.5 LPA", label: "Avg. Starting Package" },
  { icon: Award, value: "98%", label: "Student Satisfaction" },
];

const guidanceSteps = [
  { icon: Target, title: "Choose Your Goal", desc: "Are you looking for a job, upskilling, or business tools? Define your objective first." },
  { icon: GraduationCap, title: "Pick Your Level", desc: "Beginner? Start with DCA or MS Office. Experienced? Dive into PGDCA or Programming." },
  { icon: Lightbulb, title: "Match Your Interest", desc: "Love numbers? Try Tally or DCA. Love tech? Web Design, Python, or Java is for you." },
  { icon: BookOpen, title: "Enroll & Learn", desc: "Fill the admission form, get counseling, and start your journey within 3 days." },
];

const faqs = [
  { q: "What documents are needed for admission?", a: "You need your 10th/12th marksheet, Aadhaar card, and 2 passport-size photos for admission." },
  { q: "Is there any EMI or installment option for fees?", a: "Yes, we offer flexible payment plans. You can pay fees in 2-3 installments. Contact us for details." },
  { q: "Will I get a certificate after the course?", a: "Yes, all students receive an ISO-certified certificate upon successful completion of the course and assessment." },
  { q: "Do you offer placement assistance?", a: "Absolutely! Our dedicated placement cell actively works to connect students with hiring companies. We have a 92% placement rate." },
  { q: "Can I enroll in multiple courses together?", a: "Yes, we have combo course packages available at discounted rates. Ask our counselors for recommendations." },
  { q: "What are the class timings?", a: "We offer morning, afternoon, and evening batches to accommodate working professionals and students." },
  { q: "Is the course available online or offline?", a: "Both options are available. You can choose from in-center learning or online live classes as per your preference." },
  { q: "How do I verify my certificate online?", a: "Visit the Verify Certificate page on our website and enter your certificate number to instantly verify its authenticity." },
];

const CourseCard = ({ course, onEnroll }: { course: Course; onEnroll: (name: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -8 }}
    className="group card-premium p-2 flex flex-col"
  >
    <div className="relative aspect-[16/9] overflow-hidden rounded-[18px] bg-slate-100 flex-shrink-0">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
      />
      {/* Duration badge */}
      <div className="absolute top-3 left-3 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-foreground flex items-center gap-1">
        <Clock size={12} /> {course.duration}
      </div>
      {/* Category badge */}
      <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white capitalize">
        {course.category.replace("-", " ")}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
    <div className="p-4 flex flex-col flex-1">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-foreground font-heading">{course.title}</h3>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${LEVEL_COLORS[course.level]}`}>
          {course.level}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed flex-1">{course.desc}</p>
      {/* Highlights */}
      <div className="flex flex-wrap gap-1 mb-4">
        {course.highlights.slice(0, 3).map((h) => (
          <span key={h} className="text-[10px] bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">{h}</span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
        <span className="text-accent font-bold tabular-nums text-sm">₹{course.fee}</span>
        <button
          onClick={() => onEnroll(course.title)}
          className="text-xs font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all hover:text-accent"
        >
          Enroll Now <ArrowRight size={14} />
        </button>
      </div>
    </div>
  </motion.div>
);

const EnrollModal = ({ courseName, onClose }: { courseName: string; onClose: () => void }) => {
  const [submitted, setSubmitted] = useState(false);
  const settings = siteData.getSettings();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    siteData.addAdmission({
      name: data.get("name") as string,
      phone: data.get("phone") as string,
      email: data.get("email") as string,
      course: courseName,
      city: data.get("city") as string,
      message: data.get("message") as string || "",
    });
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-2xl leading-none">&times;</button>
        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Application Submitted!</h3>
            <p className="text-sm text-muted-foreground">Our counselor will contact you within 24 hours for <strong>{courseName}</strong>.</p>
            <button onClick={onClose} className="mt-6 btn-primary text-sm px-6 py-2">Close</button>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Enrollment</span>
              <h3 className="text-xl font-bold text-foreground mt-1">Apply for <span className="text-primary">{courseName}</span></h3>
              <p className="text-sm text-muted-foreground mt-1">Fill this form and our team will contact you within 24 hours.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input name="name" required placeholder="Full Name" className="col-span-2 w-full px-4 py-2.5 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
                <input name="phone" required placeholder="Phone Number" className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
                <input name="city" required placeholder="City" className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
              </div>
              <input name="email" type="email" placeholder="Email Address (optional)" className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
              <textarea name="message" placeholder="Any question or message?" rows={2} className="w-full px-4 py-2.5 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none" />
              <div className="flex gap-3 pt-1">
                <button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#ff334a_0%,#e21d2f_72%,#b91025_100%)] px-4 py-2.5 font-semibold text-sm text-white shadow-[0_10px_24px_rgba(226,29,47,0.35)] transition-all hover:-translate-y-0.5">
                  <Send size={14} /> Submit Application
                </button>
                <a
                  href={`https://wa.me/${settings.whatsapp}?text=Hi, I want to enroll in ${encodeURIComponent(courseName)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-full font-semibold text-sm transition-all hover:bg-green-600"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

const Courses = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [enrollCourse, setEnrollCourse] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const allCourses = siteData.getCourses();

  const filtered = useMemo(() => {
    return allCourses.filter((c) => {
      const matchCat = activeCategory === "all" || c.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch = !q || c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [allCourses, activeCategory, search]);

  return (
    <>
      {/* SEO */}
      <title>Courses – BIIT Computer Education | PGDCA, DCA, Tally, Python, Java & More</title>

      <PageBreadcrumbHero
        label="Our Programs"
        title="Courses"
        description="Explore 12+ industry-focused computer courses at BIIT Computer Education. From Diploma programs to professional certifications — start your IT career today."
      />

      {/* ── Search & Filter Bar ── */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container-max px-4 sm:px-6 py-3 flex flex-col sm:flex-row gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses (e.g. Python, Tally, Web Design...)"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
            <Filter size={14} className="text-muted-foreground shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat.key
                    ? "bg-primary text-white shadow-[0_4px_12px_rgba(226,29,47,0.35)]"
                    : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses Grid ── */}
      <section className="section-padding bg-background">
        <div className="container-max">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <Search size={48} className="mx-auto text-muted-foreground/40 mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
              <p className="text-muted-foreground text-sm">Try a different search term or category.</p>
              <button onClick={() => { setSearch(""); setActiveCategory("all"); }} className="mt-4 btn-outline text-sm px-5 py-2">
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filtered.length}</span> courses
                  {activeCategory !== "all" && <span> in <span className="text-primary font-semibold capitalize">{activeCategory.replace("-", " ")}</span></span>}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star size={12} className="fill-amber-400 text-amber-400" /> 4.9 avg rating
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} onEnroll={setEnrollCourse} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Placement Section ── */}
      <section className="section-padding bg-[linear-gradient(170deg,#f8f9fd_0%,#f3f4f9_48%,#eef1f7_100%)]">
        <div className="container-max">
          <SectionHeading
            label="Our Track Record"
            title="Placement & Career Outcomes"
            description="BIIT Computer Education's dedicated placement cell connects graduates with leading companies across the region."
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {placementStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 text-center backdrop-blur-xl shadow-[0_14px_38px_rgba(15,23,42,0.10)]"
              >
                <span className="absolute inset-x-0 top-0 h-[2px] scale-x-0 bg-[linear-gradient(90deg,transparent,rgba(226,29,47,0.9),transparent)] transition-transform duration-500 origin-left group-hover:scale-x-100" />
                <div className="w-12 h-12 rounded-xl bg-primary/12 border border-primary/20 flex items-center justify-center mx-auto mb-3 transition-all duration-500 group-hover:bg-primary group-hover:border-primary">
                  <stat.icon size={22} className="text-primary transition-colors duration-500 group-hover:text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          {/* Hiring companies marquee */}
          <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 backdrop-blur-xl p-6 shadow-[0_14px_38px_rgba(15,23,42,0.08)]">
            <p className="text-center text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-widest">Students Placed At</p>
            <div className="flex gap-6 overflow-x-auto pb-2 justify-center flex-wrap">
              {["Infosys Partner", "TCS", "Wipro", "Tech Mahindra", "Accenture", "HCL", "HDFC Bank", "ICICI Bank", "State Bank", "Government Offices", "Local IT Firms", "CA Firms"].map((company) => (
                <span key={company} className="shrink-0 px-4 py-2 rounded-lg bg-slate-100 text-xs font-semibold text-slate-600">{company}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Student Guidance Section ── */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <SectionHeading
            label="Which Course Is Right For You?"
            title="Our 4-Step Student Guidance"
            description="Not sure which course to pick? Follow this simple guide to find the perfect program for your goals and background."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guidanceSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/55 p-6 backdrop-blur-xl shadow-[0_14px_38px_rgba(15,23,42,0.10)]"
              >
                <span className="absolute inset-x-0 top-0 h-[2px] scale-x-0 bg-[linear-gradient(90deg,transparent,rgba(226,29,47,0.9),transparent)] transition-transform duration-500 origin-left group-hover:scale-x-100" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/12 border border-primary/20 flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:border-primary">
                    <step.icon size={18} className="text-primary transition-colors duration-500 group-hover:text-white" />
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-primary/20 transition-colors duration-500">0{i + 1}</span>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Admission Form Section ── */}
      <section id="admission-form" className="section-padding section-muted">
        <div className="container-max max-w-2xl">
          <SectionHeading
            label="Get Started"
            title="Apply for Admission"
            description="Fill in the form and our counselor will reach out to you within 24 hours to guide you through the process."
          />
          <AdmissionFormSection />
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="section-padding bg-background">
        <div className="container-max max-w-3xl">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            description="Everything you need to know about courses, admission, fees, and placement at BIIT Computer Education."
          />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group card-premium overflow-hidden border border-slate-200/80 bg-white transition-all duration-300 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle size={16} className="text-primary shrink-0 mt-0.5" />
                    <span className="font-heading font-semibold text-sm text-foreground">{faq.q}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-primary shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-slate-100 pt-3 pl-12">
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enroll Modal */}
      <AnimatePresence>
        {enrollCourse && (
          <EnrollModal courseName={enrollCourse} onClose={() => setEnrollCourse(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

// Admission form as a separate component
const AdmissionFormSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const settings = siteData.getSettings();
  const courses = siteData.getCourses();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    siteData.addAdmission({
      name: data.get("name") as string,
      phone: data.get("phone") as string,
      email: data.get("email") as string,
      course: data.get("course") as string,
      city: data.get("city") as string,
      message: data.get("message") as string || "",
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-premium p-12 text-center">
        <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
        <h3 className="heading-md text-foreground">Application Submitted!</h3>
        <p className="text-body mt-2">Our counselor will contact you within 24 hours to discuss your admission.</p>
        <button onClick={() => setSubmitted(false)} className="mt-6 btn-outline text-sm px-5 py-2">Submit Another</button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-premium border border-slate-200/80 bg-white p-8 space-y-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="name" required placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
        <input name="phone" required placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
      </div>
      <input name="email" type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select name="course" required className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all">
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.id} value={c.title}>{c.title}</option>
          ))}
        </select>
        <input name="city" required placeholder="Your City" className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
      </div>
      <textarea name="message" placeholder="Any specific questions or requirements?" rows={3} className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none" />
      <div className="flex gap-3 pt-2">
        <button type="submit" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#ff334a_0%,#e21d2f_72%,#b91025_100%)] px-6 py-3 font-semibold text-sm text-white shadow-[0_14px_30px_rgba(226,29,47,0.38)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_38px_rgba(226,29,47,0.52)]">
          <Send size={16} /> Submit Application
        </button>
        <a href={`https://wa.me/${settings.whatsapp}?text=Hi, I want to inquire about courses at BIIT Computer Education`} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all hover:bg-green-600">
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>
    </form>
  );
};

export default Courses;
