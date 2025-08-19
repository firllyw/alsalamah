'use client';

import { useState } from 'react';

const defaultFeatures = [
  {
    iconContent: (isActive: boolean) => (
      <>
        <rect width="48" height="48" rx="12" fill={isActive ? "#e7ebfa" : "#f4f6fb"}/>
        <circle cx="24" cy="24" r="10" stroke="#273d97" strokeWidth="2"/>
        <circle cx="24" cy="24" r="4" fill="#273d97"/>
        <circle cx="24" cy="24" r="2" fill="#fff"/>
      </>
    ),
    label: 'On-time',
    title: 'Proven track record',
    subtitle: 'in critical delivery.',
    description:
      "Decades of experience in time-sensitive and mission-critical shipments, ensuring your goods arrive exactly when and where they’re needed.",
  },
  {
    iconContent: (isActive: boolean) => (
      <>
        <rect width="48" height="48" rx="12" fill={isActive ? "#e7ebfa" : "#f4f6fb"}/>
        <path d="M16 24h16m-16 0l6-6m-6 6l6 6" stroke="#b2b9e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
    label: 'Fleet',
    title: 'IN-HOUSE ',
    subtitle: 'LOGISTICS TEAM',
    description:
      "Our dedicated team manages every delivery from start to finish, enabling swift response and efficient dispatch.",
  },
  {
    iconContent: (isActive: boolean) => (
      <>
        <rect width="48" height="48" rx="12" fill={isActive ? "#e7ebfa" : "#f4f6fb"}/>
        <path d="M24 16v16m0-16l6 6m-6-6l-6 6" stroke="#b2b9e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
    label: 'Network',
    title: 'SEAMLESS',
    subtitle: 'COORDINATION',
    description:
      "We maintain strong operational links with trusted warehousing facilities, ensuring smooth cargo handovers and optimized supply chain flow.",
  },
  {
    iconContent: (isActive: boolean) => (
      <>
        <rect width="48" height="48" rx="12" fill={isActive ? "#e7ebfa" : "#f4f6fb"}/>
        <circle cx="24" cy="24" r="8" stroke="#b2b9e6" strokeWidth="2"/>
        <path d="M24 18v6l4 4" stroke="#b2b9e6" strokeWidth="2" strokeLinecap="round"/>
      </>
    ),
    label: 'Secure',
    title: 'SFDA-COMPLIANT',
    subtitle: 'PROTOCOLS',
    description:
      "All processes follow strict Saudi Food & Drug Authority guidelines, meeting the highest standards for safety and compliance.",
  },
];

interface RecordSectionProps {
  data?: any;
}

const RecordSection = ({ data }: RecordSectionProps) => {
  // Use data from props or fallback to defaults
  const features = defaultFeatures;
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  // Determine which feature is active (hovered or default to first)
  const activeIdx = hoveredFeature === null ? 0 : hoveredFeature;
  const activeFeature = features[activeIdx];

  return (
    <section
      className={`w-full min-h-screen flex items-center font-bricolage`}
      style={{ backgroundColor: '#f6f5f5' }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;700&display=swap');
          .font-bricolage {
            font-family: 'Bricolage Grotesque', sans-serif;
          }
        `}
      </style>
      <div className="w-full h-full flex flex-col md:flex-row">
        {/* Left Side - Content (50% width) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-8 px-8 lg:px-16 py-16">
          {/* Feature Cards */}
          <div className="flex flex-row gap-6 mb-8">
            {features.map((feature: any, idx: number) => {
              const isActive = hoveredFeature === idx || (hoveredFeature === null && idx === 0);
              return (
                <button
                  key={feature.label}
                  className={`
                    flex flex-col items-center justify-center gap-3
                    p-6 rounded-2xl border-2 transition-all duration-300
                    min-w-[120px] min-h-[120px]
                    ${isActive
                      ? 'bg-white border-blue-200 shadow-xl scale-105 z-10'
                      : 'bg-gray-50 border-gray-100 hover:border-gray-200 hover:scale-102'}
                  `}
                  style={{
                    boxShadow: isActive
                      ? '0 8px 32px rgba(39, 61, 151, 0.15)'
                      : undefined,
                  }}
                  onMouseEnter={() => setHoveredFeature(idx)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                    {feature.iconContent(isActive)}
                  </svg>
                  <span 
                    className={`text-sm font-medium font-bricolage ${
                      isActive ? 'text-gray-900' : 'text-gray-600'
                    }`}
                  >
                    {feature.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Technology text */}
          <span 
            className="text-xl font-extrabold tracking-wider mb-2"
            style={{ 
              color: '#FFA500',
              fontFamily: 'Bricolage Grotesque, sans-serif',
              letterSpacing: '0.01em'
            }}
          >
            TECHNOLOGY
          </span>

          {/* Main Content - changes on card hover */}
          <div className="space-y-6 mt-2">
            {/* Two-tone Title */}
            {activeIdx === 0 ? (
              <div>
                <h2
                  className="font-bricolage font-bold"
                  style={{
                    fontSize: '2.75rem',
                    lineHeight: 1.1,
                    color: '#273d97',
                    letterSpacing: '0.01em',
                  }}
                >
                  {activeFeature.title}
                </h2>
                <h3
                  className="font-bricolage font-bold"
                  style={{
                    fontSize: '2.75rem',
                    lineHeight: 1.1,
                    color: '#b2b9e6',
                    letterSpacing: '0.01em',
                  }}
                >
                  {activeFeature.subtitle}
                </h3>
              </div>
            ) : (
              <h2 
                className="text-4xl lg:text-5xl font-bold leading-tight font-bricolage uppercase"
                style={{ 
                  color: '#273d97',
                  letterSpacing: '0.01em'
                }}
              >
                {activeFeature.title}
              </h2>
            )}

            {/* Description */}
            <p 
              className={`text-base md:text-lg leading-relaxed font-bricolage`}
              style={{ 
                color: activeIdx === 0 ? '#6B7280' : '#6B7280',
                fontFamily: 'Bricolage Grotesque, sans-serif',
                letterSpacing: activeIdx === 0 ? '0.01em' : undefined,
                fontSize: activeIdx === 0 ? '1.05rem' : undefined,
                marginTop: activeIdx === 0 ? '1.5rem' : undefined,
              }}
            >
              {activeFeature.description}
            </p>
          </div>
        </div>

        {/* Right Side - Record Image (50% width) */}
        <div className="w-full md:w-1/2 h-full">
          <img
            src="/record.png"
            alt="Technology and delivery tracking"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default RecordSection;
