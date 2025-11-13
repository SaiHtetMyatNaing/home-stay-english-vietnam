"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMounted, setIsMounted] = useState(false);

  // Trigger mount animation
  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      const sections = ["home","about","programs","benefits","gallery","contact","apply"];
      const pos = window.scrollY + 120;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Programs", id: "programs" },
    { label: "Benefits", id: "benefits" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ];

  const brandText = "HomeStay English Vietnam";
  const brandLetters = brandText.split("");

  return (
    <motion.nav
      animate={{
        paddingTop: isScrolled ? "0.8rem" : "1.5rem",
        paddingBottom: isScrolled ? "0.8rem" : "1.5rem",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">

          {/* LOGO (IMAGE) + TEXT – BOTH ANIMATE LIKE TEXT ON MOUNT */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 hover:scale-105 transition-all duration-300"
          >

            {/* LOGO IMAGE – ANIMATES LIKE A "LETTER" */}
            <motion.img
              src="logo.svg"
              alt="English Homestay Vietnam Logo"
              // Initial hidden state
              initial={{ opacity: 0, y: 20 }}
              // Animate in when mounted
              animate={isMounted ? {
                opacity: 1,
                y: 0,
                // Scroll-based size
                height: isScrolled ? "2.6rem" : "3.5rem",
                scale: isScrolled ? 0.9 : 1,
              } : {}}
              transition={{
                opacity: { delay: 0.3, duration: 0.5, ease: "easeOut" },
                y:        { delay: 0.3, duration: 0.5, ease: "easeOut" },
                height:   { duration: 0.3 },
                scale:    { duration: 0.3, type: "spring", stiffness: 300, damping: 20 },
              }}
              className="w-auto drop-shadow-md"
            />

            {/* BRAND TEXT – LETTER-BY-LETTER */}
            <motion.span
              className={`font-black tracking-tight flex overflow-hidden ${
                isScrolled ? "text-gray-900" : "text-white"
              }`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: isMounted ? 1 : 0,
                fontSize: isScrolled ? "1.125rem" : "1.5rem",
              }}
              transition={{ opacity: { delay: 0.35, duration: 0.5 } }}
            >
              <AnimatePresence>
                {isMounted &&
                  brandLetters.map((letter, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        delay: 0.35 + i * 0.04,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      className="inline-block"
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
              </AnimatePresence>
            </motion.span>

          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-5 py-2 text-sm font-medium transition-all duration-200 ${
                  isScrolled
                    ? "text-gray-700 hover:text-emerald-600"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="active-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-lime-400 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}

            <Button
              onClick={() => scrollToSection("apply")}
              className="ml-4 bg-gradient-to-r from-emerald-400 to-lime-400 hover:from-emerald-500 hover:to-lime-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 rounded-lg transition-all ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-5 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeSection === link.id
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("apply")}
              className="w-full mt-3 bg-gradient-to-r from-emerald-400 to-lime-400 hover:from-emerald-500 hover:to-lime-500 text-white font-semibold py-3 rounded-xl shadow-md"
            >
              Apply Now
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;