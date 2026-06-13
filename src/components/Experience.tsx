/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Briefcase, Calendar, Check, ChevronRight, Award } from 'lucide-react';
import { EXPERIENCE_DATA } from '../data';

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28 bg-slate-900 relative overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -ml-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
        
        {/* Section Header */}
        <div className="mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/15 text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-white text-3.5xl sm:text-4xl font-extrabold tracking-tight">
            Work <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">History</span>
          </h2>
          <p className="text-slate-400 max-w-xl font-normal text-sm sm:text-base leading-relaxed">
            A comprehensive look at my professional timeline, responsibilities, and key metrics achieved across high-growth platforms.
          </p>
        </div>

        {/* Timeline Engine */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Timeline Center line (shows on desktop) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800 pointer-events-none" />

          <div className="space-y-12 md:space-y-16">
            {EXPERIENCE_DATA.map((job, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={job.id}
                  className={`relative flex flex-col md:flex-row items-stretch ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                  id={`experience-${job.id}-card`}
                >
                  
                  {/* Timeline Bullet Anchor */}
                  <div className="absolute left-[20px] md:left-1/2 top-6 w-6 h-6 rounded-full bg-slate-900 border-2 border-teal-400 flex items-center justify-center transform -translate-x-1/2 z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                  </div>

                  {/* Left Column Spacer / Matching Align Block for alternating layouts */}
                  <div className="hidden md:block w-1/2 px-12" />

                  {/* Visual Layout Container */}
                  <div className="w-full md:w-1/2 pl-14 pr-0 md:px-12 text-left">
                    <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/70 border border-slate-805 hover:border-slate-700/60 transition-all shadow-md relative group hover:shadow-teal-950/5">
                      
                      {/* Floating gradient glow behind card on hover */}
                      <div className="absolute inset-0 rounded-3xl bg-teal-500/[0.01] hover:bg-teal-500/[0.02] transition-colors pointer-events-none" />

                      {/* Card Header metadata */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-4 mb-4">
                        <div>
                          <span className="text-slate-500 text-xxs font-mono uppercase tracking-widest block">
                            {job.company}
                          </span>
                          <h4 className="text-white text-lg font-bold tracking-tight">
                            {job.role}
                          </h4>
                        </div>
                        <div className="flex items-center gap-1 text-teal-400 text-xs font-mono font-semibold bg-teal-400/5 px-2.5 py-1.5 rounded-xl border border-teal-400/10 self-start sm:self-center">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{job.duration}</span>
                        </div>
                      </div>

                      {/* Main Job Description paragraph */}
                      <p className="text-slate-300 text-sm leading-relaxed mb-5">
                        {job.description}
                      </p>

                      {/* Achievements bullets removed */}

                      {/* Job Tags indicators */}
                      <div className="flex flex-wrap gap-2 border-t border-slate-900/80 pt-4">
                        {job.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="text-slate-500 hover:text-slate-300 text-xxs font-mono px-2 py-1 rounded-md bg-slate-900 border border-slate-805 transition-colors"
                          >
                            #{tag.toLowerCase().replace(/\s+/g, '-')}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
