'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
});

// Gallery images and features (replace with real data as needed)
const galleryImages = [
  {
    src: '/showcase/fleet.jpg',
    alt: 'Fleet',
    fallback: 'https://placehold.co/1280x800/1e40af/fff?text=Fleet',
  },
  {
    src: '/showcase/loading.jpg',
    alt: 'Loading',
    fallback: 'https://placehold.co/1280x800/1e40af/fff?text=Loading',
  },
  {
    src: '/showcase/warehouse.jpg',
    alt: 'Warehouse',
    fallback: 'https://placehold.co/1280x800/1e40af/fff?text=Warehouse',
  },
  {
    src: '/showcase/pallets.jpg',
    alt: 'Pallets',
    fallback: 'https://placehold.co/1280x800/1e40af/fff?text=Pallets',
  },
];

const features = [
  { label: 'Maintenance System', icon: <i className="fa-solid fa-screwdriver-wrench" /> },
  { label: 'GPS Tracking', icon: <i className="fa-solid fa-location-dot" /> },
  { label: 'Route Optimization', icon: <i className="fa-solid fa-route" /> },
  { label: 'Compliance', icon: <i className="fa-solid fa-user-shield" /> },
];

const IMAGE_MARQUEE_DURATION = 30;
const TEXT_MARQUEE_DURATION = 18;

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? sectionRef : undefined,
    offset: ['start end', 'end start'],
  });

  // Subtle animation for features bar
  const featuresY = useTransform(scrollYProgress, [0.3, 0.6], [40, 0]);
  const featuresOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  // Repeat images for seamless marquee
  const images = [...galleryImages, ...galleryImages];

  // Repeat features for seamless marquee
  const featuresMarquee = [...features, ...features];

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen h-screen w-full flex flex-col justify-end items-center bg-[#273d97] ${bricolage.className}`}
      style={{
        background: 'linear-gradient(120deg, #273d97 80%, #1e2a6b 100%)',
        padding: 0,
        overflow: 'hidden',
      }}
    >
      {/* Marquee Gallery */}
      <div className="relative z-10 w-full flex items-start justify-center overflow-hidden" style={{ height: '80vh', marginTop: 0 }}>
        <motion.div
          className="absolute left-0 top-0 flex flex-row gap-16"
          style={{
            width: 'max-content',
            height: '80vh',
            minHeight: 400,
            alignItems: 'flex-start',
          }}
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            duration: IMAGE_MARQUEE_DURATION,
          }}
        >
          {images.map((img, idx) => (
            <div
              key={img.alt + idx}
              className="relative group rounded-3xl overflow-hidden shadow-2xl bg-[#1e2a6b] border-4 border-[#3b4db7] flex items-end"
              style={{
                width: '65vw',
                maxWidth: 1100,
                minWidth: 520,
                height: '70vh',
                minHeight: 320,
                maxHeight: 700,
                marginRight: 64,
                marginLeft: 0,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                onError={e => (e.currentTarget.src = img.fallback)}
                draggable={false}
                style={{
                  minHeight: '100%',
                  minWidth: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  fontSize: 0,
                }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-10 py-8">
                <span className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg" style={{ fontFamily: 'var(--font-bricolage-grotesque), sans-serif' }}>
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Features Marquee Bar */}
      <div className="relative z-20 w-full overflow-hidden h-[80px] md:h-[110px] flex items-center" style={{ marginTop: '-10px' }}>
        <motion.div
          className="flex flex-row gap-x-24"
          style={{
            y: featuresY,
            opacity: featuresOpacity,
            width: 'max-content',
            alignItems: 'center',
            height: '100%',
          }}
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            duration: TEXT_MARQUEE_DURATION,
          }}
        >
          {featuresMarquee.map((feature, idx) => (
            <div
              key={feature.label + idx}
              className="flex items-center gap-6 text-white text-3xl md:text-5xl font-extrabold px-8"
              style={{
                fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
                textShadow: '0 2px 16px rgba(0,0,0,0.18)',
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              <span className="inline-block align-middle text-4xl md:text-5xl">
                {feature.icon || (
                  <svg width="40" height="40" fill="currentColor" className="text-white/70">
                    <circle cx="20" cy="20" r="16" />
                  </svg>
                )}
              </span>
              <span className="align-middle">{feature.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ShowcaseSection;