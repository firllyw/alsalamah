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
      password: '123456',
      role: 'admin',
      isActive: true,
    },
  })

  console.log('Created admin user:', adminUser)

  // Seed some initial site configuration
  const configs = [
    {
      company_name: 'Al Salamah Transportation',
      company_parentCompany: 'SBTG',
      company_logo: 'https://www.alsalamah.com/logo.png',
      company_tagline: 'Driving Reliable Distribution Across Saudi Arabia & Beyond',
      contact_headOffice_email: 'alsalamahtrans@sbtcgroup.com',
      contact_headOffice_phone: '+966 50 946 3389',
      contact_headOffice_address: 'Riyadh, Saudi Arabia',
    },
  ]

  for (const config of configs) {
    await prisma.siteConfig.create({
      data: { company_name: config.company_name, company_parentCompany: config.company_parentCompany, company_logo: config.company_logo, company_tagline: config.company_tagline, contact_headOffice_email: config.contact_headOffice_email, contact_headOffice_phone: config.contact_headOffice_phone, contact_headOffice_address: config.contact_headOffice_address },
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
