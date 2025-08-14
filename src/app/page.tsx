'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Components
import Header from '@/components/Header';
import HeroSection from '@/components/sections/HeroSection';
import TruckRevealSection from '@/components/sections/TruckRevealSection';
import TruckRotationSection from '@/components/sections/TruckRotationSection';
import ShowcaseSection from '@/components/sections/ShowcaseSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ContactSection from '@/components/sections/ContactSection';
import StatSection from '@/components/sections/StatSection';
import RecordSection from '@/components/sections/RecordSection';
import InteractiveCoverageSection from '@/components/sections/InteractiveCoverageSection';
import Lenis from 'lenis';

// Dynamic imports for better performance
const TruckScene = dynamic(() => import('@/components/TruckScene'), {
  ssr: false,
  loading: () => <div className="canvas-container" />
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [siteData, setSiteData] = useState({
    hero: {},
    siteConfig: {},
    truckReveal: {},
    truckRotation: {
      data: {
        sections: []
      }
    },
    services: {},
    stats: {},
    showcase: {},
    record: {},
    areaCoverage: {},
    contact: {},
  });

  // Fetch site data
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setSiteData(data);
        setIsLoading(false);
      })
      .catch(err => console.error('Failed to fetch site data:', err));
  }, []);

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
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-lg text-blue-700 font-medium">Loading...</p>
          </div>
        </div>
      ) : (
        <div className="parallax-container">
          {/* Fixed 3D Truck Scene */}
          <TruckScene />

          {/* Content Layer */}
          <div className="content-layer">
            {/* Header */}
            <Header siteData={siteData} />

            {/* Main Content */}
            <main>
              {/* Part 1: Hero with arrows and blue background */}
              <HeroSection data={siteData?.hero} siteConfig={siteData?.siteConfig} />

              {/* Part 2: Truck reveal with vision content */}
              <TruckRevealSection data={siteData?.truckReveal} />

              {/* Part 3: Truck rotation with mission content */}
              <TruckRotationSection />

              {/* Additional sections */}
              <ServicesSection data={siteData?.services} />

              {/* Part 4: Showcase with images and achievements */}
              <ShowcaseSection data={siteData?.showcase} />

              <StatSection data={siteData?.stats} />

              <RecordSection data={siteData?.record} />

              <InteractiveCoverageSection />

              <ContactSection data={siteData?.contact} siteConfig={siteData?.siteConfig} />
            </main>
          </div>
        </div>
      )}
    </>
  );
}