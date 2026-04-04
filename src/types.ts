export interface Project {
  id: string;
  title: string;
  description: string;
  threadUrl: string;
  imageUrl: string;
  techStack: string[];
  metrics?: string;
}

export interface Website {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Blockchain' | 'Backend' | 'Tools';
  icon: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatarUrl: string;
}

export interface ProjectSample {
  id: string;
  title: string;
  description: string;
  category: 'Content' | 'Community' | 'Dev';
  tweets: { url: string; screenshot: string; }[];
  coverImage: string;
  bannerImageUrl?: string;
  accentColor?: string;
}

export interface WebsiteShowcase {
  id: string;
  title: string;
  videoUrl: string;
  liveUrl: string;
  techStack: string[];
}

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

