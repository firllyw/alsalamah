'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Gallery images and features (replace with real data as needed)
const defaultGalleryImages = [
  {
    src: 'https://placehold.co/1280x800/1e40af/fff?text=Fleet', // Placeholder for fleet.jpg
    alt: 'Fleet',
    fallback: 'https://placehold.co/1280x800/1e40af/fff?text=Fleet',
  },
  {
    src: 'https://placehold.co/1280x800/1e40af/fff?text=Loading', // Placeholder for loading.jpg
    alt: 'Loading',
    fallback: 'https://placehold.co/1280x800/1e40af/fff?text=Loading',
  },
  {
    src: 'https://placehold.co/1280x800/1e40af/fff?text=Warehouse', // Placeholder for warehouse.jpg
    alt: 'Warehouse',
    fallback: 'https://placehold.co/1280x800/1e40af/fff?text=Warehouse',
  },
  {
    src: 'https://placehold.co/1280x800/1e40af/fff?text=Pallets', // Placeholder for pallets.jpg
    alt: 'Pallets',
    fallback: 'https://placehold.co/1280x800/1e40af/fff?text=Pallets',
  },
];

const defaultFeatures = [
  { label: 'Maintenance System', icon: <i className="fa-solid fa-screwdriver-wrench text-2xl text-white" /> },
  { label: 'GPS Tracking', icon: <i className="fa-solid fa-location-dot text-2xl text-white" /> },
  { label: 'Route Optimization', icon: <i className="fa-solid fa-route text-2xl text-white" /> },
  { label: 'Compliance', icon: <i className="fa-solid fa-user-shield text-2xl text-white" /> },
];

const IMAGE_MARQUEE_DURATION = 30;
const TEXT_MARQUEE_DURATION = 18;

interface ShowcaseSectionProps {
  data?: any;
}

const ShowcaseSection = ({ data }: ShowcaseSectionProps) => {
  const sectionRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // Use data from props or fallback to defaults
  const galleryImages = data?.data?.images || defaultGalleryImages;
  const features = data?.data?.features || defaultFeatures;

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
      className={`relative min-h-screen h-screen w-full flex flex-col items-center justify-center bg-[#273d97] font-bricolage`}
      style={{
        background: 'linear-gradient(120deg, #273d97 80%, #1e2a6b 100%)',
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;700&display=swap');
          .font-bricolage {
            font-family: 'Bricolage Grotesque', sans-serif;
          }
        `}
      </style>
      {/* Marquee Gallery */}
      <div className="relative z-10 w-full flex items-center justify-center overflow-hidden" style={{ height: '60vh' }}>
        <motion.div
          className="absolute left-0 flex flex-row gap-16"
          style={{
            width: 'max-content',
            height: '60vh',
            minHeight: 350,
            alignItems: 'center',
          }}
          animate={{
            x: ['0%', '-50%'], // Right to left
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            duration: IMAGE_MARQUEE_DURATION,
          }}
        >
          {/* To create a seamless infinite loop, we repeat the images array 2x and set the marquee to move -50%
          */}
          {images.map((img, idx) => (
            <div
              key={img.alt + idx}
              className="relative group rounded-2xl overflow-hidden shadow-xl bg-[#1e2a6b] border-2 border-[#3b4db7] flex items-end"
              style={{
                width: '50vw',
                maxWidth: 700,
                minWidth: 350,
                height: '50vh',
                minHeight: 250,
                maxHeight: 450,
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
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
                <span className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-lg font-bricolage">
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Features Marquee Bar */}
      <div className="relative z-20 w-full overflow-hidden h-[80px] md:h-[110px] flex items-center -mt-8">
        <motion.div
          className="flex flex-row gap-x-12"
          style={{
            y: featuresY,
            opacity: featuresOpacity,
            width: 'max-content',
            alignItems: 'center',
            height: '100%',
          }}
          animate={{
            x: ['-50%', '0%'], // Left to right (opposite of images)
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
              className="flex items-center gap-4 text-white text-2xl md:text-4xl font-extrabold px-6"
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                textShadow: '0 2px 16px rgba(0,0,0,0.18)',
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
              }}
            >
              <span className="inline-block align-middle text-3xl md:text-4xl">
                {feature.icon}
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
