/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 15, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.85 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-gradient-to-tr from-teal-500 to-emerald-600 hover:from-teal-650 hover:to-emerald-700 text-slate-950 rounded-2xl shadow-xl shadow-teal-500/10 focus:outline-none transition-all group hover:scale-105 cursor-pointer"
          aria-label="Scroll back to top"
          id="back-to-top-btn"
        >
          <ArrowUp className="w-5 h-5 font-bold transition-transform group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
