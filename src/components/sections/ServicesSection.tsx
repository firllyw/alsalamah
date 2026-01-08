'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useInView, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';
import { Bricolage_Grotesque } from 'next/font/google';

// Chevron icons (you can replace with your preferred icon library)
const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15,18 9,12 15,6"></polyline>
  </svg>
);

const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,18 15,12 9,6"></polyline>
  </svg>
);

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
});

const MAX_KM = 2000;
const CIRCLE_RADIUS = 200; // Increased from 140

// Fallback service cards content
const FALLBACK_SERVICES = [
  {
    title: "Domestic Service",
    description:
      "Covers the entire Kingdom of Saudi Arabia with a fleet of GPS-enabled vehicles and strategically located depots. We ensure fast, safe, and reliable movement of goods across all regions.",
  },
  {
    title: "Cross-Border Service",
    description:
      "Connects Saudi Arabia with the GCC Countries, Iraq region, as well as Jordan and the broader Middle East, ensuring smooth, secure, and timely cross-border logistics.",
  },
];

// Circular KM Counter with MotionValue support
const CircularKmCounter = ({ progress }: { progress: MotionValue<number> }) => {
  const radius = CIRCLE_RADIUS;
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  
  // Transform the motion value to get offset and km values
  const offset = useTransform(progress, [0, 1], [circumference, 0]);
  const km = useTransform(progress, [0, 1], [0, MAX_KM]);

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
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white"
          style={{ fontFamily: 'var(--font-bricolage-grotesque), sans-serif' }}
        >
          <motion.span>{useTransform(km, (value) => `${Math.round(value)} km`)}</motion.span>
        </motion.span>
      </div>
    </div>
  );
};

function ServiceCard({
  title,
  description,
  isMobile = false,
}: {
  title: string;
  description: string;
  isMobile?: boolean;
}) {
  // Card hover state for blur effect
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`
        relative flex flex-col justify-between
        rounded-2xl border border-white
        transition-all duration-300
        ${isMobile
          ? 'w-[90vw] max-w-[calc(100vw-4rem)] min-w-0 px-4 py-4 sm:px-6 sm:py-5 sm:w-[85vw] sm:max-w-[calc(100vw-5rem)]'
          : 'min-w-[340px] max-w-[380px] h-[300px] px-8 py-6'
        }
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
        height: isMobile ? '320px' : '340px',
        fontSize: hovered ? 'current' : '1rem',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col gap-1">
        <span className={`font-bold text-white mb-3 ${isMobile ? 'text-base' : 'md:text-lg'}`}>{title}</span>
        <div className={`text-white/80 ${isMobile ? 'text-sm' : 'text-sm md:text-base'}`}>{description}</div>
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
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [isMobile, setIsMobile] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);

    // Detect mobile screen size
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is md breakpoint in Tailwind
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    // If data is passed as prop, use it
    if (data?.services) {
      setServices(data.services);
    } else if (data?.data) {
      setServices(data.data);
    }
    // If no data is passed, keep fallback services
  }, [data]);

  // Navigation functions for mobile
  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % services.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  // Touch/swipe handlers for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextCard();
    }
    if (isRightSwipe) {
      prevCard();
    }
  };

  // Use intersection observer to trigger animation when in view
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, margin: "-100px" });
  
  // Create animated progress value that goes from 0 to 1
  const progress = useMotionValue(0);
  const animatedProgress = useSpring(progress, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isInView) {
      // Animate to 1 over 2.5 seconds when in view
      progress.set(1);
    }
  }, [isInView, progress]);

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
        className={`relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24 ${isMobile ? 'flex flex-col' : 'flex flex-col lg:flex-row'} items-center justify-between gap-8`}
        style={{
          fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
        }}
      >
        {/* Left: Texts and Cards in a column */}
        <div className={`${isMobile ? 'w-full' : 'flex-1'} flex flex-col w-full max-w-3xl`}>
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
          </motion.h2>
          {/* Cards row */}
          <div className="relative w-full mt-4">
            {/* Mobile Navigation Buttons */}
            {isMobile && (
              <div className="flex justify-center items-center mb-4 relative px-8">
                <div className="flex gap-2 z-10">
                  {services.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        idx === currentCardIndex ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={prevCard}
                  className="absolute left-0 bg-white/20 backdrop-blur-sm rounded-full p-1.5 text-white hover:bg-white/30 transition-colors"
                  aria-label="Previous card"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={nextCard}
                  className="absolute right-0 bg-white/20 backdrop-blur-sm rounded-full p-1.5 text-white hover:bg-white/30 transition-colors"
                  aria-label="Next card"
                >
                  <ChevronRight />
                </button>
              </div>
            )}

            {/* Cards Container */}
            <div
              className={`
                flex flex-row items-start gap-4 w-full
                ${isMobile ? 'overflow-x-hidden' : ''}
              `}
            >
              {isMobile ? (
                // Mobile: Show single card with transform and touch support
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${currentCardIndex * 100}%)`,
                    width: `${services.length * 100}%`
                  }}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  {services.map((service, idx) => (
                    <div key={service.title} className="w-full flex-shrink-0 px-1">
                      <ServiceCard
                        title={service.title}
                        description={service.description}
                        isMobile={true}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                // Desktop: Show all cards
                services.map((service, idx) => (
                  <ServiceCard
                    key={service.title}
                    title={service.title}
                    description={service.description}
                    isMobile={false}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Circular KM Counter */}
        <div
          className={`flex-1 flex items-center justify-end w-full ${isMobile ? 'hidden' : ''}`}
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
            <div ref={counterRef}>
              {isMobile ? null : (
                <CircularKmCounter progress={animatedProgress} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;