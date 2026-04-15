"use client";

import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 }
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96'
};

export const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'purple',
  size = 'md',
  width,
  height,
  customSize = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      
      if (cardRef.current) {
        cardRef.current.style.setProperty('--x', x.toFixed(2));
        cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty('--y', y.toFixed(2));
        cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
      }
    };

    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) {
      return '';
    }
    return sizeMap[size];
  };

  const getInlineStyles = () => {
    const baseStyles: React.CSSProperties & { [key: string]: string | number } = {
      '--base': base,
      '--spread': spread,
      '--radius': '14',
      '--border': '3',
      '--backdrop': 'hsl(0 0% 60% / 0.12)',
      '--backup-border': 'hsl(0 0% 60% / 0.12)',
      '--size': '200',
      '--outer': '1',
      '--saturation': '100',
      '--lightness': '70',
      '--bg-spot-opacity': '0.15',
      '--border-spot-opacity': '0.8',
      '--border-light-opacity': '0.3',
    };

    if (width !== undefined) {
      baseStyles.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === 'number' ? `${height}px` : height;
    }

    return baseStyles;
  };

  return (
    <>
      <style>{`
        [data-glow]::before,
        [data-glow]::after {
          pointer-events: none;
          content: "";
          position: absolute;
          inset: calc(var(--border, 2) * 1px * -1);
          border: calc(var(--border, 2) * 1px) solid transparent;
          border-radius: calc(var(--radius, 14) * 1px);
          background-attachment: fixed;
          background-size: calc(100% + (2 * var(--border, 2) * 1px)) calc(100% + (2 * var(--border, 2) * 1px));
          background-repeat: no-repeat;
          background-position: 50% 50%;
          mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
          mask-clip: padding-box, border-box;
          mask-composite: intersect;
        }
        
        [data-glow]::before {
          background-image: radial-gradient(
            calc(var(--size, 200) * 1px * 0.75) calc(var(--size, 200) * 1px * 0.75) at
            calc(var(--x, 0) * 1px)
            calc(var(--y, 0) * 1px),
            hsl(calc(var(--base, 280) + (var(--xp, 0) * var(--spread, 300))) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 0.8)), transparent 100%
          );
          filter: brightness(2);
        }
        
        [data-glow]::after {
          background-image: radial-gradient(
            calc(var(--size, 200) * 1px * 0.5) calc(var(--size, 200) * 1px * 0.5) at
            calc(var(--x, 0) * 1px)
            calc(var(--y, 0) * 1px),
            hsl(0 100% 100% / var(--border-light-opacity, 0.3)), transparent 100%
          );
        }
        
        [data-glow] [data-glow-inner] {
          position: absolute;
          inset: 0;
          will-change: filter;
          opacity: var(--outer, 1);
          border-radius: calc(var(--radius, 14) * 1px);
          border-width: calc(var(--border, 2) * 1px * 20);
          filter: blur(calc(var(--border, 2) * 1px * 10));
          background: none;
          pointer-events: none;
          border: none;
        }
      `}</style>
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          ${!customSize ? 'aspect-[3/4]' : ''}
          rounded-2xl 
          relative 
          grid 
          grid-rows-[1fr_auto] 
          shadow-[0_1rem_2rem_-1rem_black] 
          p-4 
          gap-4 
          backdrop-blur-[5px]
          bg-[#030008]
          border border-white/10
          overflow-hidden
          ${className}
        `}
      >
        <div ref={innerRef} data-glow-inner></div>
        <div className="relative z-10 h-full w-full overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
};
