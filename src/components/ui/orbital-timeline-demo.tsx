"use client";

import { PenTool, Video, Users, Shield, Code, Layers, Sparkles } from "lucide-react";
import OrbitalTimeline from "./orbital-timeline";

// High-density 5-node expertise constellation
const timelineData = [
  {
    id: 1,
    title: "Content Creator",
    date: "Content",
    content: "Focused on high-retention visual narratives and engagement that resonate with Web3 audiences.",
    category: "CONTENT",
    icon: PenTool,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 95,
    skills: ["Visual Design", "Copywriting", "Engagement", "Brand Voice", "Storytelling"],
    stack: ["Notion", "Canva", "X"],
    impact: "Optimized user onboarding. Strengthened brand voice. Increased audience retention."
  },
  {
    id: 2,
    title: "Community Manager",
    date: "Community",
    content: "Cultivating organic growth and 'Diamond Hand' cultures through authentic engagement.",
    category: "COMMUNITY",
    icon: Users,
    relatedIds: [1, 5],
    status: "completed" as const,
    energy: 92,
    skills: ["Discord", "Telegram", "Governance", "Events", "Moderation"],
    stack: ["Discord", "Telegram", "Snapshot", "Guild"],
    impact: "Strengthened community retention. Improved member engagement. Streamlined onboarding flow."
  },
  {
    id: 3,
    title: "Technical Writer",
    date: "Writing",
    content: "Simplifying complex protocol mechanics into accessible documentation and guides.",
    category: "WRITING",
    icon: Layers,
    relatedIds: [4, 5],
    status: "completed" as const,
    energy: 88,
    skills: ["Documentation", "API Docs", "Tutorials", "Research", "Editing"],
    stack: ["Notion", "Perplexity", "GitBook"],
    impact: "Streamlined technical documentation. Reduced support tickets. Improved developer adoption."
  },
  {
    id: 4,
    title: "Artistic Frontend Dev",
    date: "Development",
    content: "Building immersive, fluid dApp interfaces with a creative edge and Web3-native UX.",
    category: "DEVELOPMENT",
    icon: Code,
    relatedIds: [1, 3, 5],
    status: "in-progress" as const,
    energy: 90,
    skills: ["React", "TypeScript", "Tailwind", "Framer Motion", "Web3 UX"],
    stack: ["Next.js", "Vite", "RainbowKit", "Ethers.js"],
    impact: "Enhanced user experience. Reduced interface friction. Improved visual storytelling."
  },
  {
    id: 5,
    title: "On-chain Developer",
    date: "Development",
    content: "Securing backend systems and smart contract integration for reliable Web3 applications.",
    category: "BLOCKCHAIN",
    icon: Shield,
    relatedIds: [2, 3, 4],
    status: "in-progress" as const,
    energy: 85,
    skills: ["Solidity", "Node.js", "Security", "Integration", "Testing"],
    stack: ["Hardhat", "Foundry", "The Graph", "Alchemy"],
    impact: "Secured contract integrations. Optimized gas efficiency. Enhanced protocol reliability."
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
