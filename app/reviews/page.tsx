  // components/VolunteerReviews.tsx   (Server Component – no 'use client' needed!)
  import { Star, Calendar, Globe } from "lucide-react";
  import { Card, CardContent } from "@/components/ui/card";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { Badge } from "@/components/ui/badge";

  type Review = {
    id: string;
    user: { name: string | null; image: string | null };
    nationality: string;
    countryFlag: string;
    stayDuration: string;
    stayPeriod: string;
    rating: number;
    title?: string | null;
    reviewText: string;
    date: string;
    approved: boolean;
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );

  export default async function VolunteerReviews() {
    // Simple direct fetch – no SWR, no extra dependencies
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/reviews`, {
      cache: "no-store", // always fresh (or use "force-cache" if you want static)
      // next: { revalidate: 3600 } // optional: revalidate every hour
    });

    const reviews: Review[] = res.ok ? await res.json() : [];

    const approvedReviews = reviews
      .filter((r) => r.approved)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (approvedReviews.length === 0) {
      return null; // or return a "No reviews yet" message if you prefer
    }

    return (
      <section className="py-16 bg-amber-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              What Our Volunteers Say
            </h2>
            <p className="text-lg text-amber-800 max-w-2xl mx-auto">
              Real experiences from volunteers who taught English and lived with Vietnamese host families.
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approvedReviews.map((review) => (
              <Card
                key={review.id}
                className="hover:shadow-xl transition-all duration-300 border-amber-100 bg-white"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 ring-2 ring-amber-200">
                        <AvatarImage src={review.user.image || undefined} />
                        <AvatarFallback className="bg-amber-100 text-amber-700 font-bold">
                          {review.user.name?.[0] || "V"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {review.user.name || "Volunteer"}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-2xl">{review.countryFlag}</span>
                          <span>{review.nationality}</span>
                        </div>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>

                  {review.title && (
                    <h3 className="font-bold text-amber-900 mb-3 text-lg">
                      {review.title}
                    </h3>
                  )}

                  <p className="text-gray-700 italic leading-relaxed mb-5">
                    "{review.reviewText}"
                  </p>

                  <div className="flex flex-wrap gap-2 text-sm">
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      <Calendar className="w-3 h-3 mr-1" />
                      {review.stayPeriod}
                    </Badge>
                    <Badge variant="outline" className="border-amber-300 text-amber-700">
                      <Globe className="w-3 h-3 mr-1" />
                      {review.stayDuration}
                    </Badge>
                  </div>

                  <p className="text-xs text-gray-500 mt-4">
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-amber-700 font-medium text-lg">
              Join {approvedReviews.length} volunteers who have made a difference in Vietnam
            </p>
          </div>
        </div>
      </section>
    );
  }