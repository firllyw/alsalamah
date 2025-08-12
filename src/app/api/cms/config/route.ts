import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (key) {
      const config = await prisma.siteConfig.findUnique({
        where: { key }
      })
      return NextResponse.json(config)
    }

    const configs = await prisma.siteConfig.findMany({
      orderBy: { key: 'asc' }
    })

    // Convert to key-value object for easier consumption
    const configObject = configs.reduce((acc, config) => {
      acc[config.key] = config.value
      return acc
    }, {} as Record<string, string>)

    return NextResponse.json(configObject)
  } catch (error) {
    console.error('Error fetching site config:', error)
    return NextResponse.json(
      { error: 'Failed to fetch site configuration' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, value, description } = body

    const config = await prisma.siteConfig.upsert({
      where: { key },
      update: { value, description },
      create: { key, value, description }
    })

    return NextResponse.json(config)
  } catch (error) {
    console.error('Error updating site config:', error)
    return NextResponse.json(
      { error: 'Failed to update site configuration' },
      { status: 500 }
    )
  }
}
