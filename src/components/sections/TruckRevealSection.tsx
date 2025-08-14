'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { homeContent } from '@/data/content';
import { Bricolage_Grotesque } from 'next/font/google';
import ArrowGraphics from '../ArrowGraphics';
import ArrowGraphicsHalf from '../ArrowGraphicsHalf';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
});

interface TruckRevealSectionProps {
  data?: any;
}

const TruckRevealSection = ({ data }: TruckRevealSectionProps) => {
  const truckReveal = data || homeContent.truckReveal;
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Text slides in from bottom when section comes into view
  const textY = useTransform(scrollYProgress, [0.2, 0.6], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className={`reveal-section relative h-screen flex items-center justify-center ${bricolage.className}`}
      // style={{ background: '#273d97' }}
    >
      <ArrowGraphicsHalf scrollProgress={scrollYProgress.get()} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center justify-center h-full">
        <motion.div
          className="w-full max-w-2xl text-center"
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.p
            className="text-lg lg:text-xl leading-relaxed"
            style={{
              color: '#273d97', // Blue text color
              fontFamily: 'var(--font-bricolage-grotesque), sans-serif'
            }}
          >
            {truckReveal.content}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default TruckRevealSection;