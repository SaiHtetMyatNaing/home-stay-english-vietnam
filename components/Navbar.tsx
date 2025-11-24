"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Simple scroll detection + active section
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      const sections = ["home", "about", "programs", "benefits", "gallery", "review", "contact"];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
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
    { label: "Review", id: "review" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      {/* Navbar with only opacity fade-in on mount */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 shadow-md backdrop-blur-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">

            {/* Logo + One-Line Brand Name */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <Image
                src="/logo.svg"
                alt="English Homestay Vietnam"
                width={48}
                height={48}
                className={`drop-shadow-md transition-all duration-300 ${
                  isScrolled ? "h-10 w-10" : "h-12 w-12"
                }`}
              />
              <span
                className={`font-black tracking-tight transition-colors duration-300 ${
                  isScrolled ? "text-gray-900" : "text-white"
                } text-base sm:text-lg md:text-xl`}
              >
                English Homestay Vietnam
              </span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
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
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}

              <Link
                href="https://docs.google.com/forms/"
                target="_blank"
                className="ml-6 px-6 py-2.5 text-sm font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 transform hover:scale-105 transition-all duration-200"
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile Toggle – Clean & Reliable */}
            <button
              onClick={() => setIsMobileMenuOpen(v => !v)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 right-0 bg-white shadow-2xl z-50"
              style={{ paddingTop: "max(env(safe-area-inset-top), 1rem)" }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b">
                <div className="flex items-center gap-3">
                  <Image src="/logo.svg" alt="Logo" width={40} height={40} className="h-10 w-10" />
                  <span className="font-black text-lg text-gray-900">
                    English Homestay Vietnam
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X size={28} className="text-gray-700" />
                </button>
              </div>

              <div className="px-6 py-8 space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`block w-full text-left px-6 py-4 rounded-xl text-lg font-medium transition-colors ${
                      activeSection === link.id
                        ? "bg-emerald-50 text-emerald-600"
                        : "text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}

                <div className="pt-6">
                  <Link
                    href="https://docs.google.com/forms/"
                    target="_blank"
                    className="block w-full text-center py-4 text-lg font-bold text-white rounded-xl shadow-lg bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;