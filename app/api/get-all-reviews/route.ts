import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

const validSortFields = ['date', 'rating', 'createdAt', 'id'] as const
type SortField = typeof validSortFields[number]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const page = Math.max(1, parseInt(searchParams.get('currentPage') || '1', 10))
  const pageSize = Math.max(1, Math.min(100, parseInt(searchParams.get('pageSize') || '10', 10)))
  const skip = (page - 1) * pageSize
  const take = pageSize

  let sortField: SortField = (searchParams.get('_sort') as SortField) || 'date'
  if (!validSortFields.includes(sortField)) {
    sortField = 'date'
  }
  const sortOrder = searchParams.get('_order') === 'DESC' ? 'desc' : 'asc'

  try {
    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
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
      prisma.review.count(),
    ])

    return NextResponse.json(reviews, {
      status: 200,
      headers: {
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