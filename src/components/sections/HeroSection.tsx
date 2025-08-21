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
          className="mb-10"
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
            className="w-auto h-auto max-w-[90vw] max-h-[45vh] lg:max-h-[60vh] object-contain"
            style={{ objectFit: 'contain' }}
          />
        </motion.div>

        {/* Main Title - left aligned, full width, NOT bold, thinner font */}
        <motion.h1
          className="w-full text-left text-[clamp(4rem,12vw,9rem)] lg:text-[clamp(6rem,12vw,11rem)] font-light leading-[1.05] mb-8 text-white"
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
          className="w-full text-left text-3xl lg:text-4xl mb-24 text-white/80 font-light leading-relaxed pl-2 sm:pl-4 md:pl-6"
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
          className="mr-4"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg width="44" height="44" viewBox="0 0 44 44" className="text-[#FFC76A]" fill="none">
            <polyline
              points="11,18 22,29 33,18"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="11,10 22,21 33,10"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        {/* Button-like scroll down indicator */}
        <div
          className="border-2 border-[#FFC76A] rounded-full px-4 py-1 flex items-center"
          style={{
            background: "rgba(34, 54, 146, 0.95)", // matches the blue bg with slight transparency
            minWidth: "100px",
            minHeight: "32px",
            fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
          }}
        >
          <span className="text-[#FFC76A] font-bold tracking-widest text-xs lg:text-sm mx-auto" style={{ letterSpacing: "0.15em" }}>
            {hero.content || hero.data?.scrollText || hero.scrollText}
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;