/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Award, GraduationCap, Video, Sparkles, Youtube, CheckCircle2 } from 'lucide-react';
import { PROFILE_DATA, EDUCATION_DATA } from '../data';

export default function About() {
  const pillars = [
    {
      icon: <Sparkles className="w-5 h-5 text-teal-400" />,
      title: 'Graphic & Thumbnail Design',
      desc: 'Expertise in high-CTR click magnets, social layouts, and modern visual branding. Crafting attention-grabbing assets that generate viewer engagement.'
    },
    {
      icon: <Video className="w-5 h-5 text-indigo-400" />,
      title: 'Cinematic Video Editing',
      desc: 'Seamless cuts, transitions, clean audio integration, and retention-focused structures that sustain viewer attention from hook to outro.'
    },
    {
      icon: <Youtube className="w-5 h-5 text-red-400" />,
      title: 'YouTube Channel Growth',
      desc: 'Formulating end-to-end publishing procedures, deep metadata setups, search rankings optimization, and analytics auditing.'
    }
  ];

  const valueAxioms = [
    'Highly conversant in algorithmic criteria (click-rates, average view durations, organic search).',
    'Proficient utilizing generative AI applications to expand output bounds without compromising visual precision.',
    '3+ years of comprehensive video shoot logistics management, camera setups, and field configurations.'
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-slate-900 relative overflow-hidden">
      {/* Decorative Blur Ambient Background Elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -ml-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/15 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Profile Identity</span>
          </div>
          <h2 className="text-white text-3.5xl sm:text-4xl font-extrabold tracking-tight">
            Who is <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Vishal Yadav</span>?
          </h2>
          <p className="text-slate-400 max-w-2xl font-normal text-sm sm:text-base leading-relaxed">
            A digital creative combining high aesthetics with mathematical analytics to scale channel performances.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Biography details & core Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-slate-500 uppercase tracking-widest text-[10px] font-bold block">
                Professional Bio Summary
              </span>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                "{PROFILE_DATA.bio}"
              </p>
            </div>

            {/* Pillar highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-5 pt-2">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-950/55 border border-slate-800/80 hover:border-slate-700/60 transition-all flex gap-4 text-left group"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    {pillar.icon}
                  </div>
                  <div>
                    <h4 className="text-white text-base font-bold mb-1 tracking-tight">
                      {pillar.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Values list and Timeline Education */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Value checklist */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/60 border border-slate-800/80 space-y-6">
              <h3 className="text-white text-lg font-bold tracking-tight border-b border-slate-900 pb-3">
                Core Assets & Professional Standards
              </h3>
              
              <ul className="space-y-4">
                {valueAxioms.map((val, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-left">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm leading-relaxed">{val}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Education timeline cards */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <GraduationCap className="w-5 h-5 text-teal-400" />
                <h3 className="text-white text-lg font-bold tracking-tight">
                  Academic Credentials
                </h3>
              </div>

              <div className="relative pl-6 border-l border-slate-800/80 py-2">
                {EDUCATION_DATA.map((edu, idx) => (
                  <div key={edu.id} className="relative">
                    {/* Small vertical bullet */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-teal-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                    </div>

                    <div className="space-y-2 text-left">
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-bold leading-none font-mono">
                        {edu.duration}
                      </span>
                      <h4 className="text-white text-base font-bold tracking-tight mt-1">
                        {edu.degree}
                      </h4>
                      <p className="text-slate-400 text-sm font-medium">
                        {edu.institution}
                      </p>
                      {edu.details && (
                        <p className="text-slate-500 text-xs leading-relaxed mt-1">
                          {edu.details}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
