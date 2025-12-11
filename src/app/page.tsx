// Server Component for fetching
import prisma from "@/lib/prisma";
import HomeClient from "@/components/home/HomeClient";

// Force dynamic to ensure we see new uploads
export const dynamic = 'force-dynamic';

export default async function Home() {
  const featuredPhotos = await prisma.photo.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { category: true }
  });

  return <HomeClient photos={featuredPhotos} />;
}
