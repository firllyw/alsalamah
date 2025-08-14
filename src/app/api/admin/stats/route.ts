import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const statsSection = await prisma.statsSection.findFirst();
    return NextResponse.json(statsSection);
  } catch (error) {
    console.error('Error fetching stats section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats section' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { stats } = data;

    // Check if stats section exists
    const existingStats = await prisma.statsSection.findFirst();

    let statsSection;
    if (existingStats) {
      // Update existing
      statsSection = await prisma.statsSection.update({
        where: { id: existingStats.id },
        data: { stats }
      });
    } else {
      // Create new
      statsSection = await prisma.statsSection.create({
        data: { stats }
      });
    }

    return NextResponse.json(statsSection);
  } catch (error) {
    console.error('Error saving stats section:', error);
    return NextResponse.json(
      { error: 'Failed to save stats section' },
      { status: 500 }
    );
  }
}

