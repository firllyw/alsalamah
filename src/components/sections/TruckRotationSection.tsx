'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { homeContent } from '@/data/content';
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
});

const TruckRotationSection = () => {
  const { truckRotation } = homeContent;
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Make the scrollable area taller and reduce the space between sections
  // This helps ensure the last part doesn't overlap the next sections
  // and the transitions are a bit tighter.
  const totalSections = 3;
  const sectionHeightVh = 85; // Each section is 85vh tall (was 100vh)
  const totalHeightVh = sectionHeightVh * totalSections + 20; // Add a little extra for smoothness

  // Adjusted offsets for a more compact scroll
  const section1Progress = useTransform(scrollYProgress, [0, 0.18], [0, 1]);
  const section2Progress = useTransform(scrollYProgress, [0.18, 0.36], [0, 1]);
  const section3Progress = useTransform(scrollYProgress, [0.36, 0.54], [0, 1]);

  // Faster text animations for each section - slide from bottom quickly
  const getTextAnimations = (progress: any) => ({
    y: useTransform(progress, [0, 0.6], [100, 0]), // Animation completes at 60% instead of 100%
    opacity: useTransform(progress, [0, 0.3, 0.6], [0, 1, 1]) // Opacity reaches full at 30%
  });

  const section1Animations = getTextAnimations(section1Progress);
  const section2Animations = getTextAnimations(section2Progress);
  const section3Animations = getTextAnimations(section3Progress);

  return (
    <>
      <section
        ref={sectionRef}
        className={`mission-section relative ${bricolage.className}`}
        style={{
          height: `${totalHeightVh}vh`, // Taller scroll area
        }}
      >
        {/* Section 1 - Vision */}
        <div className="sticky top-0" style={{ height: `${sectionHeightVh}vh` }}>
          <div className="container mx-auto px-4 lg:px-16 relative z-10 flex items-center h-full">
            <div className="w-1/2 flex flex-col justify-center">
              <motion.div
                className="space-y-8"
                style={{
                  y: section1Animations.y,
                  opacity: section1Animations.opacity
                }}
              >
                {/* Section Number */}
                <div className="flex items-center space-x-4">
                  <span
                    className="text-6xl font-bold"
                    style={{
                      color: '#b2b9e6',
                      fontFamily: 'var(--font-bricolage-grotesque)'
                    }}
                  >
                    {truckRotation.sections[0].number}
                  </span>
                  <div className="w-16 h-px bg-blue-300"></div>
                </div>

                {/* Title */}
                <div className="inline-block">
                  <span
                    className="text-lg font-bold tracking-wider px-4 py-2 rounded-full"
                    style={{
                      background: '#FFA500',
                      color: 'white',
                      fontFamily: 'var(--font-bricolage-grotesque)'
                    }}
                  >
                    {truckRotation.sections[0].title}
                  </span>
                </div>

                {/* Subtitle */}
                <h2
                  className="text-4xl lg:text-5xl font-bold leading-tight"
                  style={{
                    fontFamily: 'var(--font-bricolage-grotesque)',
                    color: '#273d97'
                  }}
                >
                  {truckRotation.sections[0].subtitle.split(' ').map((word: string, index: number) =>
                    ['in', 'Saudi', 'Arabia.'].includes(word) ? (
                      <span key={index} style={{ color: '#b2b9e6' }}>{word} </span>
                    ) : (
                      <span key={index}>{word} </span>
                    )
                  )}
                </h2>

                {/* Content */}
                <p
                  className="text-lg leading-relaxed max-w-2xl"
                  style={{
                    color: '#6B7280',
                    fontFamily: 'var(--font-bricolage-grotesque)'
                  }}
                >
                  {truckRotation.sections[0].content}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Section 2 - Mission */}
        <div
          className="absolute left-0 w-full"
          style={{
            top: `${sectionHeightVh}vh`,
            height: `${sectionHeightVh}vh`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className="container mx-auto px-4 lg:px-16 relative z-10 flex items-center h-full">
            <div className="w-1/2 flex flex-col justify-center">
              <motion.div
                className="space-y-8"
                style={{
                  y: section2Animations.y,
                  opacity: section2Animations.opacity
                }}
              >
                {/* Section Number */}
                <div className="flex items-center space-x-4">
                  <span
                    className="text-6xl font-bold"
                    style={{
                      color: '#b2b9e6',
                      fontFamily: 'var(--font-bricolage-grotesque)'
                    }}
                  >
                    {truckRotation.sections[1].number}
                  </span>
                  <div className="w-16 h-px bg-blue-300"></div>
                </div>

                {/* Title */}
                <div className="inline-block">
                  <span
                    className="text-lg font-bold tracking-wider px-4 py-2 rounded-full"
                    style={{
                      background: '#FFA500',
                      color: 'white',
                      fontFamily: 'var(--font-bricolage-grotesque)'
                    }}
                  >
                    {truckRotation.sections[1].title}
                  </span>
                </div>

                {/* Subtitle */}
                <h2
                  className="text-4xl lg:text-5xl font-bold leading-tight"
                  style={{
                    fontFamily: 'var(--font-bricolage-grotesque)',
                    color: '#273d97'
                  }}
                >
                  {truckRotation.sections[1].subtitle.split(' ').map((word: string, index: number) =>
                    ['and', 'services.'].includes(word) ? (
                      <span key={index} style={{ color: '#b2b9e6' }}>{word} </span>
                    ) : (
                      <span key={index}>{word} </span>
                    )
                  )}
                </h2>

                {/* Content */}
                <p
                  className="text-lg leading-relaxed max-w-2xl"
                  style={{
                    color: '#6B7280',
                    fontFamily: 'var(--font-bricolage-grotesque)'
                  }}
                >
                  {truckRotation.sections[1].content}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Section 3 - Commitment */}
        <div
          className="absolute left-0 w-full"
          style={{
            top: `${sectionHeightVh * 2}vh`,
            height: `${sectionHeightVh}vh`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className="container mx-auto px-4 lg:px-16 relative z-10 flex items-center h-full">
            <div className="w-1/2 flex flex-col justify-center">
              <motion.div
                className="space-y-8"
                style={{
                  y: section3Animations.y,
                  opacity: section3Animations.opacity
                }}
              >
                {/* Section Number */}
                <div className="flex items-center space-x-4">
                  <span
                    className="text-6xl font-bold"
                    style={{
                      color: '#b2b9e6',
                      fontFamily: 'var(--font-bricolage-grotesque)'
                    }}
                  >
                    {truckRotation.sections[2].number}
                  </span>
                  <div className="w-16 h-px bg-blue-300"></div>
                </div>

                {/* Title */}
                <div className="inline-block">
                  <span
                    className="text-lg font-bold tracking-wider px-4 py-2 rounded-full"
                    style={{
                      background: '#FFA500',
                      color: 'white',
                      fontFamily: 'var(--font-bricolage-grotesque)'
                    }}
                  >
                    {truckRotation.sections[2].title}
                  </span>
                </div>

                {/* Subtitle */}
                <h2
                  className="text-4xl lg:text-5xl font-bold leading-tight"
                  style={{
                    fontFamily: 'var(--font-bricolage-grotesque)',
                    color: '#273d97'
                  }}
                >
                  {truckRotation.sections[2].subtitle.split(' ').map((word: string, index: number) =>
                    ['are', 'more', 'than', 'promises', '—', 'they', 'are', 'our', 'operating', 'principles.'].includes(word) ? (
                      <span key={index} style={{ color: '#b2b9e6' }}>{word} </span>
                    ) : (
                      <span key={index}>{word} </span>
                    )
                  )}
                </h2>

                {/* Content */}
                <p
                  className="text-lg leading-relaxed max-w-2xl"
                  style={{
                    color: '#6B7280',
                    fontFamily: 'var(--font-bricolage-grotesque)'
                  }}
                >
                  {truckRotation.sections[2].content}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer below the section to allow the truck to move left as user scrolls to next section */}
      <div
        aria-hidden="true"
        className="w-full"
        style={{
          height: '10vh', // Much smaller spacer to avoid overlap
          minHeight: '40px',
        }}
      />
    </>
  );
};

export default TruckRotationSection;