import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch all specialized sections and site config in parallel
    const [
      heroSection,
      truckRevealSection,
      truckRotationSection,
      servicesSection,
      statsSection,
      showcaseSection,
      recordSection,
      interactiveCoverageSection,
      siteConfig
    ] = await Promise.all([
      prisma.heroSection.findFirst(),
      prisma.truckRevealSection.findFirst(),
      prisma.truckRotationSection.findFirst(),
      prisma.servicesSection.findFirst(),
      prisma.statsSection.findFirst(),
      prisma.showcaseSection.findFirst(),
      prisma.recordSection.findFirst(),
      prisma.interactiveCoverageSection.findFirst(),
      prisma.siteConfig.findFirst()
    ]);

    // Structure the response to match the existing frontend format
    const data = {
      // Site configuration
      siteConfig: siteConfig ? {
        company: {
          name: siteConfig.company_name,
          parentCompany: siteConfig.company_parentCompany,
          logo: siteConfig.company_logo,
          tagline: siteConfig.company_tagline
        },
        contact: {
          headOffice: {
            email: siteConfig.contact_headOffice_email,
            phone: siteConfig.contact_headOffice_phone,
            address: siteConfig.contact_headOffice_address
          }
        }
      } : null,

      // Menu items (empty array since we removed menu management)
      menu: [],

      // Sections data (keeping the same structure for frontend compatibility)
      sections: {
        hero: heroSection,
        truck_reveal: {
          content: 'For over 32 years, Al Salamah Transportation (AST) has been a trusted partner in the movement of goods and materials across Saudi Arabia and beyond. From nationwide distribution to specialized transportation solutions, AST combines a modern fleet, advanced logistics planning, and a customer- first approach to ensure that every delivery meets the highest standards of speed, reliability, and safety. With strategically located operational hubs and a team of highly trained professionals, AST supports industries from FMCG to industrial goods — serving both local businesses and multinational corporations. Our success is built on deep market knowledge, operational efficiency, and long- standing client relationships that stand the test of time.'
        },
        truck_rotation: truckRotationSection,
        services: servicesSection,
        stats: statsSection,
        showcase: showcaseSection,
        record: recordSection,
        area_coverage: interactiveCoverageSection
      },

      // Individual sections for easy access (same format as before)
      hero: heroSection ? {
        title: heroSection.title,
        subtitle: heroSection.subtitle,
        data: {
          yearText: heroSection.yearText,
          scrollText: heroSection.scrollText
        }
      } : null,

      truckReveal: truckRevealSection ? {
        content: 'For over 32 years, Al Salamah Transportation (AST) has been a trusted partner in the movement of goods and materials across Saudi Arabia and beyond. From nationwide distribution to specialized transportation solutions, AST combines a modern fleet, advanced logistics planning, and a customer- first approach to ensure that every delivery meets the highest standards of speed, reliability, and safety. With strategically located operational hubs and a team of highly trained professionals, AST supports industries from FMCG to industrial goods — serving both local businesses and multinational corporations. Our success is built on deep market knowledge, operational efficiency, and long- standing client relationships that stand the test of time.'
      } : null,

      truckRotation: truckRotationSection ? {
        data: {
          sections: truckRotationSection.sections
        }
      } : null,

      services: servicesSection ? {
        data: servicesSection.services
      } : null,

      stats: statsSection ? {
        data: statsSection.stats
      } : null,

      showcase: showcaseSection ? {
        data: {
          images: showcaseSection.images,
          features: showcaseSection.features
        }
      } : null,

      record: recordSection ? {
        data: {
          features: recordSection.features
        }
      } : null,

      areaCoverage: interactiveCoverageSection ? {
        data: {
          regions: interactiveCoverageSection.regions,
          headquarters: interactiveCoverageSection.headquarters
        }
      } : null,

      contact: null // Contact section doesn't have separate data, uses siteConfig
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}