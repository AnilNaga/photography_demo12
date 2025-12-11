import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    const url = process.env.DATABASE_URL;

    // In dev, usage of GLOBAL prisma instance is critical.
    // We restrict connection limit to 1 to prevent HMR from exhausting the pool.
    const connectionString = url || "";
    const finalUrl = connectionString.includes('connection_limit')
        ? connectionString
        : `${connectionString}${connectionString.includes('?') ? '&' : '?'}connection_limit=20&pool_timeout=60`;

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
