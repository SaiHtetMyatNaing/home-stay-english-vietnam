import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const applicationSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    whatsApp: z.string().optional(),
    startDate: z.string().pipe(z.coerce.date()),
    duration: z.string().min(1, "Duration is required"),
    program: z.string().min(1, "Program is required"),
    message: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = applicationSchema.parse(body);

        const application = await prisma.application.create({
            data: validatedData,
        });

        return NextResponse.json(application, { status: 201 });
    } catch (error) {
        console.error("Application submission error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || (session.user.role !== "superAdmin" && session.user.role !== "superUser")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const applications = await prisma.application.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(applications);
    } catch (error) {
        console.error("Fetch applications error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
