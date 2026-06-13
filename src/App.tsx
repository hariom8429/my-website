/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import ReelsPortfolio from './components/ReelsPortfolio';
import YoutubePortfolio from './components/YoutubePortfolio';
import Clients from './components/Clients';
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';
import ResumeModal from './components/ResumeModal';
import { AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, Youtube, Award, ExternalLink, Calendar, Heart } from 'lucide-react';
import { PROFILE_DATA } from './data';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Admin session tracking for the floating console
  const [isAdminMode, setIsAdminMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true') {
        localStorage.setItem('portfolio_admin_mode', 'true');
        return true;
      } else if (params.get('admin') === 'false') {
        localStorage.removeItem('portfolio_admin_mode');
        return false;
      }
      return localStorage.getItem('portfolio_admin_mode') === 'true';
    }
    return false;
  });

  const handleDisconnectAdmin = () => {
    localStorage.removeItem('portfolio_admin_mode');
    setIsAdminMode(false);
    // Hard refresh to strip query params & clear state
    window.location.href = window.location.origin + window.location.pathname;
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-teal-500 selection:text-slate-950 font-sans antialiased overflow-x-hidden">
      <Helmet>
        <title>{PROFILE_DATA.name} | {PROFILE_DATA.titles[0]}</title>
        <meta name="description" content={PROFILE_DATA.bio} />
        <meta property="og:title" content={`${PROFILE_DATA.name} | ${PROFILE_DATA.titles[0]}`} />
        <meta property="og:description" content={PROFILE_DATA.bio} />
        <meta property="og:image" content={PROFILE_DATA.photo} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${PROFILE_DATA.name} | ${PROFILE_DATA.titles[0]}`} />
        <meta name="twitter:description" content={PROFILE_DATA.bio} />
        <meta name="twitter:image" content={PROFILE_DATA.photo} />
      </Helmet>
      
      {/* 1. Header/Navigation Section */}
      <Header onOpenResume={() => setIsResumeOpen(true)} />

      {/* 2. Hero Presentation Section */}
      <Hero onOpenResume={() => setIsResumeOpen(true)} />

      {/* 3. About & Education Combined */}
      <About />

      {/* 4. Skills Interactive Competencies Suite */}
      <Skills />

      {/* 5. Professional Timeline Experience */}
      <Experience />

      {/* 6. Creative Projects & Media Grid Portfolio */}
      <Portfolio />

      {/* 6.5. Instagram Reels 9:16 Vertical Portfolio */}
      <ReelsPortfolio />

      {/* 6.6. YouTube Long Video Portfolio */}
      <YoutubePortfolio />

      {/* 6.8. Creators Worked With Section */}
      <Clients />

      {/* 7. Action Contact Cards & Validation Form */}
      <Contact />

      {/* 8. Global Layout Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 relative overflow-hidden" id="app-footer">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
            
            {/* Left Branding */}
            <div className="text-center md:text-left space-y-1.5">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                  VY
                </span>
                <span className="text-white font-extrabold tracking-tight text-lg">
                  Vishal Yadav
                </span>
              </div>
              <p className="text-slate-500 text-xs max-w-sm">
                YouTube Channel Management, Professional Camera Production, High-CTR Thumbnail Design, and Post-Production Editorial.
              </p>
            </div>

            {/* Quick Navigation Footer Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
              <a href="#home" className="hover:text-teal-400 transition-colors">Home</a>
              <a href="#about" className="hover:text-teal-400 transition-colors">About</a>
              <a href="#skills" className="hover:text-teal-400 transition-colors">Skills</a>
              <a href="#experience" className="hover:text-teal-400 transition-colors">Experience</a>
              <a href="#projects" className="hover:text-teal-400 transition-colors">Projects</a>
              <a href="#reels" className="hover:text-teal-400 transition-colors">Reels</a>
              <a href="#youtube-long-form" className="hover:text-teal-400 transition-colors">YouTube</a>
              <a href="#clients" className="hover:text-teal-400 transition-colors">Creators</a>
              <a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a>
            </div>

            {/* Social Anchor Indicators */}
            <div className="flex items-center gap-4">
              <a
                href={`mailto:${PROFILE_DATA.contacts.email}`}
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-805 text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-all cursor-pointer"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${PROFILE_DATA.contacts.phone}`}
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-805 text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-all cursor-pointer"
                title="Call Now"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`https://${PROFILE_DATA.contacts.portfolioUrl}`}
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-805 text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-all cursor-pointer"
                title="Canva Portfolio"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Legal and Engineering Signature */}
          <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xxs font-mono text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} Vishal Yadav. All Rights Reserved.
            </div>
            <div className="flex items-center gap-1">
              <span>Optimized with</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>&amp; generative assets.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 9. Back To Top scroll utility */}
      <BackToTop />

      {/* 10. Interactive Resume Modal view state */}
      <AnimatePresence>
        {isResumeOpen && (
          <ResumeModal onClose={() => setIsResumeOpen(false)} />
        )}
      </AnimatePresence>

      {/* Floating Admin Control Panel & Session Disconnect Portal */}
      {isAdminMode && (
        <div className="fixed bottom-6 left-6 z-50 max-w-sm p-4 bg-slate-950/95 border border-amber-500/30 rounded-3xl shadow-[0_20px_50px_rgba(245,158,11,0.15)] backdrop-blur-md flex flex-col gap-3.5 transform transition-all duration-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider">Admin Control Active</span>
          </div>
          <p className="text-slate-400 text-xxs leading-relaxed">
            Please use the <strong className="text-amber-400">Export All Data</strong> button below to copy your edits. Then paste that into the Chat so the AI can hardcode it into your final ZIP permanently.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const data = {
                  videos: JSON.parse(localStorage.getItem('vishal_portfolio_yt_videos') || '[]'),
                  reels: JSON.parse(localStorage.getItem('vishal_reels_portfolio') || '[]'),
                  clients: JSON.parse(localStorage.getItem('vishal_portfolio_clients') || '[]')
                };
                navigator.clipboard.writeText(JSON.stringify(data, null, 2));
                alert("Data copied to clipboard! Please paste ALL of it into the AI Chat window so I can apply it firmly into your codebase!");
              }}
              className="flex-1 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-black text-xxs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              📋 Export All Data
            </button>
            <button
              onClick={handleDisconnectAdmin}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-black text-xxs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Exit Admin
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
