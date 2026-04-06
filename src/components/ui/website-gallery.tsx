"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "./button";
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
  tags?: string[];
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items?: Gallery4Item[];
}

const defaultItems: Gallery4Item[] = [
  {
    id: "prismax",
    title: "PrismaX Finance",
    description:
      "High-performance DeFi interface for cross-chain liquidity aggregation and yield optimization.",
    href: "https://prismax.example.com",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["React", "Next.js", "Solidity"],
  },
  {
    id: "base44",
    title: "Base44 Protocol",
    description:
      "Technical infrastructure and node management dashboard for decentralized validator networks.",
    href: "https://base44.io",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["TypeScript", "Vite", "Tailwind"],
  },
  {
    id: "nodesync",
    title: "NodeSync Dashboard",
    description:
      "Real-time blockchain node monitoring with 3D visualization of network topology and consensus health.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Three.js", "GSAP", "WebSocket"],
  },
  {
    id: "vaultx",
    title: "VaultX Interface",
    description:
      "Secure multi-sig wallet interface with animated transaction flows and on-chain governance integration.",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tags: ["Framer Motion", "Rust", "Solana"],
  },
];

const Gallery4 = ({
  title = "DIGITAL INTERFACES",
  description = "Click any project to explore the live interface and technical breakdown.",
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
    <section className="px-12 py-24 bg-gradient-to-b from-[#030014] via-[#05001a] to-[#030014] relative overflow-hidden">
      {/* Ambient glow bleeding from section above */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#bc77ff]/8 blur-[180px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-end justify-between md:mb-14 lg:mb-16 gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="font-black italic tracking-tighter text-3xl md:text-5xl text-[#bc77ff] uppercase drop-shadow-[0_0_15px_rgba(188,119,255,0.5)]">
              {title}
            </h2>
            <p className="max-w-lg text-white/40 text-sm uppercase tracking-widest">{description}</p>
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
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="group rounded-3xl block">
                  <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-3xl border border-white/5 hover:border-[#bc77ff]/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(188,119,255,0.15)] md:aspect-[5/4] lg:aspect-[16/9]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 h-full bg-gradient-to-t from-[#030014] via-[#030014]/60 to-transparent" />
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
                  </div>
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
    </section>
  );
};

export { Gallery4 };
