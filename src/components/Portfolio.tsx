/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X, Flame, ZoomIn } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data';
import { PortfolioItem } from '../types';

export default function Portfolio() {
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioItem | null>(null);

  const filteredItems = PORTFOLIO_DATA.filter(item => item.category === 'thumbnail');

  const handleCardClick = (item: PortfolioItem) => {
    setSelectedPhoto(item);
  };

  return (
    <section id="projects" className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -mr-40" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
        
        {/* Section Header */}
        <div className="md:flex justify-between items-end mb-12 space-y-4 md:space-y-0">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/15 text-xs font-semibold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-red-400" />
              <span>Showcase Lab</span>
            </div>
            <h2 className="text-white text-3.5xl sm:text-4xl font-extrabold tracking-tight">
              Featured <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Thumbnail Designs</span>
            </h2>
            <p className="text-slate-400 max-w-xl font-normal text-sm sm:text-base leading-relaxed">
              High-impact, high-CTR custom YouTube thumbnails crafted with precision to maximize viewer engagement and channel growth.
            </p>
          </div>
        </div>

        {/* Portfolio Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="portfolio-project-grid">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="group rounded-3xl overflow-hidden bg-slate-900 border border-slate-805 hover:border-slate-705 transition-all duration-300 flex flex-col justify-between cursor-pointer relative shadow-md hover:shadow-teal-950/10"
              >
                
                {/* Thumbnail Header Image Container with Hover zoom overlay */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    id={`portfolio-item-img-${item.id}`}
                  />
                  
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md p-2 rounded-xl border border-slate-800 shadow-md">
                    <Flame className="w-3.5 h-3.5 text-red-400" />
                  </div>

                  {/* Dark overlay showing zoom trigger on hover */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-teal-400 text-slate-950 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Static Photo Zoom Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
              id="photo-zoom-modal-overlay"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl relative"
                id="photo-zoom-modal-container"
              >
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-xl bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-950 border border-slate-800 focus:outline-none cursor-pointer"
                  id="close-photo-modal-btn"
                  aria-label="Close photo preview"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-full aspect-[16/10] bg-slate-950 overflow-hidden relative">
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-6 text-left space-y-2">
                  <span className="text-slate-500 font-mono text-xxs tracking-widest uppercase block">
                    Product / Graphic Design Project
                  </span>
                  <h4 className="text-white text-xl font-bold tracking-tight">
                    {selectedPhoto.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {selectedPhoto.description}
                  </p>
                  
                  {selectedPhoto.link && (
                    <div className="pt-4 border-t border-slate-950 mt-4 flex justify-between items-center">
                      <span className="text-slate-500 text-xxs font-mono">Platform Integration: Canva Pro Design Suite</span>
                      <a
                        href={selectedPhoto.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4.5 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                        id="photo-modal-live-link"
                      >
                        <span>Visit Canva Showcase</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
