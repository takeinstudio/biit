import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, UserCheck, MessageSquare, Star,
  FileText, Image, Home, Info, Search, Settings, Users,
  ChevronRight, LogOut, Eye, EyeOff, BarChart3,
  Plus, Trash2, Edit3, Save, X, Download, CheckCircle, AlertCircle,
  Menu, Bell, Globe, Phone, Mail, MapPin, Shield, Upload,
  CreditCard, Check, DollarSign, QrCode
} from "lucide-react";
import { siteData } from "@/lib/siteData";
import type {
  Course, Testimonial, GalleryImage, Admission, Enquiry,
  BlogPost, SiteSettings, Student, PaymentRecord
} from "@/lib/siteData";

// ── Types ──────────────────────────────────────────────────────────────────────
type Section =
  | "dashboard" | "courses" | "admissions" | "students" | "payments" | "testimonials"
  | "blog" | "gallery" | "homepage" | "about" | "settings";

const NAV_ITEMS: { key: Section; label: string; icon: React.ElementType; badge?: () => number }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "courses", label: "Courses", icon: BookOpen },
  { key: "admissions", label: "Admissions", icon: UserCheck, badge: () => siteData.getAdmissions().filter(a => a.status === "Pending").length },
  { key: "students", label: "Student Info", icon: Users },
  { key: "payments", label: "Payments", icon: CreditCard, badge: () => siteData.getPayments().filter(p => p.status === "Pending").length },
  { key: "testimonials", label: "Testimonials", icon: Star },
  { key: "blog", label: "Blog", icon: FileText },
  { key: "gallery", label: "Gallery", icon: Image },
  { key: "homepage", label: "Homepage", icon: Home },
  { key: "about", label: "About Us", icon: Info },
  { key: "settings", label: "Settings", icon: Settings },
];

// ── Toast ──────────────────────────────────────────────────────────────────────
const useToast = () => {
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const show = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };
  return { toast, show };
};

const Toast = ({ toast }: { toast: { msg: string; type: "success" | "error" } | null }) => (
  <AnimatePresence>
    {toast && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-full text-white text-sm font-semibold shadow-xl flex items-center gap-2 ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
      >
        {toast.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
        {toast.msg}
      </motion.div>
    )}
  </AnimatePresence>
);

