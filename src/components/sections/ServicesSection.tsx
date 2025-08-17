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

const MAX_KM = 2000;

// Smaller, thinner circular counter, a bit more to the right
const CircularKmCounter = ({ progress }: { progress: number }) => {
  const radius = 140; // Smaller
  const stroke = 4;
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
          className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white"
          style={{ fontFamily: 'var(--font-bricolage-grotesque), sans-serif' }}
        >
          {km} km
        </span>
      </div>
    </div>
  );
};

function ServiceCard({ service, active }: { service: any; active: boolean }) {
  return (
    <div
      className={`
        relative flex flex-col justify-between
        rounded-2xl border border-white/70
        transition-all duration-300
        ${active ? 'backdrop-blur-lg bg-white/10 shadow-2xl scale-100 z-20' : 'backdrop-blur-md bg-white/5 scale-90 z-10 opacity-60'}
        min-w-[320px] max-w-[340px] h-[340px] px-8 py-7
        overflow-hidden
      `}
      style={{
        boxShadow: active
          ? '0 8px 32px 0 rgba(31, 38, 135, 0.25)'
          : '0 2px 8px 0 rgba(31, 38, 135, 0.10)',
        border: '1.5px solid rgba(255,255,255,0.7)',
        backdropFilter: 'blur(16px)',
        fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
        height: '340px', // Explicitly set height for inline style as well
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

  const [progress, setProgress] = useState(0);

  const [activeIdx, setActiveIdx] = useState(0);
  const services = data?.data || servicesContent.services || [];

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setProgress(Math.max(0, Math.min(1, v)));
    });
  }, [scrollYProgress]);

  const handlePrev = () => setActiveIdx((idx) => (idx === 0 ? services.length - 1 : idx - 1));
  const handleNext = () => setActiveIdx((idx) => (idx === services.length - 1 ? 0 : idx + 1));

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
      className={`relative min-h-[100vh] flex items-center justify-center overflow-hidden ${bricolage.variable}`}
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
        {/* Make the background overlay less dark */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
        {/* Blue transition overlay at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 lg:h-48"
          style={{
            background: `linear-gradient(to bottom, 
              transparent 0%, 
              rgba(39, 61, 151, 0.18) 50%, 
              rgba(39, 61, 151, 0.38) 100%)`
          }}
        />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-8`}
        style={{
          fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
        }}
      >
        {/* Left: Texts and Cards in a row */}
        <div className="flex-1 flex flex-col w-full max-w-3xl">
          {/* Subtitle */}
          <motion.h3
            className="text-white text-xs md:text-sm lg:text-base font-semibold mb-2 tracking-wide uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            style={{
              textShadow: '0 2px 16px rgba(0,0,0,0.18)',
              fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
              letterSpacing: '0.08em',
            }}
          >
            BY ALIGNING OUR OPERATIONS WITH THE HIGHEST STANDARDS,
          </motion.h3>
          {/* Title */}
          <motion.h2
            className="text-white text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            style={{
              textShadow: '0 2px 16px rgba(0,0,0,0.25)',
              fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
              lineHeight: 1.1,
            }}
          >
            AST has built a 20-year track<br />
            record as a partner<br />
            businesses can depend on.
          </motion.h2>
          {/* Row: "OUR SERVICE" and Cards */}
          <div className="flex flex-row items-start gap-8 w-full mt-2">
            {/* "OUR SERVICE" label */}
            <div
              className="uppercase text-[#ffbd59] text-lg md:text-xl lg:text-2xl font-extrabold tracking-widest pt-2 min-w-[160px] whitespace-nowrap"
              style={{ fontFamily: 'var(--font-bricolage-grotesque), sans-serif', letterSpacing: '0.12em' }}
            >
              OUR SERVICE
            </div>
            {/* Card slider */}
            <div className="relative flex flex-row items-center w-full max-w-[700px]">
              {/* Chevron left */}
              <button
                aria-label="Previous service"
                onClick={handlePrev}
                className="absolute left-[-44px] top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
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
                className="absolute right-[-44px] top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
                style={{ boxShadow: '0 2px 8px 0 rgba(31,38,135,0.10)' }}
              >
                <ChevronRightIcon className="w-7 h-7 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Circular KM Counter */}
        <div
          className="flex-1 flex items-center justify-end w-full"
          style={{
            minHeight: 0,
            minWidth: 0,
            height: '100%',
            flexBasis: 0,
            flexGrow: 1,
            flexShrink: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '2vw',
          }}
        >
          <div
            style={{
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