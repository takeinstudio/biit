// ─────────────────────────────────────────────────────────────────────────────
// BIIT Computer Education – Central Site Data Store
// Admin panel writes to localStorage; live site reads from here with defaults.
// ─────────────────────────────────────────────────────────────────────────────

export interface Course {
  id: string;
  title: string;
  category: "diploma" | "short-term" | "programming" | "accounting" | "design";
  duration: string;
  fee: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  desc: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  review: string;
  rating: number;
  placement?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export interface Admission {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  city: string;
  message: string;
  status: "Pending" | "Confirmed" | "Rejected";
  date: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: "New" | "Read" | "Replied";
  date: string;
}

export interface PlacementRecord {
  id: string;
  studentName: string;
  course: string;
  company: string;
  role: string;
  package: string;
  year: string;
}

export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  dateOfAdmission: string;
  status: "Active" | "Completed" | "Dropped";
}

export interface PaymentRecord {
  id: string;
  studentName: string;
  rollNumber: string;
  email: string;
  phone: string;
  course: string;
  amount: number;
  paymentMode: "UPI Scanner" | "Cash" | "Net Banking";
  transactionId?: string;
  screenshot?: string;
  status: "Pending" | "Approved" | "Rejected";
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  published: boolean;
}

export interface SiteSettings {
  instituteName: string;
  tagline: string;
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  established: string;
  heroTitle: string;
  heroSubtitle: string;
  totalStudents: number;
  totalCenters: number;
  totalTeachers: number;
  totalClasses: number;
  placementRate: number;
  aboutShort: string;
  certifiedBadge1: string;
  certifiedBadge2: string;
}

// ── DEFAULT DATA ──────────────────────────────────────────────────────────────

export const DEFAULT_SETTINGS: SiteSettings = {
  instituteName: "BIIT Computer Education",
  tagline: "Empowering Careers Through Technology",
  address: "At Amalapada, Nimapada, Puri (Near Venkateswar School)",
  phone1: "+91 9778039019",
  phone2: "+91 8018556484",
  email: "info@biiteducation.com",
  whatsapp: "919778039019",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com",
  youtube: "https://youtube.com",
  established: "2015",
  heroTitle: "Build Your Future with BIIT Computer Education",
  heroSubtitle: "Industry-focused IT training and certification programs designed for tomorrow's technology professionals.",
  totalStudents: 15000,
  totalCenters: 50,
  totalTeachers: 200,
  totalClasses: 80000,
  placementRate: 92,
  aboutShort: "BIIT Computer Education has been shaping practical technology careers with an approach rooted in clarity, confidence, and execution. We train learners to perform in classrooms, labs, interviews, and real work environments.",
  certifiedBadge1: "ISO 9001 Certified",
  certifiedBadge2: "Govt. Recognized",
};

