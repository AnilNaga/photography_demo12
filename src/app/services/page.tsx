
import { Navbar } from "@/components/layout/Navbar";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Clock, DollarSign } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
    const dbServices = await prisma.service.findMany({
        orderBy: { name: "asc" }
    });

    const services = dbServices.map(service => ({
        ...service,
        priceFrom: service.priceFrom ? service.priceFrom.toNumber() : null,
        priceTo: service.priceTo ? service.priceTo.toNumber() : null,
    }));

    return (
        <main className="min-h-screen bg-background text-white pb-20">
            <Navbar />

            <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Our Services</h1>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        Professional photography services tailored to capture your most memorable moments.
                    </p>
                </div>

                {services.length === 0 ? (
                    <div className="text-center py-20 border border-white/5 rounded-3xl bg-white/5">
                        <p className="text-white/50 text-xl">Services are being updated. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div key={service.id} className="group relative glass-panel p-8 rounded-3xl border border-white/5 hover:border-amber-500/30 transition-all hover:-translate-y-1">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-amber-400 transition-colors">
                                        {service.name}
                                    </h3>

                                    <p className="text-white/60 mb-8 leading-relaxed h-24 line-clamp-3">
                                        {service.description}
                                    </p>

                                    <div className="space-y-4 mb-8">
                                        {service.duration && (
                                            <div className="flex items-center gap-3 text-white/80">
                                                <div className="p-2 rounded-full bg-white/5 text-amber-400">
                                                    <Clock size={16} />
                                                </div>
                                                <span className="text-sm font-medium">{service.duration}</span>
                                            </div>
                                        )}

                                        {(service.priceFrom || service.priceTo) && (
                                            <div className="flex items-center gap-3 text-white/80">
                                                <div className="p-2 rounded-full bg-white/5 text-green-400">
                                                    <DollarSign size={16} />
                                                </div>
                                                <span className="text-sm font-medium">
                                                    {service.priceFrom && service.priceTo
                                                        ? `$${service.priceFrom} - $${service.priceTo}`
                                                        : service.priceFrom
                                                            ? `Starting at $${service.priceFrom}`
                                                            : `Up to $${service.priceTo}`
                                                    }
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <Link
                                        href={`/contact?service=${encodeURIComponent(service.name)}`}
                                        className="block w-full py-3 px-6 text-center rounded-xl bg-white text-black font-bold hover:bg-amber-400 transition-colors"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
