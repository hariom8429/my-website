/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Plus, Trash2, Link2, ExternalLink, Image as ImageIcon, Flame, Film, Sparkles, X, PlusCircle, Edit, Check } from 'lucide-react';

interface ReelItem {
  id: string;
  title: string;
  coverImage: string;
  instagramUrl: string;
  category: string;
  description?: string;
}

const DEFAULT_REELS: ReelItem[] = [
  {
    "id": "reel-1781250805616",
    "title": "01",
    "instagramUrl": "https://www.instagram.com/reel/DUsahd9k0iB/?igsh=MWYyc2Fibng4aTl0aw==",
    "coverImage": "/assets/images/regenerated_image_1781255562418.png",
    "category": "Instagram Reel"
  },
  {
    "id": "reel-1781250570601",
    "title": "02",
    "instagramUrl": "https://www.instagram.com/reel/DODWgpKEqpE/?igsh=MTRsdmo5eXAwZWFhMg==",
    "coverImage": "/assets/images/regenerated_image_1781255567077.png",
    "category": "Instagram Reel"
  },
  {
    "id": "reel-1781250270989",
    "title": "03",
    "instagramUrl": "https://www.instagram.com/reel/DUXAkckk-ol/?igsh=ZjVrazA5NG9pYjky",
    "coverImage": "/assets/images/regenerated_image_1781255571576.png",
    "category": "Instagram Reel"
  },
  {
    "id": "reel-1781250212848",
    "title": "04",
    "instagramUrl": "https://www.instagram.com/reel/DPNxDnmDNXm/?igsh=dWZsbnF3ODl0dThy",
    "coverImage": "/assets/images/regenerated_image_1781255581747.png",
    "category": "Instagram Reel"
  },
  {
    "id": "reel-1781250173475",
    "title": "06",
    "instagramUrl": "https://www.instagram.com/reel/DUP0gcDk63a/?igsh=MWFpMmU1aXFqeWZiNg==",
    "coverImage": "/assets/images/regenerated_image_1781250621118.png",
    "category": "Instagram Reel"
  },
  {
    "id": "reel-1781250083674",
    "title": "07",
    "instagramUrl": "https://www.instagram.com/reel/DNceKqig14v/?igsh=MTJwY3V3MHU1YjRpMw%3D%3D",
    "coverImage": "/assets/images/regenerated_image_1781250642303.png",
    "category": "Instagram Reel"
  },
  {
    "id": "reel-1",
    "title": "08",
    "coverImage": "/assets/images/regenerated_image_1781255567077.png",
    "instagramUrl": "https://www.instagram.com/reel/DUNMWdcjUy_/?igsh=M3ltcGs5MXBhb2Zr",
    "category": "Travel Vlog",
    "description": "High-speed cinematic transition matching visual patterns built for digital creators."
  },
  {
    "id": "reel-2",
    "title": "09",
    "coverImage": "/assets/images/regenerated_image_1781255571576.png",
    "instagramUrl": "https://www.instagram.com/reel/DUKkJAQExSS/?igsh=MWE0cGczdmZ5bHNqYw==",
    "category": "Fashion & Style",
    "description": "Neon color-graded portrait tracking with subtle lens flare overlays."
  },
  {
    "id": "reel-3",
    "title": "10",
    "coverImage": "/assets/images/regenerated_image_1781255581747.png",
    "instagramUrl": "https://www.instagram.com/reel/DM64fB4gnWg/?igsh=MXg1dWZ3cTA2b3ptMw==",
    "category": "Tech Show",
    "description": "A cozy developer setup view highlighting RGB accents and ambient keyboard macro edits."
  }
];

