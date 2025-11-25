// app/api/reviews/[id]/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: reviewId } = await params;

  if (!reviewId) {
    return NextResponse.json({ error: 'Invalid review ID' }, { status: 400 });
  }

  const userExist = await auth.api.getSession({
    headers: await headers()
  })

  if (!userExist) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const permissionCheck = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      userId: userExist.user.id,
      permissions: {
        dashboard: ["view"]
      }
    }
  });

  if (!permissionCheck.success) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
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

  const userExist = await auth.api.getSession({
    headers: await headers()
  })

  if (!userExist) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const permissionCheck = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      userId: userExist.user.id,
      permissions: {
        dashboard: ["view", 'delete']
      }
    }
  });

  if (!permissionCheck.success) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: reviewId } = await params;

  if (!reviewId) {
    return NextResponse.json({ error: 'Invalid review ID' }, { status: 400 });
  }

  const userExist = await auth.api.getSession({
    headers: await headers()
  })

  if (!userExist) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const permissionCheck = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      userId: userExist.user.id,
      permissions: {
        dashboard: ["update"]
      }
    }
  });

  if (!permissionCheck.success) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
  }

  try {
    // Parse request body (all possible updatable fields)
    const body = await request.json();

    // Only allow certain fields to be updated
    const allowedFields = ['rating', 'comment', 'approved', 'stayDuration', 'nationality'];
    const dataToUpdate: Record<string, any> = {};

    for (const key of allowedFields) {
      if (key in body) {
        dataToUpdate[key] = body[key];
      }
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields provided for update' },
        { status: 400 }
      );
    }

    // Check if review exists
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // Update the review
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: dataToUpdate,
      include: {
        user: {
          select: { name: true, image: true, email: true },
        },
      },
    });

    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    console.error('Review PUT API error:', error);
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: reviewId } = await params;

  if (!reviewId) {
    return NextResponse.json({ error: 'Invalid review ID' }, { status: 400 });
  }

  const userExist = await auth.api.getSession({
    headers: await headers()
  })

  if (!userExist) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const permissionCheck = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      userId: userExist.user.id,
      permissions: {
        dashboard: ["approve", "update"]
      }
    }
  });

  if (!permissionCheck.success) {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
  }

  try {
    // Parse request body (all possible updatable fields)
    const body = await request.json();

    // Only allow certain fields to be updated
    const allowedFields = ['rating', 'comment', 'approved', 'stayDuration', 'nationality'];
    const dataToUpdate: Record<string, any> = {};

    for (const key of allowedFields) {
      if (key in body) {
        dataToUpdate[key] = body[key];
      }
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields provided for update' },
        { status: 400 }
      );
    }

    // Check if review exists
    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // Update the review
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: dataToUpdate,
      include: {
        user: {
          select: { name: true, image: true, email: true },
        },
      },
    });

    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    console.error('Review PUT API error:', error);
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    );
  }
}