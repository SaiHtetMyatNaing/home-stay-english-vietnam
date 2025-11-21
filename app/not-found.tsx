"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-linear-to-br from-emerald-50 via-white to-lime-50">
      <Card className="w-full max-w-xl mx-auto border-none rounded-3xl bg-white/80 backdrop-blur-xs">
        <div className="flex flex-col items-center justify-center gap-3 pt-12">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
            className="relative mb-2"
          >
            <Image
              src="/logo.svg"
              alt="HomeStay English Vietnam logo"
              width={140}
              height={140}
              className="p-4 bg-white rounded-full shadow-lg"
              priority
            />
          </motion.div>
        </div>

        <CardHeader className="pb-4 space-y-3 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CardTitle className="text-6xl font-extrabold text-transparent bg-linear-to-r from-emerald-600 to-lime-600 bg-clip-text">
              404 — Not Found
            </CardTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <CardDescription className="max-w-md mx-auto text-lg text-gray-600">
              Sorry, the page you&apos;re looking for doesn&apos;t exist or was moved.
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-8 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
              <Button 
              onClick={() => router.back()}
              className="inline-flex cursor-pointer items-center justify-center gap-3 px-8 py-6 text-base font-semibold text-white transition-all transform rounded-full shadow-lg bg-linear-to-r from-emerald-400 to-lime-400 hover:scale-105 hover:shadow-2xl hover:from-emerald-500 hover:to-lime-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Back to Home</span>
              </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}