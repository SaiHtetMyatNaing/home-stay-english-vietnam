'use client';

import { GraduationCap, Home } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const Programs = () => {
  const programs = [
    {
      icon: <GraduationCap className="w-12 h-12 text-primary" />,
      title: "Volunteer English Teacher",
      description:
        "Share your language skills and help Vietnamese learners improve their English through conversation and interactive lessons.",
      image: "/home_stay_vietnam_1.jpg",
      features: [
        "Free accommodation provided",
        "Help locals practice English",
        "Flexible teaching schedule",
        "Around 15 hours per week",
      ],
    },
    {
      icon: <Home className="w-12 h-12 text-secondary" />,
      title: "Homestay Cultural Exchange",
      description:
        "Immerse yourself in authentic Vietnamese daily life while sharing your culture with your host family.",
      image: "/home_stay_vietnam_1.jpg",
      features: [
        "Live with a local family",
        "Share meals and daily activities",
        "Explore Vietnamese culture",
        "Preferred stay: 1-3 months",
      ],
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const listItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="programs" className="py-10 md:py-12 lg:py-16 bg-linear-to-br from-background to-muted/20">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center md:mb-10"
        >
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-3 text-2xl font-bold sm:text-3xl md:text-4xl text-foreground"
          >
            Our Programs
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-16 h-1 mx-auto mb-4 origin-left bg-linear-to-r from-primary to-secondary"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-2xl px-4 mx-auto text-sm sm:text-base text-muted-foreground"
          >
            Choose the experience that fits your journey. Both programs offer unique opportunities for
            cultural exchange and personal growth.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid max-w-6xl grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {programs.map((program, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <Card className="flex flex-col h-full overflow-hidden transition-all duration-500 border-0 rounded-md shadow-lg cursor-pointer hover:shadow-2xl hover:scale-95 bg-card/90 backdrop-blur-xs hover:bg-card group-hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-40 overflow-hidden sm:h-48 lg:h-52">
                  <motion.img
                    src={program.image}
                    alt={program.title}
                    className="object-cover w-full h-full"
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                  
                  <motion.div
                    className="absolute text-white bottom-3 left-3 drop-shadow-lg"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10">
                      {index === 0 ? (
                        <GraduationCap className="w-full h-full text-primary" />
                      ) : (
                        <Home className="w-full h-full text-secondary" />
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <CardHeader className="flex-1 px-5 pt-5 pb-3">
                  <CardTitle className="text-xl font-bold transition-colors duration-300 sm:text-2xl text-foreground group-hover:text-primary">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-sm leading-relaxed sm:text-base text-muted-foreground">
                    {program.description}
                  </CardDescription>
                </CardHeader>

                {/* Features */}
                <CardContent className="flex-1 px-5 pt-0 pb-6">
                  <motion.ul
                    className="space-y-2 text-muted-foreground"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {program.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        variants={listItemVariants}
                        className="flex items-start gap-2 text-xs sm:text-sm"
                      >
                        <motion.span
                          className="text-primary mt-0.5 shrink-0"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: idx * 0.1 + 0.2, type: "spring", stiffness: 300 }}
                        >
                          ✓
                        </motion.span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Programs;