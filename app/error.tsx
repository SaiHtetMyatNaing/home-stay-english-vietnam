"use client"
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error() {


  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <Card className="w-full max-w-xl mx-auto transition">
        <div className="flex flex-col items-center justify-center gap-3 pt-12">
          <div className="relative mb-2">
            <Image
              src="/tiny-scholar-hub.png"
              alt="Tiny Scholar Hub logo"
              width={140}
              height={140}
              priority
            />
          </div>
        </div>

        <CardHeader className="text-center space-y-3 pb-4">
          <CardTitle className="text-5xl font-extrabold text-red-600">
            Oops! Something Went Wrong
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground max-w-md mx-auto">
            We&apos;re sorry, but something unexpected happened. Don&apos;t worry, our team has been notified!
          </CardDescription>
        </CardHeader>

          <CardContent className="flex flex-col items-center gap-8 pb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 bg-linear-to-br from-[#002947] to-[#004570] text-[#f4c542] text-base font-semibold border-2 border-[#002947] rounded-lg px-8 py-4 hover:scale-105 hover:shadow-2xl hover:from-[#003a5c] hover:to-[#005080] transform transition-all shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Back to Home</span>

          </Link>
        </CardContent>
      </Card>
    </div>
  );
}