import React from 'react';
import { motion } from 'motion/react';
import { TIMELINE } from '../../constants';

const ExperienceCard = ({ item, index }: { item: any; index: number }) => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass group relative p-8 md:p-10 rounded-2xl hover:border-[#b026ff] transition-all duration-300 overflow-hidden w-full snap-center"
    >
      {/* Animated radial hover background effect */}
      <div 
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(176, 38, 255, 0.06), transparent 80%)`
        }}
      />
      
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 relative z-10 w-full">
        <div className="md:w-1/3 flex flex-col justify-start">
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs font-bold tracking-widest uppercase mb-4 border border-purple-500/30 w-fit">
            {item.period}
          </div>
          <h4 className="text-2xl font-bold text-white tracking-tight">{item.company}</h4>
        </div>
        
        <div className="md:w-2/3 flex flex-col">
          <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4 tracking-tighter">
            {item.role}
          </h3>
          <p className="text-gray-400 text-[15px] leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const ExperienceHistory = () => {
  return (
    <section id="experience" className="experience-container w-full h-auto flex flex-col justify-center items-center py-16 lg:py-24 bg-[#05000a] relative overflow-hidden">
      <style>{`
        .experience-container {
          zoom: 0.85;
        }
        @media (max-width: 768px) {
          .experience-container {
            zoom: 1;
          }
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <div className="w-full max-w-[1100px] mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="uppercase font-black italic tracking-tighter text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-[0_0_15px_rgba(176,38,255,0.5)] mb-6">
              EXPERIENCE
            </h2>
            <p className="text-white/40 text-sm md:text-base max-w-2xl uppercase tracking-widest leading-relaxed">
              My journey through the decentralized ecosystem.
            </p>
          </motion.div>
        </div>

        <div className="w-full max-h-[680px] overflow-y-auto snap-y snap-mandatory scrollbar-none space-y-6 pr-2 pb-32">
          {TIMELINE.map((item, index) => (
            <ExperienceCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
