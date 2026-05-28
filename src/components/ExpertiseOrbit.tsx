import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PenTool, Users, Layers, Zap } from "lucide-react";
import { EXPERTISE } from '../constants';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'PenTool': return <PenTool className="w-5 h-5" />;
    case 'Users': return <Users className="w-5 h-5" />;
    case 'Layers': return <Layers className="w-5 h-5" />;
    default: return <Zap className="w-5 h-5" />;
  }
};

const getColor = (index: number) => {
  const colors = [
    "from-purple-500 to-blue-500",
    "from-pink-500 to-purple-500",
    "from-blue-500 to-cyan-500",
    "from-orange-500 to-red-500",
    "from-green-500 to-emerald-500",
    "from-yellow-500 to-orange-500"
  ];
  return colors[index % colors.length];
};

export const ExpertiseOrbit = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-20 flex items-center justify-center overflow-hidden">
      {/* Central Glow */}
      <div className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />
      
      {/* The Orbit Circle */}
      <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-white/10 animate-[spin_20s_linear_infinite]">
        {EXPERTISE.map((item, index) => {
          const angle = (index * 360) / EXPERTISE.length;
          return (
            <div
              key={item.id}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `rotate(${angle}deg) translate(clamp(150px, 20vw, 250px)) rotate(-${angle}deg)`,
              }}
            >
              <Card className="p-4 bg-black/50 backdrop-blur-md border-white/10 hover:border-purple-500/50 transition-all group cursor-pointer">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${getColor(index)} mb-2`}>
                  {getIcon(item.icon)}
                </div>
                <p className="text-xs font-medium text-white/70 group-hover:text-white">{item.title}</p>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Center Label */}
      <div className="absolute text-center z-10">
        <Badge variant="outline" className="mb-2 border-purple-500/50 text-purple-400">
          CORE STACK
        </Badge>
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          Expertise<br/>Orbit
        </h2>
      </div>
    </div>
  );
};