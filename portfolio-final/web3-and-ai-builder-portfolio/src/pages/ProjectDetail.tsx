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
      className="min-h-screen bg-[#05000a] text-white selection:bg-white/20 pb-24"
    >
      {/* Header / Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/40 backdrop-blur-md border-b border-white/5 flex justify-between items-center">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/10 hover:border-neon-purple/50 hover:bg-neon-purple/5 hover:text-neon-purple transition-all duration-300 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back</span>
        </button>
        
        <h1 className="text-lg font-black tracking-tight">{project.title}</h1>
        
        <div className="w-20" /> {/* Spacer for centering title */}
      </div>

      {/* Hero / Header Container */}
      <section className="relative pt-32 pb-12 px-6 md:px-20 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-[10px] font-black text-neon-purple uppercase tracking-widest bg-neon-purple/10 px-4 py-1.5 rounded-full mb-4 inline-block border border-neon-purple/20">
            {project.category}
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            {project.title}
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {project.description}
          </p>
        </div>
      </section>

      {/* Tweet Grid */}
      <section className="px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.tweets.map((tweet, i) => (
              <TweetCard key={i} tweet={tweet} index={i + 1} projectId={project.id} />
            ))}
          </div>
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
      whileHover={{ y: -5, scale: 1.01 }}
      className="group relative rounded-3xl overflow-hidden glass border border-white/5 hover:border-neon-purple/40 transition-all duration-300 flex flex-col hover:shadow-[0_0_25px_-5px_rgba(176,38,255,0.25)] h-full"
    >
      <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
        {!imageError ? (
          <img 
            src={tweet.screenshot} 
            alt={`Tweet ${index} for ${projectId}`}
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          // Fallback UI: Structured glass box with Twitter icon
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-white/3 backdrop-blur-sm border-b border-white/5 group-hover:bg-neon-purple/3 transition-colors duration-300">
            <div className="w-12 h-12 rounded-full bg-neon-purple/10 flex items-center justify-center text-neon-purple shadow-lg shadow-neon-purple/10 border border-neon-purple/20 group-hover:scale-110 transition-transform">
              <Twitter size={20} />
            </div>
            <div className="text-[11px] font-bold text-white/40 uppercase tracking-widest mt-2 group-hover:text-white/60 transition-colors">
              View Proof of Work on X
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05000a] via-transparent to-transparent opacity-50" />
      </div>

      <div className="p-4 bg-white/3 mt-auto flex justify-between items-center group-hover:bg-neon-purple/5 transition-colors border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-neon-purple/10 flex items-center justify-center text-neon-purple">
            <Twitter size={11} />
          </div>
          <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Verify Status</span>
        </div>
        <ExternalLink size={14} className="text-white/30 group-hover:text-neon-purple transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.a>
  );
};
