import EditReview from "@/components/admin/reviews/EditReview";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditReview />
    </Suspense>
  );
}