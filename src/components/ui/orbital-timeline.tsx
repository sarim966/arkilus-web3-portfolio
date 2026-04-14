"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Link, Zap, Cpu, Target, TrendingUp, BarChart3 } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  skills?: string[];
  stack?: string[];
  impact?: string;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [pinnedItem, setPinnedItem] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const cardRef = useRef<HTMLDivElement>(null);

  // Detect mobile/touch devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPinnedItem(null);
      setHoveredItem(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const handleNodeHover = (id: number) => {
    // Only hover on non-mobile devices
    if (pinnedItem === null && !isMobile) {
      setHoveredItem(id);
      setExpandedItems({ [id]: true });
      setActiveNodeId(id);
      setAutoRotate(false);

      const relatedItems = getRelatedItems(id);
      const newPulseEffect: Record<number, boolean> = {};
      relatedItems.forEach((relId) => {
        newPulseEffect[relId] = true;
      });
      setPulseEffect(newPulseEffect);
    }
  };

  const handleNodeLeave = () => {
    if (pinnedItem === null && !isMobile) {
      setHoveredItem(null);
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const handleCardHover = () => {
    // Keep card open when hovering over it (desktop only)
    if (hoveredItem !== null && pinnedItem === null && !isMobile) {
      setAutoRotate(false);
    }
  };

  const handleCardLeave = () => {
    if (pinnedItem === null && !isMobile) {
      setHoveredItem(null);
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const handleNodeClick = (id: number) => {
    // For mobile: toggle on click
    if (isMobile) {
      toggleItem(id);
    }
  };

  const toggleItem = (id: number) => {
    if (pinnedItem === id) {
      // Unpin if already pinned
      setPinnedItem(null);
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    } else {
      // Pin this item
      setPinnedItem(id);
      setHoveredItem(id);
      setExpandedItems({ [id]: true });
      setActiveNodeId(id);
      setAutoRotate(false);

      const relatedItems = getRelatedItems(id);
      const newPulseEffect: Record<number, boolean> = {};
      relatedItems.forEach((relId) => {
        newPulseEffect[relId] = true;
      });
      setPulseEffect(newPulseEffect);

      centerViewOnNode(id);
    }
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-white";
      case "in-progress":
        return "text-black bg-white border-black";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center overflow-hidden relative bg-[#030008] p-4 sm:p-6 md:p-8"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center px-4 sm:px-8"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Central Hub - Deep Electric Purple - Minimal Void Design */}
          {/* Very concentrated small glow - does not fill the void */}
          <div className="absolute w-16 h-16 rounded-full bg-[#9333ea]/40 blur-lg"></div>
          {/* Main hub container - deep saturated purple */}
          <div className="absolute w-12 h-12 rounded-full bg-[#9333ea] animate-pulse flex items-center justify-center z-10 border border-purple-400/50"
            style={{
              boxShadow: `
                0 0 20px rgba(147, 51, 234, 0.8),
                0 0 40px rgba(147, 51, 234, 0.4),
                inset 0 1px 0 rgba(255,255,255,0.3)
              `
            }}>
            {/* Ripple rings - smaller for void design */}
            <div className="absolute w-16 h-16 rounded-full border border-[#9333ea]/40 animate-ping opacity-50"></div>
            <div className="absolute w-20 h-20 rounded-full border border-[#9333ea]/20 animate-ping opacity-30" style={{ animationDelay: "0.3s" }}></div>
            {/* Sharp white center point */}
            <div className="w-3 h-3 rounded-full bg-white border border-purple-300/50"
              style={{
                boxShadow: `0 0 10px rgba(255,255,255,0.9)`
              }}>
            </div>
          </div>

          {/* Orbit Ring - Void Center Design */}
          {/* Main orbit ring only - no glow in the void */}
          <div className="absolute w-96 h-96 rounded-full border border-[#9333ea]/30"></div>
          {/* Inner accent ring */}
          <div className="absolute w-80 h-80 rounded-full border border-[#9333ea]/15"></div>

          {/* Timeline Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const isHovered = hoveredItem === item.id;
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isMobile) {
                    handleNodeClick(item.id);
                  } else {
                    toggleItem(item.id);
                  }
                }}
                onMouseEnter={() => handleNodeHover(item.id)}
                onMouseLeave={handleNodeLeave}
              >
                {/* Sharp Electric Purple Glow - Intensifies on Hover */}
                <div
                  className={`absolute rounded-full ${isPulsing ? "animate-pulse" : ""} transition-all duration-200`}
                  style={{
                    background: `radial-gradient(circle, rgba(147, 51, 234, ${isHovered || isExpanded ? 0.7 : 0.4}) 0%, transparent 70%)`,
                    width: isHovered || isExpanded ? `70px` : `60px`,
                    height: isHovered || isExpanded ? `70px` : `60px`,
                    left: isHovered || isExpanded ? `-19px` : `-14px`,
                    top: isHovered || isExpanded ? `-19px` : `-14px`,
                    filter: isHovered || isExpanded ? "blur(12px)" : "blur(8px)",
                  }}
                ></div>

                {/* Node Circle - Sharp Electric with Hover Feedback */}
                <div
                  className={`
                  relative w-10 h-10 rounded-full flex items-center justify-center
                  ${isExpanded ? "bg-black text-purple-200" : isRelated ? "bg-black text-purple-200" : "bg-black text-white"}
                  transition-all duration-200 transform
                  ${isExpanded ? "scale-150" : isHovered ? "scale-110" : "scale-100"}
                `}
                  style={{
                    border: isExpanded ? '2px solid rgba(147, 51, 234, 0.9)' : isHovered ? '2px solid rgba(147, 51, 234, 0.7)' : isRelated ? '1px solid rgba(147, 51, 234, 0.6)' : '1px solid rgba(147, 51, 234, 0.3)',
                    boxShadow: isExpanded
                      ? `
                        0 0 25px rgba(147, 51, 234, 0.9),
                        0 0 50px rgba(147, 51, 234, 0.5),
                        inset 0 1px 0 rgba(255,255,255,0.15)
                      `
                      : isHovered
                      ? `
                        0 0 20px rgba(147, 51, 234, 0.7),
                        0 0 40px rgba(147, 51, 234, 0.35),
                        inset 0 1px 0 rgba(255,255,255,0.12)
                      `
                      : isRelated
                      ? `
                        0 0 15px rgba(147, 51, 234, 0.6),
                        0 0 30px rgba(147, 51, 234, 0.3),
                        inset 0 1px 0 rgba(255,255,255,0.1)
                      `
                      : `
                        0 4px 20px rgba(0,0,0,0.8),
                        0 0 15px rgba(147, 51, 234, 0.2),
                        inset 0 1px 0 rgba(255,255,255,0.05)
                      `,
                  }}
                >
                  <Icon 
                    size={isHovered ? 18 : 16} 
                    strokeWidth={1.5} 
                    className="transition-all duration-200"
                  />
                </div>

                {/* Node Label - High Contrast with Hover */}
                <div
                  className={`
                  absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs font-semibold tracking-tighter
                  transition-all duration-200
                  ${isExpanded ? "text-white" : isHovered ? "text-purple-200" : "text-white"}
                `}
                >
                  {item.title}
                </div>

                {/* Expanded Card - Smart Offset & Mobile Responsive */}
                <AnimatePresence>
                  {isExpanded && (
                    <>
                      {/* Mobile Backdrop */}
                      {isMobile && (
                        <motion.div
                          className="fixed inset-0 bg-black/80 z-40 md:hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => {
                            setPinnedItem(null);
                            setExpandedItems({});
                            setActiveNodeId(null);
                          }}
                        />
                      )}
                      <motion.div 
                        className={`
                          ${isMobile 
                            ? 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100vw-32px)] max-w-[320px]' 
                            : 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 z-20'
                          }
                        `}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        onMouseEnter={handleCardHover}
                        onMouseLeave={handleCardLeave}
                        ref={cardRef}
                      >
                        {/* Sharp purple border */}
                        <div 
                          className="relative rounded-xl border border-[#9333ea]/40 bg-black/90 md:bg-black/80"
                          style={{
                            boxShadow: `
                              0 25px 50px -12px rgba(0, 0, 0, 0.9),
                              0 0 30px rgba(147, 51, 234, 0.3),
                              inset 0 1px 0 rgba(147, 51, 234, 0.1)
                            `
                          }}
                        >
                          <Card className="w-full bg-transparent border-0 shadow-none overflow-hidden rounded-xl">
                        
                        <CardHeader className="pb-2 pt-4 px-4">
                          <CardTitle className="text-sm text-white font-semibold tracking-tighter text-center">
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                    
                    <CardContent className="text-xs space-y-3 px-4 pb-4">
                      {/* Punchy Description */}
                      <p className="leading-relaxed text-purple-100 text-center text-[11px]">{item.content}</p>

                      {/* Core Tools - Compact Row */}
                      {item.stack && item.stack.length > 0 && (
                        <div className="pt-2 border-t border-[#9333ea]/20">
                          <div className="flex flex-wrap justify-center gap-1.5">
                            {item.stack.slice(0, 4).map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 text-[9px] rounded-sm bg-[#9333ea]/20 border border-[#9333ea]/40 text-purple-200 font-mono"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
