import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const showcaseSection = await prisma.showcaseSection.findFirst();
    return NextResponse.json(showcaseSection);
  } catch (error) {
    console.error('Error fetching showcase section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch showcase section' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { images, features } = data;

    // Check if showcase section exists
    const existingShowcase = await prisma.showcaseSection.findFirst();

    let showcaseSection;
    if (existingShowcase) {
      // Update existing
      showcaseSection = await prisma.showcaseSection.update({
        where: { id: existingShowcase.id },
        data: { images, features }
      });
    } else {
      // Create new
      showcaseSection = await prisma.showcaseSection.create({
        data: { images, features }
      });
    }

    return NextResponse.json(showcaseSection);
  } catch (error) {
    console.error('Error saving showcase section:', error);
    return NextResponse.json(
      { error: 'Failed to save showcase section' },
      { status: 500 }
    );
  }
}

