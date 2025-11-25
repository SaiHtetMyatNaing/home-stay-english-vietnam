import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'

export const dynamic = 'force-dynamic';

const Page = async () => {

  return (
    <Suspense>
      <div>Admin Page</div>
    </Suspense>
  )
}

export default Page