export const DEFAULT_COURSES: Course[] = [
  {
    id: "dca",
    title: "DCA",
    category: "diploma",
    duration: "6 Months",
    fee: "8,000",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    desc: "Diploma in Computer Applications — a complete foundational program covering computer basics, MS Office, internet skills, and essential software tools.",
    highlights: ["Computer Fundamentals", "MS Office Suite", "Internet & Email", "Basic Programming"],
  },
  {
    id: "pgdca",
    title: "PGDCA",
    category: "diploma",
    duration: "12 Months",
    fee: "15,000",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=600&q=80",
    desc: "Post Graduate Diploma in Computer Applications — an advanced program in computing, networking, database management, and software development for graduates.",
    highlights: ["Advanced Computing", "Networking Basics", "Database Management", "Project Work"],
  },
  {
    id: "tally-erp",
    title: "Tally ERP 9.0",
    category: "accounting",
    duration: "3 Months",
    fee: "5,000",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
    desc: "Master Tally ERP 9 — covering GST, inventory management, payroll processing, financial reporting, and complete accounting workflows used in every business.",
    highlights: ["GST Filing", "Inventory Management", "Payroll Processing", "Financial Reports"],
  },
  {
    id: "dtp",
    title: "DTP",
    category: "design",
    duration: "3 Months",
    fee: "4,500",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
    desc: "Desktop Publishing (DTP) — learn CorelDRAW, Photoshop, PageMaker, and InDesign to create professional print and digital design layouts.",
    highlights: ["CorelDRAW", "Adobe Photoshop", "PageMaker", "Print Design"],
  },
  {
    id: "c-level",
    title: "C (Level)",
    category: "programming",
    duration: "6 Months",
    fee: "6,000",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    desc: "Comprehensive C Level course covering programming fundamentals, structured programming, algorithms, and practical problem-solving skills.",
    highlights: ["C Programming Basics", "Algorithms", "Data Types", "Problem Solving"],
  },
  {
    id: "os-cit",
    title: "OS-CIT",
    category: "short-term",
    duration: "3 Months",
    fee: "3,500",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
    desc: "OS-CIT (Certificate in Information Technology) — covers operating systems, computer fundamentals, internet usage, and basic digital literacy skills.",
    highlights: ["Operating Systems", "Computer Basics", "Internet Skills", "Digital Literacy"],
  },
  {
    id: "c-programming",
    title: "C",
    category: "programming",
    duration: "2 Months",
    fee: "3,000",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80",
    desc: "C Programming from scratch — learn the foundational language of computing, covering syntax, control flow, functions, arrays, pointers, and file handling.",
    highlights: ["C Syntax", "Control Structures", "Functions & Arrays", "Pointers"],
  },
  {
    id: "cpp",
    title: "C++",
    category: "programming",
    duration: "3 Months",
    fee: "4,000",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80",
    desc: "C++ Object-Oriented Programming — build on C fundamentals with classes, inheritance, polymorphism, templates, and STL for advanced application development.",
    highlights: ["OOP Concepts", "Classes & Objects", "Inheritance", "STL"],
  },
  {
    id: "vb",
    title: "VB",
    category: "programming",
    duration: "3 Months",
    fee: "4,000",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    desc: "Visual Basic (VB) programming — learn event-driven programming, GUI application development, database connectivity, and Windows application building.",
    highlights: ["Event-Driven Programming", "GUI Design", "Database Connectivity", "Windows Apps"],
  },
  {
    id: "oracle",
    title: "Oracle",
    category: "programming",
    duration: "4 Months",
    fee: "8,000",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80",
    desc: "Oracle Database — learn SQL, PL/SQL, database design, stored procedures, triggers, and enterprise database management with Oracle.",
    highlights: ["SQL & PL/SQL", "Database Design", "Stored Procedures", "Triggers"],
  },
  {
    id: "java",
    title: "Java",
    category: "programming",
    duration: "6 Months",
    fee: "10,000",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    desc: "Java Programming — from Core Java fundamentals to OOP principles, JDBC, Servlets, and enterprise-level application development with real-world projects.",
    highlights: ["Core Java", "OOP Concepts", "JDBC & Servlets", "Project Work"],
  },
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Priya Sharma",
    course: "PGDCA",
    review: "BIIT Computer Education transformed my career. The placement support was incredible — I got placed within 2 months of completing my course.",
    rating: 5,
    placement: "Placed at TechSoft Pvt. Ltd.",
  },
  {
    id: "t2",
    name: "Rahul Patel",
    course: "Web Design & Development",
    review: "The practical approach to learning at BIIT is unmatched. I built real projects during the course that helped me land my first web developer job.",
    rating: 5,
    placement: "Hired as Junior Web Developer",
  },
  {
    id: "t3",
    name: "Sneha Mohanty",
    course: "Python Programming",
    review: "Best Python training in town. The faculty explains complex concepts in a very simple way. Highly recommended for anyone entering tech!",
    rating: 5,
    placement: "Joined as Python Developer",
  },
  {
    id: "t4",
    name: "Amit Das",
    course: "Java Programming",
    review: "The Java course covered everything from basics to Spring Boot. The live project experience was the best part of the BIIT program.",
    rating: 4,
    placement: "Working as Java Developer",
  },
  {
    id: "t5",
    name: "Ritu Singh",
    course: "Tally Prime",
    review: "I joined the Tally course after graduation and got placed in an accounting firm within weeks. Excellent faculty and curriculum at BIIT.",
    rating: 5,
    placement: "Accounts Executive at FinCorp",
  },
  {
    id: "t6",
    name: "Vikram Jena",
    course: "DCA",
    review: "BIIT's DCA program gave me a strong foundation in computers. The environment is very supportive and professional. Best decision I made!",
    rating: 5,
    placement: "Data Entry Operator",
  },
];

