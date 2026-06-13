/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Palette, Eye, Hammer, Radio, ChevronRight, Sparkles } from 'lucide-react';
import { SKILL_DATA } from '../data';
import { SkillItem } from '../types';

export default function Skills() {
  const [activeTab, setActiveTab] = useState<'all' | 'design' | 'video' | 'management' | 'general'>('all');

  const categories = [
    { id: 'all', name: 'All Skills', icon: <Layers className="w-4 h-4" /> },
    { id: 'design', name: 'Visual & Graphic Design', icon: <Palette className="w-4 h-4" /> },
    { id: 'video', name: 'Cinematic Production', icon: <Eye className="w-4 h-4" /> },
    { id: 'management', name: 'Audience Strategy', icon: <Radio className="w-4 h-4" /> },
    { id: 'general', name: 'Workflow Tech', icon: <Hammer className="w-4 h-4" /> },
  ];

  const getCategoryDetails = (cat: string) => {
    switch (cat) {
      case 'design':
        return 'Thumbnails optimized for max CTR and beautiful branding layouts.';
      case 'video':
        return 'Multi-camera shooting setups, framing concepts, and dynamic timelines.';
      case 'management':
        return 'Algorithmic growth, publishing pipelines, and content marketing.';
      case 'general':
        return 'Synergy of modern artificial intelligence pipelines with classic design.';
      default:
        return 'Robust stack of specialized digital skills honed on high-traffic channels.';
    }
  };

  const filteredSkills = activeTab === 'all'
    ? SKILL_DATA
    : SKILL_DATA.filter(skill => skill.category === activeTab);

  return (
    <section id="skills" className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -mr-40" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -ml-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
        
        {/* Section Header */}
        <div className="md:flex justify-between items-end mb-12 space-y-4 md:space-y-0">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/15 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Skill Suite</span>
            </div>
            <h2 className="text-white text-3.5xl sm:text-4xl font-extrabold tracking-tight">
              Professional <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Qualifications</span>
            </h2>
            <p className="text-slate-400 max-w-xl font-normal text-sm sm:text-base leading-relaxed">
              Explore my structured skillset categorized by workflow clusters, focusing on audience-generation assets.
            </p>
          </div>

          <div className="hidden lg:block">
            <span className="text-slate-500 text-xxs font-mono uppercase tracking-widest block bg-slate-900 px-3.5 py-1.5 rounded-lg border border-slate-800">
              {filteredSkills.length} SKILLS REGISTERED
            </span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8" id="skills-filter-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer focus:outline-none ${
                activeTab === cat.id
                  ? 'bg-slate-800 text-white border-b-2 border-teal-400 hover:bg-slate-700 shadow-md shadow-slate-950'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800/80'
              }`}
              id={`skills-tab-${cat.id}`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Informative subtitle explanation card */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/50 mb-10 text-left text-xs sm:text-sm text-slate-400 flex items-center gap-2 max-w-3xl">
          <ChevronRight className="w-4 h-4 text-teal-400 flex-shrink-0 animate-pulse" />
          <span>{getCategoryDetails(activeTab)}</span>
        </div>

        {/* Skill grid items displaying skill titles as modern responsive interactive chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="skills-display-grid">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.2) }}
                key={skill.id}
                className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-705 hover:bg-slate-900/70 transition-all duration-300 flex items-center justify-between group cursor-default shadow-sm hover:shadow-[0_4px_25px_rgba(45,212,191,0.06)] hover:-translate-y-0.5 text-left"
              >
                <div className="flex items-center gap-3.5 pr-2">
                  {/* Glowing left dot indicator */}
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    skill.category === 'design' ? 'bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.6)]' :
                    skill.category === 'video' ? 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]' :
                    skill.category === 'management' ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]' :
                    'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                  }`} />
                  <span className="text-white text-base font-semibold tracking-tight group-hover:text-teal-300 transition-colors duration-200">
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
