'use client';

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

const formSchema = z.object({
  stayDuration: z.string().min(1, "Please enter stay duration"),
  stayPeriod: z.string().min(1, "Please enter travel date"),
  rating: z.number().min(1, "Please select a rating").max(5),
  title: z.string().optional(),
  nationality: z.string().min(1, "Please select or enter your country"),
  countryFlag: z.string().min(1),
  reviewText: z.string().min(10, "Review must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const countries = [
  { name: "United States", flag: "US" },
  { name: "United Kingdom", flag: "GB" },
  { name: "Canada", flag: "CA" },
  { name: "Vietnam", flag: "VN" },
  { name: "Australia", flag: "AU" },
  { name: "Germany", flag: "DE" },
  { name: "France", flag: "FR" },
  { name: "Japan", flag: "JP" },
  { name: "Thailand", flag: "TH" },
  { name: "Indonesia", flag: "ID" },
  // Add more as needed
];

export default function WriteReviewPage() {
  const { data , isPending } = useSession()
  const router = useRouter();
  const user = data?.user;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOtherCountry, setIsOtherCountry] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stayDuration: "",
      stayPeriod: "",
      rating: 0,
      title: "",
      nationality: "",
      countryFlag: "",
      reviewText: "",
    },
  });

  const rating = form.watch("rating");

  // Auto redirect if not logged in
  useEffect(() => {
    if (!isPending && !user) {
      toast.error("Please sign in to write a review");
      router.replace("/sign-in?redirectTo=/write-review");
    }
  }, [user, isPending, router]);

  const handleCountryChange = (value: string) => {
    if (value === "Other") {
      setIsOtherCountry(true);
      form.setValue("nationality", "");
      form.setValue("countryFlag", "Globe");
    } else {
      setIsOtherCountry(false);
      const country = countries.find((c) => c.name === value);
      if (country) {
        form.setValue("nationality", country.name);
        form.setValue("countryFlag", country.flag);
      }
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (!user) {
      toast.error("Session expired. Please sign in again.");
      router.push("/sign-in");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          userId: user.id,
          userName: user.name ?? "Anonymous",
          userImage: user.image ?? null,
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        if (error?.includes("already submitted") || error?.includes("already reviewed")) {
          toast.success("Review already submitted!", {
            description: "You've already shared your experience. Thank you!",
          });
          router.push("/reviews");
          return;
        }

        // handle other non-OK responses
        toast.error("Submission failed", {
          description: error ?? "Please try again.",
        });
        return;
      }

      toast.success("Thank you!", {
        description: "Your review has been submitted successfully.",
      });

      form.reset();
      setIsOtherCountry(false);
      router.push("/reviews"); // or wherever you want
    } catch (error) {
      toast.error("Submission failed", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // If not logged in (after loading), redirect already handled in useEffect
  if (!user) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
        <CardDescription>
          Share your experience to help future volunteers
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* Star Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overall Rating <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <div className="flex gap-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => field.onChange(star)}
                          className="transition-transform hover:scale-110"
                        >
                          {star <= rating ? (
                            <StarIcon className="h-12 w-12 text-yellow-500 fill-yellow-500 drop-shadow" />
                          ) : (
                            <StarBorderIcon className="h-12 w-12 text-gray-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Title (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Amazing volunteer experience!" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reviewText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your stay..."
                      className="min-h-40 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>At least 10 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="stayDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stay Duration <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 2 weeks" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stayPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>When did you stay? <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. November 2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Country */}
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country / Nationality <span className="text-red-500">*</span></FormLabel>
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                    <div className="flex-1 w-full">
                      <Select onValueChange={handleCountryChange} value={isOtherCountry ? "Other" : field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c.name} value={c.name}>
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{c.flag}</span>
                                <span>{c.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                          <SelectItem value="Other">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">Globe</span>
                              <span>Other</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {isOtherCountry && (
                      <Input
                        placeholder="Enter your country"
                        className="w-full sm:w-64"
                        autoFocus
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          form.setValue("countryFlag", "Globe");
                        }}
                      />
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting || rating === 0}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}