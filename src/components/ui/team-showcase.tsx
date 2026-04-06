import { useState } from 'react';
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram, FaLink } from 'react-icons/fa';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
    website?: string;
  };
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Chadrack',
    role: 'director of photography',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQFnmLdpZW78yA/profile-displayphoto-scale_200_200/B4DZvM8NB2JMAY-/0/1768669895649?e=2147483647&v=beta&t=5VGAB-2gYupLNaHvJHECollR25THd-3oR5wngGlQiY4',
    social: { twitter: '#', linkedin: '#', behance: '#' },
  },
  {
    id: '2',
    name: 'Mak VieSAinte',
    role: 'FOUNDER',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2vnSxNNVGZV2MXRjlGELl-NgLl5kXdpDR6A&s',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '3',
    name: 'Osiris Balonga',
    role: 'LEAD FRONT-END',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQGVqrPPAGHtoQ/profile-displayphoto-scale_200_200/B4DZwhAkjaHwAY-/0/1770080338529?e=2147483647&v=beta&t=q-_6p1VCJ8NN8eHj9zUFwJZds_XpKez9Hy14SAIDp4M',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '4',
    name: 'Jacques',
    role: 'PRODUCT OWNER',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQE-Z7-S1LSYNQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1724143166545?e=2147483647&v=beta&t=6IPCwgOzblGt4p2fEdnY74gMbLyRHii5Ite3A39qQsY',
    social: { linkedin: '#' },
  },
  {
    id: '5',
    name: 'Riche Makso',
    role: 'CTO - PRODUCT DESIGNER',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQEkTAbZLlSrLg/profile-displayphoto-scale_200_200/B4DZoHdu8BGgAY-/0/1761061833315?e=2147483647&v=beta&t=Rg1dBTvq9X2heyhuhBwG2DsEkG65v0vQ35hF2FSeYns',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '6',
    name: 'Jemima',
    role: 'MAKE-UP ARTISTE',
    image: 'https://i.pravatar.cc/400?img=16',
    social: { instagram: '#' } as TeamMember['social'],
  },
];

interface TeamShowcaseProps {
  members?: TeamMember[];
}

export default function TeamShowcase({ members = DEFAULT_MEMBERS }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16 select-none w-full max-w-6xl mx-auto py-8 px-4 md:px-6 font-sans cursor-pointer group/showcase">
      {/* ── Left: photo grid ── */}
      <div className="flex gap-4 md:gap-6 flex-shrink-0 overflow-x-auto pb-1 md:pb-0">
        {/* Column 1 */}
        <div className="flex flex-col gap-4 md:gap-6">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[140px] h-[155px] sm:w-[160px] sm:h-[175px] md:w-[180px] md:h-[195px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4 md:gap-6 mt-[48px] sm:mt-[60px] md:mt-[72px]">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[160px] h-[175px] sm:w-[180px] sm:h-[195px] md:w-[200px] md:h-[215px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4 md:gap-6 mt-[24px] sm:mt-[30px] md:mt-[36px]">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[150px] h-[165px] sm:w-[170px] sm:h-[185px] md:w-[190px] md:h-[205px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: member name list*/}
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-8 md:gap-8 pt-0 md:pt-16 flex-1 w-full">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Photo card 
───────────────────────────────────────── */

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <Link to={`/project/${member.id}`} className="block focus:outline-none flex-shrink-0" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        className={cn(
          'overflow-hidden rounded-xl transition-all duration-500 border border-white/5 hover:border-[#bc77ff] hover:shadow-[0_0_30px_rgba(188,119,255,0.4)] group w-full h-full cursor-pointer',
          className,
          isDimmed ? 'opacity-60' : 'opacity-100',
        )}
        onMouseEnter={() => onHover(member.id)}
        onMouseLeave={() => onHover(null)}
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-contain bg-[#0a0a0a] p-2 transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────
   Member name section
───────────────────────────────────────── */

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial = member.social?.twitter ?? member.social?.linkedin ?? member.social?.instagram ?? member.social?.behance ?? member.social?.website;

  return (
    <Link to={`/project/${member.id}`} className="block focus:outline-none" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        className={cn(
          'cursor-pointer transition-opacity duration-300',
          isDimmed ? 'opacity-50' : 'opacity-100',
        )}
        onMouseEnter={() => onHover(member.id)}
        onMouseLeave={() => onHover(null)}
      >
      {/* Name + social*/}
      <div className="flex items-center gap-2.5">
        <span
           className={cn(
            'w-4 h-3 rounded-[5px] flex-shrink-0 transition-all duration-300',
            isActive ? 'w-5' : 'opacity-25'
          )}
          style={{ backgroundColor: isActive ? 'white' : 'gray' }}
        />
        <span
          className={cn(
            'text-base md:text-xl font-bold leading-none tracking-tight transition-colors duration-300',
            isActive ? 'text-white' : 'text-white/80',
          )}
        >
          {member.name}
        </span>

        {/* Social icons */}
        {hasSocial && (
          <div
            className={cn(
              'flex items-center gap-1.5 ml-0.5 transition-all duration-200',
              isActive
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2 pointer-events-none',
            )}
          >
            {member.social?.website && (
              <a
                href={member.social.website}
                rel="noopener noreferrer"
                className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-all duration-150 hover:scale-110"
                title="Vault"
              >
                <FaLink size={10} />
              </a>
            )}
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-all duration-150 hover:scale-110"
                title="X / Twitter"
              >
                <FaTwitter size={10} />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-all duration-150 hover:scale-110"
                title="LinkedIn"
              >
                <FaLinkedinIn size={10} />
              </a>
            )}
            {member.social?.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                 className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-all duration-150 hover:scale-110"
                title="Instagram"
              >
                <FaInstagram size={10} />
              </a>
            )}
            {member.social?.behance && (
              <a
                href={member.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-all duration-150 hover:scale-110"
                title="Behance"
              >
                <FaBehance size={10} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Role */}
      <p className="mt-1.5 pl-[27px] text-[7px] md:text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
        {member.role}
      </p>
      </div>
    </Link>
  );
}
