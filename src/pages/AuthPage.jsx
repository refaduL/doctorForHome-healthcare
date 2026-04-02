/**
 * pages/AuthPage.jsx
 *
 * Single authentication page with Login / Register tabs.
 *
 * Login:    all three roles (patient, doctor, admin) via role selector
 * Register: patients only — doctors/admins are created through admin panel
 *
 * After successful auth, AuthContext.login() / .register() handles redirect.
 * If user arrived from a protected route, they are sent back after login
 * (handled in AuthContext via navigate — the `from` state is available).
 *
 * Design: matches app's cyan→purple brand, slate dark palette, framer-motion.
 */

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, Mail, Lock, User, Phone, MapPin, Eye, EyeOff, AlertCircle, Loader2, ChevronDown } from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { showError, showSuccess } from "../utils/toast";


// ─── constants ────────────────────────────────────────────────────────────────

const ROLES = [
  {
    id:    "patient",
    label: "Patient",
    desc:  "Book appointments, view your records",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id:    "doctor",
    label: "Doctor",
    desc:  "Manage your schedule and patients",
    color: "from-teal-500 to-blue-600",
  },
  {
    id:    "admin",
    label: "Admin",
    desc:  "Manage the entire clinic system",
    color: "from-violet-500 to-indigo-600",
  },
];

// ─── shared field primitives ──────────────────────────────────────────────────

function InputField({ id, label, type = "text", value, onChange, placeholder, Icon, error, required = true }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType  = isPassword ? (show ? "text" : "password") : type;

  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">
        {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon className="w-4 h-4 text-slate-400" />
        </div>
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-10 ${isPassword ? "pr-10" : "pr-4"} py-2.5 rounded-xl border text-sm transition
            bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400
            ${error
              ? "border-rose-300 dark:border-rose-700"
              : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
            }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
            tabIndex={-1}
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-500">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

function SelectField({ id, label, value, onChange, options, Icon, error }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5">
        {label}<span className="text-rose-400 ml-0.5">*</span>
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon className="w-4 h-4 text-slate-400" />
        </div>
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 pr-8 py-2.5 rounded-xl border text-sm appearance-none transition
            bg-white dark:bg-slate-900 text-slate-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-400
            ${error
              ? "border-rose-300 dark:border-rose-700"
              : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
            }`}
        >
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-500">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

// ─── LOGIN FORM ───────────────────────────────────────────────────────────────

function LoginForm() {
  const { login } = useAuth();
  const location  = useLocation();

  const [role,     setRole]     = useState("patient");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};
    if (!email)    e.email    = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email.";
    if (!password) e.password = "Password is required.";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setServerError("");
    setSubmitting(true);

    console.log("processing login");

    // Passing `from` so AuthContext can redirect back to the attempted route
    const from = location.state?.from?.pathname || "/";

    const { error } = await login({ email, password, role }, from);
    if (error) {
      setServerError(error);
      showError("Something went wrong. Please try again");
    } else {
      showSuccess("User Logged-in Successfully");
    }
    setSubmitting(false);
  };

  const activeRole = ROLES.find(r => r.id === role);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Role selector */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
          Sign in as
        </p>
        <div className="grid grid-cols-3 gap-2">
          {ROLES.map(r => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-xs font-semibold transition ${
                role === r.id
                  ? `bg-gradient-to-br ${r.color} text-white border-transparent shadow-md`
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              {r.label}
              <span className={`text-[10px] font-normal hidden sm:block ${role === r.id ? "text-white/70" : "text-slate-400"}`}>
                {r.id === "patient" ? "Self" : r.id === "doctor" ? "Staff" : "Manager"}
              </span>
            </button>
          ))}
        </div>
      </div>

      <InputField
        id="login-email"
        label="Email"
        type="email"
        value={email}
        onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: "" })); }}
        placeholder={`Your ${activeRole.label.toLowerCase()} email`}
        Icon={Mail}
        error={errors.email}
      />

      <InputField
        id="login-password"
        label="Password"
        type="password"
        value={password}
        onChange={e => { setPassword(e.target.value); setErrors(v => ({ ...v, password: "" })); }}
        placeholder="Your password"
        Icon={Lock}
        error={errors.password}
      />

      {/* Server error */}
      {serverError && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/40">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <p className="text-sm text-rose-600 dark:text-rose-400">{serverError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition bg-gradient-to-r ${activeRole.color} hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg`}
      >
        {submitting
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
          : `Sign in as ${activeRole.label}`
        }
      </button>

      {/* Doctor/Admin note */}
      {role !== "patient" && (
        <p className="text-xs text-center text-slate-400 dark:text-slate-500">
          {role === "doctor" ? "Doctor" : "Admin"} accounts are managed by the clinic.
          Contact your administrator if you need access.
        </p>
      )}
    </form>
  );
}

// ─── REGISTER FORM ────────────────────────────────────────────────────────────

