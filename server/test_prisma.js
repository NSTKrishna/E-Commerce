const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

async function main() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    try {
        await prisma.product.findMany();
        console.log("Success with adapter!");
        process.exit(0);
    } catch (e) {
        console.error("Failed full error:", e);
        process.exit(1);
    }
}
main();
