'use client';

import { useState, useRef, useEffect } from 'react';
import { useScroll, MotionValue } from 'framer-motion';
import { homeContent } from '@/data/content';
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
});

interface TruckRevealSectionProps {
  data?: any;
}

const MAX_PREVIEW_CHARS = 200;

const TruckRevealSection = ({ data }: TruckRevealSectionProps) => {
  const truckReveal = data || homeContent.truckReveal;
  const [expanded, setExpanded] = useState(false);
  const [truckOpacity, setTruckOpacity] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Phase 1 animation logic for truck_reveal.png
  const PHASE1_START = 0.05;
  const PHASE1_END = 0.12;

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (scrollValue) => {
      if (scrollValue <= PHASE1_START) {
        setTruckOpacity(1); // Fully visible before fade starts
      } else if (scrollValue < PHASE1_END) {
        const phase1Progress = Math.min(
          Math.max((scrollValue - PHASE1_START) / (PHASE1_END - PHASE1_START), 0),
          1
        );
        setTruckOpacity(1 - phase1Progress); // Fade out
      } else {
        setTruckOpacity(0); // Hidden after phase 1 ends
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // Split content for "Read more"
  const content = truckReveal.content || '';
  const isLong = content.length > MAX_PREVIEW_CHARS;
  const preview = isLong ? content.slice(0, MAX_PREVIEW_CHARS) : content;
  const rest = isLong ? content.slice(MAX_PREVIEW_CHARS) : '';

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`reveal-section relative min-h-[100vh] flex flex-col justify-end items-center bg-transparent ${bricolage.className}`}
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
      }}
    >
      {/* Truck Reveal Image */}
      <div
        className="absolute inset-0 flex justify-center z-5 pointer-events-none"
        style={{ 
          opacity: truckOpacity, 
          transition: 'opacity 0.1s ease-out',
          alignItems: 'flex-start',
          paddingTop: '15vh'
        }}
      >
        <img
          src="/truck_reveal.png"
          alt="Truck Reveal"
          style={{
            maxWidth: '800px',
            maxHeight: '600px',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center justify-end h-full">
        {/* Spacer to push content lower, now with h-full and flex-1 */}
        <div className="flex-1 h-full" />
        <div
          className="
            w-full
            max-w-4xl
            md:max-w-5xl
            text-center
            p-8
            md:p-12
          "
          style={{
            fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
            color: '#273d97',
          }}
        >
          <p className="text-lg lg:text-xl leading-relaxed" style={{ color: '#273d97', textAlign: 'justify' }}>
            {preview}
            {!expanded && isLong && <span className="text-[#273d97]/70">... </span>}
            {expanded && rest}
          </p>
          {isLong && (
            <div className="w-full flex justify-center mt-15">
              <button
                className="text-base font-semibold text-[#273d97] underline underline-offset-4 hover:text-[#1a285c] transition border border-[#273d97] rounded-full px-4 py-2"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
              >
                {expanded ? 'Read less' : 'Read more'}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TruckRevealSection;