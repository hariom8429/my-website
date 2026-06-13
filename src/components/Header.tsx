/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, FileText, Send } from 'lucide-react';

interface HeaderProps {
  onOpenResume: () => void;
}

export default function Header({ onOpenResume }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Reels', id: 'reels' },
    { name: 'YouTube', id: 'youtube-long-form' },
    { name: 'Creators', id: 'clients' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Track active section on scroll
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="group flex items-center gap-2.5 cursor-pointer text-left focus:outline-none"
            id="nav-logo-btn"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center font-bold text-white shadow-md shadow-teal-500/10 group-hover:shadow-teal-500/30 transition-all duration-300 text-lg">
              VY
            </div>
            <div className="hidden sm:block">
              <span className="text-white hover:text-white font-bold tracking-tight text-base block">
                Vishal Yadav
              </span>
            </div>
          </button>

          {/* Desktop Nav Selection */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/20 p-1 rounded-full border border-slate-800/40">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer focus:outline-none ${
                  activeSection === link.id
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
                id={`nav-${link.id}-btn`}
              >
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-slate-800 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </button>
            ))}
          </nav>

          {/* Action CTA and Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenResume}
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-medium border border-slate-700 transition-all shadow-sm cursor-pointer"
              id="header-resume-btn"
            >
              <FileText className="w-4 h-4 text-teal-400" />
              <span>Resume</span>
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="hidden sm:flex items-center gap-2 px-4.5 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white rounded-xl text-sm font-medium shadow-md shadow-teal-500/10 hover:shadow-teal-500/20 transition-all cursor-pointer"
              id="header-hire-btn"
            >
              <Send className="w-3.5 h-3.5 animate-pulse" />
              <span>Hire Me</span>
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              id="mobile-nav-toggle-btn"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden shadow-xl"
            id="mobile-drawer-container"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-medium flex items-center justify-between cursor-pointer focus:outline-none ${
                    activeSection === link.id
                      ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                  id={`mobile-nav-${link.id}-btn`}
                >
                  <span>{link.name}</span>
                  {activeSection === link.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  )}
                </button>
              ))}

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-medium border border-slate-700 cursor-pointer"
                  id="mobile-drawer-resume-btn"
                >
                  <FileText className="w-4 h-4 text-teal-400" />
                  <span>Resume</span>
                </button>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white rounded-xl text-sm font-medium shadow-md cursor-pointer"
                  id="mobile-drawer-hire-btn"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Hire Me</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
