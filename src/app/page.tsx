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

interface SiteData {
  hero?: any;
  truckReveal?: any;
  truckRotation?: any;
  contact?: any;
  siteConfig?: any;
  servicesSection?: any;
  [key: string]: any;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [englishData, setEnglishData] = useState<SiteData | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ar'>('en');
  const [arabicData, setArabicData] = useState<SiteData | null>(null);

  // Load both English and Arabic data from JSON files
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load English data
        const englishResponse = await fetch('/data.json');
        const englishDataResult = await englishResponse.json();
        setEnglishData(englishDataResult);

        // Load Arabic data
        const arabicResponse = await fetch('/data_ar.json');
        const arabicDataResult = await arabicResponse.json();
        setArabicData(arabicDataResult);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    
    loadData();
  }, []);

  // Set loading to false when English data is loaded
  useEffect(() => {
    if (englishData) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [englishData]);

  // Handle language change
  const handleLanguageChange = (language: 'en' | 'ar') => {
    setCurrentLanguage(language);
    // Update document direction for Arabic
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  };

  // Get current data based on language
  const getCurrentData = (): SiteData | null => {
    if (currentLanguage === 'ar' && arabicData) {
      return arabicData;
    }
    return englishData;
  };

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
        <div className="flex items-center justify-center min-h-screen bg-[#ffffff]">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-lg text-blue-700 font-medium">Loading...</p>
          </div>
        </div>
      ) : (
        <div className="parallax-container" style={{ backgroundColor: '#ffffff' }}>
          {/* Fixed 3D Truck Scene */}
          {/* <TruckScene /> */}

          {/* Content Layer */}
          <div className="content-layer">
            {/* Header */}
            <Header 
              siteData={getCurrentData()} 
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />

            {/* Main Content */}
            <main>
              {/* Part 1: Hero with arrows and blue background */}
              <HeroSection data={getCurrentData()?.hero} siteConfig={getCurrentData()?.siteConfig} />

              {/* Part 2: Truck reveal with vision content */}
              <TruckRevealSection data={getCurrentData()?.truckReveal} />

              {/* Part 3: Truck rotation with mission content */}
              <TruckRotationSection data={getCurrentData()?.truckRotation?.data} />

              {/* Additional sections */}
              <ServicesSection data={getCurrentData()?.servicesSection} />

              {/* Part 4: Showcase with images and achievements */}
              <ShowcaseSection data={getCurrentData()?.showcase} />

              <div style={{ position: 'relative', zIndex: 20 }}>
                <StatSection data={getCurrentData()?.stats} />
              </div>

              <RecordSection data={getCurrentData()?.record} />

              <InteractiveCoverageSection data={getCurrentData()?.areaCoverage} />

              <ContactSection data={getCurrentData()?.contact} siteConfig={getCurrentData()?.siteConfig} />
            </main>
          </div>
        </div>
      )}
    </>
  );
}