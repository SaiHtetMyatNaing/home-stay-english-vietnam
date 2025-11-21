import React, { Suspense } from 'react'

export const dynamic = 'force-dynamic';

const Page = () => {
  return (
    <Suspense>
    <div>Admin Page</div>
    </Suspense>
  )
}

export default Page