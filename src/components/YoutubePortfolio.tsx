/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Youtube, Plus, Trash2, Edit2, Play, ExternalLink, Sparkles, AlertCircle, Loader2, Check } from 'lucide-react';
import { YoutubeVideoItem } from '../types';

// Pre-filled 5 long form videos representing high quality video editing, thumbnails & growth collaborations
const INITIAL_YOUTUBE_VIDEOS: YoutubeVideoItem[] = [
  {
    "id": "yt-1",
    "title": "01",
    "videoUrl": "https://youtu.be/KobK7xr5JSI?si=DTmbIQUf5kD--lya",
    "thumbnail": "/assets/images/regenerated_image_1781267610629.jpg",
    "category": "Video",
    "duration": "10:00",
    "views": "Active Video"
  },
  {
    "id": "yt-2",
    "title": "02",
    "videoUrl": "https://youtu.be/8r-sgvtJceg?si=WdxOJVsbGcOee3E-",
    "thumbnail": "/assets/images/regenerated_image_1781267614983.jpg",
    "category": "Video",
    "duration": "10:00",
    "views": "Active Video"
  },
  {
    "id": "yt-3",
    "title": "03",
    "videoUrl": "https://youtu.be/w3WMlzaKvV0?si=0yJ8Nxh2MCCAWeXN",
    "thumbnail": "/assets/images/regenerated_image_1781267619275.jpg",
    "category": "Video",
    "duration": "10:00",
    "views": "Active Video"
  },
  {
    "id": "yt-4",
    "title": "04",
    "videoUrl": "https://youtu.be/tyDM-2FlOuk?si=l-oW28OdJDGdxGyg",
    "thumbnail": "/assets/images/regenerated_image_1781267623794.jpg",
    "category": "Video",
    "duration": "10:00",
    "views": "145K views"
  },
  {
    "id": "yt-5",
    "title": "05",
    "videoUrl": "https://youtu.be/KQj3THLBdf4?si=HjKo1uy2SfAlHObb",
    "thumbnail": "/assets/images/regenerated_image_1781267629082.jpg",
    "category": "Video",
    "duration": "10:00",
    "views": "Active Video"
  }
];

// Helper to extract clean Youtube Video ID from any standard link format
const getYoutubeVideoId = (urlStr: string): string | null => {
  try {
    const url = urlStr.trim();
    // Match standard: youtube.com/watch?v=VIDEO_ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  } catch (e) {
    return null;
  }
};

const PRESET_YOUTUBE_THUMBNAILS = [
  { name: 'Education Marathon Prep', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=650&auto=format&fit=crop' },
  { name: 'Gaming Rig Action', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=650&auto=format&fit=crop' },
  { name: 'Outdoor Mountain Vlog', url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=650&auto=format&fit=crop' },
  { name: 'Creator Workspace Desk', url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=650&auto=format&fit=crop' },
  { name: 'Scale Analytics Insight', url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=650&auto=format&fit=crop' },
  { name: 'Minimal Creator Abstract', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=650&auto=format&fit=crop' }
];

export default function YoutubePortfolio() {
  const [videos, setVideos] = useState<YoutubeVideoItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<YoutubeVideoItem | null>(null);

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
        body: JSON.stringify({ videos: videos })
      });
      const resData = await response.json();
      if (resData.success) {
        setSaveMessage('🎉 Videos successfully written to source files! Your offline ZIP is ready to download.');
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

  // Link analyzer & inputs
  const [inputUrl, setInputUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [views, setViews] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  // Dual cover configuration states
  const [thumbnailType, setThumbnailType] = useState<'scraped' | 'preset' | 'custom'>('scraped');
  const [selectedPresetUrl, setSelectedPresetUrl] = useState(PRESET_YOUTUBE_THUMBNAILS[0].url);
  const [customThumbnailUrl, setCustomThumbnailUrl] = useState('');

  // Persists in localStorage
  useEffect(() => {
    let saved = localStorage.getItem('vishal_portfolio_yt_videos');
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
        localStorage.setItem('vishal_portfolio_yt_videos', saved);
      }
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Keep all items directly! Just ensure default images are upgraded if their path was broken or stale
          const mapped = parsed.map((item: YoutubeVideoItem) => {
            const defItem = INITIAL_YOUTUBE_VIDEOS.find(def => def.id === item.id);
            if (defItem) {
              if (
                item.thumbnail.includes('img.youtube.com') ||
                item.thumbnail.includes('/src/assets/images/') ||
                item.thumbnail.includes('\\src\\') ||
                item.thumbnail.includes('regenerated_image_1781248072557.png') ||
                item.thumbnail.includes('finance_thumbnail_1781246340300.jpg') ||
                item.thumbnail.includes('regenerated_image_1781249924397.png') ||
                item.thumbnail.includes('regenerated_image_1781249929738.png')
              ) {
                item.thumbnail = defItem.thumbnail;
              }
            }
            return item;
          });
          setVideos(mapped);
          localStorage.setItem('vishal_portfolio_yt_videos', JSON.stringify(mapped));
          return;
        }
      } catch (e) {
        console.error('Error parsing saved youtube videos', e);
      }
    }
    setVideos(INITIAL_YOUTUBE_VIDEOS);
    localStorage.setItem('vishal_portfolio_yt_videos', JSON.stringify(INITIAL_YOUTUBE_VIDEOS));
  }, []);

  const resetVideosToDefault = () => {
    if (confirm('Are you sure you want to reset all long videos to original defaults? All your customized videos will be reset.')) {
      saveVideos(INITIAL_YOUTUBE_VIDEOS);
    }
  };

  const saveVideos = (newVideos: YoutubeVideoItem[]) => {
    setVideos(newVideos);
    localStorage.setItem('vishal_portfolio_yt_videos', JSON.stringify(newVideos));
  };

  // Automated link analyzer to grab video metadata (thumbnail URL directly)
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputUrl(val);
    setScanStatus('idle');
  };

  const handleTriggerScrapper = () => {
    if (!inputUrl.trim()) return;
    const videoId = getYoutubeVideoId(inputUrl);

    if (!videoId) {
      setScanStatus('error');
      return;
    }

    setIsScanning(true);
    setScanStatus('idle');

    setTimeout(() => {
      setIsScanning(false);
      setScanStatus('success');

      // Set high-quality YouTube thumbnail
      const ytThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      setThumbnail(ytThumbnail);

      // Auto-extract placeholder title for editing if empty
      if (!title) {
        setTitle('New Collaborated YouTube Video');
      }
      if (!duration) {
        setDuration('12:30');
      }
      if (!views) {
        setViews('250K views');
      }
      if (!category) {
        setCategory('Video Edit');
      }
    }, 1000);
  };

  const openAddModal = () => {
    setEditingVideo(null);
    setInputUrl('');
    setTitle('');
    setDuration('');
    setViews('');
    setCategory('');
    setThumbnail('');
    setThumbnailType('scraped');
    setSelectedPresetUrl(PRESET_YOUTUBE_THUMBNAILS[0].url);
    setCustomThumbnailUrl('');
    setScanStatus('idle');
    setIsModalOpen(true);
  };

  const openEditModal = (video: YoutubeVideoItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingVideo(video);
    setInputUrl(video.videoUrl);
    setTitle(video.title);
    setDuration(video.duration);
    setViews(video.views || '');
    setCategory(video.category || '');
    
    // Determine thumbnail selection type
    const isPreset = PRESET_YOUTUBE_THUMBNAILS.some(p => p.url === video.thumbnail);
    if (isPreset) {
      setThumbnailType('preset');
      setSelectedPresetUrl(video.thumbnail);
    } else if (video.thumbnail && video.thumbnail.includes('img.youtube.com')) {
      setThumbnailType('scraped');
      setThumbnail(video.thumbnail);
    } else {
      setThumbnailType('custom');
      setCustomThumbnailUrl(video.thumbnail);
    }

    setScanStatus('success');
    setIsModalOpen(true);
  };

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Determine final thumbnail path based on category selections
    let finalThumb = '';
    if (thumbnailType === 'preset') {
      finalThumb = selectedPresetUrl;
    } else if (thumbnailType === 'custom') {
      finalThumb = customThumbnailUrl.trim() || PRESET_YOUTUBE_THUMBNAILS[0].url;
    } else {
      finalThumb = thumbnail.trim() || PRESET_YOUTUBE_THUMBNAILS[0].url;
    }

    if (editingVideo) {
      const updated = videos.map(v => v.id === editingVideo.id ? {
        ...v,
        title: title.trim(),
        videoUrl: inputUrl.trim() || v.videoUrl,
        thumbnail: finalThumb,
        duration: duration.trim() || '10:00',
        views: views.trim() || 'Active Video',
        category: category.trim() || 'Video'
      } : v);
      saveVideos(updated);
    } else {
      const newVideo: YoutubeVideoItem = {
        id: `yt-video-${Date.now()}`,
        title: title.trim(),
        videoUrl: inputUrl.trim() || 'https://youtube.com',
        thumbnail: finalThumb,
        duration: duration.trim() || '10:00',
        views: views.trim() || 'Active Video',
        category: category.trim() || 'Video'
      };
      saveVideos([newVideo, ...videos]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteVideo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this YouTube video entry?')) {
      const filtered = videos.filter(v => v.id !== id);
      saveVideos(filtered);
    }
  };

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden text-center" id="youtube-long-form">
      {/* Visual Ambient Overlays */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading info */}
        <div className="space-y-3 max-w-3xl mx-auto mb-16">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            YouTube Long Videos
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            High-retention video assets, strategic multi-camera audio syncing, and click-optimized thumbnails crafted to scale prominent publishers.
          </p>
        </div>

        {/* Action Buttons */}
        {isAdmin && (
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="flex flex-wrap justify-center items-center gap-4">
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 px-5 py-3 bg-red-650 hover:bg-red-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Custom Video</span>
              </button>
              <button
                onClick={resetVideosToDefault}
                className="flex items-center gap-2 px-5 py-3 bg-slate-950 border border-slate-800 hover:bg-slate-800 hover:text-red-400 text-slate-400 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all cursor-pointer"
              >
                Reset to Defaults
              </button>
              <button
                onClick={handleSyncToCodebase}
                disabled={isSavingCode}
                className="group flex items-center gap-2 px-5 py-3 bg-slate-950 border border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-slate-200 hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all cursor-pointer disabled:opacity-50"
                title="Save current custom lists permanently into the code so that downloaded ZIP builds have your edits pre-applied on Netlify."
              >
                <Check className={`w-4 h-4 text-red-500 ${isSavingCode ? 'animate-pulse' : ''}`} />
                <span>{isSavingCode ? 'Syncing to Disk...' : 'Save Permanently to ZIP'}</span>
              </button>
            </div>

            {saveMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-[#280f14]/95 border border-red-500/20 text-red-300 text-xs sm:text-sm max-w-lg shadow-xl flex items-center gap-2.5 mx-auto text-center"
              >
                <Sparkles className="w-4 h-4 text-red-400 shrink-0 animate-bounce" />
                <span>{saveMessage}</span>
              </motion.div>
            )}
          </div>
        )}

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="yt-videos-layout-grid">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -5 }}
              className="group bg-[#0b1222]/85 border border-slate-950/40 rounded-[2rem] overflow-hidden flex flex-col justify-between shadow-2xl relative hover:border-red-500/25 transition-all duration-300"
              id={`yt-video-card-${video.id}`}
            >
              {/* Media Container with Thumbnail */}
              <div 
                className="relative aspect-video overflow-hidden bg-slate-950 cursor-pointer"
                onClick={() => window.open(video.videoUrl, '_blank', 'noopener,noreferrer')}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glassmorphic gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 flex items-center justify-center opacity-70 group-hover:opacity-90 transition-opacity" />

                {/* Aesthetic pulsing play tag */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 bg-red-600 group-hover:bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 relative z-10">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </span>
                </div>

                {/* Duration badge tag */}
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/85 border border-white/10 text-[10px] font-semibold font-mono text-white tracking-wide relative z-20">
                  {video.duration}
                </div>
              </div>

              {/* Title & metrics labels */}
              <div className="p-6 flex-1 flex flex-col justify-between text-left space-y-4">
                <div 
                  className="space-y-2 cursor-pointer"
                  onClick={() => window.open(video.videoUrl, '_blank', 'noopener,noreferrer')}
                >
                  {video.category && (
                    <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-red-400 block">
                      {video.category}
                    </span>
                  )}
                  <h3 className="text-white text-base font-extrabold tracking-tight leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  {video.views && (
                    <span className="text-slate-400 text-xs font-semibold font-mono block pt-1">
                      {video.views}
                    </span>
                  )}
                </div>

                {/* Interactive Operations Row */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100/10 mt-auto">
                  {isAdmin ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(video)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-slate-805 hover:text-white text-slate-350 text-xxs font-bold transition-all cursor-pointer"
                        title="Edit Video Details"
                      >
                        <Edit2 className="w-3 h-3 text-red-500" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={(e) => handleDeleteVideo(video.id, e)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:bg-red-950 hover:border-red-800 hover:text-white text-slate-350 text-xxs font-bold transition-all cursor-pointer"
                        title="Delete from Portfolio"
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                        <span>Remove</span>
                      </button>
                    </div>
                  ) : (
                    <div />
                  )}

                  <button
                    onClick={() => window.open(video.videoUrl, '_blank', 'noopener,noreferrer')}
                    className="text-red-400 hover:text-red-350 text-xxs font-extrabold uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                  >
                    <span>Watch Video</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Adding/Editing YouTube Item Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10 overflow-y-auto max-h-[90vh]"
            >
              <div className="space-y-6 text-left">
                <div>
                  <h3 className="text-white text-xl font-bold tracking-tight">
                    {editingVideo ? 'Modify YouTube Video' : 'Add YouTube Video Link'}
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Input a YouTube URL (e.g. watch link). Our engine extracts the ID and designs the high-resolution max-res thumbnail dynamically!
                  </p>
                </div>

                {/* Input Link Scraper Bar */}
                <div className="bg-slate-950 rounded-2xl p-4.5 space-y-4 border border-slate-850">
                  <div className="space-y-1.5 flex flex-col">
                    <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block">Paste YouTube Link</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputUrl}
                        onChange={handleUrlChange}
                        placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                      <button
                        type="button"
                        onClick={handleTriggerScrapper}
                        disabled={isScanning || !inputUrl.trim()}
                        className="px-4 bg-red-600 hover:bg-red-500 disabled:bg-slate-805 disabled:text-slate-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                      >
                        {isScanning ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Fetching...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Scan Link</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {scanStatus === 'error' && (
                    <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400 text-xxs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Invalid link. Ensure to paste a standard YouTube video link.</span>
                    </div>
                  )}

                  {scanStatus === 'success' && (
                    <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20 text-teal-400 text-xxs flex items-center gap-2">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>YouTube link loaded. High-resolution Cover image generated dynamically!</span>
                    </div>
                  )}
                </div>

                {/* Form parameters */}
                <form onSubmit={handleSaveVideo} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block">YouTube Video Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Free Fire Ranked Push Best Clips"
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block">Video Category</label>
                      <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. Gaming Motion Promo"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block">Video Duration</label>
                      <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g. 15:45"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block">Views Count Label</label>
                    <input
                      type="text"
                      value={views}
                      onChange={(e) => setViews(e.target.value)}
                      placeholder="e.g. 540K views"
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  {/* Aesthetic Cover Selector blocks */}
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center bg-slate-950 p-2 rounded-xl border border-slate-850/80">
                      <label className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">Cover Poster Configuration</label>
                      <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 gap-1">
                        <button
                          type="button"
                          onClick={() => setThumbnailType('scraped')}
                          className={`px-2 py-1 text-[8px] font-bold uppercase rounded-md transition-all ${thumbnailType === 'scraped' ? 'bg-red-650 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                          Scraped
                        </button>
                        <button
                          type="button"
                          onClick={() => setThumbnailType('preset')}
                          className={`px-2 py-1 text-[8px] font-bold uppercase rounded-md transition-all ${thumbnailType === 'preset' ? 'bg-red-650 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                          Presets
                        </button>
                        <button
                          type="button"
                          onClick={() => setThumbnailType('custom')}
                          className={`px-2 py-1 text-[8px] font-bold uppercase rounded-md transition-all ${thumbnailType === 'custom' ? 'bg-red-650 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                          Custom URL
                        </button>
                      </div>
                    </div>

                    {thumbnailType === 'scraped' && (
                      <div className="space-y-2 p-3 bg-slate-950 border border-slate-850 rounded-xl">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          Current extracted poster image from URL link:
                        </span>
                        {thumbnail ? (
                          <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-800 bg-slate-900 group">
                            <img src={thumbnail} alt="Extracted Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-center text-[10px] text-white font-mono">
                              Auto generated from link ID
                            </div>
                          </div>
                        ) : (
                          <div className="py-6 text-center border border-dashed border-slate-800 rounded-lg text-slate-500 text-xs text-mono">
                            No thumbnail extracted. Hit 'Scan Link' above!
                          </div>
                        )}
                      </div>
                    )}

                    {thumbnailType === 'preset' && (
                      <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950 border border-slate-850 rounded-xl max-h-[140px] overflow-y-auto">
                        {PRESET_YOUTUBE_THUMBNAILS.map((img) => (
                          <button
                            key={img.url}
                            type="button"
                            onClick={() => setSelectedPresetUrl(img.url)}
                            className={`group relative aspect-video rounded-lg overflow-hidden border transition-all ${selectedPresetUrl === img.url ? 'border-red-500 ring-2 ring-red-500/20 scale-[0.97]' : 'border-slate-800 hover:border-slate-705'}`}
                          >
                            <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/45 flex items-end p-1.5 text-[7px] font-mono text-white tracking-tight truncate">
                              {img.name}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {thumbnailType === 'custom' && (
                      <div className="space-y-2">
                        <input
                          type="url"
                          placeholder="Paste custom Cover Image link (e.g. Unsplash URL)"
                          value={customThumbnailUrl}
                          onChange={(e) => setCustomThumbnailUrl(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                        />
                        {customThumbnailUrl && (
                          <div className="aspect-video rounded-lg overflow-hidden border border-slate-800 bg-slate-900 h-[100px] w-full">
                            <img src={customThumbnailUrl} alt="Custom Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=650'; }} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submit Operations */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3 bg-slate-950 border border-slate-850 hover:bg-slate-850 text-slate-300 font-bold rounded-xl text-xs sm:text-sm transition-all text-center cursor-pointer"
                    >
                      Dismiss
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg transition-all text-center cursor-pointer"
                    >
                      {editingVideo ? 'Apply Changes' : 'Confirm & Embed Video'}
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
