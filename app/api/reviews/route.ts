// app/api/reviews/route.ts
import { PrismaClient } from '@/app/generated/prisma'
import { NextResponse } from 'next/server'

const prisma  = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Refine pagination
  const start = parseInt(searchParams.get('_start') || '0')
  const end = parseInt(searchParams.get('_end') || '10')
  const take = end - start
  const skip = start

  // Refine sorting
  const sortField = searchParams.get('_sort') || 'date'
  const sortOrder = searchParams.get('_order') === 'DESC' ? 'desc' : 'asc'

  try {
    const [reviews, total] = await Promise.all([
      prisma.reviews.findMany({
        where: { approved: true },
        include: {
          user: {
            select: { name: true, image: true, email: true },
          },
        },
        orderBy: {
          [sortField]: sortOrder,
        },
        skip,
        take,
      }),
      prisma.reviews.count({
        where: { approved: true },
      }),
    ])

    return new Response(JSON.stringify(reviews), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // This header is REQUIRED by Refine
        'X-Total-Count': total.toString(),
        // Allows the header to be read from frontend
        'Access-Control-Expose-Headers': 'X-Total-Count',
      },
    })
  } catch (error) {
    console.error('Reviews API error:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}