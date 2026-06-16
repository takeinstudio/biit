import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, QrCode, DollarSign, CheckCircle, Send, ShieldCheck, AlertCircle, Copy, Check } from "lucide-react";
import PageBreadcrumbHero from "@/components/PageBreadcrumbHero";
import { siteData } from "@/lib/siteData";

const inputCls =
  "w-full h-12 px-4 rounded-xl border border-border bg-white text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300";

// Custom styles for scanning animation
const scannerStyles = `
@keyframes scan {
  0%, 100% { top: 0%; opacity: 0.8; }
  50% { top: 100%; opacity: 0.8; }
}
.laser-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #22c55e, transparent);
  box-shadow: 0 0 8px #22c55e;
  animation: scan 3s infinite ease-in-out;
  pointer-events: none;
}
`;

const Payment = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState(false);

  const courses = siteData.getCourses();

  const handleCopyUpi = () => {
    navigator.clipboard.writeText("biiteducation@okaxis");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!transactionId) {
      alert("Please enter the UTR / Transaction ID for UPI verification.");
      return;
    }

    siteData.addPayment({
      studentName: name,
      rollNumber: rollNumber || "NEW-STUDENT",
      email,
      phone,
      course: course || "General Installment",
      amount: Number(amount),
      paymentMode: "UPI Scanner",
      transactionId,
    });

    setSubmitted(true);
    setName("");
    setRollNumber("");
    setEmail("");
    setPhone("");
    setCourse("");
    setAmount("");
    setTransactionId("");

    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <>
      <style>{scannerStyles}</style>
      <PageBreadcrumbHero
        label="Student Fee Payment"
        title="Quick Pay"
        description="Securely pay your admission, exam, or monthly course installment fees online or select cash mode."
      />

      <section className="relative bg-background overflow-hidden py-16">
        {/* Soft background glow */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-primary/5 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 w-[340px] h-[340px] rounded-full bg-violet-400/5 blur-[70px]" />

        <div className="container-max px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column: Payment Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-3xl border border-border/60 bg-white p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
              >
                <div className="absolute top-0 inset-x-0 h-1.5 bg-[linear-gradient(90deg,transparent,rgba(226,29,47,0.8),transparent)]" />
                
                <div className="mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground">Fee Payment Form</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Please provide your matching details to ensure immediate credit allocation.</p>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center py-12 px-4 min-h-[450px]"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-6"
                      >
                        <CheckCircle size={32} className="text-green-500" />
                      </motion.div>
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Payment Logged!</h3>
                      <p className="text-muted-foreground text-sm max-w-md mx-auto">
                        Your payment log of <strong>₹{amount}</strong> has been forwarded to the admin panel. Once verified against our bank statement, your receipt will be generated.
                      </p>
                      <div className="mt-6 text-xs bg-slate-50 border border-slate-100 rounded-xl p-4 text-left max-w-sm">
                        <p className="font-semibold text-slate-700 flex items-center gap-1.5 mb-1">
                          <ShieldCheck size={14} className="text-green-500" /> Payment Pending Review
                        </p>
                        <p className="text-slate-500 leading-normal">
                          Verification takes up to 2 hours. Check your transaction status regularly.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-foreground/75 uppercase tracking-wide">Full Name</label>
                          <input
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Student Name"
                            className={inputCls}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-foreground/75 uppercase tracking-wide">Roll Number / Student ID</label>
                          <input
                            value={rollNumber}
                            onChange={(e) => setRollNumber(e.target.value)}
                            placeholder="e.g. BIIT-2024-001 (Optional)"
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-foreground/75 uppercase tracking-wide">Email ID</label>
                          <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@example.com"
                            className={inputCls}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-foreground/75 uppercase tracking-wide">Phone Number</label>
                          <input
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="10-digit number"
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-foreground/75 uppercase tracking-wide">Course</label>
                          <select
                            required
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className={inputCls}
                          >
                            <option value="">Select Course</option>
                            {courses.map((c) => (
                              <option key={c.id} value={c.title}>
                                {c.title}
                              </option>
                            ))}
                            <option value="Installment">Other / Fee Installment</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-foreground/75 uppercase tracking-wide">Amount to Pay (₹)</label>
                          <input
                            required
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="e.g. 2000"
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-foreground/75 uppercase tracking-wide flex items-center gap-1.5">
                            Transaction ID / UTR Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="12-digit transaction hash/UTR"
                            className={inputCls}
                          />
                          <p className="text-[10px] text-muted-foreground">After scanning the QR code and completing payment, check your app receipt to find the UTR/Txn number and enter it here.</p>
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(226,29,47,0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-12 mt-4 rounded-xl bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/95 transition-all duration-300"
                      >
                        <Send size={15} /> Submit Payment Confirmation
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right Column: QR Scanner */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-3xl border border-border/60 bg-white p-6 shadow-sm space-y-6 flex-1 flex flex-col justify-center items-center text-center"
              >
                <div>
                  <h4 className="font-heading font-bold text-slate-900 text-lg">BIIT UPI QR Code</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">Scan using GooglePay, PhonePe, Paytm, or BHIM</p>
                </div>

                {/* Scanner Graphic */}
                <div className="relative p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center">
                  <div className="relative w-48 h-48 bg-white border border-slate-200 p-2 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
                    
                    {/* Laser lines */}
                    <div className="laser-line" />
                    
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                        `upi://pay?pa=biiteducation@okaxis&pn=BIIT%20Computer%20Education&am=${amount || "0"}&cu=INR`
                      )}`}
                      alt="BIIT Payment QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="space-y-2 w-full">
                  <div className="text-xs font-semibold text-slate-700 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 flex justify-between items-center">
                    <span>UPI ID: <strong className="text-slate-900 select-all">biiteducation@okaxis</strong></span>
                    <button
                      onClick={handleCopyUpi}
                      className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 shrink-0 ml-2"
                    >
                      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  {amount && (
                    <div className="text-xs bg-primary/5 text-primary font-bold rounded-xl px-4 py-2 border border-primary/10">
                      Scan Amount: ₹{amount}
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-muted-foreground flex items-center gap-1 justify-center leading-normal">
                  <AlertCircle size={12} className="text-amber-500 shrink-0" />
                  Do not close the page until you submit the transaction ID on the form.
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;
