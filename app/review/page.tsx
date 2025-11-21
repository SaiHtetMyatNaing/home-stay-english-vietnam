'use client';

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {useRouter } from "next/navigation"
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
import { auth } from "@/lib/auth";
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
  { name: "Australia", flag: "AU" },
  { name: "Germany", flag: "DE" },
  { name: "France", flag: "FR" },
  { name: "Spain", flag: "ES" },
  { name: "Italy", flag: "IT" },
  { name: "Japan", flag: "JP" },
  { name: "China", flag: "CN" },
  { name: "India", flag: "IN" },
  { name: "Brazil", flag: "BR" },
  { name: "Mexico", flag: "MX" },
  { name: "South Korea", flag: "KR" },
  { name: "Netherlands", flag: "NL" },
  { name: "Vietnam", flag: "VN" },
  { name: "Thailand", flag: "TH" },
  { name: "Indonesia", flag: "ID" },
  { name: "Philippines", flag: "PH" },
  // Add more countries as needed
];

export default function Page() {

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    // v4 logic:
    if (session.data === null) {       // definitely unauthenticated
      router.push("/sign-in");
    }
  }, [session.data, router]);

  if (!session.data?.user) {
    return null; // redirecting, nothing to render
  }
  
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

  const handleCountryChange = (value: string) => {
    if (value === "Other") {
      setIsOtherCountry(true);
      form.setValue("nationality", "");
      form.setValue("countryFlag", "Globe");
    } else {
      setIsOtherCountry(false);
      form.setValue("nationality", value);
      const country = countries.find((c) => c.name === value);
      if (country) form.setValue("countryFlag", country.flag);
    }
  };

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to submit");

      toast.success("Review submitted!", {
        description: "Thank you! Your review will appear after approval.",
      });

      form.reset();
      setIsOtherCountry(false);
    } catch (error) {
      toast.error("Error", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
        <CardDescription>Share your experience to help other guests</CardDescription>
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
                  <FormLabel>
                    Overall Rating <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => field.onChange(value)}
                          className="transform transition-transform hover:scale-95 focus:outline-none cursor-pointer"
                        >
                          {value <= rating ? (
                            <StarIcon className="h-11 w-11 text-yellow-400 fill-yellow-400 drop-shadow-sm" />
                          ) : (
                            <StarBorderIcon className="h-11 w-11 text-gray-300 dark:text-gray-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Title (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Amazing stay with wonderful hosts!" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Review Text */}
            <FormField
              control={form.control}
              name="reviewText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your experience..."
                      className="min-h-32 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Minimum 10 characters</FormDescription>
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
                    <FormLabel>Stay Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 4 nights" {...field} />
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
                    <FormLabel>Travel Date</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. November 2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Country / Nationality – Inline Input */}
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Country / Nationality <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                    {/* Country Dropdown */}
                    <div className="flex-1 w-full">
                      <Select
                        onValueChange={handleCountryChange}
                        value={isOtherCountry ? "Other" : field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.name} value={country.name}>
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{country.flag}</span>
                                <span>{country.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                          <SelectItem value="Other">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">Globe</span>
                              <span className="font-medium">Other</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Inline Input – appears smoothly when "Other" */}
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        isOtherCountry
                          ? "opacity-100 w-full sm:w-64"
                          : "opacity-0 w-0 overflow-hidden"
                      }`}
                    >
                      <Input
                        placeholder="Type your country..."
                        className="h-10"
                        autoFocus={isOtherCountry}
                        value={isOtherCountry ? field.value : ""}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          form.setValue("countryFlag", "Globe");
                        }}
                      />
                    </div>
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