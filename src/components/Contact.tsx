/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Mail, Globe, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFILE_DATA } from '../data';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactTiles = [
    {
      icon: <Phone className="w-5 h-5 text-teal-400" />,
      title: 'Direct Call & Voice',
      info: PROFILE_DATA.contacts.phone,
      actionText: 'Call Now',
      href: `tel:${PROFILE_DATA.contacts.phone}`
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
      title: 'WhatsApp Connect',
      info: '+91 84298-94565',
      actionText: 'Direct Message',
      href: `https://wa.me/${PROFILE_DATA.contacts.whatsapp}`
    },
    {
      icon: <Mail className="w-5 h-5 text-indigo-400" />,
      title: 'Email Communications',
      info: PROFILE_DATA.contacts.email,
      actionText: 'Send Email',
      href: `mailto:${PROFILE_DATA.contacts.email}`
    },
  ];

  const valueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let valid = true;
    const tempErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      tempErrors.name = 'Please enter your name';
      valid = false;
    }
    if (!formData.email.trim()) {
      tempErrors.email = 'Please enter your email';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email format';
      valid = false;
    }
    if (!formData.message.trim()) {
      tempErrors.message = 'Please type your project details';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API dispatch latency
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-slate-900 relative overflow-hidden">
      {/* Decorative Lights */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -mr-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
        
        {/* Section Header */}
        <div className="mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/15 text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connection Portal</span>
          </div>
          <h2 className="text-white text-3.5xl sm:text-4xl font-extrabold tracking-tight">
            Let's Make Something <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Incredible</span>
          </h2>
          <p className="text-slate-400 max-w-xl font-normal text-sm sm:text-base leading-relaxed">
            Interested in scaling your brand? Leave a brief description or trigger a direct call using the links below.
          </p>
        </div>

        {/* Contact Split Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Tiles */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-white text-lg font-bold tracking-tight mb-5">
              Instant Communications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactTiles.map((tile, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2.5xl bg-slate-950/70 border border-slate-805 hover:border-slate-700/60 transition-all flex flex-col justify-between text-left group hover:shadow-lg shadow-sm"
                  id={`contact-tile-${idx}`}
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-805 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                      {tile.icon}
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-bold tracking-tight">
                        {tile.title}
                      </h4>
                      <p className="text-slate-400 text-xs mt-1 select-all break-all">
                        {tile.info}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-900/60">
                    <a
                      href={tile.href}
                      target={tile.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-teal-400 hover:text-white text-xs font-bold font-mono transition-colors cursor-pointer"
                      id={`contact-tile-${idx}-link`}
                    >
                      <span>{tile.actionText}</span>
                      <Send className="w-2.5 h-2.5 translate-x-0 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Note Card */}
            <div className="p-5 rounded-2.5xl bg-slate-950/40 border border-slate-805/60 text-slate-400 text-xs leading-relaxed flex gap-3 items-center">
              <span className="text-teal-400 text-lg">💡</span>
              <p>
                <strong>Priority Notice</strong>: Communication channels are monitored continuously. General inquiries or channel audits receive comprehensive responses within <strong>24 business hours</strong>.
              </p>
            </div>
          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-805 shadow-xl relative" id="contact-form-panel">
              
              {/* Success Screen Mask */}
              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-12 px-4 space-y-4"
                    id="contact-success-screen"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-lg text-emerald-400">
                      <CheckCircle2 className="w-10 h-10 animate-bounce" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-white text-xl font-bold tracking-tight">Transmission Secured!</h4>
                      <p className="text-slate-400 text-sm max-w-sm mx-auto">
                        Thank you for reaching out. Your project brief has been successfully logged. Vishal will connect back with you soon!
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-5 py-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all mt-4 cursor-pointer"
                      id="contact-success-reset-btn"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={formSubmit}
                    className="space-y-5"
                    noValidate
                    id="contact-direct-form"
                  >
                    <div className="border-b border-slate-900 pb-3 mb-2">
                      <h3 className="text-white text-lg font-bold tracking-tight">
                        Send Project Brief
                      </h3>
                      <p className="text-slate-500 text-xs">
                        Fill in your parameters and we will conceptualize the strategy together.
                      </p>
                    </div>

                    {/* Name input */}
                    <div className="space-y-1 text-left">
                      <label htmlFor="form-name" className="text-slate-400 text-xs font-bold uppercase tracking-wider block">
                        Your Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="form-name"
                          name="name"
                          value={formData.name}
                          onChange={valueChange}
                          placeholder="Full Name / Brand Name"
                          className={`w-full px-4 py-3 rounded-xl bg-slate-900 text-white border text-sm focus:outline-none focus:ring-1 transition-all ${
                            errors.name
                              ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500'
                              : 'border-slate-805 focus:ring-teal-400 focus:border-teal-400 bg-slate-900/40 hover:bg-slate-900'
                          }`}
                        />
                        {errors.name && (
                          <div className="text-red-400 text-xxs flex items-center gap-1 mt-1 font-mono">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.name}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Email input */}
                    <div className="space-y-1 text-left">
                      <label htmlFor="form-email" className="text-slate-400 text-xs font-bold uppercase tracking-wider block">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="form-email"
                          name="email"
                          value={formData.email}
                          onChange={valueChange}
                          placeholder="client@branddomain.com"
                          className={`w-full px-4 py-3 rounded-xl bg-slate-900 text-white border text-sm focus:outline-none focus:ring-1 transition-all ${
                            errors.email
                              ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500'
                              : 'border-slate-805 focus:ring-teal-400 focus:border-teal-400 bg-slate-900/40 hover:bg-slate-900'
                          }`}
                        />
                        {errors.email && (
                          <div className="text-red-400 text-xxs flex items-center gap-1 mt-1 font-mono">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message input */}
                    <div className="space-y-1 text-left">
                      <label htmlFor="form-message" className="text-slate-400 text-xs font-bold uppercase tracking-wider block">
                        Project Brief / Message
                      </label>
                      <div className="relative">
                        <textarea
                          id="form-message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={valueChange}
                          placeholder="Describe your goals (e.g. Graphic Thumbnail Design / Video Editing / Channel Optimization / Multi-cam setups)"
                          className={`w-full px-4 py-3 rounded-xl bg-slate-900 text-white border text-sm focus:outline-none focus:ring-1 transition-all resize-none ${
                            errors.message
                              ? 'border-red-500/50 focus:ring-red-500 focus:border-red-500'
                              : 'border-slate-805 focus:ring-teal-400 focus:border-teal-400 bg-slate-900/40 hover:bg-slate-900'
                          }`}
                        />
                        {errors.message && (
                          <div className="text-red-400 text-xxs flex items-center gap-1 mt-1 font-mono">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.message}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-650 hover:to-emerald-700 text-white rounded-2xl text-sm font-bold shadow-xl shadow-teal-500/15 hover:shadow-teal-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 focus:outline-none"
                      id="contact-form-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Dispatching Secure Payload...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Initiate Collaboration</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
