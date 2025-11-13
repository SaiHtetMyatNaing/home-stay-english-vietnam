'use client'
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";

const Gallery = () => {
  // 12 images for 4 columns × 3 rows
  const images = [
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

  const videoRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [videoId] = useState("0dPxWVHBR8g");

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
    <section id="gallery" className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Life at English Homestay Vietnam
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-1 bg-primary mx-auto mb-6 origin-left"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what daily life looks like in our homestay community. These
            moments capture the friendships, learning, and cultural exchange
            that make our program special.
          </p>
        </motion.div>

        {/* Image Grid – 4 columns × 3 rows – **shorter cards** */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="relative overflow-hidden rounded-lg shadow-card group cursor-pointer h-48 md:h-56"
            >
              <motion.img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                variants={hoverVariants}
                style={{ originX: 0.5, originY: 0.5 }}
              />
              <div className="absolute inset-0 bg-linear-gradient-to-t from-black/70 to-transparent flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-medium text-xs md:text-sm">{image.alt}</p>
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
              className="text-2xl font-semibold mb-4 text-foreground"
            >
              Watch Our Story
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground mb-6"
            >
              Get a glimpse of the homestay experience through the eyes of our
              volunteers and host families.
            </motion.p>
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
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