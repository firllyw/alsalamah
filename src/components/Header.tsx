'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeaderProps {
  siteData?: any;
  currentLanguage?: 'en' | 'ar';
  onLanguageChange?: (language: 'en' | 'ar') => void;
}

// Import Bricolage Grotesque font from Google Fonts using next/font
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const Header = ({ siteData, currentLanguage = 'en', onLanguageChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Menu translations
  const menuItems = {
    en: {
      home: 'HOME',
      about: 'ABOUT', 
      services: 'SERVICES',
      contact: 'CONTACT'
    },
    ar: {
      home: 'الرئيسية',
      about: 'عنا',
      services: 'خدمتنا', 
      contact: 'اتصل بنا'
    }
  };

  const currentMenu = menuItems[currentLanguage];

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
        scrolled ? 'bg-[#ffffff] py-2' : 'bg-transparent py-4'
      }`}
      style={{ direction: 'ltr' }} // Force LTR layout for header
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
          <div className="hidden lg:flex items-center gap-x-8">
            <nav className="flex gap-x-12 xl:gap-x-20">
              <a 
                href="#home" 
                className={`transition-colors duration-300 font-semibold px-6 ${montserrat.variable} ${
                  scrolled ? 'text-[#273d97] hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              >
                {currentMenu.home}
              </a>
              <a 
                href="#about" 
                className={`transition-colors duration-300 font-medium px-6 ${montserrat.variable} ${
                  scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              >
                {currentMenu.about}
              </a>
              <a 
                href="#services" 
                className={`transition-colors duration-300 font-semibold px-6 ${montserrat.variable} ${
                  scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              >
                {currentMenu.services}
              </a>
              <a 
                href="#contact" 
                className={`transition-colors duration-300 font-medium px-6 ${montserrat.variable} ${
                  scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
              >
                {currentMenu.contact}
              </a>
            </nav>

            {/* Language Switcher */}
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => onLanguageChange?.('en')}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 ${
                  currentLanguage === 'en'
                    ? scrolled 
                      ? 'bg-[#273d97] text-white' 
                      : 'bg-white/20 text-white'
                    : scrolled
                      ? 'text-gray-600 hover:text-[#273d97]'
                      : 'text-white/70 hover:text-white'
                }`}
              >
                <span className="text-sm">🇺🇸</span>
                <span className={`text-sm font-medium ${montserrat.variable}`}>EN</span>
              </button>
              <button
                onClick={() => onLanguageChange?.('ar')}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 ${
                  currentLanguage === 'ar'
                    ? scrolled 
                      ? 'bg-[#273d97] text-white' 
                      : 'bg-white/20 text-white'
                    : scrolled
                      ? 'text-gray-600 hover:text-[#273d97]'
                      : 'text-white/70 hover:text-white'
                }`}
              >
                <span className="text-sm">🇸🇦</span>
                <span className={`text-sm font-medium ${montserrat.variable}`}>AR</span>
              </button>
            </div>
          </div>

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
              {currentMenu.home}
            </a>
            <a 
              href="#about" 
              className={`transition-colors duration-300 font-medium py-3 px-6 text-lg ${montserrat.variable} ${
                scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {currentMenu.about}
            </a>
            <a 
              href="#services" 
              className={`transition-colors duration-300 font-medium py-3 px-6 text-lg ${montserrat.variable} ${
                scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {currentMenu.services}
            </a>
            <a 
              href="#contact" 
              className={`transition-colors duration-300 font-medium py-3 px-6 text-lg ${montserrat.variable} ${  
                scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {currentMenu.contact}
            </a>
            
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/20">
              <button
                onClick={() => {
                  onLanguageChange?.('en');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                  currentLanguage === 'en'
                    ? scrolled 
                      ? 'bg-[#273d97] text-white' 
                      : 'bg-white/20 text-white'
                    : scrolled
                      ? 'text-gray-600 hover:text-[#273d97]'
                      : 'text-white/70 hover:text-white'
                }`}
              >
                <span className="text-lg">🇺🇸</span>
                <span className={`font-medium ${montserrat.variable}`}>English</span>
              </button>
              <button
                onClick={() => {
                  onLanguageChange?.('ar');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
                  currentLanguage === 'ar'
                    ? scrolled 
                      ? 'bg-[#273d97] text-white' 
                      : 'bg-white/20 text-white'
                    : scrolled
                      ? 'text-gray-600 hover:text-[#273d97]'
                      : 'text-white/70 hover:text-white'
                }`}
              >
                <span className="text-lg">🇸🇦</span>
                <span className={`font-medium ${montserrat.variable}`}>العربية</span>
              </button>
            </div>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;