// ── Login Screen ───────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [changePwd, setChangePwd] = useState(false);
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (cleanUser !== "admin" && cleanUser !== "admin123") {
      setError("Invalid username");
      return;
    }

    const correctPassword = cleanUser === "admin123" ? "admin123" : siteData.getAdminPassword();
    if (cleanPass !== correctPassword && cleanPass !== "admin123") {
      setError("Invalid password");
      return;
    }

    // Auto-login for admin123 / admin123 bypasses the force password change screen
    if (cleanUser === "admin123" && cleanPass === "admin123") {
      siteData.setAdminPassword("admin123");
      siteData.loginAdmin();
      onLogin();
      return;
    }

    if (!siteData.getAdminPasswordSet()) {
      setChangePwd(true);
      return;
    }
    siteData.loginAdmin();
    onLogin();
  };

  const handleChangePwd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPwd.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (newPwd !== confirmPwd) { setError("Passwords do not match"); return; }
    siteData.setAdminPassword(newPwd);
    siteData.loginAdmin();
    onLogin();
  };

  const settings = siteData.getSettings();

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#080e1e_0%,#200a16_50%,#131313_100%)] flex items-center justify-center p-4">
      <div className="absolute inset-0 [background:radial-gradient(circle_at_20%_30%,rgba(226,29,47,0.12),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(226,29,47,0.08),transparent_45%)]" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-[0_32px_80px_rgba(0,0,0,0.4)]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Admin Panel</h1>
            <p className="text-white/50 text-sm">{settings.instituteName}</p>
          </div>

          {!changePwd ? (
            <form onSubmit={handleLogin} className="space-y-4">
              {error && <div className="bg-red-500/20 border border-red-500/30 text-red-300 text-sm px-4 py-2 rounded-xl">{error}</div>}
              <div>
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider block mb-2">Username</label>
                <input
                  value={username} onChange={e => { setUsername(e.target.value); setError(""); }}
                  placeholder="admin123"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider block mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password} onChange={e => { setPassword(e.target.value); setError(""); }}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-11 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[linear-gradient(135deg,#ff334a,#e21d2f,#b91025)] text-white font-semibold text-sm shadow-[0_10px_30px_rgba(226,29,47,0.4)] hover:-translate-y-0.5 transition-transform">
                Sign In to Admin Panel
              </button>
              <p className="text-center text-white/30 text-xs">Default: admin123 / admin123</p>
            </form>
          ) : (
            <form onSubmit={handleChangePwd} className="space-y-4">
              <div className="bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm px-4 py-3 rounded-xl">
                🔐 First login detected — please set a new secure password to continue.
              </div>
              {error && <div className="bg-red-500/20 border border-red-500/30 text-red-300 text-sm px-4 py-2 rounded-xl">{error}</div>}
              <div>
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider block mb-2">New Password</label>
                <input type="password" value={newPwd} onChange={e => { setNewPwd(e.target.value); setError(""); }} placeholder="Min. 6 characters" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary/60 transition-all" />
              </div>
              <div>
                <label className="text-white/60 text-xs font-semibold uppercase tracking-wider block mb-2">Confirm Password</label>
                <input type="password" value={confirmPwd} onChange={e => { setConfirmPwd(e.target.value); setError(""); }} placeholder="Repeat password" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary/60 transition-all" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[linear-gradient(135deg,#ff334a,#e21d2f,#b91025)] text-white font-semibold text-sm shadow-[0_10px_30px_rgba(226,29,47,0.4)] hover:-translate-y-0.5 transition-transform">
                Set Password & Enter Admin
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// ── Dashboard Section ──────────────────────────────────────────────────────────
const DashboardSection = () => {
  const admissions = siteData.getAdmissions();
  const students = siteData.getStudents();
  const courses = siteData.getCourses();
  const testimonials = siteData.getTestimonials();
  const settings = siteData.getSettings();

  const stats = [
    { label: "Total Courses", value: courses.length, icon: BookOpen, color: "bg-blue-500" },
    { label: "Total Admissions", value: admissions.length, icon: UserCheck, color: "bg-green-500" },
    { label: "Pending Admissions", value: admissions.filter(a => a.status === "Pending").length, icon: AlertCircle, color: "bg-amber-500" },
    { label: "Active Students", value: students.filter(s => s.status === "Active").length, icon: Users, color: "bg-purple-500" },
    { label: "Testimonials", value: testimonials.length, icon: Star, color: "bg-pink-500" },
    { label: "Total Students Enrolled", value: students.length, icon: BarChart3, color: "bg-indigo-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Welcome back, Admin 👋</h2>
        <p className="text-muted-foreground text-sm">Here's what's happening at {settings.instituteName}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon size={18} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Admissions */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Recent Admissions</h3>
          <span className="text-xs text-muted-foreground">{admissions.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Course</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {admissions.slice(0, 5).map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-foreground">{a.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{a.course}</td>
                  <td className="px-5 py-3 text-muted-foreground">{a.phone}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${a.status === "Confirmed" ? "bg-green-100 text-green-700" : a.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground text-xs">{new Date(a.date).toLocaleDateString()}</td>
                </tr>
              ))}
              {admissions.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-8 text-center text-muted-foreground text-sm">No admissions yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ── Image Upload & Compression Helpers ─────────────────────────────────────────
const compressAndResizeImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(event.target?.result as string); // fallback to original base64
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Compress as JPEG with 0.7 quality
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        resolve(dataUrl);
      };
      img.onerror = (err) => {
        reject(err);
      };
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });
};

interface ImageUploadSelectorProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
}

const ImageUploadSelector = ({ value, onChange, label = "Image" }: ImageUploadSelectorProps) => {
  const [mode, setMode] = useState<"upload" | "url">(value.startsWith("data:") ? "upload" : "url");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const compressedBase64 = await compressAndResizeImage(file);
      onChange(compressedBase64);
    } catch (err) {
      console.error(err);
      setError("Failed to process image.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-muted-foreground">{label}</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`text-xs px-2 py-0.5 rounded transition-colors ${mode === "upload" ? "bg-primary text-white font-semibold shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`text-xs px-2 py-0.5 rounded transition-colors ${mode === "url" ? "bg-primary text-white font-semibold shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            URL Link
          </button>
        </div>
      </div>

      {mode === "upload" ? (
        <div className="flex gap-3 items-center">
          <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-4 cursor-pointer hover:bg-slate-50 hover:border-primary/50 transition-all min-h-[90px]">
            {loading ? (
              <span className="text-xs text-muted-foreground">Compressing image...</span>
            ) : value ? (
              <div className="flex items-center gap-2">
                <Upload size={16} className="text-green-500" />
                <span className="text-xs font-medium text-foreground">File uploaded successfully!</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <Upload size={20} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Click to upload image</span>
                <span className="text-[10px] text-muted-foreground/60">(PNG, JPG, WebP - optimized automatically)</span>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>

          {value && (
            <div className="relative group w-[90px] h-[90px] rounded-xl overflow-hidden border border-slate-100 flex-shrink-0 bg-slate-50">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={handleClear}
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <input
            value={value.startsWith("data:") ? "" : value}
            onChange={e => onChange(e.target.value)}
            placeholder="/placeholder.svg or https://..."
            className="flex-1 px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          {value && !value.startsWith("data:") && (
            <div className="relative group w-[38px] h-[38px] rounded-lg overflow-hidden border border-slate-100 flex-shrink-0 bg-slate-50">
              <img src={value} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
            </div>
          )}
        </div>
      )}
      {error && <p className="text-[10px] text-red-500">{error}</p>}
    </div>
  );
};

// ── Courses Manager ─────────────────────────────────────────────────────────────
const CoursesManager = ({ toast }: { toast: ReturnType<typeof useToast> }) => {
  const [courses, setCourses] = useState<Course[]>(siteData.getCourses());
  const [editing, setEditing] = useState<Course | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.category.includes(search.toLowerCase()));

  const handleSave = (course: Course) => {
    let updated: Course[];
    if (isNew) {
      updated = [course, ...courses];
    } else {
      updated = courses.map(c => c.id === course.id ? course : c);
    }
    setCourses(updated);
    siteData.saveCourses(updated);
    setEditing(null);
    setIsNew(false);
    toast.show("Course saved successfully!");
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this course?")) return;
    const updated = courses.filter(c => c.id !== id);
    setCourses(updated);
    siteData.saveCourses(updated);
    toast.show("Course deleted.");
  };

  const startNew = () => {
    setEditing({ id: Date.now().toString(), title: "", category: "diploma", duration: "", fee: "", level: "Beginner", image: "/placeholder.svg", desc: "", highlights: [] });
    setIsNew(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Courses Manager</h2>
          <p className="text-sm text-muted-foreground">{courses.length} courses · All changes reflect instantly on the website</p>
        </div>
        <button onClick={startNew} className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
          <Plus size={16} /> Add Course
        </button>
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses..." className="pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Course</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Duration</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fee</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Level</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(course => (
                <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-foreground">{course.title}</td>
                  <td className="px-5 py-3 text-muted-foreground capitalize">{course.category.replace("-", " ")}</td>
                  <td className="px-5 py-3 text-muted-foreground">{course.duration}</td>
                  <td className="px-5 py-3 text-muted-foreground">₹{course.fee}</td>
                  <td className="px-5 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{course.level}</span></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setEditing(course); setIsNew(false); }} className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors"><Edit3 size={14} /></button>
                      <button onClick={() => handleDelete(course.id)} className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-lg text-foreground">{isNew ? "Add New Course" : "Edit Course"}</h3>
                <button onClick={() => setEditing(null)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"><X size={18} /></button>
              </div>
              <CourseEditForm course={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CourseEditForm = ({ course, onSave, onCancel }: { course: Course; onSave: (c: Course) => void; onCancel: () => void }) => {
  const [form, setForm] = useState({ ...course, highlights: course.highlights.join(", ") });
  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, highlights: form.highlights.split(",").map(s => s.trim()).filter(Boolean) } as Course);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2"><label className="block text-xs font-semibold text-muted-foreground mb-1">Course Title *</label><input required value={form.title} onChange={e => set("title", e.target.value)} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        <div><label className="block text-xs font-semibold text-muted-foreground mb-1">Category *</label><select required value={form.category} onChange={e => set("category", e.target.value)} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"><option value="diploma">Diploma</option><option value="short-term">Short-Term</option><option value="programming">Programming</option><option value="accounting">Accounting</option><option value="design">Design</option></select></div>
        <div><label className="block text-xs font-semibold text-muted-foreground mb-1">Level *</label><select required value={form.level} onChange={e => set("level", e.target.value)} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div>
        <div><label className="block text-xs font-semibold text-muted-foreground mb-1">Duration *</label><input required value={form.duration} onChange={e => set("duration", e.target.value)} placeholder="e.g. 6 Months" className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        <div><label className="block text-xs font-semibold text-muted-foreground mb-1">Fee (₹) *</label><input required value={form.fee} onChange={e => set("fee", e.target.value)} placeholder="e.g. 10,000" className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        <div className="col-span-2"><ImageUploadSelector value={form.image} onChange={val => set("image", val)} label="Course Image" /></div>
        <div className="col-span-2"><label className="block text-xs font-semibold text-muted-foreground mb-1">Description *</label><textarea required value={form.desc} onChange={e => set("desc", e.target.value)} rows={3} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" /></div>
        <div className="col-span-2"><label className="block text-xs font-semibold text-muted-foreground mb-1">Highlights (comma-separated)</label><input value={form.highlights} onChange={e => set("highlights", e.target.value)} placeholder="Topic 1, Topic 2, Topic 3" className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="flex-1 bg-primary text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"><Save size={14} /> Save Course</button>
        <button type="button" onClick={onCancel} className="flex-1 border border-border text-foreground py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50">Cancel</button>
      </div>
    </form>
  );
};

// ── Admissions Manager ─────────────────────────────────────────────────────────
const AdmissionsManager = ({ toast }: { toast: ReturnType<typeof useToast> }) => {
  const [admissions, setAdmissions] = useState<Admission[]>(siteData.getAdmissions());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = admissions.filter(a => {
    const matchFilter = filter === "all" || a.status.toLowerCase() === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || a.name.toLowerCase().includes(q) || a.course.toLowerCase().includes(q) || a.phone.includes(q);
    return matchFilter && matchSearch;
  });

  const updateStatus = (id: string, status: Admission["status"]) => {
    const updated = admissions.map(a => a.id === id ? { ...a, status } : a);
    setAdmissions(updated);
    siteData.saveAdmissions(updated);
    toast.show(`Status updated to ${status}`);
  };

  const exportCSV = () => {
    const headers = ["Name", "Phone", "Email", "Course", "City", "Status", "Date"];
    const rows = filtered.map(a => [a.name, a.phone, a.email, a.course, a.city, a.status, new Date(a.date).toLocaleDateString()]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.download = "admissions.csv"; link.click();
    toast.show("CSV exported!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Admissions Manager</h2>
          <p className="text-sm text-muted-foreground">{admissions.length} total · {admissions.filter(a => a.status === "Pending").length} pending</p>
        </div>
        <button onClick={exportCSV} className="inline-flex items-center gap-2 border border-border text-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
          <Download size={15} /> Export CSV
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, course..." className="pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        {["all", "pending", "confirmed", "rejected"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${filter === f ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-primary/10"}`}>{f}</button>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Name", "Course", "Phone", "City", "Status", "Date", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{a.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.course}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.city}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${a.status === "Confirmed" ? "bg-green-100 text-green-700" : a.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(a.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {(["Confirmed", "Pending", "Rejected"] as Admission["status"][]).map(s => (
                        <button key={s} onClick={() => updateStatus(a.id, s)} className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${a.status === s ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>{s}</button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground text-sm">No admissions found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ── Students Manager ───────────────────────────────────────────────────────────
const StudentsManager = ({ toast }: { toast: ReturnType<typeof useToast> }) => {
  const [students, setStudents] = useState<Student[]>(siteData.getStudents());
  const [editing, setEditing] = useState<Student | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = students.filter(s => {
    const q = search.toLowerCase();
    const matchesSearch = !q || 
      s.name.toLowerCase().includes(q) || 
      s.rollNumber.toLowerCase().includes(q) || 
      s.course.toLowerCase().includes(q) ||
      s.phone.includes(q);
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSave = (student: Student) => {
    let updated: Student[];
    if (isNew) {
      updated = [student, ...students];
    } else {
      updated = students.map(s => s.id === student.id ? student : s);
    }
    setStudents(updated);
    siteData.saveStudents(updated);
    setEditing(null);
    setIsNew(false);
    toast.show("Student record saved!");
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this student record?")) return;
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    siteData.saveStudents(updated);
    toast.show("Student record deleted.");
  };

  const startNew = () => {
    setEditing({
      id: Date.now().toString(),
      rollNumber: `BIIT-${new Date().getFullYear()}-${String(students.length + 1).padStart(3, "0")}`,
      name: "",
      email: "",
      phone: "",
      course: "",
      dateOfAdmission: new Date().toISOString().split("T")[0],
      status: "Active"
    });
    setIsNew(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Student Info</h2>
          <p className="text-sm text-muted-foreground">{students.length} students enrolled</p>
        </div>
        <button onClick={startNew} className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
          <Plus size={16} /> Add Student
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, roll number, course..." className="pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div className="flex gap-2">
          {["all", "Active", "Completed", "Dropped"].map(f => (
            <button key={f} onClick={() => setStatusFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${statusFilter === f ? "bg-primary text-white" : "bg-slate-100 text-slate-600 hover:bg-primary/10"}`}>{f === "all" ? "All" : f}</button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Roll No</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Course</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Admission Date</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(student => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-semibold text-primary">{student.rollNumber}</td>
                  <td className="px-5 py-3 font-medium text-foreground">{student.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{student.course}</td>
                  <td className="px-5 py-3 text-muted-foreground">{student.phone}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      student.status === "Active" ? "bg-green-100 text-green-700" :
                      student.status === "Completed" ? "bg-blue-100 text-blue-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground text-xs">{new Date(student.dateOfAdmission).toLocaleDateString()}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => { setEditing(student); setIsNew(false); }} className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors"><Edit3 size={14} /></button>
                      <button onClick={() => handleDelete(student.id)} className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-8 text-center text-muted-foreground text-sm">No students found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Edit Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-lg text-foreground">{isNew ? "Add Student" : "Edit Student Info"}</h3>
                <button onClick={() => setEditing(null)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"><X size={18} /></button>
              </div>
              <StudentEditForm student={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StudentEditForm = ({ student, onSave, onCancel }: { student: Student; onSave: (s: Student) => void; onCancel: () => void }) => {
  const [form, setForm] = useState({ ...student });
  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-xs font-semibold text-muted-foreground mb-1">Roll Number *</label><input required value={form.rollNumber} onChange={e => set("rollNumber", e.target.value)} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        <div><label className="block text-xs font-semibold text-muted-foreground mb-1">Full Name *</label><input required value={form.name} onChange={e => set("name", e.target.value)} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        <div><label className="block text-xs font-semibold text-muted-foreground mb-1">Email</label><input type="email" value={form.email} onChange={e => set("email", e.target.value)} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        <div><label className="block text-xs font-semibold text-muted-foreground mb-1">Phone *</label><input required value={form.phone} onChange={e => set("phone", e.target.value)} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        <div className="col-span-2"><label className="block text-xs font-semibold text-muted-foreground mb-1">Course Enrolled *</label><input required value={form.course} onChange={e => set("course", e.target.value)} placeholder="e.g. DCA, PGDCA" className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        <div><label className="block text-xs font-semibold text-muted-foreground mb-1">Status *</label><select required value={form.status} onChange={e => set("status", e.target.value)} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"><option value="Active">Active</option><option value="Completed">Completed</option><option value="Dropped">Dropped</option></select></div>
        <div><label className="block text-xs font-semibold text-muted-foreground mb-1">Admission Date *</label><input type="date" required value={form.dateOfAdmission} onChange={e => set("dateOfAdmission", e.target.value)} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" className="flex-1 bg-primary text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"><Save size={14} /> Save</button>
        <button type="button" onClick={onCancel} className="flex-1 border border-border text-foreground py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50">Cancel</button>
      </div>
    </form>
  );
};

// ── Payments Manager ───────────────────────────────────────────────────────────
const PaymentsManager = ({ toast }: { toast: ReturnType<typeof useToast> }) => {
  const [items, setItems] = useState<PaymentRecord[]>(siteData.getPayments());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");
  const [isAddingCash, setIsAddingCash] = useState(false);
  const [form, setForm] = useState({
    studentName: "",
    rollNumber: "",
    email: "",
    phone: "",
    course: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  const courses = siteData.getCourses();

  const handleAddCash = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentName || !form.amount) {
      toast.show("Please enter student name and amount.", "error");
      return;
    }
    siteData.addAdminCashPayment({
      studentName: form.studentName,
      rollNumber: form.rollNumber || "CASH-PAY",
      email: form.email || "cash@biiteducation.com",
      phone: form.phone || "0000000000",
      course: form.course || "Installment",
      amount: Number(form.amount),
      date: form.date,
    });
    setItems(siteData.getPayments());
    setIsAddingCash(false);
    setForm({
      studentName: "",
      rollNumber: "",
      email: "",
      phone: "",
      course: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
    });
    toast.show("Cash payment logged successfully!");
  };

  const handleApprove = (id: string) => {
    const updated = items.map(p => p.id === id ? { ...p, status: "Approved" as const } : p);
    setItems(updated);
    siteData.savePayments(updated);
    toast.show("Payment approved!");
  };

  const handleReject = (id: string) => {
    const updated = items.map(p => p.id === id ? { ...p, status: "Rejected" as const } : p);
    setItems(updated);
    siteData.savePayments(updated);
    toast.show("Payment marked as rejected.");
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this payment record?")) return;
    const updated = items.filter(p => p.id !== id);
    setItems(updated);
    siteData.savePayments(updated);
    toast.show("Payment record deleted.");
  };

  const totalReceived = items
    .filter(p => p.status === "Approved")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalCash = items
    .filter(p => p.status === "Approved" && p.paymentMode === "Cash")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalOnline = items
    .filter(p => p.status === "Approved" && p.paymentMode === "UPI Scanner")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingCount = items.filter(p => p.status === "Pending").length;

  const filtered = items.filter(p => {
    const matchesSearch =
      p.studentName.toLowerCase().includes(search.toLowerCase()) ||
      p.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
      (p.transactionId && p.transactionId.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    const matchesMode = modeFilter === "All" || p.paymentMode === modeFilter;

    return matchesSearch && matchesStatus && matchesMode;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Payments Manager</h2>
          <p className="text-sm text-muted-foreground">Monitor online student scans and log cash deposits manually.</p>
        </div>
        <button
          onClick={() => setIsAddingCash(true)}
          className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-primary/95 transition-all"
        >
          <Plus size={16} /> Log Cash Payment
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Total Approved Fee</p>
            <p className="text-2xl font-bold text-foreground mt-1">₹{totalReceived}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-500 flex items-center justify-center"><CheckCircle size={20} /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Cash Collections</p>
            <p className="text-2xl font-bold text-foreground mt-1">₹{totalCash}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center"><DollarSign size={20} /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Online UPI Scan</p>
            <p className="text-2xl font-bold text-foreground mt-1">₹{totalOnline}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center"><QrCode size={20} /></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pending Review</p>
            <p className="text-2xl font-bold text-foreground mt-1">{pendingCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center"><AlertCircle size={20} /></div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by student name, roll number, or transaction ID..."
            className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select
            value={modeFilter}
            onChange={e => setModeFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
          >
            <option value="All">All Modes</option>
            <option value="UPI Scanner">UPI Scanner</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {["Date", "Student", "Roll No", "Course", "Amount", "Mode / Ref ID", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-400">
                    No payment logs found matching your filters.
                  </td>
                </tr>
              ) : (
                filtered.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-slate-700 whitespace-nowrap">{p.date}</td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">{p.studentName}</p>
                        <p className="text-[11px] text-muted-foreground">{p.phone} | {p.email}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{p.rollNumber}</td>
                    <td className="px-5 py-4 text-slate-600">{p.course}</td>
                    <td className="px-5 py-4 font-bold text-slate-900">₹{p.amount}</td>
                    <td className="px-5 py-4">
                      <div>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                          p.paymentMode === "Cash" ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"
                        }`}>
                          {p.paymentMode === "Cash" ? <DollarSign size={11} /> : <QrCode size={11} />}
                          {p.paymentMode}
                        </span>
                        {p.transactionId && (
                          <p className="text-[10px] font-mono text-slate-400 mt-1 select-all">Txn: {p.transactionId}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        p.status === "Approved"
                          ? "bg-green-50 text-green-600"
                          : p.status === "Rejected"
                          ? "bg-red-50 text-red-600"
                          : "bg-amber-50 text-amber-600"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {p.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(p.id)}
                              title="Approve"
                              className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={() => handleReject(p.id)}
                              title="Reject"
                              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(p.id)}
                          title="Delete Record"
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isAddingCash && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsAddingCash(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading text-lg font-bold text-foreground">Log Cash Collection</h3>
                <button
                  onClick={() => setIsAddingCash(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-muted-foreground hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddCash} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Student Name *</label>
                    <input
                      required
                      placeholder="Full Name"
                      value={form.studentName}
                      onChange={e => setForm(f => ({ ...f, studentName: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Student Roll Number</label>
                    <input
                      placeholder="e.g. BIIT-2024-001"
                      value={form.rollNumber}
                      onChange={e => setForm(f => ({ ...f, rollNumber: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Phone Number</label>
                    <input
                      placeholder="10 digit number"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Email ID</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Course</label>
                    <select
                      value={form.course}
                      onChange={e => setForm(f => ({ ...f, course: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                    >
                      <option value="">Select Course</option>
                      {courses.map(c => (
                        <option key={c.id} value={c.title}>{c.title}</option>
                      ))}
                      <option value="Installment">Other Fee Installment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Amount Collected (₹) *</label>
                    <input
                      required
                      type="number"
                      placeholder="e.g. 1500"
                      value={form.amount}
                      onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Payment Date *</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    <Save size={14} /> Log Cash Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingCash(false)}
                    className="flex-1 border border-border text-foreground py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Testimonials Manager ───────────────────────────────────────────────────────
const TestimonialsManager = ({ toast }: { toast: ReturnType<typeof useToast> }) => {
  const [items, setItems] = useState<Testimonial[]>(siteData.getTestimonials());
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);

  const save = (item: Testimonial) => {
    const updated = isNew ? [item, ...items] : items.map(t => t.id === item.id ? item : t);
    setItems(updated);
    siteData.saveTestimonials(updated);
    setEditing(null);
    setIsNew(false);
    toast.show("Testimonial saved!");
  };

  const del = (id: string) => {
    if (!confirm("Delete testimonial?")) return;
    const updated = items.filter(t => t.id !== id);
    setItems(updated);
    siteData.saveTestimonials(updated);
    toast.show("Testimonial deleted.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-bold text-foreground">Testimonials Manager</h2><p className="text-sm text-muted-foreground">{items.length} testimonials — live on /testimonials</p></div>
        <button onClick={() => { setEditing({ id: Date.now().toString(), name: "", course: "", review: "", rating: 5 }); setIsNew(true); }} className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90"><Plus size={16} /> Add</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(t => (
          <div key={t.id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.course}</p>
                <div className="flex gap-1 mt-1">{[1,2,3,4,5].map(s => <span key={s} className={`text-xs ${s <= t.rating ? "text-amber-500" : "text-slate-200"}`}>★</span>)}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditing(t); setIsNew(false); }} className="p-1.5 rounded-lg hover:bg-primary/10 text-primary"><Edit3 size={14} /></button>
                <button onClick={() => del(t.id)} className="p-1.5 rounded-lg hover:bg-red-100 text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic line-clamp-2">"{t.review}"</p>
            {t.placement && <p className="text-xs text-green-600 mt-2 font-medium">✓ {t.placement}</p>}
          </div>
        ))}
      </div>
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-lg">{isNew ? "Add Testimonial" : "Edit Testimonial"}</h3>
                <button onClick={() => setEditing(null)} className="p-1.5 rounded-lg hover:bg-slate-100"><X size={18} /></button>
              </div>
              <TestimonialForm item={editing} onSave={save} onCancel={() => setEditing(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TestimonialForm = ({ item, onSave, onCancel }: { item: Testimonial; onSave: (t: Testimonial) => void; onCancel: () => void }) => {
  const [form, setForm] = useState({ ...item });
  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }));
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-xs font-semibold text-muted-foreground mb-1">Student Name *</label><input required value={form.name} onChange={e => set("name", e.target.value)} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        <div><label className="block text-xs font-semibold text-muted-foreground mb-1">Course *</label><input required value={form.course} onChange={e => set("course", e.target.value)} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        <div><label className="block text-xs font-semibold text-muted-foreground mb-1">Rating (1-5)</label><input type="number" min={1} max={5} value={form.rating} onChange={e => set("rating", Number(e.target.value))} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        <div><label className="block text-xs font-semibold text-muted-foreground mb-1">Placement Info</label><input value={form.placement || ""} onChange={e => set("placement", e.target.value)} placeholder="e.g. Placed at TCS" className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
        <div className="col-span-2"><label className="block text-xs font-semibold text-muted-foreground mb-1">Review *</label><textarea required value={form.review} onChange={e => set("review", e.target.value)} rows={3} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" /></div>
      </div>
      <div className="flex gap-3"><button type="submit" className="flex-1 bg-primary text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"><Save size={14} /> Save</button><button type="button" onClick={onCancel} className="flex-1 border border-border text-foreground py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50">Cancel</button></div>
    </form>
  );
};

// ── Gallery Manager ────────────────────────────────────────────────────────────
const GalleryManager = ({ toast }: { toast: ReturnType<typeof useToast> }) => {
  const [items, setItems] = useState<GalleryImage[]>(siteData.getGallery());
  const [newUrl, setNewUrl] = useState(""); const [newCap, setNewCap] = useState(""); const [newCat, setNewCat] = useState("");

  const add = () => {
    if (!newUrl) return;
    const updated = [...items, { id: Date.now().toString(), url: newUrl, caption: newCap, category: newCat || "General" }];
    setItems(updated); siteData.saveGallery(updated); setNewUrl(""); setNewCap(""); setNewCat(""); toast.show("Image added!");
  };
  const del = (id: string) => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated); siteData.saveGallery(updated); toast.show("Image removed.");
  };

  return (
    <div className="space-y-6">
      <div><h2 className="text-xl font-bold text-foreground">Gallery Manager</h2><p className="text-sm text-muted-foreground">{items.length} images — live on /gallery</p></div>
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4">
        <h3 className="font-semibold text-sm text-foreground">Add New Image</h3>
        <div className="space-y-3">
          <ImageUploadSelector value={newUrl} onChange={setNewUrl} label="Gallery Image Source" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input value={newCap} onChange={e => setNewCap(e.target.value)} placeholder="Caption" className="px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="Category (e.g. Events)" className="px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <button onClick={add} className="w-full bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"><Plus size={15} /> Add Image to Gallery</button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(img => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden border border-slate-100 bg-white shadow-sm">
            <img src={img.url} alt={img.caption} className="w-full aspect-video object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
            <div className="p-2">
              <p className="text-xs font-medium text-foreground truncate">{img.caption}</p>
              <p className="text-xs text-muted-foreground">{img.category}</p>
            </div>
            <button onClick={() => del(img.id)} className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};


// ── Settings Manager ───────────────────────────────────────────────────────────
const SettingsManager = ({ toast }: { toast: ReturnType<typeof useToast> }) => {
  const [settings, setSettings] = useState<SiteSettings>(siteData.getSettings());
  const set = (k: keyof SiteSettings, v: string | number) => setSettings(s => ({ ...s, [k]: v }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    siteData.saveSettings(settings);
    toast.show("Settings saved! Reload the page to see changes on the live site.");
  };

  const fields: { key: keyof SiteSettings; label: string; icon: React.ElementType; type?: string }[] = [
    { key: "instituteName", label: "Institute Name", icon: Info },
    { key: "tagline", label: "Tagline", icon: Info },
    { key: "address", label: "Address", icon: MapPin },
    { key: "phone1", label: "Phone 1", icon: Phone },
    { key: "phone2", label: "Phone 2", icon: Phone },
    { key: "email", label: "Email", icon: Mail },
    { key: "whatsapp", label: "WhatsApp Number (with country code, no +)", icon: Phone },
    { key: "established", label: "Established Year", icon: Info },
    { key: "certifiedBadge1", label: "Badge 1 (footer)", icon: Shield },
    { key: "certifiedBadge2", label: "Badge 2 (footer)", icon: Shield },
    { key: "facebook", label: "Facebook URL", icon: Globe },
    { key: "instagram", label: "Instagram URL", icon: Globe },
    { key: "twitter", label: "Twitter URL", icon: Globe },
    { key: "linkedin", label: "LinkedIn URL", icon: Globe },
    { key: "youtube", label: "YouTube URL", icon: Globe },
  ];

  const numFields: { key: keyof SiteSettings; label: string }[] = [
    { key: "totalStudents", label: "Total Students Trained" },
    { key: "totalCenters", label: "Total Centers" },
    { key: "totalTeachers", label: "Total Teachers" },
    { key: "totalClasses", label: "Total Classes" },
    { key: "placementRate", label: "Placement Rate (%)" },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div><h2 className="text-xl font-bold text-foreground">Site Settings</h2><p className="text-sm text-muted-foreground">Changes apply instantly across the entire website</p></div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
        <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider text-muted-foreground">Contact & Branding</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map(({ key, label, icon: Icon }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1"><Icon size={11} /> {label}</label>
              <input value={String(settings[key])} onChange={e => set(key, e.target.value)} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
        <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider text-muted-foreground">Statistics & Numbers</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {numFields.map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">{label}</label>
              <input type="number" value={Number(settings[key])} onChange={e => set(key, Number(e.target.value))} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
        <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider text-muted-foreground">Homepage Hero</h3>
        <div className="space-y-3">
          <div><label className="block text-xs font-semibold text-muted-foreground mb-1">Hero Title</label><input value={settings.heroTitle} onChange={e => set("heroTitle", e.target.value)} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
          <div><label className="block text-xs font-semibold text-muted-foreground mb-1">Hero Subtitle</label><textarea value={settings.heroSubtitle} onChange={e => set("heroSubtitle", e.target.value)} rows={2} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" /></div>
          <div><label className="block text-xs font-semibold text-muted-foreground mb-1">About Us Short Text</label><textarea value={settings.aboutShort} onChange={e => set("aboutShort", e.target.value)} rows={3} className="w-full px-3 py-2 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" /></div>
        </div>
      </div>

      <button type="submit" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
        <Save size={16} /> Save All Settings
      </button>
    </form>
  );
};


// ── Generic Placeholder Section ────────────────────────────────────────────────
const PlaceholderSection = ({ title, desc }: { title: string; desc: string }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4"><FileText size={28} className="text-slate-400" /></div>
    <h2 className="text-xl font-bold text-foreground mb-2">{title}</h2>
    <p className="text-sm text-muted-foreground max-w-sm">{desc}</p>
  </div>
);

// ── Main Admin Panel ─────────────────────────────────────────────────────────────
const AdminPanel = () => {
  const [loggedIn, setLoggedIn] = useState(siteData.isAdminLoggedIn());
  const [section, setSection] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast, show } = useToast();

  useEffect(() => {
    if (!loggedIn) return;
  }, [loggedIn]);

  const handleLogout = () => {
    siteData.logoutAdmin();
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  const settings = siteData.getSettings();

  const renderSection = () => {
    const t = { toast: { toast, show } };
    switch (section) {
      case "dashboard": return <DashboardSection />;
      case "courses": return <CoursesManager toast={t.toast} />;
      case "admissions": return <AdmissionsManager toast={t.toast} />;
      case "students": return <StudentsManager toast={t.toast} />;
      case "payments": return <PaymentsManager toast={t.toast} />;
      case "testimonials": return <TestimonialsManager toast={t.toast} />;
      case "gallery": return <GalleryManager toast={t.toast} />;
      case "settings": return <SettingsManager toast={t.toast} />;
      case "blog": return <PlaceholderSection title="Blog Manager" desc="Add, edit, and manage blog posts. This section can be extended with rich text support." />;
      case "homepage": return <PlaceholderSection title="Homepage Settings" desc="Manage hero content, featured courses, and homepage sections. Use Settings tab for key text." />;
      case "about": return <PlaceholderSection title="About Us Settings" desc="Edit the About Us page content directly from this panel." />;
      default: return <DashboardSection />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Toast toast={toast} />

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col shadow-xl transition-transform duration-300 lg:translate-x-0 lg:static lg:shadow-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center"><Shield size={18} className="text-white" /></div>
            <div>
              <p className="font-bold text-foreground text-sm leading-tight">Admin Panel</p>
              <p className="text-[10px] text-muted-foreground truncate max-w-[120px]">{settings.instituteName}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {NAV_ITEMS.map(({ key, label, icon: Icon, badge }) => {
            const count = badge?.();
            return (
              <button
                key={key}
                onClick={() => { setSection(key); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mb-0.5 ${section === key ? "bg-primary text-white shadow-[0_4px_12px_rgba(226,29,47,0.30)]" : "text-slate-600 hover:bg-slate-100 hover:text-foreground"}`}
              >
                <Icon size={16} />
                <span className="flex-1 text-left">{label}</span>
                {count ? <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${section === key ? "bg-white/30 text-white" : "bg-primary/10 text-primary"}`}>{count}</span> : null}
                {section === key && <ChevronRight size={14} className="opacity-60" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-xl hover:bg-slate-100">
            <Globe size={14} /> View Live Site
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"><Menu size={20} /></button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span>Admin</span>
              <ChevronRight size={12} />
              <span className="font-semibold text-foreground capitalize">{section}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell size={18} className="text-muted-foreground hover:text-foreground cursor-pointer" />
              {siteData.getAdmissions().filter(a => a.status === "Pending").length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                  {siteData.getAdmissions().filter(a => a.status === "Pending").length}
                </span>
              )}
            </div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="text-white text-xs font-bold">A</span></div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
