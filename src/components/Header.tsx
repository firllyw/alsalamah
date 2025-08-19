'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeaderProps {
  siteData?: any;
}

// Import Bricolage Grotesque font from Google Fonts using next/font
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const Header = ({ siteData }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => document.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${montserrat.variable} ${
        scrolled ? 'bg-[#f6f5f5] py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            {scrolled ? (
              <Image 
                src="/logo_dark.png"
                alt="Al Salamah Logo" 
                width={150} 
                height={150}
                className="h-10 w-auto"
              />
            ) : null}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-x-24 xl:gap-x-40">
            <a 
              href="#home" 
              className={`transition-colors duration-300 font-medium px-8 ${montserrat.variable} ${
                scrolled ? 'text-[#273d97] hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
            >
              HOME
            </a>
            <a 
              href="#about" 
              className={`transition-colors duration-300 font-medium px-8 ${montserrat.variable} ${
                scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
            >
              ABOUT
            </a>
            <a 
              href="#services" 
              className={`transition-colors duration-300 font-medium px-8 ${montserrat.variable} ${
                scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
            >
              INDUSTRIES
            </a>
            <a 
              href="#contact" 
              className={`transition-colors duration-300 font-medium px-8 ${montserrat.variable} ${
                scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
            >
              CONTACT
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 ${scrolled ? 'text-gray-700' : 'text-white'} ${montserrat.variable}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`lg:hidden mt-4 pb-4 ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col space-y-8">
            <a 
              href="#home" 
              className={`transition-colors duration-300 font-medium py-3 px-6 text-lg ${montserrat.variable} ${
                scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#about" 
              className={`transition-colors duration-300 font-medium py-3 px-6 text-lg ${montserrat.variable} ${
                scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#services" 
              className={`transition-colors duration-300 font-medium py-3 px-6 text-lg ${montserrat.variable} ${
                scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Industries
            </a>
            <a 
              href="#contact" 
              className={`transition-colors duration-300 font-medium py-3 px-6 text-lg ${montserrat.variable} ${  
                scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;