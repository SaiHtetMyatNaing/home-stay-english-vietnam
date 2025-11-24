// Simple and secure
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user || session.user.id !== userId) {
        return Response.json({ exists: false });
    }

    const count = await prisma.review.count({
        where: { userId },
    });

    return Response.json({ exists: count > 0 });
}