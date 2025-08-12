'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Components
import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import TruckRevealSection from '@/components/sections/TruckRevealSection';
import TruckRotationSection from '@/components/sections/TruckRotationSection';
import ShowcaseSection from '@/components/sections/ShowcaseSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ContactSection from '@/components/sections/ContactSection';
import Lenis from 'lenis';
import StatSection from '@/components/sections/StatSection';
import RecordSection from '@/components/sections/RecordSection';
import InteractiveCoverageSection from '@/components/sections/InteractiveCoverageSection';

// Dynamic imports for better performance
const TruckScene = dynamic(() => import('@/components/TruckScene'), {
  ssr: false,
  loading: () => <div className="canvas-container" />
});

export default function Home() {
  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      infinite: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="parallax-container">
      {/* Fixed 3D Truck Scene */}
      <TruckScene />

      {/* Content Layer */}
      <div className="content-layer">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          {/* Part 1: Hero with arrows and blue background */}
          <HeroSection />

          {/* Part 2: Truck reveal with vision content */}
          <TruckRevealSection />

          {/* Part 3: Truck rotation with mission content */}
          <TruckRotationSection />



          {/* Additional sections */}
          <ServicesSection />

          {/* Part 4: Showcase with images and achievements */}
          <ShowcaseSection />

          <StatSection />

          <RecordSection />

          <InteractiveCoverageSection />

          <ContactSection />
        </main>
      </div>
    </div>
  );
}
