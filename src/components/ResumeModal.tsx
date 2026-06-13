/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { X, Printer, Copy, Check, FileText, Sparkles, Award } from 'lucide-react';
import { PROFILE_DATA, EDUCATION_DATA, EXPERIENCE_DATA, SKILL_DATA } from '../data';

interface ResumeModalProps {
  onClose: () => void;
}

export default function ResumeModal({ onClose }: ResumeModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    // Open a print window specifically formatted for the Resume
    const printContent = printAreaRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;

    if (printContent) {
      const windowPrint = window.open('', '_blank');
      if (windowPrint) {
        windowPrint.document.write(`
          <html>
            <head>
              <title>Resume - ${PROFILE_DATA.name}</title>
              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
              <style>
                @media print {
                  body { bg-color: white; color: black; font-family: system-ui, sans-serif; }
                  .no-print { display: none; }
                  .print-break { page-break-inside: avoid; }
                }
              </style>
            </head>
            <body class="bg-white text-black p-8 sm:p-12">
              <div class="max-w-4xl mx-auto">
                ${printContent}
              </div>
              <script>
                window.onload = function() {
                  window.print();
                  setTimeout(function() { window.close(); }, 500);
                }
              </script>
            </body>
          </html>
        `);
        windowPrint.document.close();
      }
    }
  };

  const handleCopyText = () => {
    const markdownText = `
# RESUME: ${PROFILE_DATA.name.toUpperCase()}
Title: ${PROFILE_DATA.titles.join(' | ')}
Email: ${PROFILE_DATA.contacts.email}
Phone: ${PROFILE_DATA.contacts.phone}
Portfolio: ${PROFILE_DATA.contacts.portfolioUrl}

## PROFILE SUMMARY
${PROFILE_DATA.bio}

## SYSTEM SKILLS
${SKILL_DATA.map(s => `- ${s.name} (${s.level === 5 ? 'Expert' : 'Advanced'})`).join('\n')}

## EMPLOYMENT CHRONOLOGY
${EXPERIENCE_DATA.map(exp => `
### ${exp.role} - ${exp.company}
Duration: ${exp.duration}
Description: ${exp.description}
Achievements:
${exp.achievements.map(ach => `  - ${ach}`).join('\n')}
`).join('\n')}

## EDUCATION
${EDUCATION_DATA.map(edu => `- ${edu.degree}, ${edu.institution} (${edu.duration})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(markdownText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      id="resume-modal-overlay"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-805 rounded-3xl max-w-4xl w-full shadow-2xl relative my-8 flex flex-col h-[85vh] lg:h-auto lg:max-h-[85vh]"
        id="resume-modal-container"
      >
        
        {/* Modal Header Actions */}
        <div className="p-5 border-b border-slate-950 flex items-center justify-between gap-4 bg-slate-900/55 sticky top-0 rounded-t-3xl z-10 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-400" />
            <h3 className="text-white text-md font-bold tracking-tight">
              Interactive Resume Viewer
            </h3>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold font-mono border border-slate-805 transition-all cursor-pointer focus:outline-none"
              id="resume-copy-markdown-btn"
              title="Copy resume in markdown formatting"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-teal-400" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-slate-950 rounded-xl text-xs font-bold transition-all cursor-pointer focus:outline-none"
              id="resume-print-pdf-btn"
              title="Print document or convert to standard portable document format"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-950 text-slate-400 hover:text-white border border-slate-805 focus:outline-none cursor-pointer"
              aria-label="Close resume viewer"
              id="resume-modal-close-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic scrollable resume canvas */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 text-left bg-slate-900" id="resume-scroller">
          <div
            ref={printAreaRef}
            className="bg-slate-950/65 border border-slate-905 p-6 sm:p-10 rounded-2.5xl space-y-8 text-slate-300"
            id="printable-resume-node"
          >
            {/* Header info */}
            <div className="border-b border-slate-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-white text-3xl font-extrabold tracking-tight">
                  {PROFILE_DATA.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  {PROFILE_DATA.titles.map((title, i) => (
                    <span key={i} className="text-teal-400 text-xs font-semibold uppercase tracking-wider">
                      {title} {i < PROFILE_DATA.titles.length - 1 ? '•' : ''}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs font-mono text-slate-400">
                <div className="flex gap-1.5">
                  <span className="text-slate-500 font-semibold uppercase">Phone:</span>
                  <span className="select-all">{PROFILE_DATA.contacts.phone}</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="text-slate-500 font-semibold uppercase">Email:</span>
                  <span className="select-all">{PROFILE_DATA.contacts.email}</span>
                </div>
                <div className="flex gap-1.5 col-span-2">
                  <span className="text-slate-500 font-semibold uppercase">Portfolio:</span>
                  <span className="select-all pr-4">{PROFILE_DATA.contacts.portfolioUrl}</span>
                </div>
              </div>
            </div>

            {/* Profile Bio summary */}
            <div className="space-y-3">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-teal-400 pl-2.5">
                Professional Overview Summary
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {PROFILE_DATA.bio}
              </p>
            </div>

            {/* Resume Skills Grid */}
            <div className="space-y-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-teal-400 pl-2.5">
                Technical competencies
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {SKILL_DATA.map((s) => (
                  <span
                    key={s.id}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-805/70 text-slate-300 text-xs font-medium font-mono"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Chronology Section */}
            <div className="space-y-6">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-teal-400 pl-2.5">
                Employment Highlights
              </h4>

              <div className="space-y-6">
                {EXPERIENCE_DATA.map((exp) => (
                  <div key={exp.id} className="space-y-2 print-break text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h5 className="text-white text-md font-bold tracking-tight">
                          {exp.role}
                        </h5>
                        <span className="text-teal-400 text-xs font-semibold">
                          {exp.company}
                        </span>
                      </div>
                      <span className="text-slate-500 text-xs font-mono font-medium">
                        {exp.duration}
                      </span>
                    </div>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {exp.description}
                    </p>

                    <ul className="list-disc pl-5 space-y-1 text-xxs sm:text-xs text-slate-500">
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className="leading-normal">
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="space-y-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest border-l-2 border-teal-400 pl-2.5">
                Academic Degrees
              </h4>

              <div className="space-y-1 text-left">
                {EDUCATION_DATA.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start gap-4">
                    <div>
                      <h5 className="text-white text-sm font-bold">
                        {edu.degree}
                      </h5>
                      <span className="text-slate-400 text-xs">
                        {edu.institution}
                      </span>
                    </div>
                    <span className="text-slate-500 text-xs font-mono">
                      Graduated {edu.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Modal footer information */}
        <div className="p-4 border-t border-slate-950 bg-slate-950/20 text-center rounded-b-3xl">
          <span className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">
            Press ESC or click overlay to quit viewer. Print layouts fit cleanly onto standard sizes.
          </span>
        </div>

      </motion.div>
    </div>
  );
}
