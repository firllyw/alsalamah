'use client';

import { useState, useEffect } from 'react';

interface RecordSectionProps {
  data?: any;
}

const RecordSection = ({ data }: RecordSectionProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [features, setFeatures] = useState<any[]>([]);

  // Detect mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is md breakpoint in Tailwind
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Load features from passed data
  useEffect(() => {
    if (data?.data?.features) {
      setFeatures(data.data.features);
    }
    // If no data is passed, keep fallback features
  }, [data]);

  // Smoothly transition between active features
  useEffect(() => {
    if (hoveredFeature !== null && hoveredFeature !== activeIdx) {
      const timer = setTimeout(() => {
        setActiveIdx(hoveredFeature);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [hoveredFeature, activeIdx]);
  const activeFeature = features[activeIdx];

  return (
    <section
      className={`w-full flex items-center font-bricolage`}
      style={{
        backgroundColor: '#f6f5f5',
        minHeight: isMobile ? 'auto' : '100vh',
        padding: isMobile ? '2rem 0' : '0'
      }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;700&display=swap');
        .font-bricolage {
          font-family: 'Bricolage Grotesque', sans-serif;
        }
        button:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
        }
      `}</style>
      <div className="w-full h-full flex flex-col md:flex-row">
        {/* Left Side - Content (50% width) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-8 px-4 md:px-8 lg:px-16 py-8 md:py-16">
          {/* Feature Cards */}
          <div className={`mb-8 ${isMobile ? 'grid grid-cols-2 gap-4' : 'flex flex-row gap-6'}`}>
            {features.map((feature: any, idx: number) => {
              const isActive = hoveredFeature === idx || (hoveredFeature === null && idx === 0);
              return (
                <button
                  key={feature.label}
                  className={`
                    flex flex-col items-center justify-center gap-3
                    p-4 md:p-6 rounded-2xl border-2 transition-all duration-300
                    ${isMobile ? 'w-full aspect-square' : 'min-w-[120px] min-h-[120px]'}
                    ${isActive
                      ? 'bg-gray-100 border-blue-100 shadow-lg scale-105 z-10'
                      : 'bg-gray-50 border-gray-50 hover:border-blue-50 hover:scale-102 shadow-sm hover:shadow-md'}
                  `}
                  style={{
                    boxShadow: isActive
                      ? '0 8px 32px rgba(39, 61, 151, 0.15)'
                      : undefined,
                  }}
                  onMouseEnter={() => setHoveredFeature(idx)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full ${isActive ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'}`}>
                    <img
                      src={`/${feature.icon}${isActive ? '_active' : ''}.png`}
                      alt={feature.label}
                      className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'}`}
                    />
                  </div>
                  <span
                    className={`text-xs md:text-sm font-medium font-bricolage ${isActive ? 'text-gray-900' : 'text-gray-600'
                      }`}
                  >
                  </span>
                </button>
              );
            })}
          </div>

          {/* Technology text */}
          <span
            className={`${isMobile ? 'text-lg' : 'text-xl'} font-extrabold tracking-wider mb-2`}
            style={{
              color: '#FFA500',
              fontFamily: 'Bricolage Grotesque, sans-serif',
              letterSpacing: '0.01em'
            }}
          >
            TECHNOLOGY
          </span>

          {/* Main Content - changes on card hover */}
          <div className="space-y-6 mt-2 transition-opacity duration-300">
            {/* Two-tone Title */}
            {activeIdx === 0 ? (
              <div>
                <h2
                  className="font-bricolage font-bold"
                  style={{
                    fontSize: isMobile ? '2rem' : '2.75rem',
                    lineHeight: 1.1,
                    color: '#273d97',
                    letterSpacing: '0.01em',
                  }}
                >
                  {activeFeature?.title}
                </h2>
                <h3
                  className="font-bricolage font-bold"
                  style={{
                    fontSize: isMobile ? '2rem' : '2.75rem',
                    lineHeight: 1.1,
                    color: '#b2b9e6',
                    letterSpacing: '0.01em',
                  }}
                >
                  {activeFeature?.subtitle}
                </h3>
              </div>
            ) : (
              <h2
                className={`${isMobile ? 'text-2xl' : 'text-4xl lg:text-5xl'} font-bold leading-tight font-bricolage uppercase`}
                style={{
                  color: '#273d97',
                  letterSpacing: '0.01em'
                }}
              >
                {activeFeature?.title}
              </h2>
            )}

            {/* Description */}
            <p
              className={`${isMobile ? 'text-sm' : 'text-base md:text-lg'} leading-relaxed font-bricolage`}
              style={{
                color: activeIdx === 0 ? '#6B7280' : '#6B7280',
                fontFamily: 'Bricolage Grotesque, sans-serif',
                letterSpacing: activeIdx === 0 ? '0.01em' : undefined,
                fontSize: activeIdx === 0 ? (isMobile ? '0.95rem' : '1.05rem') : undefined,
                marginTop: activeIdx === 0 ? (isMobile ? '1rem' : '1.5rem') : undefined,
              }}
            >
              {activeFeature?.description}
            </p>
          </div>
        </div>

        {/* Right Side - Record Image (50% width) */}
        <div className="w-full md:w-1/2 h-full order-first md:order-last">
          <img
            src={features[activeIdx]?.image || '/record.png'}
            alt="Technology and delivery tracking"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default RecordSection;
