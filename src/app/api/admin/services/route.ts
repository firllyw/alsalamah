import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const servicesSection = await prisma.servicesSection.findFirst();
    return NextResponse.json(servicesSection);
  } catch (error) {
    console.error('Error fetching services section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services section' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { services } = data;

    // Check if services section exists
    const existingServices = await prisma.servicesSection.findFirst();

    let servicesSection;
    if (existingServices) {
      // Update existing
      servicesSection = await prisma.servicesSection.update({
        where: { id: existingServices.id },
        data: { services }
      });
    } else {
      // Create new
      servicesSection = await prisma.servicesSection.create({
        data: { services }
      });
    }

    return NextResponse.json(servicesSection);
  } catch (error) {
    console.error('Error saving services section:', error);
    return NextResponse.json(
      { error: 'Failed to save services section' },
      { status: 500 }
    );
  }
}

