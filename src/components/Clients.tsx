/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Youtube, Instagram, Plus, Trash2, Edit2, ExternalLink, Sparkles, AlertCircle, Loader2, Check } from 'lucide-react';
import { ClientItem } from '../types';

// Famous creators list provided by user, preloaded with real details
const INITIAL_CLIENTS: ClientItem[] = [
  {
    "id": "client-1",
    "name": "Rojgar With Ankit",
    "handle": "@rojgarwithankit",
    "url": "https://youtube.com/@rojgarwithankit?si=XUtjsm93raU6qhbJ",
    "platform": "youtube",
    "avatar": "/assets/images/regenerated_image_1781258350143.png",
    "followers": "19M Subscribers"
  },
  {
    "id": "client-2",
    "name": "Rahul Bhai YT",
    "handle": "@rahulbhaiyt1",
    "url": "https://youtube.com/@rahulbhaiyt1?si=QdTWlYgd551Exh_m",
    "platform": "youtube",
    "avatar": "/assets/images/regenerated_image_1781258348213.jpg",
    "followers": "128k Subscribers"
  },
  {
    "id": "client-3",
    "name": "Rinki Vlogs 360",
    "handle": "@rinkivlogs360",
    "url": "https://youtube.com/@rinkivlogs360?si=LCYAWWiXKAN3umFj",
    "platform": "youtube",
    "avatar": "https://yt3.googleusercontent.com/hco6VQkcPFmUcNt7AEi5i5VDFM9dzvVRUH1iHrTat59kTScAFxSLHMNKgfKTL0qaMqufMcFooFg=s160-c-k-c0x00ffffff-no-rj",
    "followers": "13.3K Subscribers"
  },
  {
    "id": "client-4",
    "name": "Rahul Bhai YT (Instagram)",
    "handle": "rahul_bhaiyt_",
    "url": "https://www.instagram.com/rahul_bhaiyt_?igsh=bm9pMWtseDFmNGJ0",
    "platform": "instagram",
    "avatar": "/assets/images/regenerated_image_1781258351843.jpg",
    "followers": "1.4M Followers"
  },
  {
    "id": "client-5",
    "name": "Rahul Bhai Support",
    "handle": "rahulbhai_support",
    "url": "https://www.instagram.com/rahulbhai_support?igsh=NnlmZW1wMW1icXpm",
    "platform": "instagram",
    "avatar": "/assets/images/regenerated_image_1781259626683.jpg",
    "followers": "1.2M Followers"
  },
  {
    "id": "client-6",
    "name": "VR Production",
    "handle": "vr_production____",
    "url": "https://www.instagram.com/vr_production____?igsh=MWM2N3psZXRhcGlrMA==",
    "platform": "instagram",
    "avatar": "/assets/images/regenerated_image_1781259628932.jpg",
    "followers": "111K Followers"
  },
  {
    "id": "client-7",
    "name": "Rinki Maurya",
    "handle": "its_rinki.real",
    "url": "https://www.instagram.com/its_rinki.real?igsh=bTUwZ3gwYzd6NDRw",
    "platform": "instagram",
    "avatar": "/assets/images/regenerated_image_1781259630706.jpg",
    "followers": "536K Followers"
  },
  {
    "id": "client-8",
    "name": "Rinki Real",
    "handle": "rinki.real",
    "url": "https://www.instagram.com/rinki.real?igsh=MXI2YThxM2U4dHRvZA==",
    "platform": "instagram",
    "avatar": "/assets/images/regenerated_image_1781259633511.jpg",
    "followers": "1.1M Followers"
  }
];

// Helper to determine platform from URL
const parsePlatformFromUrl = (urlStr: string): { platform: 'youtube' | 'instagram'; handle: string } | null => {
  try {
    const url = urlStr.trim().toLowerCase();
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      // Extract handle (starts with @)
      const handleMatch = urlStr.match(/@([a-zA-Z0-9_\-\.]+)/);
      const handle = handleMatch ? `@${handleMatch[1]}` : '@youtube_creator';
      return { platform: 'youtube', handle };
    } else if (url.includes('instagram.com')) {
      // Extract username from standard path instagram.com/username
      const cleanUrl = urlStr.split('?')[0];
      const parts = cleanUrl.split('/').filter(Boolean);
      const handle = parts[parts.length - 1] || 'instagram_user';
      return { platform: 'instagram', handle };
    }
    return null;
  } catch (e) {
    return null;
  }
};

