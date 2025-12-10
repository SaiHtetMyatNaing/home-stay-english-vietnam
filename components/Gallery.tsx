'use client'
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

const Gallery = ({ content }: { content?: any }) => {
  // 12 images for 4 columns × 3 rows - defaults or from CMS
  const defaultImages = [
    { src: "/home_stay_vietnam_5.jpg", alt: "Enjoying Leisure Time Together" },
    { src: "/home_stay_vietnam_2.jpg", alt: "Perfect Night Out" },
    { src: "/home_stay_vietnam_7.jpg", alt: "Exploring Hanoi together" },
    { src: "/home_stay_vietnam_4.jpg", alt: "Cozy homestay room" },
    { src: "/home_stay_vietnam_1.jpg", alt: "Happy homestay community" },
    { src: "/home_stay_vietnam_6.jpg", alt: "Cultural exchange moments" },
    { src: "/home_stay_vietnam_5.jpg", alt: "Morning coffee chats" },
    { src: "/home_stay_vietnam_2.jpg", alt: "Language practice sessions" },
    { src: "/home_stay_vietnam_7.jpg", alt: "Weekend excursions" },
    { src: "/home_stay_vietnam_4.jpg", alt: "Family-style dinners" },
    { src: "/home_stay_vietnam_1.jpg", alt: "Cultural workshops" },
    { src: "/home_stay_vietnam_6.jpg", alt: "Farewell celebrations" },
  ];

  const images = content?.images?.length > 0
    ? content.images.map((url: string, index: number) => ({ src: url, alt: `Gallery Image ${index + 1}` }))
    : defaultImages;

  const videoRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoUrl = content?.videoUrl || "0dPxWVHBR8g";
  // Extract ID if full URL is provided (basic check)
  const videoId = videoUrl.includes("v=") ? videoUrl.split("v=")[1]?.split("&")[0] : videoUrl;


  // Animation controls
  const sectionControls = useAnimation();
  const sectionInView = useInView(videoRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (sectionInView) sectionControls.start("visible");
  }, [sectionInView, sectionControls]);

  useEffect(() => {
    if (!videoRef.current || !iframeRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!iframeRef.current) return;
        const srcBase = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}&rel=0&modestbranding=1&playsinline=1`;

        iframeRef.current.src = entry.isIntersecting ? srcBase : "";
      },
      { threshold: 0.5, rootMargin: "0px 0px -100px 0px" }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [videoId]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const hoverVariants: Variants = {
    hover: {
      scale: 1.08,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <section id="gallery" className="py-20 overflow-hidden bg-background">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl text-foreground">
            {content?.title || "Life at English Homestay Vietnam"}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-1 mx-auto mb-6 origin-left bg-primary"
          />
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            {content?.description || "See what daily life looks like in our homestay community. These moments capture the friendships, learning, and cultural exchange that make our program special."}
          </p>
        </motion.div>

        {/* Mobile & Tablet Carousel (hidden on desktop) */}
        <div className="max-w-3xl mx-auto mb-8 lg:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((image: any, index: number) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <div className="relative h-64 overflow-hidden rounded-lg cursor-pointer shadow-card group md:h-72">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-end p-4 transition-opacity duration-300 opacity-0 bg-linear-to-t from-black/70 to-transparent group-hover:opacity-100">
                      <p className="text-sm font-medium text-white">{image.alt}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Desktop Grid – 4 columns × 3 rows (hidden on mobile/tablet) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="hidden grid-cols-4 gap-4 mx-auto lg:grid max-w-7xl"
        >
          {images.map((image: any, index: number) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="relative h-56 overflow-hidden rounded-lg cursor-pointer shadow-card group"
            >
              <motion.img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-full"
                variants={hoverVariants}
                style={{ originX: 0.5, originY: 0.5 }}
              />
              <div className="absolute inset-0 flex items-end p-3 transition-opacity duration-300 opacity-0 bg-linear-to-t from-black/70 to-transparent group-hover:opacity-100">
                <p className="text-sm font-medium text-white">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Medium Video Section – Text above video, no overlay */}
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, y: 40 }}
          animate={sectionControls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
          }}
          className="mt-16 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="mb-4 text-2xl font-semibold text-foreground"
            >
              {content?.subtitle || "Watch Our Story"}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="mb-6 text-muted-foreground"
            >
              Get a glimpse of the homestay experience through the eyes of our
              volunteers and host families.
            </motion.p>
            <div className="relative overflow-hidden bg-black rounded-lg shadow-xl aspect-video">
              <iframe
                ref={iframeRef}
                className="absolute inset-0 w-full h-full"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;