'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Hardcoded 3-part content for easier editing
const SECTIONS = [
  {
    main: [
      { text: "To be the most trusted and", color: "#b2b9e6" },
      { text: "innovative transportation", color: "#273d97" },
      { text: "partner in Saudi Arabia.", color: "#b2b9e6" }
    ],
    title: "VISION",
    caption: "Recognized for operational excellence, technological advancement, and an unwavering commitment to quality."
  },
  {
    main: [
      { text: "To provide", color: "#b2b9e6" },
      { text: "reliable transportation and", color: "#273d97" },
      { text: "distribution services.", color: "#b2b9e6" }
    ],
    title: "MISSION",
    caption: "Empowering businesses, strengthen supply chains, and connect communities across Saudi Arabia and the region — delivering on time, every time."
  },
  {
    main: [
      { text: "Reliability and safety are more than promises -", color: "#b2b9e6" },
      { text: "are our operating principles.", color: "#273d97" }
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

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
                  className="font-bold uppercase tracking-wider mb-4"
                  style={{
                    color: '#FFA500',
                    fontFamily: 'Bricolage Grotesque, sans-serif',
                    letterSpacing: '0.08em',
                    fontSize: '1.75rem', // Increased from 1.25rem
                  }}
                >
                  {section.title}
                </span>
                {/* Main Statement */}
                <h2
                  className="font-bold leading-snug mb-6"
                  style={{
                    lineHeight: 1.15,
                    fontFamily: 'Bricolage Grotesque, sans-serif',
                    fontSize: '3.5rem', // Increased from 2.1rem
                    marginBottom: '1.4rem',
                    marginTop: '1.4rem',
                    letterSpacing: '0.1rem',
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
                      className="text-[2.8rem] md:text-[3.6rem] lg:text-[4.2rem]" // Increased all breakpoints
                    >
                      {part.text}
                    </span>
                  ))}
                </h2>
                {/* Caption */}
                <span
                  className="text-[#6B7280] text-left max-w-2xl text-xl md:text-2xl"
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
            {/* Section Index */}
            <div
              className="absolute bottom-16"
              style={{
                right: '40%', // Moved slightly to the left (from 8% to 11%)
                color: '#ffffff', // Tailwind gray-100
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 700,
                fontSize: '18rem', // Not too big
                lineHeight: 1,
                opacity: 0.18,
                pointerEvents: 'none',
                zIndex: 10,
                letterSpacing: '-0.04em',
                textAlign: 'right',
                minWidth: '8ch',
              }}
            >
              0{idx + 1}
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
