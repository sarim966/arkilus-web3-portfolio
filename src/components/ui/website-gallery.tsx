"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "./button";
import { GlowCard } from "./spotlight-card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  video?: string;
  tags?: string[];
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items?: Gallery4Item[];
}

const defaultItems: Gallery4Item[] = [
  {
    id: "seismic",
    title: "SEISMIC ACADEMY V2",
    description:
      "A comprehensive educational platform for seismic , featuring advanced course management and technical resource distribution.",
    href: "https://seismicacademyv2.vercel.app/",
    image: "/assets/projects/seismic/cover.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "base44",
    title: "LINKEDIN AGENT",
    description:
      "A smart automation tool that aggregates real-time job listings and market demands into a centralized dashboard for career strategic planning.",
    href: "https://liagenttest5.vercel.app/",
    image: "/assets/projects/alpha-sharing/cover.jpg",
    tags: ["AI Automation", "React", "Market Analysis"],
  },
  {
    id: "nodesync",
    title: "THE BEYOND STUDIO",
    description:
      "A high-conversion, fully animated landing page built to maximize customer acquisition through immersive visual storytelling and seamless interaction.",
    href: "https://thebeyondstudio.vercel.app/",
    image: "/assets/projects/prisma/cover.jpg",
    tags: ["Framer Motion", "GSAP", "Conversion UI"],
  },
  {
    id: "mantle-ai",
    title: "MANTLE AI YIELD SCANNER",
    description: "An AI-driven DeFi intelligence platform that scans and optimizes yield-generating opportunities across the Mantle ecosystem in real-time.",
    href: "https://mantle-ai-yield-scanner.vercel.app/",
    image: "/assets/projects/opinionated/cover.jpg",
    tags: ["Mantle Network", "AI Analytics", "DeFi"],
  },
];

const Gallery4 = ({
  title = "PROJECTS I'VE BUILT",
  description = "Explore my project deployments, live interfaces and technical architectures.",
  items = defaultItems,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="px-12 py-0 my-0 bg-[#030008] relative overflow-hidden">
      <div className="pt-0 pb-12 w-full">
      {/* Ambient glow removed for unified obsidian theme */}

      <div className="container mx-auto max-w-7xl px-6 min-h-[20vh] flex flex-col justify-center pt-8 pb-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 w-full">
          <div className="flex flex-col gap-4 text-left">
            <h2 className="uppercase font-black italic tracking-tighter text-3xl md:text-5xl text-[#bc77ff] drop-shadow-[0_0_15px_rgba(188,119,255,0.4)]">
              {title}
            </h2>
            <p className="max-w-2xl text-white/40 text-sm md:text-base uppercase tracking-widest leading-relaxed">
              Explore my project deployments, live interfaces and technical architectures.
            </p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto disabled:opacity-30 border border-white/10 hover:border-[#bc77ff]/50 transition-all"
            >
              <ArrowLeft className="size-5 text-white" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto disabled:opacity-30 border border-white/10 hover:border-[#bc77ff]/50 transition-all"
            >
              <ArrowRight className="size-5 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Section divider - subtle obsidian */}
      <div className="relative h-12 w-full bg-[#030008] flex justify-center items-center overflow-visible mb-6">
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-[#bc77ff]/30 to-transparent" />
      </div>

      <div className="w-full px-10 md:px-20">
        <Carousel
          setApi={setCarouselApi}
          opts={{ align: "center", loop: true }}
        >
          <CarouselContent className="-ml-4">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/4"
              >
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block h-full">
                  <GlowCard
                    customSize={true}
                    glowColor="purple"
                    className="h-full min-h-[27rem] rounded-[2rem] overflow-hidden border border-white/5"
                  >
                    {item.id === "seismic" || item.id === "base44" || item.id === "nodesync" || item.id === "mantle-ai" ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-t-[2rem]"
                      />
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 h-full bg-gradient-to-t from-[#030008] via-[#030008]/60 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 md:p-8">
                      {/* Tags */}
                      {item.tags && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] uppercase tracking-widest text-[#bc77ff] bg-[#bc77ff]/10 border border-[#bc77ff]/20 rounded-full px-3 py-1 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mb-2 pt-2 text-xl font-bold text-white md:mb-3">
                        {item.title}
                      </div>
                      <div className="mb-8 line-clamp-2 text-white/50 text-sm leading-relaxed md:mb-12 lg:mb-9">
                        {item.description}
                      </div>
                      <div className="flex items-center text-sm text-[#bc77ff] font-medium">
                        Explore{" "}
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </GlowCard>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Dot indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-[#bc77ff] w-6" : "bg-white/20 hover:bg-white/40"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };
