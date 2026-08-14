"use client";

import { ArrowUp, Mail } from "lucide-react";
import { useSound } from "@/components/SoundProvider";

export default function Footer() {
  const { playClick, playTap } = useSound();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-14 sm:mt-20 border-t border-slate-200/90 dark:border-white/[0.08] bg-white/80 dark:bg-[#08080c]/80 backdrop-blur-2xl py-8 sm:py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-center md:text-left">
        <div>
          <a
            href="#"
            onClick={() => playClick()}
            className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white block"
          >
            Swapnoneel Mondal
          </a>
          <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 sm:mt-1 font-mono uppercase tracking-wider">
            © 2026 SWAPNONEEL MONDAL. ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="https://github.com/KaiX-Jr"
            target="_blank"
            rel="noreferrer"
            onClick={() => playClick()}
            onMouseEnter={() => playTap()}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-white/[0.05] hover:bg-emerald-500/15 dark:hover:bg-indigo-500/20 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white transition-all hover:scale-110 active:scale-95 border border-slate-200 dark:border-white/[0.08]"
            aria-label="GitHub Profile (KaiX-Jr)"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://instagram.com/neelbaba_"
            target="_blank"
            rel="noreferrer"
            onClick={() => playClick()}
            onMouseEnter={() => playTap()}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-white/[0.05] hover:bg-purple-500/15 dark:hover:bg-purple-500/20 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-200 transition-all hover:scale-110 active:scale-95 border border-slate-200 dark:border-white/[0.08]"
            aria-label="Instagram Profile (@neelbaba_)"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="mailto:swapnoneelmondal@gmail.com"
            onClick={() => playClick()}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-white/[0.05] hover:bg-emerald-500/15 dark:hover:bg-indigo-500/20 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-white transition-all hover:scale-110 active:scale-95 border border-slate-200 dark:border-white/[0.08]"
            aria-label="Email Swapnoneel Mondal"
          >
            <Mail size={16} />
          </a>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="px-4 py-2 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-200 transition-all border border-emerald-500/30 hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs font-mono font-semibold cursor-pointer"
          aria-label="Back to Top"
        >
          <ArrowUp size={14} />
          <span>TOP</span>
        </button>
      </div>
    </footer>
  );
}
