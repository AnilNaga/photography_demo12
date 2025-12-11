import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const password = await hash('123456', 12)
    console.log('Seeding database...')

    const admin = await prisma.user.upsert({
        where: { email: 'admin@lumina.com' },
        update: {
            passwordHash: password,
        },
        create: {
            email: 'admin@lumina.com',
            name: 'Admin User',
            passwordHash: password,
            role: 'ADMIN',
        },
    })

    console.log({ admin })

    // Categories
    const categories = ['Wedding', 'Pre-Wedding', 'Birthday', 'Traditional', 'Nature'];
    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.toLowerCase() },
            update: {},
            create: {
                name: cat,
                slug: cat.toLowerCase(),
            }
        })
    }
    console.log('Categories seeded.');
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
