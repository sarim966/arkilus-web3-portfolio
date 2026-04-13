"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, PenTool, Users, Layers, Zap, ArrowUpRight } from "lucide-react"
import { Badge } from "./badge"
import { EXPERTISE } from "../../constants"
import type { ExpertiseItem } from "../../types"

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "PenTool":
      return <PenTool className="w-4 h-4" />
    case "Users":
      return <Users className="w-4 h-4" />
    case "Layers":
      return <Layers className="w-4 h-4" />
    default:
      return <Zap className="w-4 h-4" />
  }
}

// Apple-style subtle accent colors - low saturation, premium feel
const getNodeAccent = (index: number) => {
  const accents = [
    "from-purple-500/40 to-blue-500/40",
    "from-indigo-500/40 to-purple-500/40",
    "from-blue-500/40 to-cyan-500/40",
  ]
  return accents[index % accents.length]
}

const getNodeGlow = (index: number) => {
  const glows = [
    "rgba(139, 92, 246, 0.4)", // subtle purple
    "rgba(99, 102, 241, 0.4)", // subtle indigo
    "rgba(59, 130, 246, 0.4)", // subtle blue
  ]
  return glows[index % glows.length]
}

function calculateNodePosition(index: number, total: number, radius: number) {
  const angle = (index * 360) / total - 90 // Start from top
  const radian = (angle * Math.PI) / 180
  const x = Math.cos(radian) * radius
  const y = Math.sin(radian) * radius
  return { x, y, angle }
}

function TimelineNodeCard({
  node,
  index,
  isExpanded,
  onClick,
  onClose,
}: {
  node: ExpertiseItem
  index: number
  isExpanded: boolean
  onClick: () => void
  onClose: () => void
}) {
  const radius = 130
  const { x, y } = calculateNodePosition(index, EXPERTISE.length, radius)

  return (
    <motion.div
      className="absolute"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: index * 0.15,
        duration: 0.5,
        ease: "easeOut",
      }}
      style={{
        left: "50%",
        top: "50%",
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        zIndex: isExpanded ? 50 : 10,
      }}
    >
      {/* Orbital Node - Apple Style */}
      <motion.button
        onClick={onClick}
        className="relative w-12 h-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-white/40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isExpanded
            ? `0 0 0 1px ${getNodeGlow(index)}, 0 0 30px ${getNodeGlow(index)}`
            : `0 0 0 1px rgba(255,255,255,0.1), 0 4px 20px rgba(0,0,0,0.3)`,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Inner gradient glow */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${getNodeAccent(index)} opacity-50`} />
        
        {/* Icon */}
        <span className="relative z-10 text-white/80">{getIcon(node.icon)}</span>

        {/* Subtle pulse ring */}
        {!isExpanded && (
          <motion.div
            className="absolute inset-0 rounded-full border border-white/10"
            animate={{
              scale: [1, 1.3, 1.3],
              opacity: [0.3, 0, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}
      </motion.button>

      {/* Detail Card - Glassmorphism with AnimatePresence */}
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            transition={{ 
              duration: 0.35, 
              ease: [0.16, 1, 0.3, 1] // Apple-style easing
            }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-4"
            style={{ width: 260 }}
          >
            {/* Glassmorphism Card */}
            <div className="p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getNodeAccent(index)} opacity-10 pointer-events-none`} />
              
              {/* Close Button - Top Right */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-200 z-20"
              >
                <X className="w-3.5 h-3.5 text-white/60" />
              </button>

              {/* Title Badge */}
              <Badge
                variant="outline"
                className="mb-3 text-[10px] tracking-wider uppercase border-white/20 text-white/60 font-medium"
              >
                {node.title}
              </Badge>

              {/* Description */}
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                {node.description}
              </p>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {node.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + skillIndex * 0.05 }}
                    className="px-2.5 py-1 text-[10px] rounded-full bg-white/5 border border-white/10 text-white/50 font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* View Related Work Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span className="text-xs text-white/60 group-hover:text-white/80 font-medium">
                  View Related Work
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white/70 transition-colors" />
              </motion.button>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function RadialOrbitalTimelineDemo() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleNodeClick = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleClose = () => {
    setExpandedId(null)
  }

  return (
    <div className="relative w-full bg-[#030014] py-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ambient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-600/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16 relative z-10"
      >
        <span className="text-[11px] tracking-[0.3em] uppercase text-white/30 font-medium mb-4 block">
          Core Expertise
        </span>
        <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white">
          Expertise <span className="font-medium">Orbit</span>
        </h2>
        <p className="text-white/30 text-sm mt-4 font-light">
          Click nodes to explore capabilities
        </p>
      </motion.div>

      {/* Orbital Container */}
      <div className="relative w-[360px] h-[360px] md:w-[420px] md:h-[420px]">
        {/* Outer Ring - Subtle */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/5"
          animate={{
            boxShadow: [
              "0 0 60px rgba(139, 92, 246, 0.03)",
              "0 0 80px rgba(139, 92, 246, 0.06)",
              "0 0 60px rgba(139, 92, 246, 0.03)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Middle Ring */}
        <div className="absolute inset-6 rounded-full border border-white/[0.03]" />
        
        {/* Inner Ring */}
        <div className="absolute inset-12 rounded-full border border-white/[0.02]" />

        {/* Central Hub - Apple Style */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center z-20"
          animate={{
            boxShadow: [
              "0 0 40px rgba(139, 92, 246, 0.1)",
              "0 0 60px rgba(139, 92, 246, 0.2)",
              "0 0 40px rgba(139, 92, 246, 0.1)",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Zap className="w-6 h-6 text-purple-300/70 mb-0.5" />
          <span className="text-[9px] tracking-wider text-white/40 font-medium uppercase">Core</span>
        </motion.div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.2)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Orbital Nodes */}
        {EXPERTISE.map((item, index) => (
          <TimelineNodeCard
            key={item.id}
            node={item}
            index={index}
            isExpanded={expandedId === item.id}
            onClick={() => handleNodeClick(item.id)}
            onClose={handleClose}
          />
        ))}
      </div>
    </div>
  )
}