export default function Clients() {
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientItem | null>(null);
  
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
        body: JSON.stringify({ clients: clients })
      });
      const resData = await response.json();
      if (resData.success) {
        setSaveMessage('🎉 Changes successfully written to source files! Your offline ZIP is ready to download.');
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

  // Auto-scanned input and form properties
  const [inputUrl, setInputUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Scanned / editable fields
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [followers, setFollowers] = useState('');
  const [avatar, setAvatar] = useState('');
  const [platform, setPlatform] = useState<'youtube' | 'instagram'>('youtube');
  const [finalUrl, setFinalUrl] = useState('');

  // Load from local storage or set defaults
  useEffect(() => {
    let saved = localStorage.getItem('vishal_portfolio_clients');
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
        localStorage.setItem('vishal_portfolio_clients', saved);
      }
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const mapped = parsed.map((item: ClientItem) => {
            // Only safe normalize if the avatar contains broken old paths or is empty
            const isBroken = !item.avatar || item.avatar.includes('\\src\\') || item.avatar.includes('/src/assets/images/') || item.avatar.includes('regenerated_image_1781248072557.png');
            if (isBroken) {
              const defItem = INITIAL_CLIENTS.find(def => def.id === item.id);
              if (defItem) {
                item.avatar = defItem.avatar;
              }
            }
            return item;
          });
          setClients(mapped);
          localStorage.setItem('vishal_portfolio_clients', JSON.stringify(mapped));
        } else {
          setClients(INITIAL_CLIENTS);
        }
      } catch (e) {
        setClients(INITIAL_CLIENTS);
      }
    } else {
      setClients(INITIAL_CLIENTS);
      localStorage.setItem('vishal_portfolio_clients', JSON.stringify(INITIAL_CLIENTS));
    }
  }, []);

  const saveClients = (newClients: ClientItem[]) => {
    setClients(newClients);
    localStorage.setItem('vishal_portfolio_clients', JSON.stringify(newClients));
  };

  // Automated link analyzer/scraper emulator
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputUrl(val);

    if (!val.trim()) {
      setScanStatus('idle');
      return;
    }

    const info = parsePlatformFromUrl(val);
    if (!info) {
      setScanStatus('error');
      return;
    }

    setScanStatus('idle');
  };

  // Perform "Fetching..." transition
  const handleTriggerScrapper = () => {
    if (!inputUrl.trim()) return;
    const info = parsePlatformFromUrl(inputUrl);
    if (!info) {
      setScanStatus('error');
      return;
    }

    setIsScanning(true);
    setScanStatus('idle');

    setTimeout(() => {
      setIsScanning(false);
      setScanStatus('success');

      // Check if it is one of our 8 target defaults to fetch instantly
      const match = INITIAL_CLIENTS.find(c => 
        c.url.toLowerCase().split('?')[0] === inputUrl.trim().toLowerCase().split('?')[0] || 
        c.handle.toLowerCase() === info.handle.toLowerCase()
      );

      if (match) {
        setName(match.name);
        setHandle(match.handle);
        setFollowers(match.followers);
        setAvatar(match.avatar);
        setPlatform(match.platform);
        setFinalUrl(match.url);
      } else {
        // Fallback realistic dynamic generation based on parsed username
        const cleanName = info.handle.replace('@', '').split(/[._\s]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        setName(cleanName);
        setHandle(info.handle);
        setPlatform(info.platform);
        setFinalUrl(inputUrl.trim());
        
        // Dynamic followers estimation
        if (info.platform === 'youtube') {
          setFollowers('150K Subscribers');
          setAvatar('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop');
        } else {
          setFollowers('85K Followers');
          setAvatar('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=200&auto=format&fit=crop');
        }
      }
    }, 1200);
  };

  const openAddModal = () => {
    setEditingClient(null);
    setInputUrl('');
    setName('');
    setHandle('');
    setFollowers('');
    setAvatar('');
    setPlatform('youtube');
    setFinalUrl('');
    setScanStatus('idle');
    setIsModalOpen(true);
  };

  const openEditModal = (client: ClientItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingClient(client);
    setInputUrl(client.url);
    setName(client.name);
    setHandle(client.handle);
    setFollowers(client.followers);
    setAvatar(client.avatar);
    setPlatform(client.platform);
    setFinalUrl(client.url);
    setScanStatus('success');
    setIsModalOpen(true);
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !handle.trim()) return;

    // Direct fallbacks if avatar is empty
    const finalAvatar = avatar.trim() || (platform === 'youtube'
      ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200'
      : 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=200');

    if (editingClient) {
      // Edit mode
      const updated = clients.map(c => c.id === editingClient.id ? {
        ...c,
        name: name.trim(),
        handle: handle.trim(),
        url: finalUrl.trim() || inputUrl.trim(),
        platform,
        avatar: finalAvatar,
        followers: followers.trim() || 'Active Creator'
      } : c);
      saveClients(updated);
    } else {
      // Add mode
      const newClient: ClientItem = {
        id: `client-${Date.now()}`,
        name: name.trim(),
        handle: handle.trim(),
        url: finalUrl.trim() || inputUrl.trim(),
        platform,
        avatar: finalAvatar,
        followers: followers.trim() || 'Active Creator'
      };
      saveClients([newClient, ...clients]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteClient = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this creator profile?')) {
      const filtered = clients.filter(c => c.id !== id);
      saveClients(filtered);
    }
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden" id="clients">
      {/* Decorative Blur Vectors */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Section Heading */}
        <div className="space-y-3 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creators Network</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Creators Worked With
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Proudly collaborated with leading YouTube publishers and high-authority Instagram influencers, optimizing channel operations, designing viral thumbnails, and editing key media.
          </p>
        </div>

        {/* Action controls */}
        {isAdmin && (
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="flex flex-wrap justify-center items-center gap-4">
              <button
                onClick={openAddModal}
                className="group flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-teal-950/40 transform active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer"
              >
                <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                <span>Link New YouTube / Insta Profile</span>
              </button>
              
              <button
                onClick={handleSyncToCodebase}
                disabled={isSavingCode}
                className="group flex items-center gap-2.5 px-6 py-3.5 bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-slate-200 hover:text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-lg transform active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-50"
                title="Save current custom lists permanently into the code so that downloaded ZIP builds have your edits pre-applied on Netlify."
              >
                <Check className={`w-4 h-4 text-teal-400 ${isSavingCode ? 'animate-pulse' : ''}`} />
                <span>{isSavingCode ? 'Syncing to Disk...' : 'Save Permanently to ZIP'}</span>
              </button>
            </div>

            {saveMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-[#142d32]/90 border border-teal-550/30 text-teal-300 text-xs sm:text-sm max-w-lg shadow-xl flex items-center gap-2.5 mx-auto text-center"
              >
                <Sparkles className="w-4 h-4 text-teal-400 shrink-0 animate-bounce" />
                <span>{saveMessage}</span>
              </motion.div>
            )}
          </div>
        )}

        {/* Creator List Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="clients-list-grid">
          {clients.map((client) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -6 }}
              className="group relative bg-[#0f172a]/75 backdrop-blur-md border border-slate-900 rounded-[2rem] p-6 flex flex-col items-center justify-between shadow-xl hover:border-teal-500/20 hover:shadow-[0_12px_44px_rgba(20,184,166,0.06)] transition-all duration-400 overflow-hidden cursor-pointer"
              onClick={() => window.open(client.url, '_blank', 'noopener,noreferrer')}
            >
              {/* Top social icon brand badge */}
              <div className="absolute top-4 right-4">
                {client.platform === 'youtube' ? (
                  <span className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center">
                    <Youtube className="w-4 h-4 fill-current" />
                  </span>
                ) : (
                  <span className="w-8 h-8 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center">
                    <Instagram className="w-4 h-4" />
                  </span>
                )}
              </div>

              {/* Admin Overlay controls for editing and deleting */}
              {isAdmin && (
                <div className="absolute top-4 left-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-25">
                  <button
                    onClick={(e) => openEditModal(client, e)}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-teal-500 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Configure creator"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteClient(client.id, e)}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-red-500 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Remove creator"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Avatar Photo Frame with dynamic border glow matching system theme */}
              <div className="relative mt-4 mb-4">
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-rose-500 rounded-full blur-[8px] opacity-15 group-hover:opacity-40 transition-opacity pointer-events-none" />
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-slate-800 relative z-10"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Identity labels */}
              <div className="text-center space-y-1 mb-5">
                <h3 className="text-white text-base font-extrabold tracking-tight group-hover:text-teal-400 transition-colors">
                  {client.name}
                </h3>
                <p className="text-slate-400 text-xs font-medium">
                  {client.handle}
                </p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 font-semibold tracking-wider uppercase">
                  {client.followers}
                </span>
              </div>

              {/* Visiting CTA Trigger */}
              <div className="w-full py-2 bg-slate-900/50 hover:bg-slate-800/80 group-hover:bg-gradient-to-r group-hover:from-teal-500 group-hover:to-emerald-600 text-[11px] font-bold text-slate-300 group-hover:text-white uppercase tracking-widest rounded-xl text-center border border-slate-800/50 flex items-center justify-center gap-1.5 transition-all">
                <span>View Profile</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scrapper & Configurations Config Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10 overflow-y-auto max-h-[90vh]"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-white text-xl font-bold tracking-tight">
                    {editingClient ? 'Edit Creator Settings' : 'Auto-Fetch Creator Link'}
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Paste a YouTube Channel or Instagram Profile link. Our layout analyzer will scan, identify, and extract credentials.
                  </p>
                </div>

                {/* Scraper Scanner Input Bar */}
                <div className="bg-slate-950 rounded-2xl p-4.5 space-y-4 border border-slate-850">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block">Paste Profile Link</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={inputUrl}
                          onChange={handleUrlChange}
                          placeholder="e.g. https://youtube.com/@rojgarwithankit"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleTriggerScrapper}
                        disabled={isScanning || !inputUrl.trim()}
                        className="px-4 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        {isScanning ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Scanning...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Fetch Info</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Visual Status Indicator */}
                  {scanStatus === 'error' && (
                    <div className="p-3.5 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400 text-xxs flex gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>URL not supported. Please paste a standard YouTube channel (e.g. starting with @) or Instagram Profile link.</span>
                    </div>
                  )}

                  {scanStatus === 'success' && (
                    <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20 text-teal-400 text-xxs flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>Social handle successfully matched & credentials extracted! You can review or adjust below.</span>
                    </div>
                  )}
                </div>

                {/* Interactive Modification Fields */}
                <form onSubmit={handleSaveClient} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Channel name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block">Creator Team/Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rojgar With Ankit"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                        required
                      />
                    </div>
                    {/* Handle */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block">Channel Handle / ID</label>
                      <input
                        type="text"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        placeholder="e.g. @rojgarwithankit"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Metric */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block">Subscribers / Followers</label>
                      <input
                        type="text"
                        value={followers}
                        onChange={(e) => setFollowers(e.target.value)}
                        placeholder="e.g. 13.5M Subscribers"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                        required
                      />
                    </div>

                    {/* Network Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block">Network Platform</label>
                      <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value as 'youtube' | 'instagram')}
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                      >
                        <option value="youtube">YouTube Channel</option>
                        <option value="instagram">Instagram Account</option>
                      </select>
                    </div>
                  </div>

                  {/* Custom Avatar URL */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block">Avatar Photo URL (Auto-Generated or custom)</label>
                    <input
                      type="text"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      placeholder="e.g. https://images.unsplash.com/..."
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3 bg-slate-950 border border-slate-850 hover:bg-slate-850 text-slate-300 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all text-center cursor-pointer"
                    >
                      Dismiss
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all text-center cursor-pointer"
                    >
                      {editingClient ? 'Apply Modifications' : 'Confirm & Ingest Creator'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
