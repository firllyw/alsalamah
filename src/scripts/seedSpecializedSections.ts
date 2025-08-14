import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding specialized sections...');

  try {
    // Seed Hero Section
    console.log('📝 Seeding Hero Section...');
    await prisma.heroSection.upsert({
      where: { id: 'hero-1' },
      update: {},
      create: {
        id: 'hero-1',
        title: 'Your Partner in Excellence',
        subtitle: 'Across Saudi Arabia & Beyond',
        yearText: 'IN 30 YEARS',
        scrollText: 'SCROLL DOWN'
      }
    });

    // Seed Services Section
    console.log('🏢 Seeding Services Section...');
    await prisma.servicesSection.upsert({
      where: { id: 'services-1' },
      update: {},
      create: {
        id: 'services-1',
        services: [
          {
            title: 'Freight Transportation',
            description: 'Reliable freight delivery across Saudi Arabia',
            icon: 'truck'
          },
          {
            title: 'Logistics Solutions',
            description: 'End-to-end logistics management',
            icon: 'package'
          },
          {
            title: 'Supply Chain',
            description: 'Comprehensive supply chain optimization',
            icon: 'globe'
          }
        ]
      }
    });

    // Seed Stats Section
    console.log('📊 Seeding Stats Section...');
    await prisma.statsSection.upsert({
      where: { id: 'stats-1' },
      update: {},
      create: {
        id: 'stats-1',
        stats: [
          { value: '1000+', label: 'Happy Customers' },
          { value: '99%', label: 'On-Time Delivery' },
          { value: '24/7', label: 'Customer Support' },
          { value: '50+', label: 'Fleet Vehicles' }
        ]
      }
    });

    // Seed Showcase Section
    console.log('🖼️ Seeding Showcase Section...');
    await prisma.showcaseSection.upsert({
      where: { id: 'showcase-1' },
      update: {},
      create: {
        id: 'showcase-1',
        images: [
          { src: '/truck_journey.jpg', alt: 'Truck on journey' }
        ],
        features: [
          {
            title: 'Modern Fleet',
            description: 'State-of-the-art vehicles',
            icon: 'truck'
          },
          {
            title: 'GPS Tracking',
            description: 'Real-time shipment tracking',
            icon: 'location'
          }
        ]
      }
    });

    // Seed Record Section
    console.log('🏆 Seeding Record Section...');
    await prisma.recordSection.upsert({
      where: { id: 'record-1' },
      update: {},
      create: {
        id: 'record-1',
        features: [
          { title: 'On Time Delivery', icon: 'clock' },
          { title: 'Quality Service', icon: 'shield' },
          { title: 'Reliable Support', icon: 'check' },
          { title: 'Secure Transport', icon: 'lock' }
        ]
      }
    });

    // Seed Truck Reveal Section
    console.log('🚛 Seeding Truck Reveal Section...');
    await prisma.truckRevealSection.upsert({
      where: { id: 'truck-reveal-1' },
      update: {},
      create: {
        id: 'truck-reveal-1',
        content: 'For over 32 years, Al Salamah Transportation (AST) has been a trusted partner in the movement of goods and materials across Saudi Arabia and beyond. From nationwide distribution to specialized transportation solutions, AST combines a modern fleet, advanced logistics planning, and a customer-first approach to ensure that every delivery meets the highest standards of speed, reliability, and safety. With strategically located operational hubs and a team of highly trained professionals, AST supports industries from FMCG to industrial goods — serving both local businesses and multinational corporations. Our success is built on deep market knowledge, operational efficiency, and long-standing client relationships that stand the test of time.'
      }
    });

    // Seed Truck Rotation Section
    console.log('🔄 Seeding Truck Rotation Section...');
    await prisma.truckRotationSection.upsert({
      where: { id: 'truck-rotation-1' },
      update: {},
      create: {
        id: 'truck-rotation-1',
        sections: [
          {
            number: '01',
            title: 'VISION',
            subtitle: 'Our Vision',
            content: 'To be the leading transportation company in Saudi Arabia'
          },
          {
            number: '02',
            title: 'MISSION',
            subtitle: 'Our Mission',
            content: 'Providing reliable and efficient transportation services'
          },
          {
            number: '03',
            title: 'COMMITMENT',
            subtitle: 'Our Commitment',
            content: 'Committed to excellence in every delivery'
          }
        ]
      }
    });

    // Seed Interactive Coverage Section
    console.log('🗺️ Seeding Coverage Section...');
    await prisma.interactiveCoverageSection.upsert({
      where: { id: 'coverage-1' },
      update: {},
      create: {
        id: 'coverage-1',
        regions: [
          {
            id: 'riyadh',
            name: 'Riyadh',
            lat: 24.7136,
            lng: 46.6753,
            branches: 5,
            subBranches: 12,
            description: 'Capital region with comprehensive coverage'
          },
          {
            id: 'jeddah',
            name: 'Jeddah',
            lat: 21.4858,
            lng: 39.1925,
            branches: 3,
            subBranches: 8,
            description: 'Commercial hub on the Red Sea coast'
          },
          {
            id: 'dammam',
            name: 'Dammam',
            lat: 26.4207,
            lng: 50.0888,
            branches: 2,
            subBranches: 6,
            description: 'Eastern province industrial center'
          }
        ],
        headquarters: {
          name: 'Al Salamah Headquarters',
          address: 'Riyadh, Saudi Arabia',
          lat: 24.7136,
          lng: 46.6753
        }
      }
    });

    console.log('✅ Specialized sections seeded successfully!');

  } catch (error) {
    console.error('❌ Error seeding specialized sections:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });