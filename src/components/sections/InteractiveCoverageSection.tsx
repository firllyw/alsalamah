'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Bricolage_Grotesque } from 'next/font/google';
import { homeContent } from '@/data/content';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
});

// Dynamic import for Leaflet to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false });
const Polygon = dynamic(() => import('react-leaflet').then(mod => mod.Polygon), { ssr: false });

interface Region {
  name: string;
  branches: number;
  subBranches: number;
  color: string;
  coordinates: [number, number];
  bounds: [number, number][];
  zoom: number;
}

const regionStyles = {
  WESTERN: {
    fillColor: '#FFB84D',
    borderColor: '#E09E2F',
    fillOpacity: 0.45,
    highlightFillOpacity: 0.7,
    highlightBorderColor: '#FF9800',
  },
  CENTRAL: {
    fillColor: '#E6A8E6',
    borderColor: '#B97CB9',
    fillOpacity: 0.45,
    highlightFillOpacity: 0.7,
    highlightBorderColor: '#B97CB9',
  },
  EASTERN: {
    fillColor: '#9F7FD1',
    borderColor: '#7B5FA8',
    fillOpacity: 0.45,
    highlightFillOpacity: 0.7,
    highlightBorderColor: '#7B5FA8',
  },
  SOUTHERN: {
    fillColor: '#B8860B',
    borderColor: '#8C6A0A',
    fillOpacity: 0.45,
    highlightFillOpacity: 0.7,
    highlightBorderColor: '#8C6A0A',
  },
  NORTHERN: {
    fillColor: '#5FB3A3',
    borderColor: '#3B8C7A',
    fillOpacity: 0.45,
    highlightFillOpacity: 0.7,
    highlightBorderColor: '#3B8C7A',
  }
};

