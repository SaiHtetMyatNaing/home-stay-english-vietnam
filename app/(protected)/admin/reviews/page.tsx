'use client'
import { useList } from '@refinedev/core'
import React from 'react'

const Page = () => {
    const { result } = useList({
        resource : 'reviews'
    })

    if(!result.data) return (
        <div>No reviews found.</div>
    )
  return (
    <>
        <div>
            {result.data.map((review) => (
                <div key={review.id}>
                    <p>{review.reviewText}</p>
                </div>
            ))}
        </div>
    </>
  )
}

export default Page