const PRESET_COVER_IMAGES = [
  { name: 'Travel Escape', url: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=300&auto=format&fit=crop' },
  { name: 'Tech Horizon', url: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=300&auto=format&fit=crop' },
  { name: 'Cyberpunk Rain', url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=300&auto=format&fit=crop' },
  { name: 'Aesthetic Fashion', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=300&auto=format&fit=crop' },
  { name: 'Gaming Zone', url: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=300&auto=format&fit=crop' },
  { name: 'Vibrant Cooking', url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=300&auto=format&fit=crop' }
];

export default function ReelsPortfolio() {
  const [reels, setReels] = useState<ReelItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReel, setEditingReel] = useState<ReelItem | null>(null);

  // Storage write sync states
  const [isSavingCode, setIsSavingCode] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSyncToCodebase = async () => {
    setIsSavingCode(true);
    setSaveMessage('');
    try {
      const response = await fetch('/api/sync-portfolio-codebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reels: reels })
      });
      const resData = await response.json();
      if (resData.success) {
        setSaveMessage('🎉 Reels successfully written to source files! Your offline ZIP is ready to download.');
        setTimeout(() => setSaveMessage(''), 8000);
      } else {
        setSaveMessage('❌ Failed to save: ' + (resData.error || 'Unknown error'));
      }
    } catch (e: any) {
      setSaveMessage('❌ Error syncing: ' + e.message);
    } finally {
      setIsSavingCode(false);
    }
  };

  const [isAdmin, setIsAdmin] = useState(() => {
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
  
  // Form input states
  const [title, setTitle] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [category, setCategory] = useState('Instagram Reel');
  const [coverType, setCoverType] = useState<'preset' | 'custom'>('preset');
  const [selectedPresetUrl, setSelectedPresetUrl] = useState(PRESET_COVER_IMAGES[0].url);
  const [customCoverUrl, setCustomCoverUrl] = useState('');
  const [description, setDescription] = useState('');

  // Load and persist inside localStorage
  useEffect(() => {
    let saved = localStorage.getItem('vishal_reels_portfolio');
    if (saved) {
      // Robust normalizer for backslashes, double backslashes and forward slashes referencing src/assets/images
      let normalized = saved
        .replace(/\\\\src\\\\assets\\\\images\\\\/gi, '/assets/images/')
        .replace(/\\src\\assets\\images\\/gi, '/assets/images/')
        .replace(/\\\\assets\\\\images\\\\/gi, '/assets/images/')
        .replace(/\\assets\\images\\/gi, '/assets/images/')
        .replace(/\/src\/assets\/images\//gi, '/assets/images/')
        .replace(/src\/assets\/images\//gi, '/assets/images/');
      if (normalized !== saved) {
        saved = normalized;
        // also fix any legacy incorrect filenames
        saved = saved.replace(/regenerated_image_1781250638325\.png/g, 'regenerated_image_1781250621118.png');
        localStorage.setItem('vishal_reels_portfolio', saved);
      }
      try {
        const parsed = JSON.parse(saved);
        const filtered = parsed.filter((item: ReelItem) => item.id !== 'reel-1781250191799' && item.id !== 'reel-4');
        const mapped = filtered.map((item: ReelItem) => {
          if (item.id === 'reel-1781250570601' || item.id === 'reel-1') item.coverImage = '/assets/images/regenerated_image_1781255567077.png';
          if (item.id === 'reel-1781250270989' || item.id === 'reel-2') item.coverImage = '/assets/images/regenerated_image_1781255571576.png';
          if (item.id === 'reel-1781250212848' || item.id === 'reel-3') item.coverImage = '/assets/images/regenerated_image_1781255581747.png';
          if (item.id === 'reel-1781250805616') item.coverImage = '/assets/images/regenerated_image_1781255562418.png';
          if (item.id === 'reel-1781250173475') item.coverImage = '/assets/images/regenerated_image_1781250621118.png';
          if (item.id === 'reel-1781250083674') item.coverImage = '/assets/images/regenerated_image_1781250642303.png';
          return item;
        });
        setReels(mapped);
        localStorage.setItem('vishal_reels_portfolio', JSON.stringify(mapped));
      } catch (err) {
        setReels(DEFAULT_REELS);
      }
    } else {
      setReels(DEFAULT_REELS);
    }
  }, []);

  const saveReelsList = (list: ReelItem[]) => {
    setReels(list);
    localStorage.setItem('vishal_reels_portfolio', JSON.stringify(list));
  };

  const openAddModal = () => {
    setEditingReel(null);
    setTitle('');
    setInstagramUrl('');
    setCategory('Instagram Reel');
    setCoverType('preset');
    setSelectedPresetUrl(PRESET_COVER_IMAGES[0].url);
    setCustomCoverUrl('');
    setDescription('');
    setIsFormOpen(true);
  };

  const openEditModal = (reel: ReelItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingReel(reel);
    setTitle(reel.title);
    setInstagramUrl(reel.instagramUrl);
    setCategory(reel.category);
    
    // Check if cover image is in presets
    const isPreset = PRESET_COVER_IMAGES.some(p => p.url === reel.coverImage);
    if (isPreset) {
      setCoverType('preset');
      setSelectedPresetUrl(reel.coverImage);
    } else {
      setCoverType('custom');
      setCustomCoverUrl(reel.coverImage);
    }
    setDescription(reel.description || '');
    setIsFormOpen(true);
  };

  const handleSaveReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !instagramUrl.trim()) return;

    const finalCover = coverType === 'preset' ? selectedPresetUrl : (customCoverUrl.trim() || PRESET_COVER_IMAGES[0].url);
    const formattedUrl = instagramUrl.trim().startsWith('http') ? instagramUrl.trim() : `https://${instagramUrl.trim()}`;

    if (editingReel) {
      // Edit mode
      const updated = reels.map(r => r.id === editingReel.id ? {
        ...r,
        title: title.trim(),
        instagramUrl: formattedUrl,
        coverImage: finalCover,
        category: category.trim(),
        description: description.trim() || undefined
      } : r);
      saveReelsList(updated);
    } else {
      // Add mode
      const newReel: ReelItem = {
        id: `reel-${Date.now()}`,
        title: title.trim(),
        instagramUrl: formattedUrl,
        coverImage: finalCover,
        category: category.trim(),
        description: description.trim() || undefined
      };
      const updated = [newReel, ...reels];
      saveReelsList(updated);
    }
    
    // Reset Form fields
    setTitle('');
    setInstagramUrl('');
    setCategory('Instagram Reel');
    setCustomCoverUrl('');
    setDescription('');
    setEditingReel(null);
    setIsFormOpen(false);
  };

  const handleDeleteReel = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this Reel item?')) {
      const filtered = reels.filter(r => r.id !== id);
      saveReelsList(filtered);
    }
  };

  return (
    <section id="reels" className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Background aesthetics */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="text-left space-y-3">
            <h2 className="text-white text-3.5xl sm:text-4xl font-extrabold tracking-tight">
              Instagram <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">Reels & Clips</span>
            </h2>
          </div>

          {/* Action Trigger Buttons */}
          {isAdmin && (
            <div className="flex flex-col items-end gap-3 self-center md:self-end">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={openAddModal}
                  className="flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-rose-950/20 transition-all duration-300 transform active:scale-95 cursor-pointer"
                  id="add-new-reel-trigger"
                >
                  <PlusCircle className="w-4.5 h-4.5" />
                  <span>Customize Verticals</span>
                </button>
                <button
                  onClick={handleSyncToCodebase}
                  disabled={isSavingCode}
                  className="group flex items-center gap-2 px-5 py-3.5 bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-slate-200 hover:text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition-all duration-300 transform active:scale-95 cursor-pointer disabled:opacity-50"
                  title="Save current custom lists permanently into the code so that downloaded ZIP builds have your edits pre-applied on Netlify."
                >
                  <Check className={`w-4 h-4 text-rose-400 ${isSavingCode ? 'animate-pulse' : ''}`} />
                  <span>{isSavingCode ? 'Syncing...' : 'Save Permanently to ZIP'}</span>
                </button>
              </div>

              {saveMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-xl bg-[#280d12]/95 border border-rose-550/20 text-rose-300 text-xxs sm:text-xs max-w-sm shadow-xl flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-rose-400 shrink-0 animate-bounce" />
                  <span>{saveMessage}</span>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* 9:16 Grid Portfolio */}
        {reels.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl p-8">
            <Instagram className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-bounce" />
            <p className="text-slate-400 font-medium">No 9:16 Reels added yet.</p>
            <button
              onClick={openAddModal}
              className="mt-4 text-rose-400 hover:text-white text-sm font-semibold underline underline-offset-4"
            >
              Add your first Reel now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8" id="reels-list-grid">
            {reels.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.45) }}
                className="group relative aspect-[9/16] bg-slate-900 border border-slate-850 rounded-[2rem] overflow-hidden flex flex-col justify-end shadow-xl hover:shadow-[0_8px_40px_rgba(244,63,94,0.12)] hover:border-rose-500/30 transition-all duration-500 cursor-pointer"
                id={`reel-card-${item.id}`}
                onClick={() => window.open(item.instagramUrl, '_blank', 'noopener,noreferrer')}
              >
                {/* Cover Image */}
                <div className="absolute inset-0">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover origin-center transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    id={`reel-card-img-${item.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-955/30 to-transparent" />
                </div>

                {/* Decorative Reel Frame lines */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                    <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase bg-black/45 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                      LIVE REC
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-black/45 backdrop-blur-md border border-white/10 text-white">
                    <Instagram className="w-3.5 h-3.5 text-rose-400" />
                  </div>
                </div>

                {/* Interactive Admin Edit & Delete Overlays */}
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex gap-2 z-25">
                    <button
                      onClick={(e) => openEditModal(item, e)}
                      className="p-1.5 rounded-lg bg-black/70 hover:bg-rose-600/90 text-slate-200 border border-white/10 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:outline-none cursor-pointer"
                      title="Edit Reel Link"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteReel(item.id, e)}
                      className="p-1.5 rounded-lg bg-black/70 hover:bg-red-650 text-slate-200 border border-white/10 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:outline-none cursor-pointer"
                      title="Delete custom Reel"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Prominent, visually striking cover-centered metadata details & 'CLICK HERE' banner */}
                <div className="absolute inset-x-0 bottom-4 z-20 px-4 space-y-3.5 flex flex-col items-center">
                  {/* Subtle Text Box Overlay */}
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 w-full text-center space-y-1 shadow-lg">
                    <h4 className="text-white text-sm font-bold tracking-tight line-clamp-1 leading-snug">
                      {item.title}
                    </h4>
                  </div>

                  {/* PROMINENT ALWAYS VISIBLE CLICK HERE PLAY BUTTON OR CARD */}
                  <div className="w-full py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:via-pink-600 hover:to-rose-700 text-white text-xs font-extrabold leading-none uppercase tracking-widest rounded-xl text-center shadow-[0_4px_22px_rgba(244,63,94,0.45)] flex items-center justify-center gap-2 border border-white/10 group-hover:scale-[1.03] transition-transform duration-300">
                    <Instagram className="w-4 h-4 fill-white stroke-0 animate-bounce" />
                    <span>Click Here</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}

        {/* Dynamic Modal Creator / Customizer Panel */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
              id="reels-creator-modal-overlay"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl relative p-6 sm:p-8 text-left my-8"
                id="reels-creator-modal-container"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-950 border border-slate-800 focus:outline-none cursor-pointer"
                  id="close-reels-modal-btn"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-rose-500/10 rounded-xl">
                      <Instagram className="w-5 h-5 text-rose-400" />
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-bold tracking-tight">
                        {editingReel ? 'Edit 9:16 Video' : 'Add 9:16 Video'}
                      </h3>
                      <p className="text-slate-400 text-xs">
                        {editingReel ? 'Modify the Instagram Video Redirect link and details for this card.' : 'Add an Instagram Video Link and customize its cover poster image.'}
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveReel} className="space-y-4 pt-2">
                    {/* Item Title */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Video Action Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Cinematic Cooking Vlog Edit"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500/30 transition-all"
                      />
                    </div>

                    {/* Instagram Reel Link */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Instagram Reel / Video Redirect Link</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. www.instagram.com/reel/C89xYz..."
                        value={instagramUrl}
                        onChange={(e) => setInstagramUrl(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500/30 transition-all"
                      />
                    </div>

                    {/* Category Label */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Category Label</label>
                      <input
                        type="text"
                        placeholder="e.g. Editing Reel, Food Short"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500/30 transition-all"
                      />
                    </div>

                    {/* Description Text */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Description Summary</label>
                      <textarea
                        rows={2}
                        placeholder="Optional brief design summary showing during card focus or hover..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500/30 transition-all resize-none"
                      />
                    </div>

                    {/* Cover Photo Configuration */}
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">Cover Image Configuration</label>
                        <div className="flex bg-slate-950 p-1.5 rounded-lg border border-slate-800 gap-1.5">
                          <button
                            type="button"
                            onClick={() => setCoverType('preset')}
                            className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md transition-all ${coverType === 'preset' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'}`}
                          >
                            Presets
                          </button>
                          <button
                            type="button"
                            onClick={() => setCoverType('custom')}
                            className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md transition-all ${coverType === 'custom' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'}`}
                          >
                            Custom URL
                          </button>
                        </div>
                      </div>

                      {/* Cover Photo Selectors */}
                      {coverType === 'preset' ? (
                        <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-slate-950 border border-slate-800/60 max-h-[140px] overflow-y-auto">
                          {PRESET_COVER_IMAGES.map((img) => (
                            <button
                              key={img.url}
                              type="button"
                              onClick={() => setSelectedPresetUrl(img.url)}
                              className={`group relative aspect-[9/16] rounded-xl overflow-hidden border transition-all ${selectedPresetUrl === img.url ? 'border-rose-500 ring-2 ring-rose-500/25 scale-[0.97]' : 'border-slate-800'}`}
                            >
                              <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/25 flex items-end p-1.5 text-[8px] font-mono text-white tracking-tight truncate">
                                {img.name}
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <input
                          type="url"
                          placeholder="Paste custom Cover Image link (e.g. Unsplash URL)"
                          value={customCoverUrl}
                          onChange={(e) => setCustomCoverUrl(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500/30 transition-all"
                        />
                      )}
                    </div>

                    {/* CTA Actions */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="flex-1 py-3 bg-slate-950 text-slate-350 hover:bg-slate-800/80 hover:text-white font-bold rounded-xl text-xs sm:text-sm border border-slate-800 transition-all text-center cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all text-center cursor-pointer"
                      >
                        {editingReel ? 'Update Reel Card' : 'Inject 9:16 Reel'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

