"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, AlertCircle, ArrowLeft, Shield } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password: password.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Identifiants incorrects.");
      }
    } catch (err) {
      console.error("Login client error:", err);
      setError("Une erreur de réseau est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-xyrm-slate-50 px-4 md:px-6 py-12">
      
      {/* Background Decorative Gradient Shapes */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-xyrm-green-deep/[0.04] to-transparent pointer-events-none" />
      <div className="absolute -left-36 -top-36 w-96 h-96 bg-xyrm-green-light/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-36 -bottom-36 w-96 h-96 bg-xyrm-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Back Button */}
      <a
        href="/"
        className="absolute top-6 left-6 md:top-8 md:left-8 inline-flex items-center gap-2 rounded-xl border border-xyrm-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-xyrm-slate-650 hover:text-xyrm-green-deep hover:bg-xyrm-slate-100 transition-all shadow-xxs group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>Retour au Site</span>
      </a>

      {/* Clean Premium Login Card */}
      <div className="relative w-full max-w-[420px] bg-white border border-xyrm-slate-200/80 rounded-3xl p-8 md:p-10 shadow-sm flex flex-col items-center">
        
        {/* Branding Logo & Header */}
        <div className="flex items-center justify-center gap-3 mb-6 select-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-full overflow-hidden border border-xyrm-slate-200 bg-white shadow-xxs shrink-0">
            <img src="/logo.png" alt="Logo Xam Yoonu Reew Mi" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-black tracking-wider text-xyrm-slate-900 leading-tight">
              XAM YOONU
            </span>
            <span className="text-[10px] font-black tracking-widest text-xyrm-gold-dark leading-none">
              REEW MI
            </span>
          </div>
        </div>

        {/* Separator / Title */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1 rounded-full bg-xyrm-green-deep/5 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-xyrm-green-deep border border-xyrm-green-deep/5">
            <span className="h-1.5 w-1.5 rounded-full bg-xyrm-gold animate-pulse" />
            Portail d&apos;Administration
          </div>
          <h1 className="text-xl font-black text-xyrm-slate-900 tracking-tight pt-1">
            Connexion au Bureau
          </h1>
          <div className="w-10 h-0.5 bg-gradient-to-r from-xyrm-green-deep to-xyrm-gold mx-auto rounded-full" />
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="w-full rounded-2xl border border-red-200 bg-red-50/50 p-4 text-xs text-red-700 flex gap-3 items-start leading-relaxed mb-6">
            <AlertCircle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          
          {/* Username */}
          <div className="space-y-1.5 relative group">
            <label className="text-xxs font-extrabold uppercase tracking-wider text-xyrm-slate-500 ml-1 block">
              Nom d&apos;utilisateur
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xyrm-slate-400 group-focus-within:text-xyrm-green-primary transition-colors">
                <User className="h-4 w-4" />
              </span>
              <input
                type="text"
                required
                disabled={loading}
                placeholder="Identifiant"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-xyrm-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs text-xyrm-slate-800 placeholder-xyrm-slate-400 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5 relative group">
            <label className="text-xxs font-extrabold uppercase tracking-wider text-xyrm-slate-500 ml-1 block">
              Mot de passe
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xyrm-slate-400 group-focus-within:text-xyrm-green-primary transition-colors">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                required
                disabled={loading}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-xyrm-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs text-xyrm-slate-800 placeholder-xyrm-slate-400 focus:border-xyrm-green-primary focus:outline-none focus:ring-1 focus:ring-xyrm-green-primary transition-all"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 flex items-center justify-center rounded-xl bg-xyrm-green-deep hover:bg-xyrm-green-primary text-xs font-bold text-white transition-all hover:scale-102 mt-6 shadow-sm gap-2 hover:text-xyrm-gold disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Shield className="h-4 w-4" />
                <span>Entrer dans l&apos;Espace</span>
              </>
            )}
          </button>

        </form>

        {/* Footer info */}
        <div className="mt-8 text-center text-[10px] text-xyrm-slate-400 font-light">
          © {new Date().getFullYear()} Xam Yoonu Reew Mi. Accès restreint.
        </div>

      </div>
    </div>
  );
}
