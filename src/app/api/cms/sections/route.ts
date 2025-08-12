import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')
    const isActive = searchParams.get('active')

    let where: any = {}
    
    if (name) {
      where.name = name
    }
    
    if (isActive !== null) {
      where.isActive = isActive === 'true'
    }

    const sections = await prisma.section.findMany({
      where,
      orderBy: { order: 'asc' }
    })

    // Parse JSON data field for each section
    const sectionsWithParsedData = sections.map(section => ({
      ...section,
      data: section.data ? JSON.parse(section.data) : null
    }))

    return NextResponse.json(sectionsWithParsedData)
  } catch (error) {
    console.error('Error fetching sections:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sections' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, title, subtitle, content, sectionType, data, isActive = true, order = 0 } = body

    const section = await prisma.section.create({
      data: {
        name,
        title,
        subtitle,
        content,
        sectionType,
        data: data ? JSON.stringify(data) : null,
        isActive,
        order
      }
    })

    return NextResponse.json({
      ...section,
      data: section.data ? JSON.parse(section.data) : null
    })
  } catch (error) {
    console.error('Error creating section:', error)
    return NextResponse.json(
      { error: 'Failed to create section' },
      { status: 500 }
    )
  }
}