export const DEFAULT_GALLERY: GalleryImage[] = [
  { id: "g1", url: "/gallery/image.png", caption: "Computer Lab Session", category: "Infrastructure" },
  { id: "g2", url: "/gallery/image copy.png", caption: "Student Orientation Day", category: "Events" },
  { id: "g3", url: "/gallery/image copy 2.png", caption: "Practical Coding Session", category: "Training" },
  { id: "g4", url: "/gallery/image copy 3.png", caption: "Certification Ceremony", category: "Events" },
  { id: "g5", url: "/gallery/image copy 4.png", caption: "Smart Classroom Showcase", category: "Infrastructure" },
  { id: "g6", url: "/gallery/image copy 5.png", caption: "IT Skills Workshop", category: "Training" },
  { id: "g7", url: "/gallery/image copy 6.png", caption: "Programming Lab Work", category: "Infrastructure" },
  { id: "g8", url: "/gallery/image copy 7.png", caption: "Student Collaboration", category: "Training" },
  { id: "g9", url: "/gallery/image copy 8.png", caption: "Placement Support Drive", category: "Events" },
  { id: "g10", url: "/gallery/image copy 9.png", caption: "Full Stack Training Session", category: "Training" },
  { id: "g11", url: "/gallery/image copy 10.png", caption: "Career counseling Seminar", category: "Events" },
  { id: "g12", url: "/gallery/image copy 11.png", caption: "Advanced Database Management Lab", category: "Infrastructure" },
  { id: "g13", url: "/gallery/image copy 12.png", caption: "Computer Hardware Lab Session", category: "Training" },
  { id: "g14", url: "/gallery/image copy 13.png", caption: "Soft Skills Development Class", category: "Training" },
  { id: "g15", url: "/gallery/image copy 14.png", caption: "BIIT Annual Celebration", category: "Events" },
  { id: "g16", url: "/gallery/image copy 15.png", caption: "BIIT Faculty Meeting", category: "Infrastructure" },
];

export const DEFAULT_PLACEMENTS: PlacementRecord[] = [
  { id: "p1", studentName: "Arjun Kumar", course: "Web Design", company: "WebTech Solutions", role: "Frontend Developer", package: "3.5 LPA", year: "2024" },
  { id: "p2", studentName: "Meera Devi", course: "Python Programming", company: "DataCore Analytics", role: "Python Developer", package: "4 LPA", year: "2024" },
  { id: "p3", studentName: "Suresh Nair", course: "Java Programming", company: "InfoSys Partner", role: "Java Developer", package: "4.5 LPA", year: "2024" },
  { id: "p4", studentName: "Anjali Verma", course: "Tally Prime", company: "FinServe Pvt Ltd", role: "Accounts Executive", package: "2.8 LPA", year: "2024" },
  { id: "p5", studentName: "Rohit Sahu", course: "PGDCA", company: "TechMinds Corp", role: "System Administrator", package: "3.2 LPA", year: "2024" },
  { id: "p6", studentName: "Pooja Mishra", course: "Digital Marketing", company: "Brand Studio", role: "Digital Marketer", package: "3 LPA", year: "2024" },
];

