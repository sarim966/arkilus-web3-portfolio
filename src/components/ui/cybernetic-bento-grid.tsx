"use client";

import React, { useEffect, useRef } from 'react';
import { BarChart3, Languages, Users, Search, Target, Cpu, Zap } from 'lucide-react';

// Reusable BentoItem component
const BentoItem = ({ className, children }: { className?: string; children: React.ReactNode }) => {
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const item = itemRef.current;
        if (!item) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);
        };

        item.addEventListener('mousemove', handleMouseMove);

        return () => {
            item.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div ref={itemRef} className={`bento-item ${className || ''}`}>
            {children}
        </div>
    );
};

// Main Component
export const CyberneticBentoGrid = () => {
    return (
        <div className="main-container">
            <style>{`
                .main-container {
                    min-height: auto;
                    background: #030008;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.75rem;
                    zoom: 0.85;
                }
                
                @media (max-width: 768px) {
                    .main-container {
                        zoom: 1;
                        padding: 1rem;
                    }
                    
                    .large-title {
                        font-size: 1.25rem !important;
                    }
                    
                    .large-text {
                        font-size: 0.875rem !important;
                    }
                    
                    .vertical-title {
                        font-size: 1.125rem !important;
                    }
                    
                    .vertical-text {
                        font-size: 0.875rem !important;
                    }
                }
                
                .bento-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    grid-template-rows: repeat(3, 180px);
                    gap: 12px;
                    width: 100%;
                    max-width: 1100px;
                    margin: 0 auto;
                }
                
                @media (max-width: 1024px) {
                    .bento-grid {
                        grid-template-columns: repeat(2, 1fr);
                        grid-template-rows: auto;
                    }
                }
                
                @media (max-width: 768px) {
                    .bento-grid {
                        grid-template-columns: repeat(2, 1fr);
                        grid-template-rows: auto;
                        gap: 16px;
                    }
                    
                    .col-span-2 {
                        grid-column: span 2;
                    }
                    
                    .row-span-2 {
                        grid-row: span 1;
                    }
                }
                
                @media (max-width: 640px) {
                    .bento-grid {
                        grid-template-columns: 1fr;
                        grid-template-rows: auto;
                    }
                    
                    .col-span-2 {
                        grid-column: span 1 !important;
                    }
                    
                    .row-span-2 {
                        grid-row: span 1 !important;
                    }
                }
                
                .bento-item {
                    position: relative;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 0.75rem;
                    padding: 12px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }
                
                .bento-item::before {
                    content: '';
                    position: absolute;
                    width: 250px;
                    height: 250px;
                    background: radial-gradient(
                        circle,
                        rgba(168, 85, 247, 0.15) 0%,
                        transparent 70%
                    );
                    left: var(--mouse-x, 50%);
                    top: var(--mouse-y, 50%);
                    transform: translate(-50%, -50%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                    z-index: 0;
                }
                
                .bento-item:hover::before {
                    opacity: 1;
                    background: radial-gradient(
                        circle,
                        rgba(168, 85, 247, 0.3) 0%,
                        transparent 70%
                    );
                }
                
                .bento-item:hover {
                    border-color: rgba(168, 85, 247, 0.5);
                    box-shadow: 0 0 30px rgba(168, 85, 247, 0.15);
                    transform: translateY(-2px);
                }
                
                .bento-item > * {
                    position: relative;
                    z-index: 1;
                }
                
                .col-span-2 {
                    grid-column: span 2;
                }
                
                .row-span-2 {
                    grid-row: span 2;
                }
                
                .chart-placeholder {
                    background: linear-gradient(180deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.02) 100%);
                    border: 1px solid rgba(168, 85, 247, 0.2);
                }
                
                .chart-bar {
                    transition: all 0.3s ease;
                }
                
                .bento-item:hover .chart-bar {
                    transform: scaleY(1.1);
                    filter: drop-shadow(0 0 4px rgba(168, 85, 247, 0.6));
                }
                
                .neon-text {
                    background: linear-gradient(to bottom right, white, white, #A855F7);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.5));
                }
            `}</style>
            
            <div className="w-full max-w-5xl z-10">
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent text-center mb-6">Services I Offer</h1>
                <div className="bento-grid">
                    {/* Box 1 - Anchor: Large 2x2 (Top Left) - Ecosystem Educator */}
                    <BentoItem className="col-span-2 row-span-2 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Languages className="w-7 h-7 text-purple-400" />
                                <h2 className="large-title text-2xl font-bold text-white">Ecosystem Educator</h2>
                            </div>
                            <p className="large-text text-[17px] text-gray-400 leading-loose">"I don't just write; I translate. I take away the 'technical jargon' from complex protocols and rebuild it into high-impact narratives. Whether it's an L1 launch or a pivoting to DeFi, I ensure your tech is understood by the people who matter and the wider community."</p>
                        </div>
                        <div className="mt-8 h-24 rounded-lg flex items-center justify-center chart-placeholder">
                            <div className="flex items-end gap-1 h-16 px-3">
                                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75].map((h, i) => (
                                    <div 
                                        key={i}
                                        className="chart-bar w-5 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-sm"
                                        style={{ height: `${h}%` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </BentoItem>
                    
                    {/* Box 3 (Top Middle): On-Chain Researcher */}
                    <BentoItem className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Search className="w-5 h-5 text-purple-400" />
                            <h2 className="text-base font-bold text-white">On-Chain Researcher</h2>
                        </div>
                        <p className="text-[14px] text-gray-400 leading-relaxed">"Protocol research with a technical edge. I dive straight into the smart contracts and on-chain activity to find the 'signal' in the noise. I deliver the raw truth of what's actually happening in the ecosystem, backed by real data."</p>
                    </BentoItem>
                    
                    {/* Box 5 (Top Right): On-Chain Tools */}
                    <BentoItem>
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-5 h-5 text-purple-400" />
                            <h2 className="text-base font-bold text-white">On-Chain Tools</h2>
                        </div>
                        <p className="text-[14px] text-gray-400 leading-relaxed">"I build the bots and tools that handle community workflows, so team focus on big picture."</p>
                    </BentoItem>
                    
                    {/* Box 2 - Vertical Span: 1x2 (Middle Column) - Community Leadership */}
                    <BentoItem className="row-span-2">
                        <div className="flex items-center gap-2 mb-3">
                            <Users className="w-5 h-5 text-purple-400" />
                            <h2 className="text-lg font-bold text-white">Community Leadership</h2>
                        </div>
                        <p className="text-[14px] text-gray-400 leading-relaxed">"Communities aren't managed; they're led. I build self-sustaining digital ecosystems from the ground up, turning passive 'lurkers' into active ambassadors. I align the community's pulse with the developer's roadmap."</p>
                        <div className="mt-6 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full border-2 border-purple-500/30 flex items-center justify-center">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/40 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-purple-300" />
                                </div>
                            </div>
                        </div>
                    </BentoItem>
                    
                    {/* Box 4 (Bottom Middle): Community Builder */}
                    <BentoItem>
                        <div className="flex items-center gap-2 mb-2">
                            <Target className="w-5 h-5 text-purple-400" />
                            <h2 className="text-base font-bold text-white">Community Builder</h2>
                        </div>
                        <p className="text-[14px] text-gray-400 leading-relaxed">"I built Engaging website for community that what makes them hooked and engaged."</p>
                    </BentoItem>
                    
                    {/* Box 6 - Horizontal Span: 2x1 (Bottom Row) - THE VISION */}
                    <BentoItem className="col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                            <Cpu className="w-5 h-5 text-purple-400" />
                            <h2 className="text-base font-black uppercase tracking-wide neon-text">THE VISION</h2>
                        </div>
                        <p className="text-[14px] leading-relaxed font-semibold italic neon-text">"Code creates the protocol. Community creates the value. I provide the narrative that connects the two."</p>
                    </BentoItem>
                </div>
            </div>
        </div>
    );
};
