// app/api/reviews/route.ts
import { NextResponse } from 'next/server'
import  prisma  from '@/lib/prisma'
const validSortFields = ['date', 'rating', 'createdAt', 'id'] as const

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Correct pagination (Refine/AntD format)
  const page = Math.max(1, parseInt(searchParams.get('currentPage') || '1', 10))
  const pageSize = Math.max(1, Math.min(100, parseInt(searchParams.get('pageSize') || '10', 10)))
  const skip = (page - 1) * pageSize
  const take = pageSize

  // Safe sorting
  let sortField = searchParams.get('_sort') || 'date'
  if (!validSortFields.includes(sortField as any)) {
    sortField = 'date'
  }
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
        'X-Total-Count': total.toString(),
        'Access-Control-Expose-Headers': 'X-Total-Count',
      },
    })
  } catch (error) {
    console.error('Reviews API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}
