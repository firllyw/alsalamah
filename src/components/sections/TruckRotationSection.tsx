'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

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
const stickyHeightVh = sectionHeightVh * totalSections;
const totalHeightVh = stickyHeightVh + 20;

const TruckRotationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll progress for the whole section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Calculate which section is active and the progress between them
  const step = 1 / totalSections;

  // Find which section is active and the local progress between sections
  const [activeIdx, setActiveIdx] = useState(0);
  const [crossfade, setCrossfade] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v: number) => {
      let idx = Math.floor(v / step);
      idx = Math.max(0, Math.min(idx, totalSections - 1));
      setActiveIdx(idx);

      // For crossfade: progress between current and next section (0 to 1)
      const localStart = idx * step;
      const localProgress = (v - localStart) / step;
      setCrossfade(Math.max(0, Math.min(localProgress, 1)));
    });
    // Set initial value
    const v = scrollYProgress.get();
    let idx = Math.floor(v / step);
    idx = Math.max(0, Math.min(idx, totalSections - 1));
    setActiveIdx(idx);
    const localStart = idx * step;
    const localProgress = (v - localStart) / step;
    setCrossfade(Math.max(0, Math.min(localProgress, 1)));

    return () => {
      unsubscribe && unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollYProgress]);

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
      {/* Sticky text container */}
      <div
        className="sticky top-0 left-0 w-full h-[85vh] flex items-center"
        style={{
          minHeight: `${sectionHeightVh}vh`,
          zIndex: 10,
        }}
      >
        <CrossfadeSections
          activeIdx={activeIdx}
          crossfade={crossfade}
        />
      </div>
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

// Crossfade between current and next section, but only crossfade at the end of each sticky period
function CrossfadeSections({
  activeIdx,
  crossfade,
}: {
  activeIdx: number;
  crossfade: number;
}) {
  // Clamp indices
  const currentIdx = Math.max(0, Math.min(activeIdx, SECTIONS.length - 1));
  const nextIdx = Math.max(0, Math.min(activeIdx + 1, SECTIONS.length - 1));
  const isLast = currentIdx === SECTIONS.length - 1;

  return (
    <div className="relative w-full h-full">
      {/* Current section */}
      <motion.div
        className="absolute left-0 top-0 w-full h-full"
        style={{
          opacity: isLast ? 1 : 1 - crossfade,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        <SectionContent section={SECTIONS[currentIdx]} idx={currentIdx} />
      </motion.div>
      {/* Next section (only crossfade if not last) */}
      {!isLast && (
        <motion.div
          className="absolute left-0 top-0 w-full h-full"
          style={{
            opacity: crossfade,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <SectionContent section={SECTIONS[nextIdx]} idx={nextIdx} />
        </motion.div>
      )}
    </div>
  );
}

// Render the content of a section
function SectionContent({
  section,
  idx,
}: {
  section: typeof SECTIONS[number];
  idx: number;
}) {
  return (
    <motion.div style={{ width: '100%', height: '100%' }}>
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
}

export default TruckRotationSection;