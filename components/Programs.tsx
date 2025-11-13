'use client'
import { GraduationCap, Home, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

const Programs = () => {
  const programs = [
    {
      icon: <GraduationCap className="w-12 h-12 text-primary" />,
      title: "Volunteer English Teacher",
      description: "Share your language skills and help Vietnamese learners improve their English through conversation and interactive lessons.",
      image: "/home_stay_vietnam_1.jpg",
      features: [
        "Free accommodation provided",
        "Help locals practice English",
        "Flexible teaching schedule",
        "Around 15 hours per week"
      ]
    },
    {
      icon: <Home className="w-12 h-12 text-secondary" />,
      title: "Homestay Cultural Exchange",
      description: "Immerse yourself in authentic Vietnamese daily life while sharing your culture with your host family.",
      image: "/home_stay_vietnam_1.jpg",
      features: [
        "Live with a local family",
        "Share meals and daily activities",
        "Explore Vietnamese culture",
        "Preferred stay: 1-3 months"
      ]
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const listItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="programs" className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
          >
            Our Programs
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 origin-left"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Choose the experience that fits your journey. Both programs offer unique opportunities 
            for cultural exchange and personal growth.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {programs.map((program, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <Card 
                className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-card/80 backdrop-blur-sm hover:bg-card group-hover:-translate-y-2 h-full"
              >
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <motion.img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <motion.div 
                    className="absolute bottom-4 left-4 group-hover:scale-110 transition-transform duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {program.icon}
                  </motion.div>
                </div>
                <CardHeader className="p-6 flex-1">
                  <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {program.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <motion.ul 
                    className="space-y-3 mb-6"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {program.features.map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        variants={listItemVariants}
                        className="flex items-start gap-3 text-sm"
                      >
                        <motion.span 
                          className="text-primary mt-1 shrink-0"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: idx * 0.1, type: "spring", stiffness: 300 }}
                        >
                          ✓
                        </motion.span>
                        <span className="text-muted-foreground flex-1">{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 border-primary/50"
                    >
                      Learn More 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </motion.div>
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