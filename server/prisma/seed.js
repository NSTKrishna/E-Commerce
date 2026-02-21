const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Create Admin User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    console.log({ admin });

    // Create Standard User
    const userPassword = await bcrypt.hash('user123', salt);
    const user = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'user@example.com',
            name: 'John Doe',
            password: userPassword,
            role: 'USER',
        },
    });

    console.log({ user });

    // Create Products
    const products = [
        {
            name: 'Wireless Headphones',
            description: 'High quality wireless headphones with noise cancellation.',
            price: 199.99,
            stock: 50,
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        },
        {
            name: 'Smart Watch',
            description: 'Latest model smart watch with health tracking features.',
            price: 299.99,
            stock: 30,
            imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        },
        {
            name: 'Gaming Laptop',
            description: 'Powerful gaming laptop with RTX 3080.',
            price: 1499.99,
            stock: 10,
            imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80',
        },
        {
            name: 'Mechanical Keyboard',
            description: 'RGB mechanical keyboard with Cherry MX switches.',
            price: 129.99,
            stock: 100,
            imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b91a05c?w=800&q=80',
        },
    ];

    for (const product of products) {
        const p = await prisma.product.create({
            data: product,
        });
        console.log(`Created product with id: ${p.id}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
