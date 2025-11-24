import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Contact from "@/components/Contact";
import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { HeroSectionDemo } from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Programs from "@/components/Programs";
import VolunteerReviews from "@/components/VolunteerReview";
import VolunteerReviewsSkeleton from "@/components/VolunteerReviewsSkeleton";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="max-w-full overflow-hidden">
      <Navbar />
      <HeroSectionDemo />
      <About />
      <Programs />
      <Benefits />
      <Gallery />
      <ErrorBoundary fallback={<div className="hidden" />}>
        <Suspense fallback={<VolunteerReviewsSkeleton />}>
          <VolunteerReviews />
        </Suspense>
      </ErrorBoundary>
      <Contact />
      <Footer />
    </div>
  );
};

export default page;
