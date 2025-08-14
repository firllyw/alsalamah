import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const coverageSection = await prisma.interactiveCoverageSection.findFirst();
    return NextResponse.json(coverageSection);
  } catch (error) {
    console.error('Error fetching coverage section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coverage section' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { regions, headquarters } = data;

    // Check if coverage section exists
    const existingCoverage = await prisma.interactiveCoverageSection.findFirst();

    let coverageSection;
    if (existingCoverage) {
      // Update existing
      coverageSection = await prisma.interactiveCoverageSection.update({
        where: { id: existingCoverage.id },
        data: { regions, headquarters }
      });
    } else {
      // Create new
      coverageSection = await prisma.interactiveCoverageSection.create({
        data: { regions, headquarters }
      });
    }

    return NextResponse.json(coverageSection);
  } catch (error) {
    console.error('Error saving coverage section:', error);
    return NextResponse.json(
      { error: 'Failed to save coverage section' },
      { status: 500 }
    );
  }
}

