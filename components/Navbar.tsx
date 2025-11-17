"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMounted, setIsMounted] = useState(false);

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

  const brandText = "English Homestay Vietnam";
  const brandLetters = brandText.split("");

  return (
    <motion.nav
      animate={{
        paddingTop: isScrolled ? "0.8rem" : "1.5rem",
        paddingBottom: isScrolled ? "0.8rem" : "1.5rem",
        opacity: 1,
      }}
      initial={{ opacity : 0}}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">

          {/* LOGO + BRAND TEXT */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2.5 hover:scale-105 transition-all duration-300"
          >
            {/* Logo */}
            <motion.img
              src="logo.svg"
              alt="English Homestay Vietnam Logo"
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? {
                opacity: 1,
                y: 0,
                height: isScrolled ? "2.3rem" : "2.8rem",
                scale: isScrolled ? 0.92 : 1,
              } : {}}
              transition={{
                opacity: { delay: 0.3, duration: 0.5, ease: "easeOut" },
                y:        { delay: 0.3, duration: 0.5, ease: "easeOut" },
                height:   { duration: 0.3 },
                scale:    { duration: 0.3, type: "spring", stiffness: 300, damping: 20 },
              }}
              className="w-auto drop-shadow-md"
            />

            {/* BRAND TEXT */}
            <motion.div
              className={`font-black tracking-tight flex items-center ${
                isScrolled ? "text-gray-900" : "text-white"
              } text-md sm:text-base md:text-lg lg:text-xl xl:text-2xl`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isMounted ? 1 : 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
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
            </motion.div>
          </button>

          {/* DESKTOP NAV - Now hidden at lg and below, shown at lg+ */}
          <div className="items-center hidden gap-1 lg:flex">
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

            <Link
               href="https://docs.google.com/forms/"
               target="_blank"
              className="px-6 py-2 ml-4 font-semibold text-white transition-all duration-200 transform rounded-full shadow-lg bg-gradient-to-r from-emerald-400 to-lime-400 hover:from-emerald-500 hover:to-lime-500 hover:shadow-xl hover:scale-95"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Toggle - Now shown at lg and below */}
          <Button
            className={`lg:hidden bg-transparent p-2 rounded-lg transition-all ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </Button>
        </div>

        {/* MOBILE MENU - Now shown at lg and below */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              />

              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed inset-x-0 top-0 z-50 bg-white shadow-2xl lg:hidden"
                style={{ paddingTop: "max(env(safe-area-inset-top), 1.5rem)" }}
              >
                <div className="flex items-center justify-between px-6 pt-6 pb-5">
                  <button onClick={() => scrollToSection("home")} className="flex items-center gap-3">
                    <Image src="logo.svg" alt="Logo" width="10" height="10" className="w-auto h-9 drop-shadow-md" />
                    <span className="text-[1.5em] font-black tracking-tight text-gray-900">
                      English Homestay Vietnam
                    </span>
                  </button>
                  <Button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 transition-colors bg-transparent border rounded-full hover:bg-gray-100"
                  >
                    <X size={28} className="text-gray-700" />
                  </Button>
                </div>

                <div className="container px-6 pb-10 mx-auto">
                  <div className="space-y-2">
                    {navLinks.map((link, i) => (
                      <motion.button
                        key={link.id}
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.07 }}
                        onClick={() => scrollToSection(link.id)}
                        className={`w-full text-left px-6 py-4 rounded-2xl text-lg font-medium transition-all ${
                          activeSection === link.id
                            ? "bg-emerald-50 text-emerald-600"
                            : "text-gray-800 hover:bg-gray-100"
                        }`}
                      >
                        {link.label}
                      </motion.button>
                    ))}

                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="pt-6"
                    >
                      <Link
                        href="https://docs.google.com/forms/"
                          target="_blank"
                        className="w-full p-3 text-lg font-bold rounded-full shadow-xl h-14 bg-gradient-to-r from-emerald-400 to-lime-400 hover:from-emerald-500 hover:to-lime-500"
                      > 
                        Apply Now
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;