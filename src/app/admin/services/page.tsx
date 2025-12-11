import Link from "next/link";
import prisma from "@/lib/prisma";
import AdminServiceCard from "@/components/admin/AdminServiceCard";
import CreateServiceButton from "@/components/admin/CreateServiceButton";

export const dynamic = 'force-dynamic';

export default async function AdminServicesPage() {
    const dbServices = await prisma.service.findMany({
        orderBy: { name: "asc" },
    });

    const services = dbServices.map(service => ({
        ...service,
        priceFrom: service.priceFrom ? service.priceFrom.toNumber() : null,
        priceTo: service.priceTo ? service.priceTo.toNumber() : null,
    }));

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Services Management</h2>
                    <p className="text-white/50">Manage your service packages and pricing.</p>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/admin"
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center"
                    >
                        ← Dashboard
                    </Link>
                    <CreateServiceButton />
                </div>
            </div>

            {services.length === 0 ? (
                <div className="glass-panel p-12 rounded-2xl border border-white/5 text-center">
                    <p className="text-white/30 text-lg">No services found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <AdminServiceCard key={service.id} service={service} />
                    ))}
                </div>
            )}
        </div>
    );
}
