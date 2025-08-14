'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface ArrowGraphicsProps {
  scrollProgress: number;
}

/**
 * ArrowGraphicsHalf
 * Shows a half-size PNG arrow (public/chevron_arrow_big.png) that slides horizontally as the user scrolls.
 * The image overlays the background, sits behind the text, and in front of the background color.
 * The arrow image is positioned to the right.
 */
const ArrowGraphicsHalf = ({ scrollProgress }: ArrowGraphicsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? containerRef : undefined,
    offset: ["start start", "end start"]
  });

  // Make the animation speed quicker by increasing the distance and making opacity fade out faster
  // Arrow moves further and fades out sooner
  const arrowOffset = useTransform(scrollYProgress, [0, 0.5], [0, 400]);
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5], [1, 0.4, 0]);

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-end"
      style={{
        x: arrowOffset,
        opacity: arrowOpacity,
      }}
    >
      <img
        src="/chevron_arrow_big.png"
        alt=""
        className="select-none"
        draggable={false}
        style={{
          width: '50%',
          height: '50%',
          objectFit: 'contain',
          userSelect: 'none',
          pointerEvents: 'none',
          display: 'block',
        }}
      />
    </motion.div>
  );
};

export default ArrowGraphicsHalf;