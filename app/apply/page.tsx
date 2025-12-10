import { ApplicationForm } from "@/components/application-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Apply Now | English Homestay Vietnam",
    description: "Apply for our volunteer, internship, or homestay programs.",
};

export default function ApplyPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-3xl">
            <div className="space-y-6 text-center mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-primary">
                    Start Your Journey
                </h1>
                <p className="text-muted-foreground text-lg">
                    Fill out the form below to apply for our programs. We're excited to hear from you!
                </p>
            </div>

            <div className="bg-card border rounded-xl shadow-sm p-6 md:p-8">
                <ApplicationForm />
            </div>
        </div>
    );
}
