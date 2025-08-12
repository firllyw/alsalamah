import { PrismaClient } from '@prisma/client'
import { homeContent, servicesContent, siteConfig } from '@/data/content'

const prisma = new PrismaClient()

async function seedSections() {
  console.log('Seeding sections with content data...')

  try {
    // Seed Hero Section
    await prisma.section.upsert({
      where: { name: 'hero' },
      update: {},
      create: {
        name: 'hero',
        title: homeContent.hero.mainTitle,
        subtitle: homeContent.hero.subtitle,
        content: homeContent.hero.scrollText,
        sectionType: 'hero',
        data: JSON.stringify(homeContent.hero),
        isActive: true,
        order: 1
      }
    })

    // Seed Truck Reveal Section
    await prisma.section.upsert({
      where: { name: 'truck_reveal' },
      update: {},
      create: {
        name: 'truck_reveal',
        title: homeContent.truckReveal.title,
        subtitle: null,
        content: homeContent.truckReveal.content,
        sectionType: 'about',
        data: JSON.stringify(homeContent.truckReveal),
        isActive: true,
        order: 2
      }
    })

    // Seed Truck Rotation Section
    await prisma.section.upsert({
      where: { name: 'truck_rotation' },
      update: {},
      create: {
        name: 'truck_rotation',
        title: 'Our Mission & Vision',
        subtitle: 'Values that drive us forward',
        content: null,
        sectionType: 'about',
        data: JSON.stringify(homeContent.truckRotation),
        isActive: true,
        order: 3
      }
    })

    // Seed Services Section
    await prisma.section.upsert({
      where: { name: 'services' },
      update: {},
      create: {
        name: 'services',
        title: servicesContent.title,
        subtitle: servicesContent.subtitle,
        content: null,
        sectionType: 'services',
        data: JSON.stringify(servicesContent.services),
        isActive: true,
        order: 4
      }
    })

    // Seed Stats Section
    const statsData = [
      { value: '27', label: 'Distribution\nBranches' },
      { value: '10+', label: 'Sub-\nBranches' },
      { value: '45+', label: 'Employees' },
      { value: '19000', label: 'Global\nCustomers' },
      { value: '30+', label: 'Vehicle\nFleet' },
      { value: '4', label: 'Sales SPV' },
      { value: '225', label: 'Merchandiser' },
      { value: '93', label: 'Deliverymen' }
    ]

    await prisma.section.upsert({
      where: { name: 'stats' },
      update: {},
      create: {
        name: 'stats',
        title: 'Our Impact',
        subtitle: 'Numbers that speak for themselves',
        content: null,
        sectionType: 'stats',
        data: JSON.stringify(statsData),
        isActive: true,
        order: 5
      }
    })

    // Seed Record Section
    const recordData = {
      title: 'Proven track record',
      subtitle: 'Delivering excellence across Saudi Arabia',
      features: [
        { label: 'On Time', iconType: 'clock' },
        { label: 'Reliable', iconType: 'shield' },
        { label: 'Secure', iconType: 'lock' }
      ]
    }

    await prisma.section.upsert({
      where: { name: 'record' },
      update: {},
      create: {
        name: 'record',
        title: recordData.title,
        subtitle: recordData.subtitle,
        content: null,
        sectionType: 'features',
        data: JSON.stringify(recordData),
        isActive: true,
        order: 6
      }
    })

    // Seed Area Coverage Section
    await prisma.section.upsert({
      where: { name: 'area_coverage' },
      update: {},
      create: {
        name: 'area_coverage',
        title: homeContent.areaCoverage.section1.title,
        subtitle: homeContent.areaCoverage.section1.subtitle,
        content: homeContent.areaCoverage.section1.content,
        sectionType: 'coverage',
        data: JSON.stringify(homeContent.areaCoverage),
        isActive: true,
        order: 7
      }
    })

    // Seed Contact Section
    await prisma.section.upsert({
      where: { name: 'contact' },
      update: {},
      create: {
        name: 'contact',
        title: 'Contact Us',
        subtitle: 'Drive Your Success Forward',
        content: 'Get in touch with our team',
        sectionType: 'contact',
        data: JSON.stringify(siteConfig.contact),
        isActive: true,
        order: 8
      }
    })

    // Seed additional site configuration
    const configs = [
      { key: 'company_name', value: siteConfig.company.name, description: 'Company name' },
      { key: 'company_tagline', value: siteConfig.company.tagline, description: 'Company tagline' },
      { key: 'company_logo', value: siteConfig.company.logo, description: 'Company logo path' },
      { key: 'parent_company', value: siteConfig.company.parentCompany, description: 'Parent company name' },
      { key: 'headquarters_city', value: siteConfig.contact.headOffice.city, description: 'Headquarters city' },
      { key: 'whatsapp_number', value: siteConfig.contact.headOffice.whatsapp, description: 'WhatsApp contact number' },
      { key: 'linkedin_url', value: siteConfig.contact.socialMedia.linkedin, description: 'LinkedIn company page' }
    ]

    for (const config of configs) {
      await prisma.siteConfig.upsert({
        where: { key: config.key },
        update: { value: config.value, description: config.description },
        create: config
      })
    }

    console.log('✅ Sections and configuration seeded successfully!')

  } catch (error) {
    console.error('❌ Error seeding sections:', error)
    throw error
  }
}

seedSections()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
