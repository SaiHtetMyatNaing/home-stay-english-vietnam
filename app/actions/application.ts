"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import ApplicationThankYouEmail from "@/components/ApplicationThankYouEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const applicationSchema = z.object({
    fullName: z.string().min(2, {
        message: "Full name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    whatsApp: z.string().optional(),
    startDate: z.date({
        message: "A start date is required.",
    }),
    duration: z.string({
        message: "Please select a duration.",
    }),
    program: z.string({
        message: "Please select a program.",
    }),
    message: z.string().optional(),
});

export async function submitApplication(values: z.infer<typeof applicationSchema>) {
    try {
        const validatedData = applicationSchema.parse(values);

        const application = await prisma.application.create({
            data: validatedData,
        });

        // Send confirmation email
        try {
            await resend.emails.send({
                from: "English Homestay Vietnam <onboarding@updates.englishhomestayvietnam.com>", // Using a generic sender or the one from env
                to: [validatedData.email],
                subject: "We received your application!",
                react: ApplicationThankYouEmail({
                    fullName: validatedData.fullName,
                    program: validatedData.program
                }),
            });
        } catch (emailError) {
            console.error("Failed to send confirmation email:", emailError);
            // We don't fail the submission if email fails, just log it.
        }

        return { success: true, data: application };
    } catch (error) {
        console.error("Application submission error:", error);
        if (error instanceof z.ZodError) {
            return { success: false, error: (error as any).errors[0]?.message || "Invalid input data" };
        }
        return { success: false, error: "Failed to submit application. Please try again." };
    }
}
