"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Quizzes", href: "/quizzes" },
  { label: "Categories", href: "/categories" },
  { label: "Reviews", href: "/reviews" },

  { label: "Leaderboard", href: "/leaderboard" },
  { label: "About", href: "/about" },
];

export default function NavigationBar() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="max-w-full mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 transition-opacity hover:opacity-90">
          <div className="relative h-12 w-12 overflow-hidden rounded-sm">
            <Image
              src="/tiny-scholar-hub.png"
              alt="Tiny Scholar Hub Logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <span className="hidden text-xl font-bold text-gray-900 sm:inline-block">
            Tiny Scholar Hub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex gap-1">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                <Link
                  href={item.href}
                  className={`
                    inline-flex h-10 items-center justify-center rounded-sm px-4 py-2 text-sm font-medium transition-all duration-200
                    focus:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2
                    ${isActive(item.href)
                      ? "underline decoration-2 underline-offset-4"
                      : "hover:bg-gray-100"
                    }
                  `}
                >
                  {item.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            className="rounded-sm text-gray-700 hover:bg-gray-100 font-medium"
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button
            asChild
            className="rounded-sm bg-[#002947] hover:scale-95 font-semibold shadow-xs transition-all"
          >
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:bg-gray-100"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-80 bg-white p-0 border-l border-gray-200">
            <div className="flex h-full flex-col">
              {/* Mobile Header */}
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <Link
                  href="/"
                  className="flex items-center space-x-3"
                  onClick={() => setOpen(false)}
                >
                  <div className="relative h-10 w-10 overflow-hidden rounded-sm">
                    <Image
                      src="/tiny-scholar-hub.png"
                      alt="Tiny Scholar Hub Logo"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    Tiny Scholar Hub
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="text-gray-600 hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Links */}
              <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`
                      flex w-full items-center justify-start rounded-sm px-4 py-2 text-left text-base font-medium transition-all duration-200
                      ${isActive(item.href)
                        ? "underline decoration-2 underline-offset-4"
                        : "hover:bg-gray-100"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth */}
              <div className="space-y-2 border-t border-gray-200 p-4">
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-full items-center justify-center rounded-sm border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-full items-center justify-center rounded-sm bg-[#002947] px-4 py-2 text-sm font-semibold text-[#f4c542] shadow-xs transition-all"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}