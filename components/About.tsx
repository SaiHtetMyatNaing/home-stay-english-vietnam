"use client";
import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = ({ content }: { content?: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const imageSrc = content?.images?.length > 0 ? content.images[0] : "/home_stay_vietnam_7.jpg";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const statsVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {content?.title || "About Us"}
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-primary mx-auto"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"
        >
          {/* Left Column - Content */}
          <div className="space-y-7">
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-semibold text-foreground mb-3">
                {content?.subtitle || "What is English Homestay Vietnam?"}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {content?.description || "We are a bridge between cultures, connecting passionate travelers with eager Vietnamese learners in an authentic homestay experience."}
              </p>
            </motion.div>

            {/* Enhanced Mission Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative bg-linear-to-br from-primary/5 to-primary/10 p-1 rounded-xl overflow-hidden"
            >
              <div className="bg-card p-6 rounded-xl border border-primary/20 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  <h4 className="text-xl font-bold text-foreground">Our Mission</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Create a cultural exchange space where locals improve their English and foreigners experience
                  real Vietnam. We believe in the power of human connection, shared learning, and cultural understanding
                  to transform lives on both sides of the exchange.
                </p>
              </div>
              <div className="absolute -top-3 -right-3 w-24 h-24 bg-primary/5 rounded-full blur-3xl -z-10" />
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-4"
            >
              {[
                { value: "500+", label: "Volunteers" },
                { value: "50+", label: "Countries" },
                { value: "1000+", label: "Learners" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={statsVariants}
                  whileHover={{ scale: 1.15, y: -5 }}
                  className="text-center group cursor-default"
                >
                  <div className="text-3xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-secondary/20 rounded-2xl blur-3xl -z-10 scale-95" />
            <motion.img
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              src={imageSrc}
              alt="Cultural exchange activities"
              className="rounded-2xl shadow-2xl w-full object-cover"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute -bottom-4 -right-4 w-36 h-36 bg-primary/10 rounded-2xl -z-10"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.7, type: "spring" }}
              className="absolute -top-4 -left-4 w-36 h-36 bg-secondary/10 rounded-2xl -z-10"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;