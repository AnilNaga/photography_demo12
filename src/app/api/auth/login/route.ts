import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { signToken, verifyPassword } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Check database connection
        if (!process.env.DATABASE_URL) {
            console.error("❌ DATABASE_URL not configured");
            return NextResponse.json({
                error: "Database not configured. Please set DATABASE_URL in .env."
            }, { status: 503 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        console.log("Login Attempt:", email);
        console.log("User Found:", user ? "YES" : "NO");

        if (user) {
            const isValid = await verifyPassword(password, user.passwordHash);
            console.log("Password Valid:", isValid);
        }

        if (!user || !(await verifyPassword(password, user.passwordHash))) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        if (user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const token = await signToken({ userId: user.id, email: user.email, role: user.role });

        // Set HttpOnly Cookie
        (await cookies()).set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return NextResponse.json({ success: true, user: { email: user.email, name: user.name } });
    } catch (error: any) {
        console.error("Login error:", error);

        // Provide specific error messages for common issues
        if (error?.message?.includes('connection') || error?.message?.includes('database')) {
            return NextResponse.json({
                error: "Database connection failed. Check your DATABASE_URL in .env file."
            }, { status: 503 });
        }

        if (error?.message?.includes('PrismaClient')) {
            return NextResponse.json({
                error: "Database client not initialized. Run: npx prisma generate"
            }, { status: 503 });
        }

        return NextResponse.json({ error: "Internal Server Error: " + error.message }, { status: 500 });
    }
}
