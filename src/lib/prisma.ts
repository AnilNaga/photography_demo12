import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    const url = process.env.DATABASE_URL;

    if (!url) {
        // In local dev, this might be fine if using a default, but better to be strict.
        // On Vercel, this is critical.
        throw new Error("DATABASE_URL is not defined in environment variables.");
    }

    // In dev, usage of GLOBAL prisma instance is critical.
    // We restrict connection limit to 1 to prevent HMR from exhausting the pool.
    const finalUrl = url?.includes('connection_limit')
        ? url
        : `${url}${url.includes('?') ? '&' : '?'}connection_limit=20&pool_timeout=60`;

    return new PrismaClient({
        datasources: {
            db: {
                url: finalUrl,
            },
        },
    })
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
