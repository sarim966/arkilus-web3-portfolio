"use client";

import { PenTool, Video, Users, Shield, Code, Layers, Sparkles } from "lucide-react";
import OrbitalTimeline from "./orbital-timeline";

// High-density 5-node expertise constellation
const timelineData = [
  {
    id: 1,
    title: "Technical Writing",
    date: "Content",
    content: "Engineering viral threads that decode complex protocol mechanics into digestible, high-retention narratives.",
    category: "Content",
    icon: PenTool,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 98,
    skills: ["Scripts", "Hooks", "Copywriting", "Tokenomics", "SEO"],
    stack: ["Notion", "Grammarly", "Figma", "Twitter API"],
    impact: "2M+ impressions generated"
  },
  {
    id: 2,
    title: "Visual Storytelling",
    date: "Content",
    content: "Architecting transparent guides and motion graphics that make blockchain architecture accessible.",
    category: "Content",
    icon: Video,
    relatedIds: [1, 5],
    status: "completed" as const,
    energy: 92,
    skills: ["After Effects", "Premiere", "Motion Design", "3D", "Color Theory"],
    stack: ["Adobe CC", "Blender", "Cinema 4D", "Lottie"],
    impact: "500K+ views across platforms"
  },
  {
    id: 3,
    title: "Community Architecture",
    date: "Community",
    content: 'Cultivating "Diamond Hand" cultures through strategic engagement frameworks and governance models.',
    category: "Community",
    icon: Users,
    relatedIds: [4, 5],
    status: "completed" as const,
    energy: 94,
    skills: ["Discord", "Telegram", "DAO Tools", "Governance", "Events"],
    stack: ["Collab.Land", "Snapshot", "Guild", "Zealy"],
    impact: "15K+ active community members"
  },
  {
    id: 4,
    title: "Frontend Architecture",
    date: "Development",
    content: "Building immersive dApp interfaces with fluid animations and Web3-native UX patterns.",
    category: "Development",
    icon: Code,
    relatedIds: [1, 3, 5],
    status: "in-progress" as const,
    energy: 88,
    skills: ["React", "TypeScript", "Tailwind", "Framer Motion", "Wagmi"],
    stack: ["Next.js", "Vite", "RainbowKit", "Ethers.js"],
    impact: "12 production dApps deployed"
  },
  {
    id: 5,
    title: "Digital Exhibitionist",
    date: "Development",
    content: "Smart contract integration and secure backend systems for high-frequency Web3 applications.",
    category: "Development",
    icon: Sparkles,
    relatedIds: [2, 3, 4],
    status: "in-progress" as const,
    energy: 85,
    skills: ["Solidity", "Node.js", "Graph", "IPFS", "AWS"],
    stack: ["Hardhat", "Foundry", "The Graph", "Pinata"],
    impact: "$5M+ TVL secured"
  },
];

export function OrbitalTimelineDemo() {
  return (
    <section className="w-full h-screen bg-[#030008]">
      <OrbitalTimeline timelineData={timelineData} />
    </section>
  );
}

export default OrbitalTimelineDemo;
