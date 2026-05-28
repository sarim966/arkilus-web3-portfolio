import { motion } from 'framer-motion';
import { PROJECT_SAMPLES } from '../constants';
import TeamShowcase, { TeamMember } from '../components/ui/team-showcase';

export const mappedProjects: TeamMember[] = PROJECT_SAMPLES.map(project => ({
  id: project.id,
  name: project.title,
  role: project.category,
  image: project.bannerImageUrl || project.coverImage,
  social: { website: `/project/${project.id}` }
}));

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#05000a] text-white pt-24 px-6 md:px-12 relative overflow-hidden flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10 w-full max-w-5xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">Architecture</span>
        </h1>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Explore the decentralized tooling and robust community architectures.
        </p>
      </motion.div>

      <div className="w-full relative z-10 flex-1 flex flex-col items-center justify-center pb-24">
        <TeamShowcase members={mappedProjects} />
      </div>
    </div>
  );
}
