import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || (session.user.role !== "superAdmin" && session.user.role !== "superUser")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { id } = await params;

        const application = await prisma.application.findUnique({
            where: { id },
        });

        if (!application) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        return NextResponse.json(application);
    } catch (error) {
        console.error("Fetch application error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

const updateSchema = z.object({
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
    program: z.string().optional(),
    duration: z.string().optional(),
    // Add other editable fields if necessary
});

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || (session.user.role !== "superAdmin" && session.user.role !== "superUser")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { id } = await params;
        const body = await req.json();

        // Validate partial update
        const validatedData = updateSchema.parse(body);

        const application = await prisma.application.update({
            where: { id },
            data: validatedData,
        });

        return NextResponse.json(application);

    } catch (error) {
        console.error("Update application error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
