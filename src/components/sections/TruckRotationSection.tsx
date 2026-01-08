'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface TruckRotationSectionProps {
  data?: {
    sections?: Array<{
      number: string;
      title: string;
      subtitle: string;
      content: string;
      main: Array<{ text: string; color: string }>;
      caption: string;
    }>;
  };
}

// Fallback data for backward compatibility
const DEFAULT_SECTIONS = [
  {
    main: [
      { text: "To be the most trusted and innovative transportation partner in Saudi Arabia", color: "#273d97" },
      ],
    title: "VISION",
    caption: "Recognized for operational excellence, technological advancement, and an unwavering commitment to quality."
  },
  {
    main: [
      { text: "To provide reliable transportation and distribution services.", color: "#273d97" },
    ],
    title: "MISSION",
    caption: "Empowering businesses, strengthen supply chains, and connect communities across Saudi Arabia and the region — delivering on time, every time."
  },
  {
    main: [
      { text: "Reliability and safety are more than promises - they are our operating principles.", color: "#273d97" }
    ],
    title: "COMMITMENT",
    caption: "We invest in a well-maintained, modern fleet equipped with real-time tracking technology, ensuring predictable delivery schedules and transparent communication."
  }
];

const TruckRotationSection = ({ data }: TruckRotationSectionProps) => {
  // Use data from props or fallback to default
  const sections = data?.sections || DEFAULT_SECTIONS;
  
  const sectionHeightVh = 85;
  const totalSections = sections.length;
  const totalHeightVh = sectionHeightVh * totalSections + 20;
  const sectionRef = useRef(null);
  const [truckOpacity, setTruckOpacity] = useState(0);
  const [truckPosition, setTruckPosition] = useState({ x: 120, y: 50 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is md breakpoint in Tailwind
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Get responsive stationary position
  const getStationaryX = () => isMobile ? TRUCK_STATIONARY_X_MOBILE : TRUCK_STATIONARY_X_DESKTOP;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Global scroll progress for truck animation (using the same phase timing as before)
  const { scrollYProgress: globalScrollProgress } = useScroll();

  // PHASES: Truck slides in from right, stays stationary, then exits left
  const PHASE1_START = 0.12;     // Start sliding in from right
  const PHASE1_END = 0.18;       // Finish sliding in to stationary position
  const PHASE2_STATIONARY_END = 0.4; // Truck stays in position until this point
  const PHASE3_START = 0.4;      // Start moving left and out of view
  const PHASE3_END = 0.42;        // Truck exits view

  // Truck positions (in viewport percentages)
  const TRUCK_START_X = 150;     // Starting position (off-screen right)
  const TRUCK_STATIONARY_X_DESKTOP = 100; // Stationary position for desktop (visible on screen)
  const TRUCK_STATIONARY_X_MOBILE = 180;   // Stationary position for mobile (right edge)
  const TRUCK_EXIT_X = 0;      // Final exit position (offscreen left)

  useEffect(() => {
    const unsubscribe = globalScrollProgress.on('change', (scrollValue) => {
      const stationaryX = getStationaryX();

      if (scrollValue < PHASE1_START) {
        // Before Phase 1: hidden, positioned off-screen right
        setTruckOpacity(0);
        setTruckPosition({ x: TRUCK_START_X, y: 50 });
      } else if (scrollValue < PHASE1_END) {
        // Phase 1: Slide in from right to stationary position
        const phase1Progress = Math.min(
          Math.max((scrollValue - PHASE1_START) / (PHASE1_END - PHASE1_START), 0),
          1
        );

        setTruckOpacity(1); // Show truck as it slides in

        // Move from start position to stationary position (right to left)
        const currentX = TRUCK_START_X - (TRUCK_START_X - stationaryX) * phase1Progress;
        setTruckPosition({ x: currentX, y: 50 });
      } else if (scrollValue < PHASE2_STATIONARY_END) {
        // Phase 2: Truck stays stationary at current position
        setTruckOpacity(1);
        setTruckPosition({ x: stationaryX, y: 50 });
      } else if (scrollValue < PHASE3_START) {
        // Transition phase: still stationary but preparing to move
        setTruckOpacity(1);
        setTruckPosition({ x: stationaryX, y: 50 });
      } else if (scrollValue < PHASE3_END) {
        // Phase 3: Move truck left and out of view
        const phase3Progress = Math.min(
          Math.max((scrollValue - PHASE3_START) / (PHASE3_END - PHASE3_START), 0),
          1
        );

        setTruckOpacity(1); // Keep visible during exit

        // Move from stationary position to exit position (left to further left)
        const currentX = stationaryX - (stationaryX - TRUCK_EXIT_X) * phase3Progress;
        setTruckPosition({ x: currentX, y: 50 });
      } else {
        // After Phase 3: truck is off-screen left
        setTruckOpacity(0);
        setTruckPosition({ x: TRUCK_EXIT_X, y: 50 });
      }
    });

    return () => unsubscribe();
  }, [globalScrollProgress, isMobile]);

  const getOpacity = (idx: number) => {
    return useTransform(
      scrollYProgress,
      [(idx) / totalSections, (idx + 1) / totalSections, (idx + 1.1) / totalSections],
      [1, 1, 0]
    );
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full font-bricolage`}
      style={{
        height: `${totalHeightVh}vh`,
        background: 'transparent',
        fontFamily: 'Bricolage Grotesque, sans-serif',
        direction: 'ltr', // Force LTR layout for truck rotation section
      }}
    >
      {/* Truck Side Image */}
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{ 
          opacity: truckOpacity, 
          transition: 'opacity 0.05s ease-out',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: `${truckPosition.y}%`,
            left: `${truckPosition.x}%`,
            transform: 'translate(-50%, -50%)',
            background: 'transparent',
            border: 'none',
            outline: 'none',
          }}
        >
          <img
            src="/truck_side.png"
            alt="Truck Side"
            style={{
              maxWidth: '1000px',
              maxHeight: '800px',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              backgroundImage: 'none',
            }}
          />
        </div>
      </div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;700&display=swap');
          .font-bricolage {
            font-family: 'Bricolage Grotesque', sans-serif;
          }
        `}
      </style>

      {sections.map((section: any, idx: number) => {
        const opacity = getOpacity(idx);
        return (
          <motion.div
            key={idx}
            className={`absolute left-0 w-full`}
            style={{
              top: `${sectionHeightVh * idx}vh`,
              height: `${sectionHeightVh}vh`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              opacity: opacity,
            }}
          >
            <div className="max-w-[1800px] w-full mx-auto px-4 lg:px-24 flex flex-row items-center h-full">
              {/* Left: Main Content */}
              <div className="flex-1 flex flex-col justify-center max-w-[900px]">
                {/* Title */}
                <span
                  className="tracking-wider mb-4"
                  style={{
                    color: '#FFA500',
                    fontFamily: 'Bricolage Grotesque, sans-serif',
                    letterSpacing: '0.08em',
                    fontSize: '1.3rem', // decreased from 1.25rem
                  }}
                >
                  {section.title}
                </span>
                {/* Main Statement */}
                <h3
                  className="leading-snug mb-6"
                  style={{
                    lineHeight: 1.15,
                    fontFamily: 'Bricolage Grotesque, sans-serif',
                    fontSize: '2.5rem', // decreased from 2.1rem
                    marginBottom: '1.2rem',
                    marginTop: '1.2rem',
                    letterSpacing: '0rem',
                  }}
                >
                  {section.main?.map((part: any, i: number) => (
                    <span
                      key={i}
                      style={{
                        color: part.color,
                        display: 'block',
                        fontFamily: 'Bricolage Grotesque, sans-serif',
                        fontSize: 'inherit',
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </h3>
                {/* Caption */}
                <span
                  className="text-[#6B7280] text-left max-w-2xl text-sm md:text-base"
                  style={{
                    fontFamily: 'Bricolage Grotesque, sans-serif',
                    fontWeight: 400,
                  }}
                >
                  {section.caption}
                </span>
              </div>
              {/* Right: Placeholder for truck image/3D scene */}
              <div className="flex-1 flex items-center justify-end h-full relative" />
            </div>
          </motion.div>
        );
      })}

      {/* Spacer below the section to allow the truck to move left as user scrolls to next section */}
      <div
        aria-hidden="true"
        className="w-full"
        style={{
          height: '10vh',
          minHeight: '40px',
        }}
      />
    </section>
  );
};

export default TruckRotationSection;
