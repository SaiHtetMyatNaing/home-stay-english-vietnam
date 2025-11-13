'use client'
import { Home, Utensils, Users, Calendar, FileText, Heart } from "lucide-react";
import { motion, Variants } from "framer-motion";

const Benefits = () => {
  const benefits = [
    {
      icon: <Home className="w-8 h-8 text-primary" />,
      title: "Free Accommodation",
      description: "Comfortable shared homestay with your host family"
    },
    {
      icon: <Utensils className="w-8 h-8 text-primary" />,
      title: "Authentic Vietnamese Food",
      description: "Experience real Vietnamese cuisine and cooking traditions"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Meet Locals & Travelers",
      description: "Build lasting friendships with both locals and other internationals"
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Flexible Schedule",
      description: "Only around 15 hours per week, plenty of time to explore"
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Visa Guidance",
      description: "We provide support and guidance for visa requirements"
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Life-Changing Experience",
      description: "Create memories and connections that last a lifetime"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.4, type: "spring", stiffness: 300 }
    }
  };

  return (
    <section id="benefits" className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
          >
            Why Choose Us?
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 origin-left"
          />
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            We offer more than just a place to stay. Join our community and discover the benefits 
            of cultural exchange.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden bg-card/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-border/50 hover:border-primary/30 hover:-translate-y-2 h-full flex flex-col justify-between"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300"
                  variants={iconVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {benefit.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  {benefit.description}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;