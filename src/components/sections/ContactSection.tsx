'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ContactSectionProps {
  data?: any;
  siteConfig?: any;
}

const ContactSection = ({ data, siteConfig }: ContactSectionProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`min-h-screen relative overflow-hidden`}
      style={{ fontFamily: 'Bricolage Grotesque, sans-serif', background: '#273d97' }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&display=swap');
          .font-bricolage {
            font-family: 'Bricolage Grotesque', sans-serif;
          }
        `}
      </style>
      
      {/* Background geometric elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1920 1080" fill="none">
            <polygon points="0,0 800,0 600,300 0,200" fill="rgba(255,255,255,0.05)" />
            <polygon points="1920,0 1920,400 1200,600 1400,200" fill="rgba(255,255,255,0.03)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 pb-10">
        <motion.h1 
          className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white text-center mb-16 px-4 lg:px-0"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Drive Your Success Forward
        </motion.h1>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full max-w-7xl mx-auto px-8 lg:px-12">
          
          {/* Left Navigation */}
          <div className="hidden lg:flex w-64 flex-shrink-0 flex-col justify-start">
            <nav className="space-y-12 mt-12">
              <motion.a
                href="#home"
                className="block text-white text-xl font-medium hover:text-blue-200 transition-colors"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                HOME
              </motion.a>
              <motion.a
                href="#about"
                className="block text-white text-xl font-medium hover:text-blue-200 transition-colors"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                ABOUT
              </motion.a>
              <motion.a
                href="#industries"
                className="block text-white text-xl font-medium hover:text-blue-200 transition-colors"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                INDUSTRIES
              </motion.a>
              <motion.a
                href="#contact"
                className="block text-white text-xl font-medium text-blue-200"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                CONTACT
              </motion.a>
            </nav>
          </div>

          {/* Center Content and Image */}
          <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-end justify-between w-full mt-10 lg:mt-0 space-y-12 lg:space-y-0 lg:space-x-12">
            
            {/* Contact Details */}
            <motion.div
              className="flex-1 w-full max-w-md lg:max-w-none text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="mb-4">
                <h2 className="text-3xl font-bold text-white mb-4">CONTACT:</h2>
                <div className="space-y-4 text-white">
                  <div>
                    <h3 className="text-2xl font-semibold mb-1">Al Salamah Transport</h3>
                    <p className="text-xl text-blue-100">Jeddah, Kingdom of Saudi Arabia</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl">
                      <span className="font-medium">Email:</span> {siteConfig?.contact?.headOffice?.email || "alsalamahtrans@sbtcgroup.com"}
                    </p>
                    <p className="text-xl">
                      <span className="font-medium">Phone:</span> {siteConfig?.contact?.headOffice?.phone || "+966 50 946 3389"}
                    </p>
                  </div>
                </div>
              </div>

              {/* SBTC Partnership */}
              <div className="mt-8">
                <div className="flex items-center space-x-6">
                  <span className="text-white text-xl font-medium">Part of</span>
                  <div className="flex items-center space-x-4">
                    <img
                      src="/sbtc_logo.png"
                      alt="SBTC Logo"
                      className="h-12 w-auto"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right side with image */}
            <motion.div
              className="flex-1 w-full lg:w-auto flex items-end justify-center lg:justify-end"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <img
                src={"/footer_truck.png"}
                alt="Truck illustration"
                className="w-full h-auto max-w-md sm:max-w-lg lg:max-w-none lg:w-[600px] object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;