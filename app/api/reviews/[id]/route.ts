// app/api/reviews/[id]/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: reviewId } = await params;

  if (!reviewId) {
    return NextResponse.json({ error: 'Invalid review ID' }, { status: 400 });
  }

  try {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        user: {
          select: { name: true, image: true, email: true },
        },
      },
    });

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    console.error('Review API error:', error);
    return NextResponse.json({ error: 'Failed to fetch review' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: reviewId } = await params;

  if (!reviewId) {
    return NextResponse.json({ error: 'Invalid review ID' }, { status: 400 });
  }

  try {
    //  check if review exists first
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // Perform the deletion
    await prisma.review.delete({
      where: { id: reviewId },
    });

    return NextResponse.json(
      { message: 'Review deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Review DELETE API error:', error);
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}