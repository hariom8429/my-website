/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, FileText, Youtube, Video, Sparkles } from 'lucide-react';
import { PROFILE_DATA } from '../data';

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const [activeTitleIndex, setActiveTitleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTitleIndex((prev) => (prev + 1) % PROFILE_DATA.titles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-slate-950 overflow-hidden pt-24 pb-12 sm:pb-20"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-20" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -ml-40 -mb-20" />

      {/* Decorative Grid Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content Info */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Status chip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/25 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-sm shadow-inner"
              id="hero-status-chip"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              <span>Available for Freelance & Contracts</span>
            </motion.div>

            {/* Profile Greeting Name */}
            <div className="space-y-2">
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-slate-400 font-medium tracking-wide text-lg sm:text-xl"
              >
                Passionate Digital Creator
              </motion.h4>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-white text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none"
              >
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
                  {PROFILE_DATA.name}
                </span>
              </motion.h1>
            </div>

            {/* Rotating Titles Subsection */}
            <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
              <span className="text-slate-300 font-medium text-lg sm:text-xl mr-2">I am a</span>
              <div className="relative overflow-hidden h-full flex items-center">
                <motion.span
                  key={activeTitleIndex}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -25, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="font-bold text-teal-400 text-lg sm:text-xl md:text-2xl tracking-wide block"
                  id="hero-spinning-title"
                >
                  {PROFILE_DATA.titles[activeTitleIndex]}
                </motion.span>
              </div>
            </div>

            {/* Structured Biography */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Helping brands and creators grow their audiences through high-CTR YouTube thumbnails, visual storytelling, cinematic edits, and analytics-driven content management.
            </motion.p>

            {/* Fast Badges for Main Fields */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-300">
                <Youtube className="w-3.5 h-3.5 text-red-500" />
                <span>YouTube Growth</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>Graphic Design</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-300">
                <Video className="w-3.5 h-3.5 text-indigo-400" />
                <span>Cinematic Editing</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <button
                onClick={handleContactClick}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-650 hover:to-emerald-700 text-white font-medium rounded-2xl shadow-xl shadow-teal-500/10 hover:shadow-teal-500/25 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer group"
                id="hero-contact-cta"
              >
                <span>Collaborate with Me</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenResume}
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-2xl border border-slate-800 hover:border-slate-700 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="hero-resume-cta"
              >
                <FileText className="w-4 h-4 text-teal-400" />
                <span>Examine My Resume</span>
              </button>
            </motion.div>
          </div>

          {/* Right Hero Image Card Presentation */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[380px] lg:h-[380px]"
            >
              {/* Outer Decorative Rotating Rim or Glow circles */}
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-indigo-500 rounded-3xl blur-2xl opacity-20 animate-pulse pointer-events-none" />
              <div className="absolute -inset-1.5 bg-gradient-to-br from-teal-500 via-emerald-400 to-indigo-500 rounded-[2rem] opacity-30 blur-sm animate-gradient pointer-events-none" />

              {/* Central Frame Wrapper */}
              <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-slate-900/90 border border-slate-800 relative shadow-2xl">
                <img
                  src={PROFILE_DATA.photo}
                  alt={PROFILE_DATA.name}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  id="hero-profile-avatar"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800';
                  }}
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
