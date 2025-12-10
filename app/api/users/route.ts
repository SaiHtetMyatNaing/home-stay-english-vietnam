import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

export async function GET(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || session.user.role !== "superAdmin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error("Fetch users error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

const updateRoleSchema = z.object({
    userId: z.string(),
    role: z.enum(["user", "admin", "superAdmin"])
});

export async function PATCH(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || session.user.role !== "superAdmin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const { userId, role } = updateRoleSchema.parse(body);

        // Prevent changing own role for safety (optional but good practice)
        if (userId === session.user.id) {
            return NextResponse.json({ error: "Cannot change your own role" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { role },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });

        return NextResponse.json(updatedUser);

    } catch (error) {
        console.error("Update role error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
