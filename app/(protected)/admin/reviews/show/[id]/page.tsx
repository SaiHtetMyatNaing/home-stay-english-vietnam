import SingleReview from "@/components/admin/reviews/SingleReview";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SingleReview />
    </Suspense>
  );
}