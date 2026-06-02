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
  Send
} from 'lucide-react';
import { PROJECT_SAMPLES, WEBSITE_SHOWCASE, SKILLS, TIMELINE, TESTIMONIALS, SOCIAL_LINKS } from './constants';
import { ProjectSample, WebsiteShowcase, TimelineItem } from './types';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
import ProjectsPage, { mappedProjects } from './pages/ProjectsPage';
import TeamShowcase from './components/ui/team-showcase';
import { Gallery4 } from './components/ui/website-gallery';
import { OrbitalTimelineDemo } from './components/ui/orbital-timeline-demo';
import { CyberneticBentoGrid } from './components/ui/cybernetic-bento-grid';
import { ExperienceHistory } from './components/ui/experience-history';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 800);
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
    <div className={`flex justify-center w-full fixed top-8 z-50 px-4 transition-all duration-500 ease-in-out ${scrolled ? '-translate-y-[250%] opacity-0 pointer-events-none' : 'translate-y-0'}`}>
      <nav 
        onMouseMove={handleMouseMove}
        className="w-full max-w-5xl rounded-full bg-white text-black shadow-lg px-4 py-2 flex justify-between items-center relative overflow-hidden group/nav"
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
            <span className="font-bold text-black text-sm tracking-tighter">ARKILUS</span>
            <span className="text-[10px] text-neon-purple font-medium italic opacity-70">WEB3 PORTFOLIO</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-8 relative z-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[11px] font-black text-black/70 hover:text-black transition-colors uppercase tracking-[0.2em]"
            >
              {link.name}
            </a>
          ))}
        </div>
        
        <div className="hidden md:block pr-1 relative z-10 cursor-pointer">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setIsConnectOpen(true)}
            onMouseLeave={() => setIsConnectOpen(false)}
            className="px-6 py-3 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-black/90 transition-colors flex items-center gap-2 relative z-10 cursor-pointer"
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
                className="absolute top-12 right-0 bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.15)] rounded-2xl p-4 w-48 flex flex-col gap-2 z-50"
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
                    className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-xl transition-colors text-[11px] font-bold text-white/70 hover:text-white"
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
        <button className="md:hidden text-black p-2 relative z-10" onClick={() => setIsOpen(!isOpen)}>
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
            className="absolute top-20 left-4 right-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-[2rem] md:hidden py-8 flex flex-col items-center gap-6 shadow-2xl z-40"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-sm font-black text-white/70 hover:text-white uppercase tracking-widest transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="px-8 py-4 w-3/4 text-center bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-white/90 transition-colors"
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
    <section id="home" className="relative min-h-screen w-full pt-32 md:pt-40 pb-28 md:pb-36 overflow-hidden scroll-mt-32 lg:scroll-mt-40">
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
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-0 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-20 relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl flex flex-col justify-center gap-6 md:gap-8"
        >
          {/* Header Section */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight">
            <span className="font-medium">ARKILUS</span> <span className="font-black italic">WEB3</span><br />
            <span className="font-light italic opacity-90">PORTFOLIO</span>
          </h1>

          {/* New Pill Button Style */}
          <div className="flex">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black py-3 px-8 rounded-full font-bold flex items-center gap-4 hover:bg-white/90 transition-all shadow-xl group cursor-pointer"
            >
              <span className="text-sm">Explore my works</span>
              <div className="w-8 h-8 rounded-full bg-neon-purple flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <ArrowUpRight size={18} />
              </div>
            </button>
          </div>

          {/* Bottom Left Features (Inspired by the medical UI) */}
          <div className="flex flex-col gap-4">
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
                    loading="lazy"
                    decoding="async"
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
          loading="lazy"
          decoding="async"
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



const Contact = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formMousePos, setFormMousePos] = useState({ x: 0, y: 0 });
  const [isFormHovered, setIsFormHovered] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [buttonText, setButtonText] = useState('Send Message');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setFormMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Build FormData directly from the DOM form element.
      // All inputs with name="" attributes are auto-captured.
      const formData = new FormData(e.currentTarget);
      // Append services separately since they are chip-toggle buttons, not native inputs
      formData.append("fi-text-services", selectedServices.join(", "));

      const response = await fetch("https://getform.io/f/ejri55ydbwd", {
        method: "POST",
        body: formData,
        // IMPORTANT: Do NOT set Content-Type header manually.
        // The browser must auto-set multipart/form-data with the correct boundary.
        headers: {
          "Accept": "application/json",
        },
      });

      if (response.ok) {
        setName('');
        setEmail('');
        setMessage('');
        setSelectedServices([]);
        setButtonText('TRANSMISSION RECEIVED');
        setTimeout(() => {
          setButtonText('Send Message');
        }, 3500);
      } else {
        const errorBody = await response.text();
        console.log("Getform Error Status:", response.status, response.statusText);
        console.log("Getform Error Body:", errorBody);
        setButtonText('ERROR SENDING');
        setTimeout(() => {
          setButtonText('Send Message');
        }, 3500);
      }
    } catch (error) {
      console.log("Getform Network Error:", error);
      setButtonText('ERROR SENDING');
      setTimeout(() => {
        setButtonText('Send Message');
      }, 3500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-32 pb-24 relative overflow-hidden bg-[#05000a]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#b026ff]/5 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="desktop-zoom-85">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto relative">
            <div>
              <h2 className="uppercase font-black italic tracking-tighter text-4xl sm:text-5xl md:text-6xl text-white drop-shadow-[0_0_15px_rgba(176,38,255,0.5)] mb-8">
                WORK WITH <br /><span className="text-[#bc77ff] drop-shadow-[0_0_15px_rgba(188,119,255,0.4)]">ARKILUS</span>
              </h2>
              <p className="text-white/40 text-sm md:text-base max-w-md uppercase tracking-widest leading-relaxed mb-12">
                Whether you need to scale content strategy, set up growth infrastructure, or build a secure dApp, let's explore your setup.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-[#bc77ff]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase font-bold tracking-widest">Email</div>
                    <div className="text-lg font-bold">ksarim114@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-[#bc77ff]">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase font-bold tracking-widest">Discord</div>
                    <div className="text-lg font-bold">sarim96</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-[#bc77ff]">
                    <Send size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase font-bold tracking-widest">Telegram</div>
                    <div className="text-lg font-bold">sarim_khan96</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-[#bc77ff]">
                    <Twitter size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase font-bold tracking-widest">X (Twitter)</div>
                    <div className="text-lg font-bold">arkilus78</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cybernetic Vertical Divider Line */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] hidden md:block bg-gradient-to-b from-transparent via-purple-500/15 to-transparent h-[80%] my-auto" />

            <div 
              onMouseMove={handleFormMouseMove}
              onMouseEnter={() => setIsFormHovered(true)}
              onMouseLeave={() => setIsFormHovered(false)}
              className="glass p-8 lg:p-9 rounded-[40px] border border-white/5 backdrop-blur-xl relative overflow-hidden md:max-w-[500px]"
            >
              {/* Animated radial hover background effect */}
              <div 
                className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                style={{
                  opacity: isFormHovered ? 1 : 0,
                  background: `radial-gradient(600px circle at ${formMousePos.x}px ${formMousePos.y}px, rgba(176, 38, 255, 0.06), transparent 80%)`
                }}
              />
              
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Name</label>
                    <input 
                      type="text" 
                      name="fi-sender-fullName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-[#150525]/40 border border-white/10 rounded-xl px-4 py-2.5 focus:border-[#bc77ff] focus:shadow-[0_0_15px_rgba(188,119,255,0.25)] outline-none transition-all duration-300 text-white placeholder-white/30" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email</label>
                    <input 
                      type="email" 
                      name="fi-sender-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-[#150525]/40 border border-white/10 rounded-xl px-4 py-2.5 focus:border-[#bc77ff] focus:shadow-[0_0_15px_rgba(188,119,255,0.25)] outline-none transition-all duration-300 text-white placeholder-white/30" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
  
                {/* Service Selection */}
                <div className="space-y-3">
                  <label className="text-[14px] font-bold leading-relaxed text-white/50 tracking-normal">Select Services</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {['Content Strategy', 'Community Growth', 'Website / dApp'].map((service) => (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`p-3 rounded-xl border text-[14px] font-medium leading-relaxed transition-all duration-300 ${
                          selectedServices.includes(service)
                            ? 'border-[#bc77ff] bg-[#bc77ff]/10 text-white shadow-[0_0_10px_rgba(188,119,255,0.15)]'
                            : 'border-white/10 bg-[#150525]/40 text-white/60 hover:border-white/25 hover:text-white'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>
  
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Message</label>
                  <textarea 
                    rows={4} 
                    name="fi-text-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full bg-[#150525]/40 border border-white/10 rounded-xl px-4 py-2.5 focus:border-[#bc77ff] focus:shadow-[0_0_15px_rgba(188,119,255,0.25)] outline-none transition-all duration-300 resize-none text-white placeholder-white/30" 
                    placeholder="Tell me about your project..."
                  />
                </div>
  
                <motion.button 
                  type="submit"
                  animate={{ scale: [1, 1.01, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="w-full py-4 bg-[#150525]/20 border border-[#bc77ff]/50 rounded-xl text-[14px] font-bold uppercase tracking-wider text-[#bc77ff] hover:text-white hover:bg-[#bc77ff]/20 hover:border-[#bc77ff] hover:shadow-[0_0_20px_rgba(188,119,255,0.25)] transition-all duration-300 cursor-pointer"
                >
                  {buttonText}
                </motion.button>
              </form>
            </div>
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
          © {new Date().getFullYear()} ARKILUS. All rights reserved.
        </div>
        
        <div className="flex items-center gap-8">
          <a href="https://x.com/arkilus78" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors cursor-pointer">X</a>
          <a href="https://github.com/sarim966" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors cursor-pointer">GitHub</a>
          <a href="https://t.me/sarim_khan96" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors cursor-pointer">Telegram</a>
        </div>
        
        <div className="flex items-center gap-2 text-white/50">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> SYSTEMS ONLINE
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen relative bg-[#05000a] text-white selection:bg-white/20">
      <div className="relative z-10">
        <React.Suspense fallback={<div className="bg-[#05000a] min-h-screen text-white flex items-center justify-center">LOADING...</div>}>
          <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <main>
                <Hero />
                <section id="projects" className="min-h-screen w-full flex flex-col justify-center overflow-hidden pt-20 lg:pt-24 scroll-mt-32 lg:scroll-mt-40">
                  <div className="w-full flex flex-col items-center" style={{ zoom: 0.85 }}>
                    <div className="w-full flex flex-col items-center">
                      <div className="text-left mb-6 w-full max-w-7xl mx-auto px-6 relative z-20">
                        <h2 className="uppercase font-black italic tracking-tighter text-3xl md:text-5xl text-[#bc77ff] drop-shadow-[0_0_15px_rgba(188,119,255,0.4)]">
                          PROJECTS I'VE WORKED WITH
                        </h2>
                        <p className="text-white/40 text-sm md:text-base max-w-2xl uppercase tracking-widest leading-relaxed">
                          Click any project to dive into my X content and technical insights.
                        </p>
                      </div>
                      
                      <div className="w-full relative z-10 flex flex-col items-center justify-center">
                        <div className="w-full relative z-20">
                          <TeamShowcase members={mappedProjects} />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                

                <section id="websites" className="min-h-screen w-full flex flex-col justify-center overflow-hidden scroll-mt-32 lg:scroll-mt-40">
                  <div className="w-full flex flex-col items-center" style={{ zoom: 0.85 }}>
                    <div className="w-full">
                      <Gallery4 />
                    </div>
                  </div>
                </section>

                <section id="services" className="min-h-screen w-full flex flex-col justify-center overflow-hidden">
                  <div className="w-full flex flex-col items-center" style={{ zoom: 0.85 }}>
                    <div className="text-left mb-6 w-full max-w-7xl mx-auto px-6 relative z-20 bg-transparent">
                      <h2 className="uppercase font-black italic tracking-tighter text-3xl md:text-5xl text-[#bc77ff] drop-shadow-[0_0_15px_rgba(188,119,255,0.4)]">
                        Skills & Expertise
                      </h2>
                      <p className="text-white/40 text-sm md:text-base max-w-2xl uppercase tracking-widest leading-relaxed">
                        A curated look at my technical stack and the impact I bring to the Web3 ecosystem.
                      </p>
                    </div>
                    <div className="flex-1 flex items-center justify-center w-full">
                      <OrbitalTimelineDemo />
                    </div>
                  </div>
                </section>

                <CyberneticBentoGrid />
                <ExperienceHistory />
                

                <Contact />
              </main>
              <Footer />
            </>
          } />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </React.Suspense>
      </div>
    </div>
  );
}