const InteractiveCoverageSection = () => {
  const { areaCoverage } = homeContent;
  const sectionRef = useRef(null);
  const mapRef = useRef<any>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [isMapReady, setIsMapReady] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  // Enhanced regions with polygon boundaries and zoom levels
  const regions: Region[] = [
    {
      name: "WESTERN",
      branches: 6,
      subBranches: 2,
      color: "#FFB84D",
      coordinates: [21.4225, 39.8262],
      zoom: 7,
      bounds: [
        [21.0, 36.0], [22.5, 36.0], [24.0, 37.5], [25.5, 38.0],
        [26.0, 39.5], [25.0, 41.0], [22.0, 42.0], [19.0, 41.0],
        [17.0, 40.0], [17.5, 38.0], [19.0, 36.5], [21.0, 36.0]
      ]
    },
    {
      name: "CENTRAL",
      branches: 5,
      subBranches: 2,
      color: "#E6A8E6",
      coordinates: [24.7136, 46.6753],
      zoom: 6.5,
      bounds: [
        [24.0, 37.5], [27.0, 38.0], [28.0, 42.0], [26.0, 47.0],
        [23.0, 48.0], [20.0, 46.0], [19.0, 42.0], [22.0, 40.0], [24.0, 37.5]
      ]
    },
    {
      name: "EASTERN",
      branches: 4,
      subBranches: 1,
      color: "#9F7FD1",
      coordinates: [26.4207, 50.0888],
      zoom: 7,
      bounds: [
        [26.0, 47.0], [28.0, 47.5], [30.0, 48.0], [31.0, 50.0],
        [28.0, 52.0], [25.0, 51.0], [23.0, 48.0], [26.0, 47.0]
      ]
    },
    {
      name: "SOUTHERN",
      branches: 4,
      subBranches: 2,
      color: "#B8860B",
      coordinates: [18.2465, 42.6516],
      zoom: 7,
      bounds: [
        [17.0, 40.0], [19.0, 41.0], [20.0, 46.0], [18.0, 47.0],
        [16.0, 45.0], [15.0, 42.0], [16.0, 40.0], [17.0, 40.0]
      ]
    },
    {
      name: "NORTHERN",
      branches: 2,
      subBranches: 3,
      color: "#5FB3A3",
      coordinates: [29.9759, 41.0216],
      zoom: 7,
      bounds: [
        [28.0, 38.0], [32.0, 37.0], [32.0, 42.0], [30.0, 45.0],
        [28.0, 42.0], [27.0, 38.0], [28.0, 38.0]
      ]
    }
  ];

  useEffect(() => {
    setIsMapReady(true);
  }, []);

  const handleRegionClick = (region: Region) => {
    setSelectedRegion(region);
    if (mapRef.current) {
      mapRef.current.flyTo(region.coordinates, region.zoom, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  };

  const resetView = () => {
    setSelectedRegion(null);
    if (mapRef.current) {
      mapRef.current.flyTo([24.0, 45.0], 5.5, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  };

  if (!isMapReady) {
    return (
      <section 
        ref={sectionRef}
        className={`min-h-screen bg-white flex items-center justify-center ${bricolage.className}`}
      >
        <div className="text-lg">Loading interactive map...</div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-screen bg-[#f6f7fa] ${bricolage.className}`}
      style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f6f7fa 0%, #e9eaf3 100%)' }}
    >
      {/* Full-screen Leaflet Map */}
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={[24.0, 45.0]}
          zoom={5.5}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          dragging={false}
          touchZoom={false}
          keyboard={false}
          ref={mapRef}
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
          }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          {/* Region Polygons */}
          {regions.map((region, index) => {
            const style = regionStyles[region.name as keyof typeof regionStyles];
            const isSelected = selectedRegion?.name === region.name;
            return (
              <Polygon
                key={index}
                positions={region.bounds}
                pathOptions={{
                  fillColor: style.fillColor,
                  color: isSelected ? style.highlightBorderColor : style.borderColor,
                  fillOpacity: isSelected ? style.highlightFillOpacity : style.fillOpacity,
                  weight: isSelected ? 4 : 2,
                  opacity: 1,
                  dashArray: isSelected ? '6' : undefined,
                }}
                eventHandlers={{
                  click: () => handleRegionClick(region),
                }}
                className="cursor-pointer"
              />
            );
          })}

          {/* Headquarters Marker */}
          <CircleMarker
            center={areaCoverage.section1.headquarters.coordinates}
            radius={10}
            fillColor={areaCoverage.section1.headquarters.color}
            color="#ffffff"
            weight={3}
            opacity={1}
            fillOpacity={1}
          />
        </MapContainer>
      </div>

      {/* Floating Cards Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        {/* Header Card */}
        <motion.div
          className="fixed md:absolute top-8 left-1/2 md:left-8 transform -translate-x-1/2 md:translate-x-0 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl pointer-events-auto max-w-md w-[90vw] md:w-auto"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
          style={{
            zIndex: 20,
            border: '1.5px solid #e5e7eb',
            boxShadow: '0 8px 32px 0 rgba(39,61,151,0.10)'
          }}
        >
          <div className="mb-4">
            <span 
              className="text-lg font-bold tracking-wider px-4 py-2 rounded-full inline-block"
              style={{ 
                background: '#FFA500',
                color: 'white',
                fontFamily: 'var(--font-bricolage-grotesque)'
              }}
            >
              AREA COVERAGE
            </span>
          </div>
          
          <h2 
            className="text-3xl font-bold mb-4"
            style={{ 
              fontFamily: 'var(--font-bricolage-grotesque)',
              color: '#273d97'
            }}
          >
            Saudi Arabia Coverage Area{' '}
            <span style={{ color: '#b2b9e6' }}>Distribution</span>
          </h2>

          <p 
            className="text-sm leading-relaxed mb-4"
            style={{ 
              color: '#6B7280',
              fontFamily: 'var(--font-bricolage-grotesque)'
            }}
          >
            Click on any region to explore our coverage
          </p>

          <button
            onClick={resetView}
            className="text-sm px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
          >
            Reset View
          </button>
        </motion.div>

        {/* Dynamic Content Card - Always Visible */}
        <motion.div
          className="fixed md:absolute top-[120px] right-1/2 md:right-8 transform translate-x-1/2 md:translate-x-0 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl pointer-events-auto max-w-sm w-[90vw] md:w-auto"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            zIndex: 20,
            border: '1.5px solid #e5e7eb',
            boxShadow: '0 8px 32px 0 rgba(39,61,151,0.10)'
          }}
        >
          {!selectedRegion ? (
            // Regions List View
            <>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ 
                  color: '#273d97',
                  fontFamily: 'var(--font-bricolage-grotesque)'
                }}
              >
                Regions
              </h3>
              
              <div className="space-y-3">
                {regions.map((region, index) => (
                  <button
                    key={index}
                    onClick={() => handleRegionClick(region)}
                    className="w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                    style={{
                      border: selectedRegion?.name === region.name ? `2px solid ${region.color}` : '1.5px solid #e5e7eb',
                      boxShadow: selectedRegion?.name === region.name ? `0 0 0 2px ${region.color}33` : undefined,
                      fontFamily: 'var(--font-bricolage-grotesque)'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: region.color, border: '1.5px solid #fff' }}
                      ></div>
                      <span 
                        className="font-medium text-left"
                        style={{ 
                          color: '#273d97',
                          fontFamily: 'var(--font-bricolage-grotesque)'
                        }}
                      >
                        {region.name} Region
                      </span>
                    </div>
                    <div className="text-right">
                      <div 
                        className="text-sm font-bold"
                        style={{ 
                          color: '#273d97',
                          fontFamily: 'var(--font-bricolage-grotesque)'
                        }}
                      >
                        {region.branches}
                      </div>
                      <div 
                        className="text-xs"
                        style={{ 
                          color: '#6B7280',
                          fontFamily: 'var(--font-bricolage-grotesque)'
                        }}
                      >
                        Branches
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Headquarters Info */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: areaCoverage.section1.headquarters.color, border: '1.5px solid #fff' }}
                    ></div>
                    <span 
                      className="font-bold"
                      style={{ 
                        color: '#273d97',
                        fontFamily: 'var(--font-bricolage-grotesque)'
                      }}
                    >
                      Headquarter
                    </span>
                  </div>
                  <span 
                    className="font-bold"
                    style={{ 
                      color: '#273d97',
                      fontFamily: 'var(--font-bricolage-grotesque)'
                    }}
                  >
                    {areaCoverage.section1.headquarters.name}
                  </span>
                </div>
              </div>
            </>
          ) : (
            // Selected Region Detail View
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: selectedRegion.color, border: '2px solid #fff' }}
                  ></div>
                  <h3 
                    className="text-xl font-bold"
                    style={{ 
                      color: '#273d97',
                      fontFamily: 'var(--font-bricolage-grotesque)'
                    }}
                  >
                    {selectedRegion.name} Region
                  </h3>
                </div>
                <button
                  onClick={resetView}
                  className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
                >
                  ← Back
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div 
                    className="text-3xl font-bold"
                    style={{ 
                      color: '#273d97',
                      fontFamily: 'var(--font-bricolage-grotesque)'
                    }}
                  >
                    {selectedRegion.branches}
                  </div>
                  <div 
                    className="text-sm font-medium"
                    style={{ 
                      color: '#6B7280',
                      fontFamily: 'var(--font-bricolage-grotesque)'
                    }}
                  >
                    Branches
                  </div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div 
                    className="text-3xl font-bold"
                    style={{ 
                      color: '#273d97',
                      fontFamily: 'var(--font-bricolage-grotesque)'
                    }}
                  >
                    {selectedRegion.subBranches}
                  </div>
                  <div 
                    className="text-sm font-medium"
                    style={{ 
                      color: '#6B7280',
                      fontFamily: 'var(--font-bricolage-grotesque)'
                    }}
                  >
                    Sub Branches
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p 
                  className="text-sm"
                  style={{ 
                    color: '#6B7280',
                    fontFamily: 'var(--font-bricolage-grotesque)'
                  }}
                >
                  Comprehensive coverage across the {selectedRegion.name.toLowerCase()} region with strategic distribution points ensuring reliable delivery services.
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveCoverageSection;
