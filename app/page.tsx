import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { HeroSectionDemo } from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Programs from "@/components/Programs";
import VolunteerReviews from "@/components/VolunteerReview";
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
      <Suspense>
      <VolunteerReviews/>

      </Suspense>
      <Contact />
      <Footer />
    </div>
  );
};

export default page;
