import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const heroSection = await prisma.heroSection.findFirst();
    return NextResponse.json(heroSection);
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero section' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, subtitle, yearText, scrollText } = data;

    // Check if hero section exists
    const existingHero = await prisma.heroSection.findFirst();

    let heroSection;
    if (existingHero) {
      // Update existing
      heroSection = await prisma.heroSection.update({
        where: { id: existingHero.id },
        data: { title, subtitle, yearText, scrollText }
      });
    } else {
      // Create new
      heroSection = await prisma.heroSection.create({
        data: { title, subtitle, yearText, scrollText }
      });
    }

    return NextResponse.json(heroSection);
  } catch (error) {
    console.error('Error saving hero section:', error);
    return NextResponse.json(
      { error: 'Failed to save hero section' },
      { status: 500 }
    );
  }
}
