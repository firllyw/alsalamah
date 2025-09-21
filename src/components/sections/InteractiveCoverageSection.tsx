'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
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
const Tooltip = dynamic(() => import('react-leaflet').then(mod => mod.Tooltip), { ssr: false });

interface Region {
  name: string;
  branches: number;
  subBranches: number;
  color: string;
  coordinates: [number, number];
  bounds: [number, number][];
  zoom: number;
}

interface InteractiveCoverageSectionProps {
  data?: any;
}

interface City {
  name: string;
  coordinates: [number, number];
  url: string;
}

const InteractiveCoverageSection = ({ data }: InteractiveCoverageSectionProps) => {
  const { areaCoverage } = homeContent;
  const sectionRef = useRef(null);
  const mapRef = useRef<any>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [isMapReady, setIsMapReady] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced regions with polygon boundaries and zoom levels
  const regions: Region[] = [
    {
      name: "Northern Region",
      branches: 2,
      subBranches: 3,
      color: "#5FB3A3",
      coordinates: [29.9759, 41.0216],
      zoom: 7,
      bounds: [
        [32.0, 37.0],
        [31.0, 39.0],
        [30.2, 41.5],
        [32.0, 42.5],
        [31.2, 44.5],
        [30.0, 45.0],
        [28.6, 44.0],
        [28.0, 41.8],
        [28.0, 38.0],
        [29.5, 37.0],
        [32.0, 37.0],
      ],
  
    },
    {
      name: "Western Region",
      branches: 6,
      subBranches: 2,
      color: "#FFB84D",
      coordinates: [21.4225, 39.8262],
      zoom: 7,
      bounds: [
        [29.0, 37.0],
        [28.6, 39.5],
        [27.2, 40.0],
        [25.5, 40.5],
        [24.2, 41.0],
        [22.5, 41.8],
        [20.8, 42.2],
        [19.0, 41.8],
        [18.2, 41.5],
        [17.3, 41.2],
        [16.7, 41.7],
        [17.6, 42.8],
        [18.5, 43.5],
        [19.5, 43.5],
        [21.2, 43.0],
        [23.0, 42.5],
        [24.6, 42.0],
        [26.0, 41.2],
        [27.5, 40.2],
        [28.6, 39.5],
        [29.0, 37.0],
      ],
  
    },
    {
      name: "Central Region",
      branches: 5,
      subBranches: 2,
      color: "#E6A8E6",
      coordinates: [24.7136, 46.6753],
      zoom: 6.5,
      bounds: [
        [28.6, 39.5],
        [28.8, 42.0],
        [28.5, 44.5],
        [27.2, 45.8],
        [26.0, 46.6],
        [24.8, 46.6],
        [23.0, 46.2],
        [21.2, 46.0],
        [20.2, 45.0],
        [19.5, 43.8],
        [19.0, 42.2],
        [20.8, 42.2],
        [22.5, 41.8],
        [24.2, 41.0],
        [25.5, 40.5],
        [27.2, 40.0],
        [28.6, 39.5],
      ],
  
    },
    {
      name: "Eastern Region",
      branches: 4,
      subBranches: 1,
      color: "#9F7FD1",
      coordinates: [26.4207, 50.0888],
      zoom: 7,
      bounds: [
        [29.0, 44.5],
        [29.2, 47.0],
        [29.2, 50.0],
        [27.5, 50.0],
        [25.5, 50.0],
        [24.0, 49.6],
        [22.4, 49.0],
        [21.2, 48.2],
        [20.0, 47.2],
        [19.2, 46.5],
        [20.8, 46.0],
        [23.0, 46.2],
        [24.8, 46.6],
        [26.0, 46.6],
        [27.2, 45.8],
        [28.5, 44.5],
        [29.0, 44.5],
      ],
  
    },
    {
      name: "Southern Region",
      branches: 4,
      subBranches: 2,
      color: "#B8860B",
      coordinates: [18.2465, 42.6516],
      zoom: 7,
      bounds: [
        [20.2, 45.0],
        [19.8, 46.0],
        [19.2, 46.5],
        [18.0, 47.0],
        [17.5, 46.0],
        [17.0, 44.0],
        [16.6, 42.2],
        [16.8, 41.6],
        [17.3, 41.2],
        [18.2, 41.5],
        [19.0, 41.8],
        [20.0, 41.6],
        [20.2, 42.6],
        [20.2, 45.0],
      ],
    },
    {
      name: "Tabuk Region",
      branches: 1,
      subBranches: 1,
      color: "#B8860B",
      coordinates: [28.4, 36.522],
      zoom: 7,
      bounds: [
        [20.2, 45.0],
        [19.8, 46.0],
        [19.2, 46.5],
        [18.0, 47.0],
        [17.5, 46.0],
        [17.0, 44.0],
        [16.6, 42.2],
        [16.8, 41.6],
        [17.3, 41.2],
        [18.2, 41.5],
        [19.0, 41.8],
        [20.0, 41.6],
        [20.2, 42.6],
        [20.2, 45.0],
      ],
    },
    {
      name: "Hail Region",
      branches: 1,
      subBranches: 1,
      color: "#B8860B",
      coordinates: [27.468985, 41.741673],
      zoom: 7,
      bounds: [
        [20.2, 45.0],
        [19.8, 46.0],
        [19.2, 46.5],
        [18.0, 47.0],
        [17.5, 46.0],
        [17.0, 44.0],
        [16.6, 42.2],
        [16.8, 41.6],
        [17.3, 41.2],
        [18.2, 41.5],
        [19.0, 41.8],
        [20.0, 41.6],
        [20.2, 42.6],
        [20.2, 45.0],
      ],
    },
  ];

  // Google Maps dataset provided (region -> cities -> url)
  const cityUrlData: Record<string, Record<string, string>> = {
    'Northern Region': {
      'Arar': 'https://www.google.com/maps/place/Fannat+Al+Quran+Mosque/@30.976343,41.00265,726m/data=!3m1!1e3!4m13!1m5!8m4!1e3!2s1s0x0:0xba1e62c9535f20c8!3m2!1e3!2s1s0x0:0xba1e62c9535f20c8!4m6!3m5!1s0x0:0xba1e62c9535f20c8!8m2!3d30.976343!4d41.00265!16s%2Fg%2F11vmlkcrns!5m1!1e4!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB',
      'Sakaka': 'https://www.google.com/maps/place/29%C2%B050\'02.2%22N+39%C2%B058\'19.1%22E/@29.833953,39.972145,951m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s29%C2%B050\'02.2%22N+39%C2%B058\'19.1%22E!3b1!8m2!3d29.833953!4d39.972145!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d29.833953!4d39.972145!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB',
      'Qurayyat': 'https://www.google.com/maps/place/31%C2%B020\'20.2%22N+37%C2%B020\'53.9%22E/@31.338952,37.331509,839m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s31%C2%B020\'20.2%22N+37%C2%B020\'53.9%22E!3b1!8m2!3d31.338952!4d37.331509!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d31.338952!4d37.331509!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB'
    },
    'Western Region': {
      'Makkah': 'https://www.google.com/maps/place/%E2%80%8E%D9%85%D9%83%D8%A9+%D8%A7%D9%84%D9%85%D9%83%D8%B1%D9%85%D8%A9/@21.389201,39.882413,2962m/data=!3m1!1e3!4m14!1m7!3m6!1s0x15c21b2b8e3c6339:0x93dd1c070c7e2b61!2z2YPZhNiq2Ykg2KfZhNmG2YjYp9ix2Ykg2KfZhNmD2LHYp9ix2YUg2KfZhNmE2YTYqiDYqNmK2YjYudmIINi02K_ZiCDYqNmK2YjYudmIINmE2YTZhdmG2K_ZiCDYqNiy2KfZhSDYudmIINis2YHYsdi52YTZh9ix!8m2!3d21.389201!4d39.882413!16s%2Fg%2F122_9l13_!4m5!3m4!1s0x15c21b2b8e3c6339:0x93dd1c070c7e2b61!8m2!3d21.389201!4d39.882413!16s%2Fg%2F122_9l13_?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB',
      'Medina': 'https://www.google.com/maps/place/24%C2%B028\'33.9%22N+39%C2%B036\'36.5%22E/@24.476081,39.610126,206m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s24%C2%B028\'33.9%22N+39%C2%B036\'36.5%22E!3b1!8m2!3d24.476081!4d39.610126!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d24.476081!4d39.610126!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB',
      'Jeddah': 'https://www.google.com/maps/place/21%C2%B029\'02.0%22N+39%C2%B010\'59.7%22E/@21.483888,39.183267,859m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s21%C2%B029\'02.0%22N+39%C2%B010\'59.7%22E!3b1!8m2!3d21.483888!4d39.183267!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d21.483888!4d39.183267!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB',
      'Taif': 'https://www.google.com/maps/place/21%C2%B015\'29.0%22N+40%C2%B022\'59.4%22E/@21.258055,40.383166,456m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s21%C2%B015\'29.0%22N+40%C2%B022\'59.4%22E!3b1!8m2!3d21.258055!4d40.383166!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d21.258055!4d40.383166!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB',
      'Yanbu': 'https://www.google.com/maps/place/24%C2%B006\'52.6%22N+38%C2%B009\'27.9%22E/@24.114608,38.15774,120m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s24%C2%B006\'52.6%22N+38%C2%B009\'27.9%22E!3b1!8m2!3d24.114608!4d38.15774!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d24.114608!4d38.15774!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB',
      'Qunfuzah': 'https://www.google.com/maps/place/19%C2%B006\'03.4%22N+40%C2%B059\'35.2%22E/@19.100938,41.009762,802m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s19%C2%B006\'03.4%22N+40%C2%B059\'35.2%22E!3b1!8m2!3d19.100938!4d41.009762!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d19.100938!4d41.009762!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB'
    },
    'Central Region': {
      'Riyadh': 'https://www.google.com/maps/place/24%C2%B046\'58.2%22N+46%C2%B044\'06.5%22E/@24.782828,46.735139,833m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s24%C2%B046\'58.2%22N+46%C2%B044\'06.5%22E!3b1!8m2!3d24.782828!4d46.735139!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d24.782828!4d46.735139!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB',
      'Al-Qassim': 'https://www.google.com/maps/place/26%C2%B029\'07.7%22N+43%C2%B058\'19.8%22E/@26.485482,43.972141,820m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s26%C2%B029\'07.7%22N+43%C2%B058\'19.8%22E!3b1!8m2!3d26.485482!4d43.972141!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d26.485482!4d43.972141!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB',
      'Dawadmi': 'https://www.google.com/maps/place/24%C2%B029\'22.9%22N+45%C2%B032\'19.9%22E/@24.489696,45.54579,830m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s24%C2%B029\'22.9%22N+45%C2%B032\'19.9%22E!3b1!8m2!3d24.489696!4d45.54579!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d24.489696!4d45.54579!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB'
    },
    'Eastern Region': {
      'Dammam': 'https://www.google.com/maps/place/26%C2%B026\'13.4%22N+49%C2%B057\'31.1%22E/@26.437055,49,821m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s26%C2%B026\'13.4%22N+49%C2%B057\'31.1%22E!3b1!8m2!3d26.437055!4d49.958634!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d26.437055!4d49.958634!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB',
      'HUFJF': 'https://www.google.com/maps/place/25%C2%B023\'55.9%22N+49%C2%B034\'53.6%22E/@25.398858,49.581558,859m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s25%C2%B023\'55.9%22N+49%C2%B034\'53.6%22E!3b1!8m2!3d25.398858!4d49.581558!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d25.398858!4d49.581558!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB',
      'Khobar': 'https://www.google.com/maps/place/26%C2%B029\'09.9%22N+50%C2%B000\'09.3%22E/@26.486083,50.002574,820m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s26%C2%B029\'09.9%22N+50%C2%B000\'09.3%22E!3b1!8m2!3d26.486083!4d50.002574!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d26.486083!4d50.002574!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB',
      'Jubail': 'https://www.google.com/maps/place/27%C2%B000\'55.5%22N+49%C2%B039\'05.4%22E/@27.01542,49.6515,822m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s27%C2%B000\'55.5%22N+49%C2%B039\'05.4%22E!3b1!8m2!3d27.01542!4d49.6515!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d27.01542!4d49.6515!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB'
    },
    'Southern Region': {
      'Abha': 'https://www.google.com/maps/place/18%C2%B016\'06.3%22N+42%C2%B030\'01.2%22E/@18,42.20032,861m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s18%C2%B016\'06.3%22N+42%C2%B030\'01.2%22E!3b1!8m2!3d18.268407!4d42.50032!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d18.268407!4d42.50032!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB',
      'Jizan': 'https://www.google.com/maps/place/17%C2%B002\'59.5%22N+42%C2%B034\'59.9%22E/@17.049872,42.583307,875m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s17%C2%B002\'59.5%22N+42%C2%B034\'59.9%22E!3b1!8m2!3d17.049872!4d42.583307!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d17.049872!4d42.583307!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB',
      'Najran': 'https://www.google.com/maps/place/17%C2%B029\'55.3%22N+44%C2%B026\'16.9%22E/@17.498687,44.438029,870m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s17%C2%B029\'55.3%22N+44%C2%B026\'16.9%22E!3b1!8m2!3d17.498687!4d44.438029!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d17.498687!4d44.438029!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB',
      'Khamis Mushayt': 'https://www.google.com/maps/@18.246515,42.715014,81-178501-44z',
      'Baha': 'https://www.google.com/maps/place/19%C2%B048\'52.4%22N+41%C2%B028\'39.7%22E/@19.814541,41.477697,861m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s19%C2%B048\'52.4%22N+41%C2%B028\'39.7%22E!3b1!8m2!3d19.814541!4d41.477697!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d19.814541!4d41.477697!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB',
      'Wadi dawasir': 'https://www.google.com/maps/place/20%C2%B029\'27.9%22N+45%C2%B044\'23.5%22E/@20.49108,45.739857,834m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s20%C2%B029\'27.9%22N+45%C2%B044\'23.5%22E!3b1!8m2!3d20.49108!4d45.739857!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d20.49108!4d45.739857!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB'
    },
    'Hail Region': {
      'Hail': 'https://www.google.com/maps/place/27%C2%B028\'08.4%22N+41%C2%B044\'29.3%22E/@27.468985,41.741673,831m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s27%C2%B028\'08.4%22N+41%C2%B044\'29.3%22E!3b1!8m2!3d27.468985!4d41.741673!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d27.468985!4d41.741673!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB'
    },
    'Tabuk Region': {
      'Tabuk': 'https://www.google.com/maps/place/28%C2%B023\'28.3%22N+36%C2%B038\'51.4%22E/@28.3912,36.64761,804m/data=!3m1!1e3!4m14!1m7!3m6!1s0x0:0xba1e62c9535f20c8!2s28%C2%B023\'28.3%22N+36%C2%B038\'51.4%22E!3b1!8m2!3d28.3912!4d36.64761!16s%2Fg%2F11vmlkcrns!4m5!3m4!1s0x0:0x0!8m2!3d28.3912!4d36.64761!16s%2Fg%2F11vmlkcrns?entry=ttu&og=EgoyMDExODA5NjM5ODYwMjE0NTE4EgQKAggB'
    }
  };

  // Parse coordinates from Google Maps URLs of the form .../@lat,lng,...
  const parseLatLngFromGoogleMapsUrl = (url: string): [number, number] | null => {
    const atIndex = url.indexOf('@');
    if (atIndex === -1) return null;
    const afterAt = url.substring(atIndex + 1);
    const parts = afterAt.split(',');
    if (parts.length < 2) return null;
    const lat = parseFloat(parts[0]);
    const lng = parseFloat(parts[1]);
    if (isNaN(lat) || isNaN(lng)) return null;
    return [lat, lng];
  };

  // Build city coordinates for each dataset region
  const citiesByDatasetRegion: Record<string, City[]> = Object.fromEntries(
    Object.entries(cityUrlData).map(([regionName, cities]) => {
      const cityList: City[] = Object.entries(cities)
        .map(([cityName, url]) => {
          const coords = parseLatLngFromGoogleMapsUrl(url);
          return coords ? { name: cityName, coordinates: coords, url } : null;
        })
        .filter((c): c is City => c !== null);
      return [regionName, cityList];
    })
  );

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll detection within the section
  const handleScroll = useCallback(() => {
    if (!isMobile || !sectionRef.current) return;
    
    const section = sectionRef.current as HTMLElement;
    const rect = section.getBoundingClientRect();
    // Check if section is visible in viewport (any part of it)
    const isInSection = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInSection) {
      setIsScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set new timeout to hide card after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 2000); // Hide after 2 seconds of no scrolling
    } else {
      // If not in section, hide immediately
      setIsScrolling(false);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    }
  }, [isMobile]);

  // Set up scroll listener
  useEffect(() => {
    if (isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      // Trigger initial check when mobile state changes
      handleScroll();
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [isMobile, handleScroll]);

  // Show card initially when section comes into view on mobile
  useEffect(() => {
    if (isMobile && isInView && sectionRef.current) {
      setIsScrolling(true);
      // Set timeout to hide after initial display
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 3000); // Show for 3 seconds initially
    }
  }, [isMobile, isInView]);

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
        className={`min-h-screen bg-gray-100 flex items-center justify-center ${bricolage.className}`}
      >
        <div className="text-lg">Loading interactive map...</div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-screen bg-[#f6f5f5] ${bricolage.className}`}
      style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f6f5f5 0%, #e9eaf3 100%)' }}
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
          
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          {/* City markers for selected region */}
          {selectedRegion && (() => {
            const cities = citiesByDatasetRegion[selectedRegion.name] || [];
            return cities.map((city, idx) => (
              <CircleMarker
                key={`${city.name}-${idx}`}
                center={city.coordinates}
                radius={8}
                pathOptions={{ color: '#ffffff', weight: 2 }}
                fillColor={selectedRegion.color}
                fillOpacity={1}
                eventHandlers={{ click: () => window.open(city.url, '_blank') }}
              >
                <Tooltip direction="bottom" offset={[0, 10]} opacity={1} permanent>
                  {city.name}
                </Tooltip>
              </CircleMarker>
            ));
          })()}

          {/* Headquarters Marker */}
          <CircleMarker
            center={data?.data?.headquarters?.coordinates || areaCoverage.section1.headquarters.coordinates}
            radius={10}
            fillColor={data?.data?.headquarters?.color || areaCoverage.section1.headquarters.color}
            color="#ffffff"
            weight={3}
            opacity={1}
            fillOpacity={1}
          />
        </MapContainer>
      </div>

      {/* Floating Card Overlay - Only One Card, on the Left */}
      {isInView && (!isMobile || isScrolling) && (
        <div className="absolute inset-0 z-10 flex items-start justify-start pointer-events-none">
          <motion.div
            className="fixed md:absolute top-8 left-1/2 md:left-8 transform -translate-x-1/2 md:translate-x-0 bg-gray-50 rounded-2xl p-6 shadow-2xl pointer-events-auto max-w-sm w-[90vw] md:w-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={isInView && (!isMobile || isScrolling) ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            style={{
              zIndex: 20,
              border: '1.5px solid #e5e7eb',
              boxShadow: '0 8px 32px 0 rgba(39,61,151,0.10)'
            }}
          >
            {!selectedRegion ? (
              // Regions List View
              <>
                <h2 
                  className="text-2xl font-bold mb-4"
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
                <div className="space-y-3">
                  {regions.map((region, index) => (
                    <button
                      key={index}
                      onClick={() => handleRegionClick(region)}
                      className="w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 bg-gray-50 hover:bg-gray-100"
                      style={{
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
                          {region.name}
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
                        style={{ backgroundColor: data?.data?.headquarters?.color || areaCoverage.section1.headquarters.color, border: '1.5px solid #fff' }}
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
                      {data?.data?.headquarters?.name || areaCoverage.section1.headquarters.name}
                    </span>
                  </div>
                </div>
                <button
                  onClick={resetView}
                  className="mt-4 text-sm px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
                >
                  Reset View
                </button>
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
                      {selectedRegion.name}
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
      )}
    </section>
  );
};

export default InteractiveCoverageSection;
