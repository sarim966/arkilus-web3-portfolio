import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Twitter, ExternalLink, ChevronRight } from 'lucide-react';
import { PROJECT_SAMPLES } from '../constants';

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const project = PROJECT_SAMPLES.find((p) => p.id === projectId);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#05000a] text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-black mb-4">Project Not Found</h1>
        <button onClick={() => navigate('/')} className="text-neon-purple hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Portfolio
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-[#05000a] text-white selection:bg-white/20 pb-24 relative"
    >
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:-translate-x-1 transition-all duration-300 absolute top-8 left-8 z-50"
      >
        <ArrowLeft size={16} />
        <span className="text-xs font-bold uppercase tracking-widest">Back</span>
      </button>

      {/* Hero / Header Container */}
      <section className="relative pt-32 pb-12 px-6 md:px-20 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <span className="px-4 py-1 rounded-full bg-purple-500/20 text-[#bc77ff] border border-purple-500/30 text-xs font-bold tracking-widest uppercase mb-6 inline-block">
            {project.category}
          </span>
          <h1 className="uppercase font-black italic tracking-tighter text-4xl md:text-6xl text-white drop-shadow-[0_0_25px_rgba(188,119,255,0.6)] mb-4 text-center">
            {project.title}
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-center">
            {project.description}
          </p>
        </div>
      </section>

      {/* Tweet Grid */}
      <section className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 mt-16 pb-24">
          {project.tweets.map((tweet, i) => (
            <TweetCard key={i} tweet={tweet} index={i + 1} projectId={project.id} />
          ))}
        </div>
      </section>
    </motion.div>
  );
}

interface TweetCardProps {
  tweet: { url: string; screenshot: string };
  index: number;
  projectId: string;
  key?: any; // Added to satisfy mapped JSX checks on some TS versions
}

const TweetCard = ({ tweet, index, projectId }: TweetCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.a 
      href={tweet.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#bc77ff]/50 transition-all duration-500 ease-out cursor-pointer group relative overflow-hidden h-full hover:-translate-y-2 hover:bg-white/[0.04] hover:shadow-[0_15px_40px_rgba(188,119,255,0.25)] flex flex-col"
    >
      <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-white/5 to-transparent rounded-xl border border-white/5 mb-4">
        {!imageError ? (
          <img 
            src={tweet.screenshot} 
            alt={`Tweet ${index} for ${projectId}`}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
            onError={() => setImageError(true)}
            loading="lazy"
            decoding="async"
          />
        ) : (
          // Fallback UI: Structured glass box with Twitter icon
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-white/3 backdrop-blur-sm border-b border-white/5 group-hover:bg-[#bc77ff]/5 transition-colors duration-300">
            <div className="w-12 h-12 rounded-full bg-[#bc77ff]/10 flex items-center justify-center text-[#bc77ff] shadow-lg shadow-[#bc77ff]/10 border border-[#bc77ff]/20 group-hover:scale-110 transition-transform">
              <Twitter size={20} />
            </div>
            <div className="text-[11px] font-bold text-white/60 uppercase tracking-widest mt-2 transition-colors duration-300 group-hover:text-[#bc77ff]">
              View Proof of Work on X
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05000a] via-transparent to-transparent opacity-30" />
      </div>

      <div className="mt-auto pt-4 flex justify-between items-center border-t border-white/5 text-white/80">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#bc77ff]/10 flex items-center justify-center text-[#bc77ff] transition-all duration-300 group-hover:bg-[#bc77ff]/20">
            <Twitter size={11} className="transition-colors duration-300 group-hover:text-[#bc77ff]" />
          </div>
          <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest transition-colors duration-300 group-hover:text-[#bc77ff]">Verify Status</span>
        </div>
        <ExternalLink size={14} className="text-white/40 transition-all duration-300 group-hover:text-[#bc77ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.a>
  );
};
