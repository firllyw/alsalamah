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
  },
  {
    iconContent: (isActive: boolean) => (
      <>
        <rect width="48" height="48" rx="12" fill={isActive ? "#e7ebfa" : "#f4f6fb"}/>
        <path d="M16 24h16m-16 0l6-6m-6 6l6 6" stroke="#b2b9e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
    label: 'Fleet',
  },
  {
    iconContent: (isActive: boolean) => (
      <>
        <rect width="48" height="48" rx="12" fill={isActive ? "#e7ebfa" : "#f4f6fb"}/>
        <path d="M24 16v16m0-16l6 6m-6-6l-6 6" stroke="#b2b9e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
    label: 'Network',
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
  },
];

interface RecordSectionProps {
  data?: any;
}

const RecordSection = ({ data }: RecordSectionProps) => {
  // Use data from props or fallback to defaults
  const features = defaultFeatures;
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section
      className={`w-full min-h-screen flex items-center font-bricolage`}
      style={{ backgroundColor: '#f4f6fb' }}
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
        <div className="w-full md:w-1/2 flex flex-col justify-between gap-12 px-8 lg:px-16 py-16">
          <div>
            {/* Feature Cards */}
            <div className="flex flex-row gap-6 mb-12">
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

            {/* Main Content */}
            <div className="space-y-8">
              <h2 
                className="text-4xl lg:text-5xl font-bold leading-tight font-bricolage"
                style={{ 
                  color: '#273d97'
                }}
              >
                Proven track record in{' '}
                <span style={{ color: '#b2b9e6' }}>
                  critical delivery.
                </span>
              </h2>

              <p 
                className="text-lg leading-relaxed"
                style={{ 
                  color: '#6B7280',
                  fontFamily: 'Bricolage Grotesque, sans-serif'
                }}
              >
                Decades of experience in time-sensitive and mission-critical shipments, ensuring your goods arrive exactly when and where they're needed.
              </p>
            </div>
          </div>
          
          {/* Technology text at the very bottom */}
          <span 
            className="text-lg font-bold tracking-wider"
            style={{ 
              color: '#FFA500',
              fontFamily: 'Bricolage Grotesque, sans-serif'
            }}
          >
            TECHNOLOGY
          </span>
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
