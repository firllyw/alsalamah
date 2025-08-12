import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch all sections and site config in parallel
    const [sections, siteConfig, menuItems] = await Promise.all([
      prisma.section.findMany({
        orderBy: { createdAt: 'asc' }
      }),
      prisma.siteConfig.findFirst(),
      prisma.menuItem.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' }
      })
    ]);

    // Transform sections into a keyed object for easy access
    const sectionsData: Record<string, any> = {};
    sections.forEach(section => {
      sectionsData[section.key] = {
        title: section.title,
        content: section.content,
        data: section.data
      };
    });

    // Structure the response
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

      // Menu items
      menu: menuItems,

      // Sections data
      sections: sectionsData,

      // Individual sections for easy access
      hero: sectionsData.hero || null,
      truckReveal: sectionsData.truck_reveal || null,
      truckRotation: sectionsData.truck_rotation || null,
      services: sectionsData.services || null,
      stats: sectionsData.stats || null,
      showcase: sectionsData.showcase || null,
      record: sectionsData.record || null,
      contact: sectionsData.contact || null,
      areaCoverage: sectionsData.area_coverage || null
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
