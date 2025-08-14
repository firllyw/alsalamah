'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ChevronRightIcon } from 'lucide-react';
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
            {/* Chevron arrow facing right */}

            <div className="container mx-auto px-4 lg:px-16 flex flex-row items-center w-full h-full">
              {/* Left: Main Content */}

              <div className="flex-1 flex flex-col justify-center">
                {/* Main Statement */}
                <div className="mb-6">
                  <h2
                    className="font-bold leading-snug"
                    style={{
                      lineHeight: 1.2,
                      fontFamily: 'Bricolage Grotesque, sans-serif',
                      fontSize: '2.5rem',
                    }}
                  >
                    <ChevronRightIcon
                      size={60}
                      strokeWidth={2.5}
                      className="mr-8 text-[#273d97]"
                      style={{
                        flexShrink: 0,
                        display: 'block',
                        userSelect: 'none',
                        pointerEvents: 'none',
                      }}
                    />
                    {section.main.map((part, i) => (
                      <span
                        key={i}
                        style={{
                          color: part.color,
                          display: 'block',
                          fontFamily: 'Bricolage Grotesque, sans-serif',
                          fontSize: 'inherit',
                        }}
                        className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem]"
                      >
                        {part.text}
                      </span>
                    ))}
                  </h2>
                </div>
                {/* Separator */}
                <div className="w-full h-1 bg-[#b2b9e6] my-8" />
                {/* Title and Caption Row */}
                <div className="flex flex-row items-start justify-between w-full">
                  {/* Title */}
                  <span
                    className="font-bold uppercase tracking-wider text-xl"
                    style={{
                      color: '#FFA500',
                      fontFamily: 'Bricolage Grotesque, sans-serif',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {section.title}
                  </span>
                  {/* Caption */}
                  <span
                    className="text-[#6B7280] text-right max-w-md ml-8 text-lg"
                    style={{
                      fontFamily: 'Bricolage Grotesque, sans-serif',
                      flex: 1,
                    }}
                  >
                    {section.caption}
                  </span>
                </div>
              </div>
              {/* Right: Placeholder for truck image/3D scene */}
              <div className="flex-1 flex items-center justify-end h-full relative" />
            </div>
            {/* Section Index */}
            <div
              className="absolute bottom-16 right-16 text-white text-9xl font-bold opacity-10 pointer-events-none"
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
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
