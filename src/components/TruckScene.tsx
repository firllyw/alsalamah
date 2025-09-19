'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, MotionValue, useTransform } from 'framer-motion';

interface TruckImageProps {
  scrollProgress: MotionValue<number>;
}

function TruckImage({ scrollProgress }: TruckImageProps) {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [imageOpacity, setImageOpacity] = useState(0);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  // PHASES: Three-phase animation system using the same checkpoints
  const PHASE1_START = 0.05;
  const PHASE1_END = 0.12;        // Truck fades out
  const PHASE2_START = 0.12;      // Truck appears from right, sliding in
  const PHASE2_END = 0.2;         // End of slide-in
  const PHASE3_START = 0.3;       // Start moving left and out of view
  const PHASE3_END = 0.6;         // Truck exits view

  // Phase 2: Slide in from right positions (in viewport percentages)
  const SLIDEIN_START_X = 120; // Start offscreen right (120% of viewport width)
  const SLIDEIN_END_X = 50;    // Final position (50% of viewport width, centered)

  useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (scrollValue) => {
      if (scrollValue < PHASE2_START) {
        // Before Phase 2: hidden
        setImageOpacity(0);
        setCurrentImage(null);
      } else if (scrollValue < PHASE3_START) {
        // Phase 2: Show truck_side.png sliding in from right
        const phase2Progress = Math.min(
          Math.max((scrollValue - PHASE2_START) / (PHASE3_START - PHASE2_START), 0),
          1
        );
        
        setCurrentImage('/truck_side.png');
        setImageOpacity(1); // Fully visible during slide
        
        // Linear interpolation for slide-in position
        const currentX = SLIDEIN_START_X - (SLIDEIN_START_X - SLIDEIN_END_X) * phase2Progress;
        setImagePosition({ x: currentX, y: 50 }); // Slide horizontally, keep vertically centered
      } else {
        // Phase 3: Move truck further left and out of view
        const phase3Progress = Math.min(
          Math.max((scrollValue - PHASE3_START) / (PHASE3_END - PHASE3_START), 0),
          1
        );
        
        setCurrentImage('/truck_side.png');
        setImageOpacity(1); // Keep visible during exit
        
        // Continue moving left until off-screen
        const currentX = SLIDEIN_END_X - (SLIDEIN_END_X + 50) * phase3Progress; // Move to -50% (offscreen left)
        setImagePosition({ x: currentX, y: 50 });
      }
    });

    return () => unsubscribe();
  }, [scrollProgress]);

  if (!currentImage) {
    return null;
  }

  return (
    <div
      className="truck-image-container"
      style={{
        position: 'absolute',
        top: `${imagePosition.y}%`,
        left: `${imagePosition.x}%`,
        transform: 'translate(-50%, -50%)',
        opacity: imageOpacity,
        transition: 'opacity 0.1s ease-out',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <img
        src={currentImage}
        alt="Truck"
        style={{
          maxWidth: '400px',
          maxHeight: '300px',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}

function TruckScene() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll();

  if (!isMounted) {
    return null;
  }

  return (
    <div 
      className="truck-scene-container" 
      style={{ 
        position: 'relative',
        width: '100vw', 
        height: '100vh',
        overflow: 'hidden',
        background: 'rgba(0,0,0,0.1)'
      }}
    >
      <TruckImage scrollProgress={scrollYProgress} />
    </div>
  );
}

export default TruckScene;