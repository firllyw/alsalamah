'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { homeContent } from '@/data/content';
import ArrowGraphics from '@/components/ArrowGraphics';
import Image from 'next/image';

// Import Bricolage Grotesque font from Google Fonts using next/font
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

interface HeroSectionProps {
  data?: any;
  siteConfig?: any;
}

const HeroSection = ({ data, siteConfig }: HeroSectionProps) => {
  // Use passed data or fallback to content.ts
  const hero = data || homeContent.hero;
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Transform background position based on scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className={`hero-section relative h-screen flex items-center hero-blue-bg overflow-hidden ${montserrat.className}`}
    >
      {/* Solid background layer - always covers truck */}
      <div className="absolute inset-0 hero-blue-bg" />
      
      {/* Animated background that moves up on scroll */}
      <motion.div 
        className="absolute inset-0 hero-blue-bg"
        style={{ y: backgroundY }}
      />
      
      {/* Arrow Graphics */}
      <ArrowGraphics scrollProgress={scrollYProgress.get()} />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-start">
        {/* Larger Logo on top of the title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Image
            src={"/logo.png"}
            alt={`${siteConfig?.company?.name || "Al Salamah"} Logo`}
            width={600}
            height={600}
            priority
            className="w-auto h-auto max-w-[90vw] max-h-[40vh] lg:max-h-[55vh] object-contain"
            style={{ objectFit: 'contain' }}
          />
        </motion.div>

        {/* Main Title - left aligned, full width, NOT bold, thinner font */}
        <motion.h1
          className="w-full text-left text-[clamp(3.2rem,10vw,7.5rem)] lg:text-[clamp(5rem,10vw,9rem)] font-light leading-[1.05] mb-6 text-white"
          style={{ 
            fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            fontWeight: 400,
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {hero.title || hero.mainTitle}
        </motion.h1>
        
        {/* Subtitle - now includes the "in 30 years" text, left aligned, lighter */}
        <motion.p
          className="w-full text-left text-xl lg:text-2xl mb-12 text-white/80 font-light leading-relaxed"
          style={{ fontFamily: 'var(--font-bricolage-grotesque), sans-serif', fontWeight: 400 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="block">
            {hero.data?.yearText || hero.yearText}
          </span>
          <span className="block">
            {hero.subtitle || siteConfig?.company?.tagline}
          </span>
        </motion.p>
      </div>

      {/* Scroll Indicator - Bottom Right */}
      <motion.div
        className="absolute bottom-8 right-8 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        {/* Animated double chevron arrow */}
        <motion.div
          className="mr-3"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" className="text-[#FFC76A]" fill="none">
            <polyline
              points="9,14 18,23 27,14"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="9,8 18,17 27,8"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        {/* Button-like scroll down indicator */}
        <div
          className="border-2 border-[#FFC76A] rounded-full px-8 py-2 flex items-center"
          style={{
            background: "rgba(34, 54, 146, 0.95)", // matches the blue bg with slight transparency
            minWidth: "180px",
            minHeight: "48px",
            fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
          }}
        >
          <span className="text-[#FFC76A] font-bold tracking-widest text-base lg:text-lg mx-auto" style={{ letterSpacing: "0.15em" }}>
            {hero.content || hero.data?.scrollText || hero.scrollText}
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;