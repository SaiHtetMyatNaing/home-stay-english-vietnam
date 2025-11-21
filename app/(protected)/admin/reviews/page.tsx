import ReviewList from "@/components/admin/reviews/ReviewList";
import { Suspense } from "react";
export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReviewList />
    </Suspense>
  );
}