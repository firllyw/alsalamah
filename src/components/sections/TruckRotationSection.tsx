'use client';

import { Bricolage_Grotesque } from 'next/font/google';
import { useRef } from 'react';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
});

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

  return (
    <section
      ref={sectionRef}
      className={`relative w-full ${bricolage.variable}`}
      style={{
        height: `${totalHeightVh}vh`,
        background: 'transparent',
        fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
      }}
    >
      {SECTIONS.map((section, idx) => (
        <div
          key={idx}
          className={`absolute left-0 w-full`}
          style={{
            top: `${sectionHeightVh * idx}vh`,
            height: `${sectionHeightVh}vh`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none', // allow 3D object behind to be interactive if needed
          }}
        >
          <div className="container mx-auto px-4 lg:px-16 flex flex-row items-center w-full h-full">
            {/* Left: Main Content */}
            <div className="flex-1 flex flex-col justify-center">
              {/* Main Statement */}
              <div className="mb-6">
                <h2
                  className="font-bold leading-snug"
                  style={{
                    lineHeight: 1.2,
                    fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
                    fontSize: '2.5rem', // base size
                    // Responsive font size
                    // 3.5rem on md, 4.5rem on lg
                  }}
                >
                  {section.main.map((part, i) => (
                    <span
                      key={i}
                      style={{
                        color: part.color,
                        display: 'block',
                        fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
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
              <div className="w-full h-px bg-[#e5e7ef] my-8" />
              {/* Title and Caption Row */}
              <div className="flex flex-row items-start justify-between w-full">
                {/* Title */}
                <span
                  className="font-bold uppercase tracking-wider"
                  style={{
                    color: '#FFA500',
                    fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
                    letterSpacing: '0.08em',
                    fontSize: '1.25rem', // base size
                  }}
                >
                  {section.title}
                </span>
                {/* Caption */}
                <span
                  className="text-[#6B7280] text-right max-w-md"
                  style={{
                    fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
                    marginLeft: '2rem',
                    flex: 1,
                    fontSize: '1.1rem', // larger caption
                  }}
                >
                  {section.caption}
                </span>
              </div>
            </div>
            {/* Right: Placeholder for truck image/3D scene */}
            <div className="flex-1 flex items-center justify-end h-full" />
          </div>
        </div>
      ))}
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