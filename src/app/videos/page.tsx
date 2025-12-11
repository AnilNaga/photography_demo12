import { Navbar } from "@/components/layout/Navbar";
import prisma from "@/lib/prisma";
import VideosClient from "@/components/gallery/VideosClient";

export const dynamic = 'force-dynamic';

export default async function VideosPage() {
    const videos = await prisma.video.findMany({
        orderBy: { createdAt: "desc" },
        include: { category: true },
    });

    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" }
    });

    return (
        <main className="min-h-screen bg-background text-white pb-20">
            <Navbar />
            <VideosClient videos={videos} categories={categories} />
        </main>
    );
}
