
'use client';

import { useState } from 'react';
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
});

const stats = [
  {
    value: '27',
    label: 'Distribution\nBranches',
  },
  {
    value: '10+',
    label: 'Sub-\nBranches',
  },
  {
    value: '45+',
    label: 'Employees',
  },
  {
    value: '19000',
    label: 'Global\nCustomers',
  },
  {
    value: '30+',
    label: 'Vehicle\nFleet',
  },
  {
    value: '4',
    label: 'Sales SPV',
  },
  {
    value: '225',
    label: 'Merchandiser',
  },
  {
    value: '93',
    label: 'Deliverymen',
  },
];

interface StatSectionProps {
  data?: any;
}

const StatSection = ({ data }: StatSectionProps) => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const statsData = data?.data || stats;

  return (
    <section
      className={`${bricolage.className} w-full min-h-screen flex items-center justify-center px-4`}
      style={{ background: '#273d97' }}
    >
      <div className="w-full max-w-7xl">
        <div
          className="grid grid-cols-4 grid-rows-2 gap-0 border border-[#b2b9e6]/40 rounded-2xl overflow-hidden"
          style={{
            minHeight: '60vh',
          }}
        >
          {stats.map((stat, i) => {
            const isHighlighted = hoveredStat === i;
            return (
              <div
                key={stat.label}
                className={`
                  flex flex-col items-start justify-center
                  px-8 py-12
                  border-b border-r border-[#b2b9e6]/40 last:border-r-0
                  ${i >= 4 ? 'border-b-0' : ''}
                  ${isHighlighted
                    ? 'bg-white/20 backdrop-blur-sm scale-105 z-10'
                    : 'bg-white/5 hover:bg-white/10'}
                  transition-all duration-300 cursor-pointer
                  min-h-[200px]
                `}
                onMouseEnter={() => setHoveredStat(i)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <span
                  className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-4 transition-colors duration-300`}
                  style={{
                    color: isHighlighted ? 'white' : '#b2b9e6',
                    fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
                    lineHeight: 0.9,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className={`text-lg md:text-xl font-medium whitespace-pre-line transition-colors duration-300`}
                  style={{
                    color: isHighlighted ? 'white' : '#b2b9e6',
                    opacity: isHighlighted ? 1 : 0.9,
                    fontFamily: 'var(--font-bricolage-grotesque), sans-serif',
                    lineHeight: 1.3,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatSection;