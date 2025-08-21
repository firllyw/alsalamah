'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
});

const MAX_KM = 2000;
const CIRCLE_RADIUS = 200; // Increased from 140

// Service cards content as JSON for easy editing
const SERVICES = [
  {
    title: "Domestic Service",
    description:
      "Covers the entire Kingdom of Saudi Arabia with a fleet of GPS-enabled vehicles and strategically located depots. We ensure fast, safe, and reliable movement of goods across all regions.",
  },
  {
    title: "Cross-Border Service",
    description:
      "Connects Saudi Arabia with the Levant, Iraq region, as well as Jordan and the broader Middle East, ensuring smooth, secure, and timely cross-border logistics.",
  },
];

// Circular KM Counter (unchanged)
const CircularKmCounter = ({ progress }: { progress: number }) => {
  const radius = CIRCLE_RADIUS;
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
          className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white"
          style={{ fontFamily: 'var(--font-bricolage-grotesque), sans-serif' }}
        >
          {km} km
        </span>
      </div>
    </div>
  );
};

function ServiceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  // Card hover state for blur effect
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`
        relative flex flex-col justify-between
        rounded-2xl border border-white
        transition-all duration-300
        min-w-[340px] max-w-[380px] h-[300px] px-8 py-6
        overflow-hidden
        cursor-pointer
        ${hovered ? 'backdrop-blur-lg bg-white/10 shadow-2xl' : 'bg-white/5'}
      `}
      style={{
        boxShadow: hovered
          ? '0 12px 40px 0 rgba(31, 38, 135, 0.28)'
          : '0 4px 16px 0 rgba(31, 38, 135, 0.13)',
        border: '1.5px solid rgba(255,255,255,1)',
        backdropFilter: 'blur(18px)',
        fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
        height: '340px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col gap-2">
        <span className="text-xl md:text-2xl text-white">{title}</span>
        <div className="text-white/80 text-base md:text-lg">{description}</div>
      </div>
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

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setProgress(Math.max(0, Math.min(1, v)));
    });
  }, [scrollYProgress]);

  // Use SERVICES constant for cards
  const services = SERVICES;

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
        {/* Make the background overlay even less dark */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.18)' }} />
        {/* Blue transition overlay at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 lg:h-48"
          style={{
            background: `linear-gradient(to bottom, 
              transparent 0%, 
              rgba(39, 61, 151, 0.13) 50%, 
              rgba(39, 61, 151, 0.28) 100%)`
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
        {/* Left: Texts and Cards in a column */}
        <div className="flex-1 flex flex-col w-full max-w-3xl">
          {/* Subtitle */}
          {/* "OUR SERVICE" label below the cards */}
          <div
            className="uppercase text-[#ffbd59] text-lg md:text-xl lg:text-2xl font-extrabold tracking-widest pt-6 min-w-[160px] whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
              letterSpacing: '0.12em',
            }}
          >
            OUR SERVICE
          </div>
          <motion.h3
            className="text-white/90 text-xs md:text-sm lg:text-base font-medium mb-2 tracking-wide uppercase"
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
            className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium mb-6 leading-normal"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            style={{
              textShadow: '0 2px 16px rgba(0,0,0,0.25)',
              fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
              lineHeight: 1.2,
            }}
          >
            AST has built a 20-year track<br />
            record as a partner businesses<br />
            can depend on.
          </motion.h2>
          {/* Cards row */}
          <div className="flex flex-row items-start gap-6 w-full mt-4">
            {services.map((service, idx) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
              />
            ))}
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