import { useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, XCircle, Loader2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";

const Verify = () => {
  const [certId, setCertId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found" | "not-found">("idle");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      // Demo: IDs starting with "BIIT" are found
      setStatus(certId.toUpperCase().startsWith("BIIT") ? "found" : "not-found");
    }, 1500);
  };

  return (
    <>
      <PageBreadcrumbHero
        label="Verification"
        title="Verify Certificate"
        description="Enter your certificate number to verify authenticity and view certificate details instantly."
      />
      <section className="relative overflow-hidden bg-background px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_18%_22%,rgba(226,29,47,0.08),transparent_32%),radial-gradient(circle_at_86%_74%,rgba(15,23,42,0.08),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-0 noise-overlay" />

        <div className="container-max relative z-10 max-w-4xl">
          <div className="mx-auto mb-8 max-w-3xl rounded-[32px] border border-slate-200/80 bg-white/75 px-6 py-8 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-10">
            <SectionHeading
              label="Verification"
              title="Certificate Verification"
              description="Enter your certificate number to verify its authenticity and view details."
            />
          </div>

          <form onSubmit={handleVerify} className="card-premium relative overflow-hidden border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.95)_0%,rgba(248,250,252,0.96)_100%)] p-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(226,29,47,0.08),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.08),transparent_30%)]" />
            <div className="relative flex flex-col gap-3 sm:flex-row">
              <input
                required
                value={certId}
                onChange={(e) => { setCertId(e.target.value); setStatus("idle"); }}
                placeholder="Enter Certificate Number (e.g., BIIT-2024-001)"
                className="h-14 flex-1 rounded-2xl border border-slate-300/80 bg-slate-100/80 px-5 text-lg text-foreground placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
              <button type="submit" className="h-14 min-w-36 justify-center rounded-2xl bg-[linear-gradient(135deg,#ff3148_0%,#e21d2f_74%,#b91025_100%)] px-6 text-base font-semibold text-white shadow-[0_14px_34px_rgba(226,29,47,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(226,29,47,0.5)] disabled:opacity-80 inline-flex items-center gap-2" disabled={status === "loading"}>
                {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                Verify
              </button>
            </div>
          </form>

          {status === "found" && (
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="mt-8 card-premium border border-white/80 bg-white/95 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.1)] border-l-4 border-accent">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground text-lg">Certificate Verified</h3>
                  <p className="text-xs text-accent font-semibold">Authentic & Valid</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Student Name:</span><p className="font-semibold text-foreground">Demo Student</p></div>
                <div><span className="text-muted-foreground">Certificate ID:</span><p className="font-semibold text-foreground">{certId.toUpperCase()}</p></div>
                <div><span className="text-muted-foreground">Course:</span><p className="font-semibold text-foreground">PGDCA</p></div>
                <div><span className="text-muted-foreground">Status:</span><p className="font-semibold text-accent">✓ Valid</p></div>
              </div>
            </motion.div>
          )}

          {status === "not-found" && (
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="mt-8 card-premium border border-white/80 bg-white/95 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.1)] border-l-4 border-destructive">
              <div className="flex items-center gap-3">
                <XCircle size={24} className="text-destructive" />
                <div>
                  <h3 className="font-heading font-semibold text-foreground">Certificate Not Found</h3>
                  <p className="text-sm text-muted-foreground mt-1">Please check the certificate number and try again, or contact BIIT Computer Education office for assistance.</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default Verify;
