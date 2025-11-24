"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Home, Plus, X } from "lucide-react";

export default function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show if scrolling up or at the very top
      // Hide if scrolling down and not at the top
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
        setIsOpen(false); // Close menu when scrolling down
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Backdrop - closes menu when tapped outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div 
        className={`fixed bottom-6 right-6 z-50 flex flex-col items-end transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          isVisible ? "translate-y-0" : "translate-y-[200%]"
        }`}
      >
        {/* Action Items Container */}
        <div className="mb-4 space-y-4 flex flex-col items-end">
          {/* Write Review */}
          <div
            className={`
              flex items-center gap-3 transition-all duration-300 ease-out origin-bottom-right
              ${isOpen 
                ? "translate-y-0 opacity-100 scale-100" 
                : "translate-y-8 opacity-0 scale-90 pointer-events-none"
              }
            `}
            style={{ transitionDelay: isOpen ? "100ms" : "0ms" }}
          >
            <span className="hidden sm:block text-sm font-medium text-gray-700 bg-white px-3 py-1.5 rounded-lg shadow-md border border-gray-100">
              Write a Review
            </span>
            <Button
              asChild
              size="icon"
              className="h-12 w-12 rounded-full bg-[#46b96c] hover:bg-[#3a9959] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <Link href="/reviews/write-review" onClick={() => setIsOpen(false)}>
                <Pencil className="h-5 w-5" />
                <span className="sr-only">Write Review</span>
              </Link>
            </Button>
          </div>

          {/* Go Home */}
          <div
            className={`
              flex items-center gap-3 transition-all duration-300 ease-out origin-bottom-right
              ${isOpen 
                ? "translate-y-0 opacity-100 scale-100" 
                : "translate-y-8 opacity-0 scale-90 pointer-events-none"
              }
            `}
            style={{ transitionDelay: isOpen ? "50ms" : "0ms" }}
          >
            <span className="hidden sm:block text-sm font-medium text-gray-700 bg-white px-3 py-1.5 rounded-lg shadow-md border border-gray-100">
              Back to Home
            </span>
            <Button
              asChild
              size="icon"
              variant="outline"
              className="h-12 w-12 rounded-full bg-white text-[#46b96c] border-2 border-[#46b96c] shadow-lg hover:shadow-xl hover:bg-green-50 hover:scale-105 transition-all"
            >
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Home className="h-5 w-5" />
                <span className="sr-only">Go Home</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Main Toggle Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className={`
            h-14 w-14 rounded-full shadow-2xl 
            bg-[#46b96c] hover:bg-[#3a9959] text-white
            hover:scale-105 active:scale-95
            transition-all duration-300 z-50
            ${isOpen ? "rotate-45" : "rotate-0"}
          `}
        >
          <Plus className="h-8 w-8" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
    </>
  );
}