function RegisterForm() {
  const { register } = useAuth();

  const [form, setForm] = useState({
    patient_name: "",
    email:        "",
    password:     "",
    confirm:      "",
    mobile:       "",
    gender:       "",
    age:          "",
    city:         "",
  });
  const [errors,      setErrors]      = useState({});
  const [submitting,  setSubmitting]  = useState(false);
  const [serverError, setServerError] = useState("");

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(v => ({ ...v, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.patient_name.trim())    e.patient_name = "Full name is required.";
    if (!form.email)                  e.email        = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password)               e.password     = "Password is required.";
    else if (form.password.length < 6) e.password    = "Password must be at least 6 characters.";
    if (form.password !== form.confirm) e.confirm    = "Passwords do not match.";
    if (!form.mobile)                 e.mobile       = "Mobile number is required.";
    else if (!/^\d{11}$/.test(form.mobile)) e.mobile = "Enter a valid 11-digit number.";
    if (!form.gender)                 e.gender       = "Please select your gender.";
    if (!form.age)                    e.age          = "Age is required.";
    else if (isNaN(form.age) || +form.age < 1) e.age = "Enter a valid age.";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setServerError("");
    setSubmitting(true);

    const { error } = await register({
      patient_name: form.patient_name.trim(),
      email:        form.email,
      password:     form.password,
      mobile:       form.mobile,
      gender:       form.gender,
      age:          Number(form.age),
      city:         form.city.trim() || "Not Specified",
    });

    if (error) setServerError(error);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <InputField
        id="reg-name"
        label="Full Name"
        value={form.patient_name}
        onChange={set("patient_name")}
        placeholder="Your full name"
        Icon={User}
        error={errors.patient_name}
      />

      <InputField
        id="reg-email"
        label="Email"
        type="email"
        value={form.email}
        onChange={set("email")}
        placeholder="your@email.com"
        Icon={Mail}
        error={errors.email}
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="reg-password"
          label="Password"
          type="password"
          value={form.password}
          onChange={set("password")}
          placeholder="Min. 6 characters"
          Icon={Lock}
          error={errors.password}
        />
        <InputField
          id="reg-confirm"
          label="Confirm"
          type="password"
          value={form.confirm}
          onChange={set("confirm")}
          placeholder="Repeat password"
          Icon={Lock}
          error={errors.confirm}
        />
      </div>

      <InputField
        id="reg-mobile"
        label="Mobile"
        type="tel"
        value={form.mobile}
        onChange={set("mobile")}
        placeholder="01XXXXXXXXX (11 digits)"
        Icon={Phone}
        error={errors.mobile}
      />

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          id="reg-gender"
          label="Gender"
          value={form.gender}
          onChange={set("gender")}
          options={[
            { value: "",       label: "Select…" },
            { value: "Male",   label: "Male"    },
            { value: "Female", label: "Female"  },
          ]}
          Icon={User}
          error={errors.gender}
        />
        <InputField
          id="reg-age"
          label="Age"
          type="number"
          value={form.age}
          onChange={set("age")}
          placeholder="e.g. 28"
          Icon={User}
          error={errors.age}
        />
      </div>

      <InputField
        id="reg-city"
        label="City"
        value={form.city}
        onChange={set("city")}
        placeholder="Dhaka (optional)"
        Icon={MapPin}
        error={errors.city}
        required={false}
      />

      {serverError && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/40">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <p className="text-sm text-rose-600 dark:text-rose-400">{serverError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
      >
        {submitting
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account…</>
          : "Create Account"
        }
      </button>

      <p className="text-xs text-center text-slate-400 dark:text-slate-500">
        By creating an account you agree to our{" "}
        <span className="text-cyan-500 cursor-pointer hover:underline">Terms of Service</span>.
      </p>
    </form>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

const AuthPage = () => {
  const [tab, setTab] = useState("login"); 
  const { user } = useAuth();

  // Already logged in → they shouldn't be here (ProtectedRoute handles dashboards,
  // this just prevents seeing the auth page while logged in)
  if (user) {
    const redirects = { patient: "/patient/dashboard", doctor: "/doctor/dashboard", admin: "/admin/dashboard" };
    window.location.replace(redirects[user.role] ?? "/");
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-16 transition-colors duration-300">

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}

        <Link to="/">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-lg opacity-50" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
                <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">
                  DoctorsForHome
                </h1>            
              <p className="text-[10px] text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                Healthcare Reimagined
              </p>
            </div>
          </div>
        </Link>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 overflow-hidden">

          {/* Tab bar */}
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            {[
              { id: "login",    label: "Sign In"    },
              { id: "register", label: "Register"   },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 py-4 text-sm font-bold transition-colors relative ${
                  tab === t.id
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                }`}
              >
                {t.label}
                {tab === t.id && (
                  <motion.div
                    layoutId="auth-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Form area */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: tab === "login" ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: tab === "login" ? 16 : -16 }}
                transition={{ duration: 0.2 }}
              >
                {tab === "login"
                  ? <LoginForm />
                  : <RegisterForm />
                }
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-6 pb-5 text-center">
            {tab === "login" ? (
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Don't have an account?{" "}
                <button onClick={() => setTab("register")} className="text-cyan-500 font-semibold hover:underline">
                  Register here
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Already have an account?{" "}
                <button onClick={() => setTab("login")} className="text-cyan-500 font-semibold hover:underline">
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-5 text-center">
          <Link
            to="/"
            className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition"
          >
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;