// components/VolunteerReviews.tsx
import { Star, Calendar, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        className={`w-4 h-4 ${i <= rating ? "fill-[#46b96c] text-[#46b96c]" : "text-gray-300"}`}
      />
    ))}
  </div>
);

export default async function VolunteerReviews() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                (process.env.VERCEL_URL 
                  ? `https://${process.env.VERCEL_URL}` 
                  : 'http://localhost:3000');

  const res = await fetch(`${baseUrl}/api/reviews`, {
    cache: "no-store",
  });
  const reviews: Review[] = res.ok ? await res.json() : [];

  const approvedReviews = reviews
    .filter((r) => r.approved)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  const approvedCount = reviews.filter(r => r.approved).length;

  return (
    <section id="review" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header - Only show when there are reviews */}
        {approvedReviews.length > 0 && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#46b96c] mb-4">
              What Our Volunteers Say
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Real experiences from volunteers who taught English and lived with Vietnamese host families.
            </p>
          </div>
        )}

        {/* Reviews Grid – max 6 cards */}
        {approvedReviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {approvedReviews.map((review) => (
              <Card
                key={review.id}
                className="hover:shadow-xl transition-all duration-300 border-gray-200 bg-white"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 ring-2 ring-[#46b96c]/30">
                        <AvatarImage src={review.user.image || undefined} />
                        <AvatarFallback className="bg-[#46b96c]/10 text-[#46b96c] font-bold">
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
                    <h3 className="font-bold text-[#46b96c] mb-3 text-lg">
                      {review.title}
                    </h3>
                  )}

                  <p className="text-gray-700 italic leading-relaxed mb-5">
                    "{review.reviewText}"
                  </p>

                  <div className="flex flex-wrap gap-2 text-sm">
                    <Badge variant="secondary" className="bg-[#46b96c]/10 text-[#46b96c]">
                      <Calendar className="w-3 h-3 mr-1" />
                      {review.stayPeriod}
                    </Badge>
                    <Badge variant="outline" className="border-[#46b96c]/30 text-[#46b96c]">
                      <Globe className="w-3 h-3 mr-1" />
                      {review.stayDuration}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Counter + CTA - Always shown */}
        <div className="text-center mt-12">
          {approvedCount > 0 ? (
            <p className="text-gray-700 font-medium text-lg mb-8">
              Join {approvedCount}+ volunteers who have already shared their story
            </p>
          ) : (
            <p className="text-gray-700 font-medium text-lg mb-8">
              Be the first to share your volunteer experience!
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-[#46b96c] hover:bg-[#3a9959] text-white font-semibold">
              <Link href="/reviews/write-review">
                <Star className="w-5 h-5 mr-2" />
                Write Your Review
              </Link>
            </Button>

            {approvedCount > 0 && (
              <Button asChild size="lg" variant="outline" className="border-[#46b96c] text-[#46b96c] hover:bg-[#46b96c]/5">
                <Link href="/reviews">
                  See All Reviews →
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}