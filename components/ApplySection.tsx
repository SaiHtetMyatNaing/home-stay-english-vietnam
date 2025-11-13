import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import { motion, Variants } from "framer-motion";

const ApplySection = () => {
  const handleApply = () => {
    // Replace with actual Google Form URL
    window.open("https://forms.google.com", "_blank");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 150, damping: 18 },
    },
  };

  const steps = [
    {
      number: 1,
      title: "Submit Application",
      description: "Complete our simple online form (takes 5 minutes)"
    },
    {
      number: 2,
      title: "We Contact You",
      description: "Get a response within 48 hours via WhatsApp or Email"
    },
    {
      number: 3,
      title: "Video Interview",
      description: "Quick friendly chat to get to know each other better"
    },
    {
      number: 4,
      title: "Plan Your Stay",
      description: "Arrange dates and start your Vietnamese adventure!"
    }
  ];

  return (
    <section id="apply" className="py-20 bg-primary relative overflow-hidden">
      {/* Layered gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Ready to Begin Your Adventure?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl text-white/95 leading-relaxed"
            >
              Join our community of international volunteers and Vietnamese learners. 
              Start your cultural exchange journey today!
            </motion.p>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-2xl mb-8 border border-white/10 relative"
          >
            <motion.h3
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl font-semibold mb-8 text-center text-foreground"
            >
              Application Process
            </motion.h3>
            <div className="relative overflow-hidden">
              {/* Vertical timeline track */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 rounded-full"></div>
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative flex items-start gap-6 group"
                  >
                    {/* Step marker */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-300 border-2 border-white/20">
                        {step.number}
                      </div>
                    </div>
                    {/* Step content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-center"
          >
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400 }} className="inline-block">
              <Button
                onClick={handleApply}
                size="lg"
                className="bg-white text-primary hover:bg-white/95 text-lg px-12 py-6 shadow-xl font-semibold rounded-xl border border-white/10"
              >
                Apply Now <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 text-sm text-white/90"
            >
              Required: Full name • Nationality • Contact (WhatsApp/Email) • Preferred dates
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ApplySection;