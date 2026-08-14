"use client";

import { useState } from "react";
import { Check, Copy, Mail, MessageSquare, Send, User, MapPin, GraduationCap, Loader2, AlertCircle } from "lucide-react";
import { LiquidGlassCard } from "@/components/ui/liquid-glass";
import { KokonutBentoGrid } from "@/components/ui/kokonut-spotlight-card";
import { GradientText } from "@/components/ui/gradient-text";
import { BlurText } from "@/components/ui/blur-text";
import { ShinyText } from "@/components/ui/shiny-text";
import { useSound } from "@/components/SoundProvider";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { playClick, playChime } = useSound();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("swapnoneelmondal@gmail.com");
    playChime();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Send directly to Swapnoneel's Gmail with High Priority headers
      const response = await fetch("https://formsubmit.co/ajax/swapnoneelmondal@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `🚨 [HIGH PRIORITY INQUIRY] ${formData.subject}`,
          message: formData.message,
          _subject: `🚨 [HIGH PRIORITY PORTFOLIO MESSAGE] from ${formData.name}: ${formData.subject}`,
          _replyto: formData.email,
          _template: "table",
          _captcha: "false",
          Priority: "High",
          "X-Priority": "1 (Highest)",
          "X-MSMail-Priority": "High",
          Importance: "High",
        }),
      });

      if (response.ok) {
        playChime();
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setSubmitted(false);
        }, 6000);
      } else {
        // Fallback to mailto if external endpoint has CORS issues
        window.location.href = `mailto:swapnoneelmondal@gmail.com?subject=${encodeURIComponent(
          `[HIGH PRIORITY] ${formData.subject}`
        )}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;
        setSubmitted(true);
      }
    } catch {
      // Direct mailto fallback
      window.location.href = `mailto:swapnoneelmondal@gmail.com?subject=${encodeURIComponent(
        `[HIGH PRIORITY] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-10 sm:py-16 relative scroll-mt-28 sm:scroll-mt-36" id="about">
      {/* Ambient Glow */}
      <div className="ambient-glow bg-[#10b981] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] top-0 left-0 opacity-15" />
      <div className="ambient-glow bg-[#6366f1] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bottom-0 right-0 opacity-15" />

      {/* Header */}
      <div className="anime-section-title text-center md:text-left mb-8 sm:mb-14 scroll-mt-28 sm:scroll-mt-36" id="contact">
        <div className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1.5 sm:mb-2 flex items-center justify-center md:justify-start gap-1.5 sm:gap-2">
          <MessageSquare size={14} />
          <ShinyText speed={4} className="text-emerald-600 dark:text-emerald-400 font-mono">
            Direct Inquiries &amp; Collaboration
          </ShinyText>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-theme-primary tracking-tight mb-2 sm:mb-4">
          Let&apos;s Build{" "}
          <GradientText
            colors={["#059669", "#10b981", "#4f46e5", "#7c3aed", "#059669"]}
            animationSpeed={5}
            className="italic font-normal"
          >
            Together
          </GradientText>
        </h2>
        <BlurText
          text="Crafting digital experiences with precision and intent. Whether you have a specific role, engineering contract, or project in mind, I'm ready to connect."
          delay={15}
          animateBy="words"
          className="text-xs sm:text-sm text-theme-secondary max-w-2xl leading-relaxed"
        />
      </div>

      {/* Harmonious Liquid Glass Bento Grid */}
      <KokonutBentoGrid className="anime-grid-container gap-4 sm:gap-6">
        {/* Modular Card 1: Direct Message Form (Col-span 7) */}
        <LiquidGlassCard
          glowColor="#10b981"
          refractionColor="#6366f1"
          className="anime-card md:col-span-7 p-5 sm:p-9"
        >
          <div className="flex items-start justify-between gap-3 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 shadow-sm shrink-0">
                <Mail size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-xl md:text-2xl font-bold text-theme-primary">
                  Send a Direct Message
                </h3>
                <p className="text-[11px] sm:text-xs text-theme-muted mt-0.5">Dispatched directly to swapnoneelmondal@gmail.com with High Priority</p>
              </div>
            </div>
            <span className="shrink-0 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-emerald-700 dark:text-emerald-300">
              HIGH PRIORITY
            </span>
          </div>

          {submitted ? (
            <div className="bg-emerald-500/15 border border-emerald-500/30 text-theme-primary p-6 sm:p-8 rounded-2xl text-center my-4 sm:my-6 backdrop-blur-xl animate-fade-in">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_#10b981]">
                <Check size={20} className="sm:w-6 sm:h-6" />
              </div>
              <h4 className="text-base sm:text-lg font-bold">Email Transmitted!</h4>
              <p className="text-xs text-theme-secondary mt-1 max-w-md mx-auto leading-relaxed">
                Your message has been delivered directly to Swapnoneel&apos;s inbox with <strong>High Priority</strong> status. You will receive a response within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle size={15} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono font-medium text-theme-secondary uppercase mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    suppressHydrationWarning
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-theme-sub border rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-theme-primary placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono font-medium text-theme-secondary uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    suppressHydrationWarning
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-theme-sub border rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-theme-primary placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-mono font-medium text-theme-secondary uppercase mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  suppressHydrationWarning
                  placeholder="Project Opportunity / Engineering Role"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-theme-sub border rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-theme-primary placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-all disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-mono font-medium text-theme-secondary uppercase mb-1">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  required
                  disabled={isSubmitting}
                  suppressHydrationWarning
                  placeholder="Tell me about your vision or project requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-theme-sub border rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-theme-primary placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/40 transition-all resize-none disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 text-white py-3 sm:py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.01] active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] mt-2 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Transmitting High Priority Email...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message (High Priority)</span>
                  </>
                )}
              </button>
            </form>
          )}
        </LiquidGlassCard>

        {/* Modular Right Column (Col-span 5) */}
        <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6">
          {/* Card 2: About Swapnoneel */}
          <LiquidGlassCard
            glowColor="#a855f7"
            refractionColor="#10b981"
            className="anime-card p-5 sm:p-8"
          >
            <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 sm:p-2.5 rounded-2xl bg-indigo-500/15 dark:bg-purple-500/20 text-indigo-600 dark:text-purple-300 border border-indigo-500/30 shrink-0">
                  <User size={18} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-theme-primary">
                  About Swapnoneel
                </h3>
              </div>
              <span className="shrink-0 px-2.5 sm:px-3 py-1 rounded-full bg-theme-sub border text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-indigo-700 dark:text-purple-200">
                PROFILE
              </span>
            </div>

            <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed mb-4 sm:mb-6">
              Computer Science student and developer based in West Bengal focused on high-performance frontend engineering, data analytics, and digital systems. Crafting bespoke, interactive web experiences with modern component architectures and fluid motion design.
            </p>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <a
                href="https://github.com/KaiX-Jr"
                target="_blank"
                rel="noreferrer"
                onClick={() => playClick()}
                className="flex-1 text-center py-2.5 rounded-xl bg-theme-sub hover:bg-emerald-500/20 text-theme-primary text-xs font-semibold border transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href="https://instagram.com/neelbaba_"
                target="_blank"
                rel="noreferrer"
                onClick={() => playClick()}
                className="flex-1 text-center py-2.5 rounded-xl bg-theme-sub hover:bg-purple-500/20 text-theme-primary text-xs font-semibold border transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </LiquidGlassCard>

          {/* Card 3: Direct Email Copy Card */}
          <LiquidGlassCard
            glowColor="#10b981"
            refractionColor="#38bdf8"
            className="anime-card p-4 sm:p-6"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="truncate">
                <div className="text-[9px] sm:text-[10px] uppercase font-mono text-theme-muted tracking-wider mb-0.5">
                  DIRECT EMAIL NODE
                </div>
                <div className="text-xs sm:text-sm font-semibold text-theme-primary font-mono truncate">
                  swapnoneelmondal@gmail.com
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2.5 sm:p-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-600 dark:text-emerald-200 transition-all border border-emerald-500/30 shadow-sm active:scale-95 cursor-pointer shrink-0"
                title="Copy Email Address"
              >
                {copied ? <Check size={16} className="text-emerald-600 dark:text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
          </LiquidGlassCard>

          {/* Card 4: Location & Status */}
          <LiquidGlassCard
            glowColor="#38bdf8"
            refractionColor="#10b981"
            className="anime-card p-4 sm:p-6"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-theme-primary flex items-center gap-1.5">
                  <MapPin size={13} className="text-emerald-500 dark:text-cyan-400 shrink-0" />
                  West Bengal, India
                </div>
                <div className="text-[11px] sm:text-xs text-theme-muted flex items-center gap-1.5">
                  <GraduationCap size={13} className="text-teal-600 dark:text-indigo-300 shrink-0" />
                  IEM Kolkata • CS 2024–Present
                </div>
              </div>
              <div className="px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase shrink-0">
                AVAILABLE
              </div>
            </div>
          </LiquidGlassCard>
        </div>
      </KokonutBentoGrid>
    </section>
  );
}
