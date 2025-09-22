'use client';

import { useState, useRef } from 'react';
import { useScroll } from 'framer-motion';
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
  const sectionRef = useRef<HTMLDivElement>(null);
  useScroll(); // keep for possible future use, but not used now

  // Split content for "Read more"
  const content = truckReveal.content || '';
  const isLong = content.length > MAX_PREVIEW_CHARS;
  const preview = isLong ? content.slice(0, MAX_PREVIEW_CHARS) : content;
  const rest = isLong ? content.slice(MAX_PREVIEW_CHARS) : '';

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`reveal-section relative min-h-[100vh] flex flex-col items-center bg-transparent ${bricolage.className}`}
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
      }}
    >
      {/* Truck Reveal Image */}
      <div
        className="absolute left-0 right-0 flex justify-center z-5 pointer-events-none"
        style={{
          alignItems: 'flex-start',
          paddingTop: '0vh', // Move image higher
        }}
      >
        <img
          src="/truck_reveal.png"
          alt="Truck Reveal"
          className="max-w-[320px] max-h-[240px] md:max-w-[600px] md:max-h-[450px] lg:max-w-[800px] lg:max-h-[600px]"
          style={{
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center justify-end h-full">
        {/* Spacer to push content lower */}
        <div className="h-[25vh] md:h-[45vh] lg:h-[75vh]" />
        <div
          className="
            w-full
            max-w-4xl
            md:max-w-5xl
            text-center
            p-4
            sm:p-6
            md:p-8
            lg:p-12
          "
          style={{
            fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
            color: '#273d97',
          }}
        >
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed" style={{ color: '#273d97', textAlign: 'justify' }}>
            {preview}
            {!expanded && isLong && <span className="text-[#273d97]/70">... </span>}
            {expanded && rest}
          </p>
          {isLong && (
            <div className="w-full flex justify-center mt-8 sm:mt-12 lg:mt-15">
              <button
                className="text-sm sm:text-base font-semibold text-[#273d97] underline underline-offset-4 hover:text-[#1a285c] transition border border-[#273d97] rounded-full px-3 py-1 sm:px-4 sm:py-2"
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