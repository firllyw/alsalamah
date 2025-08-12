'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useSiteConfig, useSection } from '@/hooks/useCMS';
import { Bricolage_Grotesque } from 'next/font/google';
import Image from 'next/image';
import { footerContent } from '@/data/content';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bricolage-grotesque',
  display: 'swap',
});

const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 relative overflow-hidden ${bricolage.variable}`}
      style={{ fontFamily: 'var(--font-bricolage-grotesque)',background: '#273d97'  }}
    >
      {/* Background geometric elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1920 1080" fill="none">
            <polygon points="0,0 800,0 600,300 0,200" fill="rgba(255,255,255,0.05)" />
            <polygon points="1920,0 1920,400 1200,600 1400,200" fill="rgba(255,255,255,0.03)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Navigation */}
        <div className="w-64 flex flex-col justify-center px-8">
          <nav className="space-y-8">
            <motion.a
              href="#home"
              className="block text-white text-lg font-medium hover:text-blue-200 transition-colors"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              HOME
            </motion.a>
            <motion.a
              href="#about"
              className="block text-white text-lg font-medium hover:text-blue-200 transition-colors"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              ABOUT
            </motion.a>
            <motion.a
              href="#industries"
              className="block text-white text-lg font-medium hover:text-blue-200 transition-colors"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              INDUSTRIES
            </motion.a>
            <motion.a
              href="#contact"
              className="block text-white text-lg font-medium text-blue-200"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              CONTACT
            </motion.a>
          </nav>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col justify-center px-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-12 leading-tight">
              Drive Your Success Forward
            </h1>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">CONTACT:</h2>
              
              <div className="space-y-4 text-white">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Al Salamah Transport</h3>
                  <p className="text-lg text-blue-100">Jeddah, Kingdom of Saudi Arabia</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-lg">
                    <span className="font-medium">Email:</span> alsalamahtrans@sbtcgroup.com
                  </p>
                  <p className="text-lg">
                    <span className="font-medium">Phone:</span> +966 50 946 3389
                  </p>
                </div>
              </div>
            </div>

            {/* SBTC Partnership */}
            <div className="mt-12">
              <div className="flex items-center space-x-4">
                <span className="text-white text-lg font-medium">Part of</span>
                <div className="flex items-center space-x-3">
                  <Image
                    src="/sbtc_logo.png"
                    alt="SBTC Logo"
                    width={80}
                    height={40}
                    className="h-10 w-auto"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;