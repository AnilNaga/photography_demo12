
const { PrismaClient } = require('@prisma/client');
const { compare } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@lumina.com';
    const password = '123456';

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        console.log('User not found');
        return;
    }

    console.log('User found:', user.email, user.role);
    console.log('Hash:', user.passwordHash);

    const isValid = await compare(password, user.passwordHash);
    console.log('Password valid:', isValid);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
