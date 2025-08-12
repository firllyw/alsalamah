'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface ArrowGraphicsProps {
  scrollProgress: number;
}

/**
 * ArrowGraphics
 * Shows a full-background PNG arrow (public/arro_hero.png) that slides horizontally as the user scrolls.
 * The image covers the entire background, sits behind the text, and in front of the background color.
 */
const ArrowGraphics = ({ scrollProgress }: ArrowGraphicsProps) => {
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : null,
    offset: ["start start", "end start"]
  });

  // Make the animation speed quicker by increasing the distance and making opacity fade out faster
  // Arrow moves further and fades out sooner
  const arrowOffset = useTransform(scrollYProgress, [0, 0.5], [0, 400]);
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5], [1, 0.4, 0]);

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{
        x: arrowOffset,
        opacity: arrowOpacity,
      }}
    >
      <img
        src="/arro_hero.png"
        alt=""
        className="w-full h-full object-cover select-none"
        draggable={false}
        style={{
          // Ensures the image covers the background and is not interactive
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  );
};

export default ArrowGraphics;