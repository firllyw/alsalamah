import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const recordSection = await prisma.recordSection.findFirst();
    return NextResponse.json(recordSection);
  } catch (error) {
    console.error('Error fetching record section:', error);
    return NextResponse.json(
      { error: 'Failed to fetch record section' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { features } = data;

    // Check if record section exists
    const existingRecord = await prisma.recordSection.findFirst();

    let recordSection;
    if (existingRecord) {
      // Update existing
      recordSection = await prisma.recordSection.update({
        where: { id: existingRecord.id },
        data: { features }
      });
    } else {
      // Create new
      recordSection = await prisma.recordSection.create({
        data: { features }
      });
    }

    return NextResponse.json(recordSection);
  } catch (error) {
    console.error('Error saving record section:', error);
    return NextResponse.json(
      { error: 'Failed to save record section' },
      { status: 500 }
    );
  }
}

