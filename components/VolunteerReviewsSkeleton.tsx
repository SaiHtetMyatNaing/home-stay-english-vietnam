import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function VolunteerReviewsSkeleton() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-10 w-3/4 sm:w-1/2 mx-auto" />
          <Skeleton className="h-6 w-full sm:w-2/3 mx-auto" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-8 mb-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="h-full border-gray-200 bg-white">
              <CardContent className="pt-6 pb-6 px-5 flex flex-col h-full">
                {/* Header: Avatar + Info */}
                <div className="flex items-start gap-4 mb-4">
                  <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>

                {/* Title */}
                <Skeleton className="h-6 w-3/4 mb-3" />

                {/* Review Text */}
                <div className="space-y-2 mb-5 flex-grow">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Badges */}
                <div className="flex gap-2 mt-auto">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Skeleton */}
        <div className="text-center mt-12 space-y-6">
          <Skeleton className="h-6 w-64 mx-auto" />
          <div className="flex justify-center gap-4">
            <Skeleton className="h-12 w-40 rounded-md" />
            <Skeleton className="h-12 w-40 rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
