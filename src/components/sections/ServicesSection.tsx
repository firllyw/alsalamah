'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import { servicesContent } from '@/data/content';
import { Bricolage_Grotesque } from 'next/font/google';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
});

const MAX_KM = 2000; // As per the new design

// Bigger, thinner circular counter
const CircularKmCounter = ({ progress }: { progress: number }) => {
  const radius = 260; // Much bigger
  const stroke = 4; // Thinner line
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - progress * circumference;
  const km = Math.round(progress * MAX_KM);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        maxWidth: '100%',
        maxHeight: '100%',
      }}
    >
      <svg
        height={radius * 2}
        width={radius * 2}
        className="rotate-[-90deg]"
        style={{ display: 'block' }}
      >
        <circle
          stroke="#fff"
          fill="none"
          strokeWidth={stroke}
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          opacity={0.18}
        />
        <motion.circle
          stroke="#fff"
          fill="none"
          strokeWidth={stroke}
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.2s' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white"
          style={{ fontFamily: 'var(--font-bricolage-grotesque), sans-serif' }}
        >
          {km} km
        </span>
      </div>
    </div>
  );
};

// Service Card with blurry background and white border
function ServiceCard({ service, active }: { service: any; active: boolean }) {
  return (
    <div
      className={`
        relative flex flex-col justify-between
        rounded-2xl border border-white/70
        transition-all duration-300
        ${active ? 'backdrop-blur-lg bg-white/10 shadow-2xl scale-100 z-20' : 'backdrop-blur-md bg-white/5 scale-90 z-10 opacity-60'}
        min-w-[320px] max-w-[340px] h-[260px] px-8 py-7
        overflow-hidden
      `}
      style={{
        boxShadow: active
          ? '0 8px 32px 0 rgba(31, 38, 135, 0.25)'
          : '0 2px 8px 0 rgba(31, 38, 135, 0.10)',
        border: '1.5px solid rgba(255,255,255,0.7)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{service.icon}</span>
        <span className="text-lg font-semibold text-white">{service.title}</span>
      </div>
      <div className="text-white/80 text-base mb-2">{service.description}</div>
      <ul className="text-white/60 text-xs space-y-1 pl-1">
        {service.features?.slice(0, 3).map((f: string, i: number) => (
          <li key={i}>• {f}</li>
        ))}
      </ul>
    </div>
  );
}

interface ServicesSectionProps {
  data?: any;
}

const ServicesSection = ({ data }: ServicesSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? sectionRef : undefined,
    offset: ['start end', 'end start'],
  });

  // Animate the progress from 0 to 1 as the section scrolls into view
  const [progress, setProgress] = useState(0);

  // Card slider state
  const [activeIdx, setActiveIdx] = useState(0);
  const services = data?.data || servicesContent.services || [];

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setProgress(Math.max(0, Math.min(1, v)));
    });
  }, [scrollYProgress]);

  // Card slider handlers
  const handlePrev = () => setActiveIdx((idx) => (idx === 0 ? services.length - 1 : idx - 1));
  const handleNext = () => setActiveIdx((idx) => (idx === services.length - 1 ? 0 : idx + 1));

  // For the slider, show the active and the next card (partly visible)
  const getCardsToShow = () => {
    const nextIdx = (activeIdx + 1) % services.length;
    return [
      { ...services[activeIdx], active: true, key: activeIdx },
      { ...services[nextIdx], active: false, key: nextIdx },
    ];
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`relative min-h-[100vh] flex items-center justify-center overflow-hidden`}
      style={{
        fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/truck_journey.png"
          alt="Truck Journey"
          fill
          style={{ objectFit: 'cover' }}
          className="pointer-events-none select-none"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        {/* Blue transition overlay at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 lg:h-48"
          style={{
            background: `linear-gradient(to bottom, 
              transparent 0%, 
              rgba(39, 61, 151, 0.3) 50%, 
              rgba(39, 61, 151, 0.6) 100%)`
          }}
        />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-8 font-bricolage`}
      >
        {/* Left: Title, Subtitle, Card Slider */}
        <div className="flex-1 flex flex-col items-start justify-center w-full max-w-xl">
          {/* Title & Subtitle */}
          <motion.h2
            className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-2 tracking-wide"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              textShadow: '0 2px 16px rgba(0,0,0,0.25)',
            }}
          >
            BY ALIGNING OUR OPERATIONS WITH THE HIGHEST STANDARDS,
          </motion.h2>
          <motion.p
            className="text-white text-base md:text-lg lg:text-xl font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              textShadow: '0 2px 16px rgba(0,0,0,0.18)',
              lineHeight: 1.2,
            }}
          >
            AST has built a 20-year track<br />
            record as a partner<br />
            businesses can depend on.
          </motion.p>
          {/* "OUR SERVICE" label */}
          <div className="uppercase text-[#ffbd59] text-xs font-bold tracking-widest mb-2">
            OUR SERVICE
          </div>
          {/* Card slider */}
          <div className="relative w-full flex flex-row items-center mb-4">
            {/* Chevron left */}
            <button
              aria-label="Previous service"
              onClick={handlePrev}
              className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
              style={{ boxShadow: '0 2px 8px 0 rgba(31,38,135,0.10)' }}
            >
              <ChevronLeftIcon className="w-7 h-7 text-white" />
            </button>
            {/* Cards */}
            <div className="flex flex-row gap-[-40px] w-full overflow-visible">
              {getCardsToShow().map((card, idx) => (
                <div
                  key={card.key}
                  className={`transition-transform duration-300 ${idx === 1 ? '-ml-16' : ''}`}
                  style={{
                    zIndex: card.active ? 20 : 10,
                  }}
                >
                  <ServiceCard service={card} active={card.active} />
                </div>
              ))}
            </div>
            {/* Chevron right */}
            <button
              aria-label="Next service"
              onClick={handleNext}
              className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
              style={{ boxShadow: '0 2px 8px 0 rgba(31,38,135,0.10)' }}
            >
              <ChevronRightIcon className="w-7 h-7 text-white" />
            </button>
          </div>
          {/* Chevron down for mobile (optional) */}
          {/* <div className="flex justify-center w-full mt-2">
            <ChevronDownIcon className="w-7 h-7 text-white/60" />
          </div> */}
        </div>

        {/* Right: Circular KM Counter */}
        <div
          className="flex-1 flex items-center justify-center w-full"
          style={{
            minHeight: 0,
            minWidth: 0,
            height: '100%',
            flexBasis: 0,
            flexGrow: 1,
            flexShrink: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              minWidth: 0,
              minHeight: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          >
            <CircularKmCounter progress={progress} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;