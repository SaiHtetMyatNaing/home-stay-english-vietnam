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
import prisma from "@/lib/prisma";

// Add revalidation or dynamic to ensure CMS updates are seen
export const dynamic = 'force-dynamic';

const page = async () => {
  let contentMap: Record<string, any> = {};

  try {
    const content = await prisma.landingPageContent.findMany();
    contentMap = content.reduce((acc, item) => {
      acc[item.section] = item;
      return acc;
    }, {} as Record<string, any>);
  } catch (error) {
    console.error("Failed to fetch landing page content", error);
    // Fallback to empty map, components will show defaults
  }

  return (
    <div className="max-w-full overflow-hidden">
      <Navbar />
      <HeroSectionDemo content={contentMap['hero']} />
      <About content={contentMap['about']} />
      <Programs content={contentMap['programs']} />
      <Benefits content={contentMap['benefits']} />
      <Gallery content={contentMap['gallery']} />
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
