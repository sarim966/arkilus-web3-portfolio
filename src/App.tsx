/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Twitter, 
  Github, 
  ExternalLink, 
  Download, 
  Bot, 
  Wallet, 
  Cpu, 
  MessageSquare, 
  Layout, 
  Code2, 
  Database, 
  Zap, 
  FileCode,
  Mail,
  ChevronRight,
  Menu,
  X,
  Globe,
  Link as LinkIcon,
  ArrowUpRight,
  Check,
  Trophy,
  PenTool,
  Users,
  Layers
} from 'lucide-react';
import { PROJECT_SAMPLES, WEBSITE_SHOWCASE, EXPERTISE, SKILLS, TIMELINE, TESTIMONIALS, SOCIAL_LINKS } from './constants';
import { ProjectSample, WebsiteShowcase, ExpertiseItem, TimelineItem } from './types';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProjectDetail from './pages/ProjectDetail';
import ProjectsPage, { mappedProjects } from './pages/ProjectsPage';
import TeamShowcase from './components/ui/team-showcase';
import { Gallery4 } from './components/ui/website-gallery';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Projects', href: location.pathname === '/' ? '#projects' : '/projects' },
    { name: 'Websites', href: '#websites' },
    { name: 'Services', href: '#services' },
    { name: 'Experience', href: '#experience' },
  ];

  return (
    <div className="flex justify-center w-full fixed top-8 z-50 px-4">
      <nav 
        onMouseMove={handleMouseMove}
        className="w-full max-w-5xl rounded-full bg-white px-4 py-2 flex justify-between items-center shadow-2xl relative overflow-hidden group/nav"
      >
        {/* Glow absolute tracker following mouse */}
        <div 
          className="absolute inset-0 bg-neon-purple/5 opacity-0 group-hover/nav:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(176, 38, 255, 0.15), transparent 70%)`
          }}
        />

        <div className="flex items-center gap-3 pl-2 relative z-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20">
            A
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-[#1a1a1a] text-sm tracking-tighter">ARKILUS</span>
            <span className="text-[10px] text-neon-purple font-medium italic opacity-70">WEB3 PORTFOLIO</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-8 relative z-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[11px] font-black text-[#1a1a1a] hover:text-neon-purple transition-colors uppercase tracking-[0.2em]"
            >
              {link.name}
            </a>
          ))}
        </div>
        
        <div className="hidden md:block pr-1 relative z-10">
          <button 
            onMouseEnter={() => setIsConnectOpen(true)}
            onMouseLeave={() => setIsConnectOpen(false)}
            className="px-6 py-3 bg-[#2a2420] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-[#3d342e] transition-colors flex items-center gap-2 relative z-10"
          >
            Connect
          </button>
          
          <AnimatePresence>
            {isConnectOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                onMouseEnter={() => setIsConnectOpen(true)}
                onMouseLeave={() => setIsConnectOpen(false)}
                className="absolute top-12 right-0 bg-white shadow-2xl rounded-2xl p-4 border border-black/5 w-48 flex flex-col gap-2 z-50"
              >
                {[
                  { icon: <Twitter size={14} />, name: 'Twitter (X)', href: SOCIAL_LINKS.twitter },
                  { icon: <Globe size={14} />, name: 'Telegram', href: SOCIAL_LINKS.telegram },
                  { icon: <Github size={14} />, name: 'GitHub', href: SOCIAL_LINKS.github }
                ].map((item, index) => (
                  <a 
                    key={index} 
                    href={item.href} 
                    target="_blank" 
                    className="flex items-center gap-3 p-2 hover:bg-neon-purple/5 rounded-xl transition-colors text-[11px] font-bold text-[#1a1a1a] hover:text-neon-purple"
                  >
                    <div className="text-neon-purple">{item.icon}</div>
                    {item.name}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#1a1a1a] p-2 relative z-10" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-20 left-4 right-4 bg-white rounded-[2rem] md:hidden py-8 flex flex-col items-center gap-6 shadow-2xl z-40 border border-black/5"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-sm font-black text-[#1a1a1a] hover:text-neon-purple uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="px-8 py-4 w-3/4 text-center bg-[#2a2420] text-white text-xs font-black uppercase tracking-widest rounded-full"
            >
              Connect
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 pointer-events-none"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-0 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-20 relative z-10 w-full pt-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Header Section */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-8 tracking-tight">
            <span className="font-medium">ARKILUS</span> <span className="font-black italic">WEB3</span><br />
            <span className="font-light italic opacity-90">PORTFOLIO</span>
          </h1>

          {/* New Pill Button Style */}
          <div className="flex mb-16">
            <button className="bg-white text-black py-3 px-8 rounded-full font-bold flex items-center gap-4 hover:bg-white/90 transition-all shadow-xl group">
              <span className="text-sm">Explore my works</span>
              <div className="w-8 h-8 rounded-full bg-neon-purple flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <ArrowUpRight size={18} />
              </div>
            </button>
          </div>

          {/* Bottom Left Features (Inspired by the medical UI) */}
          <div className="flex flex-col gap-4 mt-12">
            {[
              "Content creator + Community manager + Builder",
              "Specializing in decentralized architecture and modern Web3",
              "Turning complex concepts into scalable systems"
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4 text-white/60 group">
                <div className="mt-1 w-5 h-5 rounded-full border border-white/20 flex items-center justify-center group-hover:border-neon-purple transition-colors">
                  <Check size={10} className="text-white group-hover:text-neon-purple" />
                </div>
                <span className="text-sm font-medium tracking-wide">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Side Content (Right Side inspired by personalzed insights) */}
      <div className="absolute bottom-20 right-20 hidden lg:flex flex-col gap-8 max-w-xs text-right items-end">
        <div className="flex flex-col items-end gap-3 group">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:border-neon-purple transition-colors">
             <Layout size={18} className="text-white/60 group-hover:text-neon-purple" />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-widest">Truly Scalable Designs</h4>
            <p className="text-white/40 text-[11px] leading-relaxed">Infrastructure designed for the next generation of decentralized applications.</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-3 group">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:border-neon-purple transition-colors">
             <Trophy size={18} className="text-white/60 group-hover:text-neon-purple" />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-widest">Community Focused</h4>
            <p className="text-white/40 text-[11px] leading-relaxed">Connecting people with technology through engaged management.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-neutral-800">Featured Projects</h2>
          <div className="w-12 h-[1px] bg-neutral-300 mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECT_SAMPLES.map((sample, index) => (
            <motion.div 
              key={sample.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#F5F5F5] rounded-[2rem] p-4 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-all group"
            >
              <Link to={`/project/${sample.id}`} className="flex flex-col h-full">
                <div className="aspect-square relative overflow-hidden rounded-3xl mb-4">
                  <img 
                    src={sample.coverImage} 
                    alt={sample.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span 
                      className="text-[10px] font-bold text-white px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-black/50"
                      style={{ backgroundColor: sample.accentColor || '#000' }}
                    >
                      {sample.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 px-2 pb-2">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-neutral-900 tracking-tight transition-colors">{sample.title}</h3>
                  </div>

                  <p className="text-[11px] text-neutral-600 leading-relaxed mb-6">
                    {sample.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-neutral-200">
                    <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1 group-hover:text-neon-purple transition-colors">
                      View Vault <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WebsiteCard = (props: any) => {
  const { site, index } = props;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 group-hover:border-neon-purple/50 transition-all shadow-2xl relative">
        {/* Underlay Image */}
        <img 
          src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800" 
          alt={site.title}
          className="w-full h-full object-cover absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        
        {/* Overlay Video with smooth fade */}
        <motion.video 
          src={site.videoUrl} 
          autoPlay 
          loop 
          muted 
          playsInline 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full h-full object-cover absolute inset-0 pointer-events-none"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 pointer-events-none" />
        
        <div className="absolute bottom-8 left-8 right-8">
          <h3 className="text-3xl font-black tracking-tighter mb-2 text-white">{site.title}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {site.techStack.map((tech: string, i: number) => (
              <span key={i} className="text-[9px] font-bold bg-white/10 px-2 py-0.5 rounded-full text-white/70">
                {tech}
              </span>
            ))}
          </div>
          <a 
            href={site.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 bg-neon-purple text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-purple-500/20"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Websites = () => {
  return (
    <section id="websites" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-16 text-center">WEBSITES BUILT</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {WEBSITE_SHOWCASE.map((site, index) => (
            <WebsiteCard key={site.id} site={site} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PenTool': return <PenTool size={32} />;
      case 'Users': return <Users size={32} />;
      case 'Layers': return <Layers size={32} />;
      case 'Bot': return <Bot size={32} />;
      case 'Wallet': return <Wallet size={32} />;
      case 'Twitter': return <Twitter size={32} />;
      case 'Cpu': return <Cpu size={32} />;
      default: return <Zap size={32} />;
    }
  };

  return (
    <section id="services" className="py-24 bg-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-white">EXPERTISE</h2>
          <p className="text-white/50">Core competencies that drive engagement and growth.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
          {EXPERTISE.map((service) => (
            <div 
              key={service.id} 
              className="p-8 glass rounded-3xl hover:bg-white/10 transition-all group relative border border-white/5 hover:border-neon-purple/30 shadow-2xl overflow-hidden"
            >
              {/* Radial Glow border overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="absolute -inset-2 bg-neon-purple/5 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 pointer-events-none" />

              <div className="text-neon-purple mb-6 group-hover:scale-110 transition-transform origin-left relative z-10">
                {getIcon(service.icon)}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white relative z-10">{service.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed relative z-10">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Layout size={20} />;
      case 'Code2': return <Code2 size={20} />;
      case 'MessageSquare': return <MessageSquare size={20} />;
      case 'Database': return <Database size={20} />;
      case 'Zap': return <Zap size={20} />;
      case 'FileCode': return <FileCode size={20} />;
      default: return <Code2 size={20} />;
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-16 text-center">TALENTS & SKILLS</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {SKILLS.map((skill) => (
            <div key={skill.name} className="p-6 glass rounded-2xl flex flex-col items-center gap-4 hover:border-neon-purple/30 transition-all text-center">
              <div className="text-neon-purple">
                {getSkillIcon(skill.icon)}
              </div>
              <div>
                <div className="text-sm font-bold mb-1">{skill.name}</div>
                <div className="text-[10px] text-white/30 uppercase tracking-widest">{skill.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-black/50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-16">EXPERIENCE</h2>
        
        <div className="space-y-12">
          {TIMELINE.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-8 relative"
            >
              <div className="md:w-1/4">
                <div className="text-neon-purple font-mono text-sm mb-2">{item.period}</div>
                <div className="text-xl font-bold">{item.company}</div>
              </div>
              <div className="md:w-3/4 pb-12 border-b border-white/10">
                <h3 className="text-2xl font-black tracking-tight mb-4">{item.role}</h3>
                <p className="text-white/50 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">WORK WITH <br /><span className="text-gradient">ARKILUS</span></h2>
            <p className="text-white/60 text-lg mb-12 max-w-md">
              Whether you need to scale content strategy, set up growth infrastructure, or build a secure dApp, let's explore your setup.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-neon-purple">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase font-bold tracking-widest">Email</div>
                  <div className="text-lg font-bold">hello@arkilus.eth</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-neon-purple">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase font-bold tracking-widest">Discord</div>
                  <div className="text-lg font-bold">builder_eth#1234</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass p-10 rounded-[40px] border border-white/5 backdrop-blur-xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-purple outline-none transition-colors text-white" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-purple outline-none transition-colors text-white" placeholder="john@example.com" />
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Select Services</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['Content Strategy', 'Community Growth', 'Website / dApp'].map((service) => (
                    <button
                      type="button"
                      key={service}
                      onClick={() => toggleService(service)}
                      className={`p-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                        selectedServices.includes(service)
                          ? 'border-neon-purple bg-neon-purple/20 text-white'
                          : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-neon-purple outline-none transition-colors resize-none text-white" placeholder="Tell me about your project..."></textarea>
              </div>

              <motion.button 
                type="submit"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-full py-4 bg-neon-purple text-black font-bold rounded-xl hover:bg-neon-purple/90 transition-colors shadow-lg shadow-purple-500/20"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-white/30 text-sm">
          © {new Date().getFullYear()} Builder.eth — All rights reserved.
        </div>
        
        <div className="flex items-center gap-8">
          <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-neon-purple transition-colors text-sm font-bold uppercase tracking-widest">Twitter</a>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-neon-purple transition-colors text-sm font-bold uppercase tracking-widest">GitHub</a>
          <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-neon-purple transition-colors text-sm font-bold uppercase tracking-widest">Telegram</a>
        </div>
        
        <div className="flex items-center gap-2 text-white/30 text-xs">
          Built with <Zap size={12} className="text-neon-purple" /> and Precision
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen relative bg-[#05000a] text-white selection:bg-white/20">
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <main>
                <Hero />
                <section id="projects" className="min-h-screen flex flex-col items-center justify-center pt-16 pb-8 overflow-hidden bg-[#05000a] w-full">
                  <div className="text-left mb-16 w-full max-w-7xl px-6 relative z-20">
                    <h2 className="uppercase font-black italic tracking-tighter text-3xl md:text-5xl text-[#bc77ff] drop-shadow-[0_0_15px_rgba(188,119,255,0.5)] mb-6">
                      PROJECTS I'VE WORKED WITH
                    </h2>
                    <p className="text-white/40 text-sm md:text-base max-w-2xl uppercase tracking-widest leading-relaxed">
                      Click any project to dive into my X content and technical insights.
                    </p>
                  </div>
                  
                  <div className="w-full relative z-10 flex flex-col items-center justify-center mt-6 py-12">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#05000a] via-transparent to-transparent pointer-events-none z-10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(147,51,234,0.15)_0%,_rgba(0,0,0,0)_70%)] pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[160px] rounded-full -z-10" />
                    <div className="w-full relative z-20">
                      <TeamShowcase members={mappedProjects} />
                    </div>
                  </div>
                </section>
                <section id="websites" className="min-h-screen flex items-center justify-center relative bg-[#030014]">
                  <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#05000a] to-transparent pointer-events-none" />
                  <div className="w-full">
                    <Gallery4 />
                  </div>
                </section>
                <Services />
                <Skills />
                <Experience />
                
                {/* Testimonials Section */}
                <section className="py-24">
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="glass p-12 md:p-20 rounded-[60px] relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-10 opacity-10">
                        <MessageSquare size={120} />
                      </div>
                      <div className="max-w-2xl relative z-10">
                        <div className="text-neon-purple mb-8">
                          <Zap size={40} />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-10 leading-tight">
                          "{TESTIMONIALS[0].content}"
                        </h2>
                        <div className="flex items-center gap-4">
                          <img src={TESTIMONIALS[0].avatarUrl} alt={TESTIMONIALS[0].name} className="w-12 h-12 rounded-full border border-neon-purple/30" />
                          <div>
                            <div className="font-bold">{TESTIMONIALS[0].name}</div>
                            <div className="text-xs text-white/40 uppercase tracking-widest">{TESTIMONIALS[0].role}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <Contact />
              </main>
              <Footer />
            </>
          } />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </div>
    </div>
  );
}
