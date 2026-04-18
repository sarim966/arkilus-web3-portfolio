"use client";

import React, { useState, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96'
};

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  size = 'md',
  width,
  height,
  customSize = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getSizeClasses = () => {
    if (customSize) {
      return '';
    }
    return sizeMap[size];
  };

  const getInlineStyles = () => {
    const baseStyles: React.CSSProperties = {
      position: 'relative',
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
        [data-glow] {
          position: relative;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        [data-glow]::before {
          pointer-events: none;
          content: "";
          position: absolute;
          inset: -3px;
          border-radius: calc(24 * 1px);
          opacity: 0;
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          transition: opacity 300ms ease-out;
          background: radial-gradient(
            600px circle at 50% 50%,
            rgba(168, 85, 247, 0.4),
            transparent 40%
          );
          z-index: 1;
        }
        
        [data-glow]::after {
          pointer-events: none;
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: calc(24 * 1px);
          opacity: 0;
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          transition: opacity 300ms ease-out;
          background: radial-gradient(
            400px circle at 50% 50%,
            rgba(255, 255, 255, 0.15),
            transparent 40%
          );
          z-index: 2;
        }
        
        [data-glow].is-hovered::before {
          opacity: 1;
        }
        
        [data-glow].is-hovered::after {
          opacity: 1;
        }
        
        [data-glow]:not(.is-hovered)::before,
        [data-glow]:not(.is-hovered)::after {
          transition: opacity 700ms ease-out;
        }
        
        [data-glow] [data-glow-border] {
          position: absolute;
          inset: 0;
          border-radius: calc(24 * 1px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          pointer-events: none;
          z-index: 0;
        }
        
        [data-glow] [data-glow-content] {
          position: relative;
          z-index: 10;
          height: 100%;
          width: 100%;
          overflow: hidden;
          border-radius: calc(24 * 1px);
        }
      `}</style>
      <div
        data-glow
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          ${!customSize ? 'aspect-[3/4]' : ''}
          ${isHovered ? 'is-hovered' : ''}
          rounded-[2rem]
          overflow-hidden
          backdrop-blur-[5px]
          bg-[#030008]
          ${className}
        `}
      >
        <div data-glow-border></div>
        <div data-glow-content>
          {children}
        </div>
      </div>
    </>
  );
};

export { GlowCard };
