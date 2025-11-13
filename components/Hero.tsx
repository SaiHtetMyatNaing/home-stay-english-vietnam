"use client";
import { motion } from "framer-motion";
import React from "react";

import { ArrowDown, Globe, Heart, Users } from "lucide-react";
import { ImagesSlider } from "./ui/images-slider";
import { Button } from "./ui/button";

export function HeroSectionDemo() {
  const images = [
    "/home_stay_vietnam_1.jpg",
    "/home_stay_vietnam_2.jpg",
    "/home_stay_vietnam_3.jpg",
    "/home_stay_vietnam_4.jpg",
    "/home_stay_vietnam_5.jpg",
    "/home_stay_vietnam_6.jpg",
    "/home_stay_vietnam_7.jpg",
  ];

  const scrollToApply = () => {
    const element = document.getElementById("apply");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ImagesSlider  className="h-[53rem] overflow-hidden" images={images}>
      {/* Dark overlay for better text readability */}
      <div id="home" className="absolute inset-0 bg-black/30 z-10" />

      {/* Center Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 flex flex-col items-center justify-center h-full text-center px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium tracking-wider"
        >
          <Heart className="w-4 h-4 text-lime-300 fill-lime-300" />
          STAY FREE • TEACH ENGLISH • LIVE LOCAL
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          Teach. Travel.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-lime-400">
            Connect.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-xl md:text-2xl text-gray-100 mb-5 font-light max-w-2xl"
        >
          Live with passionate Vietnamese learners. Share your language. Build
          lifelong bonds.
        </motion.p>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-8 text-white/90 text-sm mb-10"
        >
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span>500+ Homestays</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <span>From 40+ Countries</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 150 }}
          className="cursor-pointer"
        >
          <Button
            onClick={scrollToApply}
            size="lg"
            className="bg-gradient-to-r hover:scale-95   from-emerald-400 cursor-pointer to-lime-400 hover:from-emerald-500 hover:to-lime-500 text-white font-semibold text-lg px-10 py-7 rounded-full shadow-2xl flex items-center gap-3 transition-all  duration-300 hover:shadow-emerald-400/30"
          >
            Apply to Stay Free
            <ArrowDown className="w-5 h-5 animate-bounce cursor-pointer" />
          </Button>
        </motion.div>

        {/* Subtle Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-6 text-sm text-white/70"
        >
          No fees. No catch. Just real cultural exchange.
        </motion.p>
      </motion.div>
    </ImagesSlider>
  );
}