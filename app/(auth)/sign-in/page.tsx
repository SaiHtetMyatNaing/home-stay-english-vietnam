"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GoogleIcon from "@mui/icons-material/Google"; // MUI Google icon
import CircularProgress from "@mui/material/CircularProgress"; // MUI loading spinner
import { signIn, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function Page() {


  const session = useSession()

  if(session?.data?.user){
    toast.success("You are already signed in.")
    useRouter().push("/")
  }
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      await signIn.social(
        {
          provider: "google",
          callbackURL: "/reviews/write-review",
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message || "Google sign-in failed");
          },
          onSuccess: () => {
            toast.success("Welcome back!");
            router.push("/");
          },
        }
      );
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {

      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-20 shadow-lg">
      <CardHeader className="text-center space-y-3">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription className="text-base">
          Sign in with Google to write reviews and manage your bookings
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-8">
        <Button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          size="lg"
          variant="outline"
          className="w-full h-14 text-base font-medium flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <CircularProgress size={24} thickness={4} color="inherit" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <GoogleIcon className="h-6 w-6 text-red-500" />
              <span>Continue with Google</span>
            </>
          )}
        </Button>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <a href="/terms" className="underline hover:text-foreground">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </a>
          .
        </p>
      </CardContent>
    </Card>
  );
}