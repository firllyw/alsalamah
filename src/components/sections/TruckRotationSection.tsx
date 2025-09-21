'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Hardcoded 3-part content for easier editing
const SECTIONS = [
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

const sectionHeightVh = 85;
const totalSections = SECTIONS.length;
const totalHeightVh = sectionHeightVh * totalSections + 20;

const TruckRotationSection = () => {
  const sectionRef = useRef(null);
  const [truckOpacity, setTruckOpacity] = useState(0);
  const [truckPosition, setTruckPosition] = useState({ x: 120, y: 50 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Global scroll progress for truck animation (using the same phase timing as before)
  const { scrollYProgress: globalScrollProgress } = useScroll();

  // PHASES: Using the same checkpoints from the original TruckScene
  const PHASE2_START = 0.12;      // Truck appears from right, sliding in
  const PHASE3_START = 0.8;       // Start moving left and out of view
  const PHASE3_END = 1;         // Truck exits view

  // Phase 2: Slide in from right positions (in viewport percentages)
  const SLIDEIN_START_X = 120; // Start offscreen right (120% of viewport width)
  const SLIDEIN_END_X = 80;    // Final position (80% of viewport width, in right area)

  useEffect(() => {
    const unsubscribe = globalScrollProgress.on('change', (scrollValue) => {
      if (scrollValue < PHASE2_START) {
        // Before Phase 2: hidden
        setTruckOpacity(0);
      } else if (scrollValue < PHASE3_START) {
        // Phase 2: Show truck_side.png sliding in from right
        const phase2Progress = Math.min(
          Math.max((scrollValue - PHASE2_START) / (PHASE3_START - PHASE2_START), 0),
          1
        );
        
        setTruckOpacity(1); // Fully visible during slide
        
        // Linear interpolation for slide-in position
        const currentX = SLIDEIN_START_X - (SLIDEIN_START_X - SLIDEIN_END_X) * phase2Progress;
        setTruckPosition({ x: currentX, y: 50 }); // Slide horizontally, keep vertically centered
      } else {
        // Phase 3: Move truck further left and out of view
        const phase3Progress = Math.min(
          Math.max((scrollValue - PHASE3_START) / (PHASE3_END - PHASE3_START), 0),
          1
        );
        
        setTruckOpacity(1); // Keep visible during exit
        
        // Continue moving left until off-screen
        const currentX = SLIDEIN_END_X - (SLIDEIN_END_X + 50) * phase3Progress; // Move to -50% (offscreen left)
        setTruckPosition({ x: currentX, y: 50 });
      }
    });

    return () => unsubscribe();
  }, [globalScrollProgress]);

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
      }}
    >
      {/* Truck Side Image */}
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{ 
          opacity: truckOpacity, 
          transition: 'opacity 0.1s ease-out',
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

      {SECTIONS.map((section, idx) => {
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
                  {section.main.map((part, i) => (
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