export const DEFAULT_STUDENTS: Student[] = [
  { id: "s1", rollNumber: "BIIT-2024-001", name: "Anish Mohapatra", email: "anish@example.com", phone: "9876543210", course: "PGDCA", dateOfAdmission: "2024-01-15", status: "Active" },
  { id: "s2", rollNumber: "BIIT-2024-002", name: "Sunita Das", email: "sunita@example.com", phone: "8765432109", course: "DCA", dateOfAdmission: "2024-02-10", status: "Active" },
  { id: "s3", rollNumber: "BIIT-2023-089", name: "Ranjan Kumar", email: "ranjan@example.com", phone: "7654321098", course: "Tally ERP 9.0", dateOfAdmission: "2023-11-01", status: "Completed" },
];

export const DEFAULT_PAYMENTS_SEED: PaymentRecord[] = [
  { id: "pay1", studentName: "Anish Mohapatra", rollNumber: "BIIT-2024-001", email: "anish@example.com", phone: "9876543210", course: "PGDCA", amount: 2500, paymentMode: "UPI Scanner", transactionId: "UTR403910283", status: "Approved", date: "2024-06-10" },
  { id: "pay2", studentName: "Sunita Das", rollNumber: "BIIT-2024-002", email: "sunita@example.com", phone: "8765432109", course: "DCA", amount: 1500, paymentMode: "Cash", status: "Approved", date: "2024-06-12" },
  { id: "pay3", studentName: "Ranjan Kumar", rollNumber: "BIIT-2023-089", email: "ranjan@example.com", phone: "7654321098", course: "Tally ERP 9.0", amount: 2000, paymentMode: "UPI Scanner", transactionId: "UTR403988220", status: "Pending", date: "2024-06-15" }
];

// ── Version-based cache busting ───────────────────────────────────────────────
// Bump this whenever DEFAULT_COURSES changes so localStorage refreshes automatically.
const COURSES_VERSION = "v4-biit-images-fix";
const SETTINGS_VERSION = "v2-biit-nimapada-address";
const GALLERY_VERSION = "v2-user-gallery-images";
const PAYMENTS_VERSION = "v1-biit-payments";

function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(`biit_${key}`);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`biit_${key}`, JSON.stringify(value));
  } catch {
    console.error("Failed to save to localStorage");
  }
}

// If the courses/settings/gallery versions in storage don't match, reset to new defaults
function initCaches(): void {
  const storedCoursesVersion = localStorage.getItem("biit_courses_version");
  if (storedCoursesVersion !== COURSES_VERSION) {
    localStorage.removeItem("biit_courses");
    localStorage.setItem("biit_courses_version", COURSES_VERSION);
  }

  const storedSettingsVersion = localStorage.getItem("biit_settings_version");
  if (storedSettingsVersion !== SETTINGS_VERSION) {
    localStorage.removeItem("biit_settings");
    localStorage.setItem("biit_settings_version", SETTINGS_VERSION);
  }

  const storedGalleryVersion = localStorage.getItem("biit_gallery_version");
  if (storedGalleryVersion !== GALLERY_VERSION) {
    localStorage.removeItem("biit_gallery");
    localStorage.setItem("biit_gallery_version", GALLERY_VERSION);
  }

  const storedPaymentsVersion = localStorage.getItem("biit_payments_version");
  if (storedPaymentsVersion !== PAYMENTS_VERSION) {
    localStorage.removeItem("biit_payments");
    localStorage.setItem("biit_payments_version", PAYMENTS_VERSION);
  }
}
initCaches();

// ── PUBLIC API ────────────────────────────────────────────────────────────────

export const siteData = {
  // Settings
  getSettings: (): SiteSettings => getFromStorage("settings", DEFAULT_SETTINGS),
  saveSettings: (s: SiteSettings): void => { saveToStorage("settings", s); localStorage.setItem("biit_settings_version", SETTINGS_VERSION); },

  // Courses
  getCourses: (): Course[] => getFromStorage("courses", DEFAULT_COURSES),
  saveCourses: (c: Course[]): void => { saveToStorage("courses", c); localStorage.setItem("biit_courses_version", COURSES_VERSION); },

  // Testimonials
  getTestimonials: (): Testimonial[] => getFromStorage("testimonials", DEFAULT_TESTIMONIALS),
  saveTestimonials: (t: Testimonial[]): void => saveToStorage("testimonials", t),

  // Gallery
  getGallery: (): GalleryImage[] => getFromStorage("gallery", DEFAULT_GALLERY),
  saveGallery: (g: GalleryImage[]): void => { saveToStorage("gallery", g); localStorage.setItem("biit_gallery_version", GALLERY_VERSION); },

  // Admissions
  getAdmissions: (): Admission[] => getFromStorage("admissions", []),
  saveAdmissions: (a: Admission[]): void => saveToStorage("admissions", a),
  addAdmission: (a: Omit<Admission, "id" | "date" | "status">): void => {
    const admissions = siteData.getAdmissions();
    admissions.unshift({ ...a, id: Date.now().toString(), date: new Date().toISOString(), status: "Pending" });
    siteData.saveAdmissions(admissions);
  },

  // Enquiries
  getEnquiries: (): Enquiry[] => getFromStorage("enquiries", []),
  saveEnquiries: (e: Enquiry[]): void => saveToStorage("enquiries", e),
  addEnquiry: (e: Omit<Enquiry, "id" | "date" | "status">): void => {
    const enquiries = siteData.getEnquiries();
    enquiries.unshift({ ...e, id: Date.now().toString(), date: new Date().toISOString(), status: "New" });
    siteData.saveEnquiries(enquiries);
  },

  // Placements
  getPlacements: (): PlacementRecord[] => getFromStorage("placements", DEFAULT_PLACEMENTS),
  savePlacements: (p: PlacementRecord[]): void => saveToStorage("placements", p),

  // Students
  getStudents: (): Student[] => getFromStorage("students", DEFAULT_STUDENTS),
  saveStudents: (s: Student[]): void => saveToStorage("students", s),
  addStudent: (s: Omit<Student, "id">): void => {
    const students = siteData.getStudents();
    students.unshift({ ...s, id: Date.now().toString() });
    siteData.saveStudents(students);
  },

  // Blog
  getBlogPosts: (): BlogPost[] => getFromStorage("blog", []),
  saveBlogPosts: (b: BlogPost[]): void => saveToStorage("blog", b),

  // Payments
  getPayments: (): PaymentRecord[] => getFromStorage("payments", DEFAULT_PAYMENTS_SEED),
  savePayments: (p: PaymentRecord[]): void => { saveToStorage("payments", p); localStorage.setItem("biit_payments_version", PAYMENTS_VERSION); },
  addPayment: (p: Omit<PaymentRecord, "id" | "status" | "date"> & { date?: string }): void => {
    const payments = siteData.getPayments();
    payments.unshift({
      ...p,
      id: Date.now().toString(),
      status: "Pending",
      date: p.date || new Date().toISOString().split("T")[0]
    });
    siteData.savePayments(payments);
  },
  addAdminCashPayment: (p: Omit<PaymentRecord, "id" | "status" | "paymentMode" | "transactionId"> & { date: string }): void => {
    const payments = siteData.getPayments();
    payments.unshift({
      ...p,
      id: Date.now().toString(),
      paymentMode: "Cash",
      status: "Approved",
    });
    siteData.savePayments(payments);
  },

  // Admin Auth
  getAdminPasswordSet: (): boolean => localStorage.getItem("biit_admin_pwd_set") === "true",
  setAdminPasswordSet: (): void => localStorage.setItem("biit_admin_pwd_set", "true"),
  getAdminPassword: (): string => localStorage.getItem("biit_admin_pwd") || "admin123",
  setAdminPassword: (pwd: string): void => { localStorage.setItem("biit_admin_pwd", pwd); siteData.setAdminPasswordSet(); },
  isAdminLoggedIn: (): boolean => sessionStorage.getItem("biit_admin_session") === "true",
  loginAdmin: (): void => sessionStorage.setItem("biit_admin_session", "true"),
  logoutAdmin: (): void => sessionStorage.removeItem("biit_admin_session"),
};
