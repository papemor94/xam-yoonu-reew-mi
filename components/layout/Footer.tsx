import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-xyrm-slate-900 border-t border-xyrm-slate-800 text-white/80 py-16 px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden border border-white/10 bg-white transition-transform duration-300 group-hover:scale-105 shrink-0">
                <img src="/logo.png" alt="Logo Xam Yoonu Reew Mi" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-wider text-white">
                  XAM YOONU
                </span>
                <span className="text-[10px] font-bold tracking-widest text-xyrm-gold">
                  REEW MI
                </span>
              </div>
            </Link>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Université Populaire Citoyenne et Solidaire (UPCS). Bâtir une citoyenneté éclairée en vulgarisant le savoir.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.youtube.com/@xamyoonureewmi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-xyrm-gold hover:text-xyrm-slate-900 text-white transition-all flex items-center justify-center"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-xyrm-gold hover:text-xyrm-slate-900 text-white transition-all flex items-center justify-center"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-xyrm-gold mb-6">
              Navigation
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li>
                <Link href="/" className="hover:text-xyrm-gold transition-colors flex items-center gap-1 group">
                  Accueil <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/association" className="hover:text-xyrm-gold transition-colors flex items-center gap-1 group">
                  L&apos;Association <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <div className="text-xyrm-gold font-semibold uppercase tracking-wider text-[9px] mt-2 mb-1.5">Documents</div>
                <ul className="space-y-1.5 pl-2 border-l border-white/10 text-[11px] text-white/60">
                  <li>
                    <a href="/docs/statuts.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-xyrm-gold transition-colors block">
                      Statuts de l&apos;Association
                    </a>
                  </li>
                  <li>
                    <a href="/docs/reglement.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-xyrm-gold transition-colors block">
                      Règlement Intérieur
                    </a>
                  </li>
                  <li>
                    <a href="/docs/fdrtriennale.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-xyrm-gold transition-colors block">
                      Feuille de Route Triennale
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/journees" className="hover:text-xyrm-gold transition-colors flex items-center gap-1 group">
                  Journées <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="hover:text-xyrm-gold transition-colors flex items-center gap-1 group">
                  Actualités <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-xyrm-gold transition-colors flex items-center gap-1 group">
                  Nous Contacter <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-xyrm-gold transition-colors flex items-center gap-1 group">
                  FAQ / Foire Aux Questions <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-xyrm-gold text-white/50 transition-colors flex items-center gap-1 group">
                  Espace Administration <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The Concept */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-xyrm-gold mb-6">
              Notre Mission
            </h4>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              L&apos;UPCS propose des ateliers de vulgarisation juridique, des débats citoyens solidaires et des programmes d&apos;accompagnement à destination des populations locales et de la diaspora.
            </p>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-xyrm-gold mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4.5 w-4.5 text-xyrm-gold shrink-0 mt-0.5" />
                <span className="font-light text-white/70">
                  Dakar, Sénégal / Toulouse, France
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4.5 w-4.5 text-xyrm-gold shrink-0" />
                <span className="font-light text-white/70">
                  +221 77 000 00 00 / +33 6 00 00 00 00
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 text-xyrm-gold shrink-0" />
                <span className="font-light text-white/70 hover:text-xyrm-gold transition-colors">
                  contact@xamyoonureewmi.org
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-xyrm-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© 2026 Xam Yoonu Reew Mi. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
