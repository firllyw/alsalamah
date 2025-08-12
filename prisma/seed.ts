import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create the first admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@alsalamah.com' },
    update: {},
    create: {
      email: 'admin@alsalamah.com',
      name: 'Administrator',
      role: 'admin',
      isActive: true,
    },
  })

  console.log('Created admin user:', adminUser)

  // Seed some initial menu items
  const homeMenu = await prisma.menuItem.upsert({
    where: { id: 'home-menu' },
    update: {},
    create: {
      id: 'home-menu',
      title: 'Home',
      href: '/',
      order: 1,
      isActive: true,
    },
  })

  const servicesMenu = await prisma.menuItem.upsert({
    where: { id: 'services-menu' },
    update: {},
    create: {
      id: 'services-menu',
      title: 'Services',
      href: '/services',
      order: 2,
      isActive: true,
    },
  })

  const aboutMenu = await prisma.menuItem.upsert({
    where: { id: 'about-menu' },
    update: {},
    create: {
      id: 'about-menu',
      title: 'About',
      href: '/about',
      order: 3,
      isActive: true,
    },
  })

  const contactMenu = await prisma.menuItem.upsert({
    where: { id: 'contact-menu' },
    update: {},
    create: {
      id: 'contact-menu',
      title: 'Contact',
      href: '/contact',
      order: 4,
      isActive: true,
    },
  })

  console.log('Created menu items:', { homeMenu, servicesMenu, aboutMenu, contactMenu })

  // Seed some initial site configuration
  const configs = [
    {
      key: 'site_title',
      value: 'Al Salamah Transportation',
      description: 'Main website title'
    },
    {
      key: 'site_tagline',
      value: 'Driving Reliable Distribution Across Saudi Arabia & Beyond',
      description: 'Website tagline/subtitle'
    },
    {
      key: 'contact_email',
      value: 'alsalamahtrans@sbtcgroup.com',
      description: 'Primary contact email'
    },
    {
      key: 'contact_phone',
      value: '+966 50 946 3389',
      description: 'Primary contact phone number'
    }
  ]

  for (const config of configs) {
    await prisma.siteConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: config,
    })
  }

  console.log('Created site configuration entries')

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
