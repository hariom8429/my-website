/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  achievements: string[];
  tags: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  details?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  icon?: string;
  category: 'design' | 'management' | 'video' | 'general';
  level: number; // 1-5 for visual mapping
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'thumbnail' | 'video' | 'graphic';
  image: string;
  description: string;
  stats?: string;
  link?: string;
  videoUrl?: string; // For simulation
}

export interface ClientItem {
  id: string;
  name: string;
  handle: string;
  url: string;
  platform: 'youtube' | 'instagram';
  avatar: string;
  followers: string;
}

export interface YoutubeVideoItem {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  views?: string;
  category?: string;
}

