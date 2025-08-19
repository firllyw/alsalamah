'use client';

import { useState, useRef } from 'react';
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

  // Split content for "Read more"
  const content = truckReveal.content || '';
  const isLong = content.length > MAX_PREVIEW_CHARS;
  const preview = isLong ? content.slice(0, MAX_PREVIEW_CHARS) : content;
  const rest = isLong ? content.slice(MAX_PREVIEW_CHARS) : '';

  return (
    <section
      ref={sectionRef}
      className={`reveal-section relative min-h-[100vh] flex flex-col justify-end items-center bg-transparent ${bricolage.className}`}
      style={{
        paddingTop: '6rem',
        paddingBottom: '6rem',
      }}
    >
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
          <p className="text-lg lg:text-xl leading-relaxed" style={{ color: '#273d97' }}>
            {preview}
            {!expanded && isLong && <span className="text-[#273d97]/70">... </span>}
            {expanded && rest}
          </p>
          {isLong && (
            <div className="w-full flex justify-end mt-2">
              <button
                className="text-base font-semibold text-[#273d97] underline underline-offset-4 hover:text-[#1a285c] transition border border-[#273d97] rounded-lg px-4 py-